import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// Real footwear competitors already tracked elsewhere on the site
// (see COMPETITORS in SentimentPage.jsx) — same brands, same accent
// colors, same logo assets, so this map reads as part of one product
// story instead of inventing a new cast of brands.
const BRANDS = {
  nike:       { name: 'Nike',        accent: '#111827', logo: 'nike-com-logo.png' },
  adidas:     { name: 'Adidas',      accent: '#dc2626', logo: 'adidas-group-com-logo.png' },
  on:         { name: 'On',          accent: '#16a34a', logo: 'on-com-logo.png' },
  hoka:       { name: 'Hoka',        accent: '#ea580c', logo: 'hoka-com-logo.png' },
  brooks:     { name: 'Brooks',      accent: '#7c3aed', logo: 'brooksrunning-com-logo.png' },
  newbalance: { name: 'New Balance', accent: 'rgb(28, 229, 206)', logo: 'newbalance-com-logo.png' },
};

// Mapbox handles projection, tiling and zoom rendering itself — each level
// just needs a real center + a real Mapbox zoom level (0 = whole world,
// ~9-10 = a city), no manual d3 projection math to keep in sync.
const LEVELS = [
  {
    label: 'Worldwide', title: 'Who leads sportswear right now?',
    // Natural Earth curves the meridians into that oval "world in a
    // frame" look at low zoom; closer-in levels switch to plain Mercator
    // since an oval projection stops making visual sense once you're
    // zoomed into a single country or city.
    projection: 'naturalEarth',
    // Don't let the user zoom out past the initial framing — any further
    // and the oval world shrinks into a small blob with a lot of dead
    // space around it, which looks bad. (Moot in practice now that pan/
    // zoom are disabled outright on this level, but keeps the floor
    // sane if that ever changes.)
    minZoom: 0.95,
    // Natural Earth's oval is geometrically centered on [0, 0] (equator,
    // prime meridian) — centering the viewport there too means the oval
    // gets even margin on every side, instead of the previous [0, 15]
    // shifting the whole oval upward and clipping/cropping asymmetrically.
    center: [0, 0], zoom: 0.95,
    // Each pin here stands in for an entire continent, so — unlike every
    // other level, where the zone name IS a specific, unambiguous place —
    // "Asia" or "Africa" alone doesn't say which real point the data is
    // measured from. `city` renders as a small subtitle so that's explicit
    // rather than left for the user to guess from pin position alone.
    pins: [
      { lon: -74.01, lat: 40.71,  brand: 'nike',   zone: 'North America', city: 'New York, USA',       stat: '58% share of voice' },
      { lon: 2.35,   lat: 48.86,  brand: 'adidas', zone: 'Europe',        city: 'Paris, France',       stat: '51% share of voice' },
      // Beijing, not Tokyo: Japan is a relatively small island chain that
      // gets visually lost against the ocean at world-continent zoom —
      // mainland China is unambiguously in the middle of a huge landmass
      // at any zoom, so the pin never looks like it's floating in water.
      { lon: 116.4,  lat: 39.9,   brand: 'nike',   zone: 'Asia',          city: 'Beijing, China',      stat: '62% share of voice' },
      { lon: 3.38,   lat: 6.52,   brand: 'nike',   zone: 'Africa',        city: 'Lagos, Nigeria',      stat: '44% share of voice' },
      { lon: -46.63, lat: -23.55, brand: 'adidas', zone: 'South America', city: 'São Paulo, Brazil',   stat: '49% share of voice' },
      { lon: 151.21, lat: -33.87, brand: 'hoka',   zone: 'Oceania',       city: 'Sydney, Australia',   stat: '38% share of voice' },
    ],
  },
  {
    label: 'Country', title: 'Zoom in: Europe',
    center: [10, 50], zoom: 3.1,
    pins: [
      { lon: 2.35,  lat: 48.86, brand: 'nike',       zone: 'France',         stat: '55% share of voice' },
      { lon: 13.4,  lat: 52.52, brand: 'adidas',     zone: 'Germany',        stat: '61% share of voice' },
      { lon: 12.5,  lat: 41.9,  brand: 'on',         zone: 'Italy',          stat: '47% share of voice' },
      { lon: -3.7,  lat: 40.42, brand: 'newbalance', zone: 'Spain',          stat: '40% share of voice' },
      { lon: 21.02, lat: 52.23, brand: 'adidas',     zone: 'Poland',         stat: '43% share of voice' },
      { lon: -0.13, lat: 51.51, brand: 'nike',       zone: 'United Kingdom', stat: '52% share of voice' },
    ],
  },
  {
    label: 'Region', title: 'Zoom in: France',
    center: [2.6, 46.9], zoom: 4.35,
    pins: [
      { lon: 2.35,  lat: 48.86, brand: 'nike',       zone: 'Île-de-France',        stat: '59% share of voice' },
      { lon: 3.06,  lat: 50.63, brand: 'adidas',     zone: 'Hauts-de-France',      stat: '45% share of voice' },
      { lon: 7.75,  lat: 48.58, brand: 'adidas',     zone: 'Grand Est',            stat: '48% share of voice' },
      { lon: -1.55, lat: 47.22, brand: 'hoka',       zone: 'Pays de la Loire',     stat: '36% share of voice' },
      { lon: -0.58, lat: 44.84, brand: 'newbalance', zone: 'Nouvelle-Aquitaine',   stat: '41% share of voice' },
      { lon: 1.44,  lat: 43.6,  brand: 'nike',       zone: 'Occitanie',            stat: '50% share of voice' },
      { lon: 4.85,  lat: 45.76, brand: 'adidas',     zone: 'Auvergne-Rhône-Alpes', stat: '46% share of voice' },
      { lon: 5.37,  lat: 43.3,  brand: 'on',         zone: 'PACA',                 stat: '39% share of voice' },
    ],
  },
  {
    label: 'Local', title: 'Zoom in: Paris',
    center: [2.34, 48.865], zoom: 10.2,
    pins: [
      { lon: 2.362, lat: 48.859, brand: 'nike',       zone: 'Le Marais',   stat: '63% share of voice' },
      { lon: 2.238, lat: 48.892, brand: 'adidas',     zone: 'La Défense',  stat: '57% share of voice' },
      { lon: 2.437, lat: 48.847, brand: 'on',         zone: 'Vincennes',   stat: '54% share of voice' },
      { lon: 2.32,  lat: 48.817, brand: 'newbalance', zone: 'Montrouge',  stat: '37% share of voice' },
    ],
  },
];

