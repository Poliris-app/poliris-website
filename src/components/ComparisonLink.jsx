import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';

// One line linking to the comparison post, placed above the closing CTA on
// the product pages and on pricing. A plain <a href> in the prerendered HTML,
// so crawlers follow it without running JavaScript.
export default function ComparisonLink() {
  const { lang, t } = useLang();
  return (
    <p className="comparison-link">
      <span className="comparison-link__lead">{t('comparisonLink.lead')}</span>{' '}
      <Link to={`/${lang}/blog/poliris-comparison`} className="comparison-link__a">
        {t('comparisonLink.link')}
      </Link>
    </p>
  );
}
