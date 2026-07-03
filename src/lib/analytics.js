import posthog from 'posthog-js';

export function initAnalytics() {
  const key = import.meta.env.VITE_POSTHOG_KEY;
  const host = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com';

  if (!key) {
    console.warn('[analytics] VITE_POSTHOG_KEY is not set — PostHog disabled.');
    return;
  }

  posthog.init(key, {
    api_host: host,
    capture_pageview: false, // we capture manually on every route change in LangWrapper
    capture_pageleave: true,
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
