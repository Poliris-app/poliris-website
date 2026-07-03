import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLang } from '../contexts/LangContext';
import { trackEvent } from '../lib/analytics';
import SeoGeoCornerstonePage from './posts/SeoGeoCornerstonePage';
import SeoGeoCornerstoneFrPage from './posts/SeoGeoCornerstoneFrPage';

const POST_MAP = {
  en: {
    'why-seo-is-the-cornerstone-of-geo-success': SeoGeoCornerstonePage,
  },
  fr: {
    'why-seo-is-the-cornerstone-of-geo-success': SeoGeoCornerstoneFrPage,
  },
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const { lang } = useLang();
  const langMap = POST_MAP[lang] ?? POST_MAP.en;
  const Component = langMap[slug];

  useEffect(() => {
    if (Component) trackEvent('blog_article_read', { slug, lang });
  }, [slug]);

  if (!Component) {
    return <Navigate to={`/${lang}/blog`} replace />;
  }

  return <Component />;
}
