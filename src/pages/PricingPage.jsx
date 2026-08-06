import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import PlanCheckoutModal from '../components/PlanCheckoutModal';
import { useLang } from '../contexts/LangContext';
import { hasAccountCookie, currentPlanTierCookie } from '../lib/hasAccountCookie';
import { APP_URL } from '../lib/appUrl';
import '../pricing.css';

const HL = ({ children }) => <span className="hl">{children}</span>;

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

// One distinct icon per agency feature — order matches p.agency.features.
const AGENCY_ICONS = [
  <svg key="layers" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 10 5-10 5L2 7l10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>,
  <svg key="globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20Z"/></svg>,
  <svg key="card" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/></svg>,
  <svg key="manager" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m17 11 2 2 4-4"/></svg>,
];

// Square icon-only marks (see public/*-logo.png).
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
const FREE_MODELS = [MODELS[0], MODELS[5]];

function ModelBadge({ model }) {
  return (
    <span className="pricing-model-badge">
      <img className="pricing-model-img" src={`${import.meta.env.BASE_URL}${model.logo}`} alt="" />
      {model.label}
    </span>
  );
}

// Numeric/structural plan data — not translatable, paired by index with
// the copy in locales/*.js `pricing.plans`. `tier` is the backend's
// billing_pricing_catalog.plan_tier slug — the free tier isn't purchasable
// through Stripe checkout (see app/api/v2/public_checkout.py), so its CTA
// routes straight to the app instead of opening the checkout modal.
const PLAN_META = [
  { tier: 'free',    monthly: 0,   annual: 0,   eurMonthly: 0,   eurAnnual: 0,   coveragePct: 5,   popular: false },
  { tier: 'starter', monthly: 29,  annual: 23,  eurMonthly: 27,  eurAnnual: 21,  coveragePct: 10,  popular: false, firstMonthCredits: '600' },
  { tier: 'growth',  monthly: 99,  annual: 79,  eurMonthly: 92,  eurAnnual: 73,  coveragePct: 50,  popular: true,  firstMonthCredits: '3,000' },
  { tier: 'pro',     monthly: 189, annual: 151, eurMonthly: 175, eurAnnual: 140, coveragePct: 100, popular: false, firstMonthCredits: '6,000' },
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
  const p = t('pricing');

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

      <Hero
        eyebrow={p.hero.eyebrow}
        title={<>{p.hero.titlePre}<br /><HL>{p.hero.titleHl}</HL></>}
        lead={p.hero.lead}
        primaryCta={p.hero.primaryCta}
        secondaryCta={p.hero.secondaryCta}
        note={p.hero.note}
        showDashboard={false}
        showAiBand={false}
      />

      <div className="pricing-wrap">

        <div className="pricing-toggle-wrap">
          <div className="pricing-currency-switch">
            <button type="button" className={`pricing-currency-btn${!annual ? ' active' : ''}`} onClick={() => setAnnual(false)}>
              {p.billing.monthly}
            </button>
            <button type="button" className={`pricing-currency-btn${annual ? ' active' : ''}`} onClick={() => setAnnual(true)}>
              {p.billing.annual} <span className="pricing-save-badge">{p.billing.save}</span>
            </button>
          </div>

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

        <div className="pricing-grid">
          {plans.map((plan) => {
            const isCurrentPlan = plan.tier === currentTier;
            return (
            <div key={plan.name} className={`pricing-card${plan.popular ? ' popular' : ''}`}>
              {isCurrentPlan ? (
                <span className="pricing-badge-popular">{p.currentPlan}</span>
              ) : (
                plan.popular && <span className="pricing-badge-popular">{p.mostPopular}</span>
              )}
              <div className="pricing-plan-name">{plan.name}</div>
              <div className="pricing-plan-desc">{plan.desc}</div>
              <div className="pricing-price-row">
                <span className="pricing-price">{symbol}{priceFor(plan, annual)}</span>
                <span className="pricing-price-period">/mo</span>
              </div>
              {annual && plan.tier !== 'free' && (
                <div className="pricing-billed-annually">
                  {p.billing.billedAnnually.replace('{amount}', `${symbol}${annualTotalFor(plan)}`)}
                </div>
              )}
              {plan.firstMonthCredits ? (
                <span className="pricing-first-month-badge">
                  <span className="pricing-first-month-dot" />
                  {p.firstMonthPromo.replace('{credits}', plan.firstMonthCredits)}
                </span>
              ) : (
                <div className="pricing-price-annual-note">&nbsp;</div>
              )}
              <div className="pricing-coverage">
                <div className="pricing-coverage-label"><span>{p.coverage}</span><span>{plan.coverageLabel}</span></div>
                <div className="pricing-coverage-track"><div className="pricing-coverage-fill" style={{ width: `${plan.coveragePct}%` }} /></div>
              </div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                {plan.features.map((f, j) => <li key={j}>{CHECK_ICON}{f}</li>)}
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

        {/* ============ COMPARISON TABLE ============ */}
        <div className="pricing-compare-wrap">

          <div className="pricing-agency-banner">
            <div className="pricing-agency-left">
              <div className="pricing-agency-eyebrow">{p.agency.eyebrow}</div>
              <h3 className="pricing-agency-title">{p.agency.title}</h3>
              <p className="pricing-agency-desc">{p.agency.desc}</p>
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
            </div>

            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.modelsLabel}<small>{p.compare.modelsSub}</small></div>
              <div className="pricing-cell models">{FREE_MODELS.map((m) => <ModelBadge key={m.label} model={m} />)}</div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="pricing-cell models">{MODELS.map((m) => <ModelBadge key={m.label} model={m} />)}</div>
              ))}
            </div>

            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.aiShoppingLabel} <span className="pricing-tag-chip">{p.compare.aiShoppingTag}</span></div>
              {plans.map((plan, i) => (
                <div key={i} className="pricing-cell">
                  {i === 0 ? <span className="pricing-check-no">{X_ICON}</span> : <span className="pricing-check-yes">{CHECK_ICON}</span>}
                </div>
              ))}
            </div>

            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.creditsLabel}</div>
              {['—', '300', '1,500', '3,000'].map((v, i) => (
                <div key={i} className="pricing-cell">
                  {v === '—' ? <span className="pricing-check-dash">—</span> : v}
                </div>
              ))}
            </div>

            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.modelsCountLabel}</div>
              <div className="pricing-cell">2</div>
              {[1, 2, 3].map((i) => <div key={i} className="pricing-cell">{p.compare.anyCombination}</div>)}
            </div>

            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.projectsLabel}</div>
              <div className="pricing-cell">1</div>
              {[1, 2, 3].map((i) => <div key={i} className="pricing-cell">{p.compare.multipleCreditLimited}</div>)}
            </div>

            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.zonesLabel}</div>
              <div className="pricing-cell">1</div>
              {[1, 2, 3].map((i) => <div key={i} className="pricing-cell">{p.compare.multipleCreditLimited}</div>)}
            </div>

            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.cadenceLabel}</div>
              <div className="pricing-cell">{p.compare.daily}</div>
              {[1, 2, 3].map((i) => <div key={i} className="pricing-cell">{p.compare.anyCadence}</div>)}
            </div>

            <div className="pricing-compare-section-title">{p.compare.integrationsTitle}</div>

            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.lookerLabel}</div>
              {[false, false, true, true].map((yes, i) => (
                <div key={i} className="pricing-cell">{yes ? <span className="pricing-check-yes">{CHECK_ICON}</span> : <span className="pricing-check-no">{X_ICON}</span>}</div>
              ))}
            </div>
            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.apiLabel}</div>
              {[false, false, false, true].map((yes, i) => (
                <div key={i} className="pricing-cell">{yes ? <span className="pricing-check-yes">{CHECK_ICON}</span> : <span className="pricing-check-no">{X_ICON}</span>}</div>
              ))}
            </div>
            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.mcpLabel}</div>
              {[false, true, true, true].map((yes, i) => (
                <div key={i} className="pricing-cell">{yes ? <span className="pricing-check-yes">{CHECK_ICON}</span> : <span className="pricing-check-no">{X_ICON}</span>}</div>
              ))}
            </div>
            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.ssoLabel}</div>
              {[false, false, false, true].map((yes, i) => (
                <div key={i} className="pricing-cell">{yes ? <span className="pricing-check-yes">{CHECK_ICON}</span> : <span className="pricing-check-no">{X_ICON}</span>}</div>
              ))}
            </div>

            <div className="pricing-compare-section-title">{p.compare.supportTitle}</div>

            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.supportChannelsLabel}</div>
              <div className="pricing-cell">{p.compare.chatsOnly}</div>
              <div className="pricing-cell">{p.compare.chatsEmail}</div>
              <div className="pricing-cell">{p.compare.chatsEmail}</div>
              <div className="pricing-cell">{p.compare.dedicated}</div>
            </div>
            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.slackLabel}</div>
              {[false, true, true, true].map((yes, i) => (
                <div key={i} className="pricing-cell">{yes ? <span className="pricing-check-yes">{CHECK_ICON}</span> : <span className="pricing-check-no">{X_ICON}</span>}</div>
              ))}
            </div>
            <div className="pricing-compare-row">
              <div className="pricing-row-label">{p.compare.onboardingLabel}</div>
              {[false, false, true, true].map((yes, i) => (
                <div key={i} className="pricing-cell">{yes ? <span className="pricing-check-yes">{CHECK_ICON}</span> : <span className="pricing-check-no">{X_ICON}</span>}</div>
              ))}
            </div>

            <div className="pricing-compare-buttons-row">
              <div />
              {plans.map((plan) => (
                <button
                  key={plan.name}
                  type="button"
                  className={`pricing-plan-btn${plan.popular ? ' popular' : ''}`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.tier === currentTier ? p.currentPlanCta : plan.cta} {ARROW_ICON}
                </button>
              ))}
            </div>

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
