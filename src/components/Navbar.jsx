import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { hasAccountCookie } from '../lib/hasAccountCookie';
import { APP_URL } from '../lib/appUrl';

const PRODUCT_HREFS = ['/visibility', '/sentiment', '/technical-audit', '/content-writing'];
const RESOURCE_HREFS = ['/blog', '/faqs', '/glossary', '/docs'];

const CHEVRON_DN = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" className="nav__chevron">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const GLOBE_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
  </svg>
);

const PERSON_ICON = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

const PRODUCT_ICONS = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" key="vis">
    <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" key="sent">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" key="audit">
    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" key="cw">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>,
];

export default function Navbar() {
  const { lang, t, switchLang } = useLang();
  const location = useLocation();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const [mobileResources, setMobileResources] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const langRef = useRef(null);

  // Deliberately read post-hydration, not as a lazy useState initializer:
  // this is pre-rendered at build time with no `document`, so seeding real
  // state during the initial render would mismatch the static HTML. Only
  // known post-checkout, in this browser — not full cross-domain SSO
  // detection (see the plan notes on poliris_has_account).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasAccount(hasAccountCookie());
  }, []);

  const productsMenu  = t('nav.productsMenu');
  const resourcesMenu = t('nav.resourcesMenu');
  const langOptions   = t('nav.langOptions');

  useEffect(() => {
    const onOutside = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const langLabel = lang.toUpperCase();

  // Strip the /en or /fr prefix so hrefs like "/visibility" line up with
  // PRODUCT_HREFS/RESOURCE_HREFS regardless of locale — startsWith (not
  // exact equality) so a blog post's own slug still counts as "Resources".
  const path = location.pathname.replace(/^\/(en|fr)/, '') || '/';
  const isProductsActive = PRODUCT_HREFS.some((href) => path === href || path.startsWith(`${href}/`));
  const isResourcesActive = RESOURCE_HREFS.some((href) => path === href || path.startsWith(`${href}/`));

  return (
    <>
    <nav className={`nav${stuck ? ' nav--stuck' : ''}`}>
      <div className="nav__inner">
        <Link to={`/${lang}/`} className="nav__logo">
          <img src={`${import.meta.env.BASE_URL}Logo-Poliris-1.svg`} alt="Poliris" />
        </Link>

        <div className="nav__links">
          {/* Products dropdown */}
          <div className="nav__dropdown-wrap">
            <button className={`nav__link nav__link--btn${isProductsActive ? ' active' : ''}`}>
              {t('nav.products')}
              {CHEVRON_DN}
            </button>
            <div className="nav__dropdown">
              {productsMenu.map((p, i) => {
                const href = PRODUCT_HREFS[i];
                const inner = (
                  <>
                    <span className="nav__dropdown-icon">{PRODUCT_ICONS[i]}</span>
                    <span className="nav__dropdown-text">
                      <span className="nav__dropdown-label">{p.label}</span>
                      <span className="nav__dropdown-desc">{p.description}</span>
                    </span>
                  </>
                );
                if (!href)
                  return <button key={i} className="nav__dropdown-item nav__link--btn" disabled>{inner}</button>;
                return <Link key={i} to={`/${lang}${href}`} className="nav__dropdown-item">{inner}</Link>;
              })}
            </div>
          </div>

          {/* Resources dropdown */}
          <div className="nav__dropdown-wrap">
            <button className={`nav__link nav__link--btn${isResourcesActive ? ' active' : ''}`}>
              {t('nav.resources')}
              {CHEVRON_DN}
            </button>
            <div className="nav__dropdown">
              {resourcesMenu.map((r, i) => {
                const href = RESOURCE_HREFS[i];
                const inner = (
                  <span className="nav__dropdown-text">
                    <span className="nav__dropdown-label">{r.label}</span>
                    <span className="nav__dropdown-desc">{r.description}</span>
                  </span>
                );
                if (!href)
                  return <button key={i} className="nav__dropdown-item nav__link--btn" disabled>{inner}</button>;
                return <Link key={i} to={`/${lang}${href}`} className="nav__dropdown-item">{inner}</Link>;
              })}
            </div>
          </div>

          <Link to={`/${lang}/pricing`} className={`nav__link${path === '/pricing' ? ' active' : ''}`}>{t('nav.pricing')}</Link>
          <Link to={`/${lang}/demo`} className={`nav__link${path === '/demo' ? ' active' : ''}`}>{t('nav.getDemo')}</Link>

        </div>

        <div className="nav__actions">
          {(() => {
            const langSwitcher = (
              <div className="nav__lang" ref={langRef}>
                <button
                  className="nav__lang-btn nav__link--btn"
                  onClick={() => setLangOpen(!langOpen)}
                >
                  {GLOBE_ICON}
                  {langLabel}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {langOpen && (
                  <div className="nav__lang-drop">
                    {langOptions.map(l => (
                      <button
                        key={l.code}
                        className={`nav__lang-opt${lang === l.code ? ' active' : ''}`}
                        onClick={() => { switchLang(l.code); setLangOpen(false); }}
                      >
                        {l.label}
                        {lang === l.code && (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5"/>
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
            return hasAccount ? (
              <>
                {langSwitcher}
                <a className="nav__cta" href={APP_URL}>{t('nav.dashboard')}</a>
              </>
            ) : (
              <div className="nav__account-pill">
                {langSwitcher}
                <span className="nav__account-divider" />
                <a className="nav__login" href={APP_URL}>
                  <span className="nav__login-icon">{PERSON_ICON}</span>
                  {t('nav.logIn')}
                </a>
              </div>
            );
          })()}
        </div>

        <button
          className="nav__toggle"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open
              ? (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>)
              : (<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>)
            }
          </svg>
        </button>
      </div>

      {open && (
        <div className="nav__mobile">
          {/* Products */}
          <div>
            <button
              className={`nav__mobile-link nav__mobile-link--btn${mobileProducts ? ' nav__mobile-link--btn--open' : ''}`}
              onClick={() => setMobileProducts(!mobileProducts)}
            >
              {t('nav.products')}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" style={{ transform: mobileProducts ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            <div className={`nav__mobile-subnav-wrap${mobileProducts ? ' nav__mobile-subnav-wrap--open' : ''}`}>
              <div className="nav__mobile-subnav">
                {productsMenu.map((p, i) => {
                  const href = PRODUCT_HREFS[i];
                  const inner = (
                    <>
                      <span className="nav__mobile-sublink-icon">{PRODUCT_ICONS[i]}</span>
                      {p.label}
                    </>
                  );
                  if (!href) return <button key={i} className="nav__mobile-sublink nav__link--btn" disabled>{inner}</button>;
                  return <Link key={i} to={`/${lang}${href}`} className="nav__mobile-sublink" onClick={() => setOpen(false)}>{inner}</Link>;
                })}
              </div>
            </div>
          </div>

          {/* Resources */}
          <div>
            <button
              className={`nav__mobile-link nav__mobile-link--btn${mobileResources ? ' nav__mobile-link--btn--open' : ''}`}
              onClick={() => setMobileResources(!mobileResources)}
            >
              {t('nav.resources')}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" style={{ transform: mobileResources ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            <div className={`nav__mobile-subnav-wrap${mobileResources ? ' nav__mobile-subnav-wrap--open' : ''}`}>
              <div className="nav__mobile-subnav">
                {resourcesMenu.map((r, i) => {
                  const href = RESOURCE_HREFS[i];
                  if (!href)
                    return <button key={i} className="nav__mobile-sublink nav__link--btn" disabled>{r.label}</button>;
                  return <Link key={i} to={`/${lang}${href}`} className="nav__mobile-sublink" onClick={() => setOpen(false)}>{r.label}</Link>;
                })}
              </div>
            </div>
          </div>

          <Link to={`/${lang}/pricing`} className="nav__mobile-link" onClick={() => setOpen(false)}>{t('nav.pricing')}</Link>
          <Link to={`/${lang}/demo`} className="nav__mobile-link" onClick={() => setOpen(false)}>{t('nav.getDemo')}</Link>

          <div className="nav__mobile-bottom">
            <div className="nav__mobile-lang">
              {langOptions.map(l => (
                <button
                  key={l.code}
                  className={`nav__mobile-lang-btn${lang === l.code ? ' active' : ''}`}
                  onClick={() => { switchLang(l.code); setOpen(false); }}
                >
                  {l.code.toUpperCase()}
                </button>
              ))}
            </div>
            {hasAccount ? (
              <a className="nav__mobile-cta" href={APP_URL} onClick={() => setOpen(false)}>{t('nav.dashboard')}</a>
            ) : (
              <a className="nav__mobile-cta nav__mobile-cta--login" href={APP_URL} onClick={() => setOpen(false)}>{t('nav.logIn')}</a>
            )}
          </div>
        </div>
      )}
    </nav>
    </>
  );
}
