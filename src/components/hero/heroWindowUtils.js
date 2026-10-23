import { useEffect, useRef, useState } from 'react';

/* Shared maths and timing for the four hero feature windows.
   Ported from the "Hero Feature Scroll v4" reference: every window runs on
   one clock and draws itself from pure functions of the elapsed time, the
   same single-clock pattern the bento cards use (see LandingPage.jsx). */

export const clamp = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
export const easeOut = (x) => 1 - Math.pow(1 - clamp(x), 3);
export const easeInOut = (x) => {
  const v = clamp(x);
  return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
};
/** Overshoots past 1 and settles — the reference's "back" easing. */
export const easeBack = (x) => {
  const v = clamp(x);
  const c1 = 1.70158;
  return 1 + (c1 + 1) * Math.pow(v - 1, 3) + c1 * Math.pow(v - 1, 2);
};
export const lerp = (a, b, k) => a + (b - a) * k;

/** Catmull-Rom-ish smoothing, used by the Visibility chart. */
export function smoothPath(vals, width = 288, left = 6, bottom = 95, k = 0.74) {
  const pts = vals.map((v, i) => [left + (i * width) / (vals.length - 1), bottom - v * k]);
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)}`
      + ` ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)}`
      + ` ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

/** y on that same curve at fractional index fi — the chart's moving head. */
export function yAt(vals, fi, bottom = 95, k = 0.74) {
  const n = vals.length;
  const Y = (v) => bottom - v * k;
  const i = Math.min(n - 2, Math.max(0, Math.floor(fi)));
  const t = clamp(fi - i);
  const u = 1 - t;
  const y0 = Y(vals[Math.max(0, i - 1)]);
  const y1 = Y(vals[i]);
  const y2 = Y(vals[i + 1]);
  const y3 = Y(vals[Math.min(n - 1, i + 2)]);
  const c1 = y1 + (y2 - y0) / 6;
  const c2 = y2 - (y3 - y1) / 6;
  return u * u * u * y1 + 3 * u * u * t * c1 + 3 * u * t * t * c2 + t * t * t * y2;
}

const STILL = '(prefers-reduced-motion: reduce)';

// The hero's own reveal distance — HeroOnboarding drives --p over the same
// span, so the windows and the dashboard move on one curve.
const REVEAL_PX = 480;
// How far past the reveal the drift keeps running.
const DRIFT_PX = 900;
/**
 * The scroll position the windows follow is damped rather than read raw,
 * which is what makes them glide out instead of tracking the wheel notch
 * for notch. Per frame it closes 12% of the remaining distance (corrected
 * for frame time, so it behaves the same at 60 and 120Hz) — the same
 * smoothing the reference uses.
 */
const SCROLL_DAMP = 0.12;

/**
 * One requestAnimationFrame loop for all four windows: the shared demo
 * clock and the scroll progress that flies them out. It runs only while
 * the hero is on screen, so the landing page is not repainting 60 times a
 * second once the reader has scrolled past it. Reduced motion freezes the
 * clock on a frame where every window shows its finished state, with the
 * windows already in place.
 */
/* Card geometry, straight out of the reference.
   The windows are laid out against the dashboard, not the viewport, so the
   numbers below are the reference's own: its card sizes, the scale it
   applies to them, and the gap it leaves beside the frame. */
export const CARD_W = [252, 256, 252, 252];
export const CARD_H = [214, 300, 236, 236];
/**
 * What the dashboard settles at once the hero has been scrolled — it starts
 * larger and eases down to this. HeroWindows hands it to the CSS as --rest
 * (see the `min-width: 1200px` block of poliris.css): the windows are laid
 * out against the dashboard at this size, not at whatever size it is
 * mid-scroll, so they hold their places instead of drifting while it shrinks.
 *
 * On a laptop-width screen it settles smaller, from .825 at 1700px down to
 * .70 at 1200px, to leave the windows some room either side.
 */
export const DASH_REST_SCALE = 0.825;
export const restScale = (vw) => Math.max(0.7, Math.min(DASH_REST_SCALE, 0.7 + ((vw - 1200) / 500) * 0.125));
/** Room kept clear between the outermost windows and the viewport edge. */
const EDGE = 12;
/** The reference scales the cards from .82 at 1180px up to 1 at 1920px. */
export const cardScale = (vw) => Math.max(0.82, Math.min(1, 0.82 + ((vw - 1180) / 740) * 0.18));
/** ...and opens the gap beside the dashboard from 40px to 72px. */
export const cardGap = (vw) => Math.max(40, Math.min(72, 40 + (vw - 1180) / 16));

/**
 * Where each window sits, given the dashboard box, the viewport width, and
 * where the layer itself starts on the page.
 *
 * `origin` matters: .hreveal is full-bleed with `width: 100vw`, and 100vw
 * counts the scrollbar, so the layer usually starts on a half pixel. Left
 * unhandled every window inherits that half pixel, gets rasterised off the
 * grid, and looks permanently slightly blurred. Positions are therefore
 * snapped so that layer-start + offset lands on a whole page pixel.
 */
