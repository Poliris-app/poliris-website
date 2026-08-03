// Set by api/checkout-status.js once a marketing-site checkout finishes —
// a plain, non-sensitive marker (no auth data) proving this browser
// completed self-serve checkout at some point. Not full cross-domain login
// detection (see the plan notes) — just "have they paid via this flow".
export function hasAccountCookie() {
  if (typeof document === 'undefined') return false;
  return document.cookie
    .split('; ')
    .some((c) => c === 'poliris_has_account=1');
}

// Set alongside poliris_has_account at the same moment — the plan_tier this
// visitor last completed checkout for, so the pricing page can label their
// current plan. Stale the moment they change plans from inside the app
// itself (the marketing site has no way to know that), but good enough to
// avoid pointing someone at a "Select Plan" button for a plan they're
// already on.
export function currentPlanTierCookie() {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((c) => c.startsWith('poliris_plan_tier='));
  return match ? match.slice('poliris_plan_tier='.length) : null;
}
