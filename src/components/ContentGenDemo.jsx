import { useEffect, useRef, useState } from 'react';
import { useLang } from '../contexts/LangContext';

/* Card 04 (Content Generation & Optimization) demo — a port of the
   ContentGenDemo design component ("Content Generation Card.html"): one
   14.5s loop in three acts, Brief → Write → Publish. Markup, inline styles
   and timing (vals() below is the original renderVals) are kept as-is; the
   scene is authored on a fixed 531×399 stage and scaled to fit whatever box
   it's placed in (see .cgd in poliris.css). Copy lives in
   home.engine.demo.contentGen. */

const W = 531;
const H = 399;
const LOOP = 14500;

// The original is written as inline style strings; parse them once so the
// markup below can stay a near-verbatim copy.
const cache = new Map();
function css(str) {
  let o = cache.get(str);
  if (o) return o;
  o = {};
  str.split(';').forEach((decl) => {
    const i = decl.indexOf(':');
    if (i < 0) return;
    const prop = decl.slice(0, i).trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    o[prop] = decl.slice(i + 1).trim();
  });
  cache.set(str, o);
  return o;
}

function vals(t, d) {
  const cl = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
  const eo = (x) => 1 - Math.pow(1 - cl(x), 3);
  const eio = (x) => { x = cl(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const back = (x) => { x = cl(x); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
  const pop = (t0, from = 0.6, dur = 320) => ({ o: eo((t - t0) / (dur * 0.7)), s: t < t0 ? from : from + (1 - from) * back((t - t0) / dur) });
  const A = [[0, 4000], [4000, 9900], [9900, 14500]];
  const act = ([s, e]) => { const i = eo((t - s) / 420), o = cl((e - t) / 320); return { o: Math.min(i, o), y: (1 - i) * 10 - (1 - o) * 6 }; };
  const type = (str, a, b) => str.slice(0, Math.round(str.length * cl((t - a) / (b - a))));
  const blink = (on) => (on && t % 900 < 500 ? 1 : 0);
  const steps = d.steps.map((label, i) => {
    const [s, e] = A[i], on = t >= s && t < e, done = t >= e;
    return { label, mark: done ? '✓' : String(i + 1), prog: on ? cl((t - s) / (e - s)) * 100 : 0,
      bg: on ? '#EEF4FF' : 'transparent', color: on ? '#0047b8' : done ? '#3F3F46' : '#9aa1ac',
      numBg: on ? '#0062FF' : done ? '#DCFCE7' : '#EEF1F6', numColor: on ? '#fff' : done ? '#16A34A' : '#9aa1ac' };
  });

  // cursor: [time, x, y]
  const K = [[0, 300, 300], [2600, 300, 300], [3200, 447, 171], [8100, 300, 250], [8700, 435, 368], [14500, 435, 368]];
  let k = 0; while (k < K.length - 2 && t > K[k + 1][0]) k++;
  const [ta, xa, ya] = K[k], [tb, xb, yb] = K[k + 1];
  const mv = (k === 1 || k === 3) ? eio((t - ta) / (tb - ta)) : (k === 2 ? 1 : (k === 4 ? 1 : 0));
  let curX = xa + (xb - xa) * mv, curY = ya + (yb - ya) * mv;
  if (k === 2) { curX = 447; curY = 171; }
  if (k === 3 && t < 8100) { curX = 300; curY = 250; }
  const curO = Math.max(cl((t - 2600) / 200) * cl((3750 - t) / 250), cl((t - 8100) / 200) * cl((9300 - t) / 250));
  let curS = 1, ripO = 0, ripS = 0.4, ripX = 0, ripY = 0;
  [[3300, 447, 171], [8800, 435, 368]].forEach(([tc, x, y]) => { if (t > tc && t < tc + 150) curS = 0.82; const r = (t - tc) / 600; if (r > 0 && r < 1) { ripO = 0.6 * (1 - r); ripS = 0.4 + 1.4 * r; ripX = x; ripY = y; } });

  // act 1
  const prompt = d.prompt;
  const typed = t >= 300 ? type(prompt, 300, 1700) : '';
  const src = pop(1800, 0.7, 320);
  const fo = eo((t - 1900) / 400);
  const facts = d.facts.map((text, i) => {
    const ti = 2200 + i * 260, o = eo((t - ti) / 300), g = t >= ti ? cl(1 - (t - ti) / 700) : 0;
    return { text, o, y: (1 - o) * 6, border: g > 0.05 ? '#BFD3FF' : '#e6e9f0', glow: `0 0 0 ${(3 * g).toFixed(2)}px rgba(0,98,255,.12)` };
  });

  // act 2
  const title = d.articleTitle;
  const P = d.para;
  const tot = P.join('').length, n = Math.round(tot * cl((t - 5000) / 1600)), a = P[0].length, b = P[1].length;
  const ringP = eio(cl((t - 4300) / 3700));
  const CH = [[d.checks[0], 5600], [d.checks[1], 6600], [d.checks[2], 7600]];
  const checks = CH.map(([text, tc]) => { const ok = t >= tc; return { text, mark: ok ? '✓' : '', bg: ok ? '#16A34A' : '#fff', border: ok ? '#16A34A' : '#d5d9e4', color: ok ? '#09090b' : '#9aa1ac' }; });
  const pub = t < 8850 ? 'idle' : t < 9500 ? 'busy' : 'done';

  // act 3
  const win = eo((t - 9950) / 500), live = pop(10600, 0.5, 380);

  return {
    steps, a1: act(A[0]), a2: act(A[1]), a3: act(A[2]),
    inText: typed || d.placeholder, inColor: typed ? '#09090b' : '#9aa1ac',
    inBorder: t >= 300 && t < 3300 ? '#8FB4FF' : '#e3e6ec', inRing: t >= 300 && t < 3300 ? '0 0 0 3px rgba(0,98,255,.12)' : 'none',
    inCaret: blink(t >= 300 && t < 3300), srcO: src.o, srcS: src.s,
    startBg: typed.length === prompt.length ? '#0062FF' : '#8BB5FF', startS: t > 3300 && t < 3450 ? 0.95 : 1,
    factsO: fo, factsY: (1 - fo) * 8, facts,
    h1: type(title, 4200, 4900), h1Caret: blink(t >= 4200 && t < 4900), metaO: eo((t - 4950) / 300),
    pa: P[0].slice(0, Math.min(n, a)), pb: P[1].slice(0, Math.max(0, Math.min(n - a, b))), pc: P[2].slice(0, Math.max(0, n - a - b)),
    hlBg: n > a ? '#FFF4CC' : 'transparent', citeD: n >= a + b ? 'inline-flex' : 'none', pCaret: blink(t >= 5000 && n < tot),
    h2O: eo((t - 6700) / 300),
    ringOff: 163.36 * (1 - 0.91 * ringP), ringVal: Math.round(91 * ringP), strongO: eo((t - 7700) / 300),
    shimmer: 120 - ((t * 0.12) % 140), shimO: t < 7000 ? cl((t - 5200) / 200) : cl(1 - (t - 7000) / 300),
    heroO: eo((t - 7000) / 500), heroS: 1.04 - 0.04 * eo((t - 7000) / 900), checks,
    pubText: pub === 'idle' ? d.publish : pub === 'busy' ? d.publishing : d.published,
    pubBg: pub === 'done' ? '#16A34A' : t >= 8000 ? '#0062FF' : '#C9D9FF', pubS: t > 8800 && t < 8950 ? 0.96 : 1,
    spin: (t * 0.6) % 360, spinD: pub === 'busy' ? 'block' : 'none',
    winO: win, winY: (1 - win) * 18, liveO: live.o, liveS: live.s, liveY: (1 - live.o) * 6,
    curX, curY, curO, curS, ripO, ripS, ripX, ripY,
  };
}

// Product shot / hero image, shared by acts 2 and 3 (ids prefixed so they
// can't collide with other SVGs on the page).
function HeroArt({ id, style }) {
  return (
    <svg viewBox="0 0 1200 630" preserveAspectRatio="xMidYMid slice" style={style}>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0a1330" /><stop offset=".55" stopColor="#14286b" /><stop offset="1" stopColor="#2b59d9" /></linearGradient>
        <radialGradient id={`${id}gl`} cx=".5" cy=".55" r=".45"><stop offset="0" stopColor="#7fa6ff" stopOpacity=".55" /><stop offset="1" stopColor="#7fa6ff" stopOpacity="0" /></radialGradient>
        <linearGradient id={`${id}A`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fbfaf8" /><stop offset=".55" stopColor="#dcd8d1" /><stop offset="1" stopColor="#b3ada3" /></linearGradient>
        <radialGradient id={`${id}F`} cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#fff" /><stop offset=".6" stopColor="#e7e4de" /><stop offset="1" stopColor="#c4bfb6" /></radialGradient>
      </defs>
      <rect width="1200" height="630" fill={`url(#${id}bg)`} />
      <rect width="1200" height="630" fill={`url(#${id}gl)`} />
      <g fill="none" stroke="#fff"><circle cx="600" cy="330" r="210" strokeOpacity=".12" strokeWidth="3" /><circle cx="600" cy="330" r="290" strokeOpacity=".07" strokeWidth="3" /></g>
      <g transform="translate(330 110) scale(3.6)">
        <ellipse cx="34" cy="50" rx="10" ry="12.5" transform="rotate(-18 34 50)" fill="#9c968c" />
        <path d="M38 44c6-14 30-16 40-2 8 11 5 30-9 37-13 6-29 1-33-12-2-7-1-16 2-23z" fill={`url(#${id}A)`} />
        <circle cx="101" cy="58" r="24" fill={`url(#${id}A)`} />
        <circle cx="101" cy="58" r="17.5" fill={`url(#${id}F)`} />
        <circle cx="109" cy="50" r="2.2" fill="#8d877d" />
      </g>
    </svg>
  );
}

const bar = (w, bg = '#EEF1F6', extra = '') => <span style={css(`${extra}height:6px;width:${w};border-radius:4px;background:${bg}`)} />;

export default function ContentGenDemo() {
  const { t: tr } = useLang();
  const d = tr('home.engine.demo.contentGen');
  const wrapRef = useRef(null);
  // Reduced motion holds the finished "published" frame.
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [t, setT] = useState(() => (reduced ? 12000 : 0));
  const [fit, setFit] = useState({ s: 0, x: 0, y: 0 });

  // Scale the fixed stage to fit the box, centered (letterboxed).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const measure = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      const s = Math.min(w / W, h / H);
      setFit({ s, x: (w - W * s) / 2, y: (h - H * s) / 2 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The clock only runs while the demo is on screen (and resumes where it
  // left off).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduced) return undefined;
    let raf = 0, elapsed = 0, last = null;
    const tick = (now) => {
      if (last != null) elapsed += now - last;
      last = now;
      setT(elapsed % LOOP);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      last = null;
      if (e.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [reduced]);

  const v = vals(t, d);

  return (
    <div className="cgd" ref={wrapRef}>
      <div
        className="cgd__stage"
        style={{ width: W, height: H, transform: `translate(${fit.x}px, ${fit.y}px) scale(${fit.s})`, visibility: fit.s ? 'visible' : 'hidden' }}
      >
        <div style={css('position:relative;width:100%;height:100%;background:#fff;font-family:Geist,system-ui,sans-serif;color:#09090b;overflow:hidden')}>

          <div style={css('position:absolute;top:14px;right:16px;z-index:3;display:flex;gap:4px')}>
            {v.steps.map((s) => (
              <div key={s.label} style={{ ...css('position:relative;overflow:hidden;display:flex;align-items:center;gap:5px;height:22px;padding:0 9px 0 5px;border-radius:999px;font-size:10.5px;font-weight:600'), background: s.bg, color: s.color }}>
                <span style={{ ...css('width:14px;height:14px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8.5px;font-weight:700'), background: s.numBg, color: s.numColor }}>{s.mark}</span>
                <span>{s.label}</span>
                <span style={{ ...css('position:absolute;left:0;bottom:0;height:2px;background:#0062FF'), width: `${s.prog}%` }} />
              </div>
            ))}
          </div>

          {/* Act 1 · Brief */}
          <div style={{ ...css('position:absolute;inset:0'), opacity: v.a1.o, transform: `translateY(${v.a1.y}px)` }}>
            <div style={css('position:absolute;left:16px;top:14px;display:flex;flex-direction:column;gap:3px')}>
              <span style={css('font-size:14px;font-weight:700')}>{d.briefTitle}</span>
              <span style={css('font-size:11.5px;color:#6B6E72')}>{d.briefSub}</span>
            </div>
            <div style={css('position:absolute;left:16px;top:62px;width:499px;height:140px;border:1px solid #e3e6ec;border-radius:12px;background:#fff;box-shadow:0 2px 8px rgba(20,30,60,.05)')}>
              <span style={css('position:absolute;left:12px;top:11px;font-size:12.5px;font-weight:600')}>{d.inputLabel}</span>
              <div style={{ ...css('position:absolute;left:12px;top:34px;width:475px;height:50px;border-radius:8px;padding:8px 10px;font-size:12.5px;line-height:1.4'), border: `1px solid ${v.inBorder}`, color: v.inColor, boxShadow: v.inRing }}>
                <span>{v.inText}</span><span style={{ ...css('display:inline-block;width:1.5px;height:14px;margin-left:1px;vertical-align:-2px;background:#0062FF'), opacity: v.inCaret }} />
              </div>
              <div style={{ ...css('position:absolute;left:12px;top:96px;height:26px;display:flex;align-items:center;gap:6px;padding:0 10px;border-radius:999px;background:#EEF4FF;border:1px solid #BFD3FF;color:#0047b8;font-size:11px;font-weight:600;transform-origin:left center'), opacity: v.srcO, transform: `scale(${v.srcS})` }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
                <span>sony.com/headphones/wf-1000xm6</span>
              </div>
              <span style={{ ...css('position:absolute;left:375px;top:94px;width:112px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:600'), background: v.startBg, transform: `scale(${v.startS})` }}>{d.startWriting}</span>
            </div>
            <div style={{ ...css('position:absolute;left:16px;top:214px;width:499px;height:171px;border:1px solid #e3e6ec;border-radius:12px;background:#FAFBFC;padding:11px 12px;display:flex;flex-direction:column;gap:10px'), opacity: v.factsO, transform: `translateY(${v.factsY}px)` }}>
              <span style={css('font-size:9.5px;font-weight:700;letter-spacing:.05em;color:#9aa1ac')}>{d.pulled}</span>
              <div style={css('display:flex;align-items:center;gap:12px')}>
                <div style={css('width:72px;height:54px;flex:none;border-radius:8px;background:linear-gradient(180deg,#f7f7f8,#eceef1);overflow:hidden')}>
                  <svg width="72" height="54" viewBox="0 0 150 110" style={{ display: 'block' }}>
                    <defs>
                      <linearGradient id="cgd-pA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fbfaf8" /><stop offset=".55" stopColor="#dcd8d1" /><stop offset="1" stopColor="#b9b3a9" /></linearGradient>
                      <radialGradient id="cgd-pF" cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#ffffff" /><stop offset=".6" stopColor="#e7e4de" /><stop offset="1" stopColor="#c9c4bb" /></radialGradient>
                    </defs>
                    <ellipse cx="34" cy="50" rx="10" ry="12.5" transform="rotate(-18 34 50)" fill="#b3ada3" />
                    <path d="M38 44c6-14 30-16 40-2 8 11 5 30-9 37-13 6-29 1-33-12-2-7-1-16 2-23z" fill="url(#cgd-pA)" />
                    <circle cx="101" cy="58" r="24" fill="url(#cgd-pA)" />
                    <circle cx="101" cy="58" r="17.5" fill="url(#cgd-pF)" />
                    <circle cx="109" cy="50" r="2.2" fill="#8d877d" />
                  </svg>
                </div>
                <div style={css('display:flex;flex-direction:column;gap:3px;min-width:0')}>
                  <span style={css('font-size:12.5px;font-weight:600')}>{d.productName}</span>
                  <span style={css('font-size:10.5px;color:#6B6E72')}>sony.com · Truly Wireless</span>
                </div>
              </div>
              <div style={css('display:flex;flex-wrap:wrap;gap:6px')}>
                {v.facts.map((f) => (
                  <span key={f.text} style={{ ...css('display:flex;align-items:center;gap:6px;padding:5px 10px;border-radius:999px;background:#fff;font-size:11px;font-weight:500;color:#3F3F46'), border: `1px solid ${f.border}`, opacity: f.o, transform: `translateY(${f.y}px)`, boxShadow: f.glow }}>
                    <span style={css('color:#16A34A;font-weight:700')}>✓</span><span>{f.text}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Act 2 · Write */}
          <div style={{ ...css('position:absolute;inset:0'), opacity: v.a2.o, transform: `translateY(${v.a2.y}px)` }}>
            <div style={css('position:absolute;left:16px;top:14px;display:flex;flex-direction:column;gap:3px')}>
              <span style={css('font-size:14px;font-weight:700')}>{d.writeTitle}</span>
              <span style={css('font-size:11.5px;color:#6B6E72')}>{d.writeSub}</span>
            </div>
            <div style={css('position:absolute;left:16px;top:62px;width:330px;height:323px;border:1px solid #e3e6ec;border-radius:12px;padding:14px 15px;overflow:hidden;background:#fff')}>
              <div style={css('font-size:15px;font-weight:700;line-height:1.3;letter-spacing:-0.01em;min-height:20px')}>{v.h1}<span style={{ ...css('display:inline-block;width:2px;height:15px;margin-left:2px;vertical-align:-2px;background:#0062FF'), opacity: v.h1Caret }} /></div>
              <div style={{ ...css('margin-top:5px;font-size:10.5px;color:#9aa1ac'), opacity: v.metaO }}>{d.draftMeta}</div>
              <p style={css('margin:12px 0 0;font-size:11.5px;line-height:1.65;color:#3F3F46')}>
                <span>{v.pa}</span><span style={{ background: v.hlBg, borderRadius: 3 }}>{v.pb}</span><span style={{ ...css('align-items:center;margin:0 3px;font-size:9px;font-weight:600;color:#0062FF;background:#E5EEFF;border-radius:4px;padding:0 5px;vertical-align:1px'), display: v.citeD }}>sony.com</span><span>{v.pc}</span><span style={{ ...css('display:inline-block;width:1.5px;height:12px;margin-left:1px;vertical-align:-2px;background:#0062FF'), opacity: v.pCaret }} />
              </p>
              <div style={{ ...css('margin-top:12px;font-size:12.5px;font-weight:700'), opacity: v.h2O }}>{d.subhead}</div>
              <div style={{ ...css('margin-top:8px;display:flex;flex-direction:column;gap:6px'), opacity: v.h2O }}>
                {bar('96%')}{bar('88%')}{bar('62%')}
              </div>
            </div>
            <div style={css('position:absolute;left:356px;top:62px;width:159px;height:323px;display:flex;flex-direction:column;gap:8px')}>
              <div style={css('border:1px solid #e3e6ec;border-radius:12px;padding:9px 10px;display:flex;align-items:center;gap:9px')}>
                <div style={css('position:relative;width:40px;height:40px;flex:none')}>
                  <svg width="40" height="40" viewBox="0 0 64 64" style={{ display: 'block', transform: 'rotate(-90deg)' }}>
                    <circle cx="32" cy="32" r="26" fill="none" stroke="#E2E8F0" strokeWidth="7" />
                    <circle cx="32" cy="32" r="26" fill="none" stroke="#16A34A" strokeWidth="7" strokeLinecap="round" strokeDasharray="163.36" strokeDashoffset={v.ringOff} />
                  </svg>
                  <span style={css('position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;font-variant-numeric:tabular-nums')}>{v.ringVal}</span>
                </div>
                <div style={css('display:flex;flex-direction:column;gap:1px')}>
                  <span style={css('font-size:9px;font-weight:700;letter-spacing:.05em;color:#9aa1ac')}>{d.contentScore}</span>
                  <span style={{ ...css('font-size:12px;font-weight:700;color:#16A34A'), opacity: v.strongO }}>{d.strong}</span>
                </div>
              </div>
              <div style={css('border:1px solid #e3e6ec;border-radius:12px;padding:9px 10px;display:flex;flex-direction:column;gap:6px')}>
                <span style={css('font-size:9px;font-weight:700;letter-spacing:.05em;color:#9aa1ac')}>{d.heroImage}</span>
                <div style={css('position:relative;height:76px;border-radius:7px;overflow:hidden;background:#EEF1F6')}>
                  <div style={{ ...css('position:absolute;inset:0;background:linear-gradient(100deg,rgba(255,255,255,0) 30%,rgba(255,255,255,.75) 50%,rgba(255,255,255,0) 70%);background-size:220% 100%'), backgroundPosition: `${v.shimmer}% 0`, opacity: v.shimO }} />
                  <HeroArt id="cgd-h1" style={{ ...css('position:absolute;inset:0;width:100%;height:100%'), opacity: v.heroO, transform: `scale(${v.heroS})` }} />
                </div>
              </div>
              <div style={css('border:1px solid #e3e6ec;border-radius:12px;padding:9px 10px;display:flex;flex-direction:column;gap:7px')}>
                {v.checks.map((c) => (
                  <div key={c.text} style={css('display:flex;align-items:center;gap:7px')}>
                    <span style={{ ...css('width:14px;height:14px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:#fff'), background: c.bg, border: `1.5px solid ${c.border}` }}>{c.mark}</span>
                    <span style={{ fontSize: '10.5px', color: c.color }}>{c.text}</span>
                  </div>
                ))}
              </div>
              <div style={{ ...css('margin-top:auto;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;gap:6px;font-size:11.5px;font-weight:600;color:#fff'), background: v.pubBg, transform: `scale(${v.pubS})` }}>
                <span style={{ ...css('width:11px;height:11px;border-radius:50%;border:2px solid rgba(255,255,255,.4);border-top-color:#fff'), transform: `rotate(${v.spin}deg)`, display: v.spinD }} />
                <span>{v.pubText}</span>
              </div>
            </div>
          </div>

          {/* Act 3 · Publish */}
          <div style={{ ...css('position:absolute;inset:0'), opacity: v.a3.o, transform: `translateY(${v.a3.y}px)` }}>
            <div style={css('position:absolute;left:16px;top:14px;display:flex;flex-direction:column;gap:3px')}>
              <span style={css('font-size:14px;font-weight:700')}>{d.publishTitle}</span>
              <span style={css('font-size:11.5px;color:#6B6E72')}>{d.publishSub}</span>
            </div>
            <div style={{ ...css('position:absolute;left:16px;top:62px;width:499px;height:270px;border:1px solid #e3e6ec;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 14px 30px -18px rgba(20,30,60,.3)'), transform: `translateY(${v.winY}px)`, opacity: v.winO }}>
              <div style={css('position:relative;height:26px;display:flex;align-items:center;gap:5px;padding:0 10px;background:#F6F7FB;border-bottom:1px solid #e9ebf1')}>
                <i style={css('width:7px;height:7px;border-radius:50%;background:#ff5f57')} /><i style={css('width:7px;height:7px;border-radius:50%;background:#febc2e')} /><i style={css('width:7px;height:7px;border-radius:50%;background:#28c840')} />
                <span style={css('position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:10px;color:#6c6c6c;background:#fff;border:1px solid #e9ebf1;border-radius:999px;padding:1px 10px')}>sony.com/blog/how-anc-works</span>
              </div>
              <div style={css('height:26px;background:#0b0b0c;display:flex;align-items:center;gap:16px;padding:0 14px;color:#d4d4d8;font-size:9.5px')}>
                <b style={css('color:#fff;font-size:10.5px;font-weight:800;letter-spacing:.24em')}>SONY</b><span>Audio</span><span>Cameras</span><span>Support</span>
              </div>
              <div style={css('display:flex;gap:14px;padding:14px')}>
                <div style={css('width:210px;height:118px;flex:none;border-radius:8px;overflow:hidden')}>
                  <HeroArt id="cgd-h2" style={css('display:block;width:100%;height:100%')} />
                </div>
                <div style={css('flex:1;min-width:0;display:flex;flex-direction:column;gap:6px')}>
                  <span style={css('font-size:9.5px;font-weight:700;letter-spacing:.05em;color:#0062FF')}>{d.guide}</span>
                  <span style={css('font-size:15px;font-weight:700;line-height:1.3')}>{d.articleTitle}</span>
                  <span style={css('font-size:10px;color:#9aa1ac')}>{d.publishedMeta}</span>
                  {bar('100%', '#EEF1F6', 'margin-top:4px;')}{bar('92%')}{bar('70%')}
                </div>
              </div>
              <div style={css('padding:0 14px;display:flex;flex-direction:column;gap:6px')}>
                {bar('100%', '#F3F5F8')}{bar('84%', '#F3F5F8')}
              </div>
            </div>
            <div style={{ ...css('position:absolute;left:16px;top:344px;width:499px;height:41px;border-radius:10px;background:#F0FDF4;border:1px solid #BBF7D0;display:flex;align-items:center;gap:10px;padding:0 12px'), opacity: v.liveO, transform: `translateY(${v.liveY}px)` }}>
              <span style={{ ...css('width:20px;height:20px;flex:none;border-radius:50%;background:#16A34A;color:#fff;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center'), transform: `scale(${v.liveS})` }}>✓</span>
              <span style={css('font-size:12px;font-weight:700;color:#14532d')}>{d.live}</span>
              <span style={css('font-size:11px;color:#3F6B4F')}>{d.liveSub}</span>
            </div>
          </div>

          <span style={{ ...css('position:absolute;width:24px;height:24px;margin:-12px 0 0 -12px;border-radius:50%;border:2px solid #0062FF;pointer-events:none;z-index:9'), left: v.ripX, top: v.ripY, transform: `scale(${v.ripS})`, opacity: v.ripO }} />
          <div style={{ ...css('position:absolute;z-index:10;pointer-events:none;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))'), left: v.curX, top: v.curY, opacity: v.curO }}>
            <div style={{ transform: `translate(-3px,-2px) scale(${v.curS})`, transformOrigin: '3px 2px' }}>
              <svg viewBox="0 0 24 24" fill="#18181B" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" width="16" height="16"><path d="M5 3l14 8-6 2-2 6-6-16z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
