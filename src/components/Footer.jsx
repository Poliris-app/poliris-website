import { useLang } from '../contexts/LangContext';

const FOOTER_HREFS = ['#products', '#team', '#how', '#', '#'];

export default function Footer() {
  const { lang, t } = useLang();
  const links = t('footer.links');

  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href={`/${lang}/`} className="footer__logo">
          <img src={`${import.meta.env.BASE_URL}Logo-Poliris-1.svg`} alt="Poliris" />
        </a>
        <nav className="footer__nav">
          {links.map((label, i) => (
            <a key={i} href={FOOTER_HREFS[i]} className="footer__link">
              {label}
            </a>
          ))}
        </nav>
        <p className="footer__copy">{t('footer.copy')}</p>
      </div>
    </footer>
  );
}
