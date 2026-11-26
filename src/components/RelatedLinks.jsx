import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { RELATED } from '../content/related';
import { DOC_SEO_TITLES } from '../content/docs-seo';
import { PAGE_SLUGS } from '../seo';
import { stripBrand } from '../lib/schema';
import '../related-links.css';

// Product pages in navigation-menu order, so their names come from the menu
// (nav.productsMenu) exactly as visitors see them.
const PRODUCT_ORDER = ['visibility', 'sentiment', 'technical-audit', 'content-writing'];

const href = (lang, path) => `/${lang}/${path}`;

/**
 * "Learn more" block: links from this page to related documentation
 * chapters, blog posts and the matching product page (src/content/related.js).
 * Plain links in the prerendered HTML, so crawlers follow them without JS.
 * `page`: a product page key ("visibility") or "blog/<slug>".
 */
export default function RelatedLinks({ page }) {
  const { lang, t } = useLang();
  const entry = RELATED[page];
  if (!entry) return null;

  const docTitles = DOC_SEO_TITLES[lang] ?? DOC_SEO_TITLES.en;
  const posts = t('blog.posts');
  const postTitle = (slug) => {
    const p = Array.isArray(posts) ? posts.find((x) => x.slug === slug) : null;
    return p?.title ? String(p.title).replace(/\.\s*$/, '') : null;
  };
  const menu = t('nav.productsMenu');
  const productName = (key) => {
    const i = PRODUCT_ORDER.indexOf(key);
    if (i >= 0 && Array.isArray(menu) && menu[i]?.label) return menu[i].label;
    return key === 'pricing' ? t('relatedLinks.pricing') : null;
  };

  const groups = [
    {
      label: t('relatedLinks.docs'),
      items: (entry.docs ?? [])
        .filter((slug) => docTitles[slug])
        .map((slug) => ({ to: href(lang, `docs/${slug}`), text: stripBrand(docTitles[slug]) })),
    },
    {
      label: t('relatedLinks.posts'),
      items: (entry.posts ?? [])
        .filter((slug) => postTitle(slug))
        .map((slug) => ({ to: href(lang, `blog/${slug}`), text: postTitle(slug) })),
    },
    {
      label: t('relatedLinks.product'),
      items: entry.product && productName(entry.product)
        ? [{ to: href(lang, PAGE_SLUGS[entry.product]), text: productName(entry.product) }]
        : [],
    },
  ].filter((g) => g.items.length);

  if (!groups.length) return null;

  return (
    <section className="related-links" aria-labelledby="related-links-title">
      <h2 id="related-links-title" className="related-links__title">{t('relatedLinks.heading')}</h2>
      <div className="related-links__groups">
        {groups.map((g) => (
          <div key={g.label} className="related-links__group">
            <p className="related-links__label">{g.label}</p>
            <ul className="related-links__list">
              {g.items.map((it) => (
                <li key={it.to}><Link to={it.to} className="related-links__a">{it.text}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
