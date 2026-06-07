const LINKS = [
  { label: 'Products', href: '#products' },
  { label: 'For teams', href: '#team' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#' },
  { label: 'Blog', href: '#' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href="#top" className="footer__logo">
          <img src="/Logo-Poliris-1.svg" alt="Poliris" />
          <span className="footer__logo-text">Poliris</span>
        </a>
        <nav className="footer__nav">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="footer__link">
              {l.label}
            </a>
          ))}
        </nav>
        <p className="footer__copy">© 2026 Poliris · Brand intelligence for the AI era</p>
      </div>
    </footer>
  );
}
