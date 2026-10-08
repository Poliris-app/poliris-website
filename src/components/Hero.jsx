import { useState } from 'react';
import ShaderBackground from './ShaderBackground';
import HeroDashboard from './HeroDashboard';
import { useLang } from '../contexts/LangContext';
import { trackEvent } from '../lib/analytics';
import { APP_URL } from '../lib/appUrl';
import useDomainSuggestions from '../hooks/useDomainSuggestions';

const TRIAL_URL = 'https://app.poliris.io';
const DEMO_URL  = 'https://cal.com/team/poliris/discovery-call';
const isTrialCta = (label) => typeof label === 'string' && /trial|essai/i.test(label);
const isDemoCta  = (label) => typeof label === 'string' && /demo|démo|expert/i.test(label);
const isAuditCta = (label) => typeof label === 'string' && /audit/i.test(label);

/** Strip protocol/path, keep just the host the visitor typed. */
function cleanWebsiteInput(value) {
  return value
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '');
}
const isLikelyDomain = (value) => /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(value);

/** Qwairy-style "type your website, land straight in onboarding" CTA. */
function HeroWebsiteCapture({ placeholder, ctaLabel, errorText, dark }) {
  const { lang } = useLang();
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // A pick from the dropdown shouldn't immediately reopen it against its
  // own value — only a real edit does.
  const [suggestionsSuppressed, setSuggestionsSuppressed] = useState(false);

  const suggestions = useDomainSuggestions(value, !suggestionsSuppressed);
  const suggestionsOpen = isFocused && !suggestionsSuppressed && suggestions.length > 0;

  const goToOnboarding = (website) => {
    trackEvent('trial_cta_clicked', { website, source: 'hero_website_capture' });
    window.location.href = `${APP_URL}/${lang}/onboarding?website=${encodeURIComponent(website)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const website = cleanWebsiteInput(value);
    if (!website || !isLikelyDomain(website)) {
      setError(true);
      return;
    }
    setError(false);
    goToOnboarding(website);
  };

  const handleSelectSuggestion = (domain) => {
    setValue(domain);
    setError(false);
    setSuggestionsSuppressed(true);
    setIsFocused(false);
  };

  return (
    <div className="hero-website-form-wrap">
      <form
        className={`hero-website-form${dark ? ' hero-website-form--dark' : ''}${error ? ' hero-website-form--error' : ''}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <span className="hero-website-form__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
          </svg>
        </span>
        <div className="hero-website-form__input-wrap">
          <input
            type="text"
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-invalid={error}
            aria-expanded={suggestionsOpen}
            aria-autocomplete="list"
            role="combobox"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
              setSuggestionsSuppressed(false);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="hero-website-form__input"
          />
          {suggestionsOpen && (
            <ul className="hero-website-form__suggestions" role="listbox">
              {suggestions.map((s) => (
                <li key={s.domain} role="option" aria-selected={false}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelectSuggestion(s.domain)}
                    className="hero-website-form__suggestion"
                  >
                    <img
                      src={s.logoUrl || `https://www.google.com/s2/favicons?domain=${encodeURIComponent(s.domain)}&sz=64`}
                      alt=""
                      aria-hidden="true"
                      className="hero-website-form__suggestion-logo"
                      onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                    />
                    <span className="hero-website-form__suggestion-text">
                      <span className="hero-website-form__suggestion-name">{s.name}</span>
                      <span className="hero-website-form__suggestion-domain">{s.domain}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="hero-website-form__submit">{ctaLabel}</button>
      </form>
      {error && <p className="hero-website-form__error">{errorText}</p>}
    </div>
  );
}

export default function Hero({ eyebrow, title, audience, lead, primaryCta, secondaryCta, note, showDashboard = true, dark = false, bottom = null, websiteCapture = null, answerCard = null, secondaryKind = null, fullFold = false, visualHeader = null }) {
  const { lang } = useLang();
  const primaryTrial = isTrialCta(primaryCta);
  const primaryDemo  = isDemoCta(primaryCta);
  const primaryAudit = isAuditCta(primaryCta);
  // secondaryKind ('trial' | 'demo' | 'audit') pins the link explicitly, so
  // label copy can change without silently losing its destination.
  const secondaryTrial = secondaryKind ? secondaryKind === 'trial' : isTrialCta(secondaryCta);
  const secondaryDemo  = secondaryKind ? secondaryKind === 'demo'  : isDemoCta(secondaryCta);
  const secondaryAudit = secondaryKind ? secondaryKind === 'audit' : isAuditCta(secondaryCta);

  const primaryHref  = primaryTrial ? TRIAL_URL : primaryDemo ? DEMO_URL : primaryAudit ? `/${lang}/demo` : '#';
  const secondaryHref = secondaryTrial ? TRIAL_URL : secondaryDemo ? DEMO_URL : secondaryAudit ? `/${lang}/demo` : '#';
  const primaryExternal  = primaryTrial || primaryDemo;
  const secondaryExternal = secondaryTrial || secondaryDemo;

  return (
    <>
      <header id="top" className={`hero${dark ? ' hero--dark' : ''}${fullFold ? ' hero--fold' : ''}`}>
        {!dark && <ShaderBackground className="hero__shader" />}
        <div className="hero__inner">
          {/* fullFold: the headline block fills the first screen on its own,
              so everything after it (AI band, dashboard) starts below the fold. */}
          <div className={fullFold ? 'hero__fold' : undefined}>
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="hero__h1">{title}</h1>
          {audience && <p className="hero__audience">{audience}</p>}
          <p className="hero__lead">{lead}</p>
          <div className="hero__actions">
            {websiteCapture ? (
              <HeroWebsiteCapture
                placeholder={websiteCapture.placeholder}
                ctaLabel={websiteCapture.ctaLabel}
                errorText={websiteCapture.errorText}
                dark={dark}
              />
            ) : (
              <a
                href={primaryHref}
                className="btn btn--primary"
                {...(primaryExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => { if (primaryTrial) trackEvent('trial_cta_clicked'); else if (primaryDemo) trackEvent('demo_cta_clicked'); else if (primaryAudit) trackEvent('audit_cta_clicked'); }}
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
            )}
            <a
              href={secondaryHref}
              className="btn btn--secondary"
              {...(secondaryExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => { if (secondaryTrial) trackEvent('trial_cta_clicked'); else if (secondaryDemo) trackEvent('demo_cta_clicked'); else if (secondaryAudit) trackEvent('audit_cta_clicked'); }}
            >
              {secondaryCta}
            </a>
          </div>
          <p className="hero__note">{note}</p>
          </div>

          {bottom && <div className="hero__bottom-slot">{bottom}</div>}

          {/* Optional section header introducing the product preview below. */}
          {showDashboard && visualHeader && (
            <div className="sec-head hero__visual-head reveal">
              <div className="eyebrow">{visualHeader.eyebrow}</div>
              <h2 className="sec-h2">{visualHeader.title}</h2>
              <p className="sec-lead">{visualHeader.lead}</p>
            </div>
          )}

          {showDashboard && (answerCard ? (
            <div className="hero__visual">
              {answerCard}
              <HeroDashboard />
            </div>
          ) : <HeroDashboard />)}
        </div>
      </header>
    </>
  );
}
