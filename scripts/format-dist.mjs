// Post-build step: pretty-prints the static HTML vite-react-ssg emits.
// react-helmet injects <title>/<meta>/<link> into <head> as one
// unbroken string, so "view source" shows everything on line 1.
// This only touches whitespace in the build output — no effect on
// how browsers or crawlers parse the page.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import prettier from 'prettier';

const DIST_DIR = new URL('../dist', import.meta.url).pathname;

async function collectHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return collectHtmlFiles(full);
      return entry.name.endsWith('.html') ? [full] : [];
    })
  );
  return files.flat();
}

const HEAD_RE = /<head>([\s\S]*?)<\/head>/;

// react-helmet injects title/meta/link grouped by tag type (all titles,
// then all metas, then all links) regardless of the order they're
// declared in the page component, and the static template tags
// (charset/viewport/icon/script/stylesheet) always land after that
// whole block. Neither of those is the order the tickets ask for, so
// pull every piece out by regex and reassemble in the exact requested
// sequence: charset, title, viewport -> canonical, hreflang(s) ->
// description -> icon -> script, stylesheet.
const TITLE_RE       = /<title\b[^>]*>[^<]*<\/title>/;
const CANONICAL_RE   = /<link\b(?=[^>]*\brel="canonical")[^>]*>/;
const HREFLANG_RE    = /<link\b(?=[^>]*\brel="alternate")[^>]*>/g;
const DESCRIPTION_RE = /<meta\b(?=[^>]*\bname="description")[^>]*>/;
const CHARSET_RE     = /<meta\b(?=[^>]*\bcharset=)[^>]*>/;
const VIEWPORT_RE    = /<meta\b(?=[^>]*\bname="viewport")[^>]*>/;
const ROBOTS_RE       = /<meta\b(?=[^>]*\bname="robots")[^>]*>/;
const ICON_RE        = /<link\b(?=[^>]*\brel="icon")[^>]*>/;
const SCRIPT_RE      = /<script\b[^>]*>[\s\S]*?<\/script>/;
const STYLESHEET_RE  = /<link\b(?=[^>]*\brel="stylesheet")[^>]*>/;
const COMMENT_RE     = /<!--[\s\S]*?-->/;

// Open Graph / Twitter tags — only present on pages using the shared
// <Seo> component (home, visibility, sentiment, etc.), not the blog
// posts' hand-written <Head>. react-helmet leaves data-rh in its
// natural (first) position for these; only the group's own order and
// its position relative to the rest of <head> needs fixing.
const OG_SITE_NAME_RE    = /<meta\b(?=[^>]*\bproperty="og:site_name")[^>]*>/;
const OG_TYPE_RE         = /<meta\b(?=[^>]*\bproperty="og:type")[^>]*>/;
const OG_TITLE_RE        = /<meta\b(?=[^>]*\bproperty="og:title")[^>]*>/;
const OG_DESCRIPTION_RE  = /<meta\b(?=[^>]*\bproperty="og:description")[^>]*>/;
const OG_URL_RE          = /<meta\b(?=[^>]*\bproperty="og:url")[^>]*>/;
const OG_LOCALE_RE       = /<meta\b(?=[^>]*\bproperty="og:locale")[^>]*>/;
const TWITTER_CARD_RE        = /<meta\b(?=[^>]*\bname="twitter:card")[^>]*>/;
const TWITTER_TITLE_RE       = /<meta\b(?=[^>]*\bname="twitter:title")[^>]*>/;
const TWITTER_DESCRIPTION_RE = /<meta\b(?=[^>]*\bname="twitter:description")[^>]*>/;

