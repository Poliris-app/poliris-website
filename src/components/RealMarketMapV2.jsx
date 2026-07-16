import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// Real footwear competitors already tracked elsewhere on the site
// (see COMPETITORS in SentimentPage.jsx) — same brands, same logo
// assets, so this map reads as part of one product story instead of
// inventing a new cast of brands.
// `accent` only colors the small swatch dot in each callout now (see
// createCalloutEl) — every pin on the map itself shares one color
// (PIN_FILL, below) instead, since the logo badge on each pin already
// identifies the brand unambiguously, and a single color sidesteps
// having to contrast-check 6 different hues against the map's own
// light land/water colors. `accent` here is kept in sync with
// SentimentPage.jsx's COMPETITORS (same swatch/badge purpose there).
const BRANDS = {
  nike:       { name: 'Nike',        accent: '#111827', logo: 'nike-com-logo.png' },
  adidas:     { name: 'Adidas',      accent: '#dc2626', logo: 'adidas-group-com-logo.png' },
  on:         { name: 'On',          accent: '#db2777', logo: 'on-com-logo.png' },
  hoka:       { name: 'Hoka',        accent: '#ea580c', logo: 'hoka-com-logo.png' },
  brooks:     { name: 'Brooks',      accent: '#7c3aed', logo: 'brooksrunning-com-logo.png' },
  newbalance: { name: 'New Balance', accent: '#475569', logo: 'newbalance-com-logo.png' },
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
    minZoom: 1.0,
    // Natural Earth's oval is geometrically centered on [0, 0] (equator,
    // prime meridian) — centering the viewport there too means the oval
    // gets even margin on every side, instead of the previous [0, 15]
    // shifting the whole oval upward and clipping/cropping asymmetrically.
    center: [0, 0], zoom: 1.0,
    pins: [
      { lon: -74.01, lat: 40.71,  brand: 'nike',   zone: 'North America', stat: '58% share of voice' },
      { lon: 2.35,   lat: 48.86,  brand: 'adidas', zone: 'Europe',        stat: '51% share of voice' },
      // Beijing, not Tokyo: Japan is a relatively small island chain that
      // gets visually lost against the ocean at world-continent zoom —
      // mainland China is unambiguously in the middle of a huge landmass
      // at any zoom, so the pin never looks like it's floating in water.
      { lon: 116.4,  lat: 39.9,   brand: 'nike',   zone: 'Asia',          stat: '62% share of voice' },
      { lon: 3.38,   lat: 6.52,   brand: 'nike',   zone: 'Africa',        stat: '44% share of voice' },
      { lon: -46.63, lat: -23.55, brand: 'adidas', zone: 'South America', stat: '49% share of voice' },
      { lon: 151.21, lat: -33.87, brand: 'hoka',   zone: 'Oceania',       stat: '38% share of voice' },
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

// Click-driven exploration, independent of the scripted LEVELS/autoplay
// flow above: clicking one of the 6 Worldwide pins drills into that
// specific continent's own countries -> a representative country's
// regions -> a representative region's local areas. Keyed by the same
// continent names used in LEVELS[0].pins[].zone, so a clicked pin's
// `zone` maps directly to its dataset. Europe reuses the existing
// scripted Country/Region/Local data verbatim rather than duplicating it.
// Every other continent's country/region/local pins are real cities/
// regions, newly authored for this feature.
const EXPLORE = {
  Europe: {
    countries: { center: LEVELS[1].center, zoom: LEVELS[1].zoom, pins: LEVELS[1].pins },
    regionCountry: 'France',
    region: { center: LEVELS[2].center, zoom: LEVELS[2].zoom, pins: LEVELS[2].pins },
    localRegion: 'Île-de-France',
    local: { center: LEVELS[3].center, zoom: LEVELS[3].zoom, pins: LEVELS[3].pins },
  },
  'North America': {
    countries: {
      center: [-95, 32], zoom: 2.6,
      pins: [
        { lon: -118.24, lat: 34.05, brand: 'nike',       zone: 'United States',       stat: '56% share of voice' },
        { lon: -79.38,  lat: 43.65, brand: 'newbalance', zone: 'Canada',              stat: '44% share of voice' },
        { lon: -99.13,  lat: 19.43, brand: 'adidas',     zone: 'Mexico',              stat: '47% share of voice' },
        { lon: -82.37,  lat: 23.11, brand: 'on',         zone: 'Cuba',                stat: '33% share of voice' },
        { lon: -69.90,  lat: 18.49, brand: 'nike',       zone: 'Dominican Republic',  stat: '41% share of voice' },
        { lon: -84.09,  lat: 9.93,  brand: 'hoka',       zone: 'Costa Rica',          stat: '38% share of voice' },
      ],
    },
    regionCountry: 'United States',
    region: {
      center: [-98, 39], zoom: 3.3,
      pins: [
        { lon: -118.24, lat: 34.05, brand: 'nike',       zone: 'California', stat: '61% share of voice' },
        { lon: -95.37,  lat: 29.76, brand: 'adidas',     zone: 'Texas',      stat: '52% share of voice' },
        { lon: -74.01,  lat: 40.71, brand: 'on',         zone: 'New York',   stat: '49% share of voice' },
        { lon: -80.19,  lat: 25.76, brand: 'newbalance', zone: 'Florida',    stat: '45% share of voice' },
        { lon: -87.63,  lat: 41.88, brand: 'nike',       zone: 'Illinois',   stat: '54% share of voice' },
        // Brooks is headquartered in Seattle — a small real-world anchor
        // for an otherwise illustrative dataset.
        { lon: -122.33, lat: 47.61, brand: 'brooks',     zone: 'Washington', stat: '58% share of voice' },
      ],
    },
    localRegion: 'California',
    local: {
      center: [-118.35, 34.04], zoom: 9.8,
      pins: [
        { lon: -118.2437, lat: 34.0407, brand: 'nike',       zone: 'Downtown LA',   stat: '60% share of voice' },
        { lon: -118.4912, lat: 34.0195, brand: 'on',         zone: 'Santa Monica',  stat: '55% share of voice' },
        { lon: -118.3287, lat: 34.0928, brand: 'adidas',     zone: 'Hollywood',     stat: '47% share of voice' },
        { lon: -118.4695, lat: 33.9850, brand: 'hoka',       zone: 'Venice',        stat: '52% share of voice' },
        { lon: -118.4004, lat: 34.0736, brand: 'newbalance', zone: 'Beverly Hills', stat: '44% share of voice' },
      ],
    },
  },
  Asia: {
    countries: {
      center: [105, 22], zoom: 2.35,
      pins: [
        { lon: 121.47, lat: 31.23,  brand: 'nike',   zone: 'China',       stat: '58% share of voice' },
        { lon: 139.69, lat: 35.68,  brand: 'adidas', zone: 'Japan',       stat: '53% share of voice' },
        { lon: 72.88,  lat: 19.08,  brand: 'nike',   zone: 'India',       stat: '49% share of voice' },
        { lon: 126.98, lat: 37.57,  brand: 'on',     zone: 'South Korea', stat: '51% share of voice' },
        { lon: 106.85, lat: -6.21,  brand: 'adidas', zone: 'Indonesia',   stat: '44% share of voice' },
        { lon: 106.63, lat: 10.82,  brand: 'nike',   zone: 'Vietnam',     stat: '46% share of voice' },
      ],
    },
    regionCountry: 'Japan',
    region: {
      center: [137, 37], zoom: 4.4,
      pins: [
        { lon: 139.69, lat: 35.68, brand: 'adidas',     zone: 'Tokyo',    stat: '55% share of voice' },
        { lon: 135.50, lat: 34.69, brand: 'nike',       zone: 'Osaka',    stat: '50% share of voice' },
        { lon: 139.64, lat: 35.44, brand: 'on',         zone: 'Kanagawa', stat: '47% share of voice' },
        { lon: 136.91, lat: 35.18, brand: 'newbalance', zone: 'Aichi',    stat: '43% share of voice' },
        { lon: 130.42, lat: 33.59, brand: 'nike',       zone: 'Fukuoka',  stat: '45% share of voice' },
        { lon: 141.35, lat: 43.06, brand: 'hoka',       zone: 'Hokkaido', stat: '41% share of voice' },
      ],
    },
    localRegion: 'Tokyo',
    local: {
      center: [139.735, 35.685], zoom: 10.4,
      pins: [
        { lon: 139.7016, lat: 35.6580, brand: 'nike',       zone: 'Shibuya',   stat: '62% share of voice' },
        { lon: 139.7005, lat: 35.6938, brand: 'adidas',     zone: 'Shinjuku',  stat: '54% share of voice' },
        { lon: 139.7673, lat: 35.6717, brand: 'on',         zone: 'Ginza',     stat: '48% share of voice' },
        { lon: 139.7027, lat: 35.6702, brand: 'hoka',       zone: 'Harajuku',  stat: '57% share of voice' },
        { lon: 139.7745, lat: 35.6984, brand: 'newbalance', zone: 'Akihabara', stat: '42% share of voice' },
      ],
    },
  },
  Africa: {
    countries: {
      center: [15, 5], zoom: 2.5,
      pins: [
        { lon: 3.38,  lat: 6.52,   brand: 'nike',   zone: 'Nigeria',      stat: '44% share of voice' },
        { lon: 28.05, lat: -26.20, brand: 'adidas', zone: 'South Africa', stat: '52% share of voice' },
        { lon: 31.24, lat: 30.04,  brand: 'nike',   zone: 'Egypt',        stat: '41% share of voice' },
        { lon: 36.82, lat: -1.29,  brand: 'on',     zone: 'Kenya',        stat: '39% share of voice' },
        { lon: -7.62, lat: 33.57,  brand: 'adidas', zone: 'Morocco',      stat: '45% share of voice' },
        { lon: -0.19, lat: 5.60,   brand: 'nike',   zone: 'Ghana',        stat: '43% share of voice' },
      ],
    },
    regionCountry: 'South Africa',
    region: {
      center: [26, -29], zoom: 4.2,
      pins: [
        { lon: 28.05, lat: -26.20, brand: 'adidas',     zone: 'Gauteng',       stat: '55% share of voice' },
        { lon: 18.42, lat: -33.92, brand: 'on',         zone: 'Western Cape',  stat: '48% share of voice' },
        { lon: 31.02, lat: -29.86, brand: 'nike',       zone: 'KwaZulu-Natal', stat: '46% share of voice' },
        { lon: 25.60, lat: -33.96, brand: 'newbalance', zone: 'Eastern Cape',  stat: '39% share of voice' },
        { lon: 26.21, lat: -29.12, brand: 'adidas',     zone: 'Free State',    stat: '41% share of voice' },
        { lon: 27.24, lat: -25.67, brand: 'hoka',       zone: 'North West',    stat: '37% share of voice' },
      ],
    },
    localRegion: 'Gauteng',
    local: {
      center: [27.99, -26.15], zoom: 9.7,
      pins: [
        { lon: 28.0567, lat: -26.1076, brand: 'adidas',     zone: 'Sandton',  stat: '58% share of voice' },
        { lon: 28.0436, lat: -26.1467, brand: 'on',         zone: 'Rosebank', stat: '50% share of voice' },
        { lon: 27.9967, lat: -26.1789, brand: 'nike',       zone: 'Melville', stat: '46% share of voice' },
        { lon: 27.8546, lat: -26.2485, brand: 'newbalance', zone: 'Soweto',   stat: '42% share of voice' },
        { lon: 28.0100, lat: -26.0170, brand: 'hoka',       zone: 'Fourways', stat: '44% share of voice' },
      ],
    },
  },
  'South America': {
    countries: {
      center: [-63, -18], zoom: 2.6,
      pins: [
        { lon: -43.17, lat: -22.91, brand: 'adidas',     zone: 'Brazil',    stat: '53% share of voice' },
        { lon: -58.38, lat: -34.60, brand: 'nike',       zone: 'Argentina', stat: '47% share of voice' },
        { lon: -70.65, lat: -33.45, brand: 'adidas',     zone: 'Chile',     stat: '42% share of voice' },
        { lon: -74.08, lat: 4.71,   brand: 'nike',       zone: 'Colombia',  stat: '45% share of voice' },
        { lon: -77.03, lat: -12.05, brand: 'newbalance', zone: 'Peru',      stat: '38% share of voice' },
        { lon: -56.19, lat: -34.90, brand: 'on',         zone: 'Uruguay',   stat: '40% share of voice' },
      ],
    },
    regionCountry: 'Brazil',
    region: {
      center: [-47, -17], zoom: 3.5,
      pins: [
        { lon: -46.63, lat: -23.55, brand: 'adidas',     zone: 'São Paulo',           stat: '56% share of voice' },
        { lon: -43.17, lat: -22.91, brand: 'nike',       zone: 'Rio de Janeiro',      stat: '51% share of voice' },
        { lon: -43.94, lat: -19.92, brand: 'on',         zone: 'Minas Gerais',        stat: '44% share of voice' },
        { lon: -38.50, lat: -12.97, brand: 'nike',       zone: 'Bahia',               stat: '42% share of voice' },
        { lon: -49.27, lat: -25.43, brand: 'newbalance', zone: 'Paraná',              stat: '46% share of voice' },
        { lon: -51.23, lat: -30.03, brand: 'adidas',     zone: 'Rio Grande do Sul',   stat: '43% share of voice' },
      ],
    },
    localRegion: 'São Paulo',
    local: {
      center: [-46.68, -23.575], zoom: 10.4,
      pins: [
        { lon: -46.6566, lat: -23.5670, brand: 'adidas',     zone: 'Jardins',        stat: '60% share of voice' },
        { lon: -46.6919, lat: -23.5560, brand: 'on',         zone: 'Vila Madalena',  stat: '52% share of voice' },
        { lon: -46.6776, lat: -23.5850, brand: 'nike',       zone: 'Itaim Bibi',     stat: '49% share of voice' },
        { lon: -46.7025, lat: -23.5670, brand: 'hoka',       zone: 'Pinheiros',      stat: '45% share of voice' },
        { lon: -46.6650, lat: -23.6000, brand: 'newbalance', zone: 'Moema',          stat: '41% share of voice' },
      ],
    },
  },
  Oceania: {
    // Genuinely only 3 sizeable, real sportswear markets in this region —
    // padding to match the other continents' pin counts with tiny island
    // nations would be fabricated filler, not real data.
    countries: {
      center: [165, -30], zoom: 3.0,
      pins: [
        { lon: 144.96, lat: -37.81, brand: 'hoka', zone: 'Australia',   stat: '41% share of voice' },
        { lon: 174.76, lat: -36.85, brand: 'hoka', zone: 'New Zealand', stat: '44% share of voice' },
        { lon: 178.44, lat: -18.14, brand: 'nike', zone: 'Fiji',        stat: '35% share of voice' },
      ],
    },
    regionCountry: 'Australia',
    region: {
      center: [140, -30], zoom: 3.5,
      pins: [
        { lon: 151.21, lat: -33.87, brand: 'hoka',   zone: 'New South Wales',    stat: '45% share of voice' },
        { lon: 144.96, lat: -37.81, brand: 'hoka',   zone: 'Victoria',           stat: '42% share of voice' },
        { lon: 153.03, lat: -27.47, brand: 'nike',   zone: 'Queensland',         stat: '40% share of voice' },
        { lon: 115.86, lat: -31.95, brand: 'adidas', zone: 'Western Australia',  stat: '38% share of voice' },
        { lon: 138.60, lat: -34.93, brand: 'on',     zone: 'South Australia',    stat: '36% share of voice' },
      ],
    },
    localRegion: 'New South Wales',
    local: {
      center: [151.19, -33.85], zoom: 10.4,
      pins: [
        { lon: 151.2743, lat: -33.8915, brand: 'hoka',       zone: 'Bondi',        stat: '50% share of voice' },
        { lon: 151.2110, lat: -33.8846, brand: 'on',         zone: 'Surry Hills',  stat: '47% share of voice' },
        { lon: 151.2867, lat: -33.7969, brand: 'nike',       zone: 'Manly',        stat: '44% share of voice' },
        { lon: 151.0011, lat: -33.8151, brand: 'newbalance', zone: 'Parramatta',   stat: '39% share of voice' },
        { lon: 151.1795, lat: -33.8981, brand: 'adidas',     zone: 'Newtown',      stat: '42% share of voice' },
      ],
    },
  },
};

const AUTOPLAY_MS = 4600;

// One look for every pin's teardrop — a light fill with a dark outline,
// rather than a dark/colored fill. Adidas's logo file is the one brand
// asset with a transparent background (every other brand's file already
// bakes in its own opaque background) — on a dark or colored pin fill,
// its transparent areas show that color bleeding through behind the
// logo instead of a clean edge; a light fill lets it, and every other
// brand's badge, sit consistently. The outline (not the fill) carries
// the contrast against the map's own light land/water colors.
const PIN_FILL = '#ffffff';
const PIN_STROKE = '#1e3893'; // --poliris-blue

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
          fill="${PIN_FILL}"
          stroke="${PIN_STROKE}"
          stroke-width="2"
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
const CALLOUT_OFFSET = [0, -45];

function createCalloutEl(pin, brandKey) {
  const brand = BRANDS[brandKey];
  const el = document.createElement('div');
  el.className = 'rm2-callout-marker';
  el.innerHTML = `
    <div class="rm2-callout">
      <span class="rm2-callout-zone">${pin.zone}</span>
      <span class="rm2-callout-stat">
        <span class="rm2-callout-swatch" style="background:${brand.accent}"></span>
        ${brand.name} · ${pin.stat}
      </span>
    </div>
  `;
  return el;
}

// Derives the map's current center/zoom/pins from either the scripted
// LEVELS[levelIdx] (exploreStack empty — today's behavior, untouched) or
// the click-driven EXPLORE data (exploreStack non-empty). `clickableDepth`
// tells the pin-creation effect below whether this view's pins should get
// a click handler, and if so what kind of place they represent —
// 'continent' only at the true Worldwide view, 'country'/'region' while
// exploring at those depths, null at local depth (nothing deeper) or on
// any other scripted level (Country/Region/Local tabs stay non-clickable,
// exactly as before).
function getCurrentView(levelIdx, exploreStack) {
  if (exploreStack.length === 0) {
    const level = LEVELS[levelIdx];
    return { ...level, isWorldwide: levelIdx === 0, clickableDepth: levelIdx === 0 ? 'continent' : null, continent: null };
  }
  const continent = exploreStack[0];
  const data = EXPLORE[continent];
  if (exploreStack.length === 1) {
    return { ...data.countries, isWorldwide: false, clickableDepth: 'country', continent };
  }
  if (exploreStack.length === 2) {
    return { ...data.region, isWorldwide: false, clickableDepth: 'region', continent };
  }
  return { ...data.local, isWorldwide: false, clickableDepth: null, continent };
}

export default function RealMarketMapV2() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [ready, setReady] = useState(false);
  const [levelIdx, setLevelIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  // [] = normal scripted view. [continent] / [continent, country] /
  // [continent, country, region] = how deep the user has clicked into
  // that continent's own data — see EXPLORE and getCurrentView above.
  const [exploreStack, setExploreStack] = useState([]);
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
      // adjusted — dark-v11 (and, for the same reason, streets-v12 below)
      // is a simpler legacy style, has none of Standard's shader passes,
      // and never once rendered blurry across extensive testing.
      style: 'mapbox://styles/mapbox/streets-v12',
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
    map.once('load', () => {
      // dark-v11 hides 'country-label' (needed for "Russia" etc. on the
      // Worldwide level) and 'water-point-label' (ocean/sea names, e.g.
      // "Pacific Ocean") below zoom 1 — below every zoom this map's
      // Worldwide level ever uses (~0.65-0.95), so they never appear by
      // default; only 'continent-label' has a low-enough built-in
      // minzoom (0.75) to show. Lowering both floors to 0 makes them
      // eligible at every zoom level here; Mapbox's own label priority/
      // collision detection still keeps it to just the biggest countries
      // and oceans at low zoom, not every small nation and sea.
      map.setLayerZoomRange('country-label', 0, 10);
      map.setLayerZoomRange('water-point-label', 0, 24);
      setReady(true);
    });

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

    const view = getCurrentView(levelIdx, exploreStack);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    map.setProjection(view.projection ?? 'mercator');
    map.setMinZoom(view.minZoom ?? 0.2);
    map.flyTo({ center: view.center, zoom: view.zoom, duration: reduceMotion ? 0 : 1400 });

    // Worldwide is a fixed establishing shot, not something to explore —
    // panning/zooming it doesn't add value the way it does once pins are
    // spread across an actual country or city, and disabling it removes
    // any temptation to drag it into an awkward, un-reset-able framing.
    // Once the user has clicked into a continent, this is just another
    // interactive level like Country/Region/Local, regardless of levelIdx.
    map.dragPan[view.isWorldwide ? 'disable' : 'enable']();
    map.scrollZoom[view.isWorldwide ? 'disable' : 'enable']();
    map.doubleClickZoom[view.isWorldwide ? 'disable' : 'enable']();

    markersRef.current.forEach((m) => m.remove());

    // A pin at a clickable depth either drills one level deeper (if it's
    // the continent's designated regionCountry/localRegion — see EXPLORE)
    // or just flies the map in closer on it in place, keeping the current
    // pins. Every pin stays responsive; only the one representative path
    // per continent actually swaps in new data, matching the region/local
    // depth we've authored for each continent (see EXPLORE above).
    function handlePinClick(pin) {
      if (view.clickableDepth === 'continent') {
        if (!EXPLORE[pin.zone]) return;
        setPlaying(false);
        setExploreStack([pin.zone]);
        return;
      }
      const data = EXPLORE[view.continent];
      const isRegionCountry = view.clickableDepth === 'country' && pin.zone === data.regionCountry;
      const isLocalRegion = view.clickableDepth === 'region' && pin.zone === data.localRegion;
      if (isRegionCountry || isLocalRegion) {
        setPlaying(false);
        setExploreStack([...exploreStack, pin.zone]);
      } else {
        map.flyTo({ center: [pin.lon, pin.lat], zoom: view.zoom + 2.2, duration: reduceMotion ? 0 : 1000 });
      }
    }

    // Two passes, not one bundled marker per pin: every pin marker is
    // created (and so, DOM-appended) before any callout marker, which
    // guarantees every callout paints above every pin — see the note on
    // createPinEl/createCalloutEl for why a single marker's own z-index
    // can't achieve that across DIFFERENT markers.
    const pinMarkers = view.pins.map((pin, i) => {
      const el = createPinEl(pin, pin.brand);
      el.style.setProperty('--pd', `${i * 60}ms`);
      if (view.clickableDepth) {
        el.classList.add('rm2-marker--clickable');
        el.addEventListener('click', () => handlePinClick(pin));
      }
      return new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([pin.lon, pin.lat])
        .addTo(map);
    });
    const calloutMarkers = view.pins.map((pin, i) => {
      const el = createCalloutEl(pin, pin.brand);
      el.style.setProperty('--pd', `${i * 60}ms`);
      if (view.clickableDepth) {
        el.classList.add('rm2-callout-marker--clickable');
        el.addEventListener('click', () => handlePinClick(pin));
      }
      return new mapboxgl.Marker({ element: el, anchor: 'bottom', offset: CALLOUT_OFFSET })
        .setLngLat([pin.lon, pin.lat])
        .addTo(map);
    });
    markersRef.current = [...pinMarkers, ...calloutMarkers];
  }, [ready, levelIdx, exploreStack]);

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
      <div className="rm2-kicker">
        {exploreStack.length ? exploreStack.map((s) => s.toUpperCase()).join(' › ') : 'POLIRIS · REAL MARKET'}
      </div>

      <div className="rm2-legend">
        <div className="rm2-legend-title">Brands tracked</div>
        {Object.entries(BRANDS).map(([key, b]) => (
          <div key={key} className="rm2-legend-row">
            <img
              src={`${import.meta.env.BASE_URL}${b.logo}`}
              alt=""
              className="rm2-legend-logo"
            />
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
              onClick={() => { setLevelIdx(i); setExploreStack([]); }}
            >
              <b>0{i + 1}</b>{l.label}
            </button>
          ))}
        </div>
        <span className="rm2-sep" />
        <button
          className="rm2-play"
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={() => {
            // Resuming autoplay while mid-explore should return to the
            // scripted flow, not silently keep cycling explore's data.
            if (!playing) setExploreStack([]);
            setPlaying((p) => !p);
          }}
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
