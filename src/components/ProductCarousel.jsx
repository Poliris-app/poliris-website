import { useState, useRef, useEffect } from 'react';

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
  const MODELS = [
    { label: 'Avg.',        icon: null },
    { label: 'ChatGPT',     icon: '/chatgpt-com-logo.png' },
    { label: 'Claude',      icon: '/claudeai-com-logo.png' },
    { label: 'Mistral',     icon: '/mistral-ai-logo.png' },
    { label: 'Gemini Web',  icon: '/gemini-ai-logo.png' },
  ];
  const BRANDS = [
    { name: 'Nike',        logo: '/nike-com-logo.png',        scores: [73, 78, 63, 88, 68], isYou: true },
    { name: 'New Balance', logo: '/newbalance-com-logo.png',  scores: [55, 62, 48, 58, 45] },
    { name: 'Hoka',        logo: '/hoka-com-logo.png',        scores: [42, 45, 35, 52, 38] },
    { name: 'ASICS',       logo: '/asics-com-logo.png',       scores: [60, 65, 52, 70, 55] },
    { name: 'Brooks',      logo: '/brooksrunning-com-logo.png', scores: [32, 38, 25, 40, 28] },
  ];

  return (
    <div className="vheat">
      {/* Score bar */}
      <div className="vheat__top">
        <div className="vheat__top-row">
          <span className="vheat__top-label">AI Visibility</span>
          <span className="vheat__excellent">Excellent</span>
        </div>
        <div className="vheat__score-row">
          <span className="vheat__score-num">83</span>
          <span className="vheat__score-denom">/100</span>
          <div className="vheat__bar-track">
            <div className="vheat__bar-fill" style={{ width: '83%' }} />
          </div>
        </div>
      </div>

      <div className="vheat__body">
        {/* Stats */}
        <div className="vheat__stats">
          <div className="vheat__stat">
            <span className="vheat__stat-label">Visibility Rank</span>
            <span className="vheat__stat-val">#2</span>
          </div>
          <div className="vheat__stat-divider" />
          <div className="vheat__stat">
            <span className="vheat__stat-label">Visibility Score</span>
            <div className="vheat__stat-row">
              <span className="vheat__stat-val">70%</span>
              <span className="vheat__stat-delta">↓2%</span>
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
            <span className="vheat__legend-text">Low</span>
            <div className="vheat__legend-bar" />
            <span className="vheat__legend-text">High</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SentimentVis() {
  const BRANDS = [
    {
      name: 'Nike',   logo: '/nike-com-logo.png',           color: '#0f172a', isYou: true,
      overall: 'Strong',
      scores: { Innovation: 80, Performance: 90, Range: 70, Premium: 85, Trust: 88 },
    },
    {
      name: 'On',     logo: '/on-com-logo.png',             color: '#e55a2b',
      overall: 'Moderate',
      scores: { Innovation: 75, Performance: 78, Range: 65, Premium: 68, Trust: 72 },
    },
    {
      name: 'Hoka',   logo: '/hoka-com-logo.png',           color: '#0ea5e9',
      overall: 'Moderate',
      scores: { Innovation: 65, Performance: 73, Range: 58, Premium: 50, Trust: 65 },
    },
    {
      name: 'ASICS',  logo: '/asics-com-logo.png',          color: '#7c3aed',
      overall: 'Strong',
      scores: { Innovation: 70, Performance: 84, Range: 72, Premium: 65, Trust: 80 },
    },
    {
      name: 'Brooks', logo: '/brooksrunning-com-logo.png',  color: '#14b8a6',
      overall: 'Weak',
      scores: { Innovation: 50, Performance: 62, Range: 48, Premium: 42, Trust: 58 },
    },
  ];

  const AXES = ['Innovation', 'Performance', 'Range', 'Premium', 'Trust'];
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
            {b.isYou && <span className="srad__chip-you">You</span>}
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
                <div className="srad__rtip-title">Web score</div>
                <div className="srad__rtip-brand-row">
                  <span className="srad__rtip-dot" style={{ background: tooltip.singleBrand.color }} />
                  <img src={tooltip.singleBrand.logo} alt={tooltip.singleBrand.name} className="srad__rtip-logo" />
                  <span className="srad__rtip-brand">{tooltip.singleBrand.name}</span>
                  <span className="srad__rtip-badge" style={TIER_STYLE[tooltip.singleBrand.overall]}>
                    {tooltip.singleBrand.overall}
                  </span>
                </div>
                <div className="srad__rtip-axes">
                  {AXES.map(ax => {
                    const tier = sentTier(tooltip.singleBrand.scores[ax]);
                    return (
                      <div key={ax} className="srad__rtip-row">
                        <span className="srad__rtip-attr">{ax}</span>
                        <span className="srad__rtip-badge" style={TIER_STYLE[tier]}>{tier}</span>
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
                        <span className="srad__rtip-badge" style={TIER_STYLE[tier]}>{tier}</span>
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

function AuditVis() {
  const checks = [
    { label: 'Schema.org markup',  status: 'ok',   score: '9/10' },
    { label: 'LLM crawlability',   status: 'ok',   score: '8/10' },
    { label: 'FAQ structured data', status: 'warn', score: '5/10' },
    { label: 'E-E-A-T signals',    status: 'bad',  score: '3/10' },
  ];
  return (
    <div className="vis-card">
      <div className="vis-score-row">
        <div>
          <span className="vis-score-num">72</span>
          <span className="vis-score-denom">/100</span>
        </div>
        <div>
          <div className="vis-score-label">Technical score</div>
          <div className="vis-score-sub">12 issues found</div>
        </div>
      </div>
      {checks.map((c) => (
        <div key={c.label} className="vis-check-row">
          <span className={`vis-check-icon vis-check-icon--${c.status}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </span>
          <span className="vis-check-label">{c.label}</span>
          <span className="vis-check-score">{c.score}</span>
        </div>
      ))}
    </div>
  );
}

function ContentVis() {
  const lineWidths = ['75%', '90%', '70%', '85%', '60%'];
  return (
    <div className="vis-card">
      <div className="vis-content-sub">Draft — FAQ page</div>
      <div className="vis-lines">
        <div className="vis-line vis-line--blue" style={{ width: '75%' }} />
        {lineWidths.slice(1).map((w, i) => (
          <div key={i} className="vis-line vis-line--gray" style={{ width: w }} />
        ))}
      </div>
      <div className="vis-content-footer">
        <span className="vis-content-text">Content agent · Schema.org ready</span>
        <span className="vis-content-action">Publish →</span>
      </div>
    </div>
  );
}

/* ── Slides data ───────────────────────────────────────────────── */
const SLIDES = [
  {
    tabIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
      </svg>
    ),
    tabLabel: 'AI Visibility',
    eyebrow: 'AI Visibility',
    title: 'Win share of voice in AI answers.',
    lead: 'See how often AI names and recommends you — broken down by offer and by zone, against the competitors that actually win the answer.',
    points: ['Share of voice, offer by offer × zone', 'Ranked next to your real competitors', 'Tracked across all six engines'],
    cta: 'Track all visibility',
    visual: <VisibilityVis />,
  },
  {
    tabIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    tabLabel: 'AI Sentiment',
    eyebrow: 'AI Sentiment',
    title: 'Understand how AI really feels about you.',
    lead: "AI answers carry a tone. Find out whether engines describe your brand as trustworthy, innovative, or risky — and fix it.",
    points: ['Positive vs negative qualifier breakdown', 'Perception radar by attribute', 'Before / after optimisation comparison'],
    cta: 'Analyse sentiment',
    visual: <SentimentVis />,
  },
  {
    tabIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    tabLabel: 'AI Authority',
    eyebrow: 'AI Authority',
    title: "Know exactly what's blocking you from AI results.",
    lead: 'Crawl your site the way LLMs do. Surface every missing schema, crawlability gap, and trust signal that prevents AI from citing you.',
    points: ['Schema.org coverage & quality score', 'LLM-crawlability diagnosis', 'Prioritised fix list by impact'],
    cta: 'Run your audit',
    visual: <AuditVis />,
  },
  {
    tabIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <circle cx="12" cy="12" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="M12 6v4M12 14l-6.5 2.5M12 14l6.5 2.5"/>
      </svg>
    ),
    tabLabel: 'Content Generation',
    eyebrow: 'Content Generation',
    title: "Let agents write and ship the fix for you.",
    lead: "Once audit and sentiment tell you what needs changing, our content agents draft on-brand pages, FAQs, and structured data — ready to push live.",
    points: ['AI-drafted content aligned to your brand voice', 'FAQ & structured-data generation', 'One-click publish to your CMS'],
    cta: 'Generate content',
    visual: <ContentVis />,
  },
];

/* ── Main component ────────────────────────────────────────────── */
export default function ProductCarousel() {
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
          <p className="products__eyebrow">How it works</p>
          <h2 className="products__h2">
            Four tools. One platform.<br />
            Built for the{' '}
            <span className="hl">AI era.</span>
          </h2>
          <p className="products__lead">
            Be discoverable in AI. Understand how it sees you. Optimize for it. Act on it.
          </p>
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
                      <a href="#" className="slide__cta">
                        {sl.cta}
                        <span className="slide__cta-icon"><ChevronRight /></span>
                      </a>
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
