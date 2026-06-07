import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Products', href: '#products' },
  { label: 'For teams', href: '#team' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#' },
];

export default function Navbar() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

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
        <a href="#top" className="nav__logo">
          <img src="/Logo-Poliris-1.svg" alt="Poliris" />
          <span className="nav__logo-text">Poliris</span>
        </a>

        <div className="nav__links">
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
