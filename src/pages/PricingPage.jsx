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

const X_ICON = (
  <svg viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
);

const CHEVRON_ICON = (
  <svg viewBox="0 0 20 20" fill="none"><path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const CALCULATOR_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2.5"/>
    <path d="M8 6h8"/>
    <path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/>
  </svg>
);

// One distinct icon per agency feature — order matches p.agency.features.
const AGENCY_ICONS = [
  <svg key="layers" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 10 5-10 5L2 7l10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>,
  <svg key="globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20Z"/></svg>,
  <svg key="card" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/></svg>,
  <svg key="manager" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m17 11 2 2 4-4"/></svg>,
];

// Square icon-only marks (see public/*-logo.png). Used by the comparison
// table below (generic per-provider badges — unrelated to the calculator's
// own model list, see CALC_MODELS).
const MODELS = [
  { logo: 'chatgpt-com-logo.png', label: 'ChatGPT' },
  { logo: 'gemini-logo.png', label: 'Gemini' },
  { logo: 'claudeai-com-logo.png', label: 'Claude' },
  { logo: 'google-com-logo.png', label: 'AI Mode' },
  { logo: 'google-com-logo.png', label: 'AI Overviews' },
  { logo: 'perplexity-ai-logo.png', label: 'Perplexity' },
  { logo: 'mistral-ai-logo.png', label: 'Mistral' },
  { logo: 'grok-com-logo.png', label: 'Grok' },
];
const FREE_MODELS = [MODELS[0], MODELS[3], MODELS[4], MODELS[5]];
// Same generic badges, split by tracking method (see the `modelspecs.web_ui`
// column) — ChatGPT and Gemini are tracked both ways, so they appear in
// both groups; Claude/Mistral/Grok are API-only, AI Mode/AI Overviews/
// Perplexity are web-only.
const WEB_INTERFACE_MODELS = [MODELS[0], MODELS[1], MODELS[3], MODELS[4], MODELS[5]];
const API_INTEGRATION_MODELS = [MODELS[0], MODELS[1], MODELS[2], MODELS[6], MODELS[7]];

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
];
const CALC_MODEL_BY_ID = Object.fromEntries(CALC_MODELS.map((m) => [m.id, m]));
const CALC_WEB_MODELS = CALC_MODELS.filter((m) => m.group === 'web');
const CALC_API_MODELS = CALC_MODELS.filter((m) => m.group === 'api');

function ModelBadge({ model }) {
  return (
    <span className="pricing-model-badge">
      <img className="pricing-model-img" src={`${import.meta.env.BASE_URL}${model.logo}`} alt="" />
      {model.label}
    </span>
  );
}

// One "Available models" cell, split into its two tracking-method groups
// (web interface vs API integration) rather than a flat badge list — a
// provider can appear in both (see WEB_INTERFACE_MODELS/API_INTEGRATION_MODELS).
function ModelCell({ webModels, apiModels, c }) {
  return (
    <div className="pricing-cell models-grouped">
      <div className="pricing-cell-model-group">
        <span className="pricing-cell-model-group-label">{c.modelsWebLabel}</span>
        <div className="pricing-cell models">{webModels.map((m) => <ModelBadge key={m.label} model={m} />)}</div>
      </div>
      <div className="pricing-cell-model-group">
        <span className="pricing-cell-model-group-label">{c.modelsApiLabel}</span>
        {apiModels.length
          ? <div className="pricing-cell models">{apiModels.map((m) => <ModelBadge key={m.label} model={m} />)}</div>
          : <span className="pricing-check-dash">—</span>}
      </div>
    </div>
  );
}

