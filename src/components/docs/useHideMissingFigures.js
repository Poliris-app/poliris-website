import { useEffect } from 'react';

// The screenshots are dropped into public/docs/images over time. Until a file
// is there the <img> would show as a broken icon, so any figure whose image
// fails to load takes itself off the page instead.
//
// The chapter HTML can be swapped out under us (a language change, Tolgee's
// live copy arriving), replacing every <img>, so rather than listening on each
// image this listens once on the container: "error" does not bubble, but it
// does reach a capture-phase listener on an ancestor.
export default function useHideMissingFigures(ref, deps = []) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    // In development the slot stays on the page as a dashed placeholder
    // naming the file it is waiting for, so it is easy to see what is left.
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