export function cardLayout(box, vw, origin = { x: 0, y: 0 }) {
  const cs = cardScale(vw);
  const { left: L, right: R, top: T, bottom: B } = box;
  // Where the windows would not fit beside the dashboard (laptop widths),
  // the whole group is shrunk until the outer pair clears the viewport edge.
  // `z` is applied as CSS zoom on the window's contents, so they scale down
  // as a piece rather than reflowing into a narrower box.
  const need = cardGap(vw) + Math.max(...CARD_W) * cs + 16;
  const fit = Math.max(0.4, Math.min(1, (Math.min(L, vw - R) - EDGE) / need));
  const gap = cardGap(vw) * fit;
  // The contents always lay out at the card's full design size and are
  // zoomed down from there — squeezed into a narrower box they clip.
  const z = cs * fit;
  const w = CARD_W.map((v) => v * z);
  const h = CARD_H.map((v) => v * z);
  const nudge = 16 * fit;
  // The outer two are nudged 16px further out than the inner two, which is
  // what gives the group its stepped look.
  //
  const sx = (v) => Math.round(origin.x + v) - origin.x;
  const sy = (v) => Math.round(origin.y + v) - origin.y;
  const r = (v) => Math.round(v);
  return [
    // Visibility sits just below the top of the dashboard rather than above
    // it, where the reference put it — it rode too high over this hero.
    { x: sx(L - gap - w[0] - nudge), y: sy(T + 10), w: r(w[0]), h: r(h[0]), tuck: r(gap + w[0] + nudge), z },
    { x: sx(L - gap - w[1]), y: sy(B + 30 - h[1]), w: r(w[1]), h: r(h[1]), tuck: r(gap + w[1]), z },
    { x: sx(R + gap), y: sy(T + 30), w: r(w[2]), h: r(h[2]), tuck: r(gap + w[2]), z },
    { x: sx(R + gap + nudge), y: sy(B + 10 - h[3]), w: r(w[3]), h: r(h[3]), tuck: r(gap + w[3] + nudge), z },
  ];
}

export function useHeroWindows(ref, { still = 6000 } = {}) {
  // Reduced motion is settled up front rather than in the effect, so the
  // windows never render a frame they then have to correct.
  const [frame, setFrame] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia?.(STILL).matches
      ? { now: still, p: 1, q: 0, vw: document.documentElement.clientWidth, box: null }
      : { now: 0, p: 0, q: 0, vw: 0, box: null }
  ));
  const t0 = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // The windows are placed against the dashboard, which is itself scaled
    // by the scroll, so its box is measured rather than guessed.
    // The dashboard's box at its RESTING size, not its current one. The
    // stage is never transformed, so its own rect is the dashboard's
    // untransformed box; scaling that by restScale gives where the
    // dashboard ends up. Measuring the frame instead would move the windows
    // every frame while it shrinks.
    const measure = () => {
      const layerBox = el.getBoundingClientRect();
      const stage = el.parentElement?.querySelector('.hreveal__stage')?.getBoundingClientRect();
      if (!stage) return null;
      const rest = restScale(document.documentElement.clientWidth);
      const w = stage.width * rest;
      const h = stage.height * rest;
      // It scales from its top edge (transform-origin: 50% 0).
      const cx = stage.left + stage.width / 2 - layerBox.left;
      const top = stage.top - layerBox.top;
      return {
        left: cx - w / 2,
        right: cx + w / 2,
        top,
        bottom: top + h,
        // Where the layer itself starts, so the windows can be snapped to
        // the page's pixel grid rather than the layer's.
        originX: layerBox.left,
        originY: layerBox.top + window.scrollY,
      };
    };

    // Reduced motion gets no loop, so it is measured once, on its own and
    // on resize, with everything already in place.
    if (window.matchMedia?.(STILL).matches) {
      const settle = () => setFrame({ now: still, p: 1, q: 0, vw: document.documentElement.clientWidth, box: measure() });
      settle();
      window.addEventListener('resize', settle);
      return () => window.removeEventListener('resize', settle);
    }

    // Place them once up front: the loop only runs while the hero is on
    // screen, and without this the windows would have nowhere to sit until
    // the first frame arrives.
    setFrame((f) => ({ ...f, vw: document.documentElement.clientWidth, box: measure() }));

    let raf = 0;
    let visible = false;
    let eased = null;
    let lastT = 0;

    const tick = (ts) => {
      if (!t0.current) t0.current = ts;
      const dt = Math.min(64, ts - (lastT || ts));
      lastT = ts;

      const y = window.scrollY;
      // The windows chase the scroll rather than being pinned to it.
      const a = 1 - Math.pow(1 - SCROLL_DAMP, dt / 16.67);
      eased = eased == null ? y : eased + (y - eased) * a;
      if (Math.abs(y - eased) < 0.15) eased = y;

      // Measured against the live scroll, since the rect is live too.
      const start = Math.max(0, el.getBoundingClientRect().top + y - window.innerHeight);
      setFrame({
        now: ts - t0.current,
        p: easeOut(clamp((eased - start) / REVEAL_PX)),
        // Keeps rising after the windows have landed, for the slow drift
        // that gives the group some depth as the reader scrolls on.
        q: clamp((eased - start - REVEAL_PX) / DRIFT_PX),
        vw: document.documentElement.clientWidth,
        box: measure(),
      });
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && !document.hidden) start(); else stop();
    }, { threshold: 0 });
    io.observe(el);

    const onVisibility = () => { if (document.hidden) stop(); else if (visible) start(); };
    document.addEventListener('visibilitychange', onVisibility);

    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVisibility); stop(); };
  }, [ref, still]);

  return frame;
}
