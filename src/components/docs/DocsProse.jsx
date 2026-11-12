import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../contexts/LangContext';
import useHideMissingFigures from './useHideMissingFigures';
import { followDocLinks, rewriteDocLinks } from './docsLinks';
import FigureLightbox from './FigureLightbox';
import { normalizeHeadings } from './docsHeadings';
import { addHeadingAnchors, addTermAnchors, collectHeadings, headingId, slugify } from './docsAnchors';
import { prepareFigures } from './docsFigures';

// A prose chapter: every block is one <h2> section of the authored docs, and
// its body is the authored HTML, styled by .docs-rich in docs.css.
export default function DocsProse({ blocks, slug }) {
  const ref = useRef(null);
  const [zoomed, setZoomed] = useState(null);
  const closeZoom = useCallback(() => setZoomed(null), []);
  const navigate = useNavigate();
  const { lang } = useLang();
  const anchorLabel = lang === 'fr' ? 'Lien vers cette section' : 'Link to this section';

  const sections = useMemo(() => {
    // Section ids are taken, so a heading that slugifies to one gets a suffix
    // instead of stealing the target of an existing cross-reference.
    const seen = new Set(blocks.map((b) => b.id));
    return blocks.map((b) => {
      // A block with a title sits under its own <h2>; one without sits under the <h1>.
      // When the section id is already this heading's slug, point at it rather
      // than minting a second, suffixed id for the same heading.
      const headId = b.title ? (slugify(b.title) === b.id ? undefined : headingId(seen, b.title)) : undefined;
      const anchorId = b.title ? (headId ?? b.id) : undefined;
      const html = addTermAnchors(
        addHeadingAnchors(
          normalizeHeadings(rewriteDocLinks(b.html, slug, lang), b.title ? 2 : 1),
          seen,
          anchorLabel,
        ),
        seen,
        anchorLabel,
      );
      return { ...b, headId, anchorId, html: prepareFigures(html) };
    });
  }, [blocks, slug, lang, anchorLabel]);
  useHideMissingFigures(ref, [sections]);

  // The FAQ is one long block of questions, so it lists them at the top.
  // Built from the headings themselves, so a new question joins the list
  // without anyone remembering to add it.
  const questions = useMemo(
    () => (slug === 'faq' ? sections.flatMap((b) => collectHeadings(b.html)) : []),
    [sections, slug],
  );

  return (
    <div ref={ref} onClick={followDocLinks(navigate, setZoomed)}>
      {questions.length > 1 ? (
        <nav className="docs-qtoc" aria-label={lang === 'fr' ? 'Les questions' : 'The questions'}>
          <ul>
            {questions.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}
          </ul>
        </nav>
      ) : null}
      {sections.map((b) => (
        <section key={b.id} id={b.id} className={`docs-block${b.title ? '' : ' docs-block--intro'}`}>
          {b.title ? (
            <h2 className="docs-block__h2" id={b.headId}>
              {b.title}
              {b.anchorId ? <a className="docs-anchor" href={`#${b.anchorId}`} aria-label={anchorLabel}>#</a> : null}
            </h2>
          ) : null}
          <div className="docs-rich" dangerouslySetInnerHTML={{ __html: b.html }} />
        </section>
      ))}
      <FigureLightbox image={zoomed} onClose={closeZoom} closeLabel={lang === 'fr' ? 'Fermer' : 'Close'} />
    </div>
  );
}
