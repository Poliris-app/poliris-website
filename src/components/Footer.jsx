import { useLang } from '../contexts/LangContext';

// Products/For teams/How-it-works are anchors into homepage sections, so
// they need the /{lang}/ prefix to work from any page, not just Home.
const FOOTER_HREFS = (lang) => [
  `/${lang}/#products`,
  `/${lang}/#team`,
  `/${lang}/docs`,
  `/${lang}/demo`,
  `/${lang}/blog`,
];

export default function Footer() {
  const { lang, t } = useLang();
  const links = t('footer.links');
  const hrefs = FOOTER_HREFS(lang);

  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href={`/${lang}/`} className="footer__logo">
          <img src={`${import.meta.env.BASE_URL}Logo-Poliris-1.svg`} alt="Poliris" />
        </a>
        <nav className="footer__nav">
          {links.map((label, i) => (
            <a key={i} href={hrefs[i]} className="footer__link">
              {label}
            </a>
          ))}
        </nav>
        <p className="footer__copy">{t('footer.copy')}</p>
      </div>
    </footer>
  );
}
