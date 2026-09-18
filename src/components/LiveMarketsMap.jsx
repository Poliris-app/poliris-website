import { useMemo } from 'react';
import { geoNaturalEarth1, geoPath, geoCentroid, geoArea, geoGraticule10 } from 'd3-geo';
import { feature } from 'topojson-client';
import worldTopo from 'world-atlas/countries-110m.json';

// Redesign #2: flat gradient choropleth with a soft drop-shadow on the
// highlighted tiers and a plain halo-dot marker (no glossy pin), matching
// the "Your real market, not the whole world." mock. The headline/subtitle
// still live in VisibilityPage.jsx's own section heading (visibility.realMarket
// in the locale files) — this component just owns the map card itself.
// Tier data (which countries are in which tier) is placeholder — swap it
// for real rollout data before shipping.

// ISO country names as they appear in world-atlas's own `properties.name`
// (Natural Earth's admin names — already verified against this exact
// dataset earlier for the old map, e.g. "United States of America", not
// "USA" or "United States").
const LIVE_COUNTRIES = ['United States of America', 'France', 'Philippines'];

// Short display names for the pin labels — world-atlas's own admin name
// ("United States of America") is too wide to sit above a small pin.
const COUNTRY_LABELS = {
  'United States of America': 'USA',
  France: 'France',
  Philippines: 'Philippines',
};

// Glossy red ball-on-a-needle pin — a thin spike anchored on the map with
// a small glossy sphere at the top (radial-gradient highlight top-left,
// deep red at the rim) and a flat contact-shadow ellipse at its foot.
function Marker({ id, x, y, name }) {
  const gradId = `lmm-pin-grad-${id}`;
  return (
    <g className="lmm-marker" transform={`translate(${x} ${y})`}>
      <text className="lmm-marker-name" x="0" y="-25">{name}</text>
      <ellipse className="lmm-marker-shadow" cx="0" cy="1" rx="4.5" ry="1.6" />
      <path className="lmm-marker-needle" d="M0 0 L-1.1 -11 L1.1 -11 Z" />
      <circle className="lmm-marker-ball" cx="0" cy="-15.4" r="5.6" fill={`url(#${gradId})`} />
      <ellipse className="lmm-marker-shine" cx="-1.8" cy="-17.4" rx="2" ry="1.4" transform="rotate(-28 -1.8 -17.4)" />
      <defs>
        <radialGradient id={gradId} cx="35%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#ef6a52" />
          <stop offset="58%" stopColor="#d1402a" />
          <stop offset="100%" stopColor="#9e2415" />
        </radialGradient>
      </defs>
    </g>
  );
}

const WIDTH = 1000;
// The country union's own rendered aspect ratio (measured, not guessed) is
// ~1.93:1 — a box any wider/shorter than that leaves margin on whichever
// axis is the non-binding one. 520 puts the box ratio (~1.94) right next
// to it, so the map uses close to the full frame on every side.
const HEIGHT = 520;
const PAD = 6;

export default function LiveMarketsMap() {
  // No resize-driven recompute needed — unlike an HTML-overlay map, nothing
  // here has to land on exact pixel coordinates outside the SVG, so a plain
  // viewBox lets CSS scale the whole thing for free.
  const { base, live, markers, graticule } = useMemo(() => {
    const featureCollection = feature(worldTopo, worldTopo.objects.countries);
    // Fit to the actual union of country shapes, not the abstract full
    // globe ({type:'Sphere'}) — the sphere's own bounds include empty
    // polar ocean well past any real landmass, which was leaving the map
    // looking small and padded inside its own card.
    const projection = geoNaturalEarth1().fitExtent([[PAD, PAD], [WIDTH - PAD, HEIGHT - PAD]], featureCollection);
    const pathGen = geoPath(projection);
    const byTier = { base: [], live: [] };
    featureCollection.features.forEach((f) => {
      const name = f.properties.name;
      const d = pathGen(f);
      if (!d) return;
      const tier = LIVE_COUNTRIES.includes(name) ? 'live' : 'base';
      byTier[tier].push({ id: f.id, d });
    });

    // One flat marker per "already live" market. Anchored on the largest
    // ring of the country's own geometry (not the raw multipolygon
    // centroid) — a country with scattered overseas territory (the US's
    // own polygon includes Alaska) can have a centroid that lands nowhere
    // near its actual landmass, or even in open ocean.
    const markers = featureCollection.features
      .filter((f) => LIVE_COUNTRIES.includes(f.properties.name))
      .map((f) => {
        let geom = f.geometry;
        if (geom.type === 'MultiPolygon') {
          let best = null;
          let bestArea = -1;
          geom.coordinates.forEach((coords) => {
            const a = geoArea({ type: 'Polygon', coordinates: coords });
            if (a > bestArea) { bestArea = a; best = coords; }
          });
          geom = { type: 'Polygon', coordinates: best };
        }
        const [x, y] = projection(geoCentroid({ type: 'Feature', geometry: geom }));
        return { id: f.id, x, y, name: COUNTRY_LABELS[f.properties.name] || f.properties.name };
      });

    const graticule = pathGen(geoGraticule10());

    return { base: byTier.base, live: byTier.live, markers, graticule };
  }, []);

  return (
    <div className="lmm">
      <div className="lmm-card">
        <div className="lmm-glow" />
        <svg className="lmm-svg" width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="World map showing market rollout status by country">
          <defs>
            <linearGradient id="lmm-live-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3358cc" />
              <stop offset="100%" stopColor="#16297a" />
            </linearGradient>
            <filter id="lmm-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#152a6b" floodOpacity="0.3" />
            </filter>
          </defs>

          <path className="lmm-graticule" d={graticule} />

          <g>
            {base.map((c) => <path key={c.id} className="lmm-country lmm-country--none" d={c.d} />)}
          </g>
          <g className="lmm-shadow-group">
            {live.map((c) => <path key={c.id} className="lmm-country lmm-country--live" d={c.d} />)}
          </g>
          <g>
            {markers.map((m) => <Marker key={m.id} id={m.id} x={m.x} y={m.y} name={m.name} />)}
          </g>
        </svg>
      </div>
    </div>
  );
}
