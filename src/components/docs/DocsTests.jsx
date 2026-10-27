import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../contexts/LangContext';
import { DOC_CHAPTERS } from '../../content/docs-structure';
import useHideMissingFigures from './useHideMissingFigures';
import { followDocLinks, rewriteDocLinks } from './docsLinks';
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

function Test({ test, labels }) {
  const c = CLASSIFICATION[test.id] ?? {};
  return (
    <details className="docs-test" id={test.id}>
      <summary>
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

// The Technical Audit test reference: 151 tests, so it gets its own search
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
      {chapter.intro ? <div className="docs-rich" dangerouslySetInnerHTML={{ __html: rewriteDocLinks(chapter.intro, slug, lang) }} /> : null}

      {chapter.howToRead ? (
        <section id="how-to-read" className="docs-block">
          <h2 className="docs-block__h2">{chapter.howToRead.title}</h2>
          <div className="docs-rich" dangerouslySetInnerHTML={{ __html: rewriteDocLinks(chapter.howToRead.html, slug, lang) }} />
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
          <h2 className="docs-block__h2">{cat.title}</h2>
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
