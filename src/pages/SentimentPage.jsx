import { useState, useEffect, useMemo } from 'react';
import '../sentiment.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';
import { useLang } from '../contexts/LangContext';

const HL = ({ children }) => <span className="hl">{children}</span>;

/* Trend delta shown next to a bar-card's track — reuses the same
   up/down-arrow convention as the at-a-glance stat cards above. */
function DeltaTag({ value }) {
  const pos = value >= 0;
  return (
    <span className={`hdash__sb-bar-delta${pos ? ' hdash__sb-bar-delta--pos' : ' hdash__sb-bar-delta--warn'}`}>
      <span className="hdash__sb-bar-delta-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="10" height="10">
          {pos ? <path d="M12 19V5M5 12l7-7 7 7"/> : <path d="M12 5v14M19 12l-7 7-7-7"/>}
        </svg>
      </span>
      {pos ? `+${value}` : value} pts
    </span>
  );
}

/* ── Sentiment chart data ───────────────────────────────────── */
const SENT_DATA     = [75, 100, 75, 100, 75, 75];
const SENT_X_LABELS = ['Apr 27', 'May 4', 'May 11', 'May 18', 'May 25', 'Jun 1'];
const CVW = 540, CVH = 160, CPT = 8, CPR = 8, CPB = 20, CPL = 70, CN = 6;
const CHART_TIERS = [
  { v: 100, label: 'Very Strong', color: '#15803d' },
  { v: 75,  label: 'Strong',      color: '#22c55e' },
  { v: 50,  label: 'Moderate',    color: '#eab308' },
  { v: 25,  label: 'Weak',        color: '#f97316' },
  { v: 0,   label: 'Very Weak',   color: '#ef4444' },
];
function cyAt(v) { return CPT + (1 - v / 100) * (CVH - CPT - CPB); }
function cxAt(i) { return CPL + (i / (CN - 1)) * (CVW - CPL - CPR); }
function makeSentPath(vals) {
  const pts = vals.map((v, i) => [cxAt(i), cyAt(v)]);
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1]; const [cx, cy] = pts[i];
    const mx = ((px + cx) / 2).toFixed(1);
    d += ` C${mx},${py.toFixed(1)} ${mx},${cy.toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)}`;
  }
  return d;
}

/* ── Sentiment Breakdown panel ──────────────────────────────── */
const SENT_OVERALL = 'Strong';
const TIER_STYLE = {
  'Very Strong': { color: '#15803d', bg: '#d1fae5', bar: '#15803d' },
  'Strong':      { color: '#22c55e', bg: '#dcfce7', bar: '#22c55e' },
  'Moderate':    { color: '#eab308', bg: '#fefce8', bar: '#eab308' },
  'Weak':        { color: '#f97316', bg: '#fff7ed', bar: '#f97316' },
  'Very Weak':   { color: '#ef4444', bg: '#fef2f2', bar: '#ef4444' },
};

/* Per-tier accent used by the per-axis diagram's card/line/pill —
   tied to sentiment strength, not per-axis identity. */
const TIER_ACCENT = {
  'Very Strong': { accent: '#15803d', cardBg: '#d1fae5' },
  'Strong':      { accent: '#22c55e', cardBg: '#dcfce7' },
  'Moderate':    { accent: '#eab308', cardBg: '#fefce8' },
  'Weak':        { accent: '#f97316', cardBg: '#fff7ed' },
  'Very Weak':   { accent: '#ef4444', cardBg: '#fef2f2' },
};

/* ── Per-axis sentiment diagram: axis cards + the real buyer
   questions rolling up into each one (same layout as Visibility's
   Product Focus diagram) ───────────────────────────────────── */
const PF_AXES = [
  {
    name: 'Performance', prompts: 22, tier: 'Strong',
    questions: [
      { text: 'Looking for lightweight gym training shoes that provide maximum stability?', sentiment: 'pos' },
      { text: 'Professional advice on choosing the best cross-training shoes for intense workouts?', sentiment: 'pos' },
    ],
  },
  {
    name: 'Durability', prompts: 15, tier: 'Weak',
    questions: [
      { text: 'Best high-performance running shoes for trail conditions available?', sentiment: 'neutral' },
      { text: 'What are the best durable footwear brands for long-distance walking?', sentiment: 'neg' },
    ],
  },
  {
    name: 'Design', prompts: 20, tier: 'Strong',
    questions: [
      { text: 'Where can I find affordable and reliable everyday sneakers?', sentiment: 'pos' },
      { text: 'What are the most comfortable everyday walking shoes with arch support?', sentiment: 'pos' },
    ],
  },
  {
    name: 'Brand awareness', prompts: 18, tier: 'Very Strong',
    questions: [
      { text: 'Which trendy sneakers are currently popular for casual street style?', sentiment: 'pos' },
      { text: 'What sneaker brands do people trust most?', sentiment: 'pos' },
    ],
  },
];

/* Splits a question into 3 lines balanced by character length (not
   word count), each split falling at the word boundary closest to the
   remaining text's own midpoint. */
function wrapQuestion(text, lineCount = 3) {
  const words = text.split(' ');
  const lines = [];
  let start = 0;
  for (let li = 0; li < lineCount - 1; li++) {
    const remainingLines = lineCount - li;
    const target = words.slice(start).join(' ').length / remainingLines;
    let acc = 0, bestIdx = start + 1, bestDiff = Infinity;
    for (let i = start; i < words.length - (remainingLines - 1); i++) {
      acc += words[i].length + 1;
      const diff = Math.abs(acc - target);
      if (diff < bestDiff) { bestDiff = diff; bestIdx = i + 1; }
    }
    lines.push(words.slice(start, bestIdx).join(' '));
    start = bestIdx;
  }
  lines.push(words.slice(start).join(' '));
  return lines;
}

/* Exclusive prefix sum of question counts, so each axis's connector
   lines get a unique, stable pf-line--N (drives the staggered draw-in). */
const PF_LINE_OFFSET = PF_AXES.reduce((acc, axis) => {
  const prev = acc.length ? acc[acc.length - 1] : 0;
  acc.push(prev + axis.questions.length);
  return acc;
}, []);

