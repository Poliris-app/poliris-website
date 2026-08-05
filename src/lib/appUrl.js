// The SaaS app's own URL — hardcoded in any built deployment (production,
// staging, preview alike), so a stray VITE_APP_URL set on the wrong Vercel
// environment can never hijack "Log in"/"Get your free trial" on a live
// site again. Only `npm run dev` on a local machine honors the override,
// so you can still point it at a local poliris-frontend during development.
export const APP_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_APP_URL || 'https://app.poliris.io')
  : 'https://app.poliris.io';
