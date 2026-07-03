import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);
const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

/* ── Heatmap helpers ───────────────────────────────────────────── */
const HEAT_COLORS = ['#EFF6FF','#DBEAFE','#BFDBFE','#93C5FD','#60A5FA','#3B82F6','#2563EB','#1D4ED8','#1E40AF','#1E3A8A','#172554'];

function heatLevel(score) {
  return Math.max(0, Math.min(10, Math.floor(score / 10 + 0.5)));
}

function HeatCell({ score }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="vheat__cell"
      style={{ background: HEAT_COLORS[heatLevel(score)] }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && <div className="vheat__tooltip">{Math.round(score)}%</div>}
    </div>
  );
}

/* ── Slide visual components ───────────────────────────────────── */
function VisibilityVis() {
  const { t } = useLang();
  const vv = t('productCarousel.visibilityVis');
  const MODELS = [
    { label: vv.avg,        icon: null },
    { label: 'ChatGPT',     icon: `${import.meta.env.BASE_URL}chatgpt-com-logo.png` },
    { label: 'Claude',      icon: `${import.meta.env.BASE_URL}claudeai-com-logo.png` },
    { label: 'Mistral',     icon: `${import.meta.env.BASE_URL}mistral-ai-logo.png` },
    { label: 'Gemini Web',  icon: `${import.meta.env.BASE_URL}gemini-ai-logo.png` },
  ];
  const BRANDS = [
    { name: 'Adidas',      logo: `${import.meta.env.BASE_URL}adidas-group-com-logo.png`,  scores: [72, 76, 62, 84, 66] },
    { name: 'Nike',        logo: `${import.meta.env.BASE_URL}nike-com-logo.png`,          scores: [45, 50, 20, 50, 60], isYou: true },
    { name: 'On',          logo: `${import.meta.env.BASE_URL}on-com-logo.png`,            scores: [40, 42, 35, 45, 38] },
    { name: 'Hoka',        logo: `${import.meta.env.BASE_URL}hoka-com-logo.png`,          scores: [38, 40, 32, 42, 38] },
    { name: 'Brooks',      logo: `${import.meta.env.BASE_URL}brooksrunning-com-logo.png`, scores: [36, 40, 28, 40, 36] },
    { name: 'New Balance', logo: `${import.meta.env.BASE_URL}newbalance-com-logo.png`,    scores: [34, 38, 28, 38, 32] },
  ];

  return (
    <div className="vheat">
      {/* Score bar */}
      <div className="vheat__top">
        <div className="vheat__top-row">
          <span className="vheat__top-label">{vv.label}</span>
          <span className="vheat__moderate">{vv.moderate}</span>
        </div>
        <div className="vheat__score-row">
          <span className="vheat__score-num">45</span>
          <span className="vheat__score-denom">/100</span>
          <div className="vheat__bar-track">
            <div className="vheat__bar-fill" style={{ width: '45%' }} />
          </div>
        </div>
      </div>

      <div className="vheat__body">
        {/* Stats */}
        <div className="vheat__stats">
          <div className="vheat__stat">
            <span className="vheat__stat-label">{vv.visibilityRank}</span>
            <span className="vheat__stat-val">#2</span>
          </div>
          <div className="vheat__stat-divider" />
          <div className="vheat__stat">
            <span className="vheat__stat-label">{vv.visibilityScore}</span>
            <div className="vheat__stat-row">
              <span className="vheat__stat-val">45%</span>
              <span className="vheat__stat-delta">↓19%</span>
            </div>
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="vheat__grid">
          {BRANDS.map((b) => (
            <div key={b.name} className="vheat__row">
              <div className="vheat__brand">
                <img src={b.logo} alt={b.name} className="vheat__brand-logo" />
                <span className="vheat__brand-name">{b.name}</span>
                {b.isYou && <span className="vheat__you-tag">{vv.you}</span>}
              </div>
              <div className="vheat__cells">
                {b.scores.map((s, i) => <HeatCell key={i} score={s} />)}
              </div>
            </div>
          ))}

          {/* Column headers */}
          <div className="vheat__row vheat__row--headers">
            <div className="vheat__brand" />
            <div className="vheat__cells">
              {MODELS.map((m) => (
                <div key={m.label} className="vheat__col-label">
                  {m.icon && <img src={m.icon} alt={m.label} className="vheat__col-icon" />}
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="vheat__legend">
            <span className="vheat__legend-text">{vv.low}</span>
            <div className="vheat__legend-bar" />
            <span className="vheat__legend-text">{vv.high}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SentimentVis() {
  const { t } = useLang();
  const sv = t('productCarousel.sentimentVis');
  const AXES = sv.axes;
  const BRANDS = [
    {
      name: 'Nike',   logo: `${import.meta.env.BASE_URL}nike-com-logo.png`,           color: '#0f172a', isYou: true,
      overall: 'Very Strong',
      scores: { Innovation: 92, Performance: 90, Range: 70, Quality: 85, Trust: 88 },
    },
    {
      name: 'On',     logo: `${import.meta.env.BASE_URL}on-com-logo.png`,             color: '#e55a2b',
      overall: 'Strong',
      scores: { Innovation: 75, Performance: 78, Range: 65, Quality: 68, Trust: 72 },
    },
    {
      name: 'Hoka',   logo: `${import.meta.env.BASE_URL}hoka-com-logo.png`,           color: '#0ea5e9',
      overall: 'Strong',
      scores: { Innovation: 65, Performance: 73, Range: 58, Quality: 50, Trust: 65 },
    },
    {
      name: 'Adidas',  logo: `${import.meta.env.BASE_URL}adidas-group-com-logo.png`,          color: '#7c3aed',
      overall: 'Very Strong',
      scores: { Innovation: 95, Performance: 94, Range: 76, Quality: 90, Trust: 92 },
    },
    {
      name: 'Brooks',      logo: `${import.meta.env.BASE_URL}brooksrunning-com-logo.png`,   color: '#14b8a6',
      overall: 'Moderate',
      scores: { Innovation: 50, Performance: 62, Range: 48, Quality: 42, Trust: 58 },
    },
    {
      name: 'New Balance', logo: `${import.meta.env.BASE_URL}newbalance-com-logo.png`,       color: '#ea580c',
      overall: 'Strong',
      scores: { Innovation: 74, Performance: 80, Range: 68, Quality: 72, Trust: 76 },
    },
  ];


  const n = AXES.length;

  const TIER_STYLE = {
    'Very Strong': { background: 'rgb(209,250,229)', color: 'rgb(21,128,61)' },
    'Strong':      { background: 'rgb(220,252,231)', color: 'rgb(34,197,94)' },
    'Moderate':    { background: 'rgb(254,252,232)', color: 'rgb(234,179,8)' },
    'Weak':        { background: '#fff7ed',          color: '#f97316' },
    'Very Weak':   { background: '#fef2f2',          color: '#ef4444' },
  };

  function sentTier(score) {
    if (score >= 80) return 'Very Strong';
    if (score >= 65) return 'Strong';
    if (score >= 45) return 'Moderate';
    if (score >= 25) return 'Weak';
    return 'Very Weak';
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  const [visibility, setVisibility] = useState(() =>
    Object.fromEntries(BRANDS.map(b => [b.name, true]))
  );
  const [tooltip, setTooltip] = useState({
    visible: false, x: 0, y: 0, segIdx: -1,
    axisLabel: '', singleBrand: null, multiBrands: null,
  });

  function toggleBrand(name) {
    setVisibility(prev => {
      const allKeys = BRANDS.map(b => b.name);
      const visibleKeys = allKeys.filter(k => prev[k]);
      if (visibleKeys.length === allKeys.length) {
        return Object.fromEntries(allKeys.map(k => [k, k === name]));
      }
      if (visibleKeys.length === 1 && visibleKeys[0] === name) {
        return Object.fromEntries(allKeys.map(k => [k, true]));
      }
      const next = { ...prev, [name]: !prev[name] };
      if (!allKeys.some(k => next[k])) return Object.fromEntries(allKeys.map(k => [k, true]));
      return next;
    });
  }

  const cx = 200, cy = 165, r = 108;
  const labelDist = 150;

  function radarPt(i, pct) {
    const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
    return {
      x: cx + r * (pct / 100) * Math.cos(angle),
      y: cy + r * (pct / 100) * Math.sin(angle),
    };
  }

  function polyStr(scores) {
    return AXES.map((ax, i) => {
      const p = radarPt(i, scores[ax]);
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    }).join(' ');
  }

  function labelPt(i) {
    const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
    return {
      x: cx + labelDist * Math.cos(angle),
      y: cy + labelDist * Math.sin(angle),
    };
  }

  function getSegIdx(svgX, svgY) {
    const dx = svgX - cx, dy = svgY - cy;
    if (Math.sqrt(dx * dx + dy * dy) < 10) return null;
    const angle = Math.atan2(dy, dx) + Math.PI / 2;
    const norm = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    return Math.round(norm / (Math.PI * 2 / n)) % n;
  }

  function handleMouseMove(e) {
    const svgEl = e.currentTarget.ownerSVGElement;
    const svgRect = svgEl.getBoundingClientRect();
    const wrapRect = svgEl.parentElement.getBoundingClientRect();
    const svgX = (e.clientX - svgRect.left) * (400 / svgRect.width);
    const svgY = (e.clientY - svgRect.top) * (330 / svgRect.height);
    const tx = e.clientX - wrapRect.left;
    const ty = e.clientY - wrapRect.top;

    const segIdx = getSegIdx(svgX, svgY);
    if (segIdx === null) { setTooltip(p => ({ ...p, visible: false })); return; }

    const axisLabel = AXES[segIdx];
    const visibleBrands = BRANDS.filter(b => visibility[b.name]);

    if (visibleBrands.length === 1) {
      setTooltip({ visible: true, x: tx, y: ty, segIdx, axisLabel, singleBrand: visibleBrands[0], multiBrands: null });
    } else {
      const sorted = [...visibleBrands].sort((a, b) => b.scores[axisLabel] - a.scores[axisLabel]);
      setTooltip({ visible: true, x: tx, y: ty, segIdx, axisLabel, singleBrand: null, multiBrands: sorted });
    }
  }

  return (
    <div className="vis-card">
      <div className="srad__chips">
        {BRANDS.map(b => (
          <button
            key={b.name}
            className={`srad__chip${visibility[b.name] ? '' : ' srad__chip--inactive'}`}
            onClick={() => toggleBrand(b.name)}
          >
            <span className="srad__chip-dot" style={{ background: b.color }} />
            <img src={b.logo} alt={b.name} className="srad__chip-logo" />
            <span className="srad__chip-name">{b.name}</span>
            {b.isYou && <span className="srad__chip-you">{sv.you}</span>}
          </button>
        ))}
      </div>

      <div className="srad__chart-wrap" onMouseLeave={() => setTooltip(p => ({ ...p, visible: false }))}>
        <svg viewBox="0 0 400 330" className="srad__svg">
          <rect width="400" height="330" rx="10" fill="#f8f9fc" />

          {[1, 2, 3, 4].map(lvl => (
            <polygon key={lvl}
              points={AXES.map((_, i) => { const p = radarPt(i, lvl * 25); return `${p.x.toFixed(2)},${p.y.toFixed(2)}`; }).join(' ')}
              fill="none" stroke="#e2e5ec" strokeWidth="0.8"
            />
          ))}

          {AXES.map((_, i) => {
            const end = radarPt(i, 100);
            return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#d1d5db" strokeWidth="0.5" />;
          })}

          {BRANDS.map(b => (
            <polygon key={b.name}
              points={polyStr(b.scores)}
              fill={hexToRgba(b.color, 0.12)}
              stroke={b.color} strokeWidth="1" strokeLinejoin="round"
              style={{ opacity: visibility[b.name] ? 1 : 0, transition: 'opacity 0.2s' }}
            />
          ))}

          {BRANDS.map(b => visibility[b.name] && AXES.map((ax, i) => {
            const p = radarPt(i, b.scores[ax]);
            return <circle key={`${b.name}-${i}`} cx={p.x} cy={p.y} r="2.5" fill="white" stroke={b.color} strokeWidth="1" />;
          }))}

          {AXES.map((ax, i) => {
            const pos = labelPt(i);
            return (
              <text key={ax} x={pos.x} y={pos.y}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fill="#6b7280"
                fontFamily="Chivo, system-ui, sans-serif"
              >{ax}</text>
            );
          })}

          {tooltip.visible && tooltip.segIdx >= 0 && BRANDS.map(b => {
            if (!visibility[b.name]) return null;
            const p = radarPt(tooltip.segIdx, b.scores[AXES[tooltip.segIdx]]);
            return <circle key={b.name} cx={p.x} cy={p.y} r="5" fill={b.color} stroke="white" strokeWidth="2" />;
          })}

          <rect x="0" y="0" width="400" height="330" fill="transparent"
            style={{ cursor: 'crosshair' }}
            onMouseMove={handleMouseMove}
          />
        </svg>

        {tooltip.visible && (
          <div className="srad__radar-tip" style={{
            left: tooltip.x + 14,
            top: Math.max(0, tooltip.y - 60),
            transform: tooltip.x > 240 ? 'translateX(-110%)' : 'translateX(0)',
          }}>
            {tooltip.singleBrand ? (
              <>
                <div className="srad__rtip-title">{sv.webScore}</div>
                <div className="srad__rtip-brand-row">
                  <span className="srad__rtip-dot" style={{ background: tooltip.singleBrand.color }} />
                  <img src={tooltip.singleBrand.logo} alt={tooltip.singleBrand.name} className="srad__rtip-logo" />
                  <span className="srad__rtip-brand">{tooltip.singleBrand.name}</span>
                  <span className="srad__rtip-badge" style={TIER_STYLE[tooltip.singleBrand.overall]}>
                    {sv.tiers[tooltip.singleBrand.overall]}
                  </span>
                </div>
                <div className="srad__rtip-axes">
                  {AXES.map(ax => {
                    const tier = sentTier(tooltip.singleBrand.scores[ax]);
                    return (
                      <div key={ax} className="srad__rtip-row">
                        <span className="srad__rtip-attr">{ax}</span>
                        <span className="srad__rtip-badge" style={TIER_STYLE[tier]}>{sv.tiers[tier]}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="srad__rtip-title">{tooltip.axisLabel}</div>
                <div className="srad__rtip-axes">
                  {tooltip.multiBrands.map(b => {
                    const tier = sentTier(b.scores[tooltip.axisLabel]);
                    return (
                      <div key={b.name} className="srad__rtip-row">
                        <span className="srad__rtip-dot" style={{ background: b.color }} />
                        <img src={b.logo} alt={b.name} className="srad__rtip-logo" />
                        <span className="srad__rtip-brand">{b.name}</span>
                        <span className="srad__rtip-badge" style={TIER_STYLE[tier]}>{sv.tiers[tier]}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function AuditVis() {
  const { t } = useLang();
  const av = t('productCarousel.auditVis');
  const [vals, setVals] = useState([81, 80, 36]);

  const STAGE_META = av.stages.map(s => ({ ...s }));

  const STAGES = STAGE_META.map((m, i) => ({ ...m, value: vals[i] }));

  const W = 1200, H = 420, CY = 210, SW = 400, MIN_H = 15, MAX_H = 180, BN_THRESH = 75;

  /* Cumulative half-heights   each stage multiplies the previous */
  const halves = (() => {
    return [
      MAX_H,
      ...STAGES.map(s => MIN_H + (Math.max(0, Math.min(100, s.value)) / 100) * (MAX_H - MIN_H)),
    ];
  })();

  const health = Math.round(STAGES.reduce((a, s) => a + s.value, 0) / STAGES.length);
  const reach  = Math.round(vals.reduce((a, v) => a * v / 100, 100));
  const status = health >= 80 ? 'Healthy' : health >= 60 ? 'Needs attention' : 'Needs improvement';
  const ringColor = health >= 70 ? '#16A34A' : health >= 50 ? '#D97706' : '#DC2626';
  const ringR = 26, ringC = 2 * Math.PI * ringR;

  /* Full pipe outline   single path, clipped per stage for colour */
  function masterPath() {
    const [h0, h1, h2, h3] = halves;
    const x = [0, SW, SW * 2, SW * 3];
    const T = h => CY - h, B = h => CY + h;
    const tt = (xa, xb, ha, hb) => { const m = (xa + xb) / 2; return `C ${m} ${T(ha)}, ${m} ${T(hb)}, ${xb} ${T(hb)}`; };
    const tb = (xa, xb, ha, hb) => { const m = (xa + xb) / 2; return `C ${m} ${B(hb)}, ${m} ${B(ha)}, ${xa} ${B(ha)}`; };
    return [
      `M ${x[0]} ${T(h0)}`, tt(x[0],x[1],h0,h1), tt(x[1],x[2],h1,h2), tt(x[2],x[3],h2,h3),
      `L ${x[3]} ${B(h3)}`, tb(x[2],x[3],h2,h3), tb(x[1],x[2],h1,h2), tb(x[0],x[1],h0,h1), 'Z',
    ].join(' ');
  }

  /* Dotted edge paths (top/bottom, inset from pipe wall) */
  function edgePath(side, inset) {
    const ih = halves.map(h => Math.max(0, h - inset));
    const [h0, h1, h2, h3] = ih;
    const x = [0, SW, SW * 2, SW * 3];
    const d = side === 'top' ? -1 : 1;
    const y = h => CY + d * h;
    const tp = (xa, xb, ha, hb) => { const m = (xa + xb) / 2; return `C ${m} ${y(ha)}, ${m} ${y(hb)}, ${xb} ${y(hb)}`; };
    return [`M ${x[0]} ${y(h0)}`, tp(x[0],x[1],h0,h1), tp(x[1],x[2],h1,h2), tp(x[2],x[3],h2,h3)].join(' ');
  }

  const mp = masterPath();
  const svgPct = (sx, sy) => ({ left: `${(sx / W) * 100}%`, top: `${(sy / H) * 100}%` });
  const stageCX = i => SW * i + SW / 2;
  const stageAY = i => CY - (halves[i] + halves[i + 1]) / 2 - 18;

  /* Primary bottleneck = single stage with the minimum value, if below threshold */
  const minVal = Math.min(...vals);
  const bnIdx  = minVal < BN_THRESH ? vals.indexOf(minVal) : -1;

  const AI_LOGOS = [
    { src: `${import.meta.env.BASE_URL}mistral-ai-logo.png`,    alt: 'Mistral',    left: '1.5%', top: '27%' },
    { src: `${import.meta.env.BASE_URL}chatgpt-com-logo.png`,   alt: 'ChatGPT',    left: '6.5%', top: '40%' },
    { src: `${import.meta.env.BASE_URL}claudeai-com-logo.png`,  alt: 'Claude',     left: '12%',  top: '27%' },
    { src: `${import.meta.env.BASE_URL}perplexity-ai-logo.png`, alt: 'Perplexity', left: '2%',   top: '65%' },
    { src: `${import.meta.env.BASE_URL}gemini-ai-logo.png`,     alt: 'Gemini',     left: '7.5%', top: '76%' },
  ];

  return (
    <div className="vis-card">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="pipeline-hdr">
        <div className="pipeline-hdr-text">
          <div className="pipeline-title">{av.title}</div>
          <div className="pipeline-sub">{av.sub}</div>
        </div>
        <div className="pipeline-score-wrap">
          <div className="pipeline-score-info">
            <span className="pipeline-score-lbl">{av.healthScore}</span>
            <span className="pipeline-score-desc">{av.basedOn}</span>
          </div>
          <div className="pipeline-ring">
            <svg viewBox="0 0 64 64" width="52" height="52"
              style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="32" cy="32" r={ringR} fill="none" stroke="#E2E8F0" strokeWidth="5"/>
              <circle cx="32" cy="32" r={ringR} fill="none" stroke={ringColor} strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${ringC * health / 100} ${ringC}`}
                style={{ transition: 'stroke-dasharray .3s, stroke .3s' }}/>
            </svg>
            <span className="pipeline-ring-val" style={{ color: ringColor, transition: 'color .3s' }}>{health}%</span>
          </div>
        </div>
      </div>

      {/* ── Full-bleed funnel ──────────────────────────────── */}
      <div className="pipeline-funnel">
        <svg viewBox={`0 0 ${W} ${H}`} className="pipeline-svg">
          <defs>
            {STAGES.map((s, i) => (
              <clipPath key={s.key} id={`pcl-${i}`}>
                <rect x={SW * i} y={0} width={SW} height={H}/>
              </clipPath>
            ))}
            <filter id="pipe-glow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="10"/>
            </filter>
          </defs>

          {/* Stage dividers */}
          <line x1={SW}   y1={20} x2={SW}   y2={H - 20} stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 6"/>
          <line x1={SW*2} y1={20} x2={SW*2} y2={H - 20} stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 6"/>

          {/* Outer halo */}
          {STAGES.map((s, i) => (
            <path key={`halo-${s.key}`} d={mp}
              fill="none" stroke={s.color}
              strokeOpacity="0.22"
              strokeWidth="26" filter="url(#pipe-glow)" clipPath={`url(#pcl-${i})`}/>
          ))}
          {/* Lighter ring */}
          {STAGES.map((s, i) => (
            <path key={`ring-${s.key}`} d={mp}
              fill="none" stroke={s.color}
              strokeOpacity="0.32"
              strokeWidth="12" clipPath={`url(#pcl-${i})`}/>
          ))}
          {/* Core fill */}
          {STAGES.map((s, i) => (
            <path key={`fill-${s.key}`} d={mp} fill={s.color}
              clipPath={`url(#pcl-${i})`}/>
          ))}

          {/* Dotted flow lines */}
          <path d={edgePath('top', 12)}    fill="none" stroke="#fff" strokeOpacity="0.6"
            strokeWidth="1.5" strokeDasharray="6 8" strokeLinecap="round"/>
          <path d={edgePath('bottom', 12)} fill="none" stroke="#fff" strokeOpacity="0.6"
            strokeWidth="1.5" strokeDasharray="6 8" strokeLinecap="round"/>
        </svg>

        {/* AI model logos */}
        {AI_LOGOS.map((l) => (
          <div key={l.alt} className="pipeline-logo"
            style={{ left: l.left, top: l.top, pointerEvents: 'none' }}>
            <img src={l.src} alt={l.alt}/>
          </div>
        ))}

        {/* Bottleneck badge   only on the single primary bottleneck */}
        {bnIdx >= 0 && (
          <div className="pipeline-bottleneck-badge"
            style={{ ...svgPct(stageCX(bnIdx), stageAY(bnIdx)), transform: 'translate(-50%,-100%)', pointerEvents: 'none' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            {av.bottleneck}
          </div>
        )}

        {/* "Capped by" badges   only on stages downstream of the primary bottleneck */}
        {bnIdx >= 0 && STAGES.map((s, i) => {
          if (i <= bnIdx) return null;
          return (
            <div key={`cap-${s.key}`} className="pipeline-capped-badge"
              style={{ ...svgPct(stageCX(i), stageAY(i)), transform: 'translate(-50%,-100%)', pointerEvents: 'none' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {av.cappedBy} {STAGES[bnIdx].label}
            </div>
          );
        })}

        {/* Score pills */}
        {STAGES.map((s, i) => (
          <div key={`pill-${s.key}`}
            className="pipeline-pill"
            style={{
              ...svgPct(stageCX(i), CY),
              transform: 'translate(-50%,-50%)',
            }}>
            <span className="pipeline-pill-lbl">{s.label}</span>
            <span className="pipeline-pill-val">{s.value}%</span>
          </div>
        ))}
      </div>

      {/* ── Stage tabs ─────────────────────────────────────── */}
      <div className="pipeline-questions">
        {STAGES.map((s) => (
          <div key={`q-${s.key}`} className="pipeline-question">
            {s.question}
          </div>
        ))}
      </div>

    </div>
  );
}

function ContentVis() {
  const { t } = useLang();
  const cv = t('productCarousel.contentVis');
  const [topic, setTopic] = useState('');
  const [topicError, setTopicError] = useState('');
  const [draft, setDraft] = useState(null);
  const [ideaSet, setIdeaSet] = useState(0);
  const [suggestIdx, setSuggestIdx] = useState(0);

  const ideas = cv.ideaSets[ideaSet];

  const openDraft = (idea) => {
    setTopicError('');
    setTopic(idea.title);
    setDraft({ title: idea.title, ...idea.draft });
  };

  const handleStart = () => {
    const tVal = topic.trim();
    if (!tVal) {
      setTopicError(cv.errorEmpty);
      return;
    }
    if (tVal.length < 12) {
      setTopicError(cv.errorShort);
      return;
    }
    setTopicError('');
    const match = cv.ideaSets.flat().find(i => i.title.toLowerCase() === tVal.toLowerCase());
    if (match) { openDraft(match); return; }
    setDraft({
      title: tVal,
      intro: `Nike has long been a leader in athletic innovation. This article explores ${tVal.toLowerCase()} and positions Nike as the authority in this space   optimised for AI-powered search results.`,
      outline: ['Introduction & Brand Context', 'Key Performance Differentiators', 'Consumer Benefits & Use Cases', "Nike's Competitive Edge"],
      words: '640', read: '3 min', score: 74,
    });
  };

  /* ── Draft view ──────────────────────────────────────────────── */
  if (draft) {
    return (
      <div className="vis-card cstudio-card">
        <button className="cstudio-back-btn" onClick={() => setDraft(null)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
            <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
          </svg>
          {cv.back}
        </button>
        <div className="cstudio-draft-meta">
          <span className="cstudio-draft-badge cstudio-draft-badge--ai">{cv.aiDraft}</span>
          <span className="cstudio-draft-badge cstudio-draft-badge--schema">{cv.schemaReady}</span>
          <span className="cstudio-draft-stat">{draft.words} words · {draft.read} read</span>
          <span className="cstudio-draft-score" style={{ color: draft.score >= 85 ? '#16a34a' : draft.score >= 75 ? '#d97706' : '#dc2626' }}>
            {cv.aiScore} {draft.score}
          </span>
        </div>
        <div className="cstudio-draft-title">{draft.title}</div>
        <div className="cstudio-draft-intro">{draft.intro}</div>
        <div className="cstudio-draft-outline-lbl">{cv.articleOutline}</div>
        <div className="cstudio-draft-outline">
          {draft.outline.map((s, i) => (
            <div key={i} className="cstudio-draft-section">
              <span className="cstudio-draft-num">{i + 1}</span>
              {s}
            </div>
          ))}
        </div>
        <div className="cstudio-draft-actions">
          <button className="cstudio-start-btn">{cv.publish}</button>
          <button className="cstudio-edit-btn">{cv.editDraft}</button>
        </div>
      </div>
    );
  }

  /* ── Input view ──────────────────────────────────────────────── */
  return (
    <div className="vis-card cstudio-card">
      <div className="cstudio-hdr">
        <span className="cstudio-title">{cv.title}</span>
        <span className="cstudio-sub">{cv.sub}</span>
      </div>

      <div className="cstudio-input-box">
        <div className="cstudio-q">{cv.question}</div>
        <div className="cstudio-q-sub">{cv.questionSub}</div>
        <textarea
          className={`cstudio-textarea${topicError ? ' cstudio-textarea--error' : ''}`}
          placeholder={cv.placeholder}
          value={topic}
          onChange={e => { setTopic(e.target.value); if (topicError) setTopicError(''); }}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleStart())}
          rows={3}
        />
        {topicError && (
          <div className="cstudio-topic-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r=".5" fill="currentColor"/>
            </svg>
            {topicError}
          </div>
        )}
        <div className="cstudio-input-row">
          <button className="cstudio-recommend-btn" onClick={() => {
            setTopic(cv.suggestTopics[suggestIdx % cv.suggestTopics.length]);
            setSuggestIdx(n => n + 1);
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r=".5" fill="currentColor"/>
            </svg>
            {cv.recommendTopic}
          </button>
          <button className="cstudio-start-btn" onClick={handleStart}>{cv.startWriting}</button>
        </div>
      </div>

      <div className="cstudio-ideas-hdr">
        <svg viewBox="0 0 24 24" fill="none" stroke="#3B6FF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
          <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74z"/>
        </svg>
        {cv.suggestedIdeas}
      </div>

      <div className="cstudio-ideas">
        {ideas.map((idea, i) => (
          <div key={i} className="cstudio-idea-card" onClick={() => openDraft(idea)}>
            <span className="cstudio-priority" style={{ color: idea.pColor, background: idea.pBg }}>
              {idea.priority === 'HIGH PRIORITY' ? cv.priority.high : cv.priority.medium}
            </span>
            <div className="cstudio-idea-title">{idea.title}</div>
            <div className="cstudio-idea-desc">{idea.desc}</div>
          </div>
        ))}
      </div>

      <button className="cstudio-more-btn" onClick={() => setIdeaSet(s => (s + 1) % cv.ideaSets.length)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
        </svg>
        {cv.moreIdeas}
      </button>
    </div>
  );
}

/* ── Slide visual/href metadata (text comes from locale) ────────── */
const SLIDE_META = [
  {
    tabIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
      </svg>
    ),
    ctaHref: '/visibility',
    visual: <VisibilityVis />,
  },
  {
    tabIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    ctaHref: '/sentiment',
    visual: <SentimentVis />,
  },
  {
    tabIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    ctaHref: '/technical-audit',
    visual: <AuditVis />,
  },
  {
    tabIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <circle cx="12" cy="12" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="M12 6v4M12 14l-6.5 2.5M12 14l6.5 2.5"/>
      </svg>
    ),
    ctaHref: '/content-writing',
    visual: <ContentVis />,
  },
];

/* ── Main component ────────────────────────────────────────────── */
export default function ProductCarousel() {
  const { t, lang } = useLang();
  const pc = t('productCarousel');
  const SLIDES = SLIDE_META.map((meta, i) => ({ ...meta, ...pc.slides[i] }));
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const windowRef = useRef(null);
  const total = SLIDES.length;

  const go = (n) => setActive(((n % total) + total) % total);

  useEffect(() => {
    if (!trackRef.current || !windowRef.current) return;
    const w = windowRef.current.clientWidth;
    trackRef.current.style.transform = `translateX(${-active * w}px)`;
  }, [active]);

  return (
    <section id="products" className="products">
      <div className="container">
        <div className="products__head">
          <p className="products__eyebrow">{pc.eyebrow}</p>
          <h2 className="products__h2">
            {pc.h2}<br />
            {pc.h2Pre}{' '}
            <span className="hl">{pc.h2Hl}</span>
          </h2>
          <p className="products__lead">{pc.lead}</p>
        </div>

        <div className="products__tabs">
          {SLIDES.map((sl, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`products__tab${active === i ? ' products__tab--active' : ''}`}
            >
              <span className="products__tab-icon">{sl.tabIcon}</span>
              <span className="products__tab-label">{sl.tabLabel}</span>
            </button>
          ))}
        </div>

        <div className="carousel">
          <div ref={windowRef} className="carousel__window">
            <div
              ref={trackRef}
              className="carousel__track"
              style={{ transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
            >
              {SLIDES.map((sl, i) => (
                <div key={i} className="carousel__slide">
                  <div className="slide__inner">
                    <div className="slide__copy">
                      <p className="slide__eyebrow">{sl.eyebrow}</p>
                      <h3 className="slide__h3">{sl.title}</h3>
                      <p className="slide__lead">{sl.lead}</p>
                      <ul className="slide__points">
                        {sl.points.map((pt) => (
                          <li key={pt} className="slide__point">
                            <span className="slide__point-icon"><Check /></span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                      {sl.ctaHref && sl.ctaHref !== '#' ? (
                        <Link to={sl.ctaHref} className="slide__cta">
                          {sl.cta}
                          <span className="slide__cta-icon"><ChevronRight /></span>
                        </Link>
                      ) : (
                        <a href="#" className="slide__cta">
                          {sl.cta}
                          <span className="slide__cta-icon"><ChevronRight /></span>
                        </a>
                      )}
                    </div>
                    <div className="slide__visual">
                      <div className="slide__visual-inner">{sl.visual}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="carousel__dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`carousel__dot${active === i ? ' carousel__dot--active' : ''}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