// Shared renderer for the many "label + 5 checkmarks" comparison rows —
// `values` is a 5-length boolean array (Free, Starter, Growth, Pro, Agency).
function CheckRow({ label, values }) {
  return (
    <div className="pricing-compare-row">
      <div className="pricing-row-label">{label}</div>
      {values.map((yes, i) => (
        <div key={i} className="pricing-cell">
          {yes ? <span className="pricing-check-yes">{CHECK_ICON}</span> : <span className="pricing-check-no">{X_ICON}</span>}
        </div>
      ))}
    </div>
  );
}

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
  { id: 'solo', icon: CALC_ICON_SOLO, label: c.presetSoloLabel, desc: c.presetSoloDesc, prompts: 10, sites: 1, modelIds: ['chatgpt-web', 'perplexity'], cadence: 'weekly' },
  { id: 'team', icon: CALC_ICON_TEAM, label: c.presetTeamLabel, desc: c.presetTeamDesc, prompts: 20, sites: 3, modelIds: ['chatgpt-web', 'gemini-web', 'claude-haiku-4-5', 'perplexity'], cadence: 'weekly' },
  { id: 'agency', icon: CALC_ICON_AGENCY, label: c.presetAgencyLabel, desc: c.presetAgencyDesc, prompts: 35, sites: 8, modelIds: ['chatgpt-web', 'gemini-web', 'claude-haiku-4-5', 'google-ai-mode', 'google-ai-overview', 'perplexity'], cadence: 'weekly' },
];