function reorderHead(head) {
  let rest = head;
  const pull = (re) => {
    const m = rest.match(re);
    if (!m) return null;
    rest = rest.replace(m[0], '');
    return m[0];
  };

  // react-helmet always puts data-rh="true" first in the attribute list.
  // The ticket's reference structure puts it last (and omits it on
  // <title> entirely) — move it to match.
  const moveDataRhLast = (tag) => tag && tag.replace(/\s*data-rh="true"/, '').replace(/\/?>$/, ' data-rh="true">');
  const stripDataRh = (tag) => tag && tag.replace(/\s*data-rh="true"/, '');

  const charset = pull(CHARSET_RE);
  const title = stripDataRh(pull(TITLE_RE));
  const viewport = pull(VIEWPORT_RE);
  const canonical = moveDataRhLast(pull(CANONICAL_RE));
  const hreflangs = [...rest.matchAll(HREFLANG_RE)].map((m) => m[0]);
  hreflangs.forEach((tag) => { rest = rest.replace(tag, ''); });
  const orderedHreflangs = hreflangs.map(moveDataRhLast);
  const description = moveDataRhLast(pull(DESCRIPTION_RE));
  // robots/comment are pulled out (so they don't linger in `rest`) but
  // intentionally omitted below — the ticket's structure doesn't include
  // them, and dropping <meta name="robots"> is a no-op for crawlers:
  // "index, follow" is the default when the tag is absent.
  pull(ROBOTS_RE);
  const icon = pull(ICON_RE);
  pull(COMMENT_RE);
  const script = pull(SCRIPT_RE);
  const stylesheet = pull(STYLESHEET_RE);

  const ogSiteName = pull(OG_SITE_NAME_RE);
  const ogType = pull(OG_TYPE_RE);
  const ogTitle = pull(OG_TITLE_RE);
  const ogDescription = pull(OG_DESCRIPTION_RE);
  const ogUrl = pull(OG_URL_RE);
  const ogLocale = pull(OG_LOCALE_RE);
  const twitterCard = pull(TWITTER_CARD_RE);
  const twitterTitle = pull(TWITTER_TITLE_RE);
  const twitterDescription = pull(TWITTER_DESCRIPTION_RE);

  // Pages built from the shared <Seo> component (home, visibility, etc.)
  // carry Open Graph tags and want a different group order than the
  // blog posts' hand-written <Head>, which has neither OG tags nor a
  // bundled stylesheet/script pulled into <head> the same way.
  const groups = ogSiteName
    ? [
        [charset, viewport, title],
        [stylesheet],
        [script],
        [icon, canonical, ...orderedHreflangs, description],
        [ogSiteName, ogType, ogTitle, ogDescription, ogUrl, ogLocale, twitterCard, twitterTitle, twitterDescription],
      ]
    : [
        [charset, title, viewport],
        [canonical, ...orderedHreflangs],
        [description],
        [icon],
        [script, stylesheet],
      ];

  const finalGroups = groups
    .map((group) => group.filter(Boolean).join('\n'))
    .filter(Boolean);

  return finalGroups.join('\n\n') + rest;
}

// Cosmetic normalization to match the ticket's literal HTML5 style:
// prettier always self-closes void elements (`<meta ... />`) and the
// browser serializes boolean attributes as `crossorigin=""` — neither
// changes how the tag parses, but strip them to match byte-for-byte.
function normalizeSyntax(html) {
  return html
    .replace(/(<meta\b[^>]*?)\s*\/>/g, '$1>')
    .replace(/(<link\b[^>]*?)\s*\/>/g, '$1>')
    .replace(/crossorigin=""/g, 'crossorigin');
}

const htmlFiles = await collectHtmlFiles(DIST_DIR);

for (const file of htmlFiles) {
  const source = await readFile(file, 'utf8');
  const match = source.match(HEAD_RE);
  if (!match) continue;

  // dist/docs/ is a static embeddable-docs micro-site copied verbatim
  // from public/docs — it's not built by vite-react-ssg/react-helmet,
  // so none of the tag-extraction assumptions below apply to it. Only
  // touch files that actually carry react-helmet's data-rh marker.
  if (!match[1].includes('data-rh="true"')) continue;

  // Only reformat <head>...</head> — the <body> is React's SSR output
  // and must stay byte-for-byte identical, or client hydration mismatches
  // (whitespace inside hydrated markup breaks React's reconciliation).
  const reordered = reorderHead(match[1]);
  const formattedHead = await prettier.format(reordered, {
    parser: 'html',
    printWidth: 400,
    htmlWhitespaceSensitivity: 'ignore',
  });
  const finalHead = normalizeSyntax(formattedHead.trim());
  const rebuilt = source.replace(HEAD_RE, `<head>\n${finalHead}\n  </head>`);
  await writeFile(file, rebuilt);
}

console.log(`[format-dist] formatted ${htmlFiles.length} HTML file(s)`);
