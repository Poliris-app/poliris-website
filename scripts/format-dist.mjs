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

const htmlFiles = await collectHtmlFiles(DIST_DIR);

for (const file of htmlFiles) {
  const source = await readFile(file, 'utf8');
  const match = source.match(HEAD_RE);
  if (!match) continue;

  // Only reformat <head>...</head> — the <body> is React's SSR output
  // and must stay byte-for-byte identical, or client hydration mismatches
  // (whitespace inside hydrated markup breaks React's reconciliation).
  const formattedHead = await prettier.format(match[1], {
    parser: 'html',
    printWidth: 120,
    htmlWhitespaceSensitivity: 'ignore',
  });
  const rebuilt = source.replace(HEAD_RE, `<head>\n${formattedHead.trim()}\n  </head>`);
  await writeFile(file, rebuilt);
}

console.log(`[format-dist] formatted ${htmlFiles.length} HTML file(s)`);