// Not a keypad — a live, preset-and-slider estimator. Starts from the
// "Solo brand" preset, lets you jump to a different typical setup or
// fine-tune every field by hand, and turns the result into a
// credits/month figure using the same formula the FAQ already teaches,
// then recommends the cheapest plan that comfortably covers it.
function CreditCalculator({ c, plans, agencyLabel, onRecommend }) {
  const presets = calcPresets(c);
  const [prompts, setPrompts] = useState(presets[0].prompts);
  const [sites, setSites] = useState(presets[0].sites);
  const [modelIds, setModelIds] = useState(presets[0].modelIds);
  const [cadence, setCadence] = useState(presets[0].cadence);
  const [customRuns, setCustomRuns] = useState(8);
  const [activePreset, setActivePreset] = useState(presets[0].id);

  const runsPerMonth = cadence === 'custom' ? customRuns : 30 / CALC_CADENCE_DAYS[cadence];
  const modelsCount = modelIds.length;
  const modelCreditWeight = modelIds.reduce((sum, id) => sum + (CALC_MODEL_BY_ID[id]?.weight ?? 1), 0);
  const estimated = Math.round(prompts * sites * modelCreditWeight * runsPerMonth);

  let recommendedTier = 'agency';
  if (estimated <= 300) recommendedTier = 'starter';
  else if (estimated <= 1500) recommendedTier = 'growth';
  else if (estimated <= 3000) recommendedTier = 'pro';
  const recommendedPlan = plans.find((pl) => pl.tier === recommendedTier);

  const applyPreset = (preset) => {
    setPrompts(preset.prompts);
    setSites(preset.sites);
    setModelIds(preset.modelIds);
    setCadence(preset.cadence);
    setActivePreset(preset.id);
  };

  // Any manual tweak breaks away from whichever preset was selected —
  // these wrap the raw setters so the presets grid stops claiming credit
  // for a configuration the user has since changed.
  const setPromptsManual = (v) => { setPrompts(v); setActivePreset(null); };
  const setSitesManual = (v) => { setSites(Math.max(1, Math.min(10, v))); setActivePreset(null); };
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

  return (
    <div className="pricing-calc-wrap">
      <div className="pricing-calc-head">
        <span className="pricing-calc-eyebrow">{c.eyebrow}</span>
        <h2>{c.title}</h2>
        <p>{c.subtitle}</p>
      </div>

      <div className="pricing-calc-card">
        <div className="pricing-calc-inputs">

          <div className="pricing-calc-presets">
            <p className="pricing-calc-presets-label">{c.presetsLabel}</p>
            <div className="pricing-calc-presets-grid">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={`pricing-calc-preset-card${activePreset === preset.id ? ' active' : ''}`}
                  aria-pressed={activePreset === preset.id}
                  onClick={() => applyPreset(preset)}
                >
                  <span className="pricing-calc-preset-icon">{preset.icon}</span>
                  <span className="pricing-calc-preset-title">{preset.label}</span>
                  <span className="pricing-calc-preset-desc">{preset.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pricing-calc-field">
            <div className="pricing-calc-field-head">
              <label htmlFor="calc-prompts">{c.promptsLabel}</label>
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
            <p className="pricing-calc-hint">{c.promptsHint}</p>
          </div>

          <div className="pricing-calc-field pricing-calc-field-stepper">
            <div className="pricing-calc-stepper-text">
              <label>{c.sitesLabel}</label>
              <p className="pricing-calc-hint">{c.sitesHint}</p>
            </div>
            <div className="pricing-calc-stepper">
              <button type="button" className="pricing-calc-stepper-btn" aria-label="Decrease" onClick={() => setSitesManual(sites - 1)}>−</button>
              <span className="pricing-calc-stepper-value">{sites}</span>
              <button type="button" className="pricing-calc-stepper-btn" aria-label="Increase" onClick={() => setSitesManual(sites + 1)}>+</button>
            </div>
          </div>

          <div className="pricing-calc-field">
            <div className="pricing-calc-field-head">
              <label>{c.modelsLabel}</label>
              <span className="pricing-calc-value">{modelsCount}</span>
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
                  <img src={`${import.meta.env.BASE_URL}${m.logo}`} alt="" />
                  {m.label}
                </button>
              ))}
            </div>

            <p className="pricing-calc-model-group-label">{c.modelsApiLabel}</p>
            <div className="pricing-calc-model-grid">
              {CALC_API_MODELS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`pricing-calc-model-chip${modelIds.includes(m.id) ? ' active' : ''}`}
                  aria-pressed={modelIds.includes(m.id)}
                  onClick={() => toggleModel(m.id)}
                >
                  <img src={`${import.meta.env.BASE_URL}${m.logo}`} alt="" />
                  {m.label}
                </button>
              ))}
            </div>

            <p className="pricing-calc-hint">{c.modelsHint}</p>
          </div>

          <div className="pricing-calc-field">
            <div className="pricing-calc-field-head">
              <label>{c.cadenceLabel}</label>
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

        <div className="pricing-calc-result">
          <span className="pricing-calc-result-eyebrow">{c.resultEyebrow}</span>
          <div className="pricing-calc-result-number">
            {estimated.toLocaleString()}
            <span>{c.resultUnit}</span>
          </div>
          <p className="pricing-calc-formula">
            {c.formula
              .replace('{prompts}', prompts)
              .replace('{sites}', sites)
              .replace('{models}', modelCreditWeight)
              .replace('{runs}', Number(runsPerMonth.toFixed(1)))}
          </p>

          <div className="pricing-calc-meter-track">
            <div className="pricing-calc-meter-fill" style={{ width: `${Math.min((estimated / CALC_METER_MAX) * 100, 100)}%` }} />
            {[300, 1500].map((mark) => (
              <div key={mark} className="pricing-calc-meter-mark" style={{ left: `${(mark / CALC_METER_MAX) * 100}%` }} />
            ))}
          </div>
          <div className="pricing-calc-meter-labels">
            <span>{plans[1].name}</span>
            <span>{plans[2].name}</span>
            <span>{plans[3].name}</span>
          </div>

          <div className="pricing-calc-divider" />

          <ul className="pricing-calc-facts">
            {c.facts.map((f, i) => <li key={i}>{CHECK_ICON}{f}</li>)}
          </ul>

          <div className="pricing-calc-recommend-group">
            <div className="pricing-calc-recommend">
              <span className="pricing-calc-recommend-pre">{c.recommendedPre}</span>
              <span className="pricing-calc-recommend-plan">{recommendedTier === 'agency' ? agencyLabel : recommendedPlan.name}</span>
              <span className="pricing-calc-recommend-post">{c.recommendedPost}</span>
              <button type="button" className="pricing-calc-cta" onClick={() => onRecommend(recommendedTier)}>
                {recommendedTier === 'agency' ? c.recommendedCtaAgency : c.recommendedCtaPlan.replace('{plan}', recommendedPlan.name)}
              </button>
            </div>

            <p className="pricing-calc-note">{c.firstMonthNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// The calculator starts collapsed behind a one-line teaser banner — click
// it to reveal the full CreditCalculator in place (same conditional-render
// accordion pattern as CompareSection above, just gating a much bigger
// block so the pricing page isn't dominated by it by default).
function CreditCalculatorPanel({ c, plans, agencyLabel, onRecommend }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="pricing-calc-panel">
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
      {open && (
        <CreditCalculator c={c} plans={plans} agencyLabel={agencyLabel} onRecommend={onRecommend} />
      )}
    </div>
  );
}

