import { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';

const HL = ({ children }) => <span className="hl">{children}</span>;

/* ── Sentiment chart data ───────────────────────────────────── */
const SENT_DATA     = [75, 50, 75, 100, 100, 75, 75, 100, 100, 75];
const SENT_X_LABELS = ['Apr 24', 'Apr 25', 'Apr 26', 'Apr 27', 'Apr 28', 'May 1', 'May 3', 'May 7', 'May 10', 'May 15'];
const CVW = 540, CVH = 160, CPT = 8, CPR = 8, CPB = 20, CPL = 70, CN = 10;
const CHART_TIERS = [
  { v: 100, label: 'Very Strong', color: '#16a34a' },
  { v: 75,  label: 'Strong',      color: '#16a34a' },
  { v: 50,  label: 'Moderate',    color: '#ca8a04' },
  { v: 25,  label: 'Weak',        color: '#ea580c' },
  { v: 0,   label: 'Very Weak',   color: '#dc2626' },
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
  'Very Strong': { color: '#16a34a', bg: '#dcfce7', bar: '#16a34a' },
  'Strong':      { color: '#16a34a', bg: '#d1fae5', bar: '#22c55e' },
  'Moderate':    { color: '#ca8a04', bg: '#fef9c3', bar: '#eab308' },
  'Weak':        { color: '#ea580c', bg: '#fff7ed', bar: '#f97316' },
  'Very Weak':   { color: '#dc2626', bg: '#fee2e2', bar: '#ef4444' },
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
  const [activeTab, setActiveTab] = useState('Axes');
  const items = useMemo(
    () => activeTab === 'Axes' ? SENT_AXES : SENT_MODELS,
    [activeTab]
  );
  const overall = TIER_STYLE[SENT_OVERALL];

  return (
    <div className="hdash__sb-wrap">
      <div className="hdash__sb-hdr2">
        <div>
          <p className="hdash__sb-title2">Sentiment Breakdown</p>
          <p className="hdash__sb-sub2">Quick read of what lifts or limits sentiment</p>
        </div>
        <span className="hdash__sb-score-badge" style={{ color: overall.color, background: overall.bg }}>
          {SENT_OVERALL}
        </span>
      </div>
      <div className="hdash__sb-tabs-row">
        <div className="hdash__sb-tab-group2">
          {['Axes', 'AI Models'].map(tab => (
            <button key={tab}
              className={`hdash__sb-tab2${activeTab === tab ? ' hdash__sb-tab2--on' : ''}`}
              onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="hdash__sb-bars">
        {items.map(item => {
          const ts = TIER_STYLE[item.tier];
          return (
            <div key={item.id} className="hdash__sb-bar-card">
              <div className="hdash__sb-bar-card-top">
                <span className="hdash__sb-bar-card-name">
                  {item.icon && <img src={item.icon} alt={item.name} className="hdash__sb-bar-card-icon" />}
                  {item.name}
                </span>
                <span className="hdash__sb-bar-card-right">
                  {item.isPriority && (
                    <span className="hdash__sb-bar-tag" style={{ color: '#FA7319', background: '#FFF3EB' }}>Priority</span>
                  )}
                  <span className="hdash__sb-bar-tag" style={{ color: ts.color, background: ts.bg }}>{item.tier}</span>
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
    title: 'Per-axis sentiment',
    desc: 'Score every axis your buyers judge   not just one blended number.',
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
    title: 'Full breakdown',
    desc: 'Drill into sentiment by axis and by model, with over-time tracking.',
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
    title: 'Competitive',
    desc: 'See how AI ranks your brand against every competitor, axis by axis.',
  },
  {
    num: '04',
    href: '#ivy',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'IVY agent',
    desc: 'AI that reads your scores, finds the gaps, and builds the fix plan.',
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
    title: 'Evidence',
    desc: 'See the exact AI words behind every score   annotated and traceable.',
  },
];

/* ── competitor data ─────────────────────────────────────────── */
const COMPETITORS = [
  {
    name: 'Gleamer',
    you: true,
    bd: '#1e3893',
    compliance: { label: 'Moderate', cls: 'pt-warn' },
    expertise:  { label: 'Strong',   cls: 'pt-pos'  },
    innovation: { label: 'V. strong',cls: 'pt-pos', lead: true },
  },
  {
    name: 'Raidium',
    bd: '#1f8a5b',
    compliance: { label: 'V. strong',cls: 'pt-pos', lead: true },
    expertise:  { label: 'Strong',   cls: 'pt-pos'  },
    innovation: { label: 'Moderate', cls: 'pt-warn' },
  },
  {
    name: 'Pixyl',
    bd: '#5e74c4',
    compliance: { label: 'Strong',   cls: 'pt-pos'  },
    expertise:  { label: 'Moderate', cls: 'pt-warn' },
    innovation: { label: 'Strong',   cls: 'pt-pos'  },
  },
  {
    name: 'Therapixel',
    bd: '#d98a2b',
    compliance: { label: 'Strong',   cls: 'pt-pos'  },
    expertise:  { label: 'Strong',   cls: 'pt-pos'  },
    innovation: { label: 'Weak',     cls: 'pt-neg'  },
  },
];

export default function SentimentPage() {
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
      <Navbar />
      <main>
        {/* ===== HERO ===== */}
        <Hero
          eyebrow="Poliris Sentiment"
          title={<>Understand <HL>how</HL> AI describes your brand.</>}
          lead="Showing up in AI answers isn't enough   what matters is how you show up. Poliris scores the way AI talks about you, on every axis your market buys on, across every model, against every competitor."
          primaryCta="Get your free trial"
          secondaryCta="Book a demo"
          note="14 days free · No credit card required"
          showDashboard={false}
        />

        {/* ===== DASHBOARD ===== */}
        <section style={{ paddingTop: '72px' }}>
          <div className="wrap">
            <div className="sec-head mid reveal" style={{ marginBottom: '44px' }}>
              <h2>Your AI reputation, <HL>in plain sight.</HL></h2>
              <p className="lead">Transparent and granular: your sentiment broken down by axis and by model, with every score traceable to the exact words AI uses about you.</p>
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
                      <span className="dsb__brand-meta">Active project</span>
                    </div>
                  </div>
                  <div className="dsb__ask-poli">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>
                      <path d="M20 2v4"/><path d="M22 4h-4"/>
                      <circle cx="4" cy="20" r="2"/>
                    </svg>
                    Ask Poli AI
                  </div>
                  <div className="dsb__section-hdr">
                    <span className="dsb__section-lbl">GEO AUDIT</span>
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
                        <span className="dsb__tree-cat-name">Footwear</span>
                      </div>
                      <div className="dsb__tree-l2">
                        {['Overview', 'AI Visibility', 'Sentiment'].map(l => (
                          <div key={l} className={`dash__nav-item${l === 'Sentiment' ? ' dash__nav-item--active' : ''}`}>{l}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="dsb__section-hdr dsb__section-hdr--mt">
                    <span className="dsb__section-lbl">TECHNICAL AUDIT</span>
                  </div>
                  <div className="dsb__section-hdr">
                    <span className="dsb__section-lbl">CONTENT GENERATION</span>
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
                        <div className="hdash__v2-brand-sub">Sentiment · Updated today</div>
                      </div>
                    </div>
                    <div className="hdash__v2-score-wrap">
                      <span className="hdash__v2-score-label">Overall sentiment</span>
                      <span className="hdash__v2-score-badge" style={{ color: '#16a34a', background: '#d1fae5' }}>Strong</span>
                    </div>
                  </div>

                  <div className="hdash__v2-nora">
                    <span className="hdash__v2-nora-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" width="12" height="12">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                    </span>
                    <p><b>Nora:</b> Sentiment is Strong overall   Durability is the weak point. Prioritize it before competitors exploit the gap.</p>
                  </div>

                  <div className="hdash__v2-section-label">Over time</div>

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
                          <text x={CPL-6} y={cyAt(v)+3} textAnchor="end" fontSize="7.5" fontWeight="600" fill={color}>{label}</text>
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
                            <span className="hdash__v2-tip-val" style={{ color: hovTier.color }}>{hovTier.label}</span>
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
              <span className="eyebrow">What's inside</span>
              <h2>Five reasons it's <HL>more than monitoring.</HL></h2>
              <p className="lead">Most tools stop at a number. Each one below is a strength of the analysis   and what turns AI sentiment into something you can act on.</p>
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
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div className="jump">
                    See it
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
            <div className="adv-head reveal">
              <span className="eyebrow">01   Product focus</span>
              <h2>We grade <HL>axes.</HL> Not just prompts.</h2>
              <p className="lead">We start from your product, not a prompt list   scoring every AI answer on the axes your buyers actually judge, then rolling them into one sentiment per axis.</p>
            </div>

            <div className="pf-wrap reveal">
              {/* legend header */}
              <div className="pf-legend-hdr">
                <span>Each answer is scored:</span>
                <span className="tg pos">▲ Endorsement</span>
                <span className="tg neu">▲▼ Mention</span>
                <span className="tg neg">▼ Critique</span>
                <span>  then rolled into one sentiment per axis.</span>
              </div>

              {/* diagram */}
              <div className="pf-diagram">
                {/* column headers */}
                <div className="pf-col-hdrs">
                  <span className="lbl">Hundreds of AI answers</span>
                  <span />
                  <span className="lbl r">One sentiment per axis</span>
                </div>

                {/* row 1   Compliance */}
                <div className="pf-row">
                  <div className="pf-group" style={{ borderLeftColor: '#d98a2b' }}>
                    <div className="pf-prompt">
                      <span>Most CE / MDR-compliant vendor?</span>
                      <span className="tri neg">▼</span>
                    </div>
                    <div className="pf-prompt">
                      <span>Does it meet EU medical-device rules?</span>
                      <span className="tri neu">↕</span>
                    </div>
                  </div>
                  <div className="pf-curve-col">
                    <svg viewBox="0 0 80 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 0,30 C 40,30 40,58 80,58" stroke="#d98a2b" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M 0,86 C 40,86 40,58 80,58" stroke="#d98a2b" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="pf-axis-card" style={{ background: '#fef3e2', borderColor: 'rgba(217,138,43,.35)' }}>
                    <h3>Compliance</h3>
                    <p className="from-ct">from 14 prompts</p>
                    <span className="pill-tag pt-warn">Moderate</span>
                  </div>
                </div>

                {/* row 2   Expertise */}
                <div className="pf-row">
                  <div className="pf-group" style={{ borderLeftColor: '#7c6ccf' }}>
                    <div className="pf-prompt">
                      <span>Best for fracture-detection accuracy?</span>
                      <span className="tri pos">▲</span>
                    </div>
                    <div className="pf-prompt">
                      <span>Which AI is most clinically validated?</span>
                      <span className="tri pos">▲</span>
                    </div>
                  </div>
                  <div className="pf-curve-col">
                    <svg viewBox="0 0 80 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 0,30 C 40,30 40,58 80,58" stroke="#7c6ccf" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M 0,86 C 40,86 40,58 80,58" stroke="#7c6ccf" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="pf-axis-card" style={{ background: '#f1f0fa', borderColor: 'rgba(124,108,207,.35)' }}>
                    <h3>Expertise</h3>
                    <p className="from-ct">from 11 prompts</p>
                    <span className="pill-tag pt-pos">Strong</span>
                  </div>
                </div>

                {/* row 3   Innovation */}
                <div className="pf-row">
                  <div className="pf-group" style={{ borderLeftColor: '#1e3893' }}>
                    <div className="pf-prompt">
                      <span>Newest breakthroughs in radiology AI?</span>
                      <span className="tri pos">▲</span>
                    </div>
                    <div className="pf-prompt">
                      <span>Most advanced imaging AI today?</span>
                      <span className="tri pos">▲</span>
                    </div>
                  </div>
                  <div className="pf-curve-col">
                    <svg viewBox="0 0 80 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 0,30 C 40,30 40,58 80,58" stroke="#1e3893" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M 0,86 C 40,86 40,58 80,58" stroke="#1e3893" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="pf-axis-card" style={{ background: '#eef1fb', borderColor: 'rgba(30,56,147,.3)' }}>
                    <h3>Innovation</h3>
                    <p className="from-ct">from 9 prompts</p>
                    <span className="pill-tag pt-pos">Very strong</span>
                  </div>
                </div>
              </div>

              <p className="pf-foot">Each axis is a real buying decision   the score tells you exactly where AI is helping or hurting your pipeline.</p>
            </div>
          </div>
        </section>

        {/* ===== 02   FULL BREAKDOWN ===== */}
        <section id="angles" style={{ background: 'var(--surface-2)' }}>
          <div className="wrap">
            <div className="adv-head mid reveal">
              <span className="eyebrow">02   Full breakdown</span>
              <h2>Break it down, <HL>every way.</HL></h2>
              <p className="lead">One number hides what matters. We read your sentiment by axis and by model   because the fix is never the same twice.</p>
            </div>

            <div className="lens2 reveal">
              {/* by axis */}
              <div className="slens">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
                  </svg>
                </div>
                <h3>By axis</h3>
                <p>Every score broken out by the four axes we track. See what's holding you back and what's already working.</p>
                <div className="srow">
                  <span className="nm">CE / MDR</span>
                  <div className="track"><i style={{ width: '82%' }} /></div>
                  <span className="pill-tag pt-pos">82</span>
                </div>
                <div className="srow">
                  <span className="nm">Expertise</span>
                  <div className="track"><i style={{ width: '76%' }} /></div>
                  <span className="pill-tag pt-pos">76</span>
                </div>
                <div className="srow">
                  <span className="nm">Innovation</span>
                  <div className="track"><i className="warn" style={{ width: '48%' }} /></div>
                  <span className="pill-tag pt-warn">48</span>
                </div>
                <div className="srow">
                  <span className="nm">Workflow</span>
                  <div className="track"><i style={{ width: '71%' }} /></div>
                  <span className="pill-tag pt-pos">71</span>
                </div>
                <p className="lens-note">Scores averaged across all models · updated weekly</p>
              </div>

              {/* by model */}
              <div className="slens">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4l3 3"/>
                  </svg>
                </div>
                <h3>By model</h3>
                <p>The same brand, five different AI voices. Find which models are your allies and which need work.</p>
                <div className="srow">
                  <span className="nm">ChatGPT</span>
                  <div className="track"><i style={{ width: '81%' }} /></div>
                  <span className="pill-tag pt-pos">81</span>
                </div>
                <div className="srow">
                  <span className="nm">Claude</span>
                  <div className="track"><i style={{ width: '78%' }} /></div>
                  <span className="pill-tag pt-pos">78</span>
                </div>
                <div className="srow">
                  <span className="nm">Gemini</span>
                  <div className="track"><i style={{ width: '72%' }} /></div>
                  <span className="pill-tag pt-pos">72</span>
                </div>
                <div className="srow">
                  <span className="nm">Perplexity</span>
                  <div className="track"><i className="warn" style={{ width: '61%' }} /></div>
                  <span className="pill-tag pt-warn">61</span>
                </div>
                <div className="srow">
                  <span className="nm">Mistral</span>
                  <div className="track"><i style={{ width: '76%' }} /></div>
                  <span className="pill-tag pt-pos">76</span>
                </div>
                <p className="lens-note">Innovation axis · last 90 days</p>
              </div>
            </div>

            {/* overband   over time */}
            <div className="overband reveal">
              <div className="ob-copy">
                <div className="ob-eyebrow">Trend tracking</div>
                <h3>Watch your scores move over time.</h3>
                <p>Monthly snapshots across every axis so you can see what your content changes and PR moves actually did to AI perception.</p>
                <div className="ob-flag">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span><b>Innovation dropped 11 pts</b> in March   correlates with competitor product launch. IVY flagged a content gap in your roadmap messaging.</span>
                </div>
              </div>

              <div className="ob-chart">
                <svg className="ob-svg" viewBox="0 0 460 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* grid lines */}
                  {[40, 80, 120, 160].map((y) => (
                    <line key={y} x1="40" y1={y} x2="440" y2={y} stroke="#e9ebf1" strokeWidth="1"/>
                  ))}
                  {/* y-axis labels */}
                  {[{ y: 40, l: '100' }, { y: 80, l: '75' }, { y: 120, l: '50' }, { y: 160, l: '25' }].map((r) => (
                    <text key={r.y} x="32" y={r.y + 4} textAnchor="end" fontSize="9" fill="#9a9aa0" fontFamily="Chivo,sans-serif">{r.l}</text>
                  ))}
                  {/* x-axis labels */}
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => (
                    <text key={m} x={60 + i * 76} y="185" textAnchor="middle" fontSize="9" fill="#9a9aa0" fontFamily="Chivo,sans-serif">{m}</text>
                  ))}
                  {/* Compliance line (green)   stays strong */}
                  <polyline points="60,72 136,68 212,66 288,64 364,62 440,60" stroke="#22c55e" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
                  {/* Innovation line (orange)   dips in Mar */}
                  <polyline points="60,96 136,92 212,128 288,124 364,116 440,112" stroke="#d98a2b" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
                  {/* dot on innovation dip */}
                  <circle cx="212" cy="128" r="5" fill="#d98a2b" stroke="#fff" strokeWidth="2"/>
                </svg>
                <div className="ob-leg">
                  <span><span className="dot" style={{ background: '#22c55e' }} />CE / MDR compliance</span>
                  <span><span className="dot" style={{ background: '#d98a2b' }} />Innovation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 03   COMPETITIVE ===== */}
        <section id="compare">
          <div className="wrap">
            <div className="adv-head mid reveal">
              <span className="eyebrow">03   Your competitors</span>
              <h2>See how AI <HL>ranks the field.</HL></h2>
              <p className="lead">These are your real competitors   scored on the same axes. See where AI is handing them wins you should own.</p>
            </div>

            <div className="cmpx reveal">
              <div className="cmpx-head">
                <span>Brand</span>
                <span>CE / MDR</span>
                <span>Expertise</span>
                <span>Innovation</span>
              </div>
              {COMPETITORS.map((c) => (
                <div key={c.name} className={`cmpx-row${c.you ? ' you' : ''}`}>
                  <div className="brand">
                    <span className="bd" style={{ background: c.bd }} />
                    {c.name}
                    {c.you && <span className="yt">YOU</span>}
                  </div>
                  <div className={`cell${c.compliance.lead ? ' lead' : ''}`}>
                    <span className={`pill-tag ${c.compliance.cls}`}>{c.compliance.label}</span>
                  </div>
                  <div className={`cell${c.expertise?.lead ? ' lead' : ''}`}>
                    <span className={`pill-tag ${c.expertise.cls}`}>{c.expertise.label}</span>
                  </div>
                  <div className={`cell${c.innovation.lead ? ' lead' : ''}`}>
                    <span className={`pill-tag ${c.innovation.cls}`}>{c.innovation.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="shotline reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>Sample data. Your real report shows your brand and up to <b>10 competitors</b>, scored on the axes that matter in your market   refreshed weekly.</span>
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
                  <div>
                    <div className="agent-pill">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                      IVY   Poliris AI Agent
                    </div>
                    <h2>IVY reads your sentiment scores and <HL>writes the playbook.</HL></h2>
                    <p className="lead" style={{ color: 'rgba(255,255,255,.75)', margin: '18px 0 28px' }}>
                      IVY doesn't just surface a gap   it reads the AI answers behind each score, identifies which content signals are missing, and writes a targeted fix. One click from score to action plan.
                    </p>
                    <ul className="agent-pts">
                      <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><polyline points="20 6 9 17 4 12"/></svg>
                        Diagnoses the root cause in 30 seconds
                      </li>
                      <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><polyline points="20 6 9 17 4 12"/></svg>
                        Writes axis-specific content briefs
                      </li>
                      <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><polyline points="20 6 9 17 4 12"/></svg>
                        Prioritises fixes by expected score lift
                      </li>
                    </ul>
                  </div>

                  {/* right: chat mock */}
                  <div className="shot">
                    <span className="tab">IVY agent</span>
                    <div className="chat">
                      <div className="bub agent">
                        <strong>IVY</strong>
                        Your Innovation score dropped 11 pts in March. Perplexity and Gemini are now describing Gleamer as "legacy" on AI-assisted triage   a term that didn't appear before the Raidium launch. Want me to run a gap analysis?
                      </div>
                      <div className="bub user">Yes   and prioritise by score impact.</div>
                      <div className="bub agent">
                        <strong>IVY</strong>
                        Done. Three content gaps are responsible for 80% of the drop. Drafting targeted briefs now   ranked by expected lift. Top fix: a clinical AI roadmap page targeting the "AI-assisted triage" query cluster.
                      </div>
                    </div>
                    <div className="plan">
                      <div className="plan-item">
                        <span className="plan-ic">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        <span className="t">AI roadmap page   triage cluster</span>
                        <span className="impact hi">+9 pts</span>
                      </div>
                      <div className="plan-item">
                        <span className="plan-ic">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        <span className="t">Update product page with FDA/CE integration signals</span>
                        <span className="impact md">+4 pts</span>
                      </div>
                      <div className="plan-item">
                        <span className="plan-ic">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        <span className="t">Add structured data: innovation claims with citations</span>
                        <span className="impact md">+3 pts</span>
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
              <span className="eyebrow">05   Evidence</span>
              <h2>Open the <HL>black box.</HL></h2>
              <p className="lead">Every score is built from the actual words AI uses about you   here's how we read one answer.</p>
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
                    <span className="evc-asklab">Perplexity</span>
                    "What are the best AI solutions for radiology in the EU market?"
                  </span>
                  <span className="evx-right">
                    <span className="sig pos">+2 pts Innovation</span>
                    <span className="chev">›</span>
                  </span>
                </button>

                <div className="evx-body">
                  <div className="evx-bin">
                    <div className="evc-anslab">
                      AI answer
                      <span className="ln" />
                      <span className="evc-srcchip">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        Perplexity
                      </span>
                    </div>

                    <div className="evc-ans">
                      <span className="ell">…</span>
                      {' '}In the EU market, <span className="hl-brand">Gleamer</span> stands out for its{' '}
                      <span className="hl-pos">strong CE-mark compliance record</span> and{' '}
                      <span className="hl-pos">deep radiologist workflow integration</span>. While competitors have moved faster on{' '}
                      <span className="hl-neg">AI-assisted triage features</span>, Gleamer remains a{' '}
                      <span className="hl-pos">trusted choice for compliance-first procurement teams</span>.{' '}
                      <span className="ell">…</span>
                    </div>

                    <div className="evx-map">
                      <div className="evx-maplab">How we scored it</div>
                      <div className="evx-words">
                        <span className="sig pos">CE compliance ↑</span>
                        <span className="sig pos">Workflow fit ↑</span>
                        <span className="sig neg">Innovation ↓</span>
                        <span className="sig pos">Expertise ↑</span>
                      </div>
                      <div className="evx-flow">
                        <div className="dims">
                          <span className="dim">CE / MDR</span>
                          <span className="dim">Workflow</span>
                          <span className="dim">Expertise</span>
                        </div>
                        <span className="evx-eq">→</span>
                        <span className="sig pos">+positive signals</span>
                        <span className="evx-eq">+</span>
                        <div className="dims">
                          <span className="dim">Innovation</span>
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
          heading="See how AI talks about you   free."
          lead="Run a sentiment scan on your brand and your competitors   axis by axis, model by model   and find out exactly where you're slipping."
          primaryCta="Start your free trial"
          secondaryCta="Talk to an expert"
          note="Free · no credit card · results in 60 seconds"
        />
      </main>
      <Footer />
    </div>
  );
}
