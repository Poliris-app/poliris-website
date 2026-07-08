import { useEffect, useRef } from 'react';
import { geoOrthographic, geoPath, geoGraticule, geoDistance } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

const land      = feature(world, world.objects.land);
const borders   = mesh(world, world.objects.countries, (a, b) => a !== b);
const graticule = geoGraticule()();
const sphere    = { type: 'Sphere' };

// Zoom multipliers relative to base scale
const SCOPE_ZOOM = {
  worldwide: 1,
  country:   2.7,
  region:    5.5,
  local:     10,
};

// Geographic focal points [lambda = -lon, phi = -lat]
const SCOPE_FOCUS = {
  worldwide: { lambda: 0,     phi: 0      },
  country:   { lambda: -2.21, phi: -46.23 },
  region:    { lambda: -4.39, phi: -45.44 },
  local:     { lambda: -4.84, phi: -45.76 },
};

const SCOPE_MARKERS = {
  worldwide: [{ lon: 121.77, lat: 12.88, label: 'Philippines'         }],
  country:   [{ lon: 2.21,   lat: 46.23, label: 'France'               }],
  region:    [{ lon: 4.39,   lat: 45.44, label: 'Auvergne-Rhône-Alpes' }],
  local:     [{ lon: 4.84,   lat: 45.76, label: 'Lyon'                 }],
};