// Collapsible comparison-table section — clicking the uppercase title bar
// toggles its rows, chevron rotates to point right when closed. Rendered
// as a Fragment (no wrapping div) so the rows stay flat siblings within
// .pricing-compare-table and keep their existing border-bottom sequencing.
function CompareSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button
        type="button"
        className="pricing-compare-section-title"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{title}</span>
        <span className={`pricing-compare-chevron${open ? '' : ' closed'}`}>{CHEVRON_ICON}</span>
      </button>
      {open && children}
    </>
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
  { tier: 'free',    monthly: 0,   annual: 0,   eurMonthly: 0,   eurAnnual: 0,   coveragePct: 5,   popular: false },
  { tier: 'starter', monthly: 29,  annual: 23,  eurMonthly: 27,  eurAnnual: 21,  coveragePct: 10,  popular: false, monthlyCredits: '300',   firstMonthCredits: '600' },
  { tier: 'growth',  monthly: 99,  annual: 79,  eurMonthly: 92,  eurAnnual: 73,  coveragePct: 50,  popular: true,  monthlyCredits: '1,500', firstMonthCredits: '3,000' },
  { tier: 'pro',     monthly: 189, annual: 151, eurMonthly: 175, eurAnnual: 140, coveragePct: 100, popular: false, monthlyCredits: '3,000', firstMonthCredits: '6,000' },
];

// currency/annual now flow through to checkout (see PlanCheckoutModal) —
// the backend has real Stripe prices per (plan_tier, currency,
// billing_interval), see app/api/v2/public_checkout.py.
const CURRENCIES = { usd: { symbol: '$', label: 'USD', code: 'USD' }, eur: { symbol: '€', label: 'EUR', code: 'EUR' } };

