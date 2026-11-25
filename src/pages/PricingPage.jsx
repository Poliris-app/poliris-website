import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { SOFTWARE_ID, planOffers, faqPageNode } from '../lib/schema';
import PlanCheckoutModal from '../components/PlanCheckoutModal';
import DashSidebar from '../components/DashSidebar';
import { useLang } from '../contexts/LangContext';
import { hasAccountCookie, currentPlanTierCookie } from '../lib/hasAccountCookie';
import { APP_URL } from '../lib/appUrl';
import { trackEvent } from '../lib/analytics';
import { TURNSTILE_SITE_KEY, loadTurnstileScript } from '../lib/turnstile';
import useDomainSuggestions from '../hooks/useDomainSuggestions';
import '../pricing.css';

const CHECK_ICON = (
  <svg className="pricing-check" viewBox="0 0 20 20" fill="none">
    <path d="M4 10.5L8 14.5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ARROW_ICON = (
  <svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const CALCULATOR_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2.5"/>
    <path d="M8 6h8"/>
    <path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/>
  </svg>
);

// The "Available models" row of the plan comparison, grouped by how each model
// is tracked. A provider can be in both groups. Free has no API access.
const COMPARE_MODELS = {
  web: [
    { logo: 'chatgpt-com-logo.png', label: 'ChatGPT' },
    { logo: 'gemini-logo.png', label: 'Gemini' },
    { logo: 'google-com-logo.png', label: 'AI Mode' },
    { logo: 'google-com-logo.png', label: 'AI Overviews' },
    { logo: 'perplexity-ai-logo.png', label: 'Perplexity' },
    { logo: 'claudeai-com-logo.png', label: 'Claude' },
    { logo: 'grok-com-logo.png', label: 'Grok' },
  ],
  api: [
    { logo: 'chatgpt-com-logo.png', label: 'ChatGPT' },
    { logo: 'gemini-logo.png', label: 'Gemini' },
    { logo: 'claudeai-com-logo.png', label: 'Claude' },
    { logo: 'mistral-ai-logo.png', label: 'Mistral' },
    { logo: 'grok-com-logo.png', label: 'Grok' },
  ],
};

// One line of a plan card. Lines with a tooltip show it on hover and on
// keyboard focus; "Everything in X" lines have none.
function PlanFeature({ text, tooltip }) {
  return (
    <li>
      {CHECK_ICON}
      {tooltip ? (
        <span className="pricing-feature-info-wrap" tabIndex={0}>
          {text}
          <span className="pricing-feature-info-tooltip" role="tooltip">{tooltip}</span>
        </span>
      ) : <span>{text}</span>}
    </li>
  );
}

function ModelList({ models }) {
  return (
    <ul className="pr-model-list">
      {models.map((m) => (
        <li key={m.label}>
          <img src={`${import.meta.env.BASE_URL}${m.logo}`} alt={m.label} aria-hidden="true" width="17" height="17" loading="lazy" />
          {m.label}
        </li>
      ))}
    </ul>
  );
}

// The AI models a prompt can be tracked on, with what one tracked prompt
// costs per check in credits: the app's model picker, web interface, as of
// 23 Nov 2026 (Claude 2 credits, the others 1). As in the app, a project
// starts on ChatGPT + Gemini and tracks 2 to 4 models.
const ESTIMATE_MODELS = [
  { id: 'chatgpt', label: 'ChatGPT', logo: 'chatgpt-com-logo.png', credits: 1 },
  { id: 'gemini', label: 'Gemini', logo: 'gemini-logo.png', credits: 1 },
  { id: 'claude', label: 'Claude', logo: 'claudeai-com-logo.png', credits: 2 },
  { id: 'ai-mode', label: 'Google AI Mode', logo: 'google-com-logo.png', credits: 1 },
  { id: 'ai-overview', label: 'Google AI Overview', logo: 'google-com-logo.png', credits: 1 },
  { id: 'grok', label: 'Grok', logo: 'grok-com-logo.png', credits: 1 },
  { id: 'perplexity', label: 'Perplexity', logo: 'perplexity-ai-logo.png', credits: 1 },
];
const ESTIMATE_DEFAULT_MODELS = ['chatgpt', 'gemini'];
const ESTIMATE_MODELS_MIN = 2;
const ESTIMATE_MODELS_MAX = 4;
// Prompts tracked per product and trading zone, fixed, not asked (Florian:
// visitors shouldn't have to reason about prompts; brands, products and
// trading zones are what they know). Paid plans allow up to 20, so a line
// under the result says more prompts use more credits.
const PROMPTS_PER_PRODUCT = 10;

// "From your website" estimate: on/off. It needs the backend's public credit
// estimate (poliris-backend PR #1203), which is not on the production backend
// yet; until it is, the option would only say "not available". While false,
// the calculator opens on the manual estimate, the Website / Manual switch is
// hidden, and nothing is sent to the backend. All the website code stays: set
// this back to true once PR #1203 is deployed to production.
const WEBSITE_ESTIMATE_ENABLED = false;

// Runs/month derived the same way the app converts a refresh interval to a
// monthly cadence (30-day month ÷ refresh_interval_days — see
// REFRESH_OPTIONS in product-settings/constants.ts: Daily=1, Weekly=7).
const CALC_CADENCE_DAYS = { daily: 1, weekly: 7 };
const CALC_METER_MAX = 3000; // Pro's monthly allotment — the meter's right edge

// The website estimate runs the first onboarding steps on the backend (a
// minute or two). Polled at this pace, given up after CALC_POLL_LIMIT_MS.
const CALC_POLL_MS = 3000;
const CALC_POLL_LIMIT_MS = 6 * 60 * 1000;

const CALC_ICON_SOLO = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>
);
const CALC_ICON_TEAM = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.6"/><path d="M3 20c0-3.3 2.7-5.8 6-5.8s6 2.5 6 5.8"/><path d="M15.5 14.6c2.6.4 4.5 2.5 4.5 5.4"/></svg>
);
const CALC_ICON_AGENCY = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="10" width="7" height="11"/><rect x="12" y="4" width="9" height="17"/><path d="M6 14h1M6 17h1M15 8h3M15 11h3M15 14h3"/></svg>
);
const CALC_ICON_SLIDERS = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>
);
const CALC_ICON_GLOBE = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);

// Quick-start presets for the manual estimate — clicking one seeds the three
// counts at once. Labels come from the calculator's locale slice.
const calcPresets = (c) => [
  { id: 'solo', icon: CALC_ICON_SOLO, label: c.presetSoloLabel, brands: 1, products: 1, zones: 1 },
  { id: 'team', icon: CALC_ICON_TEAM, label: c.presetTeamLabel, brands: 1, products: 3, zones: 2 },
  { id: 'agency', icon: CALC_ICON_AGENCY, label: c.presetAgencyLabel, brands: 5, products: 2, zones: 2 },
];

