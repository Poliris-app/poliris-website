import { useEffect } from 'react';

// Safety net behind docsFigures.js, which already settles every figure in the
// HTML (sized when its screenshot exists, placeholder or left out when not).
// If a screenshot still fails to load (a file listed but unreadable, a
// network error), its figure takes itself off the page rather than show a
// broken icon; in development it turns into the dashed placeholder.
//
// The chapter HTML can be swapped out under us (a language change, Tolgee's
// live copy arriving), replacing every <img>, so rather than listening on each
// image this listens once on the container: "error" does not bubble, but it
// does reach a capture-phase listener on an ancestor.
export default function useHideMissingFigures(ref, deps = []) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const hide = (img) => {
      const fig = img.closest('.docs-figure');
      if (!fig) return;
      if (import.meta.env.DEV) {
        fig.classList.add('docs-figure--missing');
        fig.dataset.file = img.getAttribute('src');
      } else {
        fig.setAttribute('hidden', '');
      }
    };
    const onError = (e) => { if (e.target instanceof HTMLImageElement) hide(e.target); };
    root.addEventListener('error', onError, true);
    // Images that already failed before this ran (prerendered HTML).
    root.querySelectorAll('.docs-figure img').forEach((img) => {
      if (img.complete && img.naturalWidth === 0) hide(img);
    });
    return () => root.removeEventListener('error', onError, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);
}
