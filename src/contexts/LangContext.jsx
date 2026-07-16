import { createContext, useContext, useMemo, useEffect } from 'react';
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

export function LangWrapper() {
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Identify visitor from ph_id param (runs once on first mount)
  useEffect(() => {
    identifyUser();
  }, []);

  // Reset scroll + capture SPA pageview on every route change.
  // Skip the reset when the URL carries a hash (e.g. footer links into
  // homepage sections like /en/#products) so it can scroll to that
  // section instead of snapping back to the top.
  useEffect(() => {
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    trackPageview();
  }, [location.pathname, location.hash]);

  function t(key) {
    const locale = LOCALES[lang] ?? LOCALES.en;
    const val = deepGet(locale, key);
    if (val !== undefined) return val;
    const fallback = deepGet(LOCALES.en, key);
    return fallback !== undefined ? fallback : key;
  }

  function switchLang(newLang) {
    const rest = location.pathname.replace(/^\/[^/]*/, '') || '/';
    navigate(`/${newLang}${rest}${location.search}`);
  }

  const value = useMemo(() => ({ lang, t, switchLang }), [lang, location.pathname]);

  if (!VALID_LANGS.includes(lang)) {
    return <Navigate to={`/en${location.pathname}${location.search}`} replace />;
  }

  return (
    <LangContext.Provider value={value}>
      <Outlet />
    </LangContext.Provider>
  );
}
