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

// "For teams" (1) is hidden for now — no section to point it at yet.
// Indices match footer.links in locales/*.js.
const HIDDEN_INDICES = new Set([1]);

// "Pricing" (3) has no page yet, so it's relabeled to Get a demo until
// one exists — reuses the same copy as the navbar's CTA.
const PRICING_INDEX = 3;

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
            !HIDDEN_INDICES.has(i) && (
              <a key={i} href={hrefs[i]} className="footer__link">
                {i === PRICING_INDEX ? t('nav.getDemo') : label}
              </a>
            )
          ))}
        </nav>
        <p className="footer__copy">{t('footer.copy')}</p>
      </div>
    </footer>
  );
}
