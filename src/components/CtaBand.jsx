import { useLang } from '../contexts/LangContext';
import { trackEvent } from '../lib/analytics';

/* The marquee of engines, each with its mark. Logos live in public/ and
   are drawn in white on the blue band (see .cta-model-logo), the same
   treatment the dark hero uses. The white filter needs a transparent
   background, otherwise the mark becomes a solid block, hence the
   *-transparent.png files. */
// The square marks, not the *-logo-2.svg wordmarks: those already carry
// the brand name, so the strip read "Claude Claude".
const MODELS = [
  { name: 'ChatGPT', logo: 'chatgpt-transparent.png' },
  { name: 'Gemini', logo: 'gemini-transparent.png' },
  { name: 'Perplexity', logo: 'perplexity-ai-logo.png' },
  { name: 'Claude', logo: 'claudeai-com-logo.png' },
  { name: 'Mistral', logo: 'mistral-transparent.png' },
  { name: 'DeepSeek', logo: 'deepseek.png' },
  { name: 'Grok', logo: 'grok-com-logo.png' },
  { name: 'Copilot', logo: 'copilot-transparent.png' },
];
const tripled = [...MODELS, ...MODELS, ...MODELS];

const TRIAL_URL = 'https://app.poliris.io';
const DEMO_URL  = 'https://cal.com/team/poliris/discovery-call';
const isTrialCta = (label) => typeof label === 'string' && /trial|essai/i.test(label);
const isDemoCta  = (label) => typeof label === 'string' && /demo|démo|expert/i.test(label);
const isAuditCta = (label) => typeof label === 'string' && /audit/i.test(label);

export default function CtaBand({
  heading = 'See how AI describes your brand.',
  lead = 'Start a 14-day free trial. No setup, no expertise needed just the picture of how AI sees you today.',
  primaryCta = 'Get your free trial',
  secondaryCta = 'Book a demo',
  note = '14 days free · No credit card required',
}) {
  const { lang } = useLang();
  const primaryTrial = isTrialCta(primaryCta);
  const primaryDemo  = isDemoCta(primaryCta);
  const primaryAudit = isAuditCta(primaryCta);
  const secondaryTrial = isTrialCta(secondaryCta);
  const secondaryDemo  = isDemoCta(secondaryCta);
  const secondaryAudit = isAuditCta(secondaryCta);

  const primaryHref  = primaryTrial ? TRIAL_URL : primaryDemo ? DEMO_URL : primaryAudit ? `/${lang}/demo` : '#';
  const secondaryHref = secondaryTrial ? TRIAL_URL : secondaryDemo ? DEMO_URL : secondaryAudit ? `/${lang}/demo` : '#';
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
            onClick={() => { if (primaryTrial) trackEvent('trial_cta_clicked'); else if (primaryDemo) trackEvent('demo_cta_clicked'); else if (primaryAudit) trackEvent('audit_cta_clicked'); }}
          >
            {primaryCta}
          </a>
          <a
            href={secondaryHref}
            className="btn btn--secondary"
            {...(secondaryExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            onClick={() => { if (secondaryTrial) trackEvent('trial_cta_clicked'); else if (secondaryDemo) trackEvent('demo_cta_clicked'); else if (secondaryAudit) trackEvent('audit_cta_clicked'); }}
          >
            {secondaryCta}
          </a>
        </div>
        <p className="cta-band__note">{note}</p>
      </div>
      <div className="cta-model-strip">
        <div className="cta-model-track">
          {tripled.map((m, i) => (
            <span key={i} className="cta-model-item">
              {m.logo && <img src={`${import.meta.env.BASE_URL}${m.logo}`} alt={m.name} className="cta-model-logo" width="18" height="18" />}
              <span>{m.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
