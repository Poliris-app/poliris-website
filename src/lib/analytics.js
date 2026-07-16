import posthog from 'posthog-js';

export function initAnalytics() {
  const key = import.meta.env.VITE_POSTHOG_KEY;
  const host = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

  if (!key) {
    console.warn('[analytics] VITE_POSTHOG_KEY is not set — PostHog disabled.');
    return;
  }

  posthog.init(key, {
    api_host: host,
    capture_pageview: false, // we capture manually on every route change in LangWrapper
    capture_pageleave: true,
    capture_dead_clicks: true,
    enable_heatmaps: true,
  });
}

export function identifyUser() {
  const params = new URLSearchParams(window.location.search);
  const phId = params.get('ph_id');

  if (phId && phId.includes('@') && phId.includes('.')) {
    posthog.identify(phId);

    // Remove ph_id from URL, keep all other query params (utm_ etc.)
    params.delete('ph_id');
    const newSearch = params.toString();
    const newUrl =
      window.location.pathname +
      (newSearch ? `?${newSearch}` : '') +
      window.location.hash;
    window.history.replaceState({}, '', newUrl);
  }
}

export function trackEvent(name, props = {}) {
  try {
    posthog.capture(name, props);
  } catch {
    // never let analytics crash the app
  }
}

// Called once per route change (see LangContext's LangWrapper). Both
// PostHog and GA have their automatic pageview capture disabled in their
// init snippets, since this is a client-side-routed SPA — the automatic
// capture only ever fires once, on initial script load, and misses every
// in-app navigation after that.
export function trackPageview() {
  trackEvent('$pageview');

  try {
    window.gtag?.('event', 'page_view', {
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  } catch {
    // never let analytics crash the app
  }
}
