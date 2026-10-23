import { useEffect, useState } from 'react';

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
// The windows read the raw scroll position, as the dashboard does, so they
// move and stop together; a damped copy kept the windows gliding on for a
// second after the dashboard had settled.
const REVEAL_PX = 480;

/**
 * One requestAnimationFrame loop for all four windows: the shared demo
 * clock and the scroll progress that flies them out. It runs only while
 * the hero is on screen, so the landing page is not repainting 60 times a
 * second once the reader has scrolled past it. Within that, the demos
 * play by the dashboard's own rule (HeroOnboarding): only while at least
 * half the dashboard is on screen. Below that the clock is held where it
 * is and the windows stop re-rendering, and the demos pick up from the
 * same frame when the dashboard comes back. Reduced motion freezes the
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
 * .66 at 1200px, to leave the windows room either side.
 */
export const DASH_REST_SCALE = 0.825;
export const restScale = (vw) => Math.max(0.66, Math.min(DASH_REST_SCALE, 0.66 + ((vw - 1200) / 500) * 0.165));
/** Room kept clear between the outermost windows and the viewport edge:
 * 2.5% of the width, 24-48px, so the windows never crowd the screen edge. */
const edgeFor = (vw) => Math.max(24, Math.min(48, vw * 0.025));
/** The reference scales the cards from .82 at 1180px up to 1 at 1920px. */
export const cardScale = (vw) => Math.max(0.82, Math.min(1, 0.82 + ((vw - 1180) / 740) * 0.18));
/** ...and the gap beside the dashboard closes from 72px at 1700px to 28px
 * at 1200px, keeping the windows near the dashboard on laptops. */
export const cardGap = (vw) => Math.max(28, Math.min(72, 28 + ((vw - 1200) / 500) * 44));

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
  const fit = Math.max(0.4, Math.min(1, (Math.min(L, vw - R) - edgeFor(vw)) / need));
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
      ? { now: still, p: 1, vw: document.documentElement.clientWidth, box: null }
      : { now: 0, p: 0, vw: 0, box: null }
  ));

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
      const settle = () => setFrame({ now: still, p: 1, vw: document.documentElement.clientWidth, box: measure() });
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
    let playing = false;
    // The demo clock only advances while playing, so pausing holds the
    // windows on their current frame rather than skipping ahead.
    let clock = 0;
    let lastTs = 0;
    let last = null;

    const tick = (ts) => {
      // Capped, so a frame after a long gap (a background tab, a pause)
      // can't jump the demos forward.
      const dt = lastTs ? Math.min(100, ts - lastTs) : 0;
      lastTs = ts;
      if (playing) clock += dt;

      const y = window.scrollY;
      const start = Math.max(0, el.getBoundingClientRect().top + y - window.innerHeight);
      const next = {
        now: clock,
        p: easeOut(clamp((y - start) / REVEAL_PX)),
        vw: document.documentElement.clientWidth,
        box: measure(),
      };
      // Paused and nothing moved: skip the render altogether.
      const same = last && !playing && next.p === last.p && next.vw === last.vw
        && next.box?.left === last.box?.left && next.box?.top === last.box?.top
        && next.box?.right === last.box?.right && next.box?.bottom === last.box?.bottom;
      if (!same) { last = next; setFrame(next); }
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!raf) { lastTs = 0; raf = requestAnimationFrame(tick); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && !document.hidden) start(); else stop();
    }, { threshold: 0 });
    io.observe(el);

    // Same threshold the dashboard's own demo uses to play and pause. The
    // windows' CSS animations (spinners) are paused with it via
    // data-paused on the layer.
    const dash = el.parentElement?.querySelector('.hreveal__dash');
    const setPlaying = (on) => {
      playing = on;
      el.toggleAttribute('data-paused', !on);
    };
    setPlaying(false);
    const playIo = new IntersectionObserver(([e]) => {
      setPlaying(e.intersectionRatio >= 0.5);
    }, { threshold: [0, 0.5, 1] });
    if (dash) playIo.observe(dash); else setPlaying(true);

    const onVisibility = () => { if (document.hidden) stop(); else if (visible) start(); };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      io.disconnect();
      playIo.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      stop();
    };
  }, [ref, still]);

  return frame;
}
