import { useEffect, useState } from 'react';

const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;

/**
 * Debounced lookup of real, registered companies matching `query`, via
 * Clearbit's public Autocomplete API — free, keyless, and CORS-open, so it's
 * called straight from the browser with no backend proxy or secret to
 * manage. Guards against name collisions like "nike" — nike.com vs. a dozen
 * unrelated businesses that also go by Nike — by showing the visitor a pick
 * list instead of assuming their first guess.
 *
 * No official SLA on Clearbit's side; a failure or empty response just
 * means no dropdown, not a broken form — the visitor can still type the
 * full domain and submit normally.
 */
export default function useDomainSuggestions(query, enabled = true) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const trimmed = query.trim();
    let controller = null;

    const timer = setTimeout(() => {
      if (!enabled || trimmed.length < MIN_QUERY_LENGTH) {
        setSuggestions([]);
        return;
      }
      controller = new AbortController();
      fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(trimmed)}`, {
        signal: controller.signal,
      })
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => {
          const mapped = Array.isArray(data)
            ? data
                .filter((item) => item.domain && item.name)
                .slice(0, 5)
                .map((item) => ({ name: item.name, domain: item.domain, logoUrl: item.logo || undefined }))
            : [];
          setSuggestions(mapped);
        })
        .catch(() => {});
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller?.abort();
    };
  }, [query, enabled]);

  return suggestions;
}
