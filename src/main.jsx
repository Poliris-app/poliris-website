import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';
import { initAnalytics } from './lib/analytics';

// Guard required: vite-react-ssg pre-renders at build time where window is absent
if (typeof window !== 'undefined') {
  initAnalytics();
}

// ViteReactSSG returns the entry used by both the client (hydration) and
// the static generator (renders each route to HTML at build time).
// The list of paths to prerender is configured in vite.config.js
// (ssgOptions.includedRoutes), which the build reads at generation time.
export const createRoot = ViteReactSSG({ routes });