function drawMarker(ctx, proj, viewCenter, m, t) {
  if (geoDistance(viewCenter, [m.lon, m.lat]) >= Math.PI / 2) return;
  const pos = proj([m.lon, m.lat]);
  if (!pos) return;
  const [px, py] = pos;
  const pulse = (Math.sin(t * 0.0025) + 1) / 2;

  ctx.beginPath();
  ctx.arc(px, py, 11 + pulse * 5, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(90, 180, 255, ${0.15 + pulse * 0.20})`;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(px, py, 6.5, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(120, 200, 255, 0.75)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(px, py, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = '#7dd4fc';
  ctx.fill();

  const label = m.label;
  const fontSize = label.length > 14 ? 9.5 : 11;
  ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  const textW = ctx.measureText(label).width;
  const tx = px, ty = py - 18;
  const pad = 5;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(tx - textW / 2 - pad, ty - fontSize - 1, textW + pad * 2, fontSize + 5, 4);
  ctx.fillStyle = 'rgba(4, 12, 36, 0.72)';
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = 'rgba(200, 230, 255, 0.95)';
  ctx.fillText(label, tx, ty);
}

export default function GlobeMap({ scope, onRotationComplete }) {
  const wrapRef    = useRef(null);
  const canvasRef  = useRef(null);
  const lambdaRef  = useRef(0);
  const phiRef     = useRef(0);
  const scaleRef   = useRef(0);       // set after reading container
  const baseScaleRef = useRef(0);
  const targetRef  = useRef({ lambda: 0, phi: 0, scale: 0 });
  const scopeRef   = useRef(scope);
  const isDragging = useRef(false);
  const lastXY     = useRef({ x: 0, y: 0 });
  const rotationAccumRef = useRef(0);
  const rotationFiredRef = useRef(false);
  const onRotationCompleteRef = useRef(onRotationComplete);
  onRotationCompleteRef.current = onRotationComplete;

  useEffect(() => {
    const focus = SCOPE_FOCUS[scope] || SCOPE_FOCUS.worldwide;
    const zoom  = SCOPE_ZOOM[scope]  || 1;
    let dl = (focus.lambda - lambdaRef.current) % 360;
    if (dl > 180)  dl -= 360;
    if (dl < -180) dl += 360;
    targetRef.current = {
      lambda: lambdaRef.current + dl,
      phi:    focus.phi,
      scale:  baseScaleRef.current * zoom,
    };
    scopeRef.current = scope;
    if (scope === 'worldwide') {
      rotationAccumRef.current = 0;
      rotationFiredRef.current = false;
    }
  }, [scope]);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const dpr = window.devicePixelRatio || 1;
    let W, H, BASE, ctx, proj, raf;

    function setup() {
      W = wrap.offsetWidth  || 700;
      H = wrap.offsetHeight || 420;
      BASE = Math.min(W, H) / 2 - 16;

      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';

      ctx = canvas.getContext('2d');
      ctx.resetTransform?.();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      proj = geoOrthographic()
        .translate([W / 2, H / 2])
        .clipAngle(90);

      baseScaleRef.current = BASE;

      // Recompute target scale with new BASE
      const zoom = SCOPE_ZOOM[scopeRef.current] || 1;
      const prevScale = scaleRef.current;
      scaleRef.current  = prevScale > 0 ? prevScale * (BASE / (prevScale / (SCOPE_ZOOM[scopeRef.current] || 1))) : BASE;
      scaleRef.current  = BASE; // reset on resize
      targetRef.current = { ...targetRef.current, scale: BASE * zoom };
    }

    function draw(t) {
      if (!ctx || !proj) return;
      ctx.clearRect(0, 0, W, H);

      const R  = scaleRef.current;
      const cx = W / 2, cy = H / 2;
      proj.scale(R).rotate([lambdaRef.current, phiRef.current]);
      const path = geoPath(proj, ctx);

      // Atmosphere glow (drawn first, behind everything)
      const atmosR = R * 1.18;
      const atmos = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, atmosR);
      atmos.addColorStop(0,   'rgba(40, 100, 240, 0.30)');
      atmos.addColorStop(0.4, 'rgba(30, 70,  200, 0.12)');
      atmos.addColorStop(1,   'rgba(0,  0,   0,   0)');
      ctx.beginPath();
      ctx.arc(cx, cy, atmosR, 0, Math.PI * 2);
      ctx.fillStyle = atmos;
      ctx.fill();

      // Clip to canvas rect (important at high zoom)
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, H);
      ctx.clip();

      // Ocean
      ctx.beginPath();
      path(sphere);
      const ocean = ctx.createRadialGradient(cx * 0.85, cy * 0.72, 0, cx, cy, Math.max(R, Math.max(W, H)));
      ocean.addColorStop(0.0, '#0e2044');
      ocean.addColorStop(0.5, '#07112a');
      ocean.addColorStop(1.0, '#030a1a');
      ctx.fillStyle = ocean;
      ctx.fill();

      // Graticule
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = 'rgba(50, 90, 180, 0.10)';
      ctx.lineWidth = 0.35;
      ctx.stroke();

      // Land
      ctx.beginPath();
      path(land);
      const lnd = ctx.createRadialGradient(cx * 0.85, cy * 0.72, 0, cx, cy, Math.max(R, Math.max(W, H)));
      lnd.addColorStop(0.0, '#2a3f72');
      lnd.addColorStop(0.55, '#1b3060');
      lnd.addColorStop(1.0, '#0e1e3c');
      ctx.fillStyle = lnd;
      ctx.fill();

      // Borders
      ctx.beginPath();
      path(borders);
      ctx.strokeStyle = 'rgba(120, 170, 255, 0.35)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Depth shading + specular (only when sphere visible as full circle)
      if (R < Math.min(W, H) * 0.5) {
        ctx.beginPath();
        path(sphere);
        const shade = ctx.createRadialGradient(cx * 0.76, cy * 0.68, R * 0.05, cx, cy, R);
        shade.addColorStop(0.25, 'rgba(0,0,0,0)');
        shade.addColorStop(0.70, 'rgba(0,0,0,0.22)');
        shade.addColorStop(1.00, 'rgba(0,0,0,0.68)');
        ctx.fillStyle = shade;
        ctx.fill();

        ctx.beginPath();
        path(sphere);
        const spec = ctx.createRadialGradient(cx * 0.68, cy * 0.56, 0, cx * 0.68, cy * 0.56, R * 0.75);
        spec.addColorStop(0.0, 'rgba(170, 210, 255, 0.07)');
        spec.addColorStop(0.4, 'rgba(100, 160, 255, 0.03)');
        spec.addColorStop(1.0, 'rgba(0,0,0,0)');
        ctx.fillStyle = spec;
        ctx.fill();
      }

      // Markers
      const s = scopeRef.current;
      const markers = SCOPE_MARKERS[s] || [];
      const viewCenter = [-lambdaRef.current, -phiRef.current];
      for (const m of markers) drawMarker(ctx, proj, viewCenter, m, t);

      ctx.restore();
    }

    function animate(t) {
      const tgt = targetRef.current;
      const s   = scopeRef.current;

      if (s === 'worldwide' && !isDragging.current) {
        lambdaRef.current -= 0.16;
        tgt.lambda = lambdaRef.current;
        rotationAccumRef.current += 0.16;
        if (rotationAccumRef.current >= 360 && !rotationFiredRef.current) {
          rotationFiredRef.current = true;
          onRotationCompleteRef.current?.();
        }
      } else {
        lambdaRef.current += (tgt.lambda - lambdaRef.current) * 0.04;
        phiRef.current    += (tgt.phi    - phiRef.current)    * 0.04;
      }
      scaleRef.current += (tgt.scale - scaleRef.current) * 0.04;

      draw(t);
      raf = requestAnimationFrame(animate);
    }

    setup();

    // Init scale refs before first animate
    scaleRef.current        = BASE;
    targetRef.current.scale = BASE * (SCOPE_ZOOM[scope] || 1);
    baseScaleRef.current    = BASE;

    raf = requestAnimationFrame(animate);
    canvas.style.opacity = '1';

    const ro = new ResizeObserver(setup);
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function onPointerDown(e) {
    isDragging.current = true;
    lastXY.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e) {
    if (!isDragging.current) return;
    const dx = e.clientX - lastXY.current.x;
    const dy = e.clientY - lastXY.current.y;
    lastXY.current = { x: e.clientX, y: e.clientY };
    const degPerPx = 90 / scaleRef.current;
    lambdaRef.current -= dx * degPerPx;
    phiRef.current     = Math.max(-80, Math.min(80, phiRef.current + dy * degPerPx));
    targetRef.current  = { ...targetRef.current, lambda: lambdaRef.current, phi: phiRef.current };
  }
  function onPointerUp() { isDragging.current = false; }

  return (
    <div ref={wrapRef} className="globe-wrap"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <canvas ref={canvasRef} className="globe-canvas" />
    </div>
  );
}
