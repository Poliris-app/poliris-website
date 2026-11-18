// Builds dist/sitemap.xml from the prerendered pages, so the sitemap always
// matches what is actually deployed.
//
//   node scripts/generate-sitemap.mjs                     (runs in `npm run build`)
//   node scripts/generate-sitemap.mjs --update-manifest   (`npm run sitemap:update`)
//
// For every route in scripts/lib/static-routes.mjs it reads the built
// index.html and checks:
//   - the file exists
//   - the canonical points to the route itself (sitemap only lists canonicals)
//   - there is no robots noindex
//   - every hreflang alternate points to another prerendered route
// Any failure exits with code 1, so a broken sitemap never ships.
//
// hreflang alternates are copied from each page's <head>, so the sitemap and
// the HTML can't disagree.
//
// <lastmod> is the date the page's main content last changed. The text inside
// <main> (or <body> without header/nav/footer) is hashed and compared with scripts/sitemap-lastmod.json (committed):
//   - same hash      -> keep the recorded date
//   - no hash yet    -> keep the recorded date (seeded from the old hand-written sitemap)
//   - hash changed   -> today's date (UTC)
// Header, footer and nav sit outside <main>, so sitewide template edits don't
// bump every page. After a content change, run `npm run sitemap:update` on a
// fresh build and commit the manifest; otherwise changed pages get the build
// date on every deploy.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { SITE_URL } from '../src/seo.js';
import { getStaticRoutes } from './lib/static-routes.mjs';

const DIST = path.resolve('dist');
const MANIFEST = path.resolve('scripts/sitemap-lastmod.json');
const OUT = path.join(DIST, 'sitemap.xml');
const UPDATE = process.argv.includes('--update-manifest');
const TODAY = new Date().toISOString().slice(0, 10);

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const decode = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(Number(d)))
  .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n] ?? m);
const xmlEscape = (s) => s
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'));
  return m ? decode(m[1]) : null;
};

function readManifest() {
  if (!fs.existsSync(MANIFEST)) return {};
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  } catch (err) {
    throw new Error(`Cannot parse ${path.relative(process.cwd(), MANIFEST)}: ${err.message}`);
  }
}

// Hash of the visible text inside <main>. Pages without <main> (pricing, today)
// fall back to <body> minus header, nav and footer. Scripts and styles are
// dropped so bundle hashes or inline state don't count as content changes.
function contentHash(html) {
  let region = html.match(/<main[\s>][\s\S]*<\/main>/i)?.[0];
  if (!region) {
    const body = html.match(/<body[\s>][\s\S]*<\/body>/i)?.[0];
    if (!body) return null;
    region = body.replace(/<(header|nav|footer)[\s>][\s\S]*?<\/\1>/gi, ' ');
  }
  const visible = decode(
    region
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ').trim();
  return crypto.createHash('sha256').update(visible).digest('hex');
}

function inspect(route, routeUrls) {
  const url = `${SITE_URL}${route}`;
  const file = path.join(DIST, route, 'index.html');
  const problems = [];
  if (!fs.existsSync(file)) return { url, problems: [`missing ${path.relative(process.cwd(), file)}`] };

  const html = fs.readFileSync(file, 'utf8');
  const head = html.slice(0, html.search(/<\/head>/i));
  const linkTags = head.match(/<link\b[^>]*>/gi) ?? [];

  const canonicalTag = linkTags.find((t) => attr(t, 'rel') === 'canonical');
  const canonical = canonicalTag ? attr(canonicalTag, 'href') : null;
  if (canonical !== url) problems.push(`canonical is ${canonical ?? 'missing'}, expected ${url}`);

  const robotsTag = (head.match(/<meta\b[^>]*>/gi) ?? []).find((t) => attr(t, 'name')?.toLowerCase() === 'robots');
  if (robotsTag && /noindex/i.test(attr(robotsTag, 'content') ?? '')) problems.push('page is noindex');

  const alternates = linkTags
    .filter((t) => attr(t, 'rel') === 'alternate' && attr(t, 'hreflang'))
    .map((t) => ({ hreflang: attr(t, 'hreflang'), href: attr(t, 'href') }));
  for (const alt of alternates) {
    if (!routeUrls.has(alt.href)) problems.push(`hreflang ${alt.hreflang} points to ${alt.href}, which is not a prerendered route`);
  }
  if (alternates.length && !alternates.some((a) => a.href === url)) problems.push('hreflang set does not include the page itself');

  const hash = contentHash(html);
  if (!hash) problems.push('no <body> content to hash for lastmod');

  return { url, alternates, hash, problems };
}

function main() {
  if (!fs.existsSync(DIST)) throw new Error('dist/ not found. Run `vite-react-ssg build` first.');

  const routes = getStaticRoutes();
  const routeUrls = new Set(routes.map((r) => `${SITE_URL}${r}`));
  const manifest = readManifest();
  const nextManifest = {};
  const errors = [];
  const changed = [];
  const entries = [];

  for (const route of routes) {
    const page = inspect(route, routeUrls);
    if (page.problems.length) {
      errors.push(`${page.url}\n    ${page.problems.join('\n    ')}`);
      continue;
    }
    const known = manifest[page.url];
    let lastmod;
    if (known && (known.hash === page.hash || known.hash === null)) {
      lastmod = known.lastmod;
    } else {
      lastmod = TODAY;
      changed.push(page.url);
    }
    nextManifest[page.url] = { hash: page.hash, lastmod };
    entries.push({ ...page, lastmod });
  }

  if (errors.length) {
    console.error(`Sitemap: ${errors.length} route(s) can't be listed:\n  ${errors.join('\n  ')}`);
    process.exit(1);
  }

  const body = entries.map((e) => [
    '  <url>',
    `    <loc>${xmlEscape(e.url)}</loc>`,
    `    <lastmod>${e.lastmod}</lastmod>`,
    ...e.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${xmlEscape(a.hreflang)}" href="${xmlEscape(a.href)}" />`),
    '  </url>',
  ].join('\n')).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/generate-sitemap.mjs at build time. Do not edit by hand. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;
  fs.writeFileSync(OUT, xml);
  console.log(`Sitemap: ${entries.length} URLs written to ${path.relative(process.cwd(), OUT)}.`);

  const dropped = Object.keys(manifest).filter((u) => !routeUrls.has(u));
  if (UPDATE) {
    const sorted = Object.fromEntries(Object.entries(nextManifest).sort(([a], [b]) => a.localeCompare(b)));
    fs.writeFileSync(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);
    console.log(`Sitemap: manifest updated (${changed.length} changed, ${dropped.length} removed). Commit scripts/sitemap-lastmod.json.`);
  } else if (changed.length || dropped.length || Object.values(manifest).some((v) => v.hash === null)) {
    console.log(`Sitemap: manifest out of date (${changed.length} changed, ${dropped.length} removed). Run \`npm run sitemap:update\` and commit scripts/sitemap-lastmod.json.`);
    for (const u of changed) console.log(`  changed: ${u}`);
  }
}

try {
  main();
} catch (err) {
  console.error(`Sitemap: ${err.message}`);
  process.exit(1);
}
