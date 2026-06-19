import { useLang } from '../contexts/LangContext';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';

export default function DocsPage() {
  const { lang } = useLang();

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
