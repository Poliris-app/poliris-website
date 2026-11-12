// Loads the generated documentation copy and merges Tolgee's live values over
// it, the same way LangContext does for the main locale files.
//
// The copy is one file per language, keyed by chapter slug. Both are imported
// eagerly on purpose: the whole docs section is one lazily-loaded route chunk
// (see routes.jsx), so none of this reaches the main bundle, and once a reader
// is in the docs every chapter is already there.
import { DOC_CHAPTERS } from './docs-structure';
import DOCS_EN from '../locales/docs/en';
import DOCS_FR from '../locales/docs/fr';

const DOCS = { en: DOCS_EN, fr: DOCS_FR };

function raw(slug, lang) {
  return DOCS[lang]?.[slug] ?? DOCS.en[slug] ?? null;
}

// Same leaf-by-leaf merge LangContext uses, so a chapter that is only
// partly translated in Tolgee keeps the generated copy for the rest.
function merge(base, overrides) {
  if (overrides === undefined) return base;
  if (Array.isArray(base) && Array.isArray(overrides)) {
    return Array.from({ length: Math.max(base.length, overrides.length) }, (_v, i) => merge(base[i], overrides[i]));
  }
  if (typeof base !== 'object' || base === null || Array.isArray(base)) return overrides ?? base;
  const out = { ...base };
  for (const k of Object.keys(overrides)) out[k] = merge(base[k], overrides[k]);
  return out;
}

// Screenshots of features that are not in production yet. The generated copy
// already leaves them out (UNRELEASED_SHOTS in scripts/extract-docs.mjs), but
// Tolgee can still hold an older copy of a block with the figure in it, so
// they are taken out again after the merge. Their text stays.
// S31: Keyword Tracker. S39: Technical Fixes.
const UNRELEASED_SHOTS = new Set(['S31', 'S39']);
const dropUnreleasedFigures = (html) => String(html ?? '').replace(
  /<figure class="docs-figure" data-shot="([A-Z0-9]+)">[\s\S]*?<\/figure>/g,
  (m, shot) => (UNRELEASED_SHOTS.has(shot) ? '' : m),
);

// Lists that several chapters quote and that must not drift apart. The copy
// holds a token; it is expanded here, after the Tolgee merge, so a chapter
// whose translation still carries the token gets the current list too.
// Checked by the docs consistency test (scripts/check-docs.mjs).
const SNIPPETS = {
  en: { 'free-models': 'ChatGPT, Gemini, Perplexity, Claude, Grok, Google AI Mode, Google AI Overview' },
  fr: { 'free-models': 'ChatGPT, Gemini, Perplexity, Claude, Grok, Google AI Mode, Google AI Overview' },
};
const expandSnippets = (html, lang) => String(html ?? '').replace(
  /\{\{([a-z0-9-]+)\}\}/g,
  (m, name) => SNIPPETS[lang]?.[name] ?? SNIPPETS.en[name] ?? m,
);

// Whether live Tolgee values are merged over the docs copy. Off for now: the
// merge goes by section position, and the docs in the code have changed
// (sections removed, screenshots renamed) since anything Tolgee may hold, so
// an old Tolgee copy would land in the wrong sections. Turn back on once the
// current docs copy has been uploaded to Tolgee. The rest of the site is not
// affected: LangContext still merges Tolgee over the main locale files.
const USE_TOLGEE_FOR_DOCS = false;

