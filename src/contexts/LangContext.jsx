import { createContext, useContext, useMemo, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation, Outlet, Navigate } from 'react-router-dom';
import { identifyUser, trackPageview } from '../lib/analytics';
import en from '../locales/en';
import fr from '../locales/fr';

const LOCALES = { en, fr };
const VALID_LANGS = ['en', 'fr'];

const LangContext = createContext({ lang: 'en', t: (k) => k });

export function useLang() {
  return useContext(LangContext);
}

function deepGet(obj, path) {
  return path.split('.').reduce((o, k) => (o != null ? o[k] : undefined), obj);
}

// Overlays Tolgee's live translations onto the static locale files, leaf by
// leaf, so anything not managed in Tolgee (numbers, booleans, ids, slugs,
// and a couple of known-unsafe fields — see reconstructArrays below) keeps
// coming from the bundled files untouched. Arrays are merged index by
// index rather than replaced wholesale, so a Tolgee item that's missing a
// field (because that field is intentionally excluded) still gets that
// field filled in from the static file instead of losing it.
function deepMerge(base, overrides) {
  if (overrides === undefined) return base;
  if (Array.isArray(base) && Array.isArray(overrides)) {
    const len = Math.max(base.length, overrides.length);
    const out = [];
    for (let i = 0; i < len; i++) out[i] = deepMerge(base[i], overrides[i]);
    return out;
  }
  if (typeof base !== 'object' || base === null || Array.isArray(base)) {
    return overrides ?? base;
  }
  const out = { ...base };
  for (const key of Object.keys(overrides)) {
    out[key] = deepMerge(base[key], overrides[key]);
  }
  return out;
}

// Tolgee flattens arrays into sibling keys like "productsMenu[0]",
// "productsMenu[1]" (and "ideaSets[0][0]" for nested arrays). This turns
// those back into real JS arrays so t('nav.productsMenu') etc. keep
// returning arrays the way the rest of the app expects. Runs multiple
// grouping passes per object level to handle nested arrays.
function reconstructArrays(node) {
  if (Array.isArray(node)) return node.map(reconstructArrays);
  if (node && typeof node === 'object') {
    let current = node;
    while (true) {
      const groups = {};
      const passthrough = {};
      let sawBracket = false;
      for (const [k, v] of Object.entries(current)) {
        const m = k.match(/^(.*)\[(\d+)\]$/);
        if (m) {
          sawBracket = true;
          const [, base, idxStr] = m;
          (groups[base] ??= [])[Number(idxStr)] = v;
        } else {
          passthrough[k] = v;
        }
      }
      if (!sawBracket) { current = passthrough; break; }
      current = { ...passthrough, ...groups };
    }
    const out = {};
    for (const [k, v] of Object.entries(current)) out[k] = reconstructArrays(v);
    return out;
  }
  return node;
}

// TOLGEE: fetches live translations from the self-hosted Tolgee instance
// (see VITE_APP_TOLGEE_API_URL/KEY in env vars) and merges them over the
// static files. If Tolgee is unreachable (down, no env vars set, etc.)
// this just fails quietly and the site falls back to the bundled locale
// files as if Tolgee didn't exist.
function useTolgeeOverrides() {
  const [overrides, setOverrides] = useState({});

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_APP_TOLGEE_API_URL;
    const apiKey = import.meta.env.VITE_APP_TOLGEE_API_KEY;
    if (!apiUrl || !apiKey) return;

    fetch(`${apiUrl}/v2/projects/translations/${VALID_LANGS.join(',')}`, {
      headers: { 'X-API-Key': apiKey },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => setOverrides(reconstructArrays(data)))
      .catch((err) => console.warn('[Tolgee] could not fetch live translations, using static files:', err));
  }, []);

  return overrides;
}

// After a refresh (or back/forward into the site), bring the visitor back to
// where they were with a smooth scroll instead of the browser's instant jump.
// The browser's own restore is turned off; the position is saved as the page
// unloads, keyed by path, and only restored once per document load.
const SCROLL_KEY = 'poliris:scroll';
let scrollRestored = false;

function saveScroll() {
  try {
    sessionStorage.setItem(SCROLL_KEY, JSON.stringify({ path: location.pathname, y: Math.round(window.scrollY) }));
  } catch { /* storage blocked: the page simply opens at the top */ }
}

function savedScroll(pathname) {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SCROLL_KEY) || 'null');
    return saved && saved.path === pathname && saved.y > 0 ? saved.y : 0;
  } catch {
    return 0;
  }
}

