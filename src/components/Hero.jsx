import HeroDashboard from './HeroDashboard';

const LOGOS = [
  { src: '/Chatgpt-logo-2.svg',    alt: 'ChatGPT' },
  { src: '/Gemini-logo-2.svg',     alt: 'Gemini' },
  { src: '/Deepseek-logo.svg',     alt: 'Deepseek' },
  { src: '/Mistral-ai-logo.svg',   alt: 'Mistral AI' },
  { src: '/Claude-logo-2.svg',     alt: 'Claude' },
  { src: '/Perplexity-logo-2.svg', alt: 'Perplexity' },
];

function AiBand() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section className="ai-band">
      <div className="ai-band__track">
        {doubled.map((l, i) => (
          <img key={i} src={l.src} alt={l.alt} className="ai-band__logo" />
        ))}
      </div>
    </section>
  );
}

export default function Hero({ eyebrow, title, lead, primaryCta, secondaryCta, note, showDashboard = true, dark = false }) {
  return (
    <header id="top" className={`hero${dark ? ' hero--dark' : ''}`}>
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__inner">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="hero__h1">{title}</h1>
        <p className="hero__lead">{lead}</p>
        <div className="hero__actions">
          <a href="#" className="btn btn--primary">
            {primaryCta}
            {!dark && (
              <span className="btn__icon btn__icon--dark">
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </span>
            )}
          </a>
          <a href="#" className="btn btn--secondary">{secondaryCta}</a>
        </div>
        <p className="hero__note">{note}</p>

        <AiBand />

        {showDashboard && <HeroDashboard />}
      </div>
    </header>
  );
}
