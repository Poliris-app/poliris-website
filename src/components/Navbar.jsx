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
    label: 'Content Writing',
    description: 'Generate AI-optimised pages and structured data',
    href: '#products',
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
    <nav className={`nav${stuck ? ' nav--stuck' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <img src="/Logo-Poliris-1.svg" alt="Poliris" />
          <span className="nav__logo-text">Poliris</span>
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
                return p.href.startsWith('/')
                  ? <Link key={p.label} to={p.href} className="nav__dropdown-item">{inner}</Link>
                  : <a key={p.label} href={p.href} className="nav__dropdown-item">{inner}</a>;
              })}
            </div>
          </div>

          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
        </div>

        <div className="nav__actions">
          <a href="#" className="nav__login">Log in</a>
          <a href="#" className="nav__cta">Get your free trial</a>
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
                {PRODUCTS.map((p) =>
                  p.href.startsWith('/')
                    ? <Link key={p.label} to={p.href} className="nav__mobile-sublink" onClick={() => setOpen(false)}>{p.label}</Link>
                    : <a key={p.label} href={p.href} className="nav__mobile-sublink" onClick={() => setOpen(false)}>{p.label}</a>
                )}
              </div>
            )}
          </div>

          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__mobile-link" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}

          <div className="nav__mobile-bottom">
            <a href="#" className="nav__mobile-link" onClick={() => setOpen(false)}>Log in</a>
            <a href="#" className="nav__mobile-cta" onClick={() => setOpen(false)}>Get your free trial</a>
          </div>
        </div>
      )}
    </nav>
  );
}
