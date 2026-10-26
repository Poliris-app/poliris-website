import { resolveAnchor } from '../../content/docs-content';

/**
 * Rewrites the bare "#anchor" links of an authored block for the chapter it
 * is shown on. Runs on the HTML string, so the prerendered page already
 * carries the right hrefs:
 *  - same chapter, known id   → kept as an in-page anchor
 *  - same chapter, no id      → plain text (nowhere to go)
 *  - another chapter          → /:lang/docs/:slug(#id), followed by the router
 *  - a chapter with no page   → plain text
 */
export function rewriteDocLinks(html, currentSlug, lang) {
  return String(html ?? '').replace(/<a href="#([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g, (_m, id, attrs, text) => {
    const target = resolveAnchor(id);
    if (!target) return text;
    if (target.slug === currentSlug) return target.hash ? `<a href="#${target.hash}"${attrs}>${text}</a>` : text;
    const href = `/${lang}/docs/${target.slug}${target.hash ? `#${target.hash}` : ''}`;
    return `<a href="${href}"${attrs} data-docs-link>${text}</a>`;
  });
}

/**
 * Click handler for a rich-text container: chapter links go through the
 * router, and a screenshot opens full size through `onZoom`.
 */
export function followDocLinks(navigate, onZoom) {
  return (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const img = e.target.closest?.('.docs-figure img');
    if (img && onZoom) {
      onZoom({ src: img.currentSrc || img.src, alt: img.alt });
      return;
    }
    const a = e.target.closest?.('a[data-docs-link]');
    if (!a) return;
    e.preventDefault();
    navigate(a.getAttribute('href'));
  };
}
