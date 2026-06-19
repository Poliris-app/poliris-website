import { useState, useEffect, useMemo } from 'react';
import '../sentiment.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';
import { useLang } from '../contexts/LangContext';

const HL = ({ children }) => <span className="hl">{children}</span>;

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
  {
    num: '05',
    href: '#evidence',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="9" y1="13" x2="15" y2="13"/>
        <line x1="9" y1="17" x2="12" y2="17"/>
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
    overall: 80, overallLabel: 'Strong',
  },
  {
    name: 'Nike',     you: true,  bd: '#111827', logo: `${import.meta.env.BASE_URL}nike-com-logo.png`,
    awareness: { label: 'Very Strong', cls: 'pt-pos' },
    design:    { label: 'Strong',      cls: 'pt-pos' },
    durability:{ label: 'Weak',        cls: 'pt-neg' },
    performance:{ label: 'Strong',     cls: 'pt-pos' },
    overall: 80, overallLabel: 'Strong',
  },
  {
    name: 'On',       you: false, bd: '#16a34a', logo: `${import.meta.env.BASE_URL}on-com-logo.png`,
    awareness: { label: 'Strong',      cls: 'pt-pos' },
    design:    { label: 'Strong',      cls: 'pt-pos' },
    durability:{ label: 'Strong',      cls: 'pt-pos' },
    performance:{ label: 'Strong',     cls: 'pt-pos' },
    overall: 80, overallLabel: 'Strong',
  },
  {
    name: 'Hoka',     you: false, bd: '#ea580c', logo: `${import.meta.env.BASE_URL}hoka-com-logo.png`,
    awareness: { label: 'Moderate',    cls: 'pt-warn' },
    design:    { label: 'Moderate',    cls: 'pt-warn' },
    durability:{ label: 'Very Strong', cls: 'pt-pos' },
    performance:{ label: 'Strong',     cls: 'pt-pos' },
    overall: 80, overallLabel: 'Strong',
  },
  {
    name: 'Brooks',   you: false, bd: '#7c3aed', logo: `${import.meta.env.BASE_URL}brooksrunning-com-logo.png`,
    awareness: { label: ' ',           cls: 'pt-neu' },
    design:    { label: ' ',           cls: 'pt-neu' },
    durability:{ label: 'Very Strong', cls: 'pt-pos' },
    performance:{ label: 'Strong',     cls: 'pt-pos' },
    overall: 80, overallLabel: 'Strong',
  },
  {
    name: 'New Balance',   you: false, bd: 'rgb(28, 229, 206)', logo: `${import.meta.env.BASE_URL}newbalance-com-logo.png`,
    awareness: { label: 'Very Strong',           cls: 'pt-neu' },
    design:    { label: 'Strong',           cls: 'pt-neu' },
    durability:{ label: 'Strong', cls: 'pt-pos' },
    performance:{ label: 'Moderate',     cls: 'pt-pos' },
    overall: 80, overallLabel: 'Strong',
  },
];

