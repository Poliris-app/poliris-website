import { Head } from 'vite-react-ssg';
import { useLang } from '../contexts/LangContext';
import {
  getMeta,
  canonicalUrl,
  contentLang,
  SITE_NAME,
  LANGS,
} from '../seo';

// Per-page <head>: title, description, canonical, hreflang alternates,
// Open Graph and Twitter cards. Also sets <html lang> for the current page.
// Drop <Seo page="..." /> at the top of each route component.
export default function Seo({ page }) {
  const { lang } = useLang();
  // For pages without a translation yet (see CONTENT_LANG in seo.js), the
  // content is the *other* language's — canonical, meta copy, and <html
  // lang> should describe what's actually on the page, not the URL's own
  // /:lang/ segment, so this page doesn't read as duplicate content under
  // two canonical URLs or get mislabeled for screen readers.
  const docLang = contentLang(lang, page);
  const { title, description } = getMeta(docLang, page);
  const canonical = canonicalUrl(docLang, page);
  const ogLocale = docLang === 'fr' ? 'fr_FR' : 'en_US';

  return (
    <Head>
      <html lang={docLang} />
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
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
