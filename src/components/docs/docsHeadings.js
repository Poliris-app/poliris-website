/**
 * Renumbers the headings of an authored block so the outline never skips a
 * level (an <h4> straight under the block's <h2> becomes an <h3>, and so on).
 * Crawlers and screen readers read that outline; the authored export does not
 * always follow it. Each heading keeps its original level as a class
 * (docs-h3, docs-h4, docs-h5), which is what docs.css styles, so nothing
 * changes visually.
 *
 * `parentLevel` is the level of the heading the block sits under: 2 when the
 * block has its own <h2> title, 1 when it sits straight under the page <h1>.
 * Headings that were siblings stay siblings: the new level comes from the
 * nearest enclosing heading, not from whatever heading came just before.
 */
export function normalizeHeadings(html, parentLevel) {
  const stack = []; // enclosing headings: { from, to }
  return String(html ?? '').replace(/<h([2-6])\b([^>]*)>([\s\S]*?)<\/h\1>/g, (_m, lvl, attrs, inner) => {
    const from = Number(lvl);
    while (stack.length && stack[stack.length - 1].from >= from) stack.pop();
    const to = (stack.length ? stack[stack.length - 1].to : parentLevel) + 1;
    stack.push({ from, to });
    const withClass = /\sclass="/.test(attrs)
      ? attrs.replace(/\sclass="/, ` class="docs-h${from} `)
      : `${attrs} class="docs-h${from}"`;
    return `<h${to}${withClass}>${inner}</h${to}>`;
  });
}
