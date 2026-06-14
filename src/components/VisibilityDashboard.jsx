import { useState, useMemo } from 'react';
import { useLang } from '../contexts/LangContext';

/* ── Single-brand chart data ─────────────────────────────────────── */
const NIKE_DATA = [88, 90, 83, 78, 67, 45];
const X_LABELS  = ['Apr 27', 'May 4', 'May 11', 'May 18', 'May 25', 'Jun 1'];

/* ── Score Breakdown data ────────────────────────────────────────── */
const SB_SCORE = 45;

const RAW_AXES_PCT = [75, 67, 42, 13];
const RAW_AXES_IDS = ['brand-awareness', 'performance', 'design', 'durability'];
const RAW_MODELS = [
  { id: 'chatgpt', name: 'ChatGPT', icon: `${import.meta.env.BASE_URL}chatgpt-com-logo.png`,  pct: 50 },
  { id: 'mistral', name: 'Mistral', icon: `${import.meta.env.BASE_URL}mistral-ai-logo.png`,   pct: 50 },
  { id: 'gemini',  name: 'Gemini',  icon: `${import.meta.env.BASE_URL}gemini-ai-logo.png`,    pct: 60 },
  { id: 'claude',  name: 'Claude',  icon: `${import.meta.env.BASE_URL}claudeai-com-logo.png`, pct: 20 },
];

function getScoreLabel(score) {
  if (score >= 80) return { label: 'Excellent', color: '#16a34a', bg: '#dcfce7' };
  if (score >= 60) return { label: 'Good',      color: '#2563eb', bg: '#dbeafe' };
  if (score >= 40) return { label: 'Moderate',  color: '#d97706', bg: '#fef3c7' };
  return               { label: 'Weak',      color: '#dc2626', bg: '#fee2e2' };
}

function applyTags(sorted) {
  const highest = sorted[0].pct;
  const lowest  = sorted[sorted.length - 1].pct;
  return sorted.map(item => ({
    ...item,
    tag:      item.pct === highest ? 'Leader'   : item.pct === lowest ? 'Priority' : null,
    tagColor: item.pct === highest ? '#16a34a'  : '#FA7319',
    tagBg:    item.pct === highest ? '#dcfce7'  : '#FFF3EB',
  }));
}

/* ── Chart helpers ───────────────────────────────────────────────── */
const VW = 540, VH = 200, PT = 8, PR = 8, PB = 20, PL = 26, n = 6;
function yAt(v) { return PT + (1 - v / 100) * (VH - PT - PB); }
function xAt(i) { return PL + (i / (n - 1)) * (VW - PL - PR); }
function makePath(vals) {
  const pts = vals.map((v, i) => [xAt(i), yAt(v)]);
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1]; const [cx, cy] = pts[i];
    const mx = ((px + cx) / 2).toFixed(1);
    d += ` C${mx},${py.toFixed(1)} ${mx},${cy.toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)}`;
  }
  return d;
}