const SENT_AXES = [
  { id: 'brand-awareness', name: 'Brand awareness', score: 92, tier: 'Very Strong' },
  { id: 'performance',     name: 'Performance',     score: 76, tier: 'Strong' },
  { id: 'design',          name: 'Design',           score: 72, tier: 'Strong' },
  { id: 'durability',      name: 'Durability',       score: 28, tier: 'Weak', isPriority: true },
];
const SENT_MODELS = [
  { id: 'gemini',  name: 'Gemini',  icon: `${import.meta.env.BASE_URL}gemini-ai-logo.png`,    score: 90, tier: 'Very Strong' },
  { id: 'chatgpt', name: 'ChatGPT', icon: `${import.meta.env.BASE_URL}chatgpt-com-logo.png`,  score: 76, tier: 'Strong' },
  { id: 'mistral', name: 'Mistral', icon: `${import.meta.env.BASE_URL}mistral-ai-logo.png`,   score: 72, tier: 'Strong' },
  { id: 'claude',  name: 'Claude',  icon: `${import.meta.env.BASE_URL}claudeai-com-logo.png`, score: 28, tier: 'Weak', isPriority: true },
];

function SentimentBreakdown() {
  const { t } = useLang();
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const md = t('sentiment.mockDash');
  const items = useMemo(
    () => activeTabIdx === 0 ? SENT_AXES : SENT_MODELS,
    [activeTabIdx]
  );
  const overall = TIER_STYLE[SENT_OVERALL];

  return (
    <div className="hdash__sb-wrap">
      <div className="hdash__sb-hdr2">
        <div>
          <p className="hdash__sb-title2">{md.breakdownTitle}</p>
          <p className="hdash__sb-sub2">{md.breakdownSub}</p>
        </div>
        <span className="hdash__sb-score-badge" style={{ color: overall.color, background: overall.bg }}>
          {md.overallScore}
        </span>
      </div>
      <div className="hdash__sb-tabs-row">
        <div className="hdash__sb-tab-group2">
          {md.tabs.map((tab, idx) => (
            <button key={idx}
              className={`hdash__sb-tab2${activeTabIdx === idx ? ' hdash__sb-tab2--on' : ''}`}
              onClick={() => setActiveTabIdx(idx)}>
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="hdash__sb-bars">
        {items.map(item => {
          const ts = TIER_STYLE[item.tier];
          const displayName = item.name;
          return (
            <div key={item.id} className="hdash__sb-bar-card">
              <div className="hdash__sb-bar-card-top">
                <span className="hdash__sb-bar-card-name">
                  {item.icon && <img src={item.icon} alt={item.name} className="hdash__sb-bar-card-icon" />}
                  {displayName}
                </span>
                <span className="hdash__sb-bar-card-right">
                  {item.isPriority && (
                    <span className="hdash__sb-bar-tag" style={{ color: '#FA7319', background: '#FFF3EB' }}>{md.priority}</span>
                  )}
                  <span className="hdash__sb-bar-tag" style={{ color: ts.color, background: ts.bg }}>{md.tiers[item.tier]}</span>
                </span>
              </div>
              <div className="hdash__sb-bar-track2">
                <div className="hdash__sb-bar-fill" style={{ width: `${item.score}%`, background: ts.bar }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── tour card data ─────────────────────────────────────────── */
const TOUR_CARDS = [
  {
    num: '01',
    href: '#axes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
      </svg>
    ),
    titleKey: 'title',
    descKey: 'desc',
  },
  {
    num: '02',
    href: '#angles',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    titleKey: 'title',
    descKey: 'desc',
  },
  {
    num: '03',
    href: '#compare',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    titleKey: 'title',
    descKey: 'desc',
  },
  {
    num: '04',
    href: '#ivy',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    titleKey: 'title',
    descKey: 'desc',
  },
];

/* ── competitor data ─────────────────────────────────────────── */
const COMPETITORS = [
  {
    name: 'Adidas',   you: false, bd: '#dc2626', logo: `${import.meta.env.BASE_URL}adidas-group-com-logo.png`,
    awareness: { label: 'Very Strong', cls: 'pt-pos' },
    design:    { label: 'Strong',      cls: 'pt-pos' },
    durability:{ label: 'Moderate',    cls: 'pt-warn' },
    performance:{ label: 'Strong',     cls: 'pt-pos' },
    overall: 78, overallLabel: 'Strong',
  },
  {
    name: 'Nike',     you: true,  bd: '#111827', logo: `${import.meta.env.BASE_URL}nike-com-logo.png`,
    awareness: { label: 'Very Strong', cls: 'pt-pos' },
    design:    { label: 'Strong',      cls: 'pt-pos' },
    durability:{ label: 'Weak',        cls: 'pt-neg' },
    performance:{ label: 'Strong',     cls: 'pt-pos' },
    overall: 55, overallLabel: 'Moderate',
  },
  {
    name: 'On',       you: false, bd: '#db2777', logo: `${import.meta.env.BASE_URL}on-com-logo.png`,
    awareness: { label: 'Strong',      cls: 'pt-pos' },
    design:    { label: 'Strong',      cls: 'pt-pos' },
    durability:{ label: 'Strong',      cls: 'pt-pos' },
    performance:{ label: 'Strong',     cls: 'pt-pos' },
    overall: 78, overallLabel: 'Strong',
  },
  {
    name: 'Hoka',     you: false, bd: '#ea580c', logo: `${import.meta.env.BASE_URL}hoka-com-logo.png`,
    awareness: { label: 'Moderate',    cls: 'pt-warn' },
    design:    { label: 'Moderate',    cls: 'pt-warn' },
    durability:{ label: 'Very Strong', cls: 'pt-pos' },
    performance:{ label: 'Strong',     cls: 'pt-pos' },
    overall: 55, overallLabel: 'Moderate',
  },
  {
    name: 'Brooks',   you: false, bd: '#7c3aed', logo: `${import.meta.env.BASE_URL}brooksrunning-com-logo.png`,
    awareness: { label: 'Strong',      cls: 'pt-pos' },
    design:    { label: 'Strong',      cls: 'pt-pos' },
    durability:{ label: 'Strong',      cls: 'pt-pos' },
    performance:{ label: 'Strong',     cls: 'pt-pos' },
    overall: 78, overallLabel: 'Strong',
  },
  {
    name: 'New Balance',   you: false, bd: '#475569', logo: `${import.meta.env.BASE_URL}newbalance-com-logo.png`,
    awareness: { label: 'Very Strong',           cls: 'pt-neu' },
    design:    { label: 'Strong',           cls: 'pt-neu' },
    durability:{ label: 'Strong', cls: 'pt-pos' },
    performance:{ label: 'Moderate',     cls: 'pt-pos' },
    overall: 78, overallLabel: 'Strong',
  },
];

export default function SentimentPage() {
  const { t } = useLang();
  const md = t('sentiment.mockDash');
  const [sentHov, setSentHov] = useState(null);

  function handleSentMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * CVW;
    const rawI = (svgX - CPL) / ((CVW - CPL - CPR) / (CN - 1));
    setSentHov(Math.max(0, Math.min(CN - 1, Math.round(rawI))));
  }

  const sentTipXPct = sentHov !== null ? (cxAt(sentHov) / CVW) * 100 : 0;
  const sentTipFlip = sentHov !== null && sentHov > CN * 0.6;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="vis-page sent-page">
      <Seo page="sentiment" />
      <Navbar />
      <main>
        {/* ===== HERO ===== */}
        <Hero
          eyebrow={t('sentiment.hero.eyebrow')}
          title={<>{t('sentiment.hero.titlePre')} <HL>{t('sentiment.hero.titleHl')}</HL> {t('sentiment.hero.titlePost')}</>}
          lead={t('sentiment.hero.lead')}
          primaryCta={t('sentiment.hero.primaryCta')}
          secondaryCta={t('sentiment.hero.secondaryCta')}
          note={t('sentiment.hero.note')}
          showDashboard={false}
        />

        {/* ===== DASHBOARD ===== */}
        <section style={{ paddingTop: '72px' }}>
          <div className="wrap">
            <div className="sec-head mid reveal" style={{ marginBottom: '44px' }}>
              <h2>{t('sentiment.dashboard.h2Pre')} <HL>{t('sentiment.dashboard.h2Hl')}</HL></h2>
              <p className="lead">{t('sentiment.dashboard.lead')}</p>
            </div>

            <div className="app reveal">
              <div className="hdash__v2-body">
                {/* sidebar */}
                <aside className="dash__sidebar">
                  <div className="dsb__brand">
                    <div className="dsb__brand-logo">
                      <img src={`${import.meta.env.BASE_URL}nike-com-logo.png`} alt="Nike" />
                    </div>
                    <div className="dsb__brand-info">
                      <span className="dsb__brand-name">Nike</span>
                      <span className="dsb__brand-meta">{md.activeProject}</span>
                    </div>
                  </div>
                  <div className="dsb__ask-poli">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>
                      <path d="M20 2v4"/><path d="M22 4h-4"/>
                      <circle cx="4" cy="20" r="2"/>
                    </svg>
                    {md.askPoliAI}
                  </div>
                  <div className="dsb__section-hdr">
                    <span className="dsb__section-lbl">{md.geoAudit}</span>
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
                        <span className="dsb__tree-cat-name">{md.footwear}</span>
                      </div>
                      <div className="dsb__tree-l2">
                        {md.navItems.map((l, idx) => (
                          <div key={idx} className={`dash__nav-item${idx === 2 ? ' dash__nav-item--active' : ''}`}>{l}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="dsb__section-hdr dsb__section-hdr--mt">
                    <span className="dsb__section-lbl">{md.technicalAudit}</span>
                  </div>
                  <div className="dsb__section-hdr">
                    <span className="dsb__section-lbl">{md.contentGen}</span>
                  </div>
                </aside>

                {/* main */}
                <div className="hdash__v2-main">
                  <div className="hdash__v2-brand-row">
                    <div className="hdash__v2-brand-left">
                      <div className="hdash__v2-brand-logo">
                        <img src={`${import.meta.env.BASE_URL}nike-com-logo.png`} alt="Nike" />
                      </div>
                      <div>
                        <div className="hdash__v2-brand-name">Nike</div>
                        <div className="hdash__v2-brand-sub">{md.updatedToday}</div>
                      </div>
                    </div>
                    <div className="hdash__v2-score-wrap">
                      <span className="hdash__v2-score-label">{md.overallSentiment}</span>
                      <span className="hdash__v2-score-badge" style={{ color: '#16a34a', background: '#d1fae5' }}>{md.overallScore}</span>
                    </div>
                  </div>

                  <div className="hdash__v2-nora">
                    <span className="hdash__v2-nora-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" width="12" height="12">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                    </span>
                    <p><b>Nora:</b> {md.noraMsg}</p>
                  </div>

                  <div className="hdash__v2-section-label">{md.overTime}</div>

                  <div className="hdash__v2-chart-wrap" onMouseLeave={() => setSentHov(null)}>
                    <svg viewBox="20 0 515 160" className="hdash__v2-svg" onMouseMove={handleSentMove}>
                      <defs>
                        <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.12" />
                          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d={`${makeSentPath(SENT_DATA)} L${cxAt(CN-1)},${cyAt(0)} L${cxAt(0)},${cyAt(0)} Z`}
                        fill="url(#sentGrad)"
                      />
                      {CHART_TIERS.map(({ v, label, color }) => (
                        <g key={v}>
                          <line x1={CPL} y1={cyAt(v)} x2={CVW-CPR} y2={cyAt(v)} stroke="#eef0f4" strokeWidth="1"/>
                          <text x={CPL-6} y={cyAt(v)+3} textAnchor="end" fontSize="7.5" fontWeight="600" fill={color}>{md.tiers[label]}</text>
                        </g>
                      ))}
                      {SENT_X_LABELS.map((label, i) => (
                        <text key={i} x={cxAt(i)} y={CVH-4} textAnchor={i === CN - 1 ? 'end' : 'middle'} fontSize="7.5" fill="#9a9aa0">{label}</text>
                      ))}
                      <path d={makeSentPath(SENT_DATA)} fill="none" stroke="#16a34a" strokeWidth="2" />
                      {sentHov !== null && (
                        <>
                          <line x1={cxAt(sentHov)} y1={CPT} x2={cxAt(sentHov)} y2={CVH-CPB}
                            stroke="#b0b8cc" strokeWidth="1" strokeDasharray="3,2" />
                          <circle cx={cxAt(sentHov)} cy={cyAt(SENT_DATA[sentHov])}
                            r="4" fill="#16a34a" stroke="#fff" strokeWidth="2" />
                        </>
                      )}
                    </svg>
                    {sentHov !== null && (() => {
                      const hovTier = CHART_TIERS.find(t => t.v === SENT_DATA[sentHov]) ?? CHART_TIERS[1];
                      return (
                        <div className="hdash__v2-tip"
                          style={{ left: `${sentTipXPct}%`, transform: sentTipFlip ? 'translateX(calc(-100% - 8px))' : 'translateX(8px)' }}>
                          <div className="hdash__v2-tip-date">{SENT_X_LABELS[sentHov]}, 2026</div>
                          <div className="hdash__v2-tip-row">
                            <span className="hdash__v2-tip-dot" style={{ background: hovTier.color }} />
                            <span className="hdash__v2-tip-name">Nike</span>
                            <span className="hdash__v2-tip-val" style={{ color: hovTier.color }}>{md.tiers[hovTier.label]}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* right panel */}
                <div className="hdash__v2-right">
                  <SentimentBreakdown />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TOUR ===== */}
        <section style={{ background: 'var(--surface-2)' }}>
          <div className="wrap">
            <div className="sec-head mid reveal" style={{ marginBottom: '40px' }}>
              {(() => { const wi = t('sentiment.whatsInside'); return (<>
                <span className="eyebrow">{wi.eyebrow}</span>
                <h2>{wi.h2Pre} <HL>{wi.h2Hl}</HL></h2>
                <p className="lead">{wi.lead}</p>
              </>); })()}
            </div>
            <div className="tour reveal">
              {TOUR_CARDS.map((c) => (
                <a key={c.num} href={c.href} className="tcard">
                  <div className="tcard-top">
                    <div className="ic">
                      {c.icon}
                    </div>
                    <span className="num">{c.num}</span>
                  </div>
                  <h3>{t('sentiment.tourCards')[parseInt(c.num)-1]?.title ?? c.num}</h3>
                  <p>{t('sentiment.tourCards')[parseInt(c.num)-1]?.desc ?? ''}</p>
                  <div className="jump">
                    {t('sentiment.seeIt')}
                    <span className="arr">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 01   PER-AXIS SENTIMENT ===== */}
        <section id="axes">
          <div className="wrap">
            <div className="adv-head mid reveal">
              {(() => { const pa = t('sentiment.perAxis'); return (<>
                <span className="eyebrow">{pa.eyebrow}</span>
                <h2>{pa.h2Pre} <HL>{pa.h2Hl}</HL> {pa.h2Post}</h2>
                <p className="lead">{pa.lead}</p>
              </>); })()}
            </div>

            <div className="pf-wrap reveal">
              {/* legend header */}
              <div className="pf-legend-hdr">
                <span>{t('sentiment.perAxis.legendLabel')}</span>
                <span className="pf-legend-badge pf-legend-badge--pos">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l9 16H3z"/></svg>
                  {t('sentiment.perAxis.legendItems')[0]}
                </span>
                <span className="pf-legend-badge pf-legend-badge--neu">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3l6 8H6z"/><path d="M12 21l6-8H6z"/>
                  </svg>
                  {t('sentiment.perAxis.legendItems')[1]}
                </span>
                <span className="pf-legend-badge pf-legend-badge--neg">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20l9-16H3z"/></svg>
                  {t('sentiment.perAxis.legendItems')[2]}
                </span>
                <span>{t('sentiment.perAxis.legendSuffix')}</span>
              </div>

              <svg viewBox="0 0 1120 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Topic coverage cards with the real buyer questions rolling up into each sentiment axis" className="pf-svg">
                {(() => {
                  const CARD_W = 252, CARD_X = [0, 290, 580, 870], CARD_Y = 24, CARD_H = 180, CARD_BOTTOM = CARD_Y + CARD_H;
                  const PILL_W = 222, PILL_H = 78, ROW_TOP0 = CARD_BOTTOM + 60, ROW_PITCH = 98;
                  const CONTENT_H = 103, CY = CARD_Y + (CARD_H - CONTENT_H) / 2 - 19;

                  const bodies = PF_AXES.map((axis, ai) => {
                    const cardX = CARD_X[ai];
                    const anchorX = cardX + CARD_W / 2;
                    const lineBase = ai === 0 ? 0 : PF_LINE_OFFSET[ai - 1];
                    const ta = TIER_ACCENT[axis.tier];
                    return (
                      <g key={axis.name} className="pf-topic" style={{ '--pf-accent': ta.accent, '--pf-card-bg': ta.cardBg }}>
                        <rect className="pf-card" x={cardX} y={CARD_Y} width={CARD_W} height={CARD_H}/>
                        <text x={cardX + 24} y={CY + 30} className="pf-tname">{axis.name}</text>
                        <text x={cardX + 24} y={CY + 53} className="pf-tsub">{t('sentiment.perAxis.fromPrompts').replace('{n}', axis.prompts)}</text>
                        <line className="pf-divider" x1={cardX + 24} y1={CY + 72} x2={cardX + CARD_W - 24} y2={CY + 72}/>
                        <rect className="pf-status" x={cardX + 24} y={CY + 98} width="100" height="30" style={{ fill: '#fff' }}/>
                        <text x={cardX + 74} y={CY + 116} textAnchor="middle" className="pf-tlab" style={{ fill: ta.accent }}>{md.tiers[axis.tier]}</text>
                        {axis.questions.map((q, i) => {
                          const lineNum = lineBase + i + 1;
                          const rowTop = ROW_TOP0 + i * ROW_PITCH;
                          const centerY = rowTop + PILL_H / 2;
                          const railX = cardX + 6;
                          const railTurnY = CARD_BOTTOM + 30;
                          const pillX = cardX + 20;
                          const lines = wrapQuestion(q.text);
                          const markX = pillX + PILL_W - 16;
                          return (
                            <g key={i}>
                              <path
                                className={`pf-line pf-line--${lineNum}`}
                                d={`M ${anchorX} ${CARD_BOTTOM} L ${anchorX} ${railTurnY} L ${railX} ${railTurnY} L ${railX} ${centerY} L ${pillX} ${centerY}`}
                              />
                              <rect className="pf-pill" x={pillX} y={rowTop} width={PILL_W} height={PILL_H}/>
                              {lines.map((line, li) => (
                                <text key={li} x={pillX + 22} y={rowTop + 22 + li * 17} className="pf-q">
                                  {li === 0 ? '"' : ''}{line}{li === lines.length - 1 ? '"' : ''}
                                </text>
                              ))}
                              {q.sentiment === 'pos' && (
                                <text x={markX} y={centerY + 4} textAnchor="middle" fontSize="11" style={{ fill: 'var(--positive)' }}>▲</text>
                              )}
                              {q.sentiment === 'neg' && (
                                <text x={markX} y={centerY + 4} textAnchor="middle" fontSize="11" style={{ fill: 'var(--negative)' }}>▼</text>
                              )}
                              {q.sentiment === 'neutral' && (
                                <>
                                  <text x={markX} y={centerY - 2} textAnchor="middle" fontSize="7.5" style={{ fill: 'var(--warning)' }}>▲</text>
                                  <text x={markX} y={centerY + 9} textAnchor="middle" fontSize="7.5" style={{ fill: 'var(--warning)' }}>▼</text>
                                </>
                              )}
                            </g>
                          );
                        })}
                      </g>
                    );
                  });

                  const nodes = PF_AXES.map((axis, ai) => {
                    const cardX = CARD_X[ai];
                    const anchorX = cardX + CARD_W / 2;
                    const ta = TIER_ACCENT[axis.tier];
                    return (
                      <g key={`${axis.name}-nodes`} style={{ '--pf-accent': ta.accent }}>
                        <circle className="pf-node" cx={anchorX} cy={CARD_BOTTOM}/>
                        {axis.questions.map((q, i) => {
                          const rowTop = ROW_TOP0 + i * ROW_PITCH;
                          const centerY = rowTop + PILL_H / 2;
                          const pillX = cardX + 20;
                          return <circle key={i} className="pf-node" cx={pillX} cy={centerY}/>;
                        })}
                      </g>
                    );
                  });

                  return <>{bodies}{nodes}</>;
                })()}
              </svg>

              {/* <p className="pf-foot">{t('sentiment.perAxis.foot')}</p> */}
            </div>
          </div>
        </section>

        {/* ===== 02   FULL BREAKDOWN ===== */}
        <section id="angles" style={{ background: 'var(--surface-2)' }}>
          <div className="wrap">
            <div className="adv-head mid reveal">
              {(() => { const fb = t('sentiment.fullBreakdown'); return (<>
                <span className="eyebrow">{fb.eyebrow}</span>
                <h2>{fb.h2Pre} <HL>{fb.h2Hl}</HL></h2>
                <p className="lead">{fb.lead}</p>
              </>); })()}
            </div>

            <div className="lens2 reveal">
              {/* by axis */}
              <div className="slens">
                <div className="slens-hdr">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="5" r="2"/>
                      <circle cx="12" cy="12" r="2"/>
                      <circle cx="6" cy="19" r="2"/>
                      <circle cx="18" cy="19" r="2"/>
                      <line x1="12" y1="7" x2="12" y2="10"/>
                      <line x1="10.6" y1="13.3" x2="7.4" y2="17.2"/>
                      <line x1="13.4" y1="13.3" x2="16.6" y2="17.2"/>
                    </svg>
                  </div>
                  <div className="slens-hdr-text">
                    <h3>{t('sentiment.fullBreakdown.byAxis.h3')}</h3>
                    <p>{t('sentiment.fullBreakdown.byAxis.p')}</p>
                  </div>
                </div>
                <div className="slens-body">
                <div className="hdash__sb-bars">
                  <div className="hdash__sb-bar-card">
                    <div className="hdash__sb-bar-card-top">
                      <span className="hdash__sb-bar-card-name">Brand awareness</span>
                      <span className="hdash__sb-bar-card-right">
                        <span className="hdash__sb-bar-tag" style={{ color: '#16a34a', background: '#dcfce7' }}>{md.tiers['Very Strong']}</span>
                      </span>
                    </div>
                    <div className="hdash__sb-bar-row">
                      <div className="hdash__sb-bar-track2">
                        <div className="hdash__sb-bar-fill" style={{ width: '100%', background: '#16a34a' }} />
                      </div>
                      <DeltaTag value={3} />
                    </div>
                  </div>
                  <div className="hdash__sb-bar-card">
                    <div className="hdash__sb-bar-card-top">
                      <span className="hdash__sb-bar-card-name">Performance</span>
                      <span className="hdash__sb-bar-card-right">
                        <span className="hdash__sb-bar-tag" style={{ color: '#16a34a', background: '#d1fae5' }}>{md.tiers['Strong']}</span>
                      </span>
                    </div>
                    <div className="hdash__sb-bar-row">
                      <div className="hdash__sb-bar-track2">
                        <div className="hdash__sb-bar-fill" style={{ width: '80%', background: '#22c55e' }} />
                      </div>
                      <DeltaTag value={2} />
                    </div>
                  </div>
                  <div className="hdash__sb-bar-card">
                    <div className="hdash__sb-bar-card-top">
                      <span className="hdash__sb-bar-card-name">Design</span>
                      <span className="hdash__sb-bar-card-right">
                        <span className="hdash__sb-bar-tag" style={{ color: '#16a34a', background: '#d1fae5' }}>{md.tiers['Strong']}</span>
                      </span>
                    </div>
                    <div className="hdash__sb-bar-row">
                      <div className="hdash__sb-bar-track2">
                        <div className="hdash__sb-bar-fill" style={{ width: '80%', background: '#22c55e' }} />
                      </div>
                      <DeltaTag value={1} />
                    </div>
                  </div>
                  <div className="hdash__sb-bar-card">
                    <div className="hdash__sb-bar-card-top">
                      <span className="hdash__sb-bar-card-name">Durability</span>
                      <span className="hdash__sb-bar-card-right">
                        <span className="hdash__sb-bar-tag" style={{ color: '#FA7319', background: '#FFF3EB' }}>{md.priority}</span>
                        <span className="hdash__sb-bar-tag" style={{ color: '#dc2626', background: '#fee2e2' }}>{md.tiers['Weak']}</span>
                      </span>
                    </div>
                    <div className="hdash__sb-bar-row">
                      <div className="hdash__sb-bar-track2">
                        <div className="hdash__sb-bar-fill" style={{ width: '40%', background: '#f97316' }} />
                      </div>
                      <DeltaTag value={-6} />
                    </div>
                  </div>
                </div>
                </div>
                <p className="lens-note">{t('sentiment.fullBreakdown.byAxis.note')}</p>
              </div>

              {/* by model */}
              <div className="slens">
                <div className="slens-hdr">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 8v4l3 3"/>
                    </svg>
                  </div>
                  <div className="slens-hdr-text">
                    <h3>{t('sentiment.fullBreakdown.byModel.h3')}</h3>
                    <p>{t('sentiment.fullBreakdown.byModel.p')}</p>
                  </div>
                </div>
                <div className="slens-body">
                <div className="hdash__sb-bars">
                  <div className="hdash__sb-bar-card">
                    <div className="hdash__sb-bar-card-top">
                      <span className="hdash__sb-bar-card-name" style={{ alignItems: 'flex-start' }}>
                        <img src={`${import.meta.env.BASE_URL}gemini-ai-logo.png`} alt="Gemini" className="hdash__sb-bar-card-icon" style={{ marginTop: '2px' }} />
                        <span>
                          <span style={{ display: 'block', lineHeight: '1.3' }}>Gemini</span>
                          <span style={{ display: 'block', fontSize: '10px', color: '#9a9aa0', fontWeight: 400, lineHeight: '1.3' }}>gemini-3.1-pro-preview</span>
                        </span>
                      </span>
                      <span className="hdash__sb-bar-card-right">
                        <span className="hdash__sb-bar-tag" style={{ color: '#16a34a', background: '#dcfce7' }}>{md.tiers['Very Strong']}</span>
                      </span>
                    </div>
                    <div className="hdash__sb-bar-row">
                      <div className="hdash__sb-bar-track2">
                        <div className="hdash__sb-bar-fill" style={{ width: '100%', background: '#16a34a' }} />
                      </div>
                      <DeltaTag value={4} />
                    </div>
                  </div>
                  <div className="hdash__sb-bar-card">
                    <div className="hdash__sb-bar-card-top">
                      <span className="hdash__sb-bar-card-name" style={{ alignItems: 'flex-start' }}>
                        <img src={`${import.meta.env.BASE_URL}chatgpt-com-logo.png`} alt="ChatGPT" className="hdash__sb-bar-card-icon" style={{ marginTop: '2px' }} />
                        <span>
                          <span style={{ display: 'block', lineHeight: '1.3' }}>ChatGPT</span>
                          <span style={{ display: 'block', fontSize: '10px', color: '#9a9aa0', fontWeight: 400, lineHeight: '1.3' }}>gpt-4o-mini</span>
                        </span>
                      </span>
                      <span className="hdash__sb-bar-card-right">
                        <span className="hdash__sb-bar-tag" style={{ color: '#16a34a', background: '#d1fae5' }}>{md.tiers['Strong']}</span>
                      </span>
                    </div>
                    <div className="hdash__sb-bar-row">
                      <div className="hdash__sb-bar-track2">
                        <div className="hdash__sb-bar-fill" style={{ width: '80%', background: '#22c55e' }} />
                      </div>
                      <DeltaTag value={2} />
                    </div>
                  </div>
                  <div className="hdash__sb-bar-card">
                    <div className="hdash__sb-bar-card-top">
                      <span className="hdash__sb-bar-card-name" style={{ alignItems: 'flex-start' }}>
                        <img src={`${import.meta.env.BASE_URL}mistral-ai-logo.png`} alt="Mistral" className="hdash__sb-bar-card-icon" style={{ marginTop: '2px' }} />
                        <span>
                          <span style={{ display: 'block', lineHeight: '1.3' }}>Mistral</span>
                          <span style={{ display: 'block', fontSize: '10px', color: '#9a9aa0', fontWeight: 400, lineHeight: '1.3' }}>mistral-7b-instruct-v0.2</span>
                        </span>
                      </span>
                      <span className="hdash__sb-bar-card-right">
                        <span className="hdash__sb-bar-tag" style={{ color: '#16a34a', background: '#d1fae5' }}>{md.tiers['Strong']}</span>
                      </span>
                    </div>
                    <div className="hdash__sb-bar-row">
                      <div className="hdash__sb-bar-track2">
                        <div className="hdash__sb-bar-fill" style={{ width: '80%', background: '#22c55e' }} />
                      </div>
                      <DeltaTag value={1} />
                    </div>
                  </div>
                  <div className="hdash__sb-bar-card">
                    <div className="hdash__sb-bar-card-top">
                      <span className="hdash__sb-bar-card-name" style={{ alignItems: 'flex-start' }}>
                        <img src={`${import.meta.env.BASE_URL}claudeai-com-logo.png`} alt="Claude" className="hdash__sb-bar-card-icon" style={{ marginTop: '2px' }} />
                        <span>
                          <span style={{ display: 'block', lineHeight: '1.3' }}>Claude</span>
                          <span style={{ display: 'block', fontSize: '10px', color: '#9a9aa0', fontWeight: 400, lineHeight: '1.3' }}>claude-haiku-4-5-20251001</span>
                        </span>
                      </span>
                      <span className="hdash__sb-bar-card-right">
                        <span className="hdash__sb-bar-tag" style={{ color: '#FA7319', background: '#FFF3EB' }}>{md.priority}</span>
                        <span className="hdash__sb-bar-tag" style={{ color: '#dc2626', background: '#fee2e2' }}>{md.tiers['Weak']}</span>
                      </span>
                    </div>
                    <div className="hdash__sb-bar-row">
                      <div className="hdash__sb-bar-track2">
                        <div className="hdash__sb-bar-fill" style={{ width: '40%', background: '#f97316' }} />
                      </div>
                      <DeltaTag value={-6} />
                    </div>
                  </div>
                </div>
                </div>
                <p className="lens-note">{t('sentiment.fullBreakdown.byModel.note')}</p>
              </div>
            </div>

            {/* ───── AI Sentiment Trend ───── */}
            <div className="sent-trend reveal">
              <div className="st-hdr">
                <span className="st-title">{t('sentiment.fullBreakdown.trend.title')}</span>
                <div className="st-tab-grp">
                  {t('sentiment.fullBreakdown.trend.tabs').map((tab, i) => (
                    <button key={i} className={`st-tab${i === 0 ? ' st-tab--on' : ''}`}>{tab}</button>
                  ))}
                </div>
              </div>

              <div className="st-stats">
                {t('sentiment.fullBreakdown.trend.stats').map((s, i) => {
                  const tone = i === 2 ? 'warn' : 'pos';
                  const isNumeric = !isNaN(Number(s.val));
                  return (
                    <div key={i} className="st-stat">
                      <div className="st-stat-top">
                        <span className="st-stat-lbl2">{s.lbl}</span>
                        {isNumeric ? (
                          <span className={`st-stat-ring st-stat-ring--${tone}`}>{s.val}</span>
                        ) : (
                          <span className={`st-stat-pill st-stat-pill--${tone}`}>{s.val}</span>
                        )}
                      </div>
                      <div className="st-stat-bottom">
                        <span className={`st-stat-icon st-stat-icon--${tone}`}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
                            {i === 0 ? <path d="M12 19V5M5 12l7-7 7 7"/> : <path d="M5 12h14M12 5l7 7-7 7"/>}
                          </svg>
                        </span>
                        <span className={`st-stat-sub${i === 0 ? ' st-sub-pos' : i === 2 ? ' st-sub-warn' : ''}`}>{s.sub}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="st-models">
                <div className="st-model-tags">
                  {t('sentiment.fullBreakdown.trend.legend').map((lbl, i) => (
                    <span key={i} className={`st-mtag${i === 1 ? ' st-mtag--hi' : ''}`}>
                      <span className="st-mdot" style={{ borderColor: i === 0 ? '#16a34a' : '#2563eb' }}/>{lbl}
                    </span>
                  ))}
                </div>
                <span className="st-mon-note">{t('sentiment.fullBreakdown.trend.monNote')}</span>
              </div>

              <div className="st-chart-wrap">
                <svg viewBox="0 0 830 270" className="st-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16a34a" stopOpacity="0.13"/>
                      <stop offset="100%" stopColor="#16a34a" stopOpacity="0.01"/>
                    </linearGradient>
                    <linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.08"/>
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0.01"/>
                    </linearGradient>
                  </defs>

                  {/* 5 tier lines only   no bottom line */}
                  <line x1="110" y1="20"  x2="760" y2="20"  stroke="#e5e7eb" strokeWidth="1"/>
                  <line x1="110" y1="68"  x2="760" y2="68"  stroke="#e5e7eb" strokeWidth="1"/>
                  <line x1="110" y1="116" x2="760" y2="116" stroke="#e5e7eb" strokeWidth="1"/>
                  <line x1="110" y1="164" x2="760" y2="164" stroke="#e5e7eb" strokeWidth="1"/>
                  <line x1="110" y1="212" x2="760" y2="212" stroke="#e5e7eb" strokeWidth="1"/>

                  {/* Tier labels */}
                  <text x="106" y="24"  textAnchor="end" fontSize="10.5" fontWeight="700" fill="#15803d" fontFamily="Manrope,sans-serif">{md.tiers['Very Strong']}</text>
                  <text x="106" y="72"  textAnchor="end" fontSize="10.5" fontWeight="700" fill="#22c55e" fontFamily="Manrope,sans-serif">{md.tiers['Strong']}</text>
                  <text x="106" y="120" textAnchor="end" fontSize="10.5" fontWeight="700" fill="#eab308" fontFamily="Manrope,sans-serif">{md.tiers['Moderate']}</text>
                  <text x="106" y="168" textAnchor="end" fontSize="10.5" fontWeight="700" fill="#f97316" fontFamily="Manrope,sans-serif">{md.tiers['Weak']}</text>
                  <text x="106" y="216" textAnchor="end" fontSize="10.5" fontWeight="700" fill="#ef4444" fontFamily="Manrope,sans-serif">{md.tiers['Very Weak']}</text>

                  {/* X-axis labels   Apr 27, May 4, May 11, May 18, May 25, Jun 1 */}
                  <text x="110" y="250" textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="Chivo,sans-serif">Apr 27</text>
                  <text x="240" y="250" textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="Chivo,sans-serif">May 4</text>
                  <text x="370" y="250" textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="Chivo,sans-serif">May 11</text>
                  <text x="500" y="250" textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="Chivo,sans-serif">May 18</text>
                  <text x="630" y="250" textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="Chivo,sans-serif">May 25</text>
                  <text x="760" y="250" textAnchor="end"    fontSize="10" fill="#9ca3af" fontFamily="Chivo,sans-serif">Jun 1</text>

                  {/* Green fill below overall line */}
                  {/* Data: [75,100,75,100,75,75] → Strong,VStrong,Strong,VStrong,Strong,Strong */}
                  {/* x positions: 110, 240, 370, 500, 630, 760 */}
                  {/* y positions: Strong=68, Very Strong=20 */}
                  <path
                    d="M110,68 C175,68 175,20 240,20 C305,20 305,68 370,68 C435,68 435,20 500,20 C565,20 565,68 630,68 C695,68 695,68 760,68
                      L760,240 L110,240 Z"
                    fill="url(#greenFill)"
                  />

                  {/* Blue fill under slipping line */}
                  <path
                    d="M110,68 C200,68 260,116 380,116 C480,116 560,164 686,164 C710,164 735,164 760,164
                      L760,240 L110,240 Z"
                    fill="url(#blueFill)"
                  />

                  {/* Slipping axis   smooth S-curve Strong → Moderate → Weak */}
                  <path
                    d="M110,68 C200,68 260,116 380,116 C480,116 560,164 686,164 C710,164 735,164 760,164"
                    stroke="#2563eb" strokeWidth="1.2" strokeDasharray="6,3" strokeLinecap="round"
                  />

                  {/* Overall sentiment   [75,100,75,100,75,75] Strong→VStrong→Strong→VStrong→Strong→Strong */}
                  <path
                    d="M110,68 C175,68 175,20 240,20 C305,20 305,68 370,68 C435,68 435,20 500,20 C565,20 565,68 630,68 C695,68 695,68 760,68"
                    stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round"
                  />

                  {/* Flagged open-ring on slipping line */}
                  <circle cx="686" cy="164" r="9" fill="rgba(255,255,255,0.8)" stroke="#2563eb" strokeWidth="2"/>
                  <circle cx="686" cy="164" r="3" fill="#2563eb"/>

                  {/* Connector line up to bubble */}
                  <line x1="686" y1="155" x2="686" y2="138" stroke="#2563eb" strokeDasharray="3,2" strokeWidth="1.5"/>

                  {/* Annotation bubble   small white pill */}
                  <rect x="615" y="120" width="135" height="22" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1"/>
                  <circle cx="625" cy="131" r="3" fill="#2563eb"/>
                  <text x="635" y="135" fontSize="9.5" fill="#1e3a8a" fontFamily="Manrope,sans-serif" fontWeight="700">{t('sentiment.fullBreakdown.trend.flaggedEarly')}</text>

                  {/* End dots   green ends at Strong (y=68), blue ends at Weak (y=164) */}
                  <circle cx="760" cy="68"  r="5" fill="#fff" stroke="#16a34a" strokeWidth="2.5"/>
                  <circle cx="760" cy="164" r="5" fill="#fff" stroke="#2563eb" strokeWidth="2.5"/>

                  {/* End score badges */}
                  <rect x="770" y="61"  width="45" height="17" rx="8.5" fill="rgb(209, 250, 229)"/>
                  <text x="792" y="73"  textAnchor="middle" fontSize="9.5" fill="rgb(22, 163, 74)" fontFamily="Manrope,sans-serif" fontWeight="700">{md.tiers['Strong']}</text>
                  <rect x="770" y="157" width="45" height="17" rx="8.5" fill="rgb(255, 247, 237)"/>
                  <text x="792" y="169" textAnchor="middle" fontSize="9.5" fill="rgb(234, 88, 12)" fontFamily="Manrope,sans-serif" fontWeight="700">{md.tiers['Weak']}</text>
                </svg>
              </div>

              <div className="st-foot" dangerouslySetInnerHTML={{ __html: t('sentiment.fullBreakdown.trend.foot') }} />
            </div>
          </div>
        </section>

        {/* ===== 03   COMPETITIVE ===== */}
        <section id="compare">
          <div className="wrap">
            <div className="adv-head mid reveal">
              {(() => { const comp = t('sentiment.competitive'); return (<>
                <span className="eyebrow">{comp.eyebrow}</span>
                <h2>{comp.h2Pre} <HL>{comp.h2Hl}</HL></h2>
                <p className="lead">{comp.lead}</p>
              </>); })()}
            </div>

            <div className="cmpx reveal">
              <div className="cmpx-head">
                {t('sentiment.competitive.tableHeaders').map((h, i) => (
                  <span key={i}>{h}</span>
                ))}
              </div>
              {COMPETITORS.map((c) => (
                <div key={c.name} className={`cmpx-row${c.you ? ' you' : ''}`}>
                  <div className="brand">
                    <span className="bd" style={{ background: c.bd }} />
                    {c.logo && <img src={c.logo} alt={c.name} className="cmpx-brand-logo" />}
                    {c.name}
                    {c.you && <span className="yt">{t('sentiment.competitive.you')}</span>}
                  </div>
                  {[c.awareness, c.design, c.durability, c.performance].map((cell, i) => {
                    const ts = TIER_STYLE[cell.label];
                    return (
                      <div key={i} className="cell">
                        <span
                          className={`pill-tag${!ts ? ' pt-neu' : ''}`}
                          style={ts ? { color: ts.color, background: ts.bg } : undefined}
                        >
                          {md.tiers[cell.label] || cell.label}
                        </span>
                      </div>
                    );
                  })}
                  <div className="cell cmpx-overall">
                    <div className="cmpx-bar-track">
                      <div className="cmpx-bar-fill" style={{ width: `${c.overall}%`, background: TIER_STYLE[c.overallLabel]?.bar }} />
                    </div>
                    <span className="cmpx-overall-label" style={{ color: TIER_STYLE[c.overallLabel]?.color }}>{md.tiers[c.overallLabel]}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="shotline reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span dangerouslySetInnerHTML={{ __html: t('sentiment.competitive.disclaimer') }} />
            </div>
          </div>
        </section>

        {/* ===== 04   IVY AGENT ===== */}
        <section id="ivy">
          <div className="wrap">
            <div className="dark reveal">
              <div className="inner">
                <div className="nora-grid">
                  {/* left: copy */}
                  <div className="copy">
                    <div className="agent-pill">
                      <span className="sp">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/>
                        </svg>
                      </span>
                      {t('sentiment.ivy.agentPill')}
                    </div>
                    <h2>{t('sentiment.ivy.h2')}</h2>
                    <p className="lead" style={{ color: 'rgba(255,255,255,.75)', margin: '18px 0 28px' }}>
                      {t('sentiment.ivy.lead')}
                    </p>
                    <ul className="agent-pts">
                      {t('sentiment.ivy.points').map((pt, i) => (
                        <li key={i}>
                          <span className="ic">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              {i === 0 && <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></>}
                              {i === 1 && <path d="M13 2 3 14h9l-1 8 10-12h-9z"/>}
                              {i === 2 && <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>}
                            </svg>
                          </span>
                          <span>
                            <span className="tt">{pt.tt}</span>
                            <span className="dd">{pt.dd}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* right: chat mock */}
                  <div className="shot">
                    <span className="tab">{t('sentiment.ivy.chatId').split('·')[0].trim()}</span>
                    <div className="chat">
                      <div className="chat-id">
                        <span className="av">I</span> {t('sentiment.ivy.chatId')}
                      </div>
                      <div className="bub user">Why is my Durability sentiment slipping?</div>
                      <div className="bub bot">
                        On durability questions, <b>Gemini</b> now puts Hoka and Brooks first and mentions Nike later   dragging Durability down <span style={{ color: '#f87171', fontWeight: 700 }}>11 points in 30 days</span>. Every other axis is stable.
                      </div>
                      <div className="bub user">What do I do?</div>
                    </div>
                    <div className="plan">
                      <div className="plan-h">
                        <span className="av" style={{ width: '20px', height: '20px', fontSize: '11px' }}>I</span>
                        {t('sentiment.ivy.planTitle')}
                      </div>
                      <div className="plan-body">
                        <div className="plan-item">
                          <span className="rk">1</span>
                          <span className="t">Publish durability test results and materials data</span>
                          <span className="impact hi">+9 pts</span>
                        </div>
                        <div className="plan-item">
                          <span className="rk">2</span>
                          <span className="t">Add a long-term wear FAQ with athlete testimonials</span>
                          <span className="impact hi">+5 pts</span>
                        </div>
                        <div className="plan-item">
                          <span className="rk">3</span>
                          <span className="t">Get cited on 2 running-gear review sites</span>
                          <span className="impact md">+3 pts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaBand
          heading={t('sentiment.cta.heading')}
          lead={t('sentiment.cta.lead')}
          primaryCta={t('sentiment.cta.primaryCta')}
          secondaryCta={t('sentiment.cta.secondaryCta')}
          note={t('sentiment.cta.note')}
        />
      </main>
      <Footer />
    </div>
  );
}