// Animates a number to `value` (ease-out, ~0.7s), from 0 when it first
// appears and from the previous value after that. Reduced motion: no count.
function useCountUp(value, duration = 700) {
  const [shown, setShown] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const from = fromRef.current;
    let raf;
    if (reduce || from === value) {
      raf = requestAnimationFrame(() => { fromRef.current = value; setShown(value); });
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const v = Math.round(from + (value - from) * (1 - (1 - t) ** 3));
      fromRef.current = v;
      setShown(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return shown;
}

function CountUp({ value, locale }) {
  return useCountUp(value).toLocaleString(locale);
}

// A trading zone as the backend names it ("in Japan", "en France", "in the
// United States") reads better without the leading preposition in a list.
const zoneName = (label) => String(label || '').replace(/^(in|en|au|aux|à|dans)\s+/i, '').replace(/^the\s+/i, '');

// One count of the manual estimate: its label over a small − n + control.
function CalcCounter({ label, value, onChange, min = 1, max = 50 }) {
  return (
    <div className="pcalc-counter">
      <span className="pcalc-counter-label">{label}</span>
      <div className="pcalc-counter-ctl">
        <button type="button" aria-label={`${label} −`} onClick={() => onChange(Math.max(min, value - 1))}>−</button>
        <span className="pcalc-counter-value">{value}</span>
        <button type="button" aria-label={`${label} +`} onClick={() => onChange(Math.min(max, value + 1))}>+</button>
      </div>
    </div>
  );
}

// The estimator. Two ways in, as the product sees it: what makes the price
// is how many products are tracked and in how many trading zones.
// - From a website: the backend runs the first onboarding steps and returns
//   the brands, products and zones it finds (limited per visitor and
//   logged on the backend, see api/credit-estimate.js).
// - Manually: brands × products per brand × trading zones per product.
// Then credits/month = product-zone pairs × 10 prompts × the credits of the
// default models × checks per month, and the cheapest plan that covers it
// is recommended.
function CreditCalculator({ c, plans, agencyLabel, onRecommend, lang }) {
  const presets = calcPresets(c);
  const [mode, setMode] = useState(WEBSITE_ESTIMATE_ENABLED ? 'website' : 'manual');
  const [brands, setBrands] = useState(presets[0].brands);
  const [products, setProducts] = useState(presets[0].products);
  const [zones, setZones] = useState(presets[0].zones);
  const [activePreset, setActivePreset] = useState(presets[0].id);
  const [cadence, setCadence] = useState('weekly');
  const [customRuns, setCustomRuns] = useState(8);

  // Website estimate state: idle → running → done | error.
  const [website, setWebsite] = useState('');
  const [siteStatus, setSiteStatus] = useState('idle');
  const [siteResult, setSiteResult] = useState(null);
  const [siteError, setSiteError] = useState('');
  // The backend's last reported step ({ step, percent, done, total }), and the
  // bar's shown percent, which eases on between reports so it never sits
  // still through the long first step.
  const [progress, setProgress] = useState(null);
  const [shownPct, setShownPct] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [modelIds, setModelIds] = useState(ESTIMATE_DEFAULT_MODELS);
  // 2 to 4 models, as in the app: below 2 a model can't be removed, at 4 no
  // other can be added.
  const toggleModel = (id) => setModelIds((ids) => {
    if (ids.includes(id)) return ids.length > ESTIMATE_MODELS_MIN ? ids.filter((x) => x !== id) : ids;
    return ids.length < ESTIMATE_MODELS_MAX ? [...ids, id] : ids;
  });
  const chosenModels = ESTIMATE_MODELS.filter((m) => modelIds.includes(m.id));
  const creditsPerPrompt = chosenModels.reduce((sum, m) => sum + m.credits, 0);
  const [turnstileToken, setTurnstileToken] = useState('');
  const widgetRef = useRef(null);
  const widgetIdRef = useRef(null);
  const pollRef = useRef(null);
  // Company search under the field, the same as the landing page's website
  // field (Hero.jsx): typing "asics" offers asics.com, asics.com.br, ...
  // A pick fills the field and closes the list until the next real edit.
  const [siteFocused, setSiteFocused] = useState(false);
  const [suggestionsSuppressed, setSuggestionsSuppressed] = useState(false);
  const suggestions = useDomainSuggestions(website, mode === 'website' && !suggestionsSuppressed);
  const suggestionsOpen = siteFocused && !suggestionsSuppressed && siteStatus !== 'running' && suggestions.length > 0;

  // The bot check is only needed for the website estimate; it runs as soon
  // as that option is on screen, invisibly unless Cloudflare asks for more.
  useEffect(() => {
    if (mode !== 'website' || !TURNSTILE_SITE_KEY) return undefined;
    let cancelled = false;
    loadTurnstileScript().then(() => {
      if (cancelled || !widgetRef.current || widgetIdRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        size: 'flexible',
        appearance: 'interaction-only',
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      });
    }).catch(() => {});
    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
      setTurnstileToken('');
    };
  }, [mode]);

  useEffect(() => () => window.clearTimeout(pollRef.current), []);

  useEffect(() => {
    if (siteStatus !== 'running') return undefined;
    const timer = window.setInterval(() => {
      setShownPct((shown) => {
        const p = progress || { step: 'reading', percent: 2 };
        // How far the bar may drift before the next report: to just short of
        // where the next step starts (reading 45, checking 55), or one
        // product's share further while zones come in.
        const cap = p.step === 'reading' ? 42 : p.step === 'checking' ? 53
          : Math.min(97, p.percent + (45 / Math.max(1, p.total || 1)) - 2);
        const next = Math.max(shown, p.percent);
        return next >= cap ? next : Math.min(cap, next + (cap - next) * 0.06 + 0.15);
      });
    }, 300);
    return () => window.clearInterval(timer);
  }, [siteStatus, progress]);


  const failSite = (message) => {
    setSiteStatus('error');
    setSiteError(message);
  };

  const startSiteEstimate = async (e) => {
    e.preventDefault();
    const url = website.trim();
    if (!url) return;
    if (TURNSTILE_SITE_KEY && !turnstileToken) { failSite(c.websiteVerifying); return; }
    window.clearTimeout(pollRef.current);
    setSiteStatus('running');
    setSiteError('');
    setSiteResult(null);
    setProgress(null);
    setShownPct(2);
    setDetailsOpen(false);
    trackEvent('credit_estimate_started', { source: 'website' });
    try {
      const res = await fetch('/api/credit-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website: /^https?:\/\//i.test(url) ? url : `https://${url}`, language: lang, turnstile_token: turnstileToken }),
      });
      const data = await res.json().catch(() => ({}));
      // A token is single-use: get a fresh one for the next request.
      if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current);
      setTurnstileToken('');
      if (res.status === 429) { failSite(c.websiteLimit); return; }
      // Not found or a server error: the estimate service itself is not
      // there (not deployed, backend down), which is not the website's fault.
      if (res.status === 404 || res.status >= 500) { failSite(c.websiteUnavailable); return; }
      if (!res.ok || !data.estimate_id) { failSite(c.websiteError); return; }
      const startedAt = Date.now();
      const poll = async () => {
        if (Date.now() - startedAt > CALC_POLL_LIMIT_MS) { failSite(c.websiteError); return; }
        try {
          const r = await fetch(`/api/credit-estimate?id=${encodeURIComponent(data.estimate_id)}`);
          const s = await r.json().catch(() => ({}));
          if (s.status === 'done' && s.result?.totals) {
            setShownPct(100);
            setDetailsOpen(true);
            setSiteResult(s.result);
            setSiteStatus('done');
            trackEvent('credit_estimate_done', { products: s.result.totals.products });
            return;
          }
          if (s.status === 'failed' || r.status === 404) { failSite(c.websiteError); return; }
          if (s.progress?.step) setProgress(s.progress);
        } catch { /* a dropped poll: try again on the next tick */ }
        pollRef.current = window.setTimeout(poll, CALC_POLL_MS);
      };
      pollRef.current = window.setTimeout(poll, CALC_POLL_MS);
    } catch {
      failSite(c.websiteUnavailable);
    }
  };

  // The website result, carried into the manual counts so it can be
  // adjusted: brands as found, then the products and zones per brand and
  // per product rounded to the nearest whole number.
  const adjustSiteResult = () => {
    const t = siteResult.totals;
    const b = Math.max(1, t.brands);
    setBrands(b);
    setProducts(Math.max(1, Math.round(t.products / b)));
    setZones(Math.max(1, Math.round(t.product_zones / Math.max(1, t.products))));
    setActivePreset(null);
    setMode('manual');
  };

  const applyPreset = (preset) => {
    setBrands(preset.brands);
    setProducts(preset.products);
    setZones(preset.zones);
    setActivePreset(preset.id);
    setMode('manual');
  };

  const runsPerMonth = cadence === 'custom' ? customRuns : Number((30 / CALC_CADENCE_DAYS[cadence]).toFixed(1));
  const fromSite = mode === 'website' && siteStatus === 'done' && siteResult;
  // Each product is tracked once in each of its trading zones.
  const productZones = fromSite ? siteResult.totals.product_zones : brands * products * zones;
  const estimated = Math.round(productZones * PROMPTS_PER_PRODUCT * creditsPerPrompt * runsPerMonth);
  const showResult = mode === 'manual' || fromSite;

  let recommendedTier = 'agency';
  if (estimated <= 300) recommendedTier = 'starter';
  else if (estimated <= 1500) recommendedTier = 'growth';
  else if (estimated <= 3000) recommendedTier = 'pro';
  const recommendedPlan = plans.find((pl) => pl.tier === recommendedTier);
  // Agency has no fixed monthly allotment (custom/unlimited), so there's
  // nothing to subtract the estimate from — spareCredits stays null.
  const planCredits = recommendedPlan?.monthlyCredits ? Number(recommendedPlan.monthlyCredits.replace(/,/g, '')) : null;
  const spareCredits = planCredits !== null ? Math.max(0, planCredits - estimated) : null;

  const numLocale = lang === 'fr' ? 'fr-FR' : 'en-US';
  // Fills {placeholders}. With React nodes among the values (a counting
  // number), it returns the pieces as an array instead of a string.
  const fill = (text, values) => {
    const src = text || '';
    if (!Object.values(values).some((v) => typeof v === 'object')) {
      return Object.entries(values).reduce((s, [k, v]) => s.replace(`{${k}}`, v), src);
    }
    return src.split(/(\{\w+\})/).map((part) => {
      const key = part.match(/^\{(\w+)\}$/)?.[1];
      return key && key in values ? values[key] : part;
    });
  };
  const stepLabel = !progress || progress.step === 'reading' ? c.stepReading
    : progress.step === 'checking' ? c.stepChecking
      : fill(c.stepZones, { done: progress.done ?? 0, total: progress.total ?? 0 });

  return (
    <div className="pricing-calc-wrap">
      <div className="pricing-calc-card pcalc">

        <div className="pcalc-head">
          <div className="pcalc-head-copy">
            <h2>{c.title}</h2>
            <p>{c.subtitle}</p>
          </div>
          {/* Only one way in while the website estimate is off: no switch. */}
          {WEBSITE_ESTIMATE_ENABLED && (
            <div className="pcalc-tabs" role="tablist">
              <button type="button" role="tab" aria-selected={mode === 'website'} className={mode === 'website' ? 'active' : ''} onClick={() => setMode('website')}>{CALC_ICON_GLOBE}{c.modeWebsite}</button>
              <button type="button" role="tab" aria-selected={mode === 'manual'} className={mode === 'manual' ? 'active' : ''} onClick={() => setMode('manual')}>{CALC_ICON_SLIDERS}{c.modeManual}</button>
            </div>
          )}
        </div>

        <div className="pcalc-body">
          {mode === 'website' ? (
            <div className="pcalc-site">
              <form className="pricing-calc-site" onSubmit={startSiteEstimate}>
                <label htmlFor="calc-website" className="pcalc-sr">{c.websiteLabel}</label>
                <div className="pricing-calc-site-row">
                  <span className="pricing-calc-site-icon">{CALC_ICON_GLOBE}</span>
                  <div className="pricing-calc-site-input">
                    <input
                      id="calc-website"
                      type="text"
                      inputMode="url"
                      autoComplete="off"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      role="combobox"
                      aria-autocomplete="list"
                      aria-expanded={suggestionsOpen}
                      placeholder={c.websitePlaceholder}
                      value={website}
                      onChange={(e) => { setWebsite(e.target.value); setSuggestionsSuppressed(false); }}
                      onFocus={() => setSiteFocused(true)}
                      onBlur={() => setSiteFocused(false)}
                      disabled={siteStatus === 'running'}
                    />
                    {suggestionsOpen && (
                      <ul className="hero-website-form__suggestions" role="listbox">
                        {suggestions.map((s) => (
                          <li key={s.domain} role="option" aria-selected={false}>
                            <button
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => { setWebsite(s.domain); setSuggestionsSuppressed(true); setSiteFocused(false); }}
                              className="hero-website-form__suggestion"
                            >
                              <img
                                src={s.logoUrl || `https://www.google.com/s2/favicons?domain=${encodeURIComponent(s.domain)}&sz=64`}
                                alt=""
                                aria-hidden="true"
                                width="28"
                                height="28"
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
                  <button type="submit" className="pricing-calc-site-btn" disabled={siteStatus === 'running' || !website.trim()}>
                    {siteStatus === 'running' ? c.websiteRunningCta : c.websiteCta}
                  </button>
                </div>
                <div ref={widgetRef} className="pricing-calc-turnstile" />
              </form>

              {siteStatus === 'running' && (
                <div className="pcalc-result is-loading">
                  {/* Progress of the run, step by step, as the backend reports it. */}
                  <div className="pcalc-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(shownPct)} aria-label={stepLabel}>
                    <div className="pcalc-progress-top">
                      <span>{stepLabel}</span>
                      <span>{Math.round(shownPct)}%</span>
                    </div>
                    <div className="pcalc-progress-track"><div className="pcalc-progress-fill" style={{ width: `${shownPct}%` }} /></div>
                  </div>
                  <div className="pcalc-result-line" aria-hidden="true">
                    <span className="pricing-calc-skel pcalc-skel-brand" />
                    <span className="pricing-calc-skel pcalc-skel-counts" />
                  </div>
                </div>
              )}

              {siteStatus === 'error' && (
                <p className="pricing-calc-site-status is-error" role="alert">{siteError} <button type="button" className="pricing-calc-link" onClick={() => setMode('manual')}>{c.websiteUseManual}</button></p>
              )}

              {fromSite && (() => {
                const t = siteResult.totals;
                const brandNames = siteResult.brands.map((b) => b.name).join(', ');
                return (
                  <div className="pcalc-result is-in">
                    <div className="pcalc-result-line">
                      <span className="pcalc-result-brand">{brandNames}</span>
                      <span className="pcalc-result-counts">
                        {fill(c.resultLine, {
                          products: <CountUp key="p" value={t.products} locale={numLocale} />,
                          pairs: <CountUp key="z" value={t.product_zones} locale={numLocale} />,
                        })}
                      </span>
                      <button type="button" className="pcalc-details-btn" aria-expanded={detailsOpen} onClick={() => setDetailsOpen((o) => !o)}>
                        {detailsOpen ? c.hideDetails : c.showDetails}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                      </button>
                    </div>
                    {detailsOpen && (
                      <ul className="pcalc-details">
                        {siteResult.brands.flatMap((b) => b.products.map((p) => ({ ...p, brand: b.name }))).map((p, i) => {
                          const names = (p.zones || []).map(zoneName).filter(Boolean);
                          const count = Math.max(1, names.length);
                          const more = names.length > 3 ? ` ${fill(c.zonesMore, { n: names.length - 3 })}` : '';
                          return (
                            <li key={`${p.brand}-${p.name}`} style={{ '--i': i }}>
                              <span className="pcalc-details-name">{p.name}</span>
                              <span className="pcalc-details-zones">{names.length ? names.slice(0, 3).join(', ') + more : c.zoneUnknown}</span>
                              <span className="pcalc-details-count">{count}</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {t.products > t.products_shown && (
                      <p className="pcalc-note">{fill(c.websiteMore, { n: t.products - t.products_shown })}</p>
                    )}
                    <button type="button" className="pricing-calc-link" onClick={adjustSiteResult}>{c.websiteAdjust}</button>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="pcalc-manual">
              <div className="pcalc-presets">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={activePreset === preset.id ? 'active' : ''}
                    aria-pressed={activePreset === preset.id}
                    onClick={() => applyPreset(preset)}
                  >
                    {preset.icon}{preset.label}
                  </button>
                ))}
              </div>
              <div className="pcalc-counters">
                <CalcCounter label={c.brandsLabel} value={brands} onChange={(v) => { setBrands(v); setActivePreset(null); }} />
                <span className="pcalc-times" aria-hidden="true">×</span>
                <CalcCounter label={c.productsLabel} value={products} onChange={(v) => { setProducts(v); setActivePreset(null); }} />
                <span className="pcalc-times" aria-hidden="true">×</span>
                <CalcCounter label={c.zonesLabel} value={zones} onChange={(v) => { setZones(v); setActivePreset(null); }} />
              </div>
            </div>
          )}

          <div className="pcalc-row">
            <span className="pcalc-row-label">{c.cadenceLabel}</span>
            <div className="pcalc-seg">
              {[['daily', c.cadenceDaily], ['weekly', c.cadenceWeekly], ['custom', c.cadenceCustom]].map(([key, label]) => (
                <button key={key} type="button" className={cadence === key ? 'active' : ''} aria-pressed={cadence === key} onClick={() => setCadence(key)}>{label}</button>
              ))}
            </div>
          </div>
          {cadence === 'custom' && (
            <div className="pcalc-row pcalc-row--slider">
              <label htmlFor="calc-runs" className="pcalc-row-label">{c.cadenceCustomLabel}</label>
              <input
                id="calc-runs"
                type="range"
                min="1"
                max="30"
                value={customRuns}
                onChange={(e) => setCustomRuns(Number(e.target.value))}
                className="pricing-calc-slider"
              />
              <span className="pricing-calc-value">{customRuns}</span>
            </div>
          )}

          {/* AI models: ChatGPT + Gemini by default, as a new project in the
              app; 2 to 4. Each model's credits (ESTIMATE_MODELS) still count:
              only their total per prompt is shown, on the right. */}
          <div className="pcalc-models">
            <div className="pcalc-row">
              <span className="pcalc-row-label">{c.modelsLabel}</span>
              <span className="pcalc-models-sum">{fill(c.modelsSum, { n: chosenModels.length, credits: creditsPerPrompt })}</span>
            </div>
            <div className="pcalc-model-chips">
              {ESTIMATE_MODELS.map((m) => {
                const on = modelIds.includes(m.id);
                const locked = !on && modelIds.length >= ESTIMATE_MODELS_MAX;
                return (
                  <button
                    key={m.id}
                    type="button"
                    className={`pcalc-model${on ? ' active' : ''}`}
                    aria-pressed={on}
                    disabled={locked}
                    onClick={() => toggleModel(m.id)}
                  >
                    <img src={`${import.meta.env.BASE_URL}${m.logo}`} alt="" aria-hidden="true" width="16" height="16" />
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="pcalc-note">
            {c.assumption}
          </p>
        </div>

        <div className={`pricing-calc-summary${showResult ? '' : ' is-waiting'}`}>
          <div className="pricing-calc-summary-stats">
            {showResult && (
              <div className="pricing-calc-summary-number">
                <CountUp value={estimated} locale={numLocale} /><span>{c.resultUnit}</span>
              </div>
            )}
            {!showResult && siteStatus === 'running' && (
              <div className="pricing-calc-summary-number" aria-hidden="true">
                <span className="pricing-calc-skel pricing-calc-skel--light" />
              </div>
            )}
            <p className="pricing-calc-summary-formula">
              {showResult
                ? fill(c.formulaV2, {
                  pairs: productZones,
                  pairsWord: productZones === 1 ? c.pairWord : c.pairsWord,
                  prompts: PROMPTS_PER_PRODUCT,
                  credits: creditsPerPrompt,
                  runs: runsPerMonth.toLocaleString(numLocale),
                })
                : siteStatus === 'running' ? c.websiteRunningShort : c.websiteWaiting}
              {/* What the estimate assumes, on hover or focus of the ⓘ, so
                  the result stays two lines. */}
              {showResult && (
                <span className="pricing-calc-basis" tabIndex={0} aria-label={fill(c.promptsBasis, { prompts: PROMPTS_PER_PRODUCT })}>
                  {INFO_ICON}
                  <span className="pricing-calc-basis-tip" role="tooltip">{fill(c.promptsBasis, { prompts: PROMPTS_PER_PRODUCT })}</span>
                </span>
              )}
            </p>
          </div>

          {showResult && (
            <>
              <div className="pricing-calc-summary-fit">
                <div className="pricing-calc-summary-fit-head">
                  <span className="pricing-calc-summary-fit-label">
                    {c.fitsPre} {recommendedTier === 'agency' ? agencyLabel : recommendedPlan.name}
                  </span>
                  {spareCredits !== null && (
                    <span className="pricing-calc-summary-spare">{c.spareCredits.replace('{n}', spareCredits.toLocaleString(numLocale))}</span>
                  )}
                </div>
                <div className="pricing-calc-meter-track">
                  <div className="pricing-calc-meter-fill" style={{ width: `${Math.min((estimated / CALC_METER_MAX) * 100, 100)}%` }} />
                  {[300, 1500].map((mark) => (
                    <div key={mark} className="pricing-calc-meter-mark" style={{ left: `${(mark / CALC_METER_MAX) * 100}%` }} />
                  ))}
                </div>
              </div>

              <button type="button" className="pricing-calc-cta" onClick={() => onRecommend(recommendedTier)}>
                {recommendedTier === 'agency' ? c.recommendedCtaAgency : c.recommendedCtaPlan.replace('{plan}', recommendedPlan.name)}
                {ARROW_ICON}
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

// The calculator starts collapsed behind a teaser card, above `children`
// (the agency strip) — click
// it to reveal the full CreditCalculator in place (same conditional-render
// accordion pattern as CompareSection above, just gating a much bigger
// block so the pricing page isn't dominated by it by default).
// Opens and closes its content smoothly: the space slides open to the
// content's measured height while the content fades and lifts in, then the
// height is released (the calculator grows as results come in), and the
// reverse on close, unmounting at the end. Reduced motion: no animation.
const REVEAL_MS = 420;
function SmoothReveal({ open, children }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(open);
  // Mount as soon as it opens (adjusting state during render, not in an
  // effect, so the first frame is already the collapsed one).
  if (open && !mounted) setMounted(true);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let timer;
    if (open) {
      if (reduce) { el.style.height = 'auto'; el.classList.add('is-open'); return undefined; }
      el.style.height = '0px';
      el.classList.remove('is-open');
      void el.offsetHeight; // start from 0 before going to the full height
      el.style.height = `${el.scrollHeight}px`;
      el.classList.add('is-open');
      timer = window.setTimeout(() => { el.style.height = 'auto'; }, REVEAL_MS);
    } else if (mounted) {
      if (reduce) {
        const frame = requestAnimationFrame(() => setMounted(false));
        return () => cancelAnimationFrame(frame);
      }
      el.style.height = `${el.scrollHeight}px`;
      void el.offsetHeight;
      el.style.height = '0px';
      el.classList.remove('is-open');
      timer = window.setTimeout(() => setMounted(false), REVEAL_MS);
    }
    return () => window.clearTimeout(timer);
  }, [open, mounted]);

  if (!mounted) return null;
  return (
    <div ref={ref} className="pcalc-reveal">
      <div className="pcalc-reveal-inner">{children}</div>
    </div>
  );
}

function CreditCalculatorPanel({ c, plans, agencyLabel, onRecommend, lang, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="pricing-calc-panel pr-brand-panel">
      <div className="pr-brand-links">
      <button
        type="button"
        className={`pricing-calc-banner${open ? ' open' : ''}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="pricing-calc-banner-icon">{CALCULATOR_ICON}</span>
        <span className="pricing-calc-banner-text">
          <span className="pricing-calc-banner-title">{c.bannerTitle}</span>
          <span className="pricing-calc-banner-sub">{c.bannerSub}</span>
        </span>
        <span className="pricing-calc-banner-cta">
          {open ? c.bannerCtaClose : c.bannerCtaOpen} {ARROW_ICON}
        </span>
      </button>
      {/* The calculator opens right under the card that opens it; the
          agency card (children) follows it. */}
      <SmoothReveal open={open}>
        <CreditCalculator c={c} plans={plans} agencyLabel={agencyLabel} onRecommend={onRecommend} lang={lang} />
      </SmoothReveal>
      {children}
      </div>
    </div>
  );
}

// Same measured-height accordion technique as FaqItem in FaqsPage.jsx —
// always renders the answer and animates the wrapper's real pixel height
// (via scrollHeight), instead of a CSS-only trick that can silently fail
// to collapse (grid-template-rows: 0fr needs the child's automatic min
// size to hit 0, which doesn't happen reliably) or animate proportionally
// to a size the content never actually reaches (a fixed max-height cap).
function PricingFaqItem({ item, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(isOpen ? contentRef.current.scrollHeight : 0);
  }, [isOpen]);

  return (
    <div className={`pricing-faq-item${isOpen ? ' open' : ''}`}>
      <button type="button" className="pricing-faq-q" aria-expanded={isOpen} onClick={onToggle}>
        <span>{item.q}</span>
        <span className="pricing-faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className="pricing-faq-a-wrap" style={{ height }}>
        <p ref={contentRef} className="pricing-faq-a">{item.a}</p>
      </div>
    </div>
  );
}

// Numeric/structural plan data — not translatable, paired by index with
// the copy in locales/*.js `pricing.plans`. `tier` is the backend's
// billing_pricing_catalog.plan_tier slug — the free tier isn't purchasable
// through Stripe checkout (see app/api/v2/public_checkout.py), so its CTA
// routes straight to the app instead of opening the checkout modal.
// firstMonthCredits is always double monthlyCredits (a one-time welcome
// bonus matching the base allocation) — kept as separate fields so the
// badge can spell out "300 + 300 = 600" instead of just the total.
const PLAN_META = [
  { tier: 'free',    monthly: 0,   annual: 0,   eurMonthly: 0,   eurAnnual: 0,     popular: false },
  { tier: 'starter', monthly: 29,  annual: 23,  eurMonthly: 27,  eurAnnual: 21,   popular: false, monthlyCredits: '300',   firstMonthCredits: '600' },
  { tier: 'growth',  monthly: 99,  annual: 79,  eurMonthly: 92,  eurAnnual: 73,   popular: true,  monthlyCredits: '1,500', firstMonthCredits: '3,000' },
  { tier: 'pro',     monthly: 189, annual: 151, eurMonthly: 175, eurAnnual: 140, popular: false, monthlyCredits: '3,000', firstMonthCredits: '6,000' },
];

// currency/annual now flow through to checkout (see PlanCheckoutModal) —
// the backend has real Stripe prices per (plan_tier, currency,
// billing_interval), see app/api/v2/public_checkout.py.
const CURRENCIES = { usd: { symbol: '$', label: 'USD', code: 'USD' }, eur: { symbol: '€', label: 'EUR', code: 'EUR' } };

/* ── Agency pricing ────────────────────────────────────────────────
   Monthly prices, excl. tax, per currency, exactly as agencies are billed
   (agency billing rules of 5 Nov 2026): the Agency pack, then one plan per
   client (Client S / M / L = Starter / Growth / Pro at 20% below the direct
   price). Same amounts as the app's Stripe prices
   (poliris-backend scripts/create_agency_stripe_prices.py). Client XL
   is quoted, so it has no price here. The names and copy live in
   pricing.agencyView in src/locales/en.js and fr.js.

   Agency plans are not self-serve: there is no checkout here, which is
   why nothing feeds PlanCheckoutModal. They are opened by the partner
   team, so the only action is booking a call. */
const AGENCY_PRICES = {
  pack:    { usd: 69,     eur: 64 },
  clientS: { usd: 23.2,   eur: 21.6 },
  clientM: { usd: 79.2,   eur: 73.6 },
  clientL: { usd: 151.2,  eur: 140 },
};
const AGENCY_TIERS = ['clientS', 'clientM', 'clientL'];
// Same booking link the hero and the CTA band use.
const BOOKING_URL = 'https://cal.com/team/poliris/discovery-call';

const AUDIENCE_ICONS = {
  brands: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>
  ),
  agencies: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
};

// One icon per pricing.agencyView.includes item, in the same order.
const PACK_ICONS = [
  <svg key="label" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 10 5-10 5L2 7l10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>,
  <svg key="seats" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="space" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  <svg key="audits" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  <svg key="margin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/></svg>,
  <svg key="partner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>,
];

const GIFT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
);

// One icon per pricing.agencyView.start step, in order: book a call, set up
// the space, first audits together, roll out. Drawn at the landing page's
// How it works size (44px in a 64px slot).
const START_ICONS = [
  <svg key="call" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M8 2.5v4M16 2.5v4M3 9.5h18"/><path d="m9 15 2 2 4-4"/></svg>,
  <svg key="setup" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="3.5" width="19" height="14" rx="2"/><path d="M8 21h8M12 17.5V21"/><path d="M6 7.5h5M6 10.5h3"/><circle cx="16" cy="10" r="2.5"/></svg>,
  <svg key="audit" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m20.5 20.5-5.4-5.4"/><path d="m7.8 10.6 1.9 1.9 3.4-3.4"/></svg>,
  <svg key="rollout" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
];

const INFO_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
);


// A price in both currencies, stacked in the same spot: switching currency
// slides the old one up and out while the new one rises in from below
// (and back down the other way). Only the price on screen is read out.
function CurrencyRoll({ values, currency }) {
  return (
    <span className={`pr-roll${currency === 'eur' ? ' is-eur' : ''}`}>
      <span className="pr-roll-usd" aria-hidden={currency !== 'usd'}>{values.usd}</span>
      <span className="pr-roll-eur" aria-hidden={currency !== 'eur'}>{values.eur}</span>
    </span>
  );
}

// A brand plan's price: the currency roll from above inside a second roll for
// monthly/annual, so either switch moves the number the same way. `.is-eur`
// only means "the second value is showing" at the outer level.
function PlanPrice({ plan, annual, currency }) {
  const roll = (usd, eur) => <CurrencyRoll currency={currency} values={{ usd: `$${usd}`, eur: `€${eur}` }} />;
  return (
    <span className={`pr-roll${annual ? ' is-eur' : ''}`}>
      <span className="pr-roll-usd" aria-hidden={annual}>{roll(plan.monthly, plan.eurMonthly)}</span>
      <span className="pr-roll-eur" aria-hidden={!annual}>{roll(plan.annual, plan.eurAnnual)}</span>
    </span>
  );
}

export default function PricingPage() {
  const { lang, t } = useLang();
  const [annual, setAnnual] = useState(false);
  const [currency, setCurrency] = useState('usd');
  // 'brands' is the default view; 'agencies' swaps the plans for the
  // Agency Pack and its per-client tiers. #agencies opens it directly.
  const [audience, setAudience] = useState('brands');
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [currentTier, setCurrentTier] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [highlightTier, setHighlightTier] = useState(null);
  const highlightTimeoutRef = useRef(null);
  const p = t('pricing');
  const av = p.agencyView;
  const bv = p.brandView;
  const agencyView = audience === 'agencies';
  const hero = agencyView ? av.hero : p.hero;

  // Scrolls to and briefly pulses the matching plan card (the calculator's
  // 'agency' tier means the Custom card) — used by the calculator's "Get {plan}" CTA so the
  // recommendation is a click, not just a label.
  const scrollToPlan = (tier) => {
    const el = document.getElementById(`pricing-card-${tier === 'agency' ? 'custom' : tier}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setHighlightTier(tier);
    window.clearTimeout(highlightTimeoutRef.current);
    highlightTimeoutRef.current = window.setTimeout(() => setHighlightTier(null), 2000);
  };

  // Read post-hydration, not as a lazy useState initializer — this page is
  // pre-rendered at build time with no `document`, so seeding real state
  // during the initial render would mismatch the static HTML (same
  // reasoning as Navbar.jsx's hasAccount state).
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setCurrentTier(currentPlanTierCookie());
    if (window.location.hash === '#agencies') { setAudience('agencies'); setOpenFaq(null); }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const switchAudience = (next) => {
    setAudience(next);
    setOpenFaq(next === 'brands' ? 0 : null);
    const url = `${window.location.pathname}${window.location.search}${next === 'agencies' ? '#agencies' : ''}`;
    window.history.replaceState(null, '', url);
  };

  const plans = bv.plans.map((plan, i) => ({ ...plan, ...PLAN_META[i] }));
  // The plan comparison keeps the wording and values of the earlier table, so
  // it reads straight from pricing.compare. Only the layout is new.
  const c = p.compare;
  const num = (n) => (lang === 'fr' ? n.replace(',', ' ') : n);
  // 1 credit = 1 AI model query, so a plan tracks up to its monthly credits.
  const upTo = (n) => (c.upTo ?? 'Up to {n}').replace('{n}', num(n));
  const compareRows = [
    { label: bv.compare.creditsLabel, values: [false, '300', num('1,500'), num('3,000'), c.custom] },
    { label: c.promptsTrackedLabel, sub: c.promptsTrackedSub, values: ['10', upTo('300'), upTo('1,500'), upTo('3,000'), c.custom] },
    { label: c.modelsLabel, sub: c.modelsSub, values: ['modelsWebOnly', 'models', 'models', 'models', 'models'] },
    { label: c.modelsCountLabel, values: ['2', c.anyCombination, c.anyCombination, c.anyCombination, c.anyCombination] },
    { label: c.projectsLabel, values: ['1', c.multipleCreditLimited, c.multipleCreditLimited, c.multipleCreditLimited, c.unlimited] },
    { label: c.zonesLabel, values: [c.zonesFree, c.multipleCreditLimited, c.multipleCreditLimited, c.multipleCreditLimited, c.unlimited] },
    { label: c.cadenceLabel, values: [c.daily, c.anyCadence, c.anyCadence, c.anyCadence, c.anyCadence] },
    { label: c.virtualTeamsLabel, values: [false, true, true, true, true] },
    // Slack community is a support channel too, so it is listed here rather
    // than in a row of its own. A list renders one channel per line.
    { label: c.supportChannelsLabel, values: [c.chatsOnly, [c.chatsEmail, c.slackLabel], [c.chatsEmail, c.slackLabel], [c.dedicated, c.slackLabel], [c.dedicatedManager, c.slackLabel]] },
  ];
  // The four columns live in the locale files (pricing.brandView.included.groups)
  // rather than being assembled from scattered label keys, so the copy can be
  // read and translated in one place.
  const includedGroups = bv.included.groups ?? [];

  const symbol = CURRENCIES[currency].symbol;
  const priceFor = (plan, isAnnual) => {
    if (currency === 'eur') return isAnnual ? plan.eurAnnual : plan.eurMonthly;
    return isAnnual ? plan.annual : plan.monthly;
  };
  // The displayed monthly-equivalent x12 — matches what checkout actually
  // charges once for annual billing (see the backend's *_annual_eq * 12
  // Stripe prices), not a separately-set number.
  const annualTotalFor = (plan) => priceFor(plan, true) * 12;

  // Agency prices are monthly only. Both currencies are rendered so
  // CurrencyRoll can slide from one to the other. Cents are shown when a
  // price has them ($23.20, 21,60 in French), never for whole prices ($69).
  const agencyAmount = (value) =>
    value.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
      maximumFractionDigits: 2,
    });
  const agencyRoll = (key) => (
    <CurrencyRoll
      currency={currency}
      values={{
        usd: `$${agencyAmount(AGENCY_PRICES[key].usd)}`,
        eur: `€${agencyAmount(AGENCY_PRICES[key].eur)}`,
      }}
    />
  );

  const handleSelectPlan = (plan) => {
    if (plan.tier === 'free') {
      window.location.assign(APP_URL);
      return;
    }
    // An existing account can't self-serve a brand-new anonymous checkout
    // (the backend rejects it — see app/api/v2/public_checkout.py's
    // duplicate-email check), so send them to their workspace's billing page
    // instead of the modal. The marketing site doesn't know their
    // workspaceId, so /billing is a workspace-agnostic redirect route (see
    // poliris-frontend's app/[locale]/billing/route.ts) that resolves it and
    // forwards to the real page.
    if (hasAccountCookie()) {
      window.location.assign(`${APP_URL}/${lang}/billing`);
      return;
    }
    setCheckoutPlan(plan);
  };

  return (
    <div className="pricing-page">
      <Seo
        page="pricing"
        schema={[
          // Prices from PLAN_META, names and questions from what the page shows
          // (the brands view): the schema can't drift from the page.
          { '@id': SOFTWARE_ID, offers: planOffers(lang, bv.plans, PLAN_META) },
          faqPageNode(lang, 'pricing', bv.faq),
        ]}
      />
      <Navbar />

      <div className="pricing-wrap">

        <div className="pricing-title-wrap">
          <h1 className="eyebrow">{p.hero.eyebrow}</h1>
        </div>

        {/* Title and lead follow the view: the brand copy from pricing.hero,
            the agency copy from pricing.agencyView.hero. */}
        <div className="pr-hero">
          <h2 className="pr-hero-title">{hero.titlePre} <span className="hl">{hero.titleHl}</span></h2>
          <p className="pr-hero-lead">{hero.lead}</p>
        </div>

        <div className="pr-audience-wrap">
          <div className={`pr-audience${agencyView ? ' is-agencies' : ''}`} role="tablist" aria-label={p.audience.label}>
            {['brands', 'agencies'].map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={audience === key}
                className={`pr-audience-tab${audience === key ? ' active' : ''}`}
                onClick={() => switchAudience(key)}
              >
                {AUDIENCE_ICONS[key]}
                {p.audience[key]}
              </button>
            ))}
          </div>
        </div>

        <div className={`pricing-toggle-wrap${agencyView ? ' is-agencies' : ''}`}>
          <div className="pricing-switcher-card">
            {/* Agency plans are monthly, so the agencies view only has the
                currency picker. */}
            {!agencyView && (<>
            <div className="pricing-billing-switch">
              <button type="button" className={`pricing-billing-label${!annual ? ' active' : ''}`} onClick={() => setAnnual(false)}>
                {p.billing.monthly}
              </button>
              <button
                type="button"
                role="switch"
                aria-checked={annual}
                aria-label={p.billing.annual}
                className={`pricing-switch${annual ? ' on' : ''}`}
                onClick={() => setAnnual(a => !a)}
              >
                <span className="pricing-switch__knob" />
              </button>
              <button type="button" className={`pricing-billing-label${annual ? ' active' : ''}`} onClick={() => setAnnual(true)}>
                {p.billing.annual}
              </button>
              <span className="pricing-save-badge">{p.billing.save}</span>
            </div>

            <div className="pricing-switcher-divider" />
            </>)}

            <div className="pricing-currency-switch">
              {Object.entries(CURRENCIES).map(([code, c]) => (
                <button
                  key={code}
                  type="button"
                  className={`pricing-currency-btn${currency === code ? ' active' : ''}`}
                  onClick={() => setCurrency(code)}
                >
                  {c.symbol} {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {!agencyView && (<>
        <div className="pr-brand-grid">
          {plans.map((plan) => {
            const isCurrentPlan = plan.tier === currentTier;
            return (
            <div
              key={plan.name}
              id={`pricing-card-${plan.tier}`}
              className={`pr-brand-card${plan.popular ? ' popular' : ''}${highlightTier === plan.tier ? ' calc-highlight' : ''}`}
            >
              {isCurrentPlan ? (
                <span className="pricing-badge-popular">{p.currentPlan}</span>
              ) : (
                plan.popular && <span className="pricing-badge-popular">{p.mostPopular}</span>
              )}
              <h2 className="pr-plan-name">{plan.name}</h2>
              <p className="pr-brand-desc">{plan.desc}</p>
              <p className="pr-plan-price">
                <span className="pr-plan-amount"><PlanPrice plan={plan} annual={annual} currency={currency} /></span>
                <span className="pr-plan-period">
                  {bv.perMonth}
                  {/* Under "/mo" on every paid card, so the cards stay level
                      however narrow they get. */}
                  {plan.tier !== 'free' && bv.exclTax && <span className="pr-plan-tax"> {bv.exclTax}</span>}
                </span>
              </p>
              <p className="pr-plan-billed">
                {annual && plan.tier !== 'free' && p.billing.billedAnnually.split('{amount}').map((part, i) => (
                  <span key={i}>
                    {i > 0 && (
                      <CurrencyRoll currency={currency} values={{ usd: `$${plan.annual * 12}`, eur: `€${plan.eurAnnual * 12}` }} />
                    )}
                    {part}
                  </span>
                ))}
              </p>
              <p className="pr-plan-credits">
                {plan.credits}
                {/* The first-month bonus as an offer tag, not a grey footnote. */}
                {plan.firstMonth && <span className="pr-plan-bonus">{GIFT_ICON}{plan.firstMonth}</span>}
              </p>
              <button type="button" className="pr-brand-cta" onClick={() => handleSelectPlan(plan)}>
                {isCurrentPlan ? p.currentPlanCta : plan.cta}
              </button>
              <ul className="pr-plan-features">
                {plan.features.map((f, j) => <PlanFeature key={f} text={f} tooltip={plan.tooltips[j]} />)}
              </ul>
            </div>
            );
          })}
          <div id="pricing-card-custom" className={`pr-brand-card custom${highlightTier === 'agency' ? ' calc-highlight' : ''}`}>
            <h2 className="pr-plan-name">{bv.custom.name}</h2>
            <p className="pr-brand-desc">{bv.custom.desc}</p>
            <p className="pr-plan-price">
              <span className={`pr-plan-amount${bv.custom.price.length > 6 ? ' is-long' : ''}`}>{bv.custom.price}</span>
            </p>
            <p className="pr-plan-billed" />
            <p className="pr-plan-credits">{bv.custom.credits}</p>
            <a href={`/${lang}/demo`} className="pr-brand-cta">{bv.custom.cta}</a>
            <ul className="pr-plan-features">
              {bv.custom.features.map((f, j) => <PlanFeature key={f} text={f} tooltip={bv.custom.tooltips[j]} />)}
            </ul>
          </div>
        </div>

        {/* ============ CREDIT CALCULATOR + AGENCY LINK ============ */}
        <CreditCalculatorPanel
          c={p.calculator}
          plans={plans}
          agencyLabel={bv.custom.name}
          onRecommend={scrollToPlan}
          lang={lang}
        >
          {/* Leads to the agencies view, starting from its top. */}
          <button
            type="button"
            className="pr-agency-link"
            onClick={() => { switchAudience('agencies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <span className="pr-agency-link-icon">{AUDIENCE_ICONS.agencies}</span>
            <span className="pr-agency-link-text">
              <span className="pr-agency-link-title">{p.agencyLink.title}</span>
              <span className="pr-agency-link-sub">{p.agencyLink.sub.split('{price}').map((part, i) => (
                <span key={i}>{i > 0 && agencyRoll('pack')}{part}</span>
              ))}</span>
            </span>
            <span className="pr-agency-link-cta">{p.agencyLink.cta} {ARROW_ICON}</span>
          </button>
        </CreditCalculatorPanel>

        {/* ============ PLAN COMPARISON ============ */}
        <section className="pr-section">
          <div className="pr-section-head">
            <h2 className="pr-h2">{bv.compare.title}</h2>
            <p className="pr-lead">{bv.compare.lead}</p>
          </div>
          <div className="pr-compare-card">
            <div className="pr-compare-scroll">
              <table className="pr-compare">
                <thead>
                  <tr>
                    <th scope="col">{bv.compare.head}</th>
                    {plans.map((plan) => (
                      <th key={plan.name} scope="col" className={plan.popular ? 'is-popular' : undefined}>
                        {plan.name}
                        <span className="pr-compare-price">
                          <PlanPrice plan={plan} annual={annual} currency={currency} />
                          {plan.tier !== 'free' && <small> {bv.perMonth}{bv.exclTax && ` ${bv.exclTax}`}</small>}
                        </span>
                      </th>
                    ))}
                    <th scope="col">
                      {bv.custom.name}
                      <span className="pr-compare-price">{bv.compare.onQuote}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">
                        {row.label}
                        {row.sub && <small>{row.sub}</small>}
                      </th>
                      {row.values.map((value, i) => (
                        <td key={i} className={plans[i]?.popular ? 'is-popular' : undefined}>
                          {(value === 'models' || value === 'modelsWebOnly') && (
                            <div className="pr-model-groups">
                              <div>
                                <p className="pr-model-group-label">{c.modelsWebLabel}</p>
                                <ModelList models={COMPARE_MODELS.web} />
                              </div>
                              <div>
                                <p className="pr-model-group-label">{c.modelsApiLabel}</p>
                                {value === 'models'
                                  ? <ModelList models={COMPARE_MODELS.api} />
                                  : <span role="img" aria-label={bv.compare.notIncluded} className="pr-compare-no" />}
                              </div>
                            </div>
                          )}
                          {value === true && <span role="img" aria-label={bv.compare.included}>{CHECK_ICON}</span>}
                          {value === false && <span role="img" aria-label={bv.compare.notIncluded} className="pr-compare-no" />}
                          {typeof value === 'string' && value !== 'models' && value !== 'modelsWebOnly' && value}
                          {Array.isArray(value) && value.map((line) => <span key={line} className="pr-compare-line">{line}</span>)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td aria-hidden="true" />
                    {plans.map((plan) => (
                      <td key={plan.name} className={plan.popular ? 'is-popular' : undefined}>
                        <button type="button" className={`pr-brand-cta pr-compare-cta${plan.popular ? ' solid' : ''}`} onClick={() => handleSelectPlan(plan)}>
                          {plan.tier === currentTier ? p.currentPlanCta : p.plans[plans.indexOf(plan)].tableCta}
                        </button>
                      </td>
                    ))}
                    <td>
                      <a href={`/${lang}/demo`} className="pr-brand-cta pr-compare-cta">{c.agencyCta}</a>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="pr-included">
            <h3>{bv.included.title}</h3>
            <div className="pr-included-grid">
              {includedGroups.map((group) => (
                <div key={group.title}>
                  <p className="pr-included-label">{group.title}</p>
                  {group.desc && <p className="pr-included-desc">{group.desc}</p>}
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <div className="pricing-faq-wrap">
          <h2 className="pricing-faq-title">{bv.faqTitle}</h2>
          <div className="pricing-faq-list">
            {bv.faq.map((item, i) => (
              <PricingFaqItem
                key={item.q}
                item={item}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>

        </>)}

        {agencyView && (
          <>
            {/* ============ STEP 1 · AGENCY PACK ============ */}
            <section className="pr-pack">
              <div className="pr-pack-main">
                <div className="pr-step">{av.step1}</div>
                <h2 className="pr-pack-title">{av.packTitle}</h2>
                <p className="pr-pack-price">
                  <span className="pr-pack-amount">{agencyRoll('pack')}</span>
                  <span className="pr-pack-period">{av.perMonth}</span>
                </p>
                <p className="pr-pack-promo">
                  {GIFT_ICON}
                  <span><strong>{av.promo.strong}</strong> {av.promo.rest}</span>
                </p>
                <p className="pr-pack-desc">{av.packDesc}</p>
                {/* Agency accounts are opened by a partner, never self-serve,
                    so booking a call is the only action on this page. */}
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="pr-pack-cta">
                  {av.cta} {ARROW_ICON}
                </a>
                <p className="pr-pack-note">{av.ctaNote}</p>
              </div>
              <div className="pr-pack-side">
                <h3 className="pr-pack-side-title">{av.includedTitle}</h3>
                <ul className="pr-pack-list">
                  {av.includes.map((item, i) => (
                    <li key={item.title}>
                      <span className="pr-pack-icon">{PACK_ICONS[i]}</span>
                      <span className="pr-pack-item">
                        <span className="pr-pack-item-title">{item.title}</span>
                        <span className="pr-pack-item-desc">{item.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ============ STEP 2 · CLIENT PLANS ============ */}
            <section className="pr-section">
              <div className="pr-section-head">
                <div className="pr-step blue">{av.step2}</div>
                <h2 className="pr-h2">{av.clientsTitle}</h2>
                <p className="pr-lead">{av.clientsLead}</p>
              </div>
              {/* What every client plan gets, said once above the cards:
                  everything included, and the annual price without the
                  yearly commitment (Client S/M/L are 20% below Starter,
                  Growth and Pro, the same as their annual price). */}
              {av.clientsIncluded?.length > 0 && (
                <ul className="pr-clients-included">
                  {av.clientsIncluded.map((item) => (
                    <li key={item.strong}>
                      {CHECK_ICON}
                      <span><strong>{item.strong}</strong> {item.rest}</span>
                    </li>
                  ))}
                </ul>
              )}
              {/* Same card as the brand plans (pricing-card). */}
              <div className="pricing-grid pr-clients">
                {AGENCY_TIERS.map((key, i) => {
                  const tier = av.tiers[i];
                  return (
                    <div key={key} className="pricing-card pr-client-card">
                      <div className="pricing-plan-name">{tier.name}</div>
                      <div className="pricing-price-row">
                        <span className="pricing-price">{agencyRoll(key)}</span>
                        <div className="pricing-price-meta">
                          <span className="pricing-price-period">{av.perClient}</span>
                        </div>
                      </div>
                      <p className="pr-client-credits">{tier.credits}</p>
                      <div className="pricing-divider" />
                      <ul className="pricing-features">
                        {tier.features.map((f) => <li key={f}>{CHECK_ICON}<span>{f}</span></li>)}
                      </ul>
                    </div>
                  );
                })}
                <div className="pricing-card pr-client-card custom">
                  <div className="pricing-plan-name">{av.customTier.name}</div>
                  <div className="pricing-price-row">
                    <span className="pricing-price">{av.customTier.price}</span>
                    {/* Empty line where the others say "per client / month",
                        so the credits line stays level across the cards. */}
                    <div className="pricing-price-meta" aria-hidden="true">
                      <span className="pricing-price-period">&nbsp;</span>
                    </div>
                  </div>
                  <p className="pr-client-credits">{av.customTier.credits}</p>
                  <div className="pricing-divider" />
                  <ul className="pricing-features">
                    {av.customTier.features.map((f) => <li key={f}>{CHECK_ICON}<span>{f}</span></li>)}
                  </ul>
                </div>
              </div>
              <p className="pr-notes">
                <span className="pr-notes-icon">{INFO_ICON}</span>
                <span>{av.clientsNote}</span>
              </p>
            </section>

            {/* ============ TWO MODES ============ */}
            <section className="pr-section">
              <div className="pr-section-head">
                <h2 className="pr-h2">{av.modes.title}</h2>
                <p className="pr-lead">{av.modes.lead}</p>
              </div>
              {/* One card per mode, each showing what the client actually
                  sees: the app's sidebar under the agency's own logo, with
                  the ACTION tools hidden (mode 1) or opened (mode 2). The
                  picture carries "The client sees", so only who does the
                  work and who it suits stay as text. */}
              <div className="pr-modes2">
                {av.modes.items.map((mode, m) => {
                  const ill = av.modes.illustration ?? {};
                  return (
                    <article key={mode.title} className="pr-mode2">
                      <span className="pr-mode-tag">{mode.tag}</span>
                      <h3 className="pr-mode-title">{mode.title}</h3>
                      <p className="pr-mode-desc">{mode.desc}</p>
                      <figure className="pr-mode2-shot">
                        <div className="pr-mode2-screen">
                          <DashSidebar
                            product={0}
                            productCount={1}
                            logo={(
                              <span className="dsb2__agency">
                                <span className="dsb2__agency-mark">{(ill.agency ?? 'A')[0]}</span>
                                <span className="dsb2__agency-name">{ill.agency}</span>
                              </span>
                            )}
                            action={m === 0 ? 'hidden' : 'opened'}
                            actionNote={m === 0 ? ill.hidden : ill.opened}
                          />
                          {/* The dashboard beside the sidebar, as flat
                              placeholder blocks: the sidebar is the point. */}
                          <div className="pr-mode2-main" aria-hidden="true">
                            <span className="pr-mode2-bar pr-mode2-bar--title" />
                            <span className="pr-mode2-row"><span /><span /><span /></span>
                            <span className="pr-mode2-panel" />
                            <span className="pr-mode2-bar" />
                            <span className="pr-mode2-bar pr-mode2-bar--short" />
                          </div>
                        </div>
                        <figcaption className="pr-mode2-caption">
                          <span>{av.modes.rows[1]}</span> {mode.values[1]}
                        </figcaption>
                      </figure>
                      <dl className="pr-mode2-facts">
                        {[0, 2].map((r) => (
                          <div key={r}>
                            <dt>{av.modes.rows[r]}</dt>
                            <dd>{mode.values[r]}</dd>
                          </div>
                        ))}
                      </dl>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* ============ FREE AUDITS ============ */}
            <section className="pr-audits">
              <div className="pr-audits-text">
                <div className="pr-step blue">{av.audits.eyebrow}</div>
                <h2 className="pr-h2">{av.audits.title}</h2>
                <p className="pr-lead">{av.audits.lead}</p>
              </div>
              <ol className="pr-audits-steps">
                {av.audits.steps.map((step, i) => (
                  <li key={step.title}>
                    <span className="pr-audits-num">{i + 1}</span>
                    <span>
                      <span className="pr-audits-title">{step.title}</span>
                      <span className="pr-audits-desc">{step.desc}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            {/* ============ HOW TO GET STARTED ============ */}
            <section className="pr-section">
              <h2 className="pr-h2 pr-start-h2">{av.start.title}</h2>
              {/* The landing page's step design (How it works: icon,
                  connector line, numbered title), drawn still here: same
                  classes, lines shown and icons in blue from the start. */}
              <ol className="how__steps pr-start2" style={{ '--how-cols': av.start.steps.length }}>
                {av.start.steps.map((step, i) => (
                  <li key={i} className="how__step">
                    {i < av.start.steps.length - 1 && <span className="how__link is-drawn" aria-hidden="true" />}
                    <span className="how__icon is-lit" aria-hidden="true">{START_ICONS[i] ?? START_ICONS[0]}</span>
                    <h3 className="how__h3">{i + 1}. {step.title}</h3>
                    <p className="how__desc">{step.desc}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Same accordion and styling as the brand FAQ above. */}
            <div className="pricing-faq-wrap">
              <h2 className="pricing-faq-title">{av.faqTitle}</h2>
              <div className="pricing-faq-list">
                {av.faq.map((item, i) => (
                  <PricingFaqItem
                    key={item.q}
                    item={item}
                    isOpen={openFaq === i}
                    onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      <Footer />
      <PlanCheckoutModal
        open={Boolean(checkoutPlan)}
        onClose={() => setCheckoutPlan(null)}
        plan={checkoutPlan}
        currency={CURRENCIES[currency].code}
        billingInterval={annual ? 'year' : 'month'}
        displayPrice={checkoutPlan ? priceFor(checkoutPlan, annual) : 0}
        displayAnnualTotal={checkoutPlan ? annualTotalFor(checkoutPlan) : 0}
        symbol={symbol}
      />
    </div>
  );
}
