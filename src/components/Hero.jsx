import { useEffect, useRef } from 'react';
import HeroDashboard from './HeroDashboard';
import { useLang } from '../contexts/LangContext';

const TRIAL_URL = 'https://app.poliris.io';
const isTrialCta = (label) => typeof label === 'string' && /trial/i.test(label);

const LOGOS = [
  { src: `${import.meta.env.BASE_URL}Chatgpt-logo-2.svg`, alt: 'ChatGPT' },
  { src: `${import.meta.env.BASE_URL}Gemini-logo-2.svg`, alt: 'Gemini' },
  { src: `${import.meta.env.BASE_URL}Deepseek-logo.svg`, alt: 'Deepseek' },
  { src: `${import.meta.env.BASE_URL}Mistral-ai-logo.svg`, alt: 'Mistral AI' },
  { src: `${import.meta.env.BASE_URL}Claude-logo-2.svg`, alt: 'Claude' },
  { src: `${import.meta.env.BASE_URL}Perplexity-logo-2.svg`, alt: 'Perplexity' },
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

function ScrollHint() {
  const { t } = useLang();
  const travelRef = useRef(null);

  useEffect(() => {
    const LINE_H = 80;
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(scrolled / total, 1) : 0;
      if (travelRef.current) {
        travelRef.current.style.top = `${progress * LINE_H}px`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-hint" aria-hidden="true">
      <span className="scroll-hint__label">{t('scroll')}</span>
      <span className="scroll-hint__line">
        <span className="scroll-hint__travel" ref={travelRef} />
      </span>
    </div>
  );
}

export default function Hero({ eyebrow, title, lead, primaryCta, secondaryCta, note, showDashboard = true, showAiBand = true, dark = false, bottom = null }) {
  const primaryTrial = isTrialCta(primaryCta);
  const secondaryTrial = isTrialCta(secondaryCta);
  return (
    <>
      <ScrollHint />
      <header id="top" className={`hero${dark ? ' hero--dark' : ''}`}>
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__inner">
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="hero__h1">{title}</h1>
          <p className="hero__lead">{lead}</p>
          <div className="hero__actions">
            <a
              href={primaryTrial ? TRIAL_URL : '#'}
              className="btn btn--primary"
              {...(primaryTrial ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {primaryCta}
              {!dark && (
                <span className="btn__icon btn__icon--dark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </span>
              )}
            </a>
            <a
              href={secondaryTrial ? TRIAL_URL : '#'}
              className="btn btn--secondary"
              {...(secondaryTrial ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {secondaryCta}
            </a>
          </div>
          <p className="hero__note">{note}</p>

          {bottom && <div className="hero__bottom-slot">{bottom}</div>}

          {showAiBand && <AiBand />}

          {showDashboard && <HeroDashboard />}
        </div>
      </header>
    </>
  );
}
