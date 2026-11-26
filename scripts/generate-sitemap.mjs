// Builds the sitemaps from the prerendered pages, so they always match what
// is actually deployed:
//   dist/sitemap.xml      sitemap index (the URL in robots.txt and Search Console)
//   dist/sitemap-en.xml   English pages
//   dist/sitemap-fr.xml   French pages
// One child sitemap per language keeps each version's coverage readable on
// its own in Search Console. Every <url> carries the full hreflang set
// (languages, their markets from HREFLANG_REGIONS in src/seo.js, x-default),
// a <changefreq> and <priority> hint by page type, and the content images
// found in the page's <main>.
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
import { SITE_URL, LANGS } from '../src/seo.js';
import { getStaticRoutes } from './lib/static-routes.mjs';

const DIST = path.resolve('dist');
const MANIFEST = path.resolve('scripts/sitemap-lastmod.json');
const INDEX_OUT = path.join(DIST, 'sitemap.xml');
const langSitemap = (lang) => `sitemap-${lang}.xml`;
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

// <changefreq> and <priority> by page type. Google ignores both; Bing and
// other engines read them as hints. Ordered: first match wins.
const PAGE_HINTS = [
  { test: (p) => p === '', changefreq: 'weekly', priority: '1.0' },
  { test: (p) => ['visibility', 'sentiment', 'technical-audit', 'content-writing', 'pricing'].includes(p), changefreq: 'weekly', priority: '0.9' },
  { test: (p) => p === 'blog', changefreq: 'weekly', priority: '0.8' },
  { test: (p) => p.startsWith('blog/'), changefreq: 'monthly', priority: '0.7' },
  { test: (p) => p === 'docs' || p === 'faqs' || p === 'glossary', changefreq: 'monthly', priority: '0.7' },
  { test: (p) => p.startsWith('docs/'), changefreq: 'monthly', priority: '0.6' },
  { test: (p) => p === 'demo', changefreq: 'monthly', priority: '0.6' },
  { test: (p) => ['privacy', 'terms', 'mentions-legales'].includes(p), changefreq: 'yearly', priority: '0.2' },
];
const hintsFor = (route) => {
  const p = route.replace(/^\/[a-z]{2}\/?/, '').replace(/\/$/, '');
  return PAGE_HINTS.find((h) => h.test(p)) ?? { changefreq: 'monthly', priority: '0.5' };
};

// Content images inside <main>: blog figures, docs screenshots, agent
// illustrations. Logos, icons and the product mockups' sample brand marks
// are not content, so only these folders are listed.
const CONTENT_IMAGE_DIRS = ['/Blogs/', '/docs/images/', '/Illustrations/'];
function contentImages(html) {
  const main = html.match(/<main[\s>][\s\S]*<\/main>/i)?.[0] ?? '';
  const seen = new Set();
  for (const tag of main.match(/<img\b[^>]*>/gi) ?? []) {
    const src = attr(tag, 'src');
    if (!src || !CONTENT_IMAGE_DIRS.some((d) => src.startsWith(d))) continue;
    seen.add(new URL(src, SITE_URL).href);
  }
  return [...seen];
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

  return { url, route, alternates, hash, images: contentImages(html), problems };
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

  const urlXml = (e) => {
    const { changefreq, priority } = hintsFor(e.route);
    return [
      '  <url>',
      `    <loc>${xmlEscape(e.url)}</loc>`,
      `    <lastmod>${e.lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      ...e.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${xmlEscape(a.hreflang)}" href="${xmlEscape(a.href)}" />`),
      ...e.images.map((src) => `    <image:image><image:loc>${xmlEscape(src)}</image:loc></image:image>`),
      '  </url>',
    ].join('\n');
  };
  // The stylesheet gives browsers a readable table (public/sitemap.xsl);
  // search engines ignore it. Same origin, so browsers will apply it.
  const HEADER = '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<!-- Generated by scripts/generate-sitemap.mjs at build time. Do not edit by hand. -->\n';

  // One child sitemap per language. A language whose pages all failed the
  // checks above never gets here (the build already exited).
  const children = [];
  for (const lang of LANGS) {
    const langEntries = entries.filter((e) => e.route.startsWith(`/${lang}/`));
    if (!langEntries.length) continue;
    const file = langSitemap(lang);
    const xml = `${HEADER}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${langEntries.map(urlXml).join('\n')}
</urlset>
`;
    fs.writeFileSync(path.join(DIST, file), xml);
    // The child's lastmod is its most recently changed page.
    children.push({ file, count: langEntries.length, lastmod: langEntries.map((e) => e.lastmod).sort().at(-1) });
  }
  if (children.reduce((n, c) => n + c.count, 0) !== entries.length) {
    console.error('Sitemap: some routes belong to no language sitemap (expected /<lang>/...).');
    process.exit(1);
  }

  const index = `${HEADER}<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${children.map((c) => `  <sitemap>
    <loc>${SITE_URL}/${c.file}</loc>
    <lastmod>${c.lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>
`;
  fs.writeFileSync(INDEX_OUT, index);
  console.log(`Sitemap: index ${path.relative(process.cwd(), INDEX_OUT)} -> ${children.map((c) => `${c.file} (${c.count} URLs)`).join(', ')}; ${entries.length} URLs in total.`);

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
