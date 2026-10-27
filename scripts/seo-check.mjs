// Checks the built site (dist/) against the rules Screaming Frog flags, so a
// regression is caught at build time instead of in the next crawl report.
//
//   node scripts/seo-check.mjs          (runs after `vite-react-ssg build`)
//
// Thresholds are Screaming Frog's defaults; title and description widths come
// from src/lib/serpWidth.js, the same measure the docs pages fit their
// descriptions to. Exits with code 1 when anything fails.
import fs from 'node:fs';
import path from 'node:path';
import { SERP_LIMITS, pixelWidth } from '../src/lib/serpWidth.js';

const DIST = path.resolve('dist');

const LIMITS = {
  ...SERP_LIMITS,
  altChars: 100,
  imageBytes: 100 * 1024,
};

// Screaming Frog's default "non-descriptive anchor text" list.
const VAGUE_ANCHORS = new Set([
  'click here', 'click this', 'go', 'here', 'information', 'learn more', 'more',
  'more info', 'more information', 'read more', 'this', 'link', 'this page',
  'this link', 'continue', 'continue reading', 'see more', 'find out more',
]);

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', mdash: '—', ndash: '–', hellip: '…', middot: '·', laquo: '«', raquo: '»' };
const decode = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(Number(d)))
  .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n] ?? m);
const text = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'));
  return m ? decode(m[1]) : null;
};

function pages(dir = DIST, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) pages(p, out);
    else if (entry.name === 'index.html') out.push(p);
  }
  return out;
}

const urlOf = (file) => '/' + path.relative(DIST, path.dirname(file)).split(path.sep).join('/');
// Only the real, indexable site pages: /en/... and /fr/....
const sitePages = pages().filter((f) => /^\/(en|fr)(\/|$)/.test(urlOf(f)));

const problems = [];
const report = (url, rule, detail) => problems.push({ url, rule, detail });
const checkedImages = new Map();

