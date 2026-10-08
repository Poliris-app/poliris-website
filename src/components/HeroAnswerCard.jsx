import { useLang } from '../contexts/LangContext';

/* Sample AI answer shown beside the hero dashboard: the buyer's question,
   the brands AI named (with "you" highlighted), and how that product does
   by market. Copy and sample numbers live in locales under home.hero.answer. */
export default function HeroAnswerCard() {
  const { t } = useLang();
  const a = t('home.hero.answer');
  if (!a || typeof a !== 'object') return null;

  return (
    <aside className="hero-answer" aria-label={a.ariaLabel}>
      <div className="hero-answer__head">
        <span className="hero-answer__sample">{a.sample}</span>
      </div>

      <p className="hero-answer__question">{a.question}</p>

      <ol className="hero-answer__list">
        {a.items.map((item, i) => {
          const isYou = i === a.youIndex;
          return (
            <li key={item} className={`hero-answer__item${isYou ? ' hero-answer__item--you' : ''}`}>
              <span className="hero-answer__rank">{i + 1}</span>
              <span className="hero-answer__brand">{item}</span>
              {isYou && <span className="hero-answer__you">{a.you}</span>}
            </li>
          );
        })}
      </ol>

      <div className="hero-answer__markets">
        <p className="hero-answer__markets-title">{a.marketsTitle}</p>
        {a.markets.map((m) => (
          <div key={m.name} className="hero-answer__market">
            <span className="hero-answer__market-name">{m.name}</span>
            <span className="hero-answer__bar" aria-hidden="true">
              <span className="hero-answer__bar-fill" style={{ width: `${m.value}%` }} />
            </span>
            <span className="hero-answer__market-value">{m.value}%</span>
          </div>
        ))}
      </div>

      <p className="hero-answer__insight">
        <img src={`${import.meta.env.BASE_URL}Illustrations/nora.png`} alt="" aria-hidden="true" className="hero-answer__avatar" />
        <span><strong>{a.agent}:</strong> {a.insight}</span>
      </p>
    </aside>
  );
}
