import { useLayoutEffect, useRef } from 'react';
import { useLang } from '../contexts/LangContext';

/**
 * Hero product demo — embeds the self-contained onboarding flow
 * (public/onboarding-flow.html) as-is. It runs in an iframe because the
 * flow patches globals (getBoundingClientRect, MouseEvent coords,
 * innerWidth) that would otherwise leak into the landing page.
 *
 * Wrapped in a scroll-driven "tilt with tracing light + orbit" reveal:
 * --p (0→1, ease-out cubic) runs over REVEAL_PX of scroll from the moment
 * the section enters the viewport and drives the light and rings; --t is
 * the same curve finishing at FLAT_AT and drives the dashboard's tilt,
 * scale and lift. Phones and reduced motion pin both to 1 (no tilt).
 */
const REVEAL_PX = 480;
// Ease-out cubic spends its last ~half crawling through tilts of a few
// degrees — invisible, but any 3D tilt renders the iframe blurry. So the
// dashboard goes exactly flat (and sharp) at p = FLAT_AT (~225px of scroll).
const FLAT_AT = 0.85;
const STILL_QUERY = '(max-width: 768px), (prefers-reduced-motion: reduce)';
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

// Orbit rings (radii 540×320, 680×410, 820×500) share one centre — the
// dashboard's — so the outer ones wrap the frame and rise above it.
// CX/CY leave 20px around the largest ring.
const CX = 840, CY = 520;
const RINGS = [
  { rx: 540, ry: 320, opacity: 0.24 },
  { rx: 680, ry: 410, opacity: 0.18, dashed: true },
  { rx: 820, ry: 500, opacity: 0.11 },
];

export default function HeroOnboarding() {
  const { lang } = useLang();
  const ref = useRef(null);
  const dashRef = useRef(null);
  const iframeRef = useRef(null);
  const playing = useRef(false);

  // The iframe is loaded with ?hold, so the demo sits on its first frame
  // until we post "pf-play"; "pf-pause" freezes it again (see the clock in
  // public/onboarding-flow.html).
  function postState() {
    const msg = playing.current ? 'pf-play' : 'pf-pause';
    iframeRef.current?.contentWindow?.postMessage(msg, window.location.origin);
  }

  useLayoutEffect(() => {
    const el = ref.current;
    const still = window.matchMedia(STILL_QUERY);
    let raf = 0;

    // The demo plays only while the dashboard is flat (reveal finished)
    // and at least half on screen, and only once the visitor has scrolled;
    // otherwise it's paused. A scroll only counts after real input, so the
    // browser restoring the scroll position on refresh doesn't start it.
    const INPUT_EVENTS = ['wheel', 'touchmove', 'keydown', 'mousedown'];
    let interacted = false, scrolled = false, inView = false;
    function onInput() { interacted = true; }
    INPUT_EVENTS.forEach((t) => window.addEventListener(t, onInput, { passive: true }));
    const io = new IntersectionObserver(([e]) => {
      inView = e.intersectionRatio >= 0.5;
      schedule();
    }, { threshold: [0, 0.5, 1] });
    io.observe(dashRef.current);

    function update() {
      raf = 0;
      let p = 1;
      if (!still.matches) {
        // Scroll position at which the section enters the viewport — 0 when
        // it's already visible on load (the usual desktop case), so the
        // reveal always starts fully tilted and plays over REVEAL_PX.
        const y = window.scrollY;
        const start = Math.max(0, el.getBoundingClientRect().top + y - window.innerHeight);
        p = easeOutCubic(Math.min(1, Math.max(0, (y - start) / REVEAL_PX)));
      }
      const t = Math.min(1, p / FLAT_AT);
      el.style.setProperty('--p', p.toFixed(4));
      el.style.setProperty('--t', t.toFixed(4));
      // Once flat, the frame drops its transform entirely, so the iframe
      // paints as a plain, pixel-snapped layer instead of a 3D texture.
      const done = t >= 1;
      el.toggleAttribute('data-done', done);

      const play = scrolled && inView && done;
      if (play !== playing.current) {
        playing.current = play;
        postState();
      }
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    function onScroll() {
      if (interacted) scrolled = true;
      schedule();
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule);
    still.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      INPUT_EVENTS.forEach((t) => window.removeEventListener(t, onInput));
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedule);
      still.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <section className="hreveal" ref={ref}>
      <div className="hreveal__stage">
        <svg
          className="hreveal__orbit"
          viewBox={`0 0 ${CX * 2} ${CY * 2}`}
          aria-hidden="true"
        >
          {RINGS.map(({ rx, ry, opacity, dashed }) => (
            <ellipse
              key={rx}
              cx={CX} cy={CY} rx={rx} ry={ry}
              fill="none"
              stroke="#0062FF"
              strokeOpacity={opacity}
              strokeWidth="1"
              strokeDasharray={dashed ? '4 6' : undefined}
            />
          ))}
        </svg>
        <div className="hreveal__glow" aria-hidden="true" />
        <div className="hreveal__frame">
          <div className="hreveal__mat">
            <div className="hreveal__dash" ref={dashRef}>
              <iframe
                ref={iframeRef}
                className="hreveal__iframe"
                src={`${import.meta.env.BASE_URL}onboarding-flow${lang === 'fr' ? '.fr' : ''}.html?embed&hold`}
                // A play request made before the iframe finished loading
                // would have gone to its blank initial document; resend it.
                onLoad={() => { if (playing.current) postState(); }}
                title="Poliris onboarding demo"
                scrolling="no"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
