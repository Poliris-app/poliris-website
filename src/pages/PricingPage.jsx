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

const MODELS = [
  { logo: 'chatgpt-com-logo.png', label: 'ChatGPT' },
  { logo: 'gemini-logo.png', label: 'Gemini' },
  { logo: 'claudeai-com-logo.png', label: 'Claude' },
  { logo: 'google-com-logo.png', label: 'AI Mode' },
  { logo: 'google-com-logo.png', label: 'AI Overviews' },
  { logo: 'perplexity-ai-logo.png', label: 'Perplexity' },
  { logo: 'mistral-ai-logo.png', label: 'Mistral' },
  { logo: 'grok-com-logo.png', label: 'Grok' },
  { logo: 'deepseek.png', label: 'DeepSeek' },
];
const FREE_MODELS = [MODELS[0], MODELS[1], MODELS[3], MODELS[4], MODELS[5]];
// Teaser icon set for the Free plan's "10 providers" bullet — a marketing
// preview of the full provider lineup (not FREE_MODELS' actual Free-tier
// access list), so the duplicate Google entry is swapped for Claude and
// the rest are collapsed into a "+N" chip instead of wrapping.
const FREE_FEATURE_MODELS = [MODELS[0], MODELS[1], MODELS[3], MODELS[2], MODELS[5]];
// Whatever's in MODELS but not already shown as an icon above — named in
// the "+N" chip's tooltip so the count and the list can't drift apart.
const FREE_FEATURE_MODELS_REST = MODELS.filter((m) => !FREE_FEATURE_MODELS.includes(m));
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

