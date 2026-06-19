const MODELS = ['ChatGPT', 'Gemini', 'Perplexity', 'Claude', 'Mistral', 'DeepSeek', 'Grok', 'Copilot'];
const tripled = [...MODELS, ...MODELS, ...MODELS];

const TRIAL_URL = 'https://app.poliris.io';
const DEMO_URL  = 'https://cal.com/team/poliris/application-demo';
const isTrialCta = (label) => typeof label === 'string' && /trial|essai/i.test(label);
const isDemoCta  = (label) => typeof label === 'string' && /demo|démo/i.test(label);

export default function CtaBand({
  heading = 'See how AI describes your brand.',
  lead = 'Start a 14-day free trial. No setup, no expertise needed just the picture of how AI sees you today.',
  primaryCta = 'Get your free trial',
  secondaryCta = 'Book a demo',
  note = '14 days free · No credit card required',
}) {
  const primaryTrial = isTrialCta(primaryCta);
  const primaryDemo  = isDemoCta(primaryCta);
  const secondaryTrial = isTrialCta(secondaryCta);
  const secondaryDemo  = isDemoCta(secondaryCta);

  const primaryHref  = primaryTrial ? TRIAL_URL : primaryDemo ? DEMO_URL : '#';
  const secondaryHref = secondaryTrial ? TRIAL_URL : secondaryDemo ? DEMO_URL : '#';
  const primaryExternal  = primaryTrial || primaryDemo;
  const secondaryExternal = secondaryTrial || secondaryDemo;

  return (
    <section id="how" className="cta-band">
      <div className="cta-band__glow" aria-hidden="true" />
      <div className="cta-band__glow2" aria-hidden="true" />
      <div className="cta-band__inner">
        <h2 className="cta-band__h2 reveal">{heading}</h2>
        <p className="cta-band__lead reveal reveal--d1">{lead}</p>
        <div className="cta-band__actions reveal reveal--d2">
          <a
            href={primaryHref}
            className="btn btn--primary"
            {...(primaryExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {primaryCta}
          </a>
          <a
            href={secondaryHref}
            className="btn btn--secondary"
            {...(secondaryExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {secondaryCta}
          </a>
        </div>
        <p className="cta-band__note">{note}</p>
      </div>
      <div className="cta-model-strip">
        <div className="cta-model-track">
          {tripled.map((m, i) => (
            <span key={i} className="cta-model-item">{m}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
