import { useState, useRef, useEffect, useCallback } from 'react';

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

/* ── Slide visual components ───────────────────────────────────── */
function VisibilityVis() {
  const bars = [
    { name: 'Your brand', pct: 53, col: '#1e3893' },
    { name: 'Rival A',    pct: 28, col: '#9aa6cf' },
    { name: 'Rival B',    pct: 19, col: '#c4cae0' },
  ];
  return (
    <div className="vis-card">
      <div className="vis-card__header">
        <span className="vis-card__title">Share of voice · PM tools</span>
        <span className="vis-card__badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
            <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/>
            <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/>
            <path d="M18 9h1.5a1 1 0 0 0 0-5H18"/>
            <path d="M4 22h16"/>
            <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/>
            <path d="M6 9H4.5a1 1 0 0 1 0-5H6"/>
          </svg>
          #1
        </span>
      </div>
      {bars.map((r) => (
        <div key={r.name} className="vis-bar-row">
          <span className="vis-bar-name">
            <span className="vis-bar-dot" style={{ background: r.col }} />
            {r.name}
          </span>
          <div className="vis-bar-track">
            <div className="vis-bar-fill" style={{ width: `${r.pct}%`, background: r.col }} />
          </div>
          <span className="vis-bar-pct">{r.pct}%</span>
        </div>
      ))}
      <div className="vis-tags">
        {['ChatGPT · 61%', 'Gemini · 48%', 'Claude · 55%'].map((c) => (
          <span key={c} className="vis-tag">{c}</span>
        ))}
      </div>
    </div>
  );
}

function SentimentVis() {
  const qualifiers = [
    { label: 'Reliable & trustworthy', type: 'pos' },
    { label: 'Easy to use',            type: 'pos' },
    { label: 'Limited integrations',   type: 'warn' },
    { label: 'Pricey for SMBs',        type: 'neg' },
  ];
  return (
    <div className="vis-card">
      <div className="vis-card__sub">Sentiment breakdown</div>
      <div className="vis-sent-bar">
        <div style={{ background: '#1f8a5b', width: '58%' }} />
        <div style={{ background: '#d98a2b', width: '28%' }} />
        <div style={{ background: '#d2453a', width: '14%' }} />
      </div>
      {qualifiers.map((q) => (
        <div key={q.label} className="vis-qual-row">
          <span className="vis-qual-label">{q.label}</span>
          <span className={`vis-qual-badge vis-qual-badge--${q.type}`}>
            {q.type === 'pos' ? 'Positive' : q.type === 'warn' ? 'Neutral' : 'Negative'}
          </span>
        </div>
      ))}
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>
      </svg>
    ),
    tabLabel: 'Sentiment',
    eyebrow: 'Sentiment',
    title: 'Understand how AI really feels about you.',
    lead: "AI answers carry a tone. Find out whether engines describe your brand as trustworthy, innovative, or risky — and fix it.",
    points: ['Positive vs negative qualifier breakdown', 'Perception radar by attribute', 'Before / after optimisation comparison'],
    cta: 'Analyse sentiment',
    visual: <SentimentVis />,
  },
  {
    tabIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    tabLabel: 'Technical audit',
    eyebrow: 'Technical audit',
    title: "Know exactly what's blocking you from AI results.",
    lead: 'Crawl your site the way LLMs do. Surface every missing schema, crawlability gap, and trust signal that prevents AI from citing you.',
    points: ['Schema.org coverage & quality score', 'LLM-crawlability diagnosis', 'Prioritised fix list by impact'],
    cta: 'Run your audit',
    visual: <AuditVis />,
  },
  {
    tabIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/>
        <path d="M14 2v5a1 1 0 0 0 1 1h5"/>
        <path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
      </svg>
    ),
    tabLabel: 'Content generation',
    eyebrow: 'Content generation',
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

  const go = useCallback((n) => setActive(((n % total) + total) % total), [total]);

  useEffect(() => {
    const t = setInterval(() => go(active + 1), 6500);
    return () => clearInterval(t);
  }, [active, go]);

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
              {sl.tabLabel}
            </button>
          ))}
        </div>

        <div className="carousel">
          <button className="carousel__btn" onClick={() => go(active - 1)} aria-label="Previous">
            <ChevronLeft />
          </button>

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

          <button className="carousel__btn" onClick={() => go(active + 1)} aria-label="Next">
            <ChevronRight />
          </button>
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