function forgetScroll() {
  scrollRestored = true;
  try { sessionStorage.removeItem(SCROLL_KEY); } catch { /* nothing to clear */ }
}

// Waits for the page to settle (web fonts in) so the target position
// is measured on the final layout, then glides there. Any scroll input from
// the visitor before that cancels it. Cancelled by an effect cleanup (dev
// mode runs effects twice), it stays armed for the next run.
function restoreScroll(pathname) {
  const nav = performance.getEntriesByType?.('navigation')[0];
  const y = nav && (nav.type === 'reload' || nav.type === 'back_forward') ? savedScroll(pathname) : 0;
  if (!y) {
    forgetScroll();
    return () => {};
  }

  let cancelled = false;
  const cancel = () => { cancelled = true; detach(); };
  // The visitor scrolled first: leave them where they are.
  const takeOver = () => { cancel(); forgetScroll(); };
  const inputs = ['wheel', 'touchstart', 'keydown', 'mousedown'];
  const detach = () => inputs.forEach((e) => window.removeEventListener(e, takeOver));
  inputs.forEach((e) => window.addEventListener(e, takeOver, { passive: true, once: true }));

  // Not the load event: that waits on the film and analytics, seconds later.
  Promise.resolve(document.fonts?.ready)
    .then(() => new Promise((r) => setTimeout(r, 150)))
    .then(() => {
      if (cancelled) return;
      detach();
      forgetScroll();
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: y, behavior: reduced ? 'instant' : 'smooth' });
    });
  return cancel;
}

export function LangWrapper() {
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const tolgeeOverrides = useTolgeeOverrides();

  // Identify visitor from ph_id param (runs once on first mount)
  useEffect(() => {
    identifyUser();
  }, []);

  // Take over scroll restoration from the browser (see restoreScroll).
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.addEventListener('pagehide', saveScroll);
    return () => window.removeEventListener('pagehide', saveScroll);
  }, []);

  // Reset scroll + capture SPA pageview on every route change.
  // Skip the reset when the URL carries a hash (e.g. footer links into
  // homepage sections like /en/#products) so it can scroll to that
  // section instead of snapping back to the top.
  const prevPathname = useRef(location.pathname);
  useEffect(() => {
    // Anchor clicked while already on this page (e.g. "See it below" tour
    // cards) gets a smooth scroll; arriving fresh at a page with a hash
    // already in the URL (e.g. a footer link from another page) jumps
    // instantly so it doesn't scroll the whole page on load.
    const samePage = prevPathname.current === location.pathname;
    prevPathname.current = location.pathname;

    let cancelRestore = () => {};
    if (location.hash) {
      // The hash decides where the page opens; no restore after it.
      forgetScroll();
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: samePage ? 'smooth' : 'instant', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
      // First render of this document only: a refresh glides back down.
      if (!scrollRestored) cancelRestore = restoreScroll(location.pathname);
    }
    trackPageview();
    return () => cancelRestore();
  }, [location.pathname, location.hash]);

  // Merged once per render (not per t() call — a page can call t() 100+ times).
  const mergedLang = useMemo(() => deepMerge(LOCALES[lang] ?? LOCALES.en, tolgeeOverrides[lang]), [lang, tolgeeOverrides]);
  const mergedEn = useMemo(() => deepMerge(LOCALES.en, tolgeeOverrides.en), [tolgeeOverrides]);

  function t(key) {
    const val = deepGet(mergedLang, key);
    if (val !== undefined) return val;
    const fallback = deepGet(mergedEn, key);
    return fallback !== undefined ? fallback : key;
  }

  function switchLang(newLang) {
    const rest = location.pathname.replace(/^\/[^/]*/, '') || '/';
    navigate(`/${newLang}${rest}${location.search}`);
  }

  // tolgee: the raw live values, for content that is too large to live in the
  // bundled locale files and so is loaded separately — see
  // src/content/docs-content.js, which merges them itself.
  const value = useMemo(() => ({ lang, t, switchLang, tolgee: tolgeeOverrides }), [lang, location.pathname, tolgeeOverrides]);

  if (!VALID_LANGS.includes(lang)) {
    return <Navigate to={`/en${location.pathname}${location.search}`} replace />;
  }

  return (
    <LangContext.Provider value={value}>
      <Outlet />
    </LangContext.Provider>
  );
}
