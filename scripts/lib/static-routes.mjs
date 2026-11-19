// Single list of prerendered routes. Used by vite.config.js (what to build)
// and scripts/generate-sitemap.mjs (what to list), so the two can't drift.
import { LANGS, PAGE_SLUGS, BLOG_POST_SLUGS } from '../../src/seo.js';
import { DOC_SLUGS } from '../../src/content/docs-structure.js';

export function getStaticRoutes() {
  const slugs = Object.values(PAGE_SLUGS);
  return LANGS.flatMap((lang) => [
    ...slugs.map((slug) => (slug ? `/${lang}/${slug}` : `/${lang}/`)),
    ...BLOG_POST_SLUGS.map((slug) => `/${lang}/blog/${slug}`),
    ...DOC_SLUGS.map((slug) => `/${lang}/docs/${slug}`),
  ]);
}
