import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLang } from '../contexts/LangContext';
import { trackEvent } from '../lib/analytics';
import SeoGeoCornerstonePage from './posts/SeoGeoCornerstonePage';
import SeoGeoCornerstoneFrPage from './posts/SeoGeoCornerstoneFrPage';
import DeathOfTraditionalSearchPage from './posts/DeathOfTraditionalSearchPage';
import DeathOfTraditionalSearchFrPage from './posts/DeathOfTraditionalSearchFrPage';
import EntityBasedSeoPage from './posts/EntityBasedSeoPage';
import EntityBasedSeoFrPage from './posts/EntityBasedSeoFrPage';

const POST_MAP = {
  en: {
    'why-seo-is-the-cornerstone-of-geo-success': SeoGeoCornerstonePage,
    'death-of-traditional-search-geo-priority': DeathOfTraditionalSearchPage,
    'entity-based-seo': EntityBasedSeoPage,
  },
  fr: {
    'why-seo-is-the-cornerstone-of-geo-success': SeoGeoCornerstoneFrPage,
    'death-of-traditional-search-geo-priority': DeathOfTraditionalSearchFrPage,
    'entity-based-seo': EntityBasedSeoFrPage,
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
