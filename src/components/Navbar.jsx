import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PRODUCTS = [
  {
    label: 'AI Visibility',
    description: 'Track share of voice across all AI engines',
    href: '/visibility',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
      </svg>
    ),
  },
  {
    label: 'AI Sentiment',
    description: 'See how AI engines describe your brand',
    href: '/sentiment',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    label: 'Technical Audit',
    description: 'Identify and fix what blocks AI from reading your site',
    href: '#products',
    comingSoon: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    label: 'Content Writing',
    description: 'Generate AI-optimised pages and structured data',
    href: '/content-writing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
];

const RESOURCES = [
  { label: 'Blog', description: 'Insights on AI visibility and GEO strategy', href: '/blog' },
  { label: 'FAQs', description: 'Common questions about Poliris and Kate', href: '/faqs' },
  { label: 'Glossary', description: 'Key terms in AI search and GEO explained', href: '/glossary' },
];

const NAV_LINKS_BEFORE = [{ label: 'For teams', href: '#team' }];
const NAV_LINKS_AFTER = [
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#' },
];

export default function Navbar() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const [mobileResources, setMobileResources] = useState(false);
  const [toast, setToast] = useState(false);
  const [lang, setLang] = useState('EN');
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const onOutside = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  function showToast() {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }

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

  return (
    <>
      <nav className={`nav${stuck ? ' nav--stuck' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="nav__logo">
            <img src={`${import.meta.env.BASE_URL}Logo-Poliris-1.svg`} alt="Poliris" />
            {/* <span className="nav__logo-text">Poliris</span> */}
          </Link>

          <div className="nav__links">
            <div className="nav__dropdown-wrap">
              <button className="nav__link nav__link--btn">
                Products
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" className="nav__chevron">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              <div className="nav__dropdown">
                {PRODUCTS.map((p) => {
                  const inner = (
                    <>
                      <span className="nav__dropdown-icon">{p.icon}</span>
                      <span className="nav__dropdown-text">
                        <span className="nav__dropdown-label">{p.label}</span>
                        <span className="nav__dropdown-desc">{p.description}</span>
                      </span>
                    </>
                  );
                  if (p.comingSoon)
                    return <button key={p.label} className="nav__dropdown-item nav__link--btn" disabled>{inner}</button>;
                  return p.href.startsWith('/')
                    ? <Link key={p.label} to={p.href} className="nav__dropdown-item">{inner}</Link>
                    : <a key={p.label} href={p.href} className="nav__dropdown-item">{inner}</a>;
                })}
              </div>
            </div>

            {NAV_LINKS_BEFORE.map((l) => (
              <button key={l.label} className="nav__link nav__link--btn" disabled>{l.label}</button>
            ))}

            <div className="nav__dropdown-wrap">
              <button className="nav__link nav__link--btn">
                Resources
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" className="nav__chevron">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              <div className="nav__dropdown">
                {RESOURCES.map((r) => (
                  <Link key={r.label} to={r.href} className="nav__dropdown-item">
                    <span className="nav__dropdown-text">
                      <span className="nav__dropdown-label">{r.label}</span>
                      <span className="nav__dropdown-desc">{r.description}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {NAV_LINKS_AFTER.map((l) => (
              <button key={l.label} className="nav__link nav__link--btn" disabled>{l.label}</button>
            ))}

          </div>

          <div className="nav__actions">
            <div className="nav__lang" ref={langRef}>
              <button className="nav__lang-btn nav__link--btn" disabled>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
                </svg>
                {lang}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11" style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {langOpen && (
                <div className="nav__lang-drop">
                  {[{ code: 'EN', label: 'English' }, { code: 'FR', label: 'Français' }].map(l => (
                    <button key={l.code} className={`nav__lang-opt${lang === l.code ? ' active' : ''}`} onClick={() => { setLang(l.code); setLangOpen(false); }}>
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
            <a className="nav__login" href="https://app.poliris.io" target="_blank" rel="noopener noreferrer">Log in</a>
            <a className="nav__cta" href="https://app.poliris.io" target="_blank" rel="noopener noreferrer">Get your free trial</a>
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
            <div>
              <button
                className="nav__mobile-link nav__mobile-link--btn"
                onClick={() => setMobileProducts(!mobileProducts)}
              >
                Products
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" style={{ transform: mobileProducts ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {mobileProducts && (
                <div className="nav__mobile-subnav">
                  {PRODUCTS.map((p) => {
                    if (p.comingSoon) return <button key={p.label} className="nav__mobile-sublink nav__link--btn" disabled>{p.label}</button>;
                    return p.href.startsWith('/')
                      ? <Link key={p.label} to={p.href} className="nav__mobile-sublink" onClick={() => setOpen(false)}>{p.label}</Link>
                      : <a key={p.label} href={p.href} className="nav__mobile-sublink" onClick={() => setOpen(false)}>{p.label}</a>;
                  })}
                </div>
              )}
            </div>

            <div>
              <button className="nav__mobile-link nav__mobile-link--btn" onClick={() => setMobileResources(!mobileResources)}>
                Resources
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12" style={{ transform: mobileResources ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {mobileResources && (
                <div className="nav__mobile-subnav">
                  {RESOURCES.map((r) => (
                    <Link key={r.label} to={r.href} className="nav__mobile-sublink" onClick={() => setOpen(false)}>{r.label}</Link>
                  ))}
                </div>
              )}
            </div>

            {NAV_LINKS_BEFORE.map((l) => (
              <button key={l.label} className="nav__mobile-link nav__mobile-link--btn" disabled>{l.label}</button>
            ))}

            {NAV_LINKS_AFTER.map((l) => (
              <button key={l.label} className="nav__mobile-link nav__mobile-link--btn" disabled>{l.label}</button>
            ))}

            <div className="nav__mobile-lang">
              {[{ code: 'EN', label: 'English' }, { code: 'FR', label: 'Français' }].map(l => (
                <button key={l.code} className={`nav__mobile-lang-btn${lang === l.code ? ' active' : ''}`} disabled>
                  {lang === l.code && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  )}
                  {l.label}
                </button>
              ))}
            </div>

            <div className="nav__mobile-bottom">
              <a className="nav__mobile-link" href="https://app.poliris.io" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Log in</a>
              <a className="nav__mobile-cta" href="https://app.poliris.io" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Get your free trial</a>
            </div>
          </div>
        )}
      </nav>
      {toast && (
        <div className="nav__toast">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/>
          </svg>
          Coming soon!
        </div>
      )}
    </>
  );
}