for (const file of sitePages) {
  const url = urlOf(file);
  const html = fs.readFileSync(file, 'utf8');
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) continue;
  const head = html.slice(0, html.indexOf('</head>'));
  const body = html.slice(html.indexOf('<body'));

  const title = text((head.match(/<title>([\s\S]*?)<\/title>/i) ?? [])[1] ?? '');
  if (!title) report(url, 'title missing', '');
  else {
    const px = Math.round(pixelWidth(title, 20));
    if (title.length < LIMITS.titleChars[0]) report(url, `title under ${LIMITS.titleChars[0]} characters`, `${title.length}: ${title}`);
    if (title.length > LIMITS.titleChars[1]) report(url, `title over ${LIMITS.titleChars[1]} characters`, `${title.length}: ${title}`);
    if (px < LIMITS.titlePx[0]) report(url, `title under ${LIMITS.titlePx[0]} px`, `${px}px: ${title}`);
    if (px > LIMITS.titlePx[1]) report(url, `title over ${LIMITS.titlePx[1]} px`, `${px}px: ${title}`);
  }

  const desc = attr((head.match(/<meta name="description"[^>]*>/i) ?? [''])[0], 'content') ?? '';
  if (!desc) report(url, 'meta description missing', '');
  else {
    const px = Math.round(pixelWidth(desc, 14));
    if (desc.length < LIMITS.descChars[0]) report(url, `description under ${LIMITS.descChars[0]} characters`, `${desc.length}: ${desc}`);
    if (desc.length > LIMITS.descChars[1]) report(url, `description over ${LIMITS.descChars[1]} characters`, `${desc.length}: ${desc}`);
    if (px < LIMITS.descPx[0]) report(url, `description under ${LIMITS.descPx[0]} px`, `${px}px: ${desc}`);
    if (px > LIMITS.descPx[1]) report(url, `description over ${LIMITS.descPx[1]} px`, `${px}px: ${desc}`);
  }

  // Headings, in document order.
  const headings = [...body.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({ level: Number(m[1]), text: text(m[2]) }));
  const h1s = headings.filter((h) => h.level === 1);
  if (!h1s.length) report(url, 'H1 missing', '');
  if (h1s.length > 1) report(url, 'H1 multiple', h1s.map((h) => h.text).join(' | '));
  if (!headings.some((h) => h.level === 2)) report(url, 'H2 missing', '');
  headings.forEach((h, i) => {
    const prev = headings[i - 1];
    if (h.level === 2 && !headings.slice(0, i).some((x) => x.level === 1)) report(url, 'H2 before the H1', h.text);
    if (prev && h.level > prev.level + 1) report(url, `H${h.level} skips a level after H${prev.level}`, h.text);
  });

  // Images.
  for (const m of body.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const src = attr(tag, 'src') ?? '';
    const alt = attr(tag, 'alt');
    const where = `${src.slice(0, 80)}`;
    if (alt === null) report(url, 'image alt attribute missing', where);
    else if (alt.length > LIMITS.altChars) report(url, `image alt text over ${LIMITS.altChars} characters`, `${alt.length}: ${where}`);
    // Screaming Frog flags an empty alt even on decorative images.
    if (alt === '') report(url, 'image alt text empty', where);
    if (!/\swidth="\d/.test(tag) || !/\sheight="\d/.test(tag)) report(url, 'image width/height missing', where);
    if (src.startsWith('/') && !src.startsWith('//')) {
      const local = path.join(DIST, decodeURIComponent(src.split(/[?#]/)[0]));
      if (!checkedImages.has(local)) checkedImages.set(local, fs.existsSync(local) ? fs.statSync(local).size : -1);
      const size = checkedImages.get(local);
      if (size > LIMITS.imageBytes) report(url, 'image over 100 kB', `${Math.round(size / 1024)} kB: ${src}`);
    }
  }

  // Internal links with vague anchor text.
  for (const m of body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href = attr(`<a ${m[1]}>`, 'href') ?? '';
    if (/^(https?:)?\/\//.test(href) && !/\/\/(www\.)?poliris\.io/.test(href)) continue;
    const anchor = text(m[2]).toLowerCase().replace(/[→›»>\s]+$/u, '').trim();
    if (VAGUE_ANCHORS.has(anchor)) report(url, 'non-descriptive anchor text', `"${text(m[2])}" → ${href}`);
  }
}

// Duplicate titles and descriptions across pages.
const seen = { title: new Map(), desc: new Map() };
for (const file of sitePages) {
  const html = fs.readFileSync(file, 'utf8');
  const t = text((html.match(/<title>([\s\S]*?)<\/title>/i) ?? [])[1] ?? '');
  const d = attr((html.match(/<meta name="description"[^>]*>/i) ?? [''])[0], 'content') ?? '';
  for (const [k, v] of [['title', t], ['desc', d]]) {
    if (!v) continue;
    seen[k].set(v, [...(seen[k].get(v) ?? []), urlOf(file)]);
  }
}
for (const [k, map] of Object.entries(seen)) {
  for (const [v, urls] of map) {
    // The same wording in EN and FR (e.g. "FAQ") is a translation, not a duplicate.
    const langs = new Set(urls.map((u) => u.slice(1, 3)));
    if (urls.length > langs.size) report(urls.join(', '), `duplicate ${k === 'title' ? 'title' : 'description'}`, v);
  }
}

const byRule = problems.reduce((acc, p) => ((acc[p.rule] ??= []).push(p), acc), {});
console.log(`SEO check: ${sitePages.length} pages, ${problems.length} problem(s).`);
for (const [rule, list] of Object.entries(byRule)) {
  console.log(`\n✗ ${rule} (${list.length})`);
  for (const p of list) console.log(`   ${p.url}${p.detail ? `  —  ${p.detail}` : ''}`);
}
if (problems.length) process.exit(1);
