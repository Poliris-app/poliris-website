import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import DocsShell from '../components/docs/DocsShell';
import DocsProse from '../components/docs/DocsProse';
import DocsTests from '../components/docs/DocsTests';
import ChapterIcon from '../components/docs/ChapterIcon';
import { useLang } from '../contexts/LangContext';
import { DOC_CHAPTERS } from '../content/docs-structure';
import { getChapter, getChapterIndex } from '../content/docs-content';
import { trackEvent } from '../lib/analytics';
import { fitDescription } from '../lib/serpWidth';
import { DOC_SEO_TITLES } from '../content/docs-seo';

// The authored copy is HTML with entities (&nbsp;, &rsquo;…); a meta
// description is plain text, so both the tags and the entities come out.
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', mdash: '—', ndash: '–', hellip: '…', laquo: '«', raquo: '»', rsaquo: '›', rarr: '→', middot: '·', times: '×' };
const plainText = (html) => String(html ?? '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(Number(d)))
  .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n] ?? m)
  .replace(/\s+/g, ' ')
  .trim();

// The meta description: the opening copy of the chapter, topped up with the
// following sections when it is too short to describe the page, then cut to
// the length a results page shows (see src/lib/serpWidth.js).
function summarise(htmls) {
  let text = '';
  for (const html of htmls) {
    text = `${text} ${plainText(html)}`.trim();
    if (text.length >= 120) break;
  }
  return fitDescription(text);
}

// Which "On this page" entry the reader is in: the last section whose top
// has scrolled past the upper third of the viewport.
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? null);
  const key = ids.join('|');
  useEffect(() => {
    const els = key ? key.split('|').map((id) => document.getElementById(id)).filter(Boolean) : [];
    if (!els.length) return undefined;
    const onScroll = () => {
      const line = window.innerHeight / 3;
      let current = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [key]);
  return active;
}

export default function DocsChapterPage() {
  const { chapter: slug } = useParams();
  const { hash } = useLocation();
  const { lang, tolgee } = useLang();

  const meta = DOC_CHAPTERS.find((c) => c.slug === slug);
  const copy = meta ? getChapter(slug, lang, tolgee) : null;

  useEffect(() => {
    if (slug) trackEvent('docs_chapter_viewed', { chapter: slug });
  }, [slug]);

  // A link from another chapter lands on "#anchor"; once the new chapter has
  // rendered, bring that section into view.
  useEffect(() => {
    if (!hash) return;
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, [slug, hash]);

  const index = useMemo(() => getChapterIndex(lang, tolgee), [lang, tolgee]);
  const pos = index.findIndex((c) => c.slug === slug);
  const prev = pos > 0 ? index[pos - 1] : null;
  const next = pos >= 0 && pos < index.length - 1 ? index[pos + 1] : null;

  const onThisPage = !copy ? [] : meta.kind === 'tests'
    ? (copy.categories ?? []).map((c) => ({ id: c.id, title: c.title }))
    : (copy.blocks ?? []).filter((b) => b.title).map((b) => ({ id: b.id, title: b.title }));
  const activeId = useActiveSection(onThisPage.map((s) => s.id));

  // An unknown chapter goes back to the documentation index rather than
  // falling through to the catch-all 404 redirect.
  if (!meta || !copy) return <Navigate to={`/${lang}/docs`} replace />;

  const group = copy.breadcrumb?.[1];

  const description = meta.kind === 'tests'
    ? summarise([copy.intro, copy.howToRead?.html])
    : summarise((copy.blocks ?? []).map((b) => b.html));
  const seoTitle = DOC_SEO_TITLES[lang]?.[slug] ?? `${copy.title} | Poliris Docs`;

  return (
    <DocsShell
      activeSlug={slug}
      aside={onThisPage.length > 1 ? (
        <nav className="docs-toc" aria-label={lang === 'fr' ? 'Sur cette page' : 'On this page'}>
          <p className="docs-toc__label">{lang === 'fr' ? 'Sur cette page' : 'On this page'}</p>
          <ul>
            {onThisPage.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={s.id === activeId ? 'is-active' : undefined}>{s.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    >
      <Seo page={`docs/${slug}`} title={seoTitle} description={description} />

      <nav className="docs-crumbs" aria-label={lang === 'fr' ? 'Fil d’Ariane' : 'Breadcrumb'}>
        <Link to={`/${lang}/docs`}>{copy.breadcrumb?.[0] ?? 'Docs'}</Link>
        {copy.breadcrumb?.slice(1, -1).map((c) => <span key={c}>{c}</span>)}
        <span aria-current="page">{copy.title}</span>
      </nav>

      <header className="docs-chapter__head">
        <ChapterIcon slug={slug} size="lg" />
        <div>
          {group ? <p className="docs-chapter__eyebrow">{group}</p> : null}
          <h1 className="docs-h1">{copy.title}</h1>
        </div>
      </header>

      {meta.kind === 'tests'
        ? <DocsTests chapter={copy} slug={slug} />
        : <DocsProse blocks={copy.blocks ?? []} slug={slug} />}

      <nav className="docs-pager" aria-label={lang === 'fr' ? 'Chapitres' : 'Chapters'}>
        {prev ? (
          <Link className="docs-pager__link" to={`/${lang}/docs/${prev.slug}`} rel="prev">
            <span>← {lang === 'fr' ? 'Précédent' : 'Previous'}</span>
            {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link className="docs-pager__link docs-pager__link--next" to={`/${lang}/docs/${next.slug}`} rel="next">
            <span>{lang === 'fr' ? 'Suivant' : 'Next'} →</span>
            {next.title}
          </Link>
        ) : <span />}
      </nav>
    </DocsShell>
  );
}
