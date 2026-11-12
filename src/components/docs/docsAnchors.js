/**
 * Readable ids and a hover anchor link for every heading.
 *
 * The authored blocks only carry ids on their <h2> sections, and those ids
 * are generated ("feature-geo-overview-1"), so a reader could link to a whole
 * section but never to one heading inside it: none of the FAQ questions, none
 * of the sub-sections of a feature page.
 *
 * Each heading now gets a slug of its own text, and a "#" link that appears on
 * hover or keyboard focus. Slugs are made unique per page through a `seen`
 * set, so two headings with the same wording do not collide. Ids an author
 * wrote by hand are kept as they are and only gain the link.
 *
 * The generated section ids stay on the <section>, so every existing
 * cross-reference and every "On this page" entry keeps working.
 */
const MAX = 60;

export function slugify(text) {
  return String(text ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:[a-z]+|#\d+|#x[0-9a-f]+);/gi, ' ')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX)
    .replace(/-+$/, '');
}

/** The slug, suffixed if this page has used it already. */
export function uniqueSlug(seen, base) {
  if (!base) return '';
  let id = base;
  for (let n = 2; seen.has(id); n += 1) id = `${base}-${n}`;
  seen.add(id);
  return id;
}

const link = (id, label) => `<a class="docs-anchor" href="#${id}" aria-label="${label}">#</a>`;

/** The id for a heading React renders itself (a block or category title). */
export const headingId = (seen, text) => uniqueSlug(seen, slugify(text)) || undefined;

/** Adds the id and the "#" link to every heading of an authored block. */
export function addHeadingAnchors(html, seen, label) {
  return String(html ?? '').replace(
    /<(h[2-6])\b([^>]*)>([\s\S]*?)<\/\1>/g,
    (m, tag, attrs, inner) => {
      const written = /\sid="([^"]*)"/.exec(attrs);
      const id = written ? written[1] : uniqueSlug(seen, slugify(inner));
      if (!id) return m;
      if (written) seen.add(id);
      const open = written ? `<${tag}${attrs}>` : `<${tag}${attrs} id="${id}">`;
      return `${open}${inner}${link(id, label)}</${tag}>`;
    },
  );
}

/** The headings of a processed block, for a page that lists its own sections. */
export function collectHeadings(html) {
  const out = [];
  const re = /<(h[2-6])\b[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/g;
  let m = re.exec(html);
  while (m) {
    const text = m[3].replace(/<a class="docs-anchor"[\s\S]*?<\/a>/g, '').replace(/<[^>]*>/g, '').trim();
    if (text) out.push({ id: m[2], level: Number(m[1][1]), text });
    m = re.exec(html);
  }
  return out;
}

/**
 * The same treatment for the Glossary's terms. <dt> is used only by the
 * Glossary's two definition lists, so every headword becomes a link target of
 * its own: /docs/glossary#crawler rather than the whole page.
 */
export function addTermAnchors(html, seen, label) {
  return String(html ?? '').replace(/<dt>([\s\S]*?)<\/dt>/g, (m, inner) => {
    const id = uniqueSlug(seen, slugify(inner));
    return id ? `<dt id="${id}">${inner}${link(id, label)}</dt>` : m;
  });
}