// Technical terms that have a Glossary entry and that a reader may not know.
// The first time one appears in a chapter it becomes a link to its entry, so
// the chapters no longer have to repeat a definition or leave it unexplained.
// Everyday Poliris words (product, project, prompt, credits) are deliberately
// absent: they are explained in Key concepts and linking them would be noise.
// The value is the term's anchor in the Glossary (its slug there).
const GLOSSARY_LINKS = {
  en: [
    ['GEO', 'generative-engine-optimization-geo'], ['Core Web Vitals', 'core-web-vitals'], ['canonical tags', 'canonical-tag'], ['canonical tag', 'canonical-tag'],
    ['robots.txt', 'robots-txt'], ['hreflang', 'hreflang'], ['schema.org', 'schema-org'], ['Schema.org', 'schema-org'],
    ['JSON-LD', 'json-ld'], ['structured data', 'structured-data'], ['Structured Data', 'structured-data'],
    ['sitemap', 'sitemap'], ['Sitemap', 'sitemap'], ['crawler', 'crawler'], ['crawlers', 'crawler'],
    ['Knowledge Graph', 'knowledge-graph'], ['Knowledge Panel', 'knowledge-panel'], ['E-E-A-T', 'e-e-a-t'],
    ['embeddings', 'embeddings'], ['Featured Snippet', 'featured-snippet-position-zero'], ['AI Overview', 'ai-overview'],
    ['hallucination', 'hallucination-ai'], ['Query Fan-Out', 'query-fan-out'], ['YMYL', 'ymyl-your-money-or-your-life'],
    ['semantic search', 'semantic-search'], ['zero-click', 'zero-click-search'], ['chunking', 'chunking'],
    ['taxonomy', 'taxonomy'], ['ontology', 'ontology'], ['tokens', 'token'],
  ],
  fr: [
    ['GEO', 'generative-engine-optimization-geo'], ['Core Web Vitals', 'core-web-vitals'], ['balises canoniques', 'balise-canonique-canonical-tag'],
    ['balise canonique', 'balise-canonique-canonical-tag'], ['robots.txt', 'robots-txt'], ['hreflang', 'hreflang'],
    ['schema.org', 'schema-org'], ['Schema.org', 'schema-org'], ['JSON-LD', 'json-ld'],
    ['donn\u00e9es structur\u00e9es', 'donnees-structurees-structured-data'], ['sitemap', 'sitemap'], ['Sitemap', 'sitemap'],
    ['crawler', 'robot-d-exploration-crawler'], ['robots d\u2019exploration', 'robot-d-exploration-crawler'],
    ["robots d'exploration", 'robot-d-exploration-crawler'], ['Knowledge Graph', 'graphe-de-connaissances-knowledge-graph'],
    ['Knowledge Panel', 'panneau-de-connaissances-knowledge-panel'], ['E-E-A-T', 'e-e-a-t'], ['embeddings', 'embeddings'],
    ['Featured Snippet', 'featured-snippet-position-zero'], ['AI Overview', 'ai-overview'],
    ['hallucination', 'hallucination-ia'], ['Query Fan-Out', 'query-fan-out'], ['YMYL', 'ymyl-your-money-or-your-life'],
    ['recherche s\u00e9mantique', 'recherche-semantique-semantic-search'], ['taxonomie', 'taxonomie'],
    ['ontologie', 'ontologie'], ['tokens', 'token'],
  ],
};

