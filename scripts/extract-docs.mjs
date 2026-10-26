// Turns the authored documentation exports (index_1.html = EN, index_2.html = FR)
// into the chunked locale files the site's docs pages read: one file per
// chapter per language, plus a language-neutral structure file.
//
//   node extract-docs.mjs <en.html> <fr.html> <repo-root>
//
// The Technical Audit test reference is pulled out into a chapter of its own
// and chunked one key per test, because as a single block it is 325 KB — far
// too big for anyone to translate in Tolgee.
import fs from 'node:fs';
import path from 'node:path';
import { imageSize } from './lib/image-size.mjs';

// Chapter id (the doc-section carrying the <h1>) -> route slug.
// Slugs are language-neutral, like every other route on the site.
const SLUGS = {
  'introduction': 'introduction',
  'getting-started': 'getting-started',
  'key-concepts': 'key-concepts',
  'credits': 'credits',
  'feature-geo': 'ai-reputation',
  'feature-technical': 'technical-audit',
  'feature-roadmap': 'roadmap',
  'feature-content': 'content',
  'feature-implementation': 'implementation',
  'feature-citations': 'citations',
  'feature-poliagent': 'poli-ai',
  'integrations': 'site-connection',
  'settings-account': 'settings',
  'glossary': 'glossary',
  'faq': 'faq',
  'support': 'support',
  'release-notes': 'whats-new',
};

// The one block that becomes a chapter of its own.
const TESTS_BLOCK = 'reference-tests-1';
const TESTS_SLUG = 'test-reference';

// Titles, labels and breadcrumbs are rendered as React text, not as HTML, so
// their entities have to come out decoded or the page shows "d&#x27;indexabilité"
// literally. Block bodies are rendered as HTML and keep their entities as-is.
const NAMED = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', shy: '',
  rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”',
  mdash: '—', ndash: '–', middot: '·', hellip: '…',
  laquo: '«', raquo: '»', times: '×', rarr: '→', deg: '°',
};
const decode = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(Number(d)))
  .replace(/&([a-z][a-z0-9]*);/gi, (m, n) => NAMED[n] ?? NAMED[n.toLowerCase()] ?? m);

const strip = (s) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const attr = (s) => strip(s).replace(/"/g, '&quot;');
const slugify = (s) => strip(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// The export ships every screenshot as a grey placeholder box, with the real
// <img> tag sitting beside it inside a comment. Swap the two round so the
// figure points at the real file; the page hides it until the file exists.
// Screenshots are served as WebP (the export names them .png). The alt text is
// the caption, cut to 100 characters (Screaming Frog flags longer ones), and
// width/height come from the file so the page does not shift while it loads.
const IMAGES_DIR = path.join(process.argv[4] ?? '.', 'public/docs/images');
function shortAlt(caption) {
  const t = strip(caption);
  if (t.length <= 100) return t;
  for (const sep of [': ', ' : ', '. ']) {
    const head = t.split(sep)[0].trim();
    if (head.length >= 15 && head.length <= 100 && head !== t) return head.replace(/\.$/, '');
  }
  return t.slice(0, 100).replace(/\s+\S*$/, '').replace(/[,;:]$/, '');
}
function sizeAttrs(file) {
  const p = path.join(IMAGES_DIR, file);
  if (!fs.existsSync(p)) return '';
  const { width, height } = imageSize(p);
  return ` width="${width}" height="${height}"`;
}

function realiseFigures(html) {
  return html.replace(
    /<!--\s*SCREENSHOT\s+([A-Z0-9]+)[\s\S]*?src="\.\.\/images\/([^"]+)"[\s\S]*?-->\s*<figure class="figure"[^>]*>([\s\S]*?)<\/figure>/g,
    (_m, shot, png, inner) => {
      const file = png.replace(/\.png$/i, '.webp');
      const cap = (inner.match(/<figcaption>([\s\S]*?)<\/figcaption>/) || ['', ''])[1].trim();
      return [
        `<figure class="docs-figure" data-shot="${shot}">`,
        `<img src="/docs/images/${file}" alt="${shortAlt(cap).replace(/"/g, '&quot;')}"${sizeAttrs(file)} loading="lazy" />`,
        cap ? `<figcaption>${cap}</figcaption>` : '',
        '</figure>',
      ].join('');
    },
  );
}

// Anything left over (a figure whose comment did not parse) is dropped rather
// than shipped as a grey "Screenshot S12" box on the live site.
const dropLeftoverFigures = (html) => html.replace(/<figure class="figure"[\s\S]*?<\/figure>/g, '');

