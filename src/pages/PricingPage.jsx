import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import PlanCheckoutModal from '../components/PlanCheckoutModal';
import { useLang } from '../contexts/LangContext';
import { hasAccountCookie, currentPlanTierCookie } from '../lib/hasAccountCookie';
import { APP_URL } from '../lib/appUrl';
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

// Calculator-only model list — the real, currently-active models, not
// generic per-provider badges. Pulled live from the `modelspecs` table
// (generic/version/web_ui) and poliris-frontend/lib/llm-model-credits.ts's
// AVG_CREDITS_PER_REQUEST, checked 2026-08-14. Labels follow the same
// humanizeModelVersion() convention the product itself uses
// (poliris-frontend/lib/utils/visibility.ts) so a visitor sees the same
// names they'll see after signing up. Split into `web` (flat-rate,
// browser-based tracking) and `api` (token-metered, cost scales with the
// specific model) — same distinction the product draws between web_ui
// models and versioned API integrations.
const CALC_MODELS = [
  // Web interface — flat rate, 1 credit per request regardless of provider.
  { id: 'chatgpt-web', group: 'web', logo: 'chatgpt-com-logo.png', label: 'ChatGPT Web', weight: 1 },
  { id: 'gemini-web', group: 'web', logo: 'gemini-logo.png', label: 'Gemini Web', weight: 1 },
  { id: 'google-ai-mode', group: 'web', logo: 'google-com-logo.png', label: 'Google AI Mode', weight: 1 },
  { id: 'google-ai-overview', group: 'web', logo: 'google-com-logo.png', label: 'Google AI Overview', weight: 1 },
  { id: 'perplexity', group: 'web', logo: 'perplexity-ai-logo.png', label: 'Perplexity', weight: 1 },
  // API integration — versioned, credit cost scales with the model.
  { id: 'gpt-4o-mini', group: 'api', logo: 'chatgpt-com-logo.png', label: 'GPT-4o Mini', weight: 1 },
  { id: 'gpt-5.4-nano', group: 'api', logo: 'chatgpt-com-logo.png', label: 'GPT-5.4 Nano', weight: 3 },
  { id: 'gpt-5.4-mini', group: 'api', logo: 'chatgpt-com-logo.png', label: 'GPT-5.4 Mini', weight: 5 },
  { id: 'gpt-5.4', group: 'api', logo: 'chatgpt-com-logo.png', label: 'GPT-5.4', weight: 10 },
  { id: 'gpt-5.5', group: 'api', logo: 'chatgpt-com-logo.png', label: 'GPT-5.5', weight: 15 },
  { id: 'gemini-3.1-flash-lite', group: 'api', logo: 'gemini-logo.png', label: 'Gemini 3.1 Flash Lite', weight: 3 },
  { id: 'gemini-3-flash-preview', group: 'api', logo: 'gemini-logo.png', label: 'Gemini 3 Flash Preview', weight: 4 },
  { id: 'gemini-3.5-flash', group: 'api', logo: 'gemini-logo.png', label: 'Gemini 3.5 Flash', weight: 7 },
  { id: 'gemini-3.1-pro-preview', group: 'api', logo: 'gemini-logo.png', label: 'Gemini 3.1 Pro Preview', weight: 12 },
  { id: 'claude-haiku-4-5', group: 'api', logo: 'claudeai-com-logo.png', label: 'Claude Haiku 4.5', weight: 2 },
  { id: 'grok-4.3', group: 'api', logo: 'grok-com-logo.png', label: 'Grok 4.3', weight: 2 },
  { id: 'mistral-small', group: 'api', logo: 'mistral-ai-logo.png', label: 'Mistral Small', weight: 1 },
  { id: 'mistral-medium', group: 'api', logo: 'mistral-ai-logo.png', label: 'Mistral Medium', weight: 2 },
  { id: 'mistral-large', group: 'api', logo: 'mistral-ai-logo.png', label: 'Mistral Large', weight: 2 },
  { id: 'deepseek-v3', group: 'api', logo: 'deepseek.png', label: 'DeepSeek V3', weight: 2 },
];
const CALC_MODEL_BY_ID = Object.fromEntries(CALC_MODELS.map((m) => [m.id, m]));
const CALC_WEB_MODELS = CALC_MODELS.filter((m) => m.group === 'web');
const CALC_API_MODELS = CALC_MODELS.filter((m) => m.group === 'api');
// The API-integration picker shows one chip per provider instead of every
// version — each still points at a real CALC_MODELS id/weight (its
// flagship tier), so toggling it drives the same credit math as before;
// only the label is simplified to the provider name. CALC_API_MODELS
// itself stays the full versioned list for anything needing that detail.
const CALC_API_MODELS_UI = [
  { ...CALC_MODEL_BY_ID['gpt-5.5'], label: 'ChatGPT' },
  { ...CALC_MODEL_BY_ID['gemini-3.1-pro-preview'], label: 'Gemini' },
  { ...CALC_MODEL_BY_ID['claude-haiku-4-5'], label: 'Claude' },
  { ...CALC_MODEL_BY_ID['mistral-large'], label: 'Mistral' },
  { ...CALC_MODEL_BY_ID['deepseek-v3'], label: 'DeepSeek' },
  { ...CALC_MODEL_BY_ID['grok-4.3'], label: 'Grok' },
];
// Every id the picker can show — "Select all" toggles between this and a
// single fallback so at least one model always stays selected.
const ALL_CALC_MODEL_IDS = [...CALC_WEB_MODELS, ...CALC_API_MODELS_UI].map((m) => m.id);