export default function SentimentPage() {
  const { t } = useLang();
  const md = t('sentiment.mockDash');
  const [evxOpen, setEvxOpen] = useState(true);
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
              <div className="app-bar">
                <span className="d" /><span className="d" /><span className="d" />
                <span className="url">app.poliris.io . Sentiment</span>
              </div>
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
                        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
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
                <span className="tg pos">▲ {t('sentiment.perAxis.legendItems')[0]}</span>
                <span className="tg neu"><span className="tg-stacked"><span>▲</span><span>▼</span></span> {t('sentiment.perAxis.legendItems')[1]}</span>
                <span className="tg neg">▼ {t('sentiment.perAxis.legendItems')[2]}</span>
                <span>  {t('sentiment.perAxis.legendSuffix')}</span>
              </div>

              <svg viewBox="0 0 980 670" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AI answers mapped to sentiment per axis" className="pf-svg">
                <defs>
                  {/* Shared Q1: Brand awareness (purple) + Design (orange) */}
                  <linearGradient id="bar-ba-d" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="50%" stopColor="#7c5cbf"/>
                    <stop offset="50%" stopColor="#d98a2b"/>
                  </linearGradient>
                  {/* Shared Q5: Durability (teal) + Performance (navy) */}
                  <linearGradient id="bar-dp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="50%" stopColor="#0d7963"/>
                    <stop offset="50%" stopColor="#1e3893"/>
                  </linearGradient>
                </defs>

                {/* Column headers */}
                <text x="36" y="46" className="pf-collbl">{t('sentiment.perAxis.hundredsLabel')}</text>
                <text x="950" y="46" textAnchor="end" className="pf-collbl">{t('sentiment.perAxis.onePerAxis')}</text>

                {/* Q1 → Brand awareness */}
                <path className="pf-line pf-line--1" d="M 440 96  C 526 96  524 129 610 129" fill="none" stroke="#7c5cbf" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Q1 → Design (shared) */}
                <path className="pf-line pf-line--2" d="M 440 96  C 526 96  524 259 610 259" fill="none" stroke="#d98a2b" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Q2 → Design */}
                <path className="pf-line pf-line--3" d="M 440 174 C 526 174 524 259 610 259" fill="none" stroke="#d98a2b" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Q3 → Design */}
                <path className="pf-line pf-line--4" d="M 440 252 C 526 252 524 259 610 259" fill="none" stroke="#d98a2b" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Q4 → Design */}
                <path className="pf-line pf-line--5" d="M 440 330 C 526 330 524 259 610 259" fill="none" stroke="#d98a2b" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Q5 → Durability (shared) */}
                <path className="pf-line pf-line--6" d="M 440 408 C 526 408 524 439 610 439" fill="none" stroke="#0d7963" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Q5 → Performance (shared) */}
                <path className="pf-line pf-line--7" d="M 440 408 C 526 408 524 569 610 569" fill="none" stroke="#1e3893" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Q6 → Performance */}
                <path className="pf-line pf-line--8" d="M 440 486 C 526 486 524 569 610 569" fill="none" stroke="#1e3893" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Q7 → Performance */}
                <path className="pf-line pf-line--9" d="M 440 564 C 526 564 524 569 610 569" fill="none" stroke="#1e3893" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>

                {/* Q1: Brand awareness + Design (shared   gradient accent bar) */}
                <rect x="30" y="70"  width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="80"  width="5" height="32" rx="2.5" fill="url(#bar-ba-d)"/>
                <text x="54" y="101" className="pf-q">"Which trendy sneakers dominate street style?"</text>
                <rect x="412" y="80" width="26" height="30" fill="#fff"/>
                <text x="428" y="101" textAnchor="end" fontSize="11" fill="#16a34a">▲</text>
                {/* Q2: Design */}
                <rect x="30" y="148" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="158" width="5" height="32" rx="2.5" fill="#d98a2b"/>
                <text x="54" y="179" className="pf-q">"Best affordable and reliable everyday sneakers?"</text>
                <rect x="412" y="158" width="26" height="30" fill="#fff"/>
                <text x="428" y="179" textAnchor="end" fontSize="11" fill="#16a34a">▲</text>
                {/* Q3: Design */}
                <rect x="30" y="226" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="236" width="5" height="32" rx="2.5" fill="#d98a2b"/>
                <text x="54" y="257" className="pf-q">"Best value-for-money sneakers for commuting?"</text>
                <rect x="412" y="236" width="26" height="30" fill="#fff"/>
                <text x="428" y="250" textAnchor="end" fontSize="7.5" fill="#ca8a04">▲</text>
                <text x="428" y="259" textAnchor="end" fontSize="7.5" fill="#ca8a04">▼</text>
                {/* Q4: Design */}
                <rect x="30" y="304" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="314" width="5" height="32" rx="2.5" fill="#d98a2b"/>
                <text x="54" y="335" className="pf-q">"Most comfortable shoes with arch support?"</text>
                <rect x="412" y="314" width="26" height="30" fill="#fff"/>
                <text x="428" y="335" textAnchor="end" fontSize="11" fill="#16a34a">▲</text>
                {/* Q5: Durability + Performance (shared   gradient accent bar) */}
                <rect x="30" y="382" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="392" width="5" height="32" rx="2.5" fill="url(#bar-dp)"/>
                <text x="54" y="413" className="pf-q">"High-performance running shoes for trails?"</text>
                <rect x="412" y="392" width="26" height="30" fill="#fff"/>
                <text x="428" y="406" textAnchor="end" fontSize="7.5" fill="#ca8a04">▲</text>
                <text x="428" y="415" textAnchor="end" fontSize="7.5" fill="#ca8a04">▼</text>
                {/* Q6: Performance */}
                <rect x="30" y="460" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="470" width="5" height="32" rx="2.5" fill="#1e3893"/>
                <text x="54" y="491" className="pf-q">"Lightweight gym shoes for maximum stability?"</text>
                <rect x="412" y="470" width="26" height="30" fill="#fff"/>
                <text x="428" y="491" textAnchor="end" fontSize="11" fill="#16a34a">▲</text>
                {/* Q7: Performance */}
                <rect x="30" y="538" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="548" width="5" height="32" rx="2.5" fill="#1e3893"/>
                <text x="54" y="569" className="pf-q">"Best cross-training shoes for intense workouts?"</text>
                <rect x="412" y="548" width="26" height="30" fill="#fff"/>
                <text x="428" y="569" textAnchor="end" fontSize="11" fill="#16a34a">▲</text>

                {/* Axis card: Brand awareness (purple)   y=70, center=129 */}
                <rect x="610" y="70"  width="340" height="118" rx="13" fill="#f3eefb" stroke="#7c5cbf" strokeOpacity=".30"/>
                <rect x="610" y="84"  width="5" height="90" rx="2.5" fill="#7c5cbf"/>
                <text x="636" y="118" className="pf-tname">Brand awareness</text>
                <text x="636" y="144" className="pf-tsub">{t('sentiment.perAxis.fromPrompts').replace('{n}', 18)}</text>
                <rect x="836" y="140" width="94" height="24" rx="12" fill="#dcfce7"/>
                <text x="883" y="156" textAnchor="middle" className="pf-tlab" fill="#16a34a">{md.tiers['Very Strong']}</text>
                {/* Axis card: Design (orange)   y=200, center=259 */}
                <rect x="610" y="200" width="340" height="118" rx="13" fill="#fbf3e6" stroke="#d98a2b" strokeOpacity=".30"/>
                <rect x="610" y="214" width="5" height="90" rx="2.5" fill="#d98a2b"/>
                <text x="636" y="248" className="pf-tname">Design</text>
                <text x="636" y="274" className="pf-tsub">{t('sentiment.perAxis.fromPrompts').replace('{n}', 20)}</text>
                <rect x="856" y="270" width="70" height="24" rx="12" fill="#dcfce7"/>
                <text x="891" y="286" textAnchor="middle" className="pf-tlab" fill="#16a34a">{md.tiers['Strong']}</text>
                {/* Axis card: Durability (teal)   y=380, center=439 */}
                <rect x="610" y="380" width="340" height="118" rx="13" fill="#e6f7f3" stroke="#0d7963" strokeOpacity=".30"/>
                <rect x="610" y="394" width="5" height="90" rx="2.5" fill="#0d7963"/>
                <text x="636" y="428" className="pf-tname">Durability</text>
                <text x="636" y="454" className="pf-tsub">{t('sentiment.perAxis.fromPrompts').replace('{n}', 15)}</text>
                <rect x="856" y="450" width="70" height="24" rx="12" fill="#fee2e2"/>
                <text x="891" y="466" textAnchor="middle" className="pf-tlab" fill="#dc2626">{md.tiers['Weak']}</text>
                {/* Axis card: Performance (navy)   y=510, center=569 */}
                <rect x="610" y="510" width="340" height="118" rx="13" fill="#eef1fb" stroke="#1e3893" strokeOpacity=".30"/>
                <rect x="610" y="524" width="5" height="90" rx="2.5" fill="#1e3893"/>
                <text x="636" y="558" className="pf-tname">Performance</text>
                <text x="636" y="584" className="pf-tsub">{t('sentiment.perAxis.fromPrompts').replace('{n}', 22)}</text>
                <rect x="856" y="580" width="70" height="24" rx="12" fill="#dcfce7"/>
                <text x="891" y="596" textAnchor="middle" className="pf-tlab" fill="#16a34a">{md.tiers['Strong']}</text>
              </svg>

              <p className="pf-foot">{t('sentiment.perAxis.foot')}</p>
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
                      <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
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
                    <div className="hdash__sb-bar-track2">
                      <div className="hdash__sb-bar-fill" style={{ width: '100%', background: '#16a34a' }} />
                    </div>
                  </div>
                  <div className="hdash__sb-bar-card">
                    <div className="hdash__sb-bar-card-top">
                      <span className="hdash__sb-bar-card-name">Performance</span>
                      <span className="hdash__sb-bar-card-right">
                        <span className="hdash__sb-bar-tag" style={{ color: '#16a34a', background: '#d1fae5' }}>{md.tiers['Strong']}</span>
                      </span>
                    </div>
                    <div className="hdash__sb-bar-track2">
                      <div className="hdash__sb-bar-fill" style={{ width: '80%', background: '#22c55e' }} />
                    </div>
                  </div>
                  <div className="hdash__sb-bar-card">
                    <div className="hdash__sb-bar-card-top">
                      <span className="hdash__sb-bar-card-name">Design</span>
                      <span className="hdash__sb-bar-card-right">
                        <span className="hdash__sb-bar-tag" style={{ color: '#16a34a', background: '#d1fae5' }}>{md.tiers['Strong']}</span>
                      </span>
                    </div>
                    <div className="hdash__sb-bar-track2">
                      <div className="hdash__sb-bar-fill" style={{ width: '80%', background: '#22c55e' }} />
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
                    <div className="hdash__sb-bar-track2">
                      <div className="hdash__sb-bar-fill" style={{ width: '40%', background: '#f97316' }} />
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
                    <div className="hdash__sb-bar-track2">
                      <div className="hdash__sb-bar-fill" style={{ width: '100%', background: '#16a34a' }} />
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
                    <div className="hdash__sb-bar-track2">
                      <div className="hdash__sb-bar-fill" style={{ width: '80%', background: '#22c55e' }} />
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
                    <div className="hdash__sb-bar-track2">
                      <div className="hdash__sb-bar-fill" style={{ width: '80%', background: '#22c55e' }} />
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
                    <div className="hdash__sb-bar-track2">
                      <div className="hdash__sb-bar-fill" style={{ width: '40%', background: '#f97316' }} />
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
                {t('sentiment.fullBreakdown.trend.stats').map((s, i) => (
                  <div key={i} className="st-stat">
                    <div className="st-stat-lbl">{s.lbl}</div>
                    <div className="st-stat-val">{s.val}</div>
                    <div className={`st-stat-sub${i === 0 ? ' st-sub-pos' : i === 2 ? ' st-sub-warn' : ''}`}>{s.sub}</div>
                  </div>
                ))}
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
                    stroke="#2563eb" strokeWidth="1.5" strokeDasharray="6,3" strokeLinecap="round"
                  />

                  {/* Overall sentiment   [75,100,75,100,75,75] Strong→VStrong→Strong→VStrong→Strong→Strong */}
                  <path
                    d="M110,68 C175,68 175,20 240,20 C305,20 305,68 370,68 C435,68 435,20 500,20 C565,20 565,68 630,68 C695,68 695,68 760,68"
                    stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"
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
                  <circle cx="760" cy="68"  r="5" fill="#16a34a" stroke="#fff" strokeWidth="2"/>
                  <circle cx="760" cy="164" r="5" fill="#2563eb" stroke="#fff" strokeWidth="2"/>

                  {/* End score badges */}
                  <rect x="770" y="61"  width="45" height="17" rx="8.5" fill="rgb(209, 250, 229)"/>
                  <text x="792" y="73"  textAnchor="middle" fontSize="9.5" fill="rgb(22, 163, 74)" fontFamily="Manrope,sans-serif" fontWeight="700">{md.tiers['Strong']}</text>
                  <rect x="770" y="157" width="45" height="17" rx="8.5" fill="rgb(255, 247, 237)"/>
                  <text x="792" y="169" textAnchor="middle" fontSize="9.5" fill="rgb(234, 88, 12)" fontFamily="Manrope,sans-serif" fontWeight="700">{md.tiers['Weak']}</text>
                </svg>
              </div>

              <div className="st-models">
                <div className="st-model-tags">
                  {t('sentiment.fullBreakdown.trend.legend').map((lbl, i) => (
                    <span key={i} className={`st-mtag${i === 1 ? ' st-mtag--hi' : ''}`}>
                      <span className="st-mdot" style={{ background: i === 0 ? '#16a34a' : '#2563eb' }}/>{lbl}
                    </span>
                  ))}
                </div>
                <span className="st-mon-note">{t('sentiment.fullBreakdown.trend.monNote')}</span>
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
                      <div className="cmpx-bar-fill" style={{ width: `${c.overall}%` }} />
                    </div>
                    <span className="cmpx-overall-label">{md.tiers[c.overallLabel]}</span>
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

        {/* ===== 05   EVIDENCE ===== */}
        <section id="evidence" style={{ background: 'var(--surface-2)' }}>
          <div className="wrap">
            <div className="adv-head mid reveal">
              {(() => { const ev = t('sentiment.evidence'); return (<>
                <span className="eyebrow">{ev.eyebrow}</span>
                <h2>{ev.h2Pre} <HL>{ev.h2Hl}</HL></h2>
                <p className="lead">{ev.lead}</p>
              </>); })()}
            </div>

            <div className="ev reveal">
              <div className={`evx${evxOpen ? ' open' : ''}`}>
                <button
                  className="evx-head"
                  type="button"
                  aria-expanded={evxOpen}
                  onClick={() => setEvxOpen((v) => !v)}
                >
                  <span className="evx-q">
                    <span className="evc-asklab">
                      <img src={`${import.meta.env.BASE_URL}claudeai-com-logo.png`} alt="" style={{ width: '13px', height: '13px', objectFit: 'contain' }} />
                      Claude
                    </span>
                    "Where can I find affordable and reliable everyday sneakers?"
                  </span>
                  <span className="evx-right">
                    <span className="sig pos">+2 pts Brand awareness</span>
                    <span className="chev">›</span>
                  </span>
                </button>

                <div className="evx-body">
                  <div className="evx-bin">
                    <div className="evc-anslab">
                      {t('sentiment.evidence.aiAnswer')}
                      <span className="ln" />
                      <span className="evc-srcchip">
                        <img src={`${import.meta.env.BASE_URL}claudeai-com-logo.png`} alt="" style={{ width: '13px', height: '13px', objectFit: 'contain' }} />
                        Claude
                      </span>
                    </div>

                    <div className="evc-ans">
                      <span className="ell">…</span>
                      {' '}For everyday sneakers, <span className="hl-brand">Nike</span> is a go-to for{' '}
                      <span className="hl-pos">iconic style and wide availability</span>, with the Air Force 1 remaining{' '}
                      <span className="hl-pos">consistently popular across budgets</span>. That said, some reviewers note{' '}
                      <span className="hl-neg">recent models show reduced sole durability</span> versus older releases. Overall,{' '}
                      <span className="hl-pos">Nike offers solid value in the $70–$120 range</span>.{' '}
                      <span className="ell">…</span>
                    </div>

                    <div className="evx-map">
                      <div className="evx-maplab">{t('sentiment.evidence.howWeScored')}</div>
                      <div className="evx-words">
                        <span className="sig pos">Brand awareness ↑</span>
                        <span className="sig pos">Design ↑</span>
                        <span className="sig neg">Durability ↓</span>
                        <span className="sig pos">Value ↑</span>
                      </div>
                      <div className="evx-flow">
                        <div className="dims">
                          <span className="dim">Brand awareness</span>
                          <span className="dim">Design</span>
                          <span className="dim">Value</span>
                        </div>
                        <span className="evx-eq">→</span>
                        <span className="sig pos">+positive signals</span>
                        <span className="evx-eq">+</span>
                        <div className="dims">
                          <span className="dim">Durability</span>
                        </div>
                        <span className="evx-eq">→</span>
                        <span className="sig neg">−negative signal</span>
                        <span className="evx-on">= net score for this answer</span>
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
