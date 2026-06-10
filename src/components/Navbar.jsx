import { useState, useEffect } from 'react';
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

const NAV_LINKS = [
  { label: 'For teams', href: '#team' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#' },
];

export default function Navbar() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const [toast, setToast] = useState(false);

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
                  return <button key={p.label} className="nav__dropdown-item nav__link--btn" onClick={showToast}>{inner}</button>;
                return p.href.startsWith('/')
                  ? <Link key={p.label} to={p.href} className="nav__dropdown-item">{inner}</Link>
                  : <a key={p.label} href={p.href} className="nav__dropdown-item">{inner}</a>;
              })}
            </div>
          </div>

          {NAV_LINKS.map((l) => (
            <button key={l.label} className="nav__link nav__link--btn" onClick={showToast}>
              {l.label}
            </button>
          ))}
        </div>

        <div className="nav__actions">
          <button className="nav__login nav__link--btn" onClick={showToast}>Log in</button>
          <button className="nav__cta" onClick={showToast}>Get your free trial</button>
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
                  if (p.comingSoon)
                    return <button key={p.label} className="nav__mobile-sublink nav__link--btn" onClick={() => { setOpen(false); showToast(); }}>{p.label}</button>;
                  return p.href.startsWith('/')
                    ? <Link key={p.label} to={p.href} className="nav__mobile-sublink" onClick={() => setOpen(false)}>{p.label}</Link>
                    : <a key={p.label} href={p.href} className="nav__mobile-sublink" onClick={() => setOpen(false)}>{p.label}</a>;
                })}
              </div>
            )}
          </div>

          {NAV_LINKS.map((l) => (
            <button key={l.label} className="nav__mobile-link nav__link--btn" onClick={() => { setOpen(false); showToast(); }}>
              {l.label}
            </button>
          ))}

          <div className="nav__mobile-bottom">
            <button className="nav__mobile-link nav__link--btn" onClick={() => { setOpen(false); showToast(); }}>Log in</button>
            <button className="nav__mobile-cta" onClick={() => { setOpen(false); showToast(); }}>Get your free trial</button>
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