const AUTOPLAY_MS = 4600;

// Mapbox sets its own `transform` on the marker's root element to keep it
// pinned to its lng/lat as the map moves — any CSS transform/animation of
// ours has to live on a child instead, or it fights Mapbox's positioning
// and the pin drifts. `.rm2-marker` (the root, handed to mapboxgl.Marker)
// stays untouched; `.rm2-marker-inner` owns the pop-in animation.
//
// The pin and its callout are two SEPARATE Marker instances (both anchored
// at the same lng/lat), not one bundled element. A `transform` — which
// Mapbox sets directly on this root to track lng/lat — establishes its
// own stacking context, so a z-index set on a descendant (the callout)
// can never let it escape above a DIFFERENT, later-created marker's pin;
// stacking between separate markers is plain DOM/creation order. Two
// pools — all pins created first, all callouts second — guarantee every
// callout paints above every pin, not just its own.
function createPinEl(pin, brandKey) {
  const brand = BRANDS[brandKey];
  const el = document.createElement('div');
  el.className = 'rm2-marker';
  el.innerHTML = `
    <div class="rm2-marker-inner">
      <svg class="rm2-marker-pin" viewBox="0 0 40 52">
        <path
          d="M20 0C9 0 0 9 0 20c0 14 20 32 20 32s20-18 20-32C40 9 31 0 20 0z"
          fill="${brand.accent}"
          stroke="rgba(255,255,255,.55)"
          stroke-width="1.5"
        />
      </svg>
      <span class="rm2-marker-logo">
        <img src="${import.meta.env.BASE_URL}${brand.logo}" alt="${brand.name}" />
      </span>
    </div>
  `;
  return el;
}