function ModelBadge({ model }) {
  return (
    <span className="pricing-model-badge">
      <img className="pricing-model-img" src={`${import.meta.env.BASE_URL}${model.logo}`} alt={model.label} width="17" height="17" />
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

/* ── The comparison table, as data ─────────────────────────────────
   Every `values` array is in column order: Free, Starter, Growth, Pro,
   Custom. The brand table draws all five columns; the agency table draws
   the Starter, Growth and Pro ones under agency names and prices. Having
   one set of rows is what keeps the two tables identical row for row —
   a feature added here shows up in both. */
const BRAND_COLS = [0, 1, 2, 3, 4];
const AGENCY_COLS = [1, 2, 3];

const textRow = (label, values, sub) => ({ label, sub, values });
const checkRow = (label, values) => ({ label, values, check: true });
// Most rows are "everyone gets this".
const allYes = (label) => checkRow(label, [true, true, true, true, true]);

function buildCompareRows(c) {
  const paid = { web: WEB_INTERFACE_MODELS, api: API_INTEGRATION_MODELS };
  return [
    {
      label: c.modelsLabel,
      sub: c.modelsSub,
      models: true,
      values: [{ web: FREE_MODELS, api: [] }, paid, paid, paid, paid],
    },
    textRow(c.promptsTrackedLabel, ['10', '100', '500', '1,000', c.custom], c.promptsTrackedSub),

    { section: c.volumeTitle, rows: [
      textRow(c.creditsLabel, ['—', '300', '1,500', '3,000', c.custom]),
      textRow(c.modelsCountLabel, ['2', c.anyCombination, c.anyCombination, c.anyCombination, c.anyCombination]),
      textRow(c.projectsLabel, ['1', c.multipleProjects, c.multipleProjects, c.multipleProjects, c.unlimited]),
      textRow(c.zonesLabel, [c.zonesFree, c.multipleZones, c.multipleZones, c.multipleZones, c.unlimited]),
      textRow(c.cadenceLabel, [c.daily, c.anyCadence, c.anyCadence, c.anyCadence, c.anyCadence]),
      checkRow(c.premiumModelLabel, [false, true, true, true, true]),
    ] },

    { section: c.platformTitle, rows: [c.enginesLabel, c.languagesLabel, c.teamMembersLabel, c.exportsLabel].map(allYes) },
    { section: c.dashboardTitle, rows: [c.overviewLabel, c.geoMatrixLabel, c.benchmarkingLabel].map(allYes) },
    { section: c.monitorTitle, rows: [c.promptTrackingLabel, c.responseAnalysisLabel, c.mentionsLabel, c.sourceExplorerLabel, c.insightsLabel].map(allYes) },
    { section: c.analyzeTitle, rows: [c.sentimentScoreLabel, c.perceptionLabel].map(allYes) },
    { section: c.actTitle, rows: [c.contentOppsLabel, c.backlinkOppsLabel, c.contentStudioLabel].map(allYes) },
    { section: c.auditTitle, rows: [c.siteReadinessLabel, c.siteDiagnosticsLabel].map(allYes) },
    { section: c.measureTitle, rows: [c.gscLabel, c.pagePerfLabel, c.crawlerAnalyticsLabel].map(allYes) },
    { section: c.integrationsTitle, rows: [checkRow(c.virtualTeamsLabel, [false, true, true, true, true])] },

    { section: c.supportTitle, rows: [
      checkRow(c.slackLabel, [false, true, true, true, true]),
    ] },
  ];
}

function CompareRow({ row, cols, c }) {
  return (
    <div className="pricing-compare-row">
      <div className="pricing-row-label">{row.label}{row.sub && <small>{row.sub}</small>}</div>
      {cols.map((i) => {
        const v = row.values[i];
        if (row.models) return <ModelCell key={i} webModels={v.web} apiModels={v.api} c={c} />;
        if (row.check) {
          return (
            <div key={i} className="pricing-cell">
              {v ? <span className="pricing-check-yes">{CHECK_ICON}</span> : <span className="pricing-check-no">{X_ICON}</span>}
            </div>
          );
        }
        return <div key={i} className="pricing-cell">{v === '—' ? <span className="pricing-check-dash">—</span> : v}</div>;
      })}
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

  let recommendedTier = 'custom';
  if (estimated <= 300) recommendedTier = 'starter';
  else if (estimated <= 1500) recommendedTier = 'growth';
  else if (estimated <= 3000) recommendedTier = 'pro';
  const recommendedPlan = plans.find((pl) => pl.tier === recommendedTier);
  // Custom has no fixed monthly allotment, so there's nothing to subtract
  // the estimate from — spareCredits stays null.
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
                  <img src={`${import.meta.env.BASE_URL}${m.logo}`} alt={m.label} width="18" height="18" />
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
                  <img src={`${import.meta.env.BASE_URL}${m.logo}`} alt={m.label} width="18" height="18" />
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
                {c.fitsPre} {recommendedTier === 'custom' ? agencyLabel : recommendedPlan.name}
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
            {recommendedTier === 'custom' ? c.recommendedCtaAgency : c.recommendedCtaPlan.replace('{plan}', recommendedPlan.name)}
            {ARROW_ICON}
          </button>
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
  // coveragePct is a stepped visual tier, not the exact credit ratio — at
  // true scale (600 vs 6,000) Starter's bar was indistinguishable from Free's
  // stub. The exact credits are printed right above each bar.
  { tier: 'free',    monthly: 0,   annual: 0,   eurMonthly: 0,   eurAnnual: 0,   coveragePct: 6,   popular: false },
  { tier: 'starter', monthly: 29,  annual: 23,  eurMonthly: 27,  eurAnnual: 21,  coveragePct: 25,  popular: false, monthlyCredits: '300',   firstMonthCredits: '600' },
  { tier: 'growth',  monthly: 99,  annual: 79,  eurMonthly: 92,  eurAnnual: 73,  coveragePct: 60,  popular: true,  monthlyCredits: '1,500', firstMonthCredits: '3,000' },
  { tier: 'pro',     monthly: 189, annual: 151, eurMonthly: 175, eurAnnual: 140, coveragePct: 100, popular: false, monthlyCredits: '3,000', firstMonthCredits: '6,000' },
];

const modelIcon = (m) => (
  <img
    key={m.label}
    className="pricing-feature-model-icon"
    src={`${import.meta.env.BASE_URL}${m.logo}`}
    alt={m.label}
    title={m.label}
    width="16"
    height="16"
  />
);

// currency/annual now flow through to checkout (see PlanCheckoutModal) —
// the backend has real Stripe prices per (plan_tier, currency,
// billing_interval), see app/api/v2/public_checkout.py.
const CURRENCIES = { usd: { symbol: '$', label: 'USD', code: 'USD' }, eur: { symbol: '€', label: 'EUR', code: 'EUR' } };

/* ── Agency pricing ────────────────────────────────────────────────
   Everything about agency pricing is set here.

   AGENCY_DISCOUNT is the single value to change: each agency tier is
   the matching brand tier's monthly price less this share, in whichever
   currency is showing. At 0.25 that is $21.75 / $74.25 / $141.75 and
   €20.25 / €69 / €131.25.

   The tier NAMES are copy, not code — pricing.agencyView.tiers in
   src/locales/en.js and fr.js. AGENCY_TIER_SOURCE only says which brand
   tier each one mirrors for its credits and feature rows.

   Agency plans are not self-serve: there are no Stripe prices behind
   them and no checkout, which is why nothing here feeds
   PlanCheckoutModal. They are unlocked by Poliris partners and admins,
   so the only action is booking a call. */
const AGENCY_DISCOUNT = 0.25;
const AGENCY_TIER_SOURCE = ['starter', 'growth', 'pro'];
// The Agency Pack's own monthly price, on top of the per-client tiers.
const AGENCY_PACK_PRICE = { usd: 69, eur: 64 };
const AGENCY_COMING_SOON_INDEX = 1;
// Same booking link the hero and the CTA band use.
const BOOKING_URL = 'https://cal.com/team/poliris/discovery-call';

// Brand prices are whole numbers; the agency discount makes fractions, and
// the page shows exactly what gets billed — so .25 stays, .00 does not.
const formatPrice = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

export default function PricingPage() {
  const { lang, t } = useLang();
  const [annual, setAnnual] = useState(false);
  const [currency, setCurrency] = useState('usd');
  // 'brands' is the default view; 'agencies' swaps the plans for the
  // Agency Pack and its per-client tiers.
  const [audience, setAudience] = useState('brands');
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [currentTier, setCurrentTier] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [highlightTier, setHighlightTier] = useState(null);
  const highlightTimeoutRef = useRef(null);
  const p = t('pricing');

  // Scrolls to and briefly pulses the matching plan card — used by the
  // calculator's "Get {plan}" CTA so the recommendation is a click, not
  // just a label. Above Pro it lands on the Custom card.
  const scrollToPlan = (tier) => {
    const el = document.getElementById(`pricing-card-${tier}`);
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
  const agencyView = audience === 'agencies';
  const cols = agencyView ? AGENCY_COLS : BRAND_COLS;
  const compareRows = buildCompareRows(p.compare);

  // Each agency tier is the brand tier it mirrors, less AGENCY_DISCOUNT,
  // in the currency on screen. Monthly only — there is no annual agency
  // price yet, so the Annual switch leaves these alone.
  const agencyTiers = AGENCY_TIER_SOURCE.map((tier, i) => {
    const base = PLAN_META.find((m) => m.tier === tier);
    const full = currency === 'eur' ? base.eurMonthly : base.monthly;
    return { name: p.agencyView.tiers[i], price: formatPrice(full * (1 - AGENCY_DISCOUNT)) };
  });
  const packPrice = AGENCY_PACK_PRICE[currency];
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
          <h1 className="eyebrow">{p.hero.eyebrow}</h1>
        </div>

        <div className="pricing-audience-switch" role="tablist" aria-label={p.audience.label}>
          {[['brands', p.audience.brands], ['agencies', p.audience.agencies]].map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={audience === key}
              className={`pricing-audience-btn${audience === key ? ' active' : ''}`}
              onClick={() => setAudience(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="pricing-toggle-wrap">
          <div className="pricing-billing-switch" role="radiogroup" aria-label={p.billing.label}>
            <button
              type="button"
              role="radio"
              aria-checked={!annual}
              className={`pricing-billing-opt${!annual ? ' active' : ''}`}
              onClick={() => setAnnual(false)}
            >
              {p.billing.monthly}
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={annual}
              className={`pricing-billing-opt${annual ? ' active' : ''}`}
              onClick={() => setAnnual(true)}
            >
              {p.billing.annual}
              <span className="pricing-save-badge">{p.billing.saveShort}</span>
            </button>
          </div>
        </div>

        {/* Two currencies, so the switch is just a link to the other one. */}
        <p className="pricing-currency-note">
          {p.billing.currencyNote.replace('{code}', CURRENCIES[currency].code)}
          {' · '}
          {Object.entries(CURRENCIES).filter(([code]) => code !== currency).map(([code, c]) => (
            <button key={code} type="button" className="pricing-currency-link" onClick={() => setCurrency(code)}>
              {p.billing.switchCurrency.replace('{code}', c.code)}
            </button>
          ))}
        </p>

        {/* The brands view: plan cards, the calculator and the five-column
            table. The agencies view replaces the cards and the calculator
            with the Agency Pack and its per-client tiers. */}
        {!agencyView && (
          <>

        {/* Plan cards: one per plan (Custom last), with a credits meter
            and the feature list. Each keeps the pricing-card-{tier} id so
            the calculator's "Get {plan}" CTA can scroll to and pulse it. */}
        <div className="pricing-cards">
          {plans.map((plan) => {
            const isCurrentPlan = plan.tier === currentTier;
            return (
              <div
                key={plan.tier}
                id={`pricing-card-${plan.tier}`}
                className={`pricing-card${plan.popular ? ' popular' : ''}${highlightTier === plan.tier ? ' calc-highlight' : ''}`}
              >
                <div className="pricing-plan-head">
                  <div className="pricing-plan-name">{plan.name}</div>
                  {isCurrentPlan ? (
                    <span className="pricing-badge-popular">{p.currentPlan}</span>
                  ) : (
                    plan.popular && <span className="pricing-badge-popular">{p.mostPopular}</span>
                  )}
                </div>
                <p className="pricing-card-desc">{plan.desc}</p>
                <div className="pricing-card-price">
                  {/* Both numbers are stacked, monthly over annual, in a
                      one-line window after the currency sign, which stays
                      put; the Annual switch rolls the stack up to the
                      annual price and back down for monthly. */}
                  {priceFor(plan, false) === priceFor(plan, true) ? (
                    <span className="pricing-card-amount">{symbol}{priceFor(plan, false)}</span>
                  ) : (
                    <span className="pricing-card-amount">
                      {symbol}
                      <span className={`pricing-card-roll${annual ? ' is-annual' : ''}`}>
                        <span className="pricing-card-roll-track">
                          <span aria-hidden={annual}>{priceFor(plan, false)}</span>
                          <span aria-hidden={!annual}>{priceFor(plan, true)}</span>
                        </span>
                      </span>
                    </span>
                  )}
                  <span className="pricing-price-period">/mo</span>
                  {/* Always rendered (blank when monthly) so the cards don't
                      jump in height when the Annual switch is flipped. */}
                  <span className="pricing-card-billed">
                    {annual && plan.tier !== 'free'
                      ? p.billing.billedAnnually.replace('{amount}', `${symbol}${annualTotalFor(plan)}`)
                      : ' '}
                  </span>
                </div>
                <div className="pricing-card-meter">
                  <div className="pricing-card-meter-head">
                    <span>{plan.monthlyCredits ? p.cards.credits.replace('{n}', plan.monthlyCredits) : plan.coverageLabel}</span>
                    {plan.monthlyCredits && <span className="pricing-card-meter-tag">{p.cards.bonus.replace('{n}', plan.monthlyCredits)}</span>}
                  </div>
                  {/* Paid plans split the bar into base credits and the
                      matching first-month bonus, as the old cards did. */}
                  <div className="pricing-card-meter-bar">
                    {plan.monthlyCredits ? (
                      <>
                        <span style={{ width: `${plan.coveragePct / 2}%` }} />
                        <span className="is-bonus" style={{ width: `${plan.coveragePct / 2}%` }} />
                      </>
                    ) : (
                      <span style={{ width: `${plan.coveragePct}%` }} />
                    )}
                  </div>
                </div>
                <button type="button" className={`pricing-cta${plan.popular ? ' primary' : ''}`} onClick={() => handleSelectPlan(plan)}>
                  {isCurrentPlan ? p.currentPlanCta : plan.cta} {ARROW_ICON}
                </button>
                <ul className="pricing-card-features">
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      {CHECK_ICON}
                      <span>
                        {plan.featureTooltips?.[j] ? (
                          <span className="pricing-feature-info-wrap" tabIndex={0}>
                            {f}
                            <span className="pricing-feature-info-tooltip" role="tooltip">{plan.featureTooltips[j]}</span>
                          </span>
                        ) : f}
                        {/* 3rd feature on Free ("10 providers") and Starter
                            ("Access to all API models"): Free gets a 5-logo
                            teaser plus a "+N" chip, Starter every provider. */}
                        {plan.tier === 'free' && j === 2 && (
                          <span className="pricing-feature-models">
                            {FREE_FEATURE_MODELS.map(modelIcon)}
                            <span className="pricing-feature-model-more-wrap" tabIndex={0}>
                              <span className="pricing-feature-model-more">+{FREE_FEATURE_MODELS_REST.length}</span>
                              <span className="pricing-feature-model-tooltip" role="tooltip">
                                {FREE_FEATURE_MODELS_REST.map((m) => m.label).join(', ')}
                              </span>
                            </span>
                          </span>
                        )}
                        {plan.tier === 'starter' && j === 2 && (
                          <span className="pricing-feature-models">{MODELS.map(modelIcon)}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {/* Nothing is priced behind Custom in Stripe, so its CTA books
              a call instead of opening checkout. */}
          <div id="pricing-card-custom" className={`pricing-card${highlightTier === 'custom' ? ' calc-highlight' : ''}`}>
            <div className="pricing-plan-head">
              <div className="pricing-plan-name">{p.customPlan.name}</div>
            </div>
            <p className="pricing-card-desc">{p.customPlan.desc}</p>
            <div className="pricing-card-price">
              <span className="pricing-card-amount pricing-card-amount--word">{p.customPlan.price}</span>
            </div>
            <div className="pricing-card-meter">
              <div className="pricing-card-meter-head">
                <span>{p.cards.custom.meter}</span>
                <span className="pricing-card-meter-tag">{p.cards.custom.meterTag}</span>
              </div>
              <div className="pricing-card-meter-bar is-open"><span /></div>
            </div>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="pricing-cta">
              {p.customPlan.cta} {ARROW_ICON}
            </a>
            <ul className="pricing-card-features">
              {p.customPlan.features.map((f) => <li key={f}>{CHECK_ICON}<span>{f}</span></li>)}
            </ul>
          </div>
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
          agencyLabel={p.customPlan.name}
          onRecommend={scrollToPlan}
        />
          </>
        )}

        {/* ============ COMPARISON TABLE ============ */}
        <div className="pricing-compare-wrap">

          {agencyView && (
            <div className="pricing-agency-pack">
              <div className="pricing-agency-pack-head">
                <h2 className="pricing-agency-pack-title">{p.agencyView.packTitle}</h2>
                <div className="pricing-agency-pack-price">
                  <span className="pricing-price">{symbol}{packPrice}</span>
                  <span className="pricing-price-period">{p.agencyView.perMonth}</span>
                </div>
              </div>
              <p className="pricing-agency-pack-desc">{p.agencyView.packDesc}</p>
              <div className="pricing-agency-pack-included">{p.agencyView.includedTitle}</div>
              <ul className="pricing-agency-pack-list">
                {p.agencyView.includes.map((item, i) => (
                  <li key={i}>
                    {CHECK_ICON}
                    <span>
                      {item}
                      {i === AGENCY_COMING_SOON_INDEX && (
                        <span className="pricing-soon-chip">{p.agencyView.comingSoon}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              {/* Agency accounts are opened by a partner, never self-serve,
                  so booking a call is the only action on this page. */}
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="pricing-cta pricing-agency-pack-cta">
                {p.agencyView.cta} {ARROW_ICON}
              </a>
            </div>
          )}

          <div className="pricing-compare-heading">
            <h2>{p.compare.title}</h2>
            <p>{p.compare.subtitle}</p>
          </div>

          <div
            className={`pricing-compare-table${agencyView ? ' pricing-compare-table--agency' : ''}`}
            style={{ '--pr-cols': cols.length }}
          >

            <div className="pricing-compare-heading-row">
              <div className="pricing-col-label">{p.compare.coreFeatures}</div>
              {agencyView ? (
                agencyTiers.map((tier) => (
                  <div key={tier.name} className="pricing-plan-col-head">
                    {tier.name} <span className="pricing-dot">•</span> <b>{symbol}{tier.price}</b>{p.agencyView.perClientShort}
                  </div>
                ))
              ) : (
                <>
                  {plans.map((plan) => (
                    <div key={plan.name} className="pricing-plan-col-head">{plan.name} <span className="pricing-dot">•</span> <b>{symbol}{priceFor(plan, false)}</b>/mo</div>
                  ))}
                  <div className="pricing-plan-col-head">{p.customPlan.name} <span className="pricing-dot">•</span> <b>{p.compare.custom}</b></div>
                </>
              )}
            </div>

            {compareRows.map((entry, i) => (entry.section ? (
              <CompareSection key={i} title={entry.section}>
                {entry.rows.map((row, j) => <CompareRow key={j} row={row} cols={cols} c={p.compare} />)}
              </CompareSection>
            ) : (
              <CompareRow key={i} row={entry} cols={cols} c={p.compare} />
            )))}

            {/* Agency tiers carry no CTA of their own: they are unlocked by a
                partner, so the card's "Book a call" is the only action. */}
            {!agencyView && (
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
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="pricing-plan-btn">
                  {p.customPlan.cta} {ARROW_ICON}
                </a>
              </div>
            )}

          </div>

          {agencyView ? (
            <div className="pricing-agency-notes">
              <p>{p.agencyView.perClientNote}</p>
              {/* No annual agency pricing exists yet, so the Annual switch
                  leaves these prices alone and says so. */}
              {annual && <p className="pricing-agency-monthly-note">{p.agencyView.monthlyOnly}</p>}
            </div>
          ) : (
            <p className="pricing-agency-link-line">
              {p.agencyLink.text}{' '}
              <button type="button" className="pricing-agency-link-btn" onClick={() => setAudience('agencies')}>
                {p.agencyLink.cta}
              </button>
            </p>
          )}
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
