/* Folds the standalone build into a single .html file.
 *
 *   npx vite build --config vite.standalone.config.js
 *   node scripts/build-standalone.mjs
 *
 * The Vite build already emits just one script and one stylesheet (see
 * vite.standalone.config.js). What is left is everything the page fetches
 * at runtime:
 *
 *   - images under public/, referenced as "/name.png" -> data URIs
 *   - the dashboard demo, an iframe pointing at public/onboarding-flow.html
 *     -> a Blob built from an inlined, patched copy
 *
 * The iframe copy needs three small patches, all of them because it is no
 * longer loaded from a URL:
 *   1. it reads ?embed and ?hold off location.search, which a blob: URL
 *      does not carry, so those reads are replaced with the literal query
 *      the page would have passed;
 *   2. it only accepts postMessages from its own origin, and a blob frame
 *      made by a file:// page has an opaque one;
 *   3. for the same reason the parent's postMessage targetOrigin is
 *      widened, in the bundle, to "*".
 * Without 2 and 3 the demo would never receive "pf-play" and would sit
 * frozen on its first frame.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(ROOT, 'dist-standalone');
const OUT = path.join(DIST, 'poliris-landing.html');

const read = (p) => readFileSync(p, 'utf8');

const MIME = {
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.gif': 'image/gif',
  '.ico': 'image/x-icon',
};

let html = read(path.join(DIST, 'index.html'));
let js = read(path.join(DIST, 'app.js'));
const css = read(path.join(DIST, 'app.css'));

/* ── 1. Public images -> data URIs ─────────────────────────────── */

/* One window's title-bar icon is a bare filename in config, joined to the
   base at render: src={`/${w.icon}`}. Once the filename is a data URI that
   leading slash would break it, so the join goes first. */
const joined = js.replace(/src:`\/\$\{([A-Za-z_$][\w$]*)\.icon\}`/g, 'src:$1.icon');
if (joined === js) throw new Error('bundle: the title-bar icon join was not found');
js = joined;

// Both shapes the bundle uses: `/name.png` for a direct src, and `name.png`
// for the one held in config.
const inlined = [];
js = js.replace(/`\/?([A-Za-z0-9._/-]+\.(?:png|jpe?g|svg|webp|gif|ico))`/g, (whole, name) => {
  const file = path.join(ROOT, 'public', name);
  if (!existsSync(file)) return whole;
  const mime = MIME[path.extname(name).toLowerCase()];
  if (!mime) return whole;
  const data = readFileSync(file).toString('base64');
  inlined.push(`${name} ${Math.round(data.length / 1024)}KB`);
  return `\`data:${mime};base64,${data}\``;
});

/* ── 2. The dashboard iframe ───────────────────────────────────── */

const flowPath = path.join(ROOT, 'public', 'onboarding-flow.html');
let flow = read(flowPath);
const before = flow;

// (1) ?embed and ?hold, which a blob: URL cannot carry.
flow = flow.replaceAll('location.search', '"?embed&hold"');
// (2) the frame's own-origin check on incoming messages.
flow = flow.replace(/if \(e\.origin !== location\.origin\) return;\s*/, '');
if (flow === before) throw new Error('onboarding-flow.html: no patch applied, check the markers');

// (3) the parent's targetOrigin.
const widened = js.replace(/postMessage\(([^,()]+),\s*window\.location\.origin\)/g, 'postMessage($1,"*")');
if (widened === js) throw new Error('bundle: postMessage targetOrigin not found');
js = widened;

const flowB64 = Buffer.from(flow, 'utf8').toString('base64');

/* React sets the iframe's src from a prop, so the swap happens in the DOM
   rather than in the bundle: the src is rewritten as soon as the element
   appears, and again if React ever writes it back. */
const prelude = `
<script id="pf-inline-flow">
(function () {
  var url = URL.createObjectURL(new Blob(
    [decodeURIComponent(escape(atob("${flowB64}")))],
    { type: 'text/html' }
  ));
  function swap() {
    var frames = document.querySelectorAll('iframe.hreveal__iframe');
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].src !== url) frames[i].src = url;
    }
  }
  new MutationObserver(swap).observe(document.documentElement, {
    childList: true, subtree: true, attributes: true, attributeFilter: ['src'],
  });
  if (document.readyState !== 'loading') swap();
  else document.addEventListener('DOMContentLoaded', swap);
})();
</script>`;

/* ── 3. Fold it all into one document ──────────────────────────── */

/* Every insert goes through a replacer function: the bundle contains "$&"
   and "$`", which String.replace would expand if the replacement were a
   plain string - that alone inflated an earlier run to 7 MB. */
html = html
  .replace(/<script type="module"[^>]*src="[^"]*"[^>]*><\/script>/, '')
  .replace(/<link rel="stylesheet"[^>]*href="[^"]*"[^>]*>/, '')
  // The favicon is a public file the single page cannot fetch.
  .replace(/<link rel="icon"[^>]*>/, '')
  .replace('</head>', () => `<style>\n${css}\n</style>\n</head>`)
  .replace('</body>', () => `${prelude}\n<script type="module">\n${js}\n</script>\n</body>`);

writeFileSync(OUT, html, 'utf8');

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
console.log(`wrote ${OUT}`);
console.log(`  total      ${kb(Buffer.byteLength(html))}`);
console.log(`  styles     ${kb(css.length)}`);
console.log(`  script     ${kb(js.length)}`);
console.log(`  dashboard  ${kb(flowB64.length)} (inlined iframe)`);
console.log(`  images     ${inlined.length} inlined: ${inlined.join(', ')}`);