// Calculator formula mirrors the app's real credit estimate (see
// poliris-frontend/lib/llm-model-credits.ts + ProductSettingsPanel.tsx) —
// estimated credits/month = prompts tracked × brands/workspaces tracked ×
// Σ(each selected model's own credit weight, from CALC_MODELS above) ×
// checks per month. Each model is picked individually now (not a per-
// provider approximation), so this is exact for whatever's selected — no
// floor/ceiling guess needed. Each brand is its own project, so its prompts
// run independently at every check (see the "Projects" row).

// Runs/month derived the same way the app converts a refresh interval to a
// monthly cadence (30-day month ÷ refresh_interval_days — see
// REFRESH_OPTIONS in product-settings/constants.ts: Daily=1, Weekly=7).
const CALC_CADENCE_DAYS = { daily: 1, weekly: 7 };
const CALC_METER_MAX = 3000; // Pro's monthly allotment — the meter's right edge

const CALC_ICON_SOLO = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>
);
const CALC_ICON_TEAM = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.6"/><path d="M3 20c0-3.3 2.7-5.8 6-5.8s6 2.5 6 5.8"/><path d="M15.5 14.6c2.6.4 4.5 2.5 4.5 5.4"/></svg>
);
const CALC_ICON_AGENCY = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="10" width="7" height="11"/><rect x="12" y="4" width="9" height="17"/><path d="M6 14h1M6 17h1M15 8h3M15 11h3M15 14h3"/></svg>
);

// Quick-start presets — clicking one seeds every field at once. `c` (the
// calculator's locale slice) is passed in so labels stay translatable;
// the numbers themselves are the same across languages.
const calcPresets = (c) => [
  { id: 'solo', icon: CALC_ICON_SOLO, label: c.presetSoloLabel, desc: c.presetSoloDesc, sites: 1, modelIds: ['chatgpt-web', 'perplexity'], cadence: 'weekly' },
  { id: 'team', icon: CALC_ICON_TEAM, label: c.presetTeamLabel, desc: c.presetTeamDesc, sites: 3, modelIds: ['chatgpt-web', 'gemini-web', 'claude-haiku-4-5', 'perplexity'], cadence: 'weekly' },
  { id: 'agency', icon: CALC_ICON_AGENCY, label: c.presetAgencyLabel, desc: c.presetAgencyDesc, sites: 8, modelIds: ['chatgpt-web', 'gemini-web', 'claude-haiku-4-5', 'google-ai-mode', 'google-ai-overview', 'perplexity'], cadence: 'weekly' },
];