// Tags whose text must not be touched: an existing link (no nested <a>), a
// heading or a Glossary headword (both are anchors of their own), and code.
const SKIP_IN = new Set(['a', 'dt', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figcaption']);
const WORD = /[\p{L}\p{N}_]/u;

/**
 * Links the first appearance of each technical term in a chapter. Walks the
 * markup tag by tag so a match is only ever made in ordinary text, never
 * inside a tag, an existing link or a heading, and only whole words match.
 * `used` is shared across the chapter's blocks, so one link per page per term.
 */
function linkGlossaryTerms(html, lang, used) {
  const terms = GLOSSARY_LINKS[lang] ?? GLOSSARY_LINKS.en;
  if (!terms.some(([, id]) => !used.has(id))) return html;
  const parts = String(html ?? '').split(/(<[^>]*>)/);
  const depth = [];
  return parts.map((part) => {
    if (part.startsWith('<')) {
      const close = /^<\/\s*([a-z0-9]+)/i.exec(part);
      const open = /^<\s*([a-z0-9]+)/i.exec(part);
      if (close) { const i = depth.lastIndexOf(close[1].toLowerCase()); if (i >= 0) depth.splice(i, 1); }
      else if (open && !part.endsWith('/>')) depth.push(open[1].toLowerCase());
      return part;
    }
    if (!part || depth.some((t) => SKIP_IN.has(t))) return part;
    let text = part;
    for (const [term, id] of terms) {
      if (used.has(id)) continue;
      const at = text.indexOf(term);
      if (at < 0) continue;
      const before = text[at - 1];
      const after = text[at + term.length];
      if ((before && WORD.test(before)) || (after && WORD.test(after))) continue;
      used.add(id);
      text = `${text.slice(0, at)}<a href="/${lang}/docs/glossary#${id}" data-docs-link>${term}</a>${text.slice(at + term.length)}`;
    }
    return text;
  }).join('');
}

/** One chapter's copy, with any live Tolgee values merged over it. */
export function getChapter(slug, lang, tolgee) {
  const base = raw(slug, lang);
  if (!base) return null;
  const copy = USE_TOLGEE_FOR_DOCS ? merge(base, tolgee?.[lang]?.docs?.[slug]) : base;
  if (!copy.blocks) return copy;
  // The Glossary defines the terms, so it does not link to itself.
  const used = new Set();
  const prepare = (html) => {
    const out = expandSnippets(dropUnreleasedFigures(html), lang);
    return slug === 'glossary' ? out : linkGlossaryTerms(out, lang, used);
  };
  return { ...copy, blocks: copy.blocks.map((b) => ({ ...b, html: prepare(b.html) })) };
}

/** Every chapter's title and nav group, for the sidebar and the index page. */
export function getChapterIndex(lang, tolgee) {
  return DOC_CHAPTERS.map((ch) => {
    const copy = getChapter(ch.slug, lang, tolgee);
    return {
      slug: ch.slug,
      kind: ch.kind,
      title: copy?.title ?? ch.slug,
      group: copy?.breadcrumb?.[1] ?? '',
      blocks: ch.blocks,
    };
  });
}

// The authored docs were one long page, so their cross-references are bare
// "#anchor" links. Ids are language-neutral, so the EN copy is enough to
// learn which chapter owns each one.
let anchorIndex = null;
function anchors() {
  if (anchorIndex) return anchorIndex;
  anchorIndex = new Map();
  for (const ch of DOC_CHAPTERS) {
    anchorIndex.set(ch.id, { slug: ch.slug, hash: '' });
    const copy = raw(ch.slug, 'en');
    const ids = [
      ...(ch.blocks ?? []),
      ...(copy?.blocks ?? []).flatMap((b) => [...String(b.html).matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])),
    ];
    for (const id of ids) if (!anchorIndex.has(id)) anchorIndex.set(id, { slug: ch.slug, hash: id });
  }
  return anchorIndex;
}

/**
 * Where a "#anchor" from the authored copy really lives: an exact id, or else
 * the chapter whose id prefixes it ("feature-geo-overview" → AI Reputation).
 * Null when it points at a chapter that is not published.
 */
export function resolveAnchor(id) {
  const index = anchors();
  if (index.has(id)) return index.get(id);
  const owner = DOC_CHAPTERS
    .filter((ch) => id.startsWith(`${ch.id}-`))
    .sort((a, b) => b.id.length - a.id.length)[0];
  return owner ? { slug: owner.slug, hash: '' } : null;
}

/** The sidebar's groups, in chapter order, labelled from the breadcrumbs. */
export function getNavGroups(lang, tolgee) {
  const groups = [];
  for (const ch of getChapterIndex(lang, tolgee)) {
    const last = groups[groups.length - 1];
    if (last && last.label === ch.group) last.chapters.push(ch);
    else groups.push({ label: ch.group, chapters: [ch] });
  }
  return groups;
}
