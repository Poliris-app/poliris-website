import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useLang } from '../../contexts/LangContext';
import { getNavGroups } from '../../content/docs-content';
import ChapterIcon from './ChapterIcon';
import '../../docs.css';

// The frame every documentation page sits in: site navbar, a sticky chapter
// sidebar on the left, the page itself in the middle, and the site footer.
// The sidebar's groups come from the second breadcrumb of each chapter, so
// they are translated along with the rest of the copy.

// The two rails are sticky, and a sticky element cannot go past the end of the
// content it sits beside: near the bottom of a page it would slide up under
// the navbar. Instead, each rail is capped at the room left between its sticky
// top and the end of the content (--docs-rail-max), so it stays put and
// scrolls on its own when that room is smaller than its list.
function useRailHeight(layoutRef) {
  useEffect(() => {
    const layout = layoutRef.current;
    if (!layout) return undefined;
    let frame = 0;
    let prevMax = Infinity;
    const update = () => {
      frame = 0;
      const rail = layout.querySelector('.docs__sidebar');
      const railTop = rail ? parseFloat(getComputedStyle(rail).top) || 0 : 0;
      const contentBottom = layout.getBoundingClientRect().bottom - parseFloat(getComputedStyle(layout).paddingBottom);
      const room = Math.min(window.innerHeight - 24, contentBottom) - railTop;
      const max = Math.max(160, Math.floor(room));
      layout.style.setProperty('--docs-rail-max', `${max}px`);
      // When the rail gets shorter, keep the current chapter in view rather
      // than letting it slip below the fold (a manual scroll is left alone).
      const active = rail?.querySelector('.docs__nav-link.is-active');
      if (active && max < prevMax) {
        // 56px keeps it clear of the 48px fade at the rail's bottom edge.
        const overflow = active.getBoundingClientRect().bottom - rail.getBoundingClientRect().bottom + 56;
        if (overflow > 0) rail.scrollTop += overflow;
      }
      prevMax = max;
      if (rail) {
        // A short page still makes room for the whole list beside it…
        layout.style.setProperty('--docs-rail-full', `${rail.scrollHeight}px`);
        // …and when the list is cut, its bottom edge fades so it reads as scrollable.
        const more = rail.scrollTop + rail.clientHeight < rail.scrollHeight - 2;
        rail.classList.toggle('has-more', more);
        rail.classList.toggle('has-less', rail.scrollTop > 2);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    const rail = layout.querySelector('.docs__sidebar');
    rail?.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(layout);
    return () => {
      rail?.removeEventListener('scroll', schedule);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [layoutRef]);
}

export default function DocsShell({ activeSlug, children, aside }) {
  const { lang, tolgee } = useLang();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const layoutRef = useRef(null);
  const sidebarRef = useRef(null);
  useRailHeight(layoutRef);

  // The sidebar can be shorter than its list, so bring the current chapter
  // into view inside it (without scrolling the page itself). Two frames in, so
  // the rail already has its final height.
  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        const sidebar = sidebarRef.current;
        const active = sidebar?.querySelector('.docs__nav-link.is-active');
        if (!sidebar || !active) return;
        const offset = active.getBoundingClientRect().top - sidebar.getBoundingClientRect().top + sidebar.scrollTop;
        if (offset < sidebar.scrollTop || offset > sidebar.scrollTop + sidebar.clientHeight - active.offsetHeight) {
          sidebar.scrollTop = offset - sidebar.clientHeight / 3;
        }
      });
    });
    return () => { cancelAnimationFrame(outer); cancelAnimationFrame(inner); };
  }, [activeSlug]);

  const groups = useMemo(() => getNavGroups(lang, tolgee), [lang, tolgee]);

  const q = query.trim().toLowerCase();
  const shown = q
    ? groups
        .map((g) => ({ ...g, chapters: g.chapters.filter((c) => c.title.toLowerCase().includes(q)) }))
        .filter((g) => g.chapters.length)
    : groups;

  return (
    <>
      <Navbar />
      <div className="docs">
        <button
          type="button"
          className="docs__drawer-toggle"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {lang === 'fr' ? 'Sommaire' : 'Contents'}
        </button>

        <div className="docs__layout" ref={layoutRef}>
          <aside ref={sidebarRef} className={`docs__sidebar${open ? ' is-open' : ''}`} aria-label={lang === 'fr' ? 'Navigation de la documentation' : 'Documentation navigation'}>
            <div className="docs__search">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={lang === 'fr' ? 'Rechercher un chapitre' : 'Search chapters'}
                aria-label={lang === 'fr' ? 'Rechercher un chapitre' : 'Search chapters'}
              />
            </div>
            <nav>
              {shown.map((g) => (
                <div key={g.label} className="docs__nav-group">
                  {g.label && <p className="docs__nav-label">{g.label}</p>}
                  <ul>
                    {g.chapters.map((c) => (
                      <li key={c.slug}>
                        <Link
                          to={`/${lang}/docs/${c.slug}`}
                          className={`docs__nav-link${c.slug === activeSlug ? ' is-active' : ''}`}
                          aria-current={c.slug === activeSlug ? 'page' : undefined}
                          // Picking a chapter closes the drawer on small screens.
                          onClick={() => setOpen(false)}
                        >
                          <ChapterIcon slug={c.slug} size="sm" />
                          <span>{c.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {!shown.length && (
                <p className="docs__nav-empty">{lang === 'fr' ? 'Aucun chapitre trouvé.' : 'No chapter found.'}</p>
              )}
            </nav>
          </aside>

          <main className="docs__main">{children}</main>

          {aside ? <div className="docs__aside">{aside}</div> : null}
        </div>
      </div>
      <Footer />
    </>
  );
}