// Not a keypad — a live, preset-and-slider estimator. Starts from the
// "Solo brand" preset, lets you jump to a different typical setup or
// fine-tune every field by hand, and turns the result into a
// credits/month figure using the same formula the FAQ already teaches,
// then recommends the cheapest plan that comfortably covers it.
function CreditCalculator({ c, plans, agencyLabel, onRecommend }) {
  const presets = calcPresets(c);
  const [prompts, setPrompts] = useState(10);
  const [sites, setSites] = useState(presets[0].sites);
  const [modelIds, setModelIds] = useState(presets[0].modelIds);
  const [cadence, setCadence] = useState(presets[0].cadence);
  const [customRuns, setCustomRuns] = useState(8);
  const [activePreset, setActivePreset] = useState(presets[0].id);

  // Rounded once, here — daily/weekly cadence is really a repeating rate
  // (30/7 checks a month for "weekly"), but showing that full-precision
  // number both feeds the total AND is what the formula line displays.
  // Round it to the same one decimal a human would use by hand, so
  // multiplying out the formula text always reproduces the shown total —
  // no separate rounded-for-display vs exact-for-math copies to drift apart.
  const runsPerMonth = cadence === 'custom' ? customRuns : Number((30 / CALC_CADENCE_DAYS[cadence]).toFixed(1));
  const modelCreditWeight = modelIds.reduce((sum, id) => sum + (CALC_MODEL_BY_ID[id]?.weight ?? 1), 0);
  const estimated = Math.round(prompts * sites * modelCreditWeight * runsPerMonth);

  let recommendedTier = 'agency';
  if (estimated <= 300) recommendedTier = 'starter';
  else if (estimated <= 1500) recommendedTier = 'growth';
  else if (estimated <= 3000) recommendedTier = 'pro';
  const recommendedPlan = plans.find((pl) => pl.tier === recommendedTier);
  // Agency has no fixed monthly allotment (custom/unlimited), so there's
  // nothing to subtract the estimate from — spareCredits stays null.
  const planCredits = recommendedPlan?.monthlyCredits ? Number(recommendedPlan.monthlyCredits.replace(/,/g, '')) : null;
  const spareCredits = planCredits !== null ? Math.max(0, planCredits - estimated) : null;

  const allModelsSelected = ALL_CALC_MODEL_IDS.every((id) => modelIds.includes(id));

  // Presets seed the AI models + check frequency — the actual "shape" of a
  // Solo/Team/Agency setup — plus a starting product count. They deliberately
  // don't touch prompts: how many prompts you track per product is a
  // personal-preference dial, not something that defines which preset
  // you're in, so it always starts at 10 and only moves when you drag it.
  const applyPreset = (preset) => {
    setSites(preset.sites);
    setModelIds(preset.modelIds);
    setCadence(preset.cadence);
    setActivePreset(preset.id);
  };

  // Products and prompts are just numbers layered on top of a preset, not
  // part of what makes it "Solo" vs "Team" vs "Agency" — adjusting either
  // keeps the preset pill selected. Only changing the AI models or check
  // frequency actually breaks from the preset, since those are what the
  // preset itself defines.
  const setPromptsManual = (v) => { setPrompts(v); };
  const setSitesManual = (v) => { setSites(Math.max(1, Math.min(10, v))); };
  const setCadenceManual = (v) => { setCadence(v); setActivePreset(null); };
  const setCustomRunsManual = (v) => { setCustomRuns(v); setActivePreset(null); };
  const toggleModel = (id) => {
    setModelIds((ids) => (
      ids.includes(id)
        ? (ids.length > 1 ? ids.filter((x) => x !== id) : ids)
        : [...ids, id]
    ));
    setActivePreset(null);
  };
  const toggleAllModels = () => {
    setModelIds(allModelsSelected ? [ALL_CALC_MODEL_IDS[0]] : ALL_CALC_MODEL_IDS);
    setActivePreset(null);
  };

  return (
    <div className="pricing-calc-wrap">
      <div className="pricing-calc-card">

        <div className="pricing-calc-head">
          <div className="pricing-calc-head-copy">
            <h2>{c.title}</h2>
            <p>{c.subtitle}</p>
          </div>
          <div className="pricing-calc-presets">
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`pricing-calc-preset-pill${activePreset === preset.id ? ' active' : ''}`}
                aria-pressed={activePreset === preset.id}
                onClick={() => applyPreset(preset)}
              >
                <span className="pricing-calc-preset-pill-icon">{preset.icon}</span>
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pricing-calc-inputs">

          <div className="pricing-calc-field-outline">
            <div className="pricing-calc-field pricing-calc-field-stepper">
              <div className="pricing-calc-field-copy">
                <label>{c.sitesLabel}</label>
                <p className="pricing-calc-field-sub">{c.sitesSub}</p>
              </div>
              <div className="pricing-calc-stepper">
                <button type="button" className="pricing-calc-stepper-btn" aria-label="Decrease" onClick={() => setSitesManual(sites - 1)}>−</button>
                <span className="pricing-calc-stepper-value">{sites}</span>
                <button type="button" className="pricing-calc-stepper-btn pricing-calc-stepper-btn--fill" aria-label="Increase" onClick={() => setSitesManual(sites + 1)}>+</button>
              </div>
            </div>
            
            <div className="pricing-calc-field">
              <div className="pricing-calc-field-head">
                <div className="pricing-calc-field-copy">
                  <label htmlFor="calc-prompts">{c.promptsLabel}</label>
                  <p className="pricing-calc-field-sub">{c.promptsSub}</p>
                </div>
                <span className="pricing-calc-value">{prompts}</span>
              </div>
              <input
                id="calc-prompts"
                type="range"
                min="5"
                max="50"
                step="1"
                value={prompts}
                onChange={(e) => setPromptsManual(Number(e.target.value))}
                className="pricing-calc-slider"
              />
            </div>
          </div>

          <div className="pricing-calc-field">
            <div className="pricing-calc-field-head">
              <label>{c.modelsLabel}</label>
              <button type="button" className="pricing-calc-select-all" onClick={toggleAllModels}>
                {allModelsSelected ? c.modelsDeselectAll : c.modelsSelectAll}
              </button>
            </div>

            <p className="pricing-calc-model-group-label">{c.modelsWebLabel}</p>
            <div className="pricing-calc-model-grid">
              {CALC_WEB_MODELS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`pricing-calc-model-chip${modelIds.includes(m.id) ? ' active' : ''}`}
                  aria-pressed={modelIds.includes(m.id)}
                  onClick={() => toggleModel(m.id)}
                >
                  <img src={`${import.meta.env.BASE_URL}${m.logo}`} alt={m.label} aria-hidden="true" width="18" height="18" />
                  {m.label}
                </button>
              ))}
            </div>

            <p className="pricing-calc-model-group-label">{c.modelsApiLabel}</p>
            <div className="pricing-calc-model-grid">
              {CALC_API_MODELS_UI.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`pricing-calc-model-chip${modelIds.includes(m.id) ? ' active' : ''}`}
                  aria-pressed={modelIds.includes(m.id)}
                  onClick={() => toggleModel(m.id)}
                >
                  <img src={`${import.meta.env.BASE_URL}${m.logo}`} alt={m.label} aria-hidden="true" width="18" height="18" />
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pricing-calc-field">
            <div className="pricing-calc-field-copy">
              <label>{c.cadenceLabel}</label>
              <p className="pricing-calc-field-sub">{c.cadenceSub.replace('{runs}', Math.round(runsPerMonth))}</p>
            </div>
            <div className="pricing-calc-cadence">
              <button type="button" className={`pricing-calc-cadence-btn${cadence === 'daily' ? ' active' : ''}`} onClick={() => setCadenceManual('daily')}>{c.cadenceDaily}</button>
              <button type="button" className={`pricing-calc-cadence-btn${cadence === 'weekly' ? ' active' : ''}`} onClick={() => setCadenceManual('weekly')}>{c.cadenceWeekly}</button>
              <button type="button" className={`pricing-calc-cadence-btn${cadence === 'custom' ? ' active' : ''}`} onClick={() => setCadenceManual('custom')}>{c.cadenceCustom}</button>
            </div>
            {cadence === 'custom' && (
              <div className="pricing-calc-custom-runs">
                <div className="pricing-calc-field-head">
                  <label htmlFor="calc-runs">{c.cadenceCustomLabel}</label>
                  <span className="pricing-calc-value">{customRuns}</span>
                </div>
                <input
                  id="calc-runs"
                  type="range"
                  min="1"
                  max="30"
                  value={customRuns}
                  onChange={(e) => setCustomRunsManual(Number(e.target.value))}
                  className="pricing-calc-slider"
                />
              </div>
            )}
          </div>

        </div>

        <div className="pricing-calc-summary">
          <div className="pricing-calc-summary-stats">
            <div className="pricing-calc-summary-number">
              {estimated.toLocaleString()}<span>{c.resultUnit}</span>
            </div>
            <p className="pricing-calc-summary-formula">
              {c.formula
                .replace('{prompts}', prompts)
                .replace('{sites}', sites)
                .replace('{sitesWord}', sites === 1 ? c.brandWord : c.brandsWord)
                .replace('{models}', modelCreditWeight)
                .replace('{modelsWord}', modelCreditWeight === 1 ? c.modelWord : c.modelsWord)
                .replace('{runs}', runsPerMonth)}
            </p>
          </div>

          <div className="pricing-calc-summary-fit">
            <div className="pricing-calc-summary-fit-head">
              <span className="pricing-calc-summary-fit-label">
                {c.fitsPre} {recommendedTier === 'agency' ? agencyLabel : recommendedPlan.name}
              </span>
              {spareCredits !== null && (
                <span className="pricing-calc-summary-spare">{c.spareCredits.replace('{n}', spareCredits.toLocaleString())}</span>
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
function CreditCalculatorPanel({ c, plans, agencyLabel, onRecommend, children }) {
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
      {children}
      </div>
      {open && (
        <CreditCalculator c={c} plans={plans} agencyLabel={agencyLabel} onRecommend={onRecommend} />
      )}
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
   Monthly prices, excl. tax, per currency, as the design shows them:
   the Agency pack, then one plan per client (Client S / M / L). Client XL
   is quoted, so it has no price here. The names and copy live in
   pricing.agencyView in src/locales/en.js and fr.js.

   Agency plans are not self-serve: there is no checkout here, which is
   why nothing feeds PlanCheckoutModal. They are opened by the partner
   team, so the only action is booking a call. */
const AGENCY_PRICES = {
  pack:    { usd: 69,  eur: 64 },
  clientS: { usd: 22,  eur: 20 },
  clientM: { usd: 74,  eur: 69 },
  clientL: { usd: 142, eur: 131 },
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
  const compareRows = [
    { label: bv.compare.creditsLabel, values: [false, '300', num('1,500'), num('3,000'), c.custom] },
    { label: c.promptsTrackedLabel, sub: c.promptsTrackedSub, values: ['10', '100', '500', num('1,000'), c.custom] },
    { label: c.modelsLabel, sub: c.modelsSub, values: ['modelsWebOnly', 'models', 'models', 'models', 'models'] },
    { label: c.modelsCountLabel, values: ['2', c.anyCombination, c.anyCombination, c.anyCombination, c.anyCombination] },
    { label: c.projectsLabel, values: ['1', c.multipleCreditLimited, c.multipleCreditLimited, c.multipleCreditLimited, c.unlimited] },
    { label: c.zonesLabel, values: [c.zonesFree, c.multipleCreditLimited, c.multipleCreditLimited, c.multipleCreditLimited, c.unlimited] },
    { label: c.cadenceLabel, values: [c.daily, c.anyCadence, c.anyCadence, c.anyCadence, c.anyCadence] },
    { label: c.premiumModelLabel, values: [false, true, true, true, true] },
    { label: c.virtualTeamsLabel, values: [false, true, true, true, true] },
    { label: c.slackLabel, values: [false, true, true, true, true] },
    { label: c.supportChannelsLabel, values: [c.chatsOnly, c.chatsEmail, c.chatsEmail, c.dedicated, c.dedicatedManager] },
  ];
  const includedGroups = [
    { title: c.monitorTitle, items: [c.promptTrackingLabel, c.responseAnalysisLabel, c.mentionsLabel, c.sourceExplorerLabel, c.insightsLabel] },
    { title: bv.included.sentimentDashboard, items: [c.sentimentScoreLabel, c.perceptionLabel, c.overviewLabel, c.geoMatrixLabel, c.benchmarkingLabel] },
    { title: c.auditTitle, items: [c.siteReadinessLabel, c.siteDiagnosticsLabel, c.crawlerAnalyticsLabel, c.pagePerfLabel, c.gscLabel] },
    { title: c.actTitle, items: [c.contentOppsLabel, c.contentStudioLabel, c.backlinkOppsLabel] },
    { title: c.platformTitle, items: [c.enginesLabel, c.languagesLabel, c.teamMembersLabel, c.exportsLabel] },
  ];

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
  // CurrencyRoll can slide from one to the other.
  const agencyRoll = (key) => (
    <CurrencyRoll
      currency={currency}
      values={{ usd: `$${AGENCY_PRICES[key].usd}`, eur: `€${AGENCY_PRICES[key].eur}` }}
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
      <Seo page="pricing" />
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
                <span className="pr-plan-period">{bv.perMonth}</span>
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
                {plan.firstMonth && <span>{plan.firstMonth}</span>}
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
                          {plan.tier !== 'free' && <small> {bv.perMonth}</small>}
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
              {/* One card, two columns: the row labels are shared, so the two
                  modes read as a direct comparison. */}
              <div className="pr-modes">
                <div className="pr-modes-head">
                  <span aria-hidden="true" />
                  {av.modes.items.map((mode) => (
                    <div key={mode.title} className="pr-modes-col">
                      <span className="pr-mode-tag">{mode.tag}</span>
                      <h3 className="pr-mode-title">{mode.title}</h3>
                      <p className="pr-mode-desc">{mode.desc}</p>
                    </div>
                  ))}
                </div>
                {av.modes.rows.map((label, r) => (
                  <div key={label} className="pr-modes-row">
                    <span className="pr-modes-label">{label}</span>
                    {av.modes.items.map((mode) => (
                      <span key={mode.title} className="pr-modes-value">{mode.values[r]}</span>
                    ))}
                  </div>
                ))}
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
              <h2 className="pr-h2">{av.start.title}</h2>
              <ol className="pr-start">
                {av.start.steps.map((step, i) => (
                  <li key={step.title}>
                    <span className="pr-start-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="pr-start-title">{step.title}</span>
                    <span className="pr-start-desc">{step.desc}</span>
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
