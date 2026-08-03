// The SaaS app's own URL — production by default, overridable locally via
// VITE_APP_URL (e.g. http://localhost:3000) so "Dashboard"/"Log in" links
// can be tested against a local poliris-frontend instead of production.
export const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.poliris.io';
