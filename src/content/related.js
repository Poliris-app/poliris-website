// Internal links between product pages, documentation chapters and blog
// posts, keyed by page. RelatedLinks.jsx renders them as plain <a href>
// links in the prerendered HTML.
//
// Why: Search Console showed most blog posts as "Crawled - currently not
// indexed" and most docs chapters as "Discovered - currently not indexed".
// Those pages were linked only from the blog index or the docs navigation,
// which tells search engines they matter little. Each link here is a
// topical match: a reader of the first page has a reason to open the second.
//
// Keys: product page keys from src/seo.js PAGE_SLUGS, or "blog/<slug>".
// docs: chapter slugs (src/content/docs-structure.js); posts: blog slugs
// (src/seo.js BLOG_POST_SLUGS); product: a product page key.
export const RELATED = {
  visibility: {
    docs: ['ai-reputation', 'citations', 'glossary'],
    posts: ['ai-brand-visibility-strategies', 'entity-based-seo', 'death-of-traditional-search-geo-priority'],
  },
  sentiment: {
    docs: ['ai-reputation', 'key-concepts'],
    posts: ['ai-brand-visibility-strategies', 'death-of-traditional-search-geo-priority'],
  },
  'technical-audit': {
    docs: ['technical-audit', 'technical-fixes', 'test-reference'],
    posts: ['why-seo-is-the-cornerstone-of-geo-success', 'entity-based-seo'],
  },
  'content-writing': {
    docs: ['content', 'keywords'],
    posts: ['beyond-keywords-ai-content-generation', 'blueprint-for-high-visibility-content', 'ai-content-optimization-brand-visibility'],
  },
  pricing: {
    docs: ['credits', 'getting-started'],
    posts: [],
  },

  'blog/why-seo-is-the-cornerstone-of-geo-success': {
    product: 'technical-audit',
    docs: ['technical-audit'],
    posts: ['entity-based-seo', 'death-of-traditional-search-geo-priority'],
  },
  'blog/death-of-traditional-search-geo-priority': {
    product: 'visibility',
    docs: ['ai-reputation'],
    posts: ['why-seo-is-the-cornerstone-of-geo-success', 'ai-brand-visibility-strategies'],
  },
  'blog/entity-based-seo': {
    product: 'visibility',
    docs: ['citations'],
    posts: ['why-seo-is-the-cornerstone-of-geo-success', 'blueprint-for-high-visibility-content'],
  },
  'blog/beyond-keywords-ai-content-generation': {
    product: 'content-writing',
    docs: ['content'],
    posts: ['blueprint-for-high-visibility-content', 'ai-content-optimization-brand-visibility'],
  },
  'blog/blueprint-for-high-visibility-content': {
    product: 'content-writing',
    docs: ['content'],
    posts: ['beyond-keywords-ai-content-generation', 'ai-content-optimization-brand-visibility'],
  },
  'blog/ai-brand-visibility-strategies': {
    product: 'visibility',
    docs: ['ai-reputation'],
    posts: ['death-of-traditional-search-geo-priority', 'entity-based-seo'],
  },
  'blog/poliris-comparison': {
    product: 'pricing',
    docs: ['getting-started'],
    posts: ['ai-brand-visibility-strategies'],
  },
  'blog/ai-content-optimization-brand-visibility': {
    product: 'content-writing',
    docs: ['content'],
    posts: ['beyond-keywords-ai-content-generation', 'blueprint-for-high-visibility-content'],
  },
};