// The export colours the five sentiment levels with the severity badges, which
// read as red/orange/grey. Give each level its own class so docs.css can use
// the product's tier colours instead.
const TIERS = [
  [/badge sev-critical">(Very Weak|Très faible)</g, 'vw'],
  [/badge sev-critical">(Weak|Faible)</g, 'w'],
  [/badge sev-warning">(Moderate|Modéré)</g, 'm'],
  [/badge pri-low">(Very Strong|Très fort)</g, 'vs'],
  [/badge pri-low">(Strong|Fort)</g, 's'],
];
const tierBadges = (html) => TIERS.reduce((h, [re, t]) => h.replace(re, `badge tier tier-${t}">$1<`), html);

// Screenshots of features that are not in production yet. Their text stays,
// only the figure goes. S31: Keyword Tracker. S39: Technical Fixes. S44: Search Console connection.
const UNRELEASED_SHOTS = ['S31', 'S39', 'S44'];
const dropUnreleasedFigures = (html) => html.replace(
  /<figure class="docs-figure" data-shot="([A-Z0-9]+)">[\s\S]*?<\/figure>/g,
  (m, shot) => (UNRELEASED_SHOTS.includes(shot) ? '' : m),
);

const tidy = (html) => tierBadges(dropUnreleasedFigures(dropLeftoverFigures(realiseFigures(html))))
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/[ \t]+\n/g, '\n')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

function parse(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const main = raw.match(/<main[^>]*>([\s\S]*)<\/main>/i)[1];
  const re = /<section class="doc-section" id="([^"]+)">([\s\S]*?)(?=<section class="doc-section"|<footer|$)/g;
  const sections = [];
  let m;
  while ((m = re.exec(main))) {
    let body = m[2].replace(/<\/section>\s*$/, '');
    const h1 = (body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [null, null])[1];
    const crumbs = [...(body.match(/<div class="breadcrumb">([\s\S]*?)<\/div>/) || ['', ''])[1]
      .matchAll(/<span>([\s\S]*?)<\/span>/g)].map((c) => strip(c[1]));
    body = body
      .replace(/<div class="breadcrumb">[\s\S]*?<\/div>/, '')
      .replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '');
    sections.push({ id: m[1], title: h1 ? strip(h1) : null, crumbs, body });
  }
  return sections;
}

// A chapter is a section with an <h1>, plus every section after it that has
// none. Inside it each <h2> starts a new block; whatever precedes the first
// <h2> becomes the chapter intro.
function toChapters(sections) {
  const chapters = [];
  for (const s of sections) {
    if (s.title !== null) {
      chapters.push({ id: s.id, slug: SLUGS[s.id], title: s.title, crumbs: s.crumbs, parts: [s] });
    } else {
      chapters[chapters.length - 1].parts.push(s);
    }
  }
  return chapters.map((ch) => {
    const blocks = [];
    for (const part of ch.parts) {
      part.body.split(/(?=<h2\b)/).forEach((piece, i) => {
        const html = tidy(piece);
        if (!html) return;
        if (i === 0 && !piece.trimStart().startsWith('<h2')) {
          blocks.push({ id: part.id, title: '', html });
          return;
        }
        const withId = piece.match(/<h2[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h2>/);
        const plain = piece.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
        blocks.push({
          id: (withId && withId[1]) || `${part.id}-${i}`,
          title: strip(withId ? withId[2] : plain ? plain[1] : ''),
          html: html.replace(/<h2[^>]*>[\s\S]*?<\/h2>/, '').trim(),
        });
      });
    }
    return { ...ch, blocks };
  });
}

// --- the 151-test reference -------------------------------------------------

const DT_FIELDS = [
  ['why', 0], ['fails', 1], ['fix', 2], ['category', 3], ['notes', 4],
];

function parseTests(html) {
  // Everything before the first <h3> is the stats/legend/contents strip.
  const introEnd = html.indexOf('<h3');
  const intro = tidy(html.slice(0, introEnd));

  const labels = {};
  const badgeKey = { 'lvl-page': 'lvlPage', 'lvl-site': 'lvlSite', 'sev-critical': 'sevCritical',
    'sev-warning': 'sevWarning', 'sev-notice': 'sevNotice', 'sev-mixed': 'sevMixed', 'ai-yes': 'aiYes' };
  for (const b of html.matchAll(/<span class="badge ([a-z-]+)">([\s\S]*?)<\/span>/g)) {
    if (badgeKey[b[1]]) labels[badgeKey[b[1]]] = strip(b[2]);
  }
  const dtSeen = [];
  for (const d of html.matchAll(/<dt>([\s\S]*?)<\/dt>/g)) {
    const v = strip(d[1]);
    if (!dtSeen.includes(v)) dtSeen.push(v);
  }
  DT_FIELDS.forEach(([key, i]) => { if (dtSeen[i]) labels[key] = dtSeen[i]; });

  // "<strong>What it checks.</strong>" opens every test body.
  const firstChecks = html.match(/<p><strong>([^<]*?)<\/strong>/);
  if (firstChecks) labels.checks = strip(firstChecks[1]).replace(/\.$/, '');

  // h3 = category, h5 = group, details.test-entry = test.
  const categories = [];
  let howToRead = null;
  const re = /<h3[^>]*(?:id="([^"]*)")?[^>]*>([\s\S]*?)<\/h3>|<h5>([\s\S]*?)<\/h5>|<details class="test-entry" id="([^"]+)">([\s\S]*?)<\/details>/g;
  let m;
  let pendingH3 = null;
  while ((m = re.exec(html))) {
    if (m[2] !== undefined) {
      const title = strip(m[2]);
      // The first h3 is prose ("How to read each test"), not a category.
      if (!categories.length && !/access|quality/i.test(title) && howToRead === null) {
        const next = html.indexOf('<h3', m.index + 1);
        howToRead = { title, html: tidy(html.slice(m.index + m[0].length, next === -1 ? undefined : next)) };
        continue;
      }
      pendingH3 = { id: m[1] || slugify(title), title, groups: [] };
      categories.push(pendingH3);
      continue;
    }
    if (m[3] !== undefined) {
      categories[categories.length - 1].groups.push({ id: slugify(m[3]), title: strip(m[3]), tests: [] });
      continue;
    }
    // a test
    const body = m[5];
    const badges = [...body.matchAll(/<span class="badge ([a-z-]+)">/g)].map((b) => b[1]);
    const fields = {};
    const dds = [...body.matchAll(/<dt>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g)];
    dds.forEach((d) => {
      const label = strip(d[1]);
      const idx = dtSeen.indexOf(label);
      const key = (DT_FIELDS.find(([, i]) => i === idx) || [])[0];
      if (key) fields[key] = tidy(d[2]);
    });
    const checks = (body.match(/<p><strong>[^<]*<\/strong>([\s\S]*?)<\/p>/) || ['', ''])[1];
    const group = categories[categories.length - 1].groups.slice(-1)[0];
    group.tests.push({
      id: m[4],
      title: strip((body.match(/<span class="test-title">([\s\S]*?)<\/span>/) || ['', ''])[1]),
      level: badges.includes('lvl-site') ? 'site' : 'page',
      severity: (badges.find((b) => b.startsWith('sev-')) || 'sev-none').slice(4),
      ai: badges.includes('ai-yes'),
      checks: tidy(checks),
      ...fields,
    });
  }
  return { intro, labels, howToRead, categories };
}

// --- run --------------------------------------------------------------------

const [enFile, frFile, root] = process.argv.slice(2);
const en = toChapters(parse(enFile));
const fr = toChapters(parse(frFile));

if (en.length !== fr.length) throw new Error(`chapter count differs: ${en.length} vs ${fr.length}`);
en.forEach((c, i) => {
  if (c.id !== fr[i].id) throw new Error(`chapter ${i} id differs: ${c.id} vs ${fr[i].id}`);
  if (c.blocks.length !== fr[i].blocks.length) {
    throw new Error(`chapter ${c.id}: block count differs EN ${c.blocks.length} vs FR ${fr[i].blocks.length}`);
  }
  c.blocks.forEach((b, j) => {
    if (b.id !== fr[i].blocks[j].id) throw new Error(`chapter ${c.id} block ${j}: ${b.id} vs ${fr[i].blocks[j].id}`);
  });
});

// Lift the test reference out of Technical Audit into its own chapter.
const tests = {};
for (const [lang, set] of [['en', en], ['fr', fr]]) {
  const ta = set.find((c) => c.slug === 'technical-audit');
  const idx = ta.blocks.findIndex((b) => b.id === TESTS_BLOCK);
  if (idx === -1) throw new Error(`${lang}: ${TESTS_BLOCK} not found in technical-audit`);
  const [block] = ta.blocks.splice(idx, 1);
  // It keeps Technical Audit's place in the nav: the sidebar groups chapters
  // by the middle crumb, and lifting this block out left it without one.
  const crumbs = [...ta.crumbs.slice(0, -1), block.title];
  tests[lang] = { title: block.title, breadcrumb: crumbs, ...parseTests(block.html) };
}

const count = (t) => t.categories.reduce((n, c) => n + c.groups.reduce((k, g) => k + g.tests.length, 0), 0);
if (count(tests.en) !== count(tests.fr)) throw new Error(`test count differs: ${count(tests.en)} vs ${count(tests.fr)}`);

// French sorts the tests inside each group by its own (translated) titles, so
// the two trees do not line up positionally. The runtime merges Tolgee's
// arrays index by index, so FR is rebuilt in English order, matched on the
// test id — the one thing that is the same in both files. Group and category
// titles are looked up through the first test each one contains.
function realign(enTree, frTree) {
  const byId = new Map();
  for (const c of frTree.categories) {
    for (const g of c.groups) {
      for (const t of g.tests) byId.set(t.id, { test: t, group: g.title, category: c.title });
    }
  }
  const categories = enTree.categories.map((c) => {
    const groups = c.groups.map((g) => {
      const hits = g.tests.map((t) => {
        const hit = byId.get(t.id);
        if (!hit) throw new Error(`test ${t.id} is missing from the French file`);
        return hit;
      });
      return { id: g.id, title: hits[0].group, tests: hits.map((h) => h.test) };
    });
    return { id: c.id, title: byId.get(c.groups[0].tests[0].id).category, groups };
  });
  return { ...frTree, categories };
}
tests.fr = realign(tests.en, tests.fr);

const localesDir = path.join(root, 'src/locales/docs');
fs.mkdirSync(localesDir, { recursive: true });
fs.mkdirSync(path.join(root, 'src/content'), { recursive: true });

const banner = (lang) =>
  `// ${lang.toUpperCase()} copy of the whole documentation, one entry per chapter (keyed by slug).\n` +
  '// Generated from the authored docs export by scripts/extract-docs.mjs.\n' +
  '// Managed in Tolgee under docs.<slug>.* — ids and flags live in\n' +
  '// src/content/docs-structure.js and are never translated.\n';

// One file per language, src/locales/docs/<lang>.js, keyed by chapter slug in
// reading order; the test reference sits right after the Technical Audit.
for (const [lang, set] of [['en', en], ['fr', fr]]) {
  const chapters = {};
  for (const ch of set) {
    chapters[ch.slug] = {
      title: ch.title,
      breadcrumb: ch.crumbs,
      blocks: ch.blocks.map((b) => ({ id: b.id, title: b.title, html: b.html })),
    };
    if (ch.slug !== 'technical-audit') continue;
    // The test reference keeps only text in the locale file; level/severity/ai
    // are classification, so they live in the structure file instead.
    const t = tests[lang];
    chapters[TESTS_SLUG] = {
      title: t.title,
      breadcrumb: t.breadcrumb,
      intro: t.intro,
      labels: t.labels,
      howToRead: t.howToRead,
      categories: t.categories.map((c) => ({
        id: c.id,
        title: c.title,
        groups: c.groups.map((g) => ({
          id: g.id,
          title: g.title,
          tests: g.tests.map(({ level, severity, ai, ...rest }) => rest),
        })),
      })),
    };
  }
  fs.writeFileSync(path.join(localesDir, `${lang}.js`), banner(lang) + 'export default ' + JSON.stringify(chapters, null, 2) + ';\n', 'utf8');
}

const order = en.map((c) => c.slug);
order.splice(order.indexOf('technical-audit') + 1, 0, TESTS_SLUG);

const structure = order.map((slug) => {
  if (slug === TESTS_SLUG) {
    return {
      id: 'reference-tests', slug, kind: 'tests',
      blocks: tests.en.categories.map((c) => c.id),
      tests: Object.fromEntries(tests.en.categories.flatMap((c) =>
        c.groups.flatMap((g) => g.tests.map((t) => [t.id, { level: t.level, severity: t.severity, ai: t.ai }])))),
    };
  }
  const ch = en.find((c) => c.slug === slug);
  return { id: ch.id, slug, kind: 'prose', blocks: ch.blocks.map((b) => b.id) };
});

fs.writeFileSync(path.join(root, 'src/content/docs-structure.js'),
  '// Language-neutral shape of the documentation: chapter order, route slugs,\n' +
  '// the anchor id of every block, and the classification of every Technical\n' +
  '// Audit test. Never translated — the copy for each chapter lives in\n' +
  '// src/locales/docs/<lang>.js.\n' +
  '// Generated by scripts/extract-docs.mjs.\n' +
  `export const DOC_CHAPTERS = ${JSON.stringify(structure, null, 2)};\n\n` +
  'export const DOC_SLUGS = DOC_CHAPTERS.map((c) => c.slug);\n', 'utf8');

for (const ch of en) {
  const bytes = ch.blocks.reduce((n, b) => n + b.html.length, 0);
  console.log(`${ch.slug.padEnd(18)} ${String(ch.blocks.length).padStart(3)} blocks  ${String(Math.round(bytes / 1024)).padStart(4)} KB`);
}
console.log(`${TESTS_SLUG.padEnd(18)} ${String(count(tests.en)).padStart(3)} tests   ` +
  `${String(Math.round(JSON.stringify(tests.en).length / 1024)).padStart(4)} KB`);
console.log(`\n${order.length} chapters written for en + fr`);
