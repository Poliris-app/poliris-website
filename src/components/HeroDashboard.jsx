import { useState } from 'react';

const BRANDS = [
  { id: 'nike',       name: 'Nike',        color: '#111827', isYou: true, abbr: 'NK', logo: '/nike-com-logo.png' },
  { id: 'newbalance', name: 'New Balance', color: '#ea580c', abbr: 'NB', logo: '/newbalance-com-logo.png' },
  { id: 'brooks',     name: 'Brooks',      color: '#7c3aed', abbr: 'BR', logo: '/brooksrunning-com-logo.png' },
  { id: 'on',         name: 'On',          color: '#16a34a', abbr: 'ON', logo: '/on-com-logo.png' },
  { id: 'asics',      name: 'ASICS',       color: '#dc2626', abbr: 'AS', logo: '/asics-com-logo.png' },
  { id: 'hoka',       name: 'Hoka',        color: '#0891b2', abbr: 'HK', logo: '/hoka-com-logo.png' },
];

const VIS_DATA = {
  nike:       [88, 92, 86, 74, 90, 91, 83, 67, 78, 64],
  newbalance: [84, 82, 78, 72, 64, 56, 48, 44, 40, 38],
  brooks:     [58, 60, 64, 66, 62, 56, 48, 42, 40, 42],
  on:         [20, 26, 34, 42, 50, 58, 65, 70, 72, 74],
  asics:      [28, 24, 20, 16, 14, 16, 18, 20, 22, 20],
  hoka:       [22, 28, 36, 44, 50, 54, 58, 56, 54, 56],
};
// Sentiment lines snap to tier gridline values: Very Strong=100, Strong=75, Moderate=50, Weak=25, Very Weak=0
// Transitions between tiers produce smooth S-curves via bezier math.
const SENT_DATA = {
  nike:       [ 75,  50,  75, 100, 100,  75,  75, 100, 100,  100],
  newbalance: [ 75,  75,  75,  75,  75,  75,  75,  75,  75,  75],
  brooks:     [ 75,  75,  75,  75,  50,  50,  50,  75,  75,  75],
  on:         [ 50,  50,  50,  0,  50,  0,  50,  50,  50,  50],
  asics:      [ 25,  25,  25,  25,  50,  25,  25,  0,  25,  25],
  hoka:       [ 0,  50,  50,  50,  50,  75,  75,  75,  75,  75],
};

const QUAD_POS = {
  nike:       { x: 64, y: 85 },
  newbalance: { x: 42, y: 75 },
  brooks:     { x: 36, y: 68 },
  on:         { x: 27, y: 50 },
  asics:      { x: 20, y: 25 },
  hoka:       { x: 58, y: 62 },
};

const X_DATES = [
  'Apr 24, 2026 6:40 AM', 'Apr 25, 2026 6:40 AM', 'Apr 26, 2026 6:40 AM',
  'Apr 27, 2026 6:40 AM', 'Apr 28, 2026 6:40 AM', 'May 1, 2026 6:40 AM',
  'May 3, 2026 6:40 AM',  'May 7, 2026 6:40 AM',  'May 10, 2026 6:40 AM',
  'May 15, 2026 6:40 AM',
];

const X_TICKS = [
  { i: 0, label: 'Apr 24' },
  { i: 3, label: 'Apr 27' },
  { i: 4, label: 'Apr 28' },
  { i: 9, label: 'May 15' },
];

// SVG chart constants
const VW = 600, VH = 160;
const PT = 10, PR = 12, PB = 28;
const PL_VIS = 32, PL_SENT = 50;

function yAt(v) { return PT + (1 - v / 100) * (VH - PT - PB); }

const VIS_Y_LINES = [0, 25, 50, 75, 100];
// Same positions as visibility — tier names replace numbers on Y-axis
const SENT_Y_LINES = [
  { val: 100, label: 'Very Strong', color: '#16a34a' },
  { val: 75,  label: 'Strong',      color: '#16a34a' },
  { val: 50,  label: 'Moderate',    color: '#ca8a04' },
  { val: 25,  label: 'Weak',        color: '#ea580c' },
  { val: 0,   label: 'Very Weak',   color: '#dc2626' },
];

