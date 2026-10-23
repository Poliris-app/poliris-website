import { easeInOut, easeOut } from './heroWindowUtils';

/* Trading Zone Map — 9s loop, ported from the reference.
   A spotlight travels New York → London → Tokyo and back. Inside the lens
   the map is in full colour; everything outside is washed out. The card
   underneath reads out the city it is over.

   The two map layers are the reference's own artwork (public/hero-map-*.svg),
   drawn equirectangular over lon -180..180 and lat 80..-58 — which is what
   makes the percentage maths below line up with the image. */

export const MAP_CYCLE = 9000;

const CITIES = [
  { name: 'New York', lon: -74, lat: 40.7, score: 82, rank: '#1 vs competitors' },
  { name: 'Sydney', lon: 151.2, lat: -33.9, score: 61, rank: '#2 vs competitors' },
  { name: 'London', lon: -0.1, lat: 51.5, score: 54, rank: '#2 vs competitors' },
  { name: 'Tokyo', lon: 139.7, lat: 35.7, score: 40, rank: '#3 vs competitors' },
  { name: 'São Paulo', lon: -46.6, lat: -23.5, score: 27, rank: '#4 vs competitors' },
];

const ROUTE = [0, 2, 3];
const SEGMENT = 3000;

const gx = (lon) => ((lon + 180) / 360) * 100;
const gy = (lat) => ((80 - lat) / 138) * 100;
const scoreColor = (v) => (v >= 70 ? '#16A34A' : v >= 50 ? '#0062FF' : v >= 35 ? '#F59E0B' : '#E8590C');

export default function WinMap({ now }) {
  const tm = now % MAP_CYCLE;
  const loop = Math.floor(now / MAP_CYCLE);

  const seg = Math.min(ROUTE.length - 1, Math.floor(tm / SEGMENT));
  const frac = (tm % SEGMENT) / SEGMENT;
  const from = CITIES[ROUTE[seg]];
  const to = CITIES[ROUTE[(seg + 1) % ROUTE.length]];
  const move = easeInOut((frac - 0.62) / 0.38);

  const lensX = gx(from.lon) + (gx(to.lon) - gx(from.lon)) * move;
  const lensY = gy(from.lat) + (gy(to.lat) - gy(from.lat)) * move;
  const current = move > 0.5 ? to : from;
  const tipK = move > 0 && move < 1 ? Math.abs(move - 0.5) * 2 : 1;
  const tipO = tipK * (loop > 0 ? 1 : easeOut((tm - 200) / 300));
  const color = scoreColor(current.score);

  const mask = (inside) => {
    const stops = inside ? '#000 88%,transparent 100%' : 'transparent 92%,#000 100%';
    const image = `radial-gradient(circle 30px at ${lensX}% ${lensY}%,${stops})`;
    return { WebkitMaskImage: image, maskImage: image };
  };

  const base = import.meta.env.BASE_URL;

  return (
    <div className="hfw__body hfw-map">
      <div className="hfw-map__plate">
        <img className="hfw-map__layer" src={`${base}hero-map-base.svg`} alt="" />
        <img className="hfw-map__layer" src={`${base}hero-map-lit.svg`} alt="" style={mask(true)} />

        {CITIES.map((c) => (
          <span
            key={c.name}
            className="hfw-map__dot"
            style={{ left: `${gx(c.lon)}%`, top: `${gy(c.lat)}%`, background: scoreColor(c.score) }}
          />
        ))}

        {/* Everything outside the lens dims back down */}
        <span className="hfw-map__veil" style={mask(false)} />

        <span
          className="hfw-map__lens"
          style={{ left: `${lensX}%`, top: `${lensY}%`, boxShadow: `0 0 0 1.5px ${color},inset 0 0 0 3px rgba(255,255,255,.7),0 10px 26px -8px rgba(15,23,42,.35)` }}
        />
      </div>

      <div className="hfw-map__readout">
        <div className="hfw__stack" style={{ opacity: tipO, transform: `translateY(${(1 - tipK) * 5}px)` }}>
          <span className="hfw-map__city">{current.name}</span>
          <span className="hfw__sub">{current.rank}</span>
        </div>
        <span className="hfw-map__score" style={{ color, opacity: tipO }}>{current.score}%</span>
      </div>
    </div>
  );
}
