import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// import ProductCarousel from './ProductCarousel'; // hidden for now, see below
import Hero from './Hero';
import CtaBand from './CtaBand';
// import AuditModal from './AuditModal'; // hidden for now, see below
import { useLang } from '../contexts/LangContext';

/* ── Agent avatar illustrations (see public/Illustrations/) ──── */
const AVATARS = {
  Leo: `${import.meta.env.BASE_URL}Illustrations/leo.png`,
  Nora: `${import.meta.env.BASE_URL}Illustrations/nora.png`,
  Tom: `${import.meta.env.BASE_URL}Illustrations/tom.png`,
  Kate: `${import.meta.env.BASE_URL}Illustrations/kate.png`,
  Ivy: `${import.meta.env.BASE_URL}Illustrations/ivy.png`,
  Emma: `${import.meta.env.BASE_URL}Illustrations/emma.png`,
};

/* ── Highlight span ──────────────────────────────────────────── */
const HL = ({ children }) => <span className="hl">{children}</span>;

/* ── Eyebrow label ───────────────────────────────────────────── */
const Eyebrow = ({ children }) => <div className="eyebrow">{children}</div>;

export default function LandingPage() {
  const { t } = useLang();
  // "Get your free audit" button hidden for now — see below. State kept so
  // it's a one-line restore once a real entry point is decided.
  // const [auditModalOpen, setAuditModalOpen] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const h = t('home.hero');
  const cta = t('home.cta');

  return (
    <div className="landing">
      {/* "Get your free audit" button hidden for now — restore by uncommenting
          this and the auditModalOpen state above. */}
      {/* <button
        type="button"
        onClick={() => setAuditModalOpen(true)}
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
          padding: '10px 16px', borderRadius: 999,
          background: '#0062ff', color: '#fff', fontWeight: 700, fontSize: 13,
          boxShadow: '0 8px 24px rgba(0,98,255,0.35)',
        }}
      >
        Get your free audit
      </button>
      <AuditModal open={auditModalOpen} onClose={() => setAuditModalOpen(false)} /> */}
      <Hero
        eyebrow={h.eyebrow}
        title={<>{h.titlePre}<br /><HL>{h.titleHl}</HL> {h.titlePost}</>}
        audience={h.audience}
        lead={h.lead}
        primaryCta={h.primaryCta}
        secondaryCta={h.secondaryCta}
        note={h.note}
        websiteCapture={{
          placeholder: h.websitePlaceholder,
          ctaLabel: h.websiteCta,
          errorText: h.websiteError,
        }}
      />
      <ValueChain />
      {/* ProductCarousel hidden for now — restore by uncommenting. */}
      {/* <ProductCarousel /> */}
      <PlatformEngine />
      <Agents />
      <ComparisonTable />
      <Stakes />
      <CtaBand
        heading={cta.heading}
        lead={cta.lead}
        primaryCta={cta.primaryCta}
        secondaryCta={cta.secondaryCta}
        note={cta.note}
      />
    </div>
  );
}

/* ================================================================
   WORKFLOW VS
   ================================================================ */
