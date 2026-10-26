import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import DocsShell from '../components/docs/DocsShell';
import ChapterIcon from '../components/docs/ChapterIcon';
import { useLang } from '../contexts/LangContext';
import { getChapter, getNavGroups } from '../content/docs-content';
import { trackEvent } from '../lib/analytics';

// One line of the chapter's opening copy, for its card.
function blurb(chapter, limit = 120) {
  const html = chapter?.intro ?? chapter?.blocks?.find((b) => b.html)?.html ?? '';
  const text = String(html).replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= limit) return text;
  return `${text.slice(0, text.lastIndexOf(' ', limit))}…`;
}

const groupId = (label) => `group-${label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

// The documentation landing page: every chapter, grouped the way the sidebar
// groups them. The chapters themselves live at /:lang/docs/:chapter.
export default function DocsPage() {
  const { lang, t, tolgee } = useLang();
  const copy = t('docs.index');
  const [query, setQuery] = useState('');

  useEffect(() => { trackEvent('docs_visited'); }, []);

  const groups = useMemo(() => getNavGroups(lang, tolgee).map((g) => ({
    ...g,
    chapters: g.chapters.map((c) => ({ ...c, blurb: blurb(getChapter(c.slug, lang, tolgee)) })),
  })), [lang, tolgee]);
  const total = groups.reduce((n, g) => n + g.chapters.length, 0);

  const q = query.trim().toLowerCase();
  const shown = q
    ? groups
        .map((g) => ({ ...g, chapters: g.chapters.filter((c) => `${c.title} ${c.blurb}`.toLowerCase().includes(q)) }))
        .filter((g) => g.chapters.length)
    : groups;

  return (
    <DocsShell activeSlug={null}>
      <Seo page="docs" />

      <header className="docs-hero">
        <p className="docs-hero__eyebrow">{copy.eyebrow}</p>
        <h1 className="docs-hero__title">{copy.title}</h1>
        <p className="docs-hero__lead">{copy.lead}</p>
        <div className="docs-hero__search">
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.search}
            aria-label={copy.search}
          />
        </div>
        <ul className="docs-hero__stats">
          <li><strong>{total}</strong> {copy.chapters}</li>
          {groups.filter((g) => g.label).map((g) => (
            <li key={g.label}><a href={`#${groupId(g.label)}`}>{g.label}</a></li>
          ))}
        </ul>
      </header>

      {shown.map((g) => (
        <section key={g.label} id={g.label ? groupId(g.label) : undefined} className="docs-index__group">
          {g.label ? (
            <h2 className="docs-index__group-title">
              {g.label} <span>{g.chapters.length}</span>
            </h2>
          ) : null}
          <ul className="docs-index__cards">
            {g.chapters.map((c) => (
              <li key={c.slug}>
                <Link className="docs-card" to={`/${lang}/docs/${c.slug}`}>
                  <ChapterIcon slug={c.slug} />
                  <span className="docs-card__title">{c.title}</span>
                  {c.blurb ? <span className="docs-card__blurb">{c.blurb}</span> : null}
                  <span className="docs-card__cta">{copy.open} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {!shown.length && (
        <p className="docs-index__empty">{lang === 'fr' ? 'Aucun chapitre trouvé.' : 'No chapter found.'}</p>
      )}
    </DocsShell>
  );
}
