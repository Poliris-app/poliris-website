import { useEffect, useRef } from 'react';
import { useLang } from '../contexts/LangContext';
import Navbar from '../components/Navbar';

export default function DocsPage() {
  const { lang } = useLang();
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    function injectStyles() {
      try {
        const doc = iframe.contentDocument;
        if (!doc || !doc.head) return;

        doc.getElementById('poliris-embed-style')?.remove();
        const style = doc.createElement('style');
        style.id = 'poliris-embed-style';
        // Setting --header-h to 0 fixes all layout offsets (sidebar top, TOC top,
        // scroll-padding-top) that are calculated from that variable in document.css.
        style.textContent = `
          :root { --header-h: 0px !important; }
          .site-header { display: none !important; }
          .layout { padding-top: 4.5rem; }
          .sidebar { padding-top: 4.5rem !important; }
        `;
        doc.head.appendChild(style);
      } catch {
        // cross-origin — shouldn't happen since docs are served from same origin
      }
    }

    iframe.addEventListener('load', injectStyles);
    return () => iframe.removeEventListener('load', injectStyles);
  }, [lang]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Navbar />
      <iframe
        ref={iframeRef}
        src={`/docs/${lang}/index.html`}
        title="POLIRIS Documentation"
        style={{ flex: 1, border: 'none', width: '100%' }}
      />
    </div>
  );
}