function WorkflowVs() {
  const steps = [
    {
      title: 'Understand your brand',
      desc: 'Market position, competitive context and goals',
      icon: (<><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></>),
    },
    {
      title: 'Monitor AI visibility',
      desc: 'Real-time tracking across ChatGPT, Gemini, Claude, Perplexity, Mistral, DeepSeek',
      icon: (<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>),
    },
    {
      title: 'Prioritize opportunities',
      desc: 'Highest-impact actions ranked by business value',
      icon: (<><path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/></>),
    },
    {
      title: 'Concrete recommendations',
      desc: 'Specific, ready-to-approve fixes on content, schema, structure',
      icon: (<><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></>),
    },
    {
      title: 'Implement on your site',
      desc: 'Deployed directly by Poliris. No additional effort from your team',
      icon: (<><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"/></>),
    },
  ];

  return (
    <div className="wfvs">
      <div className="wfvs__card">
        <div className="wfvs__other">
          <span className="wfvs__other-label">Other Tools</span>
          <div className="wfvs__other-ic-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </div>
          <div className="wfvs__other-name">Monitor</div>
          <div className="wfvs__other-sep" />
          <div className="wfvs__other-desc">With other tools, you are only doing this</div>
        </div>

        <div className="wfvs__vs">vs</div>

        <div className="wfvs__workflow">
          <span className="wfvs__wf-label">The Complete Workflow</span>
          <div className="wfvs__steps">
            {steps.map((step) => (
              <div key={step.title} className="wfvs__step">
                <div className="wfvs__step-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    {step.icon}
                  </svg>
                </div>
                <div className="wfvs__step-text">
                  <div className="wfvs__step-title">{step.title}</div>
                  <div className="wfvs__step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   VALUE CHAIN
   ================================================================ */
function ValueChain() {
  const { t } = useLang();
  const vcSteps = t('home.valueChain.steps');
  const STEP_ICONS = [
    (<><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/><path d="m16 16-1.9-1.9"/></>),
    (<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />),
    (<><path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/></>),
    (<><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></>),
    (<><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"/></>),
  ];
  const steps = vcSteps.map((s, i) => ({ ...s, icon: STEP_ICONS[i] }));
  const vc = t('home.valueChain');

  return (
    <section className="value-chain" id="value-chain">
      <div className="container">
        <div className="sec-head reveal">
          <Eyebrow>{vc.eyebrow}</Eyebrow>
          <h2 className="sec-h2">{vc.h2Pre}<br /><HL>{vc.h2Hl}</HL></h2>
          <p className="sec-lead">{vc.lead}</p>
        </div>
        <div className="vchain-diagram">
          <div className="vchain-frame reveal reveal--scale reveal--d1">

            {/* Header */}
            <div className="vcf-head">
              <span className="vcf-pill">Poliris</span>
              <p className="vcf-card-heading">{vc.cardHeading}</p>
            </div>

            {/* Steps */}
            <div className="vc-track">
              {steps.map((step) => (
                <div key={step.num} className="vc-node">
                  <div className="vc-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="23" height="23">
                      {step.icon}
                    </svg>
                  </div>
                  <div className="vc-name">{step.name}</div>
                  <div className="vc-desc">{step.desc}</div>
                </div>
              ))}

              {/* Dot → vertical line → X + pill annotation */}
              <div className="vcf-stop-dot" />
              <div className="vcf-stop-vline" />
              <div className="vcf-stop-anchor">
                <div className="vcf-stop-x">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </div>
                <div className="vcf-stop-pill">{vc.stopNote}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PLATFORM ENGINE — 5-pillar feature showcase (before Team section)
   ================================================================ */
function EngineWindow({ url, children }) {
  return (
    <div className="engine-window">
      <div className="engine-window__bar">
        <span className="engine-window__dot" style={{ background: '#ff5f57' }} />
        <span className="engine-window__dot" style={{ background: '#febc2e' }} />
        <span className="engine-window__dot" style={{ background: '#28c840' }} />
        <span className="engine-window__url">{url}</span>
      </div>
      <div className="engine-window__body">{children}</div>
    </div>
  );
}

function EnginePlaceholder() {
  // Real product screenshot goes here later swap this div for an <img>.
  return <div className="engine-placeholder" />;
}

/* ── Position vs Competitors — live-dashboard preview for card 01 ──
   Static recreation of PositionChart.tsx (real dashboard component)
   for the marketing page: same quadrant layout, colors and copy, but
   fixture data instead of a live fetch. A CSS-driven loop plays the
   "click a brand, see the tooltip" interaction once this row scrolls
   into view (reuses the page's existing .reveal/.visible trigger — see
   .pc-cursor / .pc-tooltip / .pc-dot--target in poliris.css). */
const PC_QUADRANTS = [
  { key: 'sentiment', top: 0, left: 0, bg: '#F8FBFC', label: 'Strong sentiment · Low visibility', edge: 'right bottom' },
  { key: 'leaders', top: 0, left: 50, bg: '#EFF6FF', label: 'Leaders', edge: 'bottom' },
  { key: 'atRisk', top: 50, left: 0, bg: '#FEFBEA', label: 'At risk', edge: 'right' },
  { key: 'visibility', top: 50, left: 50, bg: '#F8FBFC', label: 'Strong visibility · Weak sentiment', edge: '' },
];
// Same x/y story as HeroDashboard's own QUAD_POS (x = visibility%, used
// directly as `left`; y here is already "distance from top", i.e. the
// inverted sentiment value HeroDashboard computes via `100 - sentimentY`
// before it ever reaches CSS) — converted 1:1 from QUAD_POS so this card
// and the hero dashboard's quadrant plot agree on where every brand sits.
const PC_BRANDS = [
  // Sony, Samsung, Bose, JBL and Anker all ship as square opaque logo tiles
  // with their own brand-colored background baked in (no transparency), so
  // they're cropped to fill the whole circle (cover) instead of floating
  // inset on a badge background like Apple's transparent-PNG mark below.
  { id: 'nb', name: 'Samsung', x: 38, y: 18, initial: 'S', bg: '#12121a', logo: 'samsung-com-logo.png', cover: true },
  { id: 'hoka', name: 'Bose', x: 38, y: 44, initial: 'B', bg: '#1e1e1e', logo: 'bose-com-logo.png', cover: true },
  // Apple's logo is a black mark on a transparent PNG — a black badge bg made
  // it invisible (looked like a plain black dot), so it gets a white badge
  // instead of the cover treatment the opaque tiles above use.
  { id: 'adidas', name: 'Apple', x: 95, y: 9, initial: 'a', bg: '#ffffff', logo: 'apple-com-logo.png' },
  { id: 'asics', name: 'JBL', x: 36, y: 50, initial: 'j', bg: '#f03c02', logo: 'jbl-com-logo.png', cover: true },
  // y is deliberately not too close to the chart's top edge — the tooltip
  // opens upward above the dot and .pc-panel clips at 0, so too little
  // headroom here cuts the tooltip's own top edge off.
  { id: 'nike', name: 'Sony', x: 90, y: 20, initial: 'S', bg: '#0d0d0d', logo: 'sony-com-logo.png', isTarget: true, cover: true },
  { id: 'on', name: 'Anker', x: 40, y: 50, initial: 'A', bg: '#00b4f0', logo: 'anker-com-logo.png', cover: true },
];

function PcDot({ brand }) {
  return (
    <div
      className={`pc-dot${brand.isTarget ? ' pc-dot--target' : ''}`}
      style={{ left: `${brand.x}%`, top: `${brand.y}%` }}
    >
      {brand.isTarget && <span className="pc-dot__pulse" />}
      <span className="pc-dot__label">{brand.name}</span>
      <span className={`pc-dot__badge${brand.cover ? ' pc-dot__badge--cover' : ''}`} style={{ background: brand.bg }}>
        {brand.logo
          ? <img src={`${import.meta.env.BASE_URL}${brand.logo}`} alt="" />
          : <span style={{ color: brand.bg === '#ffffff' ? '#0d0d0d' : '#fff' }}>{brand.initial}</span>}
      </span>
    </div>
  );
}

/* ── "Analysis" tab — Visibility (left) + Sentiment (right), each a
   compact recreation of VisibilityAnalysis2.tsx / SentimentAnalysis2.tsx ── */
// Same per-platform numbers as HeroDashboard's own Visibility Analysis
// panel, so the two don't disagree about Sony's actual scores.
const PC_VIS_ROWS = [
  { name: 'Gemini', icon: 'gemini-ai-logo.png', pct: 97 },
  { name: 'ChatGPT', icon: 'chatgpt-com-logo.png', pct: 92 },
  { name: 'Mistral', icon: 'mistral-ai-logo.png', pct: 89 },
  { name: 'Claude', icon: 'claudeai-com-logo.png', pct: 82 },
];
// Sentiment bars snap to their tier's fixed width, same as SCORE_TO_PCT in
// the real component — the bar reflects the tier bucket, not the raw score.
const SENT_TIER_PCT = { 'Very Strong': 100, Strong: 80, Moderate: 60, Weak: 40, 'Very Weak': 20 };
const SENT_TIER_STYLE = {
  'Very Strong': { color: 'var(--tier-vs-color)', bg: 'var(--tier-vs-bg)' },
  Strong: { color: 'var(--tier-s-color)', bg: 'var(--tier-s-bg)' },
  Moderate: { color: 'var(--tier-m-color)', bg: 'var(--tier-m-bg)' },
  Weak: { color: 'var(--tier-w-color)', bg: 'var(--tier-w-bg)' },
  'Very Weak': { color: 'var(--tier-vw-color)', bg: 'var(--tier-vw-bg)' },
};
// Matches HeroDashboard's Sentiment Analysis axes/tiers exactly.
const PC_SENT_ROWS = [
  { name: 'Brand Awareness', tier: 'Very Strong' },
  { name: 'Performance', tier: 'Strong' },
  { name: 'Design', tier: 'Strong' },
  { name: 'Durability', tier: 'Weak' },
];

function PcAnalysis() {
  return (
    <div className="pc-an">
      <div className="pc-an__col">
        <p className="pc-an__title">Visibility Analysis</p>
        <p className="pc-an__sub">How often your product appears in AI answers</p>
        <div className="pc-an__stats">
          <div className="pc-an__stat"><span>Avg Score</span><strong>90%</strong></div>
          <div className="pc-an__stat"><span>Avg Position</span><strong>#2</strong></div>
          <div className="pc-an__stat"><span>Trend</span><strong className="pc-an__stat--up">↑ Rising</strong></div>
        </div>
        <p className="pc-an__label">Score by platform</p>
        <div className="pc-an__bars">
          {PC_VIS_ROWS.map((r) => (
            <div key={r.name} className="pc-an__bar-row">
              <div className="pc-an__bar-head">
                <span className="pc-an__bar-name">
                  <img src={`${import.meta.env.BASE_URL}${r.icon}`} alt="" />
                  {r.name}
                </span>
                <span className="pc-an__bar-pct">{r.pct}%</span>
              </div>
              <div className="pc-an__bar-track">
                <div className="pc-an__bar-fill" style={{ width: `${r.pct}%`, background: '#3b82f6' }} />
              </div>
            </div>
          ))}
        </div>
        <div className="pc-an__insight">Claude coverage is weakest — highest opportunity to improve mention rate here.</div>
        <div className="pc-an__details">Details</div>
      </div>

      <div className="pc-an__divider" />

      <div className="pc-an__col">
        <p className="pc-an__title">Sentiment Analysis</p>
        <p className="pc-an__sub">How your product is described by AI</p>
        <div className="pc-an__stats">
          <div className="pc-an__stat">
            <span>Avg Score</span>
            <strong><span className="pc-an__pill" style={{ color: 'var(--tier-s-color)', background: 'var(--tier-s-bg)' }}>Strong</span></strong>
          </div>
          <div className="pc-an__stat"><span>Trend</span><strong className="pc-an__stat--muted">→ Stable</strong></div>
        </div>
        <p className="pc-an__label">Score by platform</p>
        <div className="pc-an__bars">
          {PC_SENT_ROWS.map((r) => {
            const style = SENT_TIER_STYLE[r.tier];
            return (
              <div key={r.name} className="pc-an__bar-row">
                <div className="pc-an__bar-head">
                  <span className="pc-an__bar-name">{r.name}</span>
                  <span className="pc-an__pill" style={{ color: style.color, background: style.bg }}>{r.tier}</span>
                </div>
                <div className="pc-an__bar-track" style={{ background: style.bg }}>
                  <div className="pc-an__bar-fill" style={{ width: `${SENT_TIER_PCT[r.tier]}%`, background: style.color }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="pc-an__insight">All platforms are performing well. Quality leads with the strongest sentiment coverage.</div>
        <div className="pc-an__details">Details</div>
      </div>
    </div>
  );
}

function PositionChartDemo() {
  const nike = PC_BRANDS.find((b) => b.isTarget);
  return (
    <div className="pc-demo">
      {/* Auto-playing loop, not a manual tab: cursor clicks Sony, the
          tooltip opens, then the card scrolls itself down to the Analysis
          view before resetting — see .pc-scroll__track's animation and the
          .visible gate at the bottom of the stylesheet section for when it
          actually plays. Each panel carries its own heading (rather than one
          shared static header above the scroll) so the heading changes with
          the panel — and, just as importantly, so there's real headroom
          above the chart for the tooltip to overflow into instead of
          clipping against .pc-scroll's edge. */}
      <div className="pc-scroll">
        <div className="pc-scroll__track">
          <div className="pc-panel pc-panel--position">
            <p className="pc-demo__title">Position vs Competitors</p>
            <p className="pc-demo__sub">Each dot is a brand you're tracked against.</p>
            <div className="pc-chart">
              {/* Clipped separately from .pc-chart so the tooltip below is free to
                  overflow the chart's rounded border — same as the real dashboard,
                  which renders its tooltip through a portal for exactly that reason. */}
              <div className="pc-quads">
                {PC_QUADRANTS.map((q) => (
                  <div key={q.key} className={`pc-quad pc-quad--${q.edge.replace(' ', '-') || 'none'}`}
                    style={{ top: `${q.top}%`, left: `${q.left}%`, background: q.bg }}>
                    <span className="pc-quad__label">{q.label}</span>
                  </div>
                ))}
              </div>
              {PC_BRANDS.map((b) => <PcDot key={b.id} brand={b} />)}

              <span className="pc-cursor" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M4 2l14 6.5-6 1.7-1.7 6L4 2z" fill="#0d111a" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
              </span>

              <div className="pc-tooltip">
                <span className="pc-tooltip__you">Your Brand</span>
                <p className="pc-tooltip__name">{nike.name}</p>
                <div className="pc-tooltip__row"><span>Visibility</span><span className="pc-tooltip__pill">90%</span></div>
                <div className="pc-tooltip__row"><span>Sentiment</span><span className="pc-tooltip__pill">Strong</span></div>
              </div>
            </div>

            <div className="pc-legend">
              <span>Low</span>
              <span className="pc-legend__mid">← Visibility →</span>
              <span>High</span>
            </div>

            <div className="pc-insight">
              <span className="pc-insight__icon">✦</span>
              <p><strong>Poli AI Insight:</strong> Sony holds #2 at 90% visibility with Strong sentiment, closing the gap on the leader is a content and source authority play.</p>
            </div>
          </div>

          <div className="pc-panel pc-panel--analysis">
            <PcAnalysis />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── AI Trust — Site Health Pipeline + Issues Overview + Robots.txt
   test, all in one static card (no scrolling). The only motion is the
   LLM crawler icons flowing rightward through the pipe. Own class
   namespace (.th-*), independent from card 01's .pc-*. ── */
// Trimmed to the 4 that fit one row (was 5, wrapping to a second row and
// adding height the card doesn't need) — kept ChatGPT/Claude/Gemini as the
// most-recognized, plus Perplexity since its "Blocked" status is the one
// worth surfacing.
const TH_CRAWLERS = [
  { name: 'ChatGPT', logo: 'chatgpt-com-logo.png', status: 'Allowed' },
  { name: 'Claude', logo: 'claudeai-com-logo.png', status: 'Allowed' },
  { name: 'Gemini', logo: 'gemini-ai-logo.png', status: 'Allowed' },
  { name: 'Perplexity', logo: 'perplexity-ai-logo.png', status: 'Blocked' },
];

/* ── Site Health Pipeline — ported from components/common/
   SiteHealthPipeline.tsx in poliris-frontend: same PIPELINE_CONFIG
   (1200×420 viewBox, stageWidth 400, centerY 210, half-width 15–180)
   and the same cumulative-taper bezier math, simplified to one flat
   fill instead of the real gradient/glow-filter build-up. ── */
const TH_PIPE = { width: 1200, height: 420, centerY: 210, stageWidth: 400, minHalf: 15, maxHalf: 180 };
const TH_STAGES = [
  { key: 'page_access', label: 'Page Access', value: 80 },
  { key: 'content_access', label: 'Content Access', value: 79 },
  { key: 'content_quality', label: 'Content Quality', value: 59 },
];
const TH_HEALTH_SCORE = Math.round(TH_STAGES.reduce((s, x) => s + x.value, 0) / TH_STAGES.length);
// Flows rightward through the pipe once per cycle (see .th-pipe__icon /
// @keyframes th-icon-flow), staggered a few tenths of a second apart so
// they arrive in succession rather than as one clump — all landed by
// ~38% of the shared cycle, well before the card slides to Issues/Robots
// at 45% (see TH_CYCLE_DURATION and .th-scroll below).
const TH_PIPE_ICONS = [
  { logo: 'mistral-ai-logo.png', top: '22%', startLeft: '2%' },
  { logo: 'chatgpt-com-logo.png', top: '38%', startLeft: '2%' },
  { logo: 'claudeai-com-logo.png', top: '22%', startLeft: '2%' },
  { logo: 'perplexity-ai-logo.png', top: '66%', startLeft: '2%' },
  { logo: 'grok-com-logo.png', top: '80%', startLeft: '2%' },
  { logo: 'gemini-ai-logo.png', top: '66%', startLeft: '2%' },
];
// Shared by the icon flow AND the panel slide (.th-scroll__track) so
// "icons finish, then it slides" stays true — kept as one constant
// rather than duplicated magic numbers in the CSS.
const TH_CYCLE_DURATION = 14; // seconds
const TH_ICON_STAGGER = 0.3; // seconds between each icon's start

function thCumulativeHalves() {
  const { minHalf, maxHalf } = TH_PIPE;
  const halves = [maxHalf];
  let cumulative = 1;
  for (const stage of TH_STAGES) {
    cumulative *= stage.value / 100;
    halves.push(minHalf + cumulative * (maxHalf - minHalf));
  }
  return halves;
}

function thMasterPath(halves) {
  const { centerY, stageWidth } = TH_PIPE;
  const [h0, h1, h2, h3] = halves;
  const x = [0, stageWidth, stageWidth * 2, stageWidth * 3];
  const top = (h) => centerY - h, bot = (h) => centerY + h;
  const taperTop = (xa, xb, ha, hb) => { const m = (xa + xb) / 2; return `C ${m} ${top(ha)}, ${m} ${top(hb)}, ${xb} ${top(hb)}`; };
  const taperBot = (xa, xb, ha, hb) => { const m = (xa + xb) / 2; return `C ${m} ${bot(hb)}, ${m} ${bot(ha)}, ${xa} ${bot(ha)}`; };
  return [
    `M ${x[0]} ${top(h0)}`, taperTop(x[0], x[1], h0, h1), taperTop(x[1], x[2], h1, h2), taperTop(x[2], x[3], h2, h3),
    `L ${x[3]} ${bot(h3)}`, taperBot(x[2], x[3], h2, h3), taperBot(x[1], x[2], h1, h2), taperBot(x[0], x[1], h0, h1), 'Z',
  ].join(' ');
}

function thEdgePath(halves, side, inset) {
  const { centerY, stageWidth } = TH_PIPE;
  const ih = halves.map((h) => Math.max(0, h - inset));
  const [h0, h1, h2, h3] = ih;
  const x = [0, stageWidth, stageWidth * 2, stageWidth * 3];
  const d = side === 'top' ? -1 : 1;
  const y = (h) => centerY + d * h;
  const tp = (xa, xb, ha, hb) => { const m = (xa + xb) / 2; return `C ${m} ${y(ha)}, ${m} ${y(hb)}, ${xb} ${y(hb)}`; };
  return [`M ${x[0]} ${y(h0)}`, tp(x[0], x[1], h0, h1), tp(x[1], x[2], h1, h2), tp(x[2], x[3], h2, h3)].join(' ');
}

function ThPipelinePanel() {
  const halves = thCumulativeHalves();
  const { width, height, centerY, stageWidth } = TH_PIPE;
  const masterPath = thMasterPath(halves);
  const ringR = 26, ringC = 2 * Math.PI * ringR;
  // The first stage under the "healthy" threshold (70) is the bottleneck —
  // Content Quality at 59 — everything after it inherits the constraint,
  // but here it's also the last stage, so it just gets the warning badge.
  const limitingIndex = TH_STAGES.findIndex((s) => s.value < 70);
  const stageCenterX = (i) => stageWidth * i + stageWidth / 2;
  const stageAnchorY = (i) => centerY - (halves[i] + halves[i + 1]) / 2 - 18;
  const pct = (svgX, svgY) => ({ left: `${(svgX / width) * 100}%`, top: `${(svgY / height) * 100}%` });

  return (
    <div className="th-pipe">
      <div className="th-pipe__hdr">
        <div>
          <p className="pc-demo__title">Site Health Pipeline</p>
        </div>
        <div className="th-pipe__score">
          <div className="th-pipe__score-text">
            <span className="th-pipe__score-lbl">Health Score</span>
            <span className="th-pipe__score-hint">Across the 3 stages</span>
          </div>
          <div className="th-pipe__ring">
            <svg viewBox="0 0 64 64" width="64" height="64" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="32" cy="32" r={ringR} fill="none" stroke="#E2E8F0" strokeWidth="5" />
              <circle
                cx="32" cy="32" r={ringR} fill="none" stroke="#1F3EA8" strokeWidth="5" strokeLinecap="round"
                strokeDasharray={ringC}
                className="th-pipe__ring-fill"
                style={{ '--ring-c': ringC, '--ring-offset': ringC - (ringC * TH_HEALTH_SCORE) / 100 }}
              />
            </svg>
            <span className="th-pipe__ring-val">{TH_HEALTH_SCORE}%</span>
          </div>
        </div>
      </div>

      <div className="th-pipe__wrap">
        <svg viewBox={`0 0 ${width} ${height}`} className="th-pipe__svg" preserveAspectRatio="none">
          <line x1={stageWidth} y1={24} x2={stageWidth} y2={height - 24} stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 6" />
          <line x1={stageWidth * 2} y1={24} x2={stageWidth * 2} y2={height - 24} stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 6" />
          <path d={masterPath} fill="#2563EB" fillOpacity="0.9" />
          <path d={thEdgePath(halves, 'top', 14)} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="6 8" strokeLinecap="round" />
          <path d={thEdgePath(halves, 'bottom', 14)} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="6 8" strokeLinecap="round" />
        </svg>

        {TH_PIPE_ICONS.map((ic, i) => (
          <div
            key={ic.logo}
            className="th-pipe__icon"
            style={{
              top: ic.top,
              '--start-left': ic.startLeft,
              '--end-left': '93%',
              animationDuration: `${TH_CYCLE_DURATION}s`,
              animationDelay: `${TH_ICON_STAGGER * i}s`,
            }}
          >
            <img src={`${import.meta.env.BASE_URL}${ic.logo}`} alt="" />
          </div>
        ))}

        {limitingIndex !== -1 && (
          <div className="th-pipe__badge th-pipe__badge--warn" style={pct(stageCenterX(limitingIndex), stageAnchorY(limitingIndex))}>
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Low content quality
          </div>
        )}

        {TH_STAGES.map((stage, i) => (
          <div key={stage.key} className="th-pipe__pill" style={pct(stageCenterX(i), centerY)}>
            <span className="th-pipe__pill-lbl">{stage.label}</span>
            <span className="th-pipe__pill-val">{stage.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const TH_ISSUE_TOTAL = 735;
// Full severity split — drives the segmented bar, which stays accurate
// even though the row list below only surfaces the two that matter.
const TH_ISSUE_SEVERITIES = [
  { label: 'Critical', count: 115, cls: 'critical' },
  { label: 'Warning', count: 466, cls: 'warning' },
  { label: 'Notice', count: 154, cls: 'notice' },
];
// Trimmed row list: Critical + Warning are the two worth a line each;
// Notice is the least urgent and dropped to keep the card shorter.
const TH_ISSUE_TOP_ROWS = TH_ISSUE_SEVERITIES.filter((r) => r.cls !== 'notice');
// The one issue this card actually fixes — a real Content Quality gap
// (ties back to the pipeline slide's own "Low content quality" bottleneck
// at 59%, not a random pick) that Poliris can pixel-deploy live without a
// developer, matching the real "Deploy" action in the app's Technical
// Audit → Roadmap flow (deployCorrection, see
// agent/projects/[planId]/initiative/[id]/page.tsx in poliris-frontend).
const TH_FIX_ISSUE = { name: 'Missing Product schema markup', page: 'sony.com/t/wf-1000xm5-earbuds' };

function ThIssuesPanel() {
  const [count, setCount] = useState(0);
  const numRef = useRef(null);
  const wrapRef = useRef(null);
  const deployBtnRef = useRef(null);
  const [cursor, setCursor] = useState(null);
  // Same hover-lift-then-click beat as cards 04/05, applied to the one
  // fixable issue: zoomed = lifted/focused, deployPhase carries it through
  // to the actual state change ("suggested" → "deploying" → "live").
  const [zoomed, setZoomed] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [deployPhase, setDeployPhase] = useState('idle'); // idle | deploying | live

  // Counts up once, the moment this number scrolls into the viewport —
  // a small "something happened" beat that doesn't depend on any
  // scroll/cycle mechanic, just a plain reveal.
  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const duration = 1100;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - p) ** 3;
          setCount(Math.round(TH_ISSUE_TOTAL * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The Deploy sequence — this card's slide swap is pure CSS
  // (.th-scroll__track's @keyframes th-scroll-move, ~14s/cycle, slide 2
  // visible from 50%–85% i.e. roughly 7s–11.9s in), so rather than rebuild
  // that as React state, this effect times its own loop to land inside
  // that same visible window: waits ~7.3s for slide 2 to be the one
  // showing, then repeats every full cycle. Critically, its own t=0 is
  // pinned to the exact moment .engine-row__visual gets .visible (below)
  // — the same class-toggle that unpauses the CSS animation itself — so
  // the two clocks can't drift apart the way two independent observers
  // eventually do.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let timers = [];
    let started = false;
    const after = (ms, fn) => { timers.push(setTimeout(fn, ms)); };

    function cursorAt(risen) {
      const btn = deployBtnRef.current;
      if (!btn) return null;
      return {
        left: btn.offsetLeft + btn.offsetWidth / 2,
        top: btn.offsetTop + btn.offsetHeight / 2 + (risen ? 0 : 18),
        risen,
      };
    }

    function runSequence() {
      setCursor(null); setZoomed(false); setClicked(false); setDeployPhase('idle');
      after(600, () => setCursor(cursorAt(false)));
      after(1000, () => setCursor(cursorAt(true)));
      after(1250, () => setZoomed(true));
      after(1800, () => setClicked(true));
      after(2050, () => { setDeployPhase('deploying'); setCursor(null); });
      after(3200, () => setDeployPhase('live'));
    }

    function start() {
      if (started) return;
      started = true;
      // Scheduled against a fixed absolute anchor, not a chained
      // setTimeout(fn, 14000) — a chain only guarantees "at least" 14000ms
      // per hop, and the handful of ms of event-loop/scheduling slack each
      // hop adds is invisible for a lap or two but keeps accumulating.
      // The CSS animation runs on the compositor and never drifts, so by
      // lap 3+ the JS side has fallen behind enough to blow past the
      // 100ms safety margin below and land after slide 2 is already
      // visible — showing the previous lap's stale "Live" again. Recomputing
      // the delay from the anchor on every lap self-corrects instead of
      // compounding.
      //
      // First target is 6900ms, not 7000/7300: slide 2 (Issues Overview)
      // actually becomes visible at t=7000 in the CSS cycle, and the
      // reset-to-idle has to land strictly *before* that on every lap —
      // landing after leaves the previous lap's "Live" state showing for
      // the gap, since deployPhase only starts at 'idle' by default on the
      // very first lap.
      const anchor = performance.now() + 6900;
      let lap = 0;
      function scheduleNext() {
        const delay = Math.max(0, anchor + lap * 14000 - performance.now());
        timers.push(setTimeout(() => {
          runSequence();
          lap += 1;
          scheduleNext();
        }, delay));
      }
      scheduleNext();
    }

    // Sync to the exact same signal that unpauses .th-scroll__track's own
    // CSS animation (.engine-row__visual.reveal.visible), not a separate
    // IntersectionObserver on this element — two independent triggers
    // drift apart over time, landing "live" outside slide 2's visible
    // window instead of the click actually happening on-screen.
    const visualEl = el.closest('.engine-row__visual');
    let mo;
    if (visualEl?.classList.contains('visible')) {
      start();
    } else if (visualEl) {
      mo = new MutationObserver(() => {
        if (visualEl.classList.contains('visible')) start();
      });
      mo.observe(visualEl, { attributes: true, attributeFilter: ['class'] });
    }

    return () => { mo?.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  const isLive = deployPhase === 'live';
  const displayCount = isLive ? count - 1 : count;

  return (
    <div className="th-inner" ref={wrapRef}>
      <div className="th-box-hdr">
        <div>
          <p className="pc-demo__title">Issues Overview</p>
          <p className="pc-demo__sub">Problems found across all pages</p>
        </div>
        <span className="th-needs-work">Needs Work</span>
      </div>
      <div className="th-issues-big" ref={numRef}>{displayCount}<span>issues</span></div>
      <div className="th-issues-bar">
        {TH_ISSUE_SEVERITIES.map((r) => (
          <span key={r.label} className={`th-issues-bar-seg th-issues-bar-seg--${r.cls}`} style={{ width: `${Math.round((r.count / TH_ISSUE_TOTAL) * 100)}%` }} />
        ))}
      </div>
      <div className="th-issues-rows">
        {TH_ISSUE_TOP_ROWS.map((r) => (
          <div key={r.label} className="th-issues-row">
            <span className={`th-dot th-dot--${r.cls}`} />
            <span className="th-issues-label">{r.label}</span>
            <span className="th-issues-count">{r.count}</span>
            <span className="th-issues-pct">{Math.round((r.count / TH_ISSUE_TOTAL) * 100)}%</span>
          </div>
        ))}
      </div>

      {/* The one issue this demo actually fixes, singled out from the pile —
          a real, deployable correction, not just another line in the count. */}
      <div className={`th-fix${zoomed ? ' th-fix--zoomed' : ''}${zoomed && clicked && deployPhase === 'idle' ? ' th-fix--pulse' : ''}`}>
        <div className="th-fix__info">
          <span className="th-fix__badge">Content Quality</span>
          <span className="th-fix__name">{TH_FIX_ISSUE.name}</span>
          <span className="th-fix__page">{TH_FIX_ISSUE.page}</span>
        </div>
        {deployPhase === 'live' ? (
          <span className="th-fix__status th-fix__status--live">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            Live
          </span>
        ) : deployPhase === 'deploying' ? (
          <span className="th-fix__status th-fix__status--deploying">
            <span className="th-fix__spinner" />
            Deploying…
          </span>
        ) : (
          <span className="th-deploy-btn" ref={deployBtnRef}>
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m14.7 6.3 3 3L19 8l-3-3zM3 21l3.5-1L17 9.5l-2.5-2.5L4 17.5z"/></svg>
            Deploy
          </span>
        )}
        {cursor && (
          <div className={`cg-cursor${cursor.risen ? ' cg-cursor--risen' : ''}`} style={{ left: cursor.left, top: cursor.top }}>
            <svg viewBox="0 0 24 24" fill="#18181B" width="14" height="14"><path d="M5 3l14 8-6 2-2 6-6-16z"/></svg>
            {clicked && <span className="cg-cursor__ripple" />}
          </div>
        )}
      </div>

      <a className="th-link" href="#">View details <span>→</span></a>
    </div>
  );
}

function ThRobotsPanel() {
  return (
    <div className="th-inner">
      <div className="th-robots-head">
        <div>
          <p className="pc-demo__title">Robots.txt test</p>
          <p className="pc-demo__sub">What AI engines can and can't crawl</p>
        </div>
        <div className="th-robots-score">
          <span className="th-robots-score-num">80<span>/100</span></span>
          <span className="th-pass-pill">Passed</span>
        </div>
      </div>
      <div className="th-robots-bar">
        <span className="th-robots-bar-seg th-robots-bar-seg--allowed" style={{ width: '93%' }} />
        <span className="th-robots-bar-seg th-robots-bar-seg--blocked" style={{ width: '7%' }} />
      </div>
      <div className="th-robots-legend">
        <span><i className="th-dot th-dot--blue" />Pages allowed</span>
        <span><i className="th-dot th-dot--red" />Pages blocked</span>
      </div>
      <p className="th-label">AI Crawler Access</p>
      <div className="th-crawlers">
        {TH_CRAWLERS.map((c) => (
          <div key={c.name} className={`th-crawler${c.status === 'Blocked' ? ' th-crawler--blocked' : ''}`}>
            <img src={`${import.meta.env.BASE_URL}${c.logo}`} alt="" />
            <span className="th-crawler__name">{c.name}</span>
            <span className={`th-crawler__status th-crawler__status--${c.status.toLowerCase()}`}>{c.status}</span>
          </div>
        ))}
      </div>
      <div className="th-robots-actions">
        <span className="th-btn th-btn--ghost">View robots.txt</span>
        <span className="th-btn th-btn--solid">View full report</span>
      </div>
    </div>
  );
}

function EngineTrustCard() {
  return (
    <div className="th-scroll">
      <div className="th-scroll__track">
        <div className="th-slide">
          <div className="th-box th-box--pipeline"><ThPipelinePanel /></div>
        </div>
        <div className="th-slide">
          <div className="th-box th-box--split">
            <div className="th-col"><ThIssuesPanel /></div>
            <div className="th-divider" />
            <div className="th-col"><ThRobotsPanel /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Roadmap Plan — Calendar / Board, ported from the real planner's
   Calendar+Board switch (content-planner/planner-view.tsx). Two slides,
   same horizontal auto-slide mechanic as card 02 (.rm-* namespace). ── */
const RM_TYPE_BADGE = {
  fix: { label: 'Fix', cls: 'rm-badge--fix' },
  backlink: { label: 'Backlink', cls: 'rm-badge--backlink' },
  content: { label: 'Content', cls: 'rm-badge--content' },
};

function RmCard({ title, type, dimmed, infoRef }) {
  const badge = RM_TYPE_BADGE[type];
  return (
    <div className={`rm-card${dimmed ? ' rm-card--dimmed' : ''}`}>
      <div className="rm-card__top">
        <span className="rm-card__dot" />
        <span className={`rm-badge ${badge.cls}`}>{badge.label}</span>
        <span className="rm-card__info" ref={infoRef}>?</span>
        <span className="rm-card__x">×</span>
      </div>
      <p className="rm-card__title">{title}</p>
    </div>
  );
}

const RM_CAL_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
// Two weeks (Aug 24–Sep 6) — enough to show the "today" marker and both
// task days without rendering a whole 5-week grid.
const RM_CAL_WEEKS = [
  [24, 25, 26, 27, 28, 29, 30],
  [31, 1, 2, 3, 4, 5, 6],
];
const RM_DRAGGED_CARD = { title: 'Resolve Canonical Conflict Between Running and Pegasus Pages', type: 'fix' };
// Static cards, minus the one that actually moves (see RM_DRAGGED_CARD /
// useRmDrag below) — that one is placed by day from `owner` state instead,
// so Aug 25 and Aug 26 genuinely gain/lose a row and reflow, rather than
// just showing a floating duplicate on top of a fixed layout.
const RM_CAL_STATIC_CARDS = {
  25: [{ title: 'Add Canonical Category Pages to XML Sitemap', type: 'fix' }],
  1: [
    { title: 'Add ItemList Schema to Wireless Earbuds Category Page', type: 'fix' },
    { title: 'Rewrite Page Titles and Meta Descriptions for Philippine Market', type: 'fix' },
  ],
};
// Column geometry for the drag demo — MON is column 0, so Aug 25 (TUE) is
// column 1 and Aug 26 (WED) is column 2, out of the calendar's 7 equal
// columns.
const RM_COL_PCT = 100 / 7;
const RM_DAY_LEFT = { 25: `calc(${RM_COL_PCT * 1}% + 2px)`, 26: `calc(${RM_COL_PCT * 2}% + 2px)` };

// Drives the "drag a card to a new date" loop: `owner` is which day's cell
// actually holds RM_DRAGGED_CARD in the real layout (so the grid reflows
// the moment it arrives), `flight` is the floating ghost's state while
// it's between cells. Starts only once the calendar has actually scrolled
// into view, then repeats on a ~7.6s cycle: lift → fly → hold 2.5s at the
// new date → lift → fly back → hold at rest → repeat.
function useRmDrag(rootRef) {
  const [owner, setOwner] = useState(25);
  const [flight, setFlight] = useState(null); // null | { from, to?, lifted }

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let timers = [];
    const after = (ms, fn) => { timers.push(setTimeout(fn, ms)); };

    function cycle() {
      after(500, () => setFlight({ from: 25 }));
      after(900, () => setFlight({ from: 25, to: 26 }));
      after(900 + 800, () => { setOwner(26); setFlight(null); });
      after(900 + 800 + 2500, () => setFlight({ from: 26 }));
      after(900 + 800 + 2500 + 400, () => setFlight({ from: 26, to: 25 }));
      after(900 + 800 + 2500 + 400 + 800, () => { setOwner(25); setFlight(null); });
      after(900 + 800 + 2500 + 400 + 800 + 1200, cycle);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        cycle();
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => { observer.disconnect(); timers.forEach(clearTimeout); };
  }, [rootRef]);

  return { owner, flight };
}

function RmCalendarPanel() {
  const rootRef = useRef(null);
  const { owner, flight } = useRmDrag(rootRef);

  // The dragged card renders as a genuine member of whichever day's list
  // currently owns it — not an overlay on top of a fixed layout — so Aug
  // 25 and Aug 26 actually gain/lose a row and the grid reflows for real.
  const cardsForDay = (day) => {
    const rest = RM_CAL_STATIC_CARDS[day] || [];
    if (day !== owner) return rest;
    return [{ ...RM_DRAGGED_CARD, dimmed: flight !== null }, ...rest];
  };

  return (
    <>
      <div className="rm-cal-dow-row">
        {RM_CAL_DAYS.map((d) => <div key={d} className="rm-cal-dow">{d}</div>)}
      </div>
      <div className="rm-cal-grid" ref={rootRef}>
        {RM_CAL_WEEKS.flat().map((day, i) => (
          <div key={i} className={`rm-cal-cell${day === 24 ? ' rm-cal-cell--today' : ''}`}>
            <span className={`rm-cal-daynum${day === 24 ? ' rm-cal-daynum--today' : ''}`}>{day}</span>
            <div className="rm-cal-cards">
              {cardsForDay(day).map((c) => <RmCard key={c.title} {...c} />)}
            </div>
          </div>
        ))}

        {/* The floating ghost + cursor only exist while airborne (flight
            !== null) — .rm-drag-ghost's `left` transitions between
            RM_DAY_LEFT[from] and RM_DAY_LEFT[to] on re-render, giving the
            actual flight motion; the real card swap happens the instant
            it lands (see useRmDrag), so nothing pops. */}
        {flight && (
          <>
            <div className="rm-drag-ghost" style={{ left: RM_DAY_LEFT[flight.to ?? flight.from] }}>
              <RmCard {...RM_DRAGGED_CARD} />
            </div>
            <span className="rm-drag-cursor" aria-hidden="true" style={{ left: RM_DAY_LEFT[flight.to ?? flight.from] }}>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M4 2l14 6.5-6 1.7-1.7 6L4 2z" fill="#0d111a" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
            </span>
          </>
        )}
      </div>
    </>
  );
}

const RM_BOARD_WEEKS = [
  { label: 'Week 1', range: 'Aug 24 – Aug 30', cards: [
    { title: 'Resolve Canonical Conflict Between Earbuds and Headphones Pages', type: 'fix' },
    { title: 'Add Canonical Category Pages to XML Sitemap', type: 'fix' },
  ] },
  { label: 'Week 2', range: 'Aug 31 – Sep 6', cards: [
    { title: 'Add ItemList Schema to Wireless Earbuds Category Page', type: 'fix' },
    { title: 'Rewrite Page Titles and Meta Descriptions for Philippine Market', type: 'fix' },
  ] },
  { label: 'Week 3', range: 'Sep 7 – Sep 13', cards: [
    { title: 'Restructure Header Hierarchy on the Wireless Earbuds Hub', type: 'fix' },
    { title: 'Improve Core Web Vitals on High-Traffic Category Pages', type: 'fix' },
  ] },
  { label: 'Week 4', range: 'Sep 14 – Sep 20', cards: [
    { title: 'Implement Product and FAQ Schema on the WF-1000XM5 Page', type: 'fix' },
    { title: 'Secure a Sony Philippines Link on SoundGuys', type: 'backlink' },
  ] },
];

const RM_HOVER_TIP = "Ensure a single H1 names the product category and supporting H2s map to key performance axes (noise cancellation, call clarity, battery life) so crawlers and LLMs read a clear topical outline rather than product-image titles.";
const RM_CURSOR_RISE = 44; // px the cursor starts below the icon before rising into it

// Auto-plays once Board is open: cursor rises from below into the "?" on
// one card, hovers it, the rationale tooltip fades in, holds, fades out,
// repeat. Real DOM measurement (not guessed percentages) — the board's
// columns are flex, not a fixed grid, so the icon's on-screen position is
// read straight off the element instead of estimated.
function useRmHover(boardRef, iconRef) {
  const [iconPos, setIconPos] = useState(null);
  const [visible, setVisible] = useState(false); // cursor on screen at all
  const [risen, setRisen] = useState(false);     // cursor has risen into the icon
  const [hover, setHover] = useState(false);     // tooltip open

  useEffect(() => {
    const boardEl = boardRef.current;
    if (!boardEl) return;
    let timers = [];
    let cancelled = false;
    const after = (ms, fn) => { timers.push(setTimeout(() => { if (!cancelled) fn(); }, ms)); };

    function measure() {
      if (!iconRef.current || !boardRef.current) return;
      const iconRect = iconRef.current.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();
      setIconPos({
        left: iconRect.left - boardRect.left + iconRect.width / 2,
        top: iconRect.top - boardRect.top + iconRect.height / 2,
      });
    }

    function cycle() {
      measure();
      setRisen(false);
      after(10, () => setVisible(true));        // cursor fades in, low, below the icon
      after(500, () => setRisen(true));         // then rises up into it (~900ms transition)
      after(1450, () => setHover(true));        // arrived — open the tooltip
      after(1450 + 2800, () => setHover(false));
      after(1450 + 2800 + 500, () => { setVisible(false); setRisen(false); });
      after(1450 + 2800 + 500 + 700, cycle);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        cycle();
      },
      { threshold: 0.3 },
    );
    observer.observe(boardEl);
    return () => { observer.disconnect(); cancelled = true; timers.forEach(clearTimeout); };
  }, [boardRef, iconRef]);

  return { iconPos, visible, risen, hover };
}

function RmBoardPanel() {
  const boardRef = useRef(null);
  const iconRef = useRef(null);
  const { iconPos, visible, risen, hover } = useRmHover(boardRef, iconRef);
  const cursorPos = iconPos && { left: iconPos.left, top: iconPos.top + (risen ? 0 : RM_CURSOR_RISE) };

  return (
    <>
      <div className="rm-board" ref={boardRef}>
        {RM_BOARD_WEEKS.map((w, wi) => (
          <div key={w.label} className="rm-board__col">
            <div className="rm-board__hdr">
              <span className="rm-board__wk">{w.label}</span>
              <span className="rm-board__range">{w.range}</span>
            </div>
            {w.cards.map((c, ci) => (
              <RmCard key={c.title} {...c} infoRef={wi === 2 && ci === 0 ? iconRef : undefined} />
            ))}
          </div>
        ))}

        {visible && cursorPos && (
          <span className="rm-hover-cursor rm-hover-cursor--show" style={cursorPos} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M4 2l14 6.5-6 1.7-1.7 6L4 2z" fill="#0d111a" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </span>
        )}
        {iconPos && (
          <div className={`rm-hover-tip${hover ? ' rm-hover-tip--show' : ''}`} style={iconPos}>
            {RM_HOVER_TIP}
          </div>
        )}
      </div>
      <div className="rm-board__scrollbar"><span /></div>
    </>
  );
}

function EngineRoadmapCard() {
  const [view, setView] = useState('calendar');
  return (
    <div className="th-box">
      <div className="rm-inner">
        <div className="rm-cal-hdr">
          <div className="rm-toggle">
            <button type="button" className={`rm-toggle__opt${view === 'calendar' ? ' rm-toggle__opt--active' : ''}`} onClick={() => setView('calendar')}>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Calendar
            </button>
            <button type="button" className={`rm-toggle__opt${view === 'board' ? ' rm-toggle__opt--active' : ''}`} onClick={() => setView('board')}>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="5" height="18" rx="1" /><rect x="10" y="3" width="5" height="11" rx="1" /><rect x="17" y="3" width="5" height="15" rx="1" />
              </svg>
              Board
            </button>
          </div>
          {view === 'calendar' && (
            <div className="rm-cal-nav">
              <span className="rm-cal-month">August 2026</span>
            </div>
          )}
        </div>
        {view === 'calendar' ? <RmCalendarPanel /> : <RmBoardPanel />}
      </div>
    </div>
  );
}

/* ---------- Card 05 · Build Trust Across the Web — Backlinks & Citations ----------
   Ported from poliris-frontend's SourceIntelligenceBacklinksModal.tsx: same
   column layout, category colors (review/retail from CATEGORY_CONFIG) and
   citation-status pill treatment, condensed to fit the compact card width.
   Fixture rows are the real run's first 13 domains. ── */
const CIT_CATEGORY = { review: '#f97316', retail: '#8b5cf6' };
const CIT_CATEGORY_LABEL = { review: 'Review', retail: 'Retail' };
const CIT_STATUS = {
  mention:    { label: 'Mention',    bg: '#FEF3C7', fg: '#B45309' },
  unverified: { label: 'Unverified', bg: '#F3F4F6', fg: '#6B7280' },
  uncited:    { label: 'Uncited',    bg: '#FEE2E2', fg: '#DC2626' },
  pending:    { label: 'Pending',    bg: '#DBEAFE', fg: '#2563EB' },
};
const CIT_COMPETITOR_PALETTE = [
  { fg: '#0EA5E9', bg: '#E0F2FE' },
  { fg: '#8B5CF6', bg: '#EDE9FE' },
  { fg: '#16A34A', bg: '#DCFCE7' },
  { fg: '#DB2777', bg: '#FCE7F3' },
  { fg: '#D97706', bg: '#FEF3C7' },
  { fg: '#0D9488', bg: '#CCFBF1' },
  { fg: '#DC2626', bg: '#FEE2E2' },
  { fg: '#4F46E5', bg: '#E0E7FF' },
];
function citCompetitorColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return CIT_COMPETITOR_PALETTE[h % CIT_COMPETITOR_PALETTE.length];
}
const CIT_ROWS = [
  { domain: 'whatnotsell.com', url: 'https://www.whatnotsell.com/guides/best-wireless-earbuds-2026?utm_source=openai', cat: 'review', authority: false, citation: 'mention', competitors: ['Apple', 'Samsung', 'Bose', 'Anker'], buy: false },
  { domain: 'rtings.com', url: 'https://www.rtings.com/earbuds/reviews/best/wireless', cat: 'review', authority: false, citation: 'mention', competitors: ['Xiaomi', 'Samsung', 'Bose', 'JBL', 'Anker', 'Sennheiser', 'Beats', 'Skullcandy'], buy: false },
  { domain: 'androidauthority.com', url: 'https://www.androidauthority.com/best-wireless-earbuds/', cat: 'review', authority: false, citation: 'unverified', competitors: [], buy: false },
  { domain: 'soundguys.com', url: 'https://www.soundguys.com/best-wireless-earbuds-2026', cat: 'review', authority: false, citation: 'mention', competitors: ['Apple', 'Samsung', 'Bose', 'JBL', 'Sennheiser', 'Beats', 'Google', 'Xiaomi', 'Skullcandy', 'Anker'], buy: false },
  { domain: 'techradar.com', url: 'https://www.techradar.com/audio/wireless-and-bluetooth-speakers/best-wireless-earbuds', cat: 'review', authority: false, citation: 'mention', competitors: ['Xiaomi', 'Apple', 'Samsung', 'Anker', 'Bose', 'JBL', 'Skullcandy', 'Beats', 'Sennheiser', 'Google'], buy: false },
  { domain: 'gadgetreview.com', url: 'https://gadgetreview.com/audio/best-wireless-earbuds', cat: 'review', authority: false, citation: 'uncited', competitors: ['Xiaomi', 'Apple', 'Bose', 'Anker', 'Sennheiser', 'Google'], buy: true },
  { domain: 'amazon.com', url: 'https://www.amazon.com/best-sellers-wireless-earbuds/s?k=wireless+earbuds', cat: 'retail', authority: true, citation: 'mention', competitors: ['Xiaomi', 'Apple', 'Samsung', 'Anker', 'Bose', 'JBL', 'Sennheiser', 'Beats', 'Skullcandy', 'Google'], buy: false },
  { domain: 'fnac.com', url: 'https://www.fnac.com/Ecouteurs-sans-fil-Bluetooth/shi192557/w-4', cat: 'retail', authority: false, citation: 'uncited', competitors: ['Apple', 'Bose', 'JBL', 'Sennheiser', 'Anker', 'Beats', 'Google'], buy: false },
  { domain: 'themintcompany.com', url: 'https://www.themintcompany.com/es/sony/48115-198264-sony-wf-1000xm5-negro.html?utm_source=openai', cat: 'retail', authority: false, citation: 'unverified', competitors: [], buy: false },
  { domain: 'sweatpicks.com', url: 'https://sweatpicks.com/best-earbuds-for-the-gym/?utm_source=openai', cat: 'retail', authority: false, citation: 'mention', competitors: ['Apple', 'Anker', 'Beats'], buy: false },
  { domain: 'styleguru.org', url: 'https://styleguru.org/vetted/14-best-wireless-earbuds-in-2026/', cat: 'retail', authority: false, citation: 'mention', competitors: ['Anker'], buy: false },
  { domain: 'richersounds.com', url: 'https://www.richersounds.com/headphones/wireless-earbuds.html', cat: 'retail', authority: false, citation: 'uncited', competitors: ['Bose', 'Anker'], buy: false },
  { domain: 'teknosa.com', url: 'https://www.teknosa.com/kablosuz-kulaklik-c-116', cat: 'retail', authority: false, citation: 'mention', competitors: ['Xiaomi', 'Samsung', 'Apple', 'JBL', 'Beats', 'Anker'], buy: false },
];

function CitChip({ name }) {
  const { fg, bg } = citCompetitorColor(name);
  return <span className="cit-chip" style={{ color: fg, background: bg }}>{name}</span>;
}

function CitRow({ row, buyBtnRef, buyClicked, buyZoomed }) {
  const shown = row.competitors.slice(0, 3);
  const extra = row.competitors.length - shown.length;
  const catColor = CIT_CATEGORY[row.cat];
  // The "action" of this card, not just its data: once the auto-play cursor
  // clicks Buy on the one uncited/opportunity row, that row's own citation
  // status flips from "Uncited" to "Pending" — showing what the button
  // actually does, not just that it exists.
  const citationKey = row.buy && buyClicked ? 'pending' : row.citation;
  // Same hover-lift beat as card 04's idea cards, applied to the whole row:
  // it pops toward the viewer before the click lands, so "Buy" reads as a
  // deliberate pick, not an instant jump.
  const zoomed = row.buy && buyZoomed;
  return (
    <div className={`cit-row${zoomed ? ' cit-row--zoomed' : ''}${zoomed && buyClicked ? ' cit-row--pulse' : ''}`}>
      <div className="cit-col cit-col--source">
        <div className="cit-source-top">
          <span className="cit-favicon" style={{ background: `${catColor}1a`, color: catColor }}>
            <span className="cit-favicon__fallback">{row.domain[0].toUpperCase()}</span>
            <img
              src={`https://www.google.com/s2/favicons?sz=64&domain=${row.domain}`}
              alt=""
              className="cit-favicon__img"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </span>
          <span className="cit-domain">{row.domain}</span>
        </div>
        <span className="cit-url">{row.url}</span>
      </div>
      <div className="cit-col cit-col--cat">
        <span className="cit-pill" style={{ color: catColor, background: `${catColor}1a` }}>{CIT_CATEGORY_LABEL[row.cat]}</span>
      </div>
      <div className="cit-col cit-col--auth">
        <span className={`cit-pill${row.authority ? ' cit-pill--high' : ' cit-pill--muted'}`}>{row.authority ? 'High' : 'No'}</span>
      </div>
      <div className="cit-col cit-col--yours">
        <span className="cit-pill cit-pill--status" style={{ color: CIT_STATUS[citationKey].fg, background: CIT_STATUS[citationKey].bg }}>{CIT_STATUS[citationKey].label}</span>
      </div>
      <div className="cit-col cit-col--comp">
        {row.competitors.length ? (
          <div className="cit-chips">
            {shown.map((n) => <CitChip key={n} name={n} />)}
            {extra > 0 && <span className="cit-chip cit-chip--more">+{extra}</span>}
          </div>
        ) : <span className="cit-dash">–</span>}
      </div>
      <div className="cit-col cit-col--opp">
        {row.buy ? (
          buyClicked ? (
            <span className="cit-buy cit-buy--done">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="9" height="9"><path d="M20 6 9 17l-5-5"/></svg>
              Sent
            </span>
          ) : (
            <span className="cit-buy" ref={buyBtnRef}>Buy</span>
          )
        ) : <span className="cit-dash">–</span>}
      </div>
    </div>
  );
}

// The page Buy actually opens — ported from the real Acquire Citation
// screen, trimmed to the one matched opportunity (gadgetreview.com) instead
// of a full paginated list, since that's the only row this card's demo ever
// buys.
function CitAcquirePanel() {
  return (
    <div className="cit-acq">
      <div className="cit-acq__hdr">
        <div className="cit-acq__title">
          Acquire Citation
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <span className="cit-acq__brand">Sony</span>
        </div>
        <div className="cit-acq__sub">Discover guest-post and link-placement opportunities matched to your site and target keyword.</div>
      </div>

      <div className="cit-acq__panel">
        <div className="cit-acq__panel-hdr">
          <div>
            <div className="cit-acq__panel-title">Citation Opportunities</div>
            <div className="cit-acq__panel-sub">Auto-compiled from backlinks &amp; citations. Excludes domains that already link to your site.</div>
          </div>
          <div className="cit-acq__controls">
            <span className="cit-acq__sync">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="9" height="9"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
              Sync
            </span>
            <span className="cit-acq__search">gadgetreview.com</span>
          </div>
        </div>
        <div className="cit-acq__status-row">
          <span className="cit-acq__status cit-acq__status--found">Found 1</span>
          <span className="cit-acq__status">Not found 0</span>
          <span className="cit-acq__status cit-acq__status--muted">Blacklisted 0</span>
          <span className="cit-acq__status cit-acq__status--muted">Checking 0</span>
        </div>
        <div className="cit-acq__table">
          <div className="cit-acq__thead">
            <span>Domain</span><span>Category</span><span>DR</span><span>Authority</span><span>Backlinks</span><span>Type</span><span>Price</span>
          </div>
          <div className="cit-acq__row">
            <span className="cit-acq__domain">
              <svg viewBox="0 0 24 24" fill="#16A34A" width="10" height="10"><circle cx="12" cy="12" r="10"/></svg>
              gadgetreview.com
            </span>
            <span className="cit-pill" style={{ color: CIT_CATEGORY.review, background: `${CIT_CATEGORY.review}1a` }}>Review</span>
            <span>77</span>
            <span>54</span>
            <span>316K</span>
            <span>Guest Post</span>
            <span className="cit-acq__price">$12,880</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Auto-play tells the actual story of the widget: scroll down to the one
// row with a live citation opportunity, click Buy — and the card slides
// over to the real Acquire Citation page that click opens, showing the
// matched opportunity, before sliding back with that row now Pending.
function CitLoadingPanel() {
  return (
    <div className="cg-loading">
      <span className="cg-spinner" />
      <div className="cg-loading-title">Finding citation opportunities…</div>
      <div className="cg-loading-sub">Checking guest-post and link-placement availability for gadgetreview.com.</div>
    </div>
  );
}

function EngineCitationsCard() {
  const wrapRef = useRef(null);
  const bodyRef = useRef(null);
  const buyBtnRef = useRef(null);
  const [cursor, setCursor] = useState(null); // null | { left, top, risen }
  // Hover-lift on the opportunity row — true from just after the cursor
  // settles on it through the click, false again once we move on.
  const [zoomed, setZoomed] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [screen, setScreen] = useState(0); // 0 = table, 1 = loading, 2 = Acquire Citation page
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let timers = [];
    let raf;
    let started = false;
    const after = (ms, fn) => { timers.push(setTimeout(fn, ms)); };

    // Own eased scrollTo instead of the browser's native smooth-scroll —
    // gives full control over how slow/deliberate it feels, rather than
    // whatever short duration the browser defaults to. Looks up
    // bodyRef.current fresh each call (not a captured reference) since
    // .cit-tbody unmounts/remounts as `screen` toggles away from the table.
    function animateScrollTo(target, duration) {
      const body = bodyRef.current;
      if (!body) return;
      cancelAnimationFrame(raf);
      const start = body.scrollTop;
      const delta = target - start;
      const t0 = performance.now();
      function step(now) {
        const el = bodyRef.current;
        if (!el) return;
        const t = Math.min(1, (now - t0) / duration);
        const eased = 1 - (1 - t) ** 3;
        el.scrollTop = start + delta * eased;
        if (t < 1) raf = requestAnimationFrame(step);
      }
      raf = requestAnimationFrame(step);
    }

    // Each screen replaces the last in place (a brief opacity dip), not a
    // sideways slide — the table and the Acquire Citation page have very
    // different heights, so this masks the jump instead of carrying it.
    function goTo(next) {
      setFading(true);
      after(200, () => { setScreen(next); setFading(false); });
    }

    function cursorAt(risen) {
      const btn = buyBtnRef.current;
      if (!btn) return null;
      // offsetTop/Left are relative to the nearest positioned ancestor
      // (.cit-tbody) and stay fixed regardless of scroll — unlike
      // getBoundingClientRect, which already has the current scrollTop
      // baked in, and would double-apply it once more once rendered,
      // since the cursor itself lives inside the same scrolled container.
      return {
        left: btn.offsetLeft + btn.offsetWidth / 2,
        top: btn.offsetTop + btn.offsetHeight / 2 + (risen ? 0 : 22),
        risen,
      };
    }

    function cycle() {
      setClicked(false);
      setCursor(null);
      setZoomed(false);
      setScreen(0);
      setFading(false);
      if (bodyRef.current) bodyRef.current.scrollTop = 0;

      // Scroll the opportunity row into view, then walk the cursor down into it.
      after(1100, () => {
        const btn = buyBtnRef.current;
        const body = bodyRef.current;
        if (btn && body) animateScrollTo(btn.offsetTop - body.clientHeight / 2 + btn.offsetHeight / 2, 1100);
      });
      after(2800, () => setCursor(cursorAt(false)));
      after(3500, () => setCursor(cursorAt(true)));
      // The row lifts toward the viewer shortly after the cursor settles —
      // same beat as card 04's idea cards — before the click actually lands.
      after(3750, () => setZoomed(true));
      after(4550, () => setClicked(true));
      after(5050, () => setCursor(null));
      // The click kicks off a real search — a ~2s loader — before landing
      // on the Acquire Citation page it opens.
      after(5450, () => goTo(1));
      after(7550, () => goTo(2));

      // Hold on the Acquire Citation page, then reset to the table. Clearing
      // zoomed right here (not waiting for the next cycle()'s reset above)
      // matters — otherwise the row would reappear already lifted for a
      // beat before any new cursor motion, the same stale-state bug card
      // 04's idea cards had.
      after(12150, () => { setZoomed(false); goTo(0); });
      after(12950, () => animateScrollTo(0, 900));
      after(14150, () => setClicked(false));
      after(15350, cycle);
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting && !started) { started = true; cycle(); } });
    }, { threshold: 0.3 });
    io.observe(wrap);
    return () => { io.disconnect(); cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, []);

  return (
    <div className={`cit-stage${fading ? ' cit-stage--fading' : ''}`} ref={wrapRef}>
      {screen === 0 && (
        <div className="cit-card">
          <div className="cit-hdr">
            <div className="th-box-hdr">Backlinks &amp; Citations</div>
            <div className="cit-sub">Processed source domains across this run (108).</div>
          </div>
          <div className="cit-filters">
            <span className="cit-filter">
              All categories
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="10" height="10"><path d="m6 9 6 6 6-6"/></svg>
            </span>
            <span className="cit-filter">
              All competitors
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="10" height="10"><path d="m6 9 6 6 6-6"/></svg>
            </span>
          </div>
          <div className="cit-table">
            <div className="cit-thead">
              <span>Exact Source</span>
              <span>Category</span>
              <span>Authority</span>
              <span>Citation</span>
              <span>Competitors</span>
              <span>Opp.</span>
            </div>
            <div className="cit-tbody" ref={bodyRef}>
              {CIT_ROWS.map((row) => (
                <CitRow key={row.domain} row={row} buyClicked={clicked} buyZoomed={zoomed} buyBtnRef={row.buy ? buyBtnRef : undefined} />
              ))}
              {cursor && (
                <div className={`cit-cursor${cursor.risen ? ' cit-cursor--risen' : ''}`} style={{ left: cursor.left, top: cursor.top }}>
                  <svg viewBox="0 0 24 24" fill="#18181B" width="15" height="15"><path d="M5 3l14 8-6 2-2 6-6-16z"/></svg>
                  {clicked && <span className="cit-cursor__ripple" />}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {screen === 1 && <CitLoadingPanel />}
      {screen === 2 && <CitAcquirePanel />}
    </div>
  );
}

/* ---------- Card 04 · Content Generation ----------
   Replaces the old "paste & optimize" loop. That flow is real — Kate does
   rewrite existing pages too, it's step 02 on /content-writing — but leading
   the one card most visitors see with it made Poliris look like a generic
   AI rewriter. This demo leads with the actual differentiator instead: the
   article doesn't start from a blank page or pasted text, it starts from a
   gap Poliris's own GEO audit already found, reasoned in plain English
   ("positions Sony as the pioneer…"), then goes all the way to a scored,
   schema-ready draft published live — the same "Write it → Implement it"
   loop poliris-frontend's Content Studio (studio-home.tsx) and this site's
   own /content-writing page already sell, condensed into one card. Screens
   reuse the .cstudio-* classes already built for ProductCarousel's hidden
   ContentVis demo (poliris.css ~L4386) rather than a new visual language. */
const CW_IDEAS = [
  {
    priority: 'HIGH',
    title: 'Sony WF-1000XM5: The Pinnacle of Noise-Cancelling Innovation',
    desc: 'Positions Sony as the pioneer of noise-cancellation technology, from the WF-1000X to today: a gap AI answers currently give to no one.',
  },
  {
    priority: 'HIGH',
    title: "Sony's Road to Zero: Reshaping Sustainable Audio",
    desc: "Sony's recycled materials and carbon commitments, framed to capture eco-conscious AI answers.",
  },
  {
    priority: 'MEDIUM',
    title: 'Sony vs. Apple: Who Leads the Future of Wireless Audio?',
    desc: 'Pits Sony directly against its closest rival, positioned to displace Apple in AI answers.',
  },
];
// Which suggested idea the scripted demo picks — the center card, not the
// first: the zoom/dim effect only reads as a considered choice when a
// sibling recedes on *both* sides, and always grabbing index 0 started to
// look mechanical ("the demo just clicks whatever's first") rather than
// deliberate. Change this one value to pick a different idea — CW_DRAFT
// below must describe whichever index it points to.
const CW_PICKED_INDEX = 1;
// The draft Kate produces once the demo picks CW_IDEAS[CW_PICKED_INDEX] —
// real copy already written for ProductCarousel's ContentVis demo (en.js
// contentVis.ideaSets[0][1].draft).
const CW_DRAFT = {
  intro: "Sony's Road to Zero initiative isn't just a marketing campaign; it's a measurable commitment. By 2050, the company aims to achieve a zero environmental footprint across its value chain, and its recycled-plastic earbud casings already prove sustainable materials can perform without compromise.",
  outline: ['What Is Road to Zero?', 'Recycled Materials That Perform', 'Carbon Footprint by the Numbers', 'How to Shop More Sustainably with Sony'],
  words: 680,
  read: '3 min',
  score: 88,
};

function CwPriorityBadge({ priority }) {
  const isHigh = priority === 'HIGH';
  return (
    <span className="cstudio-priority" style={{ color: isHigh ? '#DC2626' : '#D97706', background: isHigh ? '#FEE2E2' : '#FEF3C7' }}>
      {isHigh ? 'HIGH PRIORITY' : 'MEDIUM'}
    </span>
  );
}

// Screen 1 — the suggested-idea grid, sourced from the audit rather than a
// blank prompt. The scripted cursor lands on the top-priority card, the card
// lifts toward the viewer (a hover-zoom, not a real modal — cheaper and
// reads faster in a looping background demo) while its siblings dim out of
// focus, then the click lands and the piece moves into writing. That
// pick-a-card beat is the whole point being sold here.
function CwIdeasPanel({ cardRef, cursor, zoomed, clicked }) {
  return (
    <div className="cstudio-card cw-panel">
      <div className="cstudio-hdr">
        <span className="cstudio-title">Kate · Content Studio</span>
        <span className="cstudio-sub">Write articles that rank in AI answers</span>
      </div>
      <div className="cstudio-ideas-hdr">
        <svg viewBox="0 0 24 24" fill="none" stroke="#3B6FF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74z"/></svg>
        Suggested article ideas
        <span className="cw-ideas-note">· found in your GEO audit</span>
      </div>
      <div className={`cstudio-ideas cw-ideas${zoomed ? ' cw-ideas--focused' : ''}`}>
        {CW_IDEAS.map((idea, i) => (
          <div
            key={idea.title}
            ref={i === CW_PICKED_INDEX ? cardRef : undefined}
            className={`cstudio-idea-card${i === CW_PICKED_INDEX && zoomed ? ' cw-idea-card--zoomed' : ''}${i === CW_PICKED_INDEX && clicked ? ' cw-idea-card--pulse' : ''}`}
          >
            <CwPriorityBadge priority={idea.priority} />
            <div className="cstudio-idea-title">{idea.title}</div>
            <div className="cstudio-idea-desc">{idea.desc}</div>
          </div>
        ))}
      </div>
      {cursor && (
        <div className={`cg-cursor${cursor.risen ? ' cg-cursor--risen' : ''}`} style={{ left: cursor.left, top: cursor.top }}>
          <svg viewBox="0 0 24 24" fill="#18181B" width="15" height="15"><path d="M5 3l14 8-6 2-2 6-6-16z"/></svg>
          {clicked && <span className="cg-cursor__ripple" />}
        </div>
      )}
    </div>
  );
}

// Screen 2 — "researching → writing → scoring" made visible instead of a
// generic spinner: the same outline the result screen shows, checking off
// section by section as Kate (supposedly) writes it.
function CwWritingPanel({ revealedCount }) {
  return (
    <div className="cw-writing">
      <span className="cg-spinner" />
      <div className="cg-loading-title">Writing “{CW_IDEAS[CW_PICKED_INDEX].title}”…</div>
      <div className="cg-loading-sub">Researching the angle, drafting section by section, scoring for AI answers as it goes.</div>
      <div className="cstudio-draft-outline cw-writing-outline">
        {CW_DRAFT.outline.map((s, i) => (
          <div key={s} className={`cstudio-draft-section cw-writing-row${i < revealedCount ? ' cw-writing-row--done' : ''}`}>
            <span className="cstudio-draft-num cw-writing-num">
              {i < revealedCount
                ? <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                : i + 1}
            </span>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

// Screen 3 — the finished draft: scored, schema-ready, and (once the
// scripted click lands) published — no developer, no copy-paste. This beat
// is what actually distinguishes "generation" from "optimization": the
// piece didn't exist an instant ago, and now it's live.
function CwResultPanel({ btnRef, cursor, clicked, published }) {
  return (
    <div className="cstudio-card cw-panel">
      <div className="cstudio-draft-meta">
        <span className="cstudio-draft-badge cstudio-draft-badge--ai">AI Draft</span>
        <span className="cstudio-draft-badge cstudio-draft-badge--schema">Schema.org ready</span>
        <span className="cstudio-draft-stat">{CW_DRAFT.words} words · {CW_DRAFT.read} read</span>
        <span className="cstudio-draft-score" style={{ color: '#16a34a' }}>AI score {CW_DRAFT.score}</span>
      </div>
      <div className="cstudio-draft-title">{CW_IDEAS[CW_PICKED_INDEX].title}</div>
      <div className="cstudio-draft-intro">{CW_DRAFT.intro}</div>
      <div className="cstudio-draft-outline-lbl">Article outline</div>
      <div className="cstudio-draft-outline">
        {CW_DRAFT.outline.map((s, i) => (
          <div key={s} className="cstudio-draft-section">
            <span className="cstudio-draft-num">{i + 1}</span>
            {s}
          </div>
        ))}
      </div>
      <div className="cstudio-draft-actions">
        <span className={`cstudio-start-btn cw-publish-btn${published ? ' cw-publish-btn--done' : ''}`} ref={btnRef}>
          {published ? (
            <>
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              Published
            </>
          ) : 'Publish →'}
        </span>
        <span className="cstudio-edit-btn">Edit draft</span>
      </div>
      {cursor && (
        <div className={`cg-cursor${cursor.risen ? ' cg-cursor--risen' : ''}`} style={{ left: cursor.left, top: cursor.top }}>
          <svg viewBox="0 0 24 24" fill="#18181B" width="15" height="15"><path d="M5 3l14 8-6 2-2 6-6-16z"/></svg>
          {clicked && <span className="cg-cursor__ripple" />}
        </div>
      )}
    </div>
  );
}

function EngineContentCard() {
  const wrapRef = useRef(null);
  // Reused across screens rather than one ref per element — only one screen
  // is ever mounted at a time, so whichever element needs the cursor next
  // (the idea card, then the Publish button) just attaches this same ref.
  const btnRef = useRef(null);
  const [screen, setScreen] = useState(0); // 0 ideas, 1 writing, 2 result
  const [fading, setFading] = useState(false);
  const [cursor, setCursor] = useState(null);
  // Hover-lift on the target idea card — true from the moment the cursor
  // settles on it through the click, false again once we move on.
  const [zoomed, setZoomed] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let timers = [];
    let started = false;
    const after = (ms, fn) => { timers.push(setTimeout(fn, ms)); };

    // Each screen replaces the last in place — a brief opacity dip masks the
    // height change instead of carrying it as a sideways slide.
    function goTo(next) {
      setFading(true);
      after(200, () => { setScreen(next); setFading(false); });
    }

    function reset() {
      setScreen(0); setFading(false); setCursor(null); setZoomed(false); setClicked(false); setRevealedCount(0); setPublished(false);
    }

    function cursorAt(risen) {
      const btn = btnRef.current;
      if (!btn) return null;
      return {
        left: btn.offsetLeft + btn.offsetWidth / 2,
        top: btn.offsetTop + btn.offsetHeight / 2 + (risen ? 0 : 20),
        risen,
      };
    }

    function cycle() {
      reset();
      // Screen 1 (ideas): cursor lands on the top-priority suggestion, the
      // card lifts toward the viewer (zoomed) with its siblings dimming out
      // — a beat to actually look at the card before the click lands, not
      // an instant jump. This is what sells "the topic came from your own
      // audit," not a blank prompt.
      after(700, () => setCursor(cursorAt(false)));
      after(1200, () => setCursor(cursorAt(true)));
      after(1450, () => setZoomed(true));
      after(2000, () => setClicked(true));
      after(2350, () => { setCursor(null); goTo(1); });

      // Screen 2 (writing): the outline checks itself off section by
      // section — visible progress instead of a generic spinner.
      after(3050, () => setRevealedCount(1));
      after(3900, () => setRevealedCount(2));
      after(4750, () => setRevealedCount(3));
      after(5600, () => setRevealedCount(4));
      after(6450, () => goTo(2));

      // Screen 3 (result): hold the finished, scored draft, then the
      // scripted click publishes it — the moment that actually
      // distinguishes "generated" from "optimized": nothing existed a
      // moment ago, and now it's live.
      after(6950, () => setClicked(false));
      after(7750, () => setCursor(cursorAt(false)));
      after(8250, () => setCursor(cursorAt(true)));
      after(8750, () => { setClicked(true); setPublished(true); });
      after(9150, () => setCursor(null));

      // goTo(0) alone isn't enough here: zoomed/clicked are still true from
      // the click back at the start of this same pass (they only get
      // cleared by reset(), which doesn't run again until cycle() restarts
      // at 15050) — without clearing them first, screen 0 reappears with
      // the first card already zoomed for ~600ms before any cursor motion,
      // as if it had been hovered before the loop even started.
      after(14450, () => { setZoomed(false); setClicked(false); setPublished(false); goTo(0); });
      after(15050, cycle);
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting && !started) { started = true; cycle(); } });
    }, { threshold: 0.3 });
    io.observe(wrap);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return (
    <div className={`cg-stage${fading ? ' cg-stage--fading' : ''}`} ref={wrapRef}>
      {screen === 0 && <CwIdeasPanel cardRef={btnRef} cursor={cursor} zoomed={zoomed} clicked={clicked} />}
      {screen === 1 && <CwWritingPanel revealedCount={revealedCount} />}
      {screen === 2 && <CwResultPanel btnRef={btnRef} cursor={cursor} clicked={clicked} published={published} />}
    </div>
  );
}

const ENGINE_VISUALS = { 0: PositionChartDemo, 1: EngineTrustCard, 2: EngineRoadmapCard, 3: EngineContentCard, 4: EngineCitationsCard };

function EngineRow({ index, card, learnMore, innerRef, everHighlighted, everRevealed }) {
  const reverse = index % 2 === 1;
  const tinted = index % 2 === 0;
  const Visual = ENGINE_VISUALS[index] || EnginePlaceholder;
  const numStr = String(index + 1).padStart(2, '0');
  // The tour's own continuous scrolling races with the site-wide .reveal
  // IntersectionObserver and can leave a row's entrance animation stuck at
  // opacity:0 forever — once the tour has visited this row, bake "visible"
  // straight into the className (state-driven, survives re-renders) rather
  // than depending on that observer at all for tour-visited rows.
  const revealCls = everRevealed ? ' visible' : '';
  return (
    <div className={`engine-row${tinted ? ' engine-row--tint' : ''}`} ref={innerRef}>
      <div className="container engine-row__inner-wrap">
        <div className={`engine-row__inner${reverse ? ' engine-row__inner--rev' : ''}`}>
          <div className={`engine-row__copy reveal${revealCls}`}>
            <span className="engine-row__num-wrap">
              <span className="engine-row__num">{numStr}</span>
            </span>
            {/* Once a card has been highlighted, the highlight stays for
                good — it's never un-applied as the tour moves on, only a
                real page reload resets it (fresh component state). */}
            <h3 className="engine-row__title"><span className={everHighlighted ? 'engine-row__title--tour-active' : undefined}>{card.title}</span></h3>
            <p className="engine-row__desc">{card.desc}</p>
            <div className="engine-row__tags">
              {card.tags.map((tag) => <span key={tag} className="engine-tag">{tag}</span>)}
            </div>
            {card.href && (
              <Link to={card.href} className="engine-row__link">
                {learnMore}
                <span className="engine-row__link-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Link>
            )}
          </div>
          <div className={`engine-row__visual reveal${revealCls}`}>
            <EngineWindow url={card.url}><Visual /></EngineWindow>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatformEngine() {
  const { t } = useLang();
  const pe = t('home.engine');
  const rowRefs = useRef([]);
  // Indices whose title highlight has ever played — once added, a card's
  // highlight stays on permanently; only a full page reload clears this.
  // Doubles as "has this row been revealed" for its visual/entrance too —
  // no separate tracking needed since both now happen together, the first
  // time each row scrolls into view (no auto-scroll driving any of it).
  const [visitedIdx, setVisitedIdx] = useState(() => new Set());

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean);
    if (!rows.length) return;
    // Per-row: the moment a card scrolls into view (or is already in view
    // on page load/refresh), highlight its title and let its own action
    // play — each row independently, no orchestrated auto-scroll.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = rows.indexOf(entry.target);
          if (idx === -1) return;
          setVisitedIdx((prev) => (prev.has(idx) ? prev : new Set(prev).add(idx)));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.3 },
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="engine" id="engine">
      <div className="container">
        <div className="sec-head reveal">
          <Eyebrow>{pe.eyebrow}</Eyebrow>
          <h2 className="sec-h2">{pe.h2Pre}<br /><HL>{pe.h2Hl}</HL></h2>
          <p className="sec-lead">{pe.lead}</p>
        </div>
      </div>
      <div className="engine-rows">
        {pe.cards.map((card, i) => (
          <EngineRow
            key={card.title}
            index={i}
            card={card}
            learnMore={pe.learnMore}
            innerRef={(el) => { rowRefs.current[i] = el; }}
            everHighlighted={visitedIdx.has(i)}
            everRevealed={visitedIdx.has(i)}
          />
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   AGENTS
   ================================================================ */
function Agents() {
  const { t } = useLang();
  // One accent per agent (Leo, Nora, Tom, Kate, Ivy, Emma, in that order —
  // matches home.agents.list in the locale files) — the same color drives
  // the avatar's ring and the role label, so each agent reads as one
  // identity across the card. `bg` is the pale tint behind the face inside
  // that ring (not the same as the ring color itself, see AgentCard below).
  const AGENT_COLORS = ['#6BC591', '#716BEB', '#F2A88F', '#E58DB5', '#6B83D0', '#6BADEB'];
  const AGENT_BG     = ['#F2F8F5', '#EFEFF7', '#FEF6F4', '#FAF0FA', '#F0F2FA', '#F0F7FD'];
  // The source illustrations aren't a matched set — each has a different
  // amount of transparent padding baked around the actual face (measured
  // via each PNG's alpha-channel bounding box). Nora's file in particular
  // is ~30% empty space, so the same img size as the others rendered her
  // face noticeably smaller. Per-agent scale compensates so every face
  // fills a similar share of the ring regardless of its source crop.
  const AGENT_AVATAR_SCALE = ['81%', '109%', '78%', '82%', '78%', '78%'];
  const agents = t('home.agents.list').map((a, i) => ({ ...a, color: AGENT_COLORS[i], bg: AGENT_BG[i], avatarScale: AGENT_AVATAR_SCALE[i] }));
  return (
    <section id="team" className="agents">
      <div className="container">
        <div className="agents__panel">
          {(() => { const ag = t('home.agents'); return (
          <div className="agents__head reveal">
            <div className="agents__head-copy">
              <Eyebrow>{ag.eyebrow}</Eyebrow>
              <h2 className="agents__h2">
                {ag.h2}
                <span className="agents__h2-blue">{ag.h2Blue}</span>
              </h2>
            </div>
            <p className="agents__lead">{ag.lead}</p>
          </div>); })()}
          <div className="agents__grid">
            {agents.map((agent) => (
              <AgentCard key={agent.name} agent={agent} />
            ))}
          </div>
          <div className="agents__foot">
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="agents__foot-icon">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            <p>{t('home.agents.footNote')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AgentCard({ agent }) {
  return (
    <div className="agent-card reveal">
      <div className="agent-card__top">
        <div className="agent-card__av" style={{ borderColor: agent.color, background: agent.bg }}>
          <img
            src={AVATARS[agent.name]}
            alt={agent.name}
            style={{ width: agent.avatarScale, height: agent.avatarScale }}
          />
        </div>
        <div>
          <div className="agent-card__name">{agent.name}</div>
          <div className="agent-card__role" style={{ color: agent.color }}>{agent.role}</div>
        </div>
      </div>
      <p className="agent-card__desc">{agent.desc}</p>
    </div>
  );
}

/* ================================================================
   COMPARISON TABLE
   ================================================================ */
function ComparisonTable() {
  const { t } = useLang();
  const cp = t('home.comparison');
  const rows = cp.rows;
  const CheckIcon = () => (
    <span className="comparison__check-bg">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
    </span>
  );
  const CrossIcon = () => (
    <span className="comparison__x-icon">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18M6 6l12 12"/>
      </svg>
    </span>
  );
  return (
    <section className="comparison">
      <div className="container">
        <div className="comparison__head reveal">
          {(() => { const cp = t('home.comparison'); return (<>
            <div className="comparison__head-copy">
              <Eyebrow>{cp.eyebrow}</Eyebrow>
              <h2 className="comparison__h2">{cp.h2}</h2>
            </div>
            <p className="comparison__lead">{cp.lead}</p>
          </>); })()}
        </div>
        <div className="comparison__table-wrap reveal reveal--scale reveal--d1">
          <table className="comparison__table">
            <thead>
              <tr>
                <th className="comparison__th">{cp.headers.capability}</th>
                <th className="comparison__th comparison__th--other">{cp.headers.otherTools}</th>
                <th className="comparison__th comparison__th--pol">
                  <span className="comparison__th-pill">{cp.headers.poliris}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="comparison__row">
                  <td className="comparison__td">{row.need}</td>
                  <td className="comparison__td comparison__td--other">
                    {row.other === 'x'
                      ? <CrossIcon />
                      : <span>{row.other}</span>}
                  </td>
                  <td className="comparison__td comparison__td--pol">
                    <span className="comparison__pol-cell">
                      <CheckIcon />
                      {row.pol && <span className="comparison__pol-sub">{row.pol}</span>}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="comparison__concl">
          <span className="comparison__check-bg" style={{flexShrink:0}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </span>
          <span className="comparison__concl-text">{cp.concl}</span>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   STAKES
   ================================================================ */
function Stakes() {
  const { t } = useLang();
  const CARD_ICONS = [
    <path key="c0" d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />,
    (<><path key="c1a" d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path key="c1b" d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path key="c1c" d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path key="c1d" d="m2 2 20 20"/></>),
    <path key="c2" d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />,
  ];
  const cards = t('home.stakes.cards').map((c, i) => ({ ...c, icon: CARD_ICONS[i] }));
  return (
    <section className="stakes">
      <div className="container">
        {(() => { const st = t('home.stakes'); return (
          <div className="sec-head reveal">
            <Eyebrow>{st.eyebrow}</Eyebrow>
            <h2 className="sec-h2">
              {st.h2Pre}<br />{st.h2Mid} <HL>{st.h2Hl}</HL>
            </h2>
            <p className="sec-lead">{st.lead}</p>
          </div>); })()}
        <div className="stakes__grid">
          {cards.map((card, i) => (
            <div key={i} className={`stakes__card reveal reveal--d${i + 1}`}>
              <div className="stakes__iconbox">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="30" height="30">
                  {card.icon}
                </svg>
              </div>
              <h3 className="stakes__h3">{card.title}</h3>
              <p className="stakes__desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

