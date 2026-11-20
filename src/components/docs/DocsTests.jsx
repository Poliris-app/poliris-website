import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../contexts/LangContext';
import { DOC_CHAPTERS } from '../../content/docs-structure';
import useHideMissingFigures from './useHideMissingFigures';
import { followDocLinks, rewriteDocLinks } from './docsLinks';
import { addHeadingAnchors, headingId, slugify } from './docsAnchors';
import FigureLightbox from './FigureLightbox';

const SEVERITIES = ['critical', 'warning', 'notice', 'mixed'];
const SEV_LABEL = { critical: 'sevCritical', warning: 'sevWarning', notice: 'sevNotice', mixed: 'sevMixed' };

// How each test is classified never gets translated, so it lives in the
// structure file rather than in the locale chunks.
const CLASSIFICATION = DOC_CHAPTERS.find((c) => c.kind === 'tests')?.tests ?? {};

function Field({ label, html }) {
  if (!html) return null;
  return (
    <div className="docs-test__field">
      <dt>{label}</dt>
      <dd dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

// The native <details> snaps open; this slides the body down (and back up on
// close) instead. The element still opens for real, so find-in-page, links to
// a test and keyboard use behave as before; with reduced motion it snaps.
const OPEN_MS = 260;
const CLOSE_MS = 200;
const EASE = 'cubic-bezier(.2, .7, .2, 1)';

function useSmoothDetails() {
  const running = useRef(null);
  return useCallback((e) => {
    const details = e.currentTarget.parentElement;
    const body = details.querySelector('.docs-test__body');
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!body || reduced || typeof body.animate !== 'function') return;
    e.preventDefault();

    // A click during an animation turns it around from where it is.
    const from = running.current ? body.getBoundingClientRect().height : null;
    running.current?.cancel();

    const closing = details.open && details.dataset.closing !== 'true';
    if (!closing) {
      details.dataset.closing = 'false';
      details.open = true;
    }
    const cs = getComputedStyle(body);
    const full = { height: `${body.scrollHeight + parseFloat(cs.borderTopWidth)}px`, paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom, opacity: 1 };
    const shut = { height: '0px', paddingTop: '0px', paddingBottom: '0px', opacity: 0 };
    const start = from == null ? (closing ? full : shut) : { ...(closing ? full : shut), height: `${from}px` };

    body.style.overflow = 'hidden';
    if (closing) details.dataset.closing = 'true';
    const anim = body.animate([start, closing ? shut : full], { duration: closing ? CLOSE_MS : OPEN_MS, easing: EASE });
    running.current = anim;
    anim.onfinish = () => {
      running.current = null;
      body.style.overflow = '';
      if (closing) details.open = false;
      delete details.dataset.closing;
    };
    anim.oncancel = () => { body.style.overflow = ''; };
  }, []);
}

// Every test has a stable id, and the app's "Details" buttons link straight to
// it, but nothing on the page said so. This copies that link. Clicking it must
// not also open or close the test, hence preventDefault and stopPropagation.
function CopyLink({ id, labels }) {
  const [done, setDone] = useState(false);
  const copy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    const seen = () => { setDone(true); window.setTimeout(() => setDone(false), 1600); };
    // Without the clipboard (http, older browser, denied permission) the link
    // still becomes the address of the page, which the reader can copy.
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url).then(seen, () => { window.location.hash = id; });
    else window.location.hash = id;
  };
  return (
    <button type="button" className={`docs-test__link${done ? ' is-done' : ''}`} onClick={copy}
      title={labels.copyLink} aria-label={labels.copyLink}>
      {done ? labels.copied : '#'}
    </button>
  );
}

function Test({ test, labels }) {
  const c = CLASSIFICATION[test.id] ?? {};
  const onToggle = useSmoothDetails();
  return (
    <details className="docs-test" id={test.id}>
      <summary onClick={onToggle}>
        <CopyLink id={test.id} labels={labels} />
        <span className="docs-test__title">{test.title}</span>
        <span className="docs-test__badges">
          <span className={`docs-badge docs-badge--lvl-${c.level ?? 'page'}`}>
            {c.level === 'site' ? labels.lvlSite : labels.lvlPage}
          </span>
          {c.severity && SEV_LABEL[c.severity] ? (
            <span className={`docs-badge docs-badge--sev-${c.severity}`}>{labels[SEV_LABEL[c.severity]]}</span>
          ) : null}
          {c.ai ? <span className="docs-badge docs-badge--ai">{labels.aiYes}</span> : null}
        </span>
      </summary>
      <div className="docs-test__body">
        {test.checks ? (
          <p className="docs-test__checks">
            <strong>{labels.checks}.</strong> <span dangerouslySetInnerHTML={{ __html: test.checks }} />
          </p>
        ) : null}
        <dl>
          <Field label={labels.why} html={test.why} />
          <Field label={labels.fails} html={test.fails} />
          <Field label={labels.fix} html={test.fix} />
          <Field label={labels.category} html={test.category} />
          <Field label={labels.notes} html={test.notes} />
        </dl>
      </div>
    </details>
  );
}

