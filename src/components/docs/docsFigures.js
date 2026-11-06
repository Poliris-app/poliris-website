// Gives each screenshot figure of an authored block its final HTML before it
// is drawn, so no figure ever changes size under the reader (a slot that
// shrank once its image turned out to be missing made the page jump while
// scrolling, and shake on refresh).
//
//  - The screenshot exists: its <img> gets its box inline (width and aspect
//    ratio from its own attributes), so the space is held before it loads.
//  - It does not exist yet: in development the figure becomes a dashed
//    placeholder of the very same size, naming the file it waits for; on the
//    built site it is left out of the page, so visitors and crawlers never
//    meet a broken image.
//
// Which files exist comes from vite.config.js (__DOCS_IMAGES__). Without that
// list (another tool loading this module) every figure is kept as it is.

/* global __DOCS_IMAGES__ */
const AVAILABLE = typeof __DOCS_IMAGES__ === 'undefined' ? null : new Set(__DOCS_IMAGES__);

const FIGURE = /<figure class="docs-figure"([^>]*)>([\s\S]*?)<\/figure>/g;
const attr = (tag, name) => new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1] ?? '';

export function prepareFigures(html, dev = import.meta.env.DEV) {
  return String(html ?? '').replace(FIGURE, (whole, attrs, inner) => {
    const img = /<img\b[^>]*>/.exec(inner)?.[0];
    if (!img) return whole;
    const src = attr(img, 'src');
    const w = Number(attr(img, 'width'));
    const h = Number(attr(img, 'height'));
    const sized = w > 0 && h > 0;
    const file = decodeURIComponent(src.split('/').pop() ?? '');
    const present = !AVAILABLE || !src.startsWith('/docs/images/') || AVAILABLE.has(file);

    if (present) {
      if (!sized || /\sstyle="/.test(img)) return whole;
      const boxed = img.replace('<img', `<img style="width:${w}px;aspect-ratio:${w} / ${h}"`);
      return `<figure class="docs-figure"${attrs}>${inner.replace(img, boxed)}</figure>`;
    }
    if (!dev) return '';
    const vars = sized ? ` style="--shot-w:${w}px;--shot-ratio:${w} / ${h}"` : '';
    return `<figure class="docs-figure docs-figure--missing"${attrs} data-file="${src}"${vars}>${inner}</figure>`;
  });
}
