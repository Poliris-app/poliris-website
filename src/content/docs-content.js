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
// S31: Keyword Tracker. S39: Technical Fixes. S44: Search Console connection.
const UNRELEASED_SHOTS = new Set(['S31', 'S39', 'S44']);
const dropUnreleasedFigures = (html) => String(html ?? '').replace(
  /<figure class="docs-figure" data-shot="([A-Z0-9]+)">[\s\S]*?<\/figure>/g,
  (m, shot) => (UNRELEASED_SHOTS.has(shot) ? '' : m),
);

// Whether live Tolgee values are merged over the docs copy. Off for now: the
// merge goes by section position, and the docs in the code have changed
// (sections removed, screenshots renamed) since anything Tolgee may hold, so
// an old Tolgee copy would land in the wrong sections. Turn back on once the
// current docs copy has been uploaded to Tolgee. The rest of the site is not
// affected: LangContext still merges Tolgee over the main locale files.
const USE_TOLGEE_FOR_DOCS = false;

/** One chapter's copy, with any live Tolgee values merged over it. */
export function getChapter(slug, lang, tolgee) {
  const base = raw(slug, lang);
  if (!base) return null;
  const copy = USE_TOLGEE_FOR_DOCS ? merge(base, tolgee?.[lang]?.docs?.[slug]) : base;
  if (!copy.blocks) return copy;
  return { ...copy, blocks: copy.blocks.map((b) => ({ ...b, html: dropUnreleasedFigures(b.html) })) };
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
