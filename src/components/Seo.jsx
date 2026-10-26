import { Head } from 'vite-react-ssg';
import { useLang } from '../contexts/LangContext';
import {
  getMeta,
  canonicalUrl,
  SITE_NAME,
  SITE_URL,
  LANGS,
} from '../seo';

// Share/preview image (1200x630) used by Google, LinkedIn, Slack, X, etc.
// Without it Google picks an arbitrary image off the page for the thumbnail.
const OG_IMAGE = `${SITE_URL}/og-image.png`;

// Per-page <head>: title, description, canonical, hreflang alternates,
// Open Graph and Twitter cards. Also sets <html lang> for the current page.
// Drop <Seo page="..." /> at the top of each route component. Blog posts pass
// type="article" so Open Graph presents them as articles.
export default function Seo({ page, title: titleOverride, description: descriptionOverride, type = 'website' }) {
  const { lang } = useLang();
  // Pages generated from content (documentation chapters, blog posts) carry
  // their own title and description rather than having an entry in src/seo.js.
  const meta = getMeta(lang, page);
  const title = titleOverride || meta.title;
  const description = descriptionOverride || meta.description;
  const canonical = canonicalUrl(lang, page);
  const ogLocale = lang === 'fr' ? 'fr_FR' : 'en_US';

  return (
    <Head>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* hreflang alternates */}
      {LANGS.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={canonicalUrl(l, page)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl('en', page)} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Head>
  );
}
