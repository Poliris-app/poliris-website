import { useEffect, useRef, useState } from 'react';
import { cardLayout, clamp, restScale, useHeroWindows } from './heroWindowUtils';
import WinVisibility from './WinVisibility';
import WinAskPoli from './WinAskPoli';
import WinMap from './WinMap';
import WinImplementation from './WinImplementation';

/* The four feature windows that sit around the hero dashboard.

   Sizes, scale, the gap beside the dashboard and the stepped offsets all
   come from the reference ("Hero Feature Scroll v5"); see cardLayout in
   heroWindowUtils. Each window is placed against the dashboard's measured
   box, so they follow it as it scales on scroll.

   They are painted behind the dashboard, so the reveal plays as each one
   being drawn out from underneath it: a window starts tucked in behind the
   frame, slightly low and tipped towards it, and slides out to its place,
   one after another. Once they have landed they stay put, like the
   dashboard, while the reader scrolls on.

   They need clear room either side of the dashboard, so they only appear
   from laptop widths up; on laptops they shrink to fit (see cardLayout).
   Below that the hero is the dashboard alone, exactly as it was before. */

const WIDE = '(min-width: 1200px)';

/**
 * `speed` divides each window's clock, so its demo plays that many times
 * slower than the raw timings inside it. The reference does the same (its
 * own `speed` prop, 140% for most of them and 165% for Implementation):
 * these are small panels off to the side of the hero, and at full tilt
 * they pull the eye away from the page.
 */
const WINDOWS = [
  { key: 'vis', label: 'Visibility', dir: -1, speed: 1.6, Body: WinVisibility },
  { key: 'chat', label: 'AI Assistant', dir: -1, speed: 1.6, icon: 'hero-chatgpt-mark.png', Body: WinAskPoli },
  { key: 'map', label: 'Trading Zone Map', dir: 1, speed: 1.4, Body: WinMap },
  { key: 'impl', label: 'Implementation', dir: 1, speed: 1.65, Body: WinImplementation },
];

// Eased both ends, so a window neither jumps away from the dashboard nor
// snaps to a stop — it just glides out and settles.
const flyEase = (x) => {
  const v = clamp(x);
  return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
};

export default function HeroWindows() {
  const layerRef = useRef(null);
  const [wide, setWide] = useState(false);
  const { now, p, vw, box } = useHeroWindows(layerRef);

  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // The dashboard's resting size depends on the viewport; the CSS reads it
  // from here so the frame settles exactly where the windows expect it.
  useEffect(() => {
    const host = layerRef.current?.parentElement;
    if (host && vw) host.style.setProperty('--rest', restScale(vw).toFixed(4));
  }, [vw]);

  const places = wide && box ? cardLayout(box, vw, { x: box.originX, y: box.originY }) : null;

  return (
    <div className="hfw-layer" ref={layerRef} aria-hidden="true">
      {places && WINDOWS.map((w, i) => {
        const place = places[i];
        // A light stagger only — the four come out as a group, not in
        // sequence. The glide comes from the damped scroll behind `p`.
        const k = flyEase((p - (0.12 + i * 0.09)) / 0.46);
        const back = 1 - k;
        // A window starts completely behind the dashboard — the left column
        // pushed right, the right column pushed left — and slides clear of
        // its edge. Rounded, because a fractional offset on a composited
        // layer is what makes the card look blurry once it has settled.
        const x = Math.round(-w.dir * place.tuck * back);
        const y = Math.round(22 * back);
        const settled = k >= 1;
        const Body = w.Body;
        return (
          <div
            key={w.key}
            className="hfw"
            style={{
              left: `${place.x}px`,
              top: `${place.y}px`,
              width: `${place.w}px`,
              height: `${place.h}px`,
              transformOrigin: w.dir < 0 ? '100% 50%' : '0 50%',
              // Up to full quickly: the window is meant to look solid as it
              // slides out, not to fade in. This only covers the sliver that
              // clears the dashboard's edge before the rest of it does.
              opacity: clamp(k * 5),
              transform: settled && x === 0 && y === 0
                ? 'none'
                : `translate3d(${x}px,${y}px,0)`
                  + ` rotate(${(w.dir * 1.2 * back).toFixed(3)}deg)`
                  + ` scale(${(0.97 + 0.03 * k).toFixed(4)})`,
            }}
          >
            <div className="hfw__zoom" style={place.z < 1 ? { zoom: place.z } : undefined}>
              <div className="hfw__bar">
                <i className="hfw__dot hfw__dot--r" />
                <i className="hfw__dot hfw__dot--y" />
                <i className="hfw__dot hfw__dot--g" />
                <span className="hfw__name">
                  {w.icon && <img className="hfw__name-icon" src={`${import.meta.env.BASE_URL}${w.icon}`} alt={w.label} width="11" height="11" />}
                  {w.label}
                </span>
              </div>
              <Body now={now / w.speed} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