/* ── Score Breakdown right panel ─────────────────────────────────── */
function ScoreBreakdown() {
  const { t } = useLang();
  const vd = t('visibilityDashboard');
  const [activeTab, setActiveTab] = useState('Axes');

  const scoreInfo = getScoreLabel(SB_SCORE);

  const axisLabels = t('dashboard.sentPanel.axes');
  const RAW_AXES = RAW_AXES_IDS.map((id, i) => ({ id, name: axisLabels[i], pct: RAW_AXES_PCT[i] }));

  const barsDisplay = useMemo(() => {
    const raw = activeTab === 'Axes' ? RAW_AXES : RAW_MODELS;
    const sorted = [...raw].sort((a, b) => b.pct - a.pct);
    return applyTags(sorted);
  }, [activeTab, axisLabels]);

  const R = 35, SW = 7;
  const circ  = 2 * Math.PI * R;
  const offset = circ - (SB_SCORE / 100) * circ;

  return (
    <div className="hdash__sb-wrap">

      <div className="hdash__sb-hdr2">
        <div>
          <p className="hdash__sb-title2">{vd.scoreBreakdown.title}</p>
          <p className="hdash__sb-sub2">{vd.scoreBreakdown.sub}</p>
        </div>
        <span className="hdash__sb-score-badge" style={{ color: scoreInfo.color, background: scoreInfo.bg }}>
          {t('dashboard.scoreBadges')[scoreInfo.label]}
        </span>
      </div>

      <div className="hdash__sb-tabs-row">
        <div className="hdash__sb-tab-group2">
          {vd.scoreBreakdown.tabs.map((tabLabel, ti) => (
            <button key={ti}
              className={`hdash__sb-tab2${activeTab === (ti === 0 ? 'Axes' : 'AI Models') ? ' hdash__sb-tab2--on' : ''}`}
              onClick={() => setActiveTab(ti === 0 ? 'Axes' : 'AI Models')}>
              {tabLabel}
            </button>
          ))}
        </div>
        <div className="hdash__sb-donut">
          <svg width="88" height="88" viewBox="0 0 88 88" className="hdash__sb-donut-svg">
            <circle cx="44" cy="44" r={R} fill="none" stroke="#bfdbfe" strokeWidth={SW} />
            <circle cx="44" cy="44" r={R} fill="none" stroke="#2563eb" strokeWidth={SW}
              strokeDasharray={circ}
              strokeDashoffset={offset}
              transform="rotate(-90 44 44)"
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div className="hdash__sb-donut-text">
            <span className="hdash__sb-donut-num">{SB_SCORE}</span>
            <span className="hdash__sb-donut-denom">/100</span>
          </div>
        </div>
      </div>

      <div className="hdash__sb-bars">
        {barsDisplay.map(bar => (
          <div key={bar.id} className="hdash__sb-bar-card">
            <div className="hdash__sb-bar-card-top">
              <span className="hdash__sb-bar-card-name">
                {bar.icon && <img src={bar.icon} alt={bar.name} className="hdash__sb-bar-card-icon" />}
                {bar.name}
              </span>
              <span className="hdash__sb-bar-card-right">
                {bar.tag && (
                  <span className="hdash__sb-bar-tag" style={{ color: bar.tagColor, background: bar.tagBg }}>
                    {bar.tag === 'Leader' ? vd.scoreBreakdown.tags.leader : vd.scoreBreakdown.tags.priority}
                  </span>
                )}
                <span className="hdash__sb-bar-pct2">{bar.pct}%</span>
              </span>
            </div>
            <div className="hdash__sb-bar-track2">
              <div className="hdash__sb-bar-fill" style={{ width: `${bar.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export default function VisibilityDashboard() {
  const { t } = useLang();
  const vd = t('visibilityDashboard');
  const ds = t('dashboard');
  const [chartHov, setChartHov] = useState(null);

  function handleChartMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * VW;
    const rawI = (svgX - PL) / ((VW - PL - PR) / (n - 1));
    setChartHov(Math.max(0, Math.min(n - 1, Math.round(rawI))));
  }

  const tipXPct = chartHov !== null ? (xAt(chartHov) / VW) * 100 : 0;
  const tipFlip = chartHov !== null && chartHov > n * 0.6;

  return (
    <div className="hero__dashboard">

      <div className="dash__appbar">
        <span className="dash__dot" /><span className="dash__dot" /><span className="dash__dot" />
        <span className="dash__url">{vd.appbar}</span>
      </div>

      <div className="hdash__v2-body">

        {/* ── Sidebar ── */}
        <aside className="dash__sidebar">
          <div className="dsb__brand">
            <div className="dsb__brand-logo">
              <img src={`${import.meta.env.BASE_URL}nike-com-logo.png`} alt="Nike" />
            </div>
            <div className="dsb__brand-info">
              <span className="dsb__brand-name">{ds.sidebar.nike}</span>
              <span className="dsb__brand-meta">{ds.sidebar.activeProject}</span>
            </div>
          </div>
          <div className="dsb__ask-poli">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>
              <path d="M20 2v4"/><path d="M22 4h-4"/>
              <circle cx="4" cy="20" r="2"/>
            </svg>
            {ds.sidebar.askPoliAI}
          </div>
          <div className="dsb__section-hdr">
            <span className="dsb__section-lbl">{ds.sidebar.geoAudit}</span>
          </div>
          <div className="dsb__tree">
            <div className="dsb__tree-brand">
              <span className="dsb__tree-chevron">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="10" height="10"><path d="m6 9 6 6 6-6"/></svg>
              </span>
              <span className="dsb__avatar dsb__avatar--n">N</span>
              <span className="dsb__tree-brand-name">nike</span>
            </div>
            <div className="dsb__tree-l1">
              <div className="dsb__tree-category">
                <span className="dsb__tree-chevron">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="10" height="10"><path d="m6 9 6 6 6-6"/></svg>
                </span>
                <span className="dsb__avatar dsb__avatar--n">A</span>
                <span className="dsb__tree-cat-name">{ds.sidebar.footwear}</span>
              </div>
              <div className="dsb__tree-l2">
                {ds.sidebar.navItems.map((l, li) => (
                  <div key={l} className={`dash__nav-item${li === 1 ? ' dash__nav-item--active' : ''}`}>{l}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="dsb__section-hdr dsb__section-hdr--mt">
            <span className="dsb__section-lbl">{ds.sidebar.technicalAudit}</span>
          </div>
          <div className="dsb__section-hdr">
            <span className="dsb__section-lbl">{ds.sidebar.contentGeneration}</span>
          </div>
        </aside>

        <div className="hdash__v2-main">

          <div className="hdash__v2-brand-row">
            <div className="hdash__v2-brand-left">
              <div className="hdash__v2-brand-logo">
                <img src={`${import.meta.env.BASE_URL}nike-com-logo.png`} alt="Nike" />
              </div>
              <div>
                <div className="hdash__v2-brand-name">Nike</div>
                <div className="hdash__v2-brand-sub">{vd.brandSub}</div>
              </div>
            </div>
            <div className="hdash__v2-score-wrap">
              <span className="hdash__v2-score-label">{vd.overallScore}</span>
              <span className="hdash__v2-score-badge">{vd.scoreBadge}</span>
            </div>
          </div>

          <div className="hdash__v2-nora">
            <span className="hdash__v2-nora-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" width="12" height="12">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </span>
            <p><b>Nora:</b> {vd.noraNote}</p>
          </div>

          <div className="hdash__v2-section-label">{vd.overTime}</div>

          <div className="hdash__v2-chart-wrap" onMouseLeave={() => setChartHov(null)}>
            <svg viewBox={`0 0 ${VW} ${VH}`} className="hdash__v2-svg"
              onMouseMove={handleChartMove}>
              <defs>
                <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`${makePath(NIKE_DATA)} L${xAt(n-1)},${yAt(0)} L${xAt(0)},${yAt(0)} Z`}
                fill="url(#visGrad)"
              />
              {[0, 25, 50, 75, 100].map(v => (
                <g key={v}>
                  <line x1={PL} y1={yAt(v)} x2={VW-PR} y2={yAt(v)} stroke="#eef0f4" strokeWidth="1"/>
                  <text x={PL-4} y={yAt(v)+3} textAnchor="end" fontSize="7.5" fill="#9a9aa0">{v}</text>
                </g>
              ))}
              {X_LABELS.map((label, i) => (
                <text key={i} x={xAt(i)} y={VH-4} textAnchor={i === n - 1 ? 'end' : 'middle'} fontSize="7.5" fill="#9a9aa0">{label}</text>
              ))}
              <path d={makePath(NIKE_DATA)} fill="none" stroke="#2563eb" strokeWidth="2" />
              {chartHov !== null && (
                <>
                  <line x1={xAt(chartHov)} y1={PT} x2={xAt(chartHov)} y2={VH-PB}
                    stroke="#b0b8cc" strokeWidth="1" strokeDasharray="3,2" />
                  <circle cx={xAt(chartHov)} cy={yAt(NIKE_DATA[chartHov])}
                    r="4" fill="#2563eb" stroke="#fff" strokeWidth="2" />
                </>
              )}
            </svg>

            {chartHov !== null && (
              <div className="hdash__v2-tip"
                style={{ left: `${tipXPct}%`, transform: tipFlip ? 'translateX(calc(-100% - 8px))' : 'translateX(8px)' }}>
                <div className="hdash__v2-tip-date">{X_LABELS[chartHov]}, 2026</div>
                <div className="hdash__v2-tip-row">
                  <span className="hdash__v2-tip-dot" style={{ background: '#2563eb' }} />
                  <span className="hdash__v2-tip-name">Nike</span>
                  <span className="hdash__v2-tip-val">{NIKE_DATA[chartHov]}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hdash__v2-right">
          <ScoreBreakdown />
        </div>

      </div>
    </div>
  );
}
