import { useEffect } from 'react';
import { useLang } from '../contexts/LangContext';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import { trackEvent } from '../lib/analytics';

export default function DocsPage() {
  const { lang } = useLang();

  useEffect(() => {
    trackEvent('docs_visited');
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Seo page="docs" />
      <Navbar />
      <iframe
        src={`/docs/${lang}/index.html`}
        title="POLIRIS Documentation"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
      />
    </div>
  );
}
