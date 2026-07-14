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
// declared in the page component — so JSX order alone can't produce
// title -> canonical -> hreflang -> description. Pull each piece out
// by regex and reassemble in that exact sequence before the rest of
// <head> (whatever wasn't matched, in its original order).
const TITLE_RE      = /<title\b[^>]*>[^<]*<\/title>/;
const CANONICAL_RE  = /<link\b(?=[^>]*\brel="canonical")[^>]*>/;
const HREFLANG_RE   = /<link\b(?=[^>]*\brel="alternate")[^>]*>/g;
const DESCRIPTION_RE = /<meta\b(?=[^>]*\bname="description")[^>]*>/;

function reorderHead(head) {
  let rest = head;
  const pull = (re) => {
    const m = rest.match(re);
    if (!m) return null;
    rest = rest.replace(m[0], '');
    return m[0];
  };

  const title = pull(TITLE_RE);
  const canonical = pull(CANONICAL_RE);
  const hreflangs = [...rest.matchAll(HREFLANG_RE)].map((m) => m[0]);
  hreflangs.forEach((tag) => { rest = rest.replace(tag, ''); });
  const description = pull(DESCRIPTION_RE);

  return [title, canonical, ...hreflangs, description].filter(Boolean).join('\n') + rest;
}

const htmlFiles = await collectHtmlFiles(DIST_DIR);

for (const file of htmlFiles) {
  const source = await readFile(file, 'utf8');
  const match = source.match(HEAD_RE);
  if (!match) continue;

  // Only reformat <head>...</head> — the <body> is React's SSR output
  // and must stay byte-for-byte identical, or client hydration mismatches
  // (whitespace inside hydrated markup breaks React's reconciliation).
  const reordered = reorderHead(match[1]);
  const formattedHead = await prettier.format(reordered, {
    parser: 'html',
    printWidth: 120,
    htmlWhitespaceSensitivity: 'ignore',
  });
  const rebuilt = source.replace(HEAD_RE, `<head>\n${formattedHead.trim()}\n  </head>`);
  await writeFile(file, rebuilt);
}

console.log(`[format-dist] formatted ${htmlFiles.length} HTML file(s)`);