// The Technical Audit test reference: 158 tests, so it gets its own search
// box and severity filter rather than asking the reader to scroll.
export default function DocsTests({ chapter, slug }) {
  const { lang } = useLang();
  const navigate = useNavigate();
  const ref = useRef(null);
  const [zoomed, setZoomed] = useState(null);
  const closeZoom = useCallback(() => setZoomed(null), []);
  useHideMissingFigures(ref, [chapter]);
  const [query, setQuery] = useState('');
  const [severity, setSeverity] = useState('all');
  const { labels } = chapter;

  const anchorLabel = lang === 'fr' ? 'Lien vers cette section' : 'Link to this section';

  // Readable ids and a "#" link for the headings of this chapter too. The
  // category ids and the test ids are already anchors, so they are reserved
  // first and a heading that slugifies to one gets a suffix.
  const anchored = useMemo(() => {
    const seen = new Set([
      ...chapter.categories.flatMap((c) => [c.id, ...c.groups.flatMap((g) => g.tests.map((t) => t.id))]),
      'how-to-read',
    ]);
    const intro = addHeadingAnchors(rewriteDocLinks(chapter.intro, slug, lang), seen, anchorLabel);
    const howToReadId = chapter.howToRead ? headingId(seen, chapter.howToRead.title) : undefined;
    const howToRead = chapter.howToRead
      ? addHeadingAnchors(rewriteDocLinks(chapter.howToRead.html, slug, lang), seen, anchorLabel)
      : null;
    // A category id is already a readable slug, so it is the anchor when it
    // matches the title; only a mismatch needs an id of its own.
    const catIds = new Map(chapter.categories.map(
      (c) => [c.id, slugify(c.title) === c.id ? null : headingId(seen, c.title)],
    ));
    return { intro, howToRead, howToReadId, catIds };
  }, [chapter, slug, lang, anchorLabel]);

  const q = query.trim().toLowerCase();
  const categories = useMemo(() => chapter.categories.map((cat) => ({
    ...cat,
    groups: cat.groups
      .map((g) => ({
        ...g,
        tests: g.tests.filter((t) => {
          if (severity !== 'all' && (CLASSIFICATION[t.id]?.severity ?? '') !== severity) return false;
          if (!q) return true;
          return t.title.toLowerCase().includes(q) || (t.checks ?? '').toLowerCase().includes(q);
        }),
      }))
      .filter((g) => g.tests.length),
  })).filter((cat) => cat.groups.length), [chapter.categories, q, severity]);

  const total = categories.reduce((n, c) => n + c.groups.reduce((k, g) => k + g.tests.length, 0), 0);

  return (
    <div ref={ref} onClick={followDocLinks(navigate, setZoomed)}>
      {chapter.intro ? <div className="docs-rich" dangerouslySetInnerHTML={{ __html: anchored.intro }} /> : null}

      {chapter.howToRead ? (
        <section id="how-to-read" className="docs-block">
          <h2 className="docs-block__h2" id={anchored.howToReadId}>
            {chapter.howToRead.title}
            {anchored.howToReadId ? <a className="docs-anchor" href={`#${anchored.howToReadId}`} aria-label={anchorLabel}>#</a> : null}
          </h2>
          <div className="docs-rich" dangerouslySetInnerHTML={{ __html: anchored.howToRead }} />
        </section>
      ) : null}

      <div className="docs-tests__filters">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={lang === 'fr' ? 'Rechercher un test' : 'Search tests'}
          aria-label={lang === 'fr' ? 'Rechercher un test' : 'Search tests'}
        />
        <div className="docs-tests__chips" role="group">
          <button type="button" className={`docs-chip${severity === 'all' ? ' is-on' : ''}`} onClick={() => setSeverity('all')}>
            {lang === 'fr' ? 'Tous' : 'All'}
          </button>
          {SEVERITIES.map((s) => (
            <button key={s} type="button" className={`docs-chip docs-chip--${s}${severity === s ? ' is-on' : ''}`} onClick={() => setSeverity(s)}>
              {labels[SEV_LABEL[s]]}
            </button>
          ))}
        </div>
        <p className="docs-tests__count">
          {total} {lang === 'fr' ? (total === 1 ? 'test' : 'tests') : total === 1 ? 'test' : 'tests'}
        </p>
      </div>

      {categories.map((cat) => (
        <section key={cat.id} id={cat.id} className="docs-block">
          <h2 className="docs-block__h2" id={anchored.catIds.get(cat.id) ?? undefined}>
            {cat.title}
            <a className="docs-anchor" href={`#${anchored.catIds.get(cat.id) ?? cat.id}`} aria-label={anchorLabel}>#</a>
          </h2>
          {cat.groups.map((g) => (
            <div key={g.id} className="docs-tests__group">
              <h3 className="docs-tests__group-title">
                {g.title} <span>{g.tests.length}</span>
              </h3>
              {g.tests.map((t) => <Test key={t.id} test={t} labels={labels} />)}
            </div>
          ))}
        </section>
      ))}

      {!total && (
        <p className="docs-tests__empty">{lang === 'fr' ? 'Aucun test ne correspond.' : 'No test matches.'}</p>
      )}
      <FigureLightbox image={zoomed} onClose={closeZoom} closeLabel={lang === 'fr' ? 'Fermer' : 'Close'} />
    </div>
  );
}