// Tier boundaries: 0-20 Very Weak, 21-40 Weak, 41-60 Moderate, 61-80 Strong, 81-100 Very Strong
function sentTier(val) {
  if (val >= 81) return { label: 'Very Strong', color: '#16a34a' };
  if (val >= 61) return { label: 'Strong',      color: '#16a34a' };
  if (val >= 41) return { label: 'Moderate',    color: '#ca8a04' };
  if (val >= 21) return { label: 'Weak',        color: '#ea580c' };
  return           { label: 'Very Weak',        color: '#dc2626' };
}

export default function HeroDashboard() {
  const [tab,        setTab]        = useState('visibility');
  const [hovered,    setHovered]    = useState(null);
  const [filters,    setFilters]    = useState(new Set());
  const [chartHover, setChartHover] = useState(null);
  const [quadTip,    setQuadTip]    = useState(null);

  function handleLegendClick(id) {
    setFilters(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function lineOpacity(id) {
    if (filters.size > 0) return filters.has(id) ? 1 : 0.07;
    if (hovered) return hovered === id ? 1 : 0.1;
    return 1;
  }

  const chartData = tab === 'visibility' ? VIS_DATA : SENT_DATA;
  const n = VIS_DATA.nike.length;

  const PL = tab === 'visibility' ? PL_VIS : PL_SENT;
  const cw = VW - PL - PR;

  function xAt(i) { return PL + (i / (n - 1)) * cw; }

  function makePath(vals) {
    const pts = vals.map((v, i) => [xAt(i), yAt(v)]);
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const [px, py] = pts[i - 1];
      const [cx, cy] = pts[i];
      const mx = ((px + cx) / 2).toFixed(1);
      d += ` C${mx},${py.toFixed(1)} ${mx},${cy.toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)}`;
    }
    return d;
  }

  function handleChartMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * VW;
    const rawI = (svgX - PL) / (cw / (n - 1));
    const xi = Math.max(0, Math.min(n - 1, Math.round(rawI)));
    setChartHover(xi);
  }

  const sortedAtHover = chartHover !== null
    ? [...BRANDS].sort((a, b) => chartData[b.id][chartHover] - chartData[a.id][chartHover])
    : [];

  const tipBrands = filters.size > 0
    ? sortedAtHover.filter(b => filters.has(b.id))
    : sortedAtHover;

  const tipXPct = chartHover !== null ? (xAt(chartHover) / VW) * 100 : 0;
  const tipFlip = chartHover !== null && chartHover > n * 0.6;

  return (
    <div className="hero__dashboard">

      {/* Window chrome */}
      <div className="dash__appbar">
        <span className="dash__dot" /><span className="dash__dot" /><span className="dash__dot" />
        <span className="dash__url">app.poliris.io · dashboard</span>
      </div>

      {/* Body: sidebar | main | right panel */}
      <div className="hdash__body">

        {/* ── Sidebar ── */}
        <aside className="dash__sidebar">
          {['Overview','AI Visibility','Sentiment','Technical audit','Content','Agents'].map(l => (
            <div key={l} className={`dash__nav-item${l === 'Overview' ? ' dash__nav-item--active' : ''}`}>{l}</div>
          ))}
        </aside>

        {/* ── Main content ── */}
        <div className="hdash__main">

          {/* Evolution chart */}
          <div className="hdash__card">
            <div className="hdash__chart-head">
              <div>
                <p className="hdash__card-title">Evolution</p>
                <p className="hdash__card-sub">Score by LLM over time</p>
              </div>
              <div className="hdash__controls">
                <span className="hdash__date-pill">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                  </svg>
                  Apr 1 – May 31
                </span>
                <div className="hdash__tab-group">
                  {['visibility','sentiment'].map(t => (
                    <button key={t}
                      className={`hdash__tab${tab === t ? ' hdash__tab--on' : ''}`}
                      onClick={() => { setTab(t); setChartHover(null); }}
                    >
                      {t[0].toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
                <span className="hdash__filter-pill">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
                    <path d="M22 3H2l8 9.46V19l4 2v-8.54z"/>
                  </svg>
                  Filter <span className="hdash__filter-badge">6</span>
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="hdash__legend">
              {BRANDS.map(b => {
                const isDim = (filters.size > 0 && !filters.has(b.id)) || (filters.size === 0 && hovered && hovered !== b.id);
                const isActive = filters.has(b.id);
                return (
                  <button key={b.id}
                    className={`hdash__leg-item${isDim ? ' hdash__leg-item--dim' : ''}${isActive ? ' hdash__leg-item--active' : ''}`}
                    onClick={() => handleLegendClick(b.id)}
                    onMouseEnter={() => setHovered(b.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span className="hdash__leg-dot" style={{ background: isDim ? '#c8cad4' : b.color }} />
                    <span className={`hdash__leg-icon${isDim ? ' hdash__leg-icon--dim' : ''}`}>
                      <img src={b.logo} alt={b.name} />
                    </span>
                    {b.name}
                    {b.isYou && <span className="hdash__you-badge">You</span>}
                  </button>
                );
              })}
            </div>

            {/* SVG + tooltip container */}
            <div className="hdash__chart-wrap" onMouseLeave={() => setChartHover(null)}>
              <svg
                viewBox={`0 0 ${VW} ${VH}`}
                className="hdash__chart-svg"
                preserveAspectRatio="none"
                onMouseMove={handleChartMove}
              >
                {/* Y-axis grid + labels */}
                {tab === 'visibility' ? (
                  VIS_Y_LINES.map(v => (
                    <g key={v}>
                      <line x1={PL} y1={yAt(v)} x2={VW-PR} y2={yAt(v)} stroke="#eef0f4" strokeWidth="1"/>
                      <text x={PL-5} y={yAt(v)+3.5} textAnchor="end" fontSize="8.5" fill="#9a9aa0">{v}</text>
                    </g>
                  ))
                ) : (
                  SENT_Y_LINES.map(t => (
                    <g key={t.val}>
                      <line x1={PL} y1={yAt(t.val)} x2={VW-PR} y2={yAt(t.val)} stroke="#eef0f4" strokeWidth="1"/>
                      <text x={PL-5} y={yAt(t.val)+3.5} textAnchor="end" fontSize="7" fill={t.color} fontWeight="600">{t.label}</text>
                    </g>
                  ))
                )}

                {/* X-axis ticks */}
                {X_TICKS.map(({ i, label }) => (
                  <text key={label} x={xAt(i)} y={VH-4}
                    textAnchor={i === 0 ? 'start' : i === n-1 ? 'end' : 'middle'}
                    fontSize="8.5" fill="#9a9aa0">{label}</text>
                ))}

                {/* Brand lines */}
                {BRANDS.map(b => (
                  <path key={b.id}
                    d={makePath(chartData[b.id])}
                    fill="none"
                    stroke={b.color}
                    strokeWidth={1}
                    strokeOpacity={lineOpacity(b.id)}
                    style={{ transition: 'stroke-opacity 0.2s' }}
                  />
                ))}

                {/* Persistent data-point dots for filtered brands */}
                {filters.size > 0 && BRANDS.filter(b => filters.has(b.id)).map(b =>
                  Array.from({ length: n }, (_, i) => (
                    <circle key={`pt-${b.id}-${i}`}
                      cx={xAt(i)} cy={yAt(chartData[b.id][i])}
                      r="3" fill="#fff" stroke={b.color} strokeWidth="2"
                    />
                  ))
                )}

                {/* Hover crosshair + dots */}
                {chartHover !== null && (
                  <>
                    <line
                      x1={xAt(chartHover)} y1={PT}
                      x2={xAt(chartHover)} y2={VH - PB}
                      stroke="#b0b8cc" strokeWidth="1" strokeDasharray="3,2"
                    />
                    {BRANDS.map(b => (
                      <circle key={b.id}
                        cx={xAt(chartHover)}
                        cy={yAt(chartData[b.id][chartHover])}
                        r="3.5"
                        fill={b.color}
                        stroke="#fff"
                        strokeWidth="1.5"
                        fillOpacity={lineOpacity(b.id)}
                        strokeOpacity={lineOpacity(b.id)}
                      />
                    ))}
                  </>
                )}
              </svg>

              {/* Hover tooltip */}
              {chartHover !== null && (
                <div
                  className="hdash__chart-tip"
                  style={{
                    left: `${tipXPct}%`,
                    transform: tipFlip
                      ? 'translateX(calc(-100% - 8px))'
                      : 'translateX(8px)',
                  }}
                >
                  <div className="hdash__tip-date">{X_DATES[chartHover]}</div>
                  {tipBrands.map(b => {
                    const val = chartData[b.id][chartHover];
                    const tier = sentTier(val);
                    return (
                      <div key={b.id} className="hdash__tip-row">
                        <span className="hdash__tip-dot" style={{ background: b.color }} />
                        <span className="hdash__tip-logo">
                          <img src={b.logo} alt={b.name} />
                        </span>
                        <span className="hdash__tip-name">{b.name}</span>
                        {tab === 'visibility' ? (
                          <span className="hdash__tip-val" style={{ color: tier.color }}>{val}%</span>
                        ) : (
                          <span className="hdash__tip-val" style={{ color: tier.color }}>{tier.label}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Position vs Competitors */}
          <div className="hdash__card hdash__card--quad">
            <div className="hdash__quad-head">
              <p className="hdash__card-title">Position vs Competitors</p>
              <p className="hdash__card-sub">
                Each dot is a brand. Based on May 15 analysis
              </p>
            </div>

            <div className="hdash__quad-wrap">
              <div className="hdash__quad-ylabel">
                <span>↑</span><span>SENTIMENT</span><span>↓</span>
              </div>

              <div className="hdash__quad-area">
                <div className="hdash__quad-grid">
                  <div className="hdash__qcell hdash__qcell--tl"><span className="hdash__qcell-label">STRONG SENTIMENT · LOW VISIBILITY</span></div>
                  <div className="hdash__qcell hdash__qcell--tr"><span className="hdash__qcell-label">LEADERS</span></div>
                  <div className="hdash__qcell hdash__qcell--bl"><span className="hdash__qcell-label">AT RISK</span></div>
                  <div className="hdash__qcell hdash__qcell--br"><span className="hdash__qcell-label">STRONG VISIBILITY · WEAK SENTIMENT</span></div>
                </div>

                {BRANDS.map(b => {
                  const pos = QUAD_POS[b.id];
                  const tier = sentTier(pos.y);
                  const isQuadDim = filters.size > 0 && !filters.has(b.id);
                  return (
                    <div key={b.id}
                      className={`hdash__brand-dot${b.isYou ? ' hdash__brand-dot--you' : ''}${isQuadDim ? ' hdash__brand-dot--dim' : ''}`}
                      style={{ left: `${pos.x}%`, top: `${100 - pos.y}%` }}
                      onMouseEnter={() => { if (!isQuadDim) setQuadTip(b.id); }}
                      onMouseLeave={() => setQuadTip(null)}
                    >
                      <span className="hdash__brand-av">
                        <img src={b.logo} alt={b.name} className="hdash__brand-av-logo" />
                      </span>
                      {quadTip === b.id && (
                        <div className="hdash__qtip">
                          {b.isYou && <div className="hdash__qtip-your">Your Brand</div>}
                          <div className="hdash__qtip-name">{b.name}</div>
                          <div className="hdash__qtip-row">
                            <span className="hdash__qtip-key">Visibility:</span>
                            <span className="hdash__qtip-vis">{pos.x}%</span>
                          </div>
                          <div className="hdash__qtip-row">
                            <span className="hdash__qtip-key">Sentiment:</span>
                            <span className="hdash__qtip-badge"
                              style={{ color: tier.color, borderColor: tier.color + '60', background: tier.color + '18' }}
                            >{tier.label}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="hdash__quad-xlabel">
                <span>Low</span>
                <span>← VISIBILITY →</span>
                <span>High</span>
              </div>
            </div>
          </div>

          {/* AI Insight bar */}
          <div className="hdash__insight-bar">
            <span className="hdash__insight-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>
              </svg>
            </span>
            <p><b>Poli AI Insight:</b> Nike leads with Very Strong sentiment and 64% visibility. Hoka is the fastest riser — monitor its sentiment trajectory before it reaches the Leaders zone.</p>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="hdash__right">

          {/* Visibility Analysis */}
          <div className="hdash__analysis-card">
            <p className="hdash__analysis-title">Visibility Analysis</p>
            <p className="hdash__analysis-sub">How often your product appears in AI answers</p>

            <div className="hdash__kpi-row">
              <div className="hdash__kpi">
                <span className="hdash__kpi-label">Avg. Score</span>
                <span className="hdash__kpi-val-vis">64%</span>
              </div>
              <div className="hdash__kpi">
                <span className="hdash__kpi-label">Avg. Position</span>
                <span className="hdash__kpi-val-vis">#2</span>
              </div>
              <div className="hdash__kpi">
                <span className="hdash__kpi-label">Trend</span>
                <span className="hdash__kpi-val hdash__kpi--down">↓ Declining</span>
              </div>
            </div>

            <div className="hdash__plat-header">
              <span>Score by platform</span><span>Percent</span>
            </div>
            {[
              { name: 'ChatGPT', icon: '/chatgpt-com-logo.png', pct: 80, color: 'rgb(59, 130, 246)' },
              { name: 'Claude',  icon: '/claudeai-com-logo.png',  pct: 40, color: 'rgb(59, 130, 246)' },
              { name: 'Gemini',  icon: '/gemini-ai-logo.png',  pct: 70, color: 'rgb(59, 130, 246)' },
            ].map(p => (
              <div key={p.name} className="hdash__plat-row">
                <div className="hdash__plat-header">
                  <span className="hdash__plat-name">
                    <img src={p.icon} alt={p.name} className="hdash__plat-icon" />
                    {p.name}
                  </span>
                  <span className="hdash__plat-pct">{p.pct}%</span>
                </div>
                <div className="hdash__plat-track">
                  <div className="hdash__plat-bar" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
              </div>
            ))}

            <p className="hdash__insight-note">Claude coverage is weakest, highest opportunity to improve mention rate.</p>
            <button className="hdash__details-btn">Details</button>
          </div>

          {/* Sentiment Analysis */}
          <div className="hdash__analysis-card">
            <p className="hdash__analysis-title">Sentiment Analysis</p>
            <p className="hdash__analysis-sub">How your product is described by AI</p>

            <div className="hdash__kpi-row">
              <div className="hdash__kpi">
                <span className="hdash__kpi-label">Avg. Score</span>
                <span className="hdash__kpi-val hdash__kpi--strong">Strong</span>
              </div>
              <div className="hdash__kpi">
                <span className="hdash__kpi-label">Trend</span>
                <span className="hdash__kpi-val">→ Stable</span>
              </div>
            </div>

            <p className="hdash__plat-label-sm">Score by platform</p>
            {[
              { label: 'Performance', pct: 83 },
              { label: 'Quality',     pct: 88 },
              { label: 'Safety',      pct: 79 },
            ].map(s => (
              <div key={s.label} className="hdash__sent-row">
                <div className="hdash__sent-top">
                  <span className="hdash__sent-label">{s.label}</span>
                  <span className="hdash__sent-badge">Strong</span>
                </div>
                <div className="hdash__sent-track">
                  <div className="hdash__sent-bar" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}

            <p className="hdash__insight-note">All platforms are performing well. Quality leads with the strongest sentiment coverage.</p>
            <button className="hdash__details-btn">Details</button>
          </div>
        </div>

      </div>
    </div>
  );
}
