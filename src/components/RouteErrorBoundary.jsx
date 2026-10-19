import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

// After a new deploy, a tab still running the previous build asks for that
// build's files on its next client-side navigation: vite-react-ssg's
// static-loader-data-manifest-<oldhash>.json (Vercel answers with a
// plain-text 404, which fails JSON parsing) or an old JS chunk. Both are
// fixed by loading the page fresh from the current deploy.
function isStaleDeployError(error) {
  const msg = String(error?.message ?? error ?? '');
  return (
    (error instanceof SyntaxError && /JSON/i.test(msg)) ||
    /dynamically imported module|Importing a module script failed/i.test(msg)
  );
}

// Reload at most once per URL every 10s, so a failure that a reload doesn't
// fix falls through to the message below instead of looping.
const RELOAD_KEY = 'poliris:stale-deploy-reload';
function reloadOnce() {
  try {
    const last = JSON.parse(sessionStorage.getItem(RELOAD_KEY) || 'null');
    if (last && last.url === location.href && Date.now() - last.at < 10_000) return false;
    sessionStorage.setItem(RELOAD_KEY, JSON.stringify({ url: location.href, at: Date.now() }));
  } catch {
    // Storage unavailable (private mode etc.) — reload anyway.
  }
  location.reload();
  return true;
}

export default function RouteErrorBoundary() {
  const error = useRouteError();
  const stale = isStaleDeployError(error);

  useEffect(() => {
    if (!stale) console.error(error);
  }, [error, stale]);

  // Render nothing while the reload is under way.
  if (stale && typeof window !== 'undefined' && reloadOnce()) return null;

  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: '40px 16px', textAlign: 'center' }}>
      <div>
        <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Something went wrong.</p>
        <p style={{ marginBottom: 20, color: '#5c6b7f' }}>Please reload the page.</p>
        <button type="button" className="btn btn--primary" onClick={() => location.reload()}>
          Reload
        </button>
      </div>
    </div>
  );
}