// anchor:'bottom' + a fixed pixel offset is Mapbox's own supported way to
// float an element above a coordinate — it also means Mapbox's (already
// integer-safe, per the pin markers) anchor math does the centering, not
// a CSS `left:50%; transform:translateX(-50%)` whose result depends on
// this box's own text-driven (often fractional) rendered width.
const CALLOUT_OFFSET = [0, -54];

function createCalloutEl(pin, brandKey) {
  const brand = BRANDS[brandKey];
  const el = document.createElement('div');
  el.className = 'rm2-callout-marker';
  el.innerHTML = `
    <div class="rm2-callout">
      <span class="rm2-callout-zone">${pin.zone}</span>
      ${pin.city ? `<span class="rm2-callout-city">${pin.city}</span>` : ''}
      <span class="rm2-callout-stat">
        <span class="rm2-callout-swatch" style="background:${brand.accent}"></span>
        ${brand.name} · ${pin.stat}
      </span>
    </div>
  `;
  return el;
}

export default function RealMarketMapV2() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [ready, setReady] = useState(false);
  const [levelIdx, setLevelIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef(null);
  const levelIdxRef = useRef(levelIdx);
  useEffect(() => {
    levelIdxRef.current = levelIdx;
  }, [levelIdx]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: containerRef.current,
      // Standard style (with its atmospheric fog and 3D buildings/trees/
      // landmarks disabled) was tried, but its label rendering came back
      // soft/glowing on at least one real machine no matter what was
      // adjusted — dark-v11 is the simpler legacy style, has none of
      // Standard's shader passes, and never once rendered blurry across
      // extensive testing.
      style: 'mapbox://styles/mapbox/dark-v11',
      projection: LEVELS[0].projection ?? 'mercator',
      center: LEVELS[0].center,
      zoom: LEVELS[0].zoom,
      minZoom: LEVELS[0].minZoom ?? 0.2,
      maxZoom: 15,
      // Panning/zooming are user-facing; rotate/pitch stay off since this
      // is a flat business-data map, not something meant to tilt in 3D.
      dragRotate: false,
      touchPitch: false,
      attributionControl: false,
    });
    map.touchZoomRotate.disableRotation();
    map.addControl(new mapboxgl.AttributionControl({ compact: true }));
    map.once('load', () => setReady(true));

    // A user dragging, scrolling, or double-clicking the map should stop
    // autoplay — but flyTo() (our own level transitions) also fires drag/
    // zoom events programmatically. `originalEvent` distinguishes "a real
    // gesture triggered this" from "we're animating it", but Mapbox only
    // sets it reliably on 'dragstart' and 'dblclick' — scroll/trackpad
    // zoom fires 'zoomstart' with originalEvent unset, so 'wheel' (the
    // raw DOM event, always tied to real input) is used for that case.
    const stopOnUserInteraction = (e) => {
      // Pan/zoom are disabled outright on the Worldwide level, but a drag
      // gesture there still fires this DOM-level event even though it has
      // no visible effect — without this guard, autoplay would pause for
      // a level the user technically can't interact with at all.
      if (e.originalEvent && levelIdxRef.current !== 0) setPlaying(false);
    };
    map.on('dragstart', stopOnUserInteraction);
    map.on('wheel', stopOnUserInteraction);
    map.on('dblclick', stopOnUserInteraction);

    // Mapbox only auto-resizes its canvas on the browser's own
    // window-resize event — it has no way to know when THIS container's
    // size changes for other reasons (the page's scroll-reveal fade/slide
    // transition, web fonts loading late and reflowing ancestors, initial
    // aspect-ratio layout settling). If that happens after the canvas is
    // already sized, the canvas keeps its old pixel resolution while CSS
    // stretches it to the new box — which is exactly what blurry text/
    // pins looks like. A ResizeObserver catches every one of those cases,
    // not just viewport resizes.
    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(containerRef.current);

    // Browser-level zoom (Ctrl+scroll, common on Windows) changes
    // devicePixelRatio without necessarily changing the container's CSS
    // box size, so the ResizeObserver above can miss it — same stale-
    // canvas-resolution blur, different trigger. visualViewport's resize
    // event is the purpose-built API for this (zoom/scale changes on
    // desktop and mobile alike); a matchMedia-based approach was tried
    // first but its 'change' event turned out not to fire reliably here.
    const onViewportResize = () => map.resize();
    window.visualViewport?.addEventListener('resize', onViewportResize);

    mapRef.current = map;
    return () => {
      resizeObserver.disconnect();
      window.visualViewport?.removeEventListener('resize', onViewportResize);
      markersRef.current.forEach((m) => m.remove());
      map.remove();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    const level = LEVELS[levelIdx];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    map.setProjection(level.projection ?? 'mercator');
    map.setMinZoom(level.minZoom ?? 0.2);
    map.flyTo({ center: level.center, zoom: level.zoom, duration: reduceMotion ? 0 : 1400 });

    // Worldwide is a fixed establishing shot, not something to explore —
    // panning/zooming it doesn't add value the way it does once pins are
    // spread across an actual country or city, and disabling it removes
    // any temptation to drag it into an awkward, un-reset-able framing.
    const isWorldwide = levelIdx === 0;
    map.dragPan[isWorldwide ? 'disable' : 'enable']();
    map.scrollZoom[isWorldwide ? 'disable' : 'enable']();
    map.doubleClickZoom[isWorldwide ? 'disable' : 'enable']();

    markersRef.current.forEach((m) => m.remove());

    // Two passes, not one bundled marker per pin: every pin marker is
    // created (and so, DOM-appended) before any callout marker, which
    // guarantees every callout paints above every pin — see the note on
    // createPinEl/createCalloutEl for why a single marker's own z-index
    // can't achieve that across DIFFERENT markers.
    const pinMarkers = level.pins.map((pin, i) => {
      const el = createPinEl(pin, pin.brand);
      el.style.setProperty('--pd', `${i * 60}ms`);
      return new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([pin.lon, pin.lat])
        .addTo(map);
    });
    const calloutMarkers = level.pins.map((pin, i) => {
      const el = createCalloutEl(pin, pin.brand);
      el.style.setProperty('--pd', `${i * 60}ms`);
      return new mapboxgl.Marker({ element: el, anchor: 'bottom', offset: CALLOUT_OFFSET })
        .setLngLat([pin.lon, pin.lat])
        .addTo(map);
    });
    markersRef.current = [...pinMarkers, ...calloutMarkers];
  }, [ready, levelIdx]);

  useEffect(() => {
    clearInterval(timerRef.current);
    if (playing) {
      timerRef.current = setInterval(() => {
        setLevelIdx((i) => (i + 1) % LEVELS.length);
      }, AUTOPLAY_MS);
    }
    return () => clearInterval(timerRef.current);
  }, [playing, levelIdx]);

  return (
    <div className="rm2">
      <div className="rm2-kicker">POLIRIS · REAL MARKET</div>

      <div className="rm2-legend">
        <div className="rm2-legend-title">Brands tracked</div>
        {Object.entries(BRANDS).map(([key, b]) => (
          <div key={key} className="rm2-legend-row">
            <img src={`${import.meta.env.BASE_URL}${b.logo}`} alt="" className="rm2-legend-logo" />
            {b.name}
          </div>
        ))}
      </div>

      <div className="rm2-mapbox" ref={containerRef} />

      <div className="rm2-bar">
        <div className="rm2-tabs">
          {LEVELS.map((l, i) => (
            <button
              key={l.label}
              className={`rm2-tab${i === levelIdx ? ' on' : ''}`}
              onClick={() => setLevelIdx(i)}
            >
              <b>0{i + 1}</b>{l.label}
            </button>
          ))}
        </div>
        <span className="rm2-sep" />
        <button
          className="rm2-play"
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l13 7-13 7z"/></svg>
          )}
        </button>
      </div>
    </div>
  );
}
