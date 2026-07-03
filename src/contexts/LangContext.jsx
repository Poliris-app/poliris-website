import { createContext, useContext, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Outlet, Navigate } from 'react-router-dom';
import { identifyUser, trackEvent } from '../lib/analytics';
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

  // Reset scroll + capture SPA pageview on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('$pageview');
  }, [location.pathname]);

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
