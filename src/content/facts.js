// Product facts stated in more than one place (pricing cards, comparison
// table, calculator, Offer schema). Edit them here only.
//
// Only numbers and identifiers live here. Sentences that quote these facts
// (FAQ answers, glossary entries, blog posts) stay in src/locales/*.js
// because Tolgee manages those strings: it overlays them at runtime and
// scripts/tolgee-sync.mjs rewrites them as plain string literals, so a value
// templated into a locale string would be overwritten.
//
// Open contradictions on the live site, not resolved here (each needs a
// product decision before any copy changes):
//   TODO(verify) Engines: home + comparison post name 10, home FAQ and
//     /faqs name 7, pricing offers 8 selectable ("10+ AI Models").
//   TODO(verify) Technical tests: home "150+", /technical-audit 150 and 140,
//     docs 158 (121 per page, 37 site-level).
//   TODO(verify) Impact levels: /technical-audit says 4, /faqs says 3.
//   TODO(verify) Plan names: /faqs and the glossary still name
//     Starter / Growth / Scale; pricing and docs use Free / Starter /
//     Growth / Pro / Custom.
//   TODO(verify) Prompts per plan: the comparison post says 100 / 500 / 1,000,
//     pricing says up to 300 / 1,500 / 3,000.

/**
 * @typedef {object} PlanMeta
 * @property {'free'|'starter'|'growth'|'pro'} tier  Backend billing_pricing_catalog.plan_tier slug.
 * @property {number} monthly      USD per month, monthly billing.
 * @property {number} annual       USD per month, annual billing.
 * @property {number} eurMonthly   EUR per month, monthly billing.
 * @property {number} eurAnnual    EUR per month, annual billing.
 * @property {boolean} popular
 * @property {string} [monthlyCredits]     Display string, en-US grouping.
 * @property {string} [firstMonthCredits]  Always double monthlyCredits (welcome bonus).
 */

// Paired by index with the copy in locales/*.js `pricing.brandView.plans`.
// The free tier isn't purchasable through Stripe checkout (see the backend's
// app/api/v2/public_checkout.py), so its CTA goes straight to the app.
// firstMonthCredits is kept as its own field so the badge can spell out
// "300 + 300 = 600" instead of just the total.
/** @type {PlanMeta[]} */
export const PLAN_META = [
  { tier: 'free',    monthly: 0,   annual: 0,   eurMonthly: 0,   eurAnnual: 0,     popular: false },
  { tier: 'starter', monthly: 29,  annual: 23,  eurMonthly: 27,  eurAnnual: 21,   popular: false, monthlyCredits: '300',   firstMonthCredits: '600' },
  { tier: 'growth',  monthly: 99,  annual: 79,  eurMonthly: 92,  eurAnnual: 73,   popular: true,  monthlyCredits: '1,500', firstMonthCredits: '3,000' },
  { tier: 'pro',     monthly: 189, annual: 151, eurMonthly: 175, eurAnnual: 140, popular: false, monthlyCredits: '3,000', firstMonthCredits: '6,000' },
];

/** Monthly credits of a tier as a number (0 when the tier has none). */
export const creditsOf = (tier) => {
  const s = PLAN_META.find((p) => p.tier === tier)?.monthlyCredits;
  return s ? Number(s.replace(/,/g, '')) : 0;
};

/** Monthly credits of a tier as displayed ("1,500"). */
export const creditsLabelOf = (tier) => PLAN_META.find((p) => p.tier === tier)?.monthlyCredits ?? '';

/** Prompts the Free plan tracks, as shown in the pricing comparison table. */
export const FREE_PROMPTS = '10';
