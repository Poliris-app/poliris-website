import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../contexts/LangContext';
import useHideMissingFigures from './useHideMissingFigures';
import { followDocLinks, rewriteDocLinks } from './docsLinks';
import FigureLightbox from './FigureLightbox';
import { normalizeHeadings } from './docsHeadings';

// A prose chapter: every block is one <h2> section of the authored docs, and
// its body is the authored HTML, styled by .docs-rich in docs.css.
export default function DocsProse({ blocks, slug }) {
  const ref = useRef(null);
  const [zoomed, setZoomed] = useState(null);
  const closeZoom = useCallback(() => setZoomed(null), []);
  const navigate = useNavigate();
  const { lang } = useLang();

  const sections = useMemo(
    // A block with a title sits under its own <h2>; one without sits under the <h1>.
    () => blocks.map((b) => ({ ...b, html: normalizeHeadings(rewriteDocLinks(b.html, slug, lang), b.title ? 2 : 1) })),
    [blocks, slug, lang],
  );
  useHideMissingFigures(ref, [sections]);

  return (
    <div ref={ref} onClick={followDocLinks(navigate, setZoomed)}>
      {sections.map((b) => (
        <section key={b.id} id={b.id} className={`docs-block${b.title ? '' : ' docs-block--intro'}`}>
          {b.title ? <h2 className="docs-block__h2">{b.title}</h2> : null}
          <div className="docs-rich" dangerouslySetInnerHTML={{ __html: b.html }} />
        </section>
      ))}
      <FigureLightbox image={zoomed} onClose={closeZoom} closeLabel={lang === 'fr' ? 'Fermer' : 'Close'} />
    </div>
  );
}