export default function PricingPage() {
  const { lang, t } = useLang();
  const [annual, setAnnual] = useState(false);
  const [currency, setCurrency] = useState('usd');
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [currentTier, setCurrentTier] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [highlightTier, setHighlightTier] = useState(null);
  const highlightTimeoutRef = useRef(null);
  const p = t('pricing');

  // Scrolls to and briefly pulses the matching plan card (or the Agency
  // banner) — used by the calculator's "Get {plan}" CTA so the
  // recommendation is a click, not just a label.
  const scrollToPlan = (tier) => {
    const el = document.getElementById(tier === 'agency' ? 'pricing-agency-banner' : `pricing-card-${tier}`);
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentTier(currentPlanTierCookie());
  }, []);

  const plans = p.plans.map((plan, i) => ({ ...plan, ...PLAN_META[i] }));

  const symbol = CURRENCIES[currency].symbol;
  const priceFor = (plan, isAnnual) => {
    if (currency === 'eur') return isAnnual ? plan.eurAnnual : plan.eurMonthly;
    return isAnnual ? plan.annual : plan.monthly;
  };
  // The displayed monthly-equivalent x12 — matches what checkout actually
  // charges once for annual billing (see the backend's *_annual_eq * 12
  // Stripe prices), not a separately-set number.
  const annualTotalFor = (plan) => priceFor(plan, true) * 12;

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
          <div className="eyebrow">{p.hero.eyebrow}</div>
        </div>

        <div className="pricing-toggle-wrap">
          <div className="pricing-switcher-card">
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

        <p className="pricing-flexibility-note">{p.flexibilityNote}</p>

        <div className="pricing-grid">
          {plans.map((plan) => {
            const isCurrentPlan = plan.tier === currentTier;
            return (
            <div
              key={plan.name}
              id={`pricing-card-${plan.tier}`}
              className={`pricing-card${plan.popular ? ' popular' : ''}${highlightTier === plan.tier ? ' calc-highlight' : ''}`}
            >
              {isCurrentPlan ? (
                <span className="pricing-badge-popular">{p.currentPlan}</span>
              ) : (
                plan.popular && <span className="pricing-badge-popular">{p.mostPopular}</span>
              )}
              <div className="pricing-plan-name">{plan.name}</div>
              <div className="pricing-plan-desc">{plan.desc}</div>
              <div className={`pricing-price-row${plan.firstMonthCredits ? ' has-first-month-tip' : ''}`} tabIndex={plan.firstMonthCredits ? 0 : undefined}>
                <span className="pricing-price">{symbol}{priceFor(plan, annual)}</span>
                <span className="pricing-price-period">/mo</span>
                {plan.firstMonthCredits && (
                  <span className="pricing-first-month-tip">
                    <span className="pricing-first-month-x2">×2</span>
                    <div className="pricing-first-month-tooltip" role="tooltip">
                      <div className="pricing-first-month-tooltip-head">
                        <span className="pricing-first-month-tooltip-x2">×2</span>
                        <span className="pricing-first-month-tooltip-title">{p.firstMonthTitle}</span>
                      </div>
                      <p className="pricing-first-month-tooltip-body">
                        <span className="pricing-first-month-calc">{p.firstMonthCalc.replaceAll('{base}', plan.monthlyCredits)}</span>{' '}
                        <span className="pricing-first-month-total">{p.firstMonthTotal.replace('{total}', plan.firstMonthCredits)}</span>
                      </p>
                    </div>
                  </span>
                )}
              </div>
              {annual && plan.tier !== 'free' ? (
                <div className="pricing-billed-annually">
                  {p.billing.billedAnnually.replace('{amount}', `${symbol}${annualTotalFor(plan)}`)}
                </div>
              ) : (
                <div className="pricing-price-annual-note">&nbsp;</div>
              )}
              <div className="pricing-coverage">
                <div className="pricing-coverage-label"><span>{p.coverage}</span><span>{plan.coverageLabel}</span></div>
                <div className="pricing-coverage-track"><div className="pricing-coverage-fill" style={{ width: `${plan.coveragePct}%` }} /></div>
              </div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                {plan.features.map((f, j) => (
                  <li key={j}>
                    {CHECK_ICON}
                    <span>
                      {f}
                      {/* 3rd feature on Free ("2 AI models") and Starter ("Access to all API models")
                          — see pricing.plans[0].features / pricing.plans[1].features */}
                      {(plan.tier === 'free' || plan.tier === 'starter') && j === 2 && (
                        <span className="pricing-feature-models">
                          {MODELS.map((m) => (
                            <img
                              key={m.label}
                              className="pricing-feature-model-icon"
                              src={`${import.meta.env.BASE_URL}${m.logo}`}
                              alt={m.label}
                              title={m.label}
                            />
                          ))}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <button type="button" className="pricing-cta" onClick={() => handleSelectPlan(plan)}>{isCurrentPlan ? p.currentPlanCta : plan.cta} {ARROW_ICON}</button>
            </div>
            );
          })}
        </div>

        <div className="pricing-foot-note">
          <span className="pricing-foot-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
              <path d="M12 2a7 7 0 0 0-7 7v4a2 2 0 0 0 2 2h1v-6H6v-1a6 6 0 0 1 12 0v1h-2v6h1a2 2 0 0 0 2-2v-1a7 7 0 0 0-1-3.6V9a7 7 0 0 0-6-7Z" />
              <path d="M20 15v1a4 4 0 0 1-4 4h-2" />
            </svg>
            {p.footNote} <a href={`/${lang}/demo`} className="pricing-foot-btn">{p.footNoteLink}</a>
          </span>
        </div>

        {/* ============ CREDIT CALCULATOR ============ */}
        <CreditCalculatorPanel
          c={p.calculator}
          plans={plans}
          agencyLabel={p.compare.agencyLabel}
          onRecommend={scrollToPlan}
        />

        {/* ============ COMPARISON TABLE ============ */}
        <div className="pricing-compare-wrap">

          <div id="pricing-agency-banner" className={`pricing-agency-banner${highlightTier === 'agency' ? ' calc-highlight' : ''}`}>
            <div className="pricing-agency-left">
              <div className="pricing-agency-eyebrow">{p.agency.eyebrow}</div>
              <h3 className="pricing-agency-title">{p.agency.title}</h3>
              <p className="pricing-agency-desc">{p.agency.desc}</p>
              <p className="pricing-agency-price">{p.agency.priceAnchor}</p>
              <a href={`/${lang}/demo`} className="pricing-agency-cta">{p.agency.cta} {ARROW_ICON}</a>
            </div>
            <div className="pricing-agency-right">
              <div className="pricing-agency-everything">{p.agency.everythingIn}</div>
              <div className="pricing-agency-tiles">
                {p.agency.features.map((f, i) => (
                  <div key={i} className="pricing-agency-tile">
                    <span className="pricing-agency-tile-icon">{AGENCY_ICONS[i]}</span>
                    <span className="pricing-agency-tile-label">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pricing-compare-heading">
            <h2>{p.compare.title}</h2>
            <p>{p.compare.subtitle}</p>
          </div>

          <div className="pricing-compare-table">

            <div className="pricing-compare-heading-row">
              <div className="pricing-col-label">{p.compare.coreFeatures}</div>
              {plans.map((plan) => (
                <div key={plan.name} className="pricing-plan-col-head">{plan.name} <span className="pricing-dot">•</span> <b>{symbol}{priceFor(plan, false)}</b>/mo</div>
              ))}
              <div className="pricing-plan-col-head">{p.compare.agencyLabel} <span className="pricing-dot">•</span> <b>{p.compare.agencyPrice}</b></div>
            </div>

            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.modelsLabel}<small>{p.compare.modelsSub}</small></div>
              <ModelCell webModels={FREE_MODELS} apiModels={[]} c={p.compare} />
              {[1, 2, 3, 4].map((i) => (
                <ModelCell key={i} webModels={WEB_INTERFACE_MODELS} apiModels={API_INTEGRATION_MODELS} c={p.compare} />
              ))}
            </div>

            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.promptsTrackedLabel}<small>{p.compare.promptsTrackedSub}</small></div>
              {['10', '100', '500', '1,000', p.compare.custom].map((v, i) => (
                <div key={i} className="pricing-cell">{v}</div>
              ))}
            </div>

            <CompareSection title={p.compare.volumeTitle}>
              <div className="pricing-compare-row">
                <div className="pricing-row-label">{p.compare.creditsLabel}</div>
                {['—', '300', '1,500', '3,000', p.compare.custom].map((v, i) => (
                  <div key={i} className="pricing-cell">
                    {v === '—' ? <span className="pricing-check-dash">—</span> : v}
                  </div>
                ))}
              </div>

              <div className="pricing-compare-row">
                <div className="pricing-row-label">{p.compare.modelsCountLabel}</div>
                <div className="pricing-cell">2</div>
                {[1, 2, 3, 4].map((i) => <div key={i} className="pricing-cell">{p.compare.anyCombination}</div>)}
              </div>

              <div className="pricing-compare-row">
                <div className="pricing-row-label">{p.compare.projectsLabel}</div>
                <div className="pricing-cell">1</div>
                {[1, 2, 3].map((i) => <div key={i} className="pricing-cell">{p.compare.multipleCreditLimited}</div>)}
                <div className="pricing-cell">{p.compare.unlimited}</div>
              </div>

              <div className="pricing-compare-row">
                <div className="pricing-row-label">{p.compare.zonesLabel}</div>
                <div className="pricing-cell">{p.compare.zonesFree}</div>
                {[1, 2, 3].map((i) => <div key={i} className="pricing-cell">{p.compare.multipleCreditLimited}</div>)}
                <div className="pricing-cell">{p.compare.unlimited}</div>
              </div>

              <div className="pricing-compare-row">
                <div className="pricing-row-label">{p.compare.cadenceLabel}</div>
                <div className="pricing-cell">{p.compare.daily}</div>
                {[1, 2, 3, 4].map((i) => <div key={i} className="pricing-cell">{p.compare.anyCadence}</div>)}
              </div>
              <CheckRow label={p.compare.premiumModelLabel} values={[false, true, true, true, true]} />
            </CompareSection>

            <CompareSection title={p.compare.platformTitle}>
              <CheckRow label={p.compare.enginesLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.languagesLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.teamMembersLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.exportsLabel} values={[true, true, true, true, true]} />
            </CompareSection>

            <CompareSection title={p.compare.dashboardTitle}>
              <CheckRow label={p.compare.overviewLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.geoMatrixLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.benchmarkingLabel} values={[true, true, true, true, true]} />
            </CompareSection>

            <CompareSection title={p.compare.monitorTitle}>
              <CheckRow label={p.compare.promptTrackingLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.responseAnalysisLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.mentionsLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.sourceExplorerLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.insightsLabel} values={[true, true, true, true, true]} />
            </CompareSection>

            <CompareSection title={p.compare.analyzeTitle}>
              <CheckRow label={p.compare.sentimentScoreLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.perceptionLabel} values={[true, true, true, true, true]} />
            </CompareSection>

            <CompareSection title={p.compare.actTitle}>
              <CheckRow label={p.compare.contentOppsLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.backlinkOppsLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.contentStudioLabel} values={[true, true, true, true, true]} />
            </CompareSection>

            <CompareSection title={p.compare.auditTitle}>
              <CheckRow label={p.compare.siteReadinessLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.siteDiagnosticsLabel} values={[true, true, true, true, true]} />
            </CompareSection>

            <CompareSection title={p.compare.measureTitle}>
              <CheckRow label={p.compare.gscLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.pagePerfLabel} values={[true, true, true, true, true]} />
              <CheckRow label={p.compare.crawlerAnalyticsLabel} values={[true, true, true, true, true]} />
            </CompareSection>

            <CompareSection title={p.compare.integrationsTitle}>
              <CheckRow label={p.compare.virtualTeamsLabel} values={[false, true, true, true, true]} />
            </CompareSection>

            <CompareSection title={p.compare.supportTitle}>
              <div className="pricing-compare-row">
                <div className="pricing-row-label">{p.compare.supportChannelsLabel}</div>
                <div className="pricing-cell">{p.compare.chatsOnly}</div>
                <div className="pricing-cell">{p.compare.chatsEmail}</div>
                <div className="pricing-cell">{p.compare.chatsEmail}</div>
                <div className="pricing-cell">{p.compare.dedicated}</div>
                <div className="pricing-cell">{p.compare.dedicatedManager}</div>
              </div>
              <div className="pricing-compare-row">
                <div className="pricing-row-label">{p.compare.slackLabel}</div>
                {[false, true, true, true, true].map((yes, i) => (
                  <div key={i} className="pricing-cell">{yes ? <span className="pricing-check-yes">{CHECK_ICON}</span> : <span className="pricing-check-no">{X_ICON}</span>}</div>
                ))}
              </div>
            </CompareSection>

            <div className="pricing-compare-buttons-row">
              <div />
              {plans.map((plan) => (
                <button
                  key={plan.name}
                  type="button"
                  className={`pricing-plan-btn${plan.popular ? ' popular' : ''}`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.tier === currentTier ? p.currentPlanCta : plan.tableCta} {ARROW_ICON}
                </button>
              ))}
              <a href={`/${lang}/demo`} className="pricing-plan-btn">
                {p.compare.agencyCta} {ARROW_ICON}
              </a>
            </div>

          </div>
        </div>

        {/* ============ FAQ ============ */}
        <div className="pricing-faq-wrap">
          <h2 className="pricing-faq-title">{p.faqTitle}</h2>
          <div className="pricing-faq-list">
            {p.faq.map((item, i) => (
              <PricingFaqItem
                key={i}
                item={item}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>

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
