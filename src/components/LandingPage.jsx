import { useState, useEffect, useRef, useCallback, useLayoutEffect, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
// import ProductCarousel from './ProductCarousel'; // hidden for now, see below
import Hero from './Hero';
import CtaBand from './CtaBand';
import StepLottieIcon from './StepLottieIcon';
import ContentGenDemo from './ContentGenDemo';
// import AuditModal from './AuditModal'; // hidden for now, see below
import { useLang } from '../contexts/LangContext';

/* ── Agent avatar illustrations (see public/Illustrations/) ──── */
const AVATARS = {
  Leo: `${import.meta.env.BASE_URL}Illustrations/leo.webp`,
  Nora: `${import.meta.env.BASE_URL}Illustrations/nora.webp`,
  Tom: `${import.meta.env.BASE_URL}Illustrations/tom.webp`,
  Kate: `${import.meta.env.BASE_URL}Illustrations/kate.webp`,
  Ivy: `${import.meta.env.BASE_URL}Illustrations/ivy.webp`,
  Emma: `${import.meta.env.BASE_URL}Illustrations/emma.webp`,
};
// Pixel size of each file above, for the <img> width/height attributes.
const AVATAR_SIZES = {
  Leo: [421, 480], Nora: [480, 480], Tom: [421, 480], Kate: [391, 480], Ivy: [404, 480], Emma: [413, 480],
};

/* ── Highlight span ──────────────────────────────────────────── */
const HL = ({ children }) => <span className="hl">{children}</span>;

/* ── Eyebrow label ───────────────────────────────────────────── */
const Eyebrow = ({ children }) => <div className="eyebrow">{children}</div>;

/* The top of the landing page: the hero and How it works.

   Pulled out so the standalone extract (standalone/main.jsx) renders this
   very component rather than a copy of it - the one-file export and the
   real page cannot drift apart.

   The .reveal observer lives here rather than in LandingPage because it
   queries the whole document on mount: it still picks up every .reveal
   below this section, and the standalone gets it without a second copy. */
export function LandingTop() {
  const { t } = useLang();
  const h = t('home.hero');

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
      },
      // Fire as soon as the element reaches the viewport, not on a ratio
      // of its own height: a tall element (the How it works steps are
      // ~210px) can have its top on screen and still be under 12% of
      // itself, so it stayed at opacity 0 and read as missing content.
      // The small positive margin starts the fade just before it enters.
      { threshold: 0, rootMargin: '0px 0px 5% 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero
        eyebrow={h.eyebrow}
        // Two rows: "Take control of how" / "AI sees your brand".
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
        showAiBand={false}
      />
      <HowItWorks />
    </>
  );
}

export default function LandingPage() {
  const { t } = useLang();
  // "Get your free audit" button hidden for now — see below. State kept so
  // it's a one-line restore once a real entry point is decided.
  // const [auditModalOpen, setAuditModalOpen] = useState(false);

  const cta = t('home.cta');

  return (
    <div className="landing">
      <LandingTop />
      {/* ValueChain hidden for now — restore by uncommenting. */}
      {/* <ValueChain /> */}
      {/* ProductCarousel hidden for now — restore by uncommenting. */}
      {/* <ProductCarousel /> */}
      <PlatformEngine />
      <Agents />
      {/* ComparisonTable hidden for now — restore by uncommenting. */}
      {/* <ComparisonTable /> */}
      <Stakes />
      <HomeFaq />
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
   HOW IT WORKS — Analyze → Decide → Act, right below the hero's
   dashboard demo. Ported from the PR #5 homepage design: the icons sit
   bare on the page (their box blends into the background) and play
   their Lottie animations in turn, with the connector lines drawing
   between them. A step with `lottie: false` shows its drawn SVG
   instead and gets a timed turn (see HOW_PLAY_MS).
   ================================================================ */
const HOW_ICONS = [
  {
    // Track — a radar sweep finding blips (where AI names you and rivals)
    key: 'track',
    svg: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="16" cy="16" r="11" opacity="0.45" />
        <circle cx="16" cy="16" r="6" opacity="0.45" />
        <g className="how-anim how-anim--sweep">
          <path d="M16 16 L16 5" />
          <path d="M16 16 L16 5 A11 11 0 0 1 23.8 8.2 Z" fill="currentColor" stroke="none" opacity="0.25" />
        </g>
        <circle className="how-anim how-anim--blip how-anim--b1" cx="21.5" cy="11" r="1.7" fill="currentColor" stroke="none" />
        <circle className="how-anim how-anim--blip how-anim--b2" cx="10" cy="19.5" r="1.7" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    // Fix — a prioritized checklist ticking itself off
    key: 'fix',
    svg: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {[9, 16, 23].map((y, n) => (
          <g key={y}>
            <rect x="5.5" y={y - 2.5} width="5" height="5" rx="1.2" opacity="0.55" />
            <path className={`how-anim how-anim--tick how-anim--t${n + 1}`} d={`M6.6 ${y} l1.4 1.4 l2.6 -2.8`} pathLength="1" />
            <path d={`M14 ${y} H${26 - n * 3}`} opacity="0.55" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    // Publish — a page writes itself, then ships up to your site
    key: 'publish',
    svg: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <g className="how-anim how-anim--page">
          <path d="M9 5.5h10l4 4v17H9z" />
          <path d="M19 5.5v4h4" opacity="0.6" />
          <path className="how-anim how-anim--line how-anim--l1" d="M12.5 14H19.5" pathLength="1" />
          <path className="how-anim how-anim--line how-anim--l2" d="M12.5 18H19.5" pathLength="1" />
          <path className="how-anim how-anim--line how-anim--l3" d="M12.5 22H17" pathLength="1" />
        </g>
      </svg>
    ),
  },
];

/* The steps play in a loop while in view, paced like a guided walk-through:
   icon 1 plays, a pause, the line to step 2 draws left to right, icon 2, a
   pause, the next line, and so on. After the last icon: a hold, the lines
   fade out, and it starts over.
   `stage`, three per step (i = step index):
     3i = icon i playing, 3i+1 = pause after it, 3i+2 = line i drawing.
   The last step has no line after it, so with N steps the tail is
   3N-2 = hold, 3N-1 = lines fading, 3N = lines reset.
   `cycle` counts loops so each icon knows to play again. */
const HOW_DWELL_MS = 1000;
const HOW_LINE_MS = 900;
const HOW_HOLD_MS = 2000;
const HOW_FADE_MS = 500;
// How long a step without a Lottie holds its turn. The player reports
// when its animation ends; a drawn icon has nothing to report, so its
// turn is timed instead — long enough for the trace to finish drawing.
const HOW_PLAY_MS = 1100;

function HowItWorks() {
  const { t } = useLang();
  const hw = t('home.howItWorks');
  const listRef = useRef(null);
  const [stage, setStage] = useState(-1);
  const [cycle, setCycle] = useState(0);
  const [inView, setInView] = useState(false);

  const stepCount = hw.steps.length;
  const holdStage = stepCount * 3 - 2;
  const fadeStage = holdStage + 1;
  const resetStage = holdStage + 2;

  // Track whether the steps are on screen; the loop only runs while they are
  useEffect(() => {
    const el = listRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) setStage((s) => (s < 0 ? 0 : s));
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Timed stages: pauses, lines drawing, the hold, the fade-out, the reset.
  // The icon-playing stages (3i) aren't timed here — the icon itself calls
  // finishIcon when its animation completes.
  useEffect(() => {
    // An icon stage normally ends when the Lottie player says so; a step
    // whose icon is a drawing has no player, so time its turn here.
    const isIconStage = stage % 3 === 0 && stage < holdStage;
    const iconIsTimed = isIconStage && HOW_ICONS[stage / 3]?.lottie === false;
    if (stage < 0 || (isIconStage && !iconIsTimed)) return undefined;
    const media = (q) => window.matchMedia(q).matches;
    const reduce = media('(prefers-reduced-motion: reduce)');
    const noLines = media('(max-width: 768px)') || reduce;
    // Reduced motion: play through once and stop on the finished state
    if (stage === holdStage && reduce) return undefined;
    // Wait at the end until the section is back on screen
    if (stage === holdStage && !inView) return undefined;
    let next;
    if (iconIsTimed) next = reduce ? 0 : HOW_PLAY_MS;
    else if (stage === holdStage) next = HOW_HOLD_MS;
    else if (stage === fadeStage) next = noLines ? 0 : HOW_FADE_MS;
    else if (stage === resetStage) next = 50; // one painted frame with the lines collapsed, transitions off
    else if (stage % 3 === 1) next = reduce ? 0 : HOW_DWELL_MS;
    else next = noLines ? 0 : HOW_LINE_MS;
    const timer = setTimeout(() => {
      if (stage === resetStage) {
        setCycle((c) => c + 1);
        setStage(0);
      } else {
        setStage(stage + 1);
      }
    }, next);
    return () => clearTimeout(timer);
  }, [stage, inView, holdStage, fadeStage, resetStage]);

  const finishIcon = useCallback((i) => {
    setStage((s) => (s === i * 3 ? s + 1 : s));
  }, []);

  // Icons start gray, turn blue as their step plays and stay blue for the
  // rest of the run; all go back to gray as the lines fade out.
  const isLit = (i) => stage >= i * 3 && stage <= holdStage;

  const lineClass = (i) => {
    if (stage === resetStage) return ' is-reset';
    if (stage === fadeStage) return ' is-drawn is-fading';
    return stage >= i * 3 + 2 ? ' is-drawn' : '';
  };

  return (
    <section id="how-it-works" className="how">
      <div className="container">
        <div className="sec-head reveal">
          <Eyebrow>{hw.eyebrow}</Eyebrow>
          <h2 className="sec-h2">{hw.h2Pre}<br /><HL>{hw.h2Hl}</HL></h2>
          <p className="sec-lead">{hw.lead}</p>
        </div>
        <ol ref={listRef} className="how__steps" style={{ '--how-cols': stepCount }}>
          {hw.steps.map((step, i) => (
            <li key={step.title} className={`how__step reveal reveal--d${i + 1}`}>
              {i < stepCount - 1 && (
                <span className={`how__link${lineClass(i)}`} aria-hidden="true" />
              )}
              <span className={`how__icon how__icon--${HOW_ICONS[i].key}${isLit(i) ? ' is-lit' : ''}`} aria-hidden="true">
                {/* A step with no Lottie file just shows its drawing —
                    going through the player would only have it report
                    "failed, already done" and skip the step's turn. */}
                {HOW_ICONS[i].lottie === false ? HOW_ICONS[i].svg : (
                  <StepLottieIcon
                    name={HOW_ICONS[i].key}
                    fallback={HOW_ICONS[i].svg}
                    active={stage === i * 3}
                    playKey={cycle}
                    onDone={() => finishIcon(i)}
                  />
                )}
              </span>
              <h3 className="how__h3">{i + 1}. {step.title}</h3>
              <p className="how__desc">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
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
function EngineWindow({ url, bare = false, children }) {
  return (
    <div className="engine-window">
      {!bare && (
        <div className="engine-window__bar">
          <span className="engine-window__dot" style={{ background: '#ff5f57' }} />
          <span className="engine-window__dot" style={{ background: '#febc2e' }} />
          <span className="engine-window__dot" style={{ background: '#28c840' }} />
          <span className="engine-window__url">{url}</span>
        </div>
      )}
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
// `labelKey` maps to home.engine.demo.reputation.quad* — see PositionChartDemo.
const PC_QUADRANTS = [
  { key: 'sentiment', top: 0, left: 0, bg: '#F8FBFC', labelKey: 'quadSentimentLow', edge: 'right bottom' },
  { key: 'leaders', top: 0, left: 50, bg: '#EFF6FF', labelKey: 'quadLeaders', edge: 'bottom' },
  { key: 'atRisk', top: 50, left: 0, bg: '#FEFBEA', labelKey: 'quadAtRisk', edge: 'right' },
  { key: 'visibility', top: 50, left: 50, bg: '#F8FBFC', labelKey: 'quadVisibilityWeak', edge: '' },
];
// x = visibility%, used directly as `left`; y is already "distance from
// top", i.e. the inverted sentiment value (`100 - sentimentY`), so it can
// go straight into CSS.
const PC_BRANDS = [
  // Sony, Samsung, Bose, JBL and Anker all ship as square opaque logo tiles
  // with their own brand-colored background baked in (no transparency), so
  // they're cropped to fill the whole circle (cover) instead of floating
  // inset on a badge background like Apple's transparent-PNG mark below.
  { id: 'samsung', name: 'Samsung', x: 38, y: 18, initial: 'S', bg: '#12121a', logo: 'samsung-com-logo.png', cover: true },
  { id: 'bose', name: 'Bose', x: 38, y: 44, initial: 'B', bg: '#1e1e1e', logo: 'bose-com-logo.png', cover: true },
  // Apple's logo is a black mark on a transparent PNG — a black badge bg made
  // it invisible (looked like a plain black dot), so it gets a white badge
  // instead of the cover treatment the opaque tiles above use.
  { id: 'apple', name: 'Apple', x: 95, y: 9, initial: 'a', bg: '#ffffff', logo: 'apple-com-logo.png' },
  { id: 'jbl', name: 'JBL', x: 36, y: 50, initial: 'j', bg: '#f03c02', logo: 'jbl-com-logo.png', cover: true },
  // y is deliberately not too close to the chart's top edge — the tooltip
  // opens upward above the dot and .pc-panel clips at 0, so too little
  // headroom here cuts the tooltip's own top edge off.
  { id: 'sony', name: 'Sony', x: 90, y: 20, initial: 'S', bg: '#0d0d0d', logo: 'sony-com-logo.png', isTarget: true, cover: true },
  { id: 'anker', name: 'Anker', x: 40, y: 50, initial: 'A', bg: '#00b4f0', logo: 'anker-com-logo.png', cover: true },
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
          ? <img src={`${import.meta.env.BASE_URL}${brand.logo}`} alt={brand.name} width="22" height="22" />
          : <span style={{ color: brand.bg === '#ffffff' ? '#0d0d0d' : '#fff' }}>{brand.initial}</span>}
      </span>
    </div>
  );
}

/* ── "Analysis" tab — Visibility (left) + Sentiment (right), each a
   compact recreation of VisibilityAnalysis2.tsx / SentimentAnalysis2.tsx ── */
// Sony's per-platform visibility scores in the demo.
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
// Sentiment Analysis axes and tiers for the demo.
const PC_SENT_ROWS = [
  { name: 'Brand Awareness', tier: 'Very Strong' },
  { name: 'Performance', tier: 'Strong' },
  { name: 'Design', tier: 'Strong' },
  { name: 'Durability', tier: 'Weak' },
];

function PcAnalysis() {
  const { t } = useLang();
  const d = t('home.engine.demo.reputation');
  const tierLabels = t('dashboard.tierLabels');
  return (
    <div className="pc-an">
      <div className="pc-an__col">
        <p className="pc-an__title">{d.visTitle}</p>
        <p className="pc-an__sub">{d.visSub}</p>
        <div className="pc-an__stats">
          <div className="pc-an__stat"><span>{d.avgScore}</span><strong>90%</strong></div>
          <div className="pc-an__stat"><span>{d.avgPosition}</span><strong>#2</strong></div>
          <div className="pc-an__stat"><span>{d.trend}</span><strong className="pc-an__stat--up">{d.rising}</strong></div>
        </div>
        <p className="pc-an__label">{d.scoreByPlatform}</p>
        <div className="pc-an__bars">
          {PC_VIS_ROWS.map((r) => (
            <div key={r.name} className="pc-an__bar-row">
              <div className="pc-an__bar-head">
                <span className="pc-an__bar-name">
                  <img src={`${import.meta.env.BASE_URL}${r.icon}`} alt={r.name} width="13" height="13" />
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
        <div className="pc-an__insight">{d.visInsight}</div>
        <div className="pc-an__details">{d.details}</div>
      </div>

      <div className="pc-an__divider" />

      <div className="pc-an__col">
        <p className="pc-an__title">{d.sentTitle}</p>
        <p className="pc-an__sub">{d.sentSub}</p>
        <div className="pc-an__stats">
          <div className="pc-an__stat">
            <span>{d.avgScore}</span>
            <strong><span className="pc-an__pill" style={{ color: 'var(--tier-s-color)', background: 'var(--tier-s-bg)' }}>{tierLabels.Strong}</span></strong>
          </div>
          <div className="pc-an__stat"><span>{d.trend}</span><strong className="pc-an__stat--muted">{d.stable}</strong></div>
        </div>
        <p className="pc-an__label">{d.scoreByPlatform}</p>
        <div className="pc-an__bars">
          {PC_SENT_ROWS.map((r) => {
            const style = SENT_TIER_STYLE[r.tier];
            return (
              <div key={r.name} className="pc-an__bar-row">
                <div className="pc-an__bar-head">
                  <span className="pc-an__bar-name">{r.name}</span>
                  <span className="pc-an__pill" style={{ color: style.color, background: style.bg }}>{tierLabels[r.tier]}</span>
                </div>
                <div className="pc-an__bar-track" style={{ background: style.bg }}>
                  <div className="pc-an__bar-fill" style={{ width: `${SENT_TIER_PCT[r.tier]}%`, background: style.color }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="pc-an__insight">{d.sentInsight}</div>
        <div className="pc-an__details">{d.details}</div>
      </div>
    </div>
  );
}

function PositionChartDemo() {
  const { t } = useLang();
  const d = t('home.engine.demo.reputation');
  const tierLabels = t('dashboard.tierLabels');
  const target = PC_BRANDS.find((b) => b.isTarget);
  const tipSrcRef = useRef(null);
  const tipFloatRef = useRef(null);
  // Set after mount — the page is pre-rendered (vite-react-ssg) where
  // `document` doesn't exist, so the portal can't render on the server.
  const [tipHost, setTipHost] = useState(null);
  useEffect(() => { setTipHost(document.body); }, []);

  // .pc-scroll/.pc-panel clip with overflow:hidden (the auto-scroll needs
  // it), which no z-index can escape — so the visible tooltip lives in
  // <body>, like the real dashboard's portaled tooltip. Each frame it copies
  // the hidden source copy's on-screen position, opacity and transform, so
  // the CSS animation timing and anchoring stay the single source of truth.
  // Only runs while the chart is on screen.
  useEffect(() => {
    const src = tipSrcRef.current;
    const float = tipFloatRef.current;
    const chart = src?.offsetParent;
    const body = src?.closest('.engine-window__body');
    const scroller = src?.closest('.pc-scroll');
    const track = src?.closest('.pc-scroll__track');
    if (!src || !float || !chart || !body || !scroller || !track) return undefined;
    float.style.fontFamily = getComputedStyle(src).fontFamily;

    let raf = 0;
    const tick = () => {
      const cs = getComputedStyle(src);
      const r = chart.getBoundingClientRect();
      float.style.left = `${r.left + chart.clientLeft + src.offsetLeft}px`;
      float.style.top = `${r.top + chart.clientTop + src.offsetTop}px`;
      float.style.opacity = cs.opacity;
      float.style.transform = cs.transform;
      // When the card slides up to its Analysis view the tooltip is still
      // fading out — clip whatever part has passed the window's content top
      // so it scrolls away with the chart instead of riding up over the
      // browser bar. Capped by how far the chart has actually scrolled
      // (`scrolled`), so the open tooltip at rest is never clipped — on wider
      // cards it naturally pokes a few px above the content top, by design.
      const scrolled = track.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
      const fr = float.getBoundingClientRect();
      const over = Math.min(body.getBoundingClientRect().top - fr.top, -scrolled);
      const scale = fr.height / float.offsetHeight || 1;
      float.style.clipPath = over > 0 ? `inset(${over / scale}px 0 0 0)` : '';
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
      else float.style.opacity = '0';
    });
    io.observe(chart);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [tipHost]);

  const tooltipBody = (
    <>
      <span className="pc-tooltip__you">{d.yourBrand}</span>
      <p className="pc-tooltip__name">{target.name}</p>
      <div className="pc-tooltip__row"><span>{d.visibility}</span><span className="pc-tooltip__pill">90%</span></div>
      <div className="pc-tooltip__row"><span>{d.sentiment}</span><span className="pc-tooltip__pill">{tierLabels.Strong}</span></div>
    </>
  );

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
            <p className="pc-demo__title">{d.positionTitle}</p>
            <p className="pc-demo__sub">{d.positionSub}</p>
            <div className="pc-chart">
              {/* Clipped separately from .pc-chart so the tooltip below is free to
                  overflow the chart's rounded border — same as the real dashboard,
                  which renders its tooltip through a portal for exactly that reason. */}
              <div className="pc-quads">
                {PC_QUADRANTS.map((q) => (
                  <div key={q.key} className={`pc-quad pc-quad--${q.edge.replace(' ', '-') || 'none'}`}
                    style={{ top: `${q.top}%`, left: `${q.left}%`, background: q.bg }}>
                    <span className="pc-quad__label">{d[q.labelKey]}</span>
                  </div>
                ))}
              </div>
              {PC_BRANDS.map((b) => <PcDot key={b.id} brand={b} />)}

              <span className="pc-cursor" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M4 2l14 6.5-6 1.7-1.7 6L4 2z" fill="#0d111a" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
              </span>

              {/* Invisible "source" copy — keeps its CSS position + animation
                  so it stays in sync with the cursor, while the visible copy
                  below is portaled to <body> and mirrors it each frame. */}
              <div className="pc-tooltip pc-tooltip--source" ref={tipSrcRef} aria-hidden="true">
                {tooltipBody}
              </div>
              {tipHost && createPortal(
                <div className="pc-tooltip pc-tooltip--float" ref={tipFloatRef}>
                  {tooltipBody}
                </div>,
                tipHost,
              )}
            </div>

            <div className="pc-legend">
              <span>{d.low}</span>
              <span className="pc-legend__mid">{d.visibilityAxis}</span>
              <span>{d.high}</span>
            </div>

            <div className="pc-insight">
              <span className="pc-insight__icon">✦</span>
              <p><strong>{d.insightLabel}</strong> {d.insight}</p>
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
/* ── AI Trust (card 02) — a direct port of the "AI Trust Animation"
   reference prototype. One 531×399 frame, three acts on a 15s loop
   driven by a single rAF clock: Crawl (0–5.3s) → Score (5.3–10.2s) →
   Fix (10.2–15s), with step chips tracking progress top-right. Every
   value below is interpolated from `t` exactly as the reference does,
   so there are no CSS keyframes and nothing to keep in sync; the styles
   are inline for the same reason. Note the loop is longer than it looks
   — ENGINE_CARD_MS[1] has to clear 15s or the showcase swaps this card
   out mid-animation. ── */
const ATD_CYCLE = 15000;
const ATD_ACTS = [[0, 5300], [5300, 10200], [10200, 15000]];
const ATD_LOGO = (file) => `${import.meta.env.BASE_URL}${file}`;
const ATD_NAMES = { chatgpt: 'ChatGPT', claude: 'Claude', gemini: 'Gemini', mistral: 'Mistral', perplexity: 'Perplexity', grok: 'Grok' };
const ATD_LOGOS = {
  chatgpt: ATD_LOGO('chatgpt-com-logo.png'),
  claude: ATD_LOGO('claudeai-com-logo.png'),
  gemini: ATD_LOGO('gemini-ai-logo.png'),
  perplexity: ATD_LOGO('perplexity-ai-logo.png'),
  mistral: ATD_LOGO('mistral-ai-logo.png'),
  grok: ATD_LOGO('grok-com-logo.png'),
};
// Crawl log fixture: [status, path, latency].
const ATD_LOG = [
  [200, '/', '84ms'], [200, '/headphones', '112ms'], [200, '/headphones/wireless-earbuds', '96ms'],
  [301, '/store/earbuds', '41ms'], [200, '/t/wf-1000xm5-earbuds', '138ms'], [200, '/t/wf-c700n-earbuds', '121ms'],
  [404, '/t/wf-1000xm3-legacy', '33ms'], [200, '/support/earbuds', '88ms'], [200, '/blog/best-noise-cancelling', '143ms'],
  [200, '/t/linkbuds-s', '109ms'], [301, '/promo/earbuds-sale', '38ms'], [200, '/compare/wf-1000xm5', '127ms'],
  [200, '/t/ult-wear', '102ms'], [200, '/sitemap.xml', '57ms'],
];
// The pipeline's half-width at each stage boundary — the same taper the
// Site Health Pipeline uses, sampled at x = 0 / 400 / 800 / 1200.
const ATD_HALVES = [180, 147, 119.28, 76.53];
const ATD_PATH = 'M 0 30 C 200 30, 200 63, 400 63 C 600 63, 600 90.72, 800 90.72 C 1000 90.72, 1000 133.47, 1200 133.47 L 1200 286.53 C 1000 286.53, 1000 329.28, 800 329.28 C 600 329.28, 600 357, 400 357 C 200 357, 200 390, 0 390 Z';

const atdClamp = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const atdOut = (x) => 1 - Math.pow(1 - atdClamp(x), 3);
const atdInOut = (x) => { x = atdClamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const atdBack = (x) => { x = atdClamp(x); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };

function EngineTrustCard() {
  const { t: tr } = useLang();
  const d = tr('home.engine.demo.trust');
  const [t, setT] = useState(0);
  const rootRef = useRef(null);

  // One clock for the whole card. Runs only while the card is on screen
  // — off-screen it would burn a frame callback a tick for nothing, and
  // in the showcase this card is unmounted anyway between turns.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let raf = 0, t0 = 0, running = false;
    const tick = (now) => {
      if (!t0) t0 = now;
      setT((now - t0) % ATD_CYCLE);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true; t0 = 0;
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }, { threshold: 0.2 });
    io.observe(el.closest('.engine-showcase__panel') || el.closest('.engine-row__visual') || el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const L = ATD_LOGOS;
  const pop = (t0, from = 0.6, dur = 320) => ({
    o: atdOut((t - t0) / (dur * 0.7)),
    s: t < t0 ? from : from + (1 - from) * atdBack((t - t0) / dur),
  });
  const act = ([s, e]) => {
    const i = atdOut((t - s) / 420), o = atdClamp((e - t) / 320);
    return { o: Math.min(i, o), y: (1 - i) * 10 - (1 - o) * 6, s: 0.985 + 0.015 * i };
  };
  const a1 = act(ATD_ACTS[0]), a2 = act(ATD_ACTS[1]), a3 = act(ATD_ACTS[2]);

  const steps = [d.stepCrawl, d.stepScore, d.stepFix].map((label, i) => {
    const [s, e] = ATD_ACTS[i], on = t >= s && t < e, done = t >= e;
    return {
      label, mark: done ? '✓' : String(i + 1), prog: on ? atdClamp((t - s) / (e - s)) * 100 : 0,
      bg: on ? '#EEF4FF' : 'transparent', color: on ? '#0047b8' : done ? '#3F3F46' : '#9aa1ac',
      numBg: on ? 'rgb(0,98,255)' : done ? '#DCFCE7' : '#EEF1F6', numColor: on ? '#fff' : done ? '#16A34A' : '#9aa1ac',
    };
  });

  /* ── Act 1 · Crawl ── */
  const cp = atdOut((t - 300) / 4300);
  const R0 = 300, RT = 320, VIS = 8;
  const n = Math.max(0, Math.min(ATD_LOG.length, Math.floor((t - R0) / RT) + 1));
  const base = Math.max(0, n - VIS) * 22, prev = Math.max(0, n - 1 - VIS) * 22;
  const frac = atdOut((t - R0 - (n - 1) * RT) / 220);
  const rows = ATD_LOG.map(([code, path, ms], i) => {
    const ti = R0 + i * RT, fresh = t >= ti ? atdClamp(1 - (t - ti) / 700) : 0;
    return {
      code, path, ms, o: atdOut((t - ti) / 220), bg: `rgba(0,98,255,${(0.09 * fresh).toFixed(3)})`,
      cBg: code === 200 ? '#DCFCE7' : code === 301 ? '#FFF3EB' : '#FEE2E2',
      cColor: code === 200 ? '#16A34A' : code === 301 ? '#FA7319' : '#DC2626',
    };
  });
  const sp = atdClamp((t - 700) / 2900);
  const tags = [[14, d.scanTitleMeta, '✓', 1], [34, d.scanH1, '✓', 1], [60, d.scanSchemaMissing, '!', 0], [86, d.scanAltText, '✓', 1]]
    .map(([top, label, mark, ok]) => {
      const p = pop(700 + 2900 * top / 100, 0.7, 300);
      return { top, label, mark, o: p.o, s: p.s, bg: ok ? '#DCFCE7' : '#FFF3EB', color: ok ? '#16A34A' : '#FA7319' };
    });
  const bots = [['chatgpt', 'ChatGPT', 1], ['claude', 'Claude', 1], ['gemini', 'Gemini', 1], ['perplexity', 'Perplexity', 0]]
    .map(([k, name, ok], i) => {
      const tb = 3900 + i * 200, p = pop(tb), dd = pop(tb + 160, 0.4, 260), bad = !ok && t >= tb + 160;
      return {
        name, src: L[k], o: p.o, s: p.s, dotO: dd.o, dotS: dd.s,
        dot: ok ? '#16A34A' : '#DC2626', mark: ok ? '✓' : '✕',
        bg: bad ? '#FEF2F2' : '#fff', border: bad ? '#FCA5A5' : '#ECECEF',
      };
    });
  const pulse = (t % 1200) / 1200;

  /* ── Act 2 · Score ── */
  const ringP = atdOut((t - 5700) / 1300);
  const pills = [[d.stagePageAccess, 80, 16.667], [d.stageContentAccess, 79, 50], [d.stageContentQuality, 59, 83.333]]
    .map(([label, v, x], i) => {
      const tp = 5750 + i * 200, p = pop(tp, 0.8, 350);
      return { label, x, o: p.o, s: p.s, val: Math.round(v * atdOut((t - tp) / 900)) + '%' };
    });
  const badge = pop(7800, 0.6, 320);
  const halfAt = (xp) => {
    const X = Math.min(1199.9, Math.max(0, xp * 12)), i = Math.floor(X / 400), u = (X - i * 400) / 400;
    const sm = u * u * (3 - 2 * u);
    return ATD_HALVES[i] + (ATD_HALVES[i + 1] - ATD_HALVES[i]) * sm;
  };
  const laneY = (lane, xp) => 50 + (lane - 50) * (halfAt(xp) / 180) * 0.86;
  let blkO = 0, blkS = 0.7;
  const icons = [['mistral', 27], ['chatgpt', 37], ['claude', 27], ['perplexity', 68], ['grok', 76], ['gemini', 68]]
    .map(([k, y], i) => {
      const st = 5900 + i * 320, dt = t - st;
      // Perplexity is the one that gets stopped — it shakes, turns red
      // and the "Blocked by robots.txt" chip pops next to it.
      if (k === 'perplexity') {
        const hit = dt > 1000;
        const sh = dt > 1000 && dt < 1400 ? Math.sin(((dt - 1000) / 400) * Math.PI * 6) * 3 * (1 - (dt - 1000) / 400) : 0;
        const b = pop(st + 1050, 0.7, 280);
        blkO = b.o * atdClamp((2700 - dt) / 400); blkS = b.s;
        const px = 2 + 25 * atdOut(dt / 1000);
        return { src: L[k], name: ATD_NAMES[k], y: laneY(y, px), x: px, shake: sh, outline: hit ? '2px solid #EF4444' : '1px solid #e2e8f0', o: atdClamp(dt / 200) * atdClamp((2600 - dt) / 400) };
      }
      const p = atdClamp(dt / 2700), px = 2 + 91 * atdInOut(p);
      return { src: L[k], name: ATD_NAMES[k], y: laneY(y, px), x: px, shake: 0, outline: '1px solid #e2e8f0', o: dt <= 0 ? 0 : atdClamp(p / 0.08) * atdClamp((1 - p) / 0.1) };
    });

  /* ── Act 3 · Fix ── */
  const live = t >= 13600, idle = t < 12750;
  const segK = atdOut((t - 10450) / 800);
  const sev = [[d.sevCritical, 115, '16%', '#EF4444'], [d.sevWarning, 466, '63%', '#F97316'], [d.sevNotice, 154, '21%', '#0062FF']]
    .map(([label, nn, p, c], i) => {
      const o = atdOut((t - (10600 + i * 120)) / 300);
      return { label, n: nn, p, c, o, y: (1 - o) * 6 };
    });
  const fo = atdOut((t - 10950) / 350);
  const zk = atdOut((t - 12350) / 300) * atdClamp((13900 - t) / 300);
  const cm = atdOut((t - 11900) / 650), press = t > 12600 && t < 12780, rp = (t - 12650) / 600;
  const access = [['chatgpt', 'ChatGPT', 1], ['claude', 'Claude', 1], ['gemini', 'Gemini', 1], ['perplexity', 'Perplexity', 0]]
    .map(([k, name, ok], i) => {
      const o = atdOut((t - (10900 + i * 110)) / 300);
      return {
        name, src: L[k], o, x: (1 - o) * 8, status: ok ? d.allowed : d.blocked,
        bg: ok ? '#FAFAFA' : '#FEF2F2', border: ok ? '#ECECEF' : '#FCA5A5',
        sBg: ok ? '#DCFCE7' : '#FEE2E2', sColor: ok ? '#16A34A' : '#DC2626',
      };
    });

  // The reference insets each act by 14/16px because it owns the whole
  // frame; here the window body already pads 24px, and stacking the two
  // left the content 40px off every edge. Inset 0 so the body's 24px is
  // the only padding — the acts get those 16px back on all four sides.
  const actStyle = (a) => ({ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', opacity: a.o, transform: `translateY(${a.y}px) scale(${a.s})` });
  const muted = { fontSize: 11.5, color: '#6B6E72' };
  const capLabel = { fontSize: 9.5, fontWeight: 700, letterSpacing: '.05em', color: '#9aa1ac' };

  // The reference stands alone in a 531×399 frame and pins itself to
  // min-height:390. Inside this card the window body is 349px after its
  // padding, so that floor overran it and cut the bottom row off — fill
  // the body instead and let the three acts lay out to it.
  return (
    <div ref={rootRef} className="atd-frame" style={{ position: 'relative', width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', background: '#fff', fontFamily: 'var(--manrope)', color: '#09090b', overflow: 'hidden' }}>
      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>

        {/* Crawl · Score · Fix, each filling as its act plays. */}
        <div style={{ position: 'absolute', top: 14, right: 16, zIndex: 3, display: 'flex', gap: 4 }}>
          {steps.map((s) => (
            <div key={s.label} style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 5, height: 22, padding: '0 9px 0 5px', borderRadius: 999, background: s.bg, color: s.color, fontSize: 10.5, fontWeight: 600, transition: 'background .3s, color .3s' }}>
              <span style={{ width: 14, height: 14, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8.5, fontWeight: 700, background: s.numBg, color: s.numColor, transition: 'background .3s, color .3s' }}>{s.mark}</span>
              <span>{s.label}</span>
              <span style={{ position: 'absolute', left: 0, bottom: 0, height: 2, width: `${s.prog}%`, background: 'rgb(0,98,255)' }} />
            </div>
          ))}
        </div>

        {/* ── Act 1 · Crawl ── */}
        <div style={actStyle(a1)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ position: 'relative', width: 8, height: 8, flex: 'none' }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#16A34A', transform: `scale(${1 + 1.6 * pulse})`, opacity: 0.5 * (1 - pulse) }} />
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#16A34A' }} />
              </span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{d.crawlingTitle}</span>
            </div>
            <span style={muted}>{d.crawlingSub}</span>
          </div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px', fontVariantNumeric: 'tabular-nums' }}>{Math.round(1284 * cp).toLocaleString('en-US')}</span>
              <span style={{ fontSize: 12, color: '#6B6E72' }}>{d.pagesCrawled}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: '#0047b8', fontVariantNumeric: 'tabular-nums' }}>{Math.round(cp * 100)}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 999, background: '#EEF1F6', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${cp * 100}%`, background: 'rgb(0,98,255)', borderRadius: 999 }} />
            </div>
          </div>
          <div style={{ marginTop: 12, flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0, border: '1px solid #ECECEF', borderRadius: 10, background: '#FAFBFC', padding: '9px 8px 6px' }}>
              <span style={{ ...capLabel, padding: '0 2px' }}>{d.liveCrawlLog}</span>
              <div style={{ position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden', WebkitMaskImage: 'linear-gradient(180deg,#000 78%,transparent)', maskImage: 'linear-gradient(180deg,#000 78%,transparent)' }}>
                <div style={{ transform: `translateY(${-(prev + (base - prev) * frac)}px)` }}>
                  {rows.map((r) => (
                    <div key={r.path} style={{ display: 'flex', alignItems: 'center', gap: 6, height: 22, padding: '0 4px', borderRadius: 5, opacity: r.o, background: r.bg }}>
                      <span style={{ flex: 'none', width: 26, textAlign: 'center', fontSize: 9, fontWeight: 700, padding: '1px 0', borderRadius: 4, background: r.cBg, color: r.cColor }}>{r.code}</span>
                      <span style={{ flex: 1, minWidth: 0, fontSize: 10.5, color: '#3F3F46', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.path}</span>
                      <span style={{ flex: 'none', fontSize: 9.5, color: '#9aa1ac', fontVariantNumeric: 'tabular-nums' }}>{r.ms}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, minHeight: 0, border: '1px solid #ECECEF', borderRadius: 10, background: '#fff', padding: '9px 10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                <span style={{ ...capLabel, flex: 'none' }}>{d.pageScan}</span>
                <span style={{ marginLeft: 'auto', minWidth: 0, fontSize: 9.5, fontWeight: 500, color: 'rgb(0,98,255)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>/t/wf-1000xm5-earbuds</span>
              </div>
              {/* A wireframe of the page being read, with the scan beam
                  sweeping it and a verdict chip popping at each band. */}
              <div style={{ position: 'relative', flex: 1, minHeight: 0, borderRadius: 7, background: '#F7F9FC', border: '1px solid #EEF1F6', overflow: 'hidden', padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <span style={{ width: 18, height: 6, borderRadius: 2, background: '#CBD5E1' }} />
                  <span style={{ flex: 1 }} />
                  {[0, 1, 2].map((i) => <span key={i} style={{ width: 12, height: 4, borderRadius: 2, background: '#E2E8F0' }} />)}
                </div>
                <div style={{ display: 'flex', gap: 7 }}>
                  <div style={{ width: '42%', height: 46, borderRadius: 5, background: '#E6ECF7' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 2 }}>
                    <span style={{ height: 7, width: '85%', borderRadius: 2, background: '#94A3B8' }} />
                    <span style={{ height: 4, width: '95%', borderRadius: 2, background: '#E2E8F0' }} />
                    <span style={{ height: 4, width: '70%', borderRadius: 2, background: '#E2E8F0' }} />
                    <span style={{ marginTop: 3, height: 9, width: '44%', borderRadius: 3, background: '#C9D9FF' }} />
                  </div>
                </div>
                <span style={{ height: 4, width: '100%', borderRadius: 2, background: '#E2E8F0' }} />
                <span style={{ height: 4, width: '92%', borderRadius: 2, background: '#E2E8F0' }} />
                <span style={{ height: 4, width: '64%', borderRadius: 2, background: '#E2E8F0' }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 4 }}>
                  {[0, 1, 2].map((i) => <span key={i} style={{ height: 16, borderRadius: 3, background: '#EDF1F7' }} />)}
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: `${sp * 100}%`, height: 34, transform: 'translateY(-100%)', background: 'linear-gradient(180deg,rgba(0,98,255,0),rgba(0,98,255,.16))', opacity: atdClamp((t - 600) / 200) * atdClamp((3800 - t) / 300), pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', left: 0, right: 0, top: `${sp * 100}%`, height: 2, background: 'rgb(0,98,255)', boxShadow: '0 0 8px rgba(0,98,255,.6)', opacity: atdClamp((t - 600) / 200) * atdClamp((3800 - t) / 300) }} />
                {tags.map((g) => (
                  <div key={g.label} style={{ position: 'absolute', right: 6, top: `${g.top}%`, transform: `translateY(-50%) scale(${g.s})`, transformOrigin: 'right center', opacity: g.o, display: 'flex', alignItems: 'center', gap: 4, padding: '2px 7px', borderRadius: 999, background: g.bg, color: g.color, fontSize: 9, fontWeight: 700, boxShadow: '0 2px 6px rgba(15,23,42,.12)', whiteSpace: 'nowrap' }}>
                    <span>{g.mark}</span><span>{g.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={capLabel}>{d.aiCrawlers}</span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, paddingRight: 3 }}>
                  {bots.map((b) => (
                    <div key={b.name} style={{ position: 'relative', width: 24, height: 24, borderRadius: 7, background: b.bg, border: `1px solid ${b.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: b.o, transform: `scale(${b.s})` }}>
                      <img src={b.src} alt={b.name} style={{ width: 14, height: 14, objectFit: 'contain' }} width="14" height="14" />
                      <span style={{ position: 'absolute', right: -5, bottom: -5, width: 13, height: 13, borderRadius: '50%', background: b.dot, color: '#fff', fontSize: 7.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #fff', opacity: b.dotO, transform: `scale(${b.dotS})` }}>{b.mark}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Act 2 · Score ── */}
        <div style={actStyle(a2)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{d.pipelineTitle}</span>
            <span style={muted}>{d.pipelineSub}</span>
          </div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative', width: 48, height: 48, flex: 'none' }}>
              <svg width="48" height="48" viewBox="0 0 64 64" style={{ display: 'block', transform: 'rotate(-90deg)' }}>
                <circle cx="32" cy="32" r="26" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                <circle cx="32" cy="32" r="26" fill="none" stroke="#1F3EA8" strokeWidth="6" strokeLinecap="round" strokeDasharray="163.36" strokeDashoffset={163.36 * (1 - 0.73 * ringP)} />
              </svg>
              <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#1F3EA8', fontVariantNumeric: 'tabular-nums' }}>{Math.round(73 * ringP)}%</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={capLabel}>{d.healthScore}</span>
              <span style={muted}>{d.acrossCrawled}</span>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: '#FA7319', background: '#FFF3EB', padding: '4px 10px', borderRadius: 999, opacity: atdOut((t - 7000) / 300) }}>{d.needsWork}</span>
          </div>
          {/* Negative margins bleed the pipeline out past the body's own
              padding so it still runs to the frame's edges. */}
          <div style={{ position: 'relative', margin: '12px -24px -24px', flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <svg viewBox="0 0 1200 420" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="atdFlow" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="0">
                  <stop offset="0%" stopColor="#1e3a8a" /><stop offset="33.333%" stopColor="#3e5aa1" />
                  <stop offset="66.667%" stopColor="#5975b5" /><stop offset="100%" stopColor="#839fd3" />
                </linearGradient>
                <filter id="atdGlow" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="10" /></filter>
              </defs>
              <line x1="400" y1="24" x2="400" y2="396" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
              <line x1="800" y1="24" x2="800" y2="396" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
              <path d={ATD_PATH} fill="none" stroke="url(#atdFlow)" strokeOpacity="0.22" strokeWidth="26" strokeLinejoin="round" filter="url(#atdGlow)" />
              <path d={ATD_PATH} fill="none" stroke="url(#atdFlow)" strokeOpacity="0.32" strokeWidth="12" strokeLinejoin="round" />
              <path d={ATD_PATH} fill="url(#atdFlow)" />
              <path d="M 0 44 C 200 44, 200 77, 400 77 C 600 77, 600 104.72, 800 104.72 C 1000 104.72, 1000 147.47, 1200 147.47" fill="none" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="6 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d="M 0 376 C 200 376, 200 343, 400 343 C 600 343, 600 315.28, 800 315.28 C 1000 315.28, 1000 272.53, 1200 272.53" fill="none" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="6 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
            {icons.map((i, idx) => (
              <div key={idx} style={{ position: 'absolute', left: `${i.x}%`, top: `${i.y}%`, width: 26, height: 26, margin: '-13px 0 0 -13px', transform: `translateX(${i.shake}px)`, borderRadius: 8, background: '#fff', boxShadow: '0 4px 12px rgba(15,23,42,.18)', outline: i.outline, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: i.o }}>
                <img src={i.src} alt={i.name} style={{ width: 16, height: 16, objectFit: 'contain' }} width="16" height="16" />
              </div>
            ))}
            <div style={{ position: 'absolute', left: '27%', top: `${laneY(68, 27)}%`, transform: `translate(-50%,20px) scale(${blkS})`, opacity: blkO, display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 999, background: '#FEE2E2', color: '#DC2626', fontSize: 9.5, fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(15,23,42,.12)' }}>{d.blockedByRobots}</div>
            {pills.map((p) => (
              <div key={p.label} style={{ position: 'absolute', left: `${p.x}%`, top: '50%', transform: `translate(-50%,-50%) scale(${p.s})`, opacity: p.o, display: 'flex', alignItems: 'center', gap: 5, background: '#fff', padding: '5px 11px', borderRadius: 999, boxShadow: '0 2px 10px rgba(15,23,42,.12)', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: '#1e293b' }}>{p.label}</span>
                <span style={{ fontSize: 11.5, color: '#64748b', fontVariantNumeric: 'tabular-nums' }}>{p.val}</span>
              </div>
            ))}
            <div style={{ position: 'absolute', left: '83.33%', top: '25%', transform: `translate(-50%,-100%) scale(${badge.s})`, opacity: badge.o, display: 'flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: 999, background: '#FFF3EB', color: '#FA7319', fontSize: 10, fontWeight: 600, whiteSpace: 'nowrap' }}>
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              <span>{d.lowContentQuality}</span>
            </div>
          </div>
        </div>

        {/* ── Act 3 · Fix ── */}
        <div style={actStyle(a3)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{d.issuesTitle}</span>
            <span style={muted}>{d.issuesGenerated}</span>
          </div>
          <div style={{ marginTop: 12, flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1.12fr) 1px minmax(0,1fr)', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
                <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.8px', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{live ? 734 : Math.round(735 * atdOut((t - 10500) / 1100))}</span>
                <span style={{ fontSize: 13, color: '#6B6E72' }}>{d.issuesUnit}</span>
                <span style={{ marginLeft: 'auto', alignSelf: 'center', fontSize: 10.5, fontWeight: 600, color: '#FA7319', background: '#FFF3EB', padding: '4px 9px', borderRadius: 999 }}>{d.needsWork}</span>
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 2, height: 7, borderRadius: 999, overflow: 'hidden', background: '#F1F3F7' }}>
                <span style={{ width: `${16 * segK}%`, background: '#EF4444' }} />
                <span style={{ width: `${63 * segK}%`, background: '#F97316' }} />
                <span style={{ width: `${21 * segK}%`, background: '#0062FF' }} />
              </div>
              <div style={{ marginTop: 9, display: 'flex', flexDirection: 'column' }}>
                {sev.map((v) => (
                  <div key={v.label} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 22, opacity: v.o, transform: `translateY(${v.y}px)` }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', flex: 'none', background: v.c }} />
                    <span style={{ flex: 1, fontSize: 12.5, color: '#3F3F46' }}>{v.label}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{v.n}</span>
                    <span style={{ width: 30, textAlign: 'right', fontSize: 11, color: '#9aa1ac' }}>{v.p}</span>
                  </div>
                ))}
              </div>
              {/* The one fix the demo deploys — cursor drops in, presses
                  Deploy, and the chip goes Deploying… → Live. */}
              <div style={{ position: 'relative', marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '7px 9px', borderRadius: 9, border: `1px solid ${zk > 0.5 ? '#3B6FF5' : '#d5d9e4'}`, background: '#fff', boxShadow: `0 0 0 ${zk.toFixed(2)}px #3B6FF5, 0 6px 16px -6px rgba(15,23,42,${(0.28 * zk).toFixed(3)})`, opacity: fo, transform: `translateY(${(1 - fo) * 8 - 2 * zk}px)` }}>
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ alignSelf: 'flex-start', fontSize: 8, fontWeight: 700, letterSpacing: '.03em', color: '#FA7319', background: '#FFF3EB', padding: '1.5px 6px', borderRadius: 999, marginBottom: 2 }}>{d.stageContentQuality.toUpperCase()}</span>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: '#0d111a', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.fixIssueName}</span>
                  <span style={{ fontSize: 9.5, color: 'rgb(0,98,255)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>sony.com/t/wf-1000xm5-earbuds</span>
                </div>
                <div style={{ position: 'relative', flex: 'none' }}>
                  {idle && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: '#fff', background: '#3B6FF5', borderRadius: 6, padding: '5px 9px', transform: `scale(${press ? 0.94 : 1})` }}>
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m14.7 6.3 3 3L19 8l-3-3zM3 21l3.5-1L17 9.5l-2.5-2.5L4 17.5z" /></svg>
                      <span>{d.deploy}</span>
                    </span>
                  )}
                  {!idle && !live && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 700, color: '#737373', background: '#f3f5f9', borderRadius: 6, padding: '5px 9px' }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid #d5d9e4', borderTopColor: '#737373', transform: `rotate(${(t * 0.55) % 360}deg)` }} />
                      <span>{d.deploying}</span>
                    </span>
                  )}
                  {live && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: '#16A34A', background: '#DCFCE7', borderRadius: 6, padding: '5px 9px', transform: `scale(${0.85 + 0.15 * atdBack((t - 13600) / 350)})` }}>
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                      <span>{d.live}</span>
                    </span>
                  )}
                  <span style={{ position: 'absolute', left: '50%', top: '50%', width: 22, height: 22, margin: '-11px 0 0 -11px', borderRadius: '50%', border: '2px solid rgb(0,98,255)', transform: `scale(${0.4 + 1.4 * atdClamp(rp)})`, opacity: rp > 0 && rp < 1 ? 0.7 * (1 - rp) : 0, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', left: '50%', top: '50%', zIndex: 3, transform: `translate(${64 * (1 - cm) + 2}px,${44 * (1 - cm) + 4}px) scale(${press ? 0.82 : 1})`, opacity: atdClamp((t - 11800) / 200) * atdClamp((13000 - t) / 250), pointerEvents: 'none', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.35))' }}>
                    <svg viewBox="0 0 24 24" fill="#18181B" width="15" height="15"><path d="M5 3l14 8-6 2-2 6-6-16z" /></svg>
                  </div>
                </div>
              </div>
              <span style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: 'rgb(0,98,255)' }}>{d.viewDetails} <span>→</span></span>
            </div>
            <div style={{ background: '#ECECEF' }} />
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, opacity: atdOut((t - 10700) / 400) }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: '#1f2430' }}>{d.robotsTitle}</span>
                  <span style={{ fontSize: 10.5, color: '#6B6E72' }}>{d.robotsShortSub}</span>
                </div>
                <span style={{ fontSize: 17, fontWeight: 600, whiteSpace: 'nowrap' }}>80<span style={{ fontSize: 11, fontWeight: 400, color: '#A1A1AA' }}>/100</span></span>
              </div>
              <div style={{ marginTop: 10, display: 'flex', gap: 3, height: 7 }}>
                <span style={{ width: `${93 * atdOut((t - 10750) / 800)}%`, borderRadius: 999, background: '#2563EB' }} />
                <span style={{ width: `${7 * atdOut((t - 10750) / 800)}%`, borderRadius: 999, background: '#EF4444' }} />
              </div>
              <div style={{ marginTop: 7, display: 'flex', gap: 12, fontSize: 10.5, color: '#3F3F46' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><i style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563EB' }} />{d.allowed}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><i style={{ width: 7, height: 7, borderRadius: '50%', background: '#EF4444' }} />{d.blocked}</span>
              </div>
              <span style={{ ...capLabel, marginTop: 11 }}>{d.crawlerAccess}</span>
              <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {access.map((c) => (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '4px 7px', borderRadius: 8, background: c.bg, border: `1px solid ${c.border}`, opacity: c.o, transform: `translateX(${c.x}px)` }}>
                    <img src={c.src} alt={c.name} style={{ width: 13, height: 13, objectFit: 'contain' }} width="13" height="13" />
                    <span style={{ flex: 1, fontSize: 11, fontWeight: 500, color: '#3F3F46' }}>{c.name}</span>
                    <span style={{ fontSize: 8.5, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: c.sBg, color: c.sColor }}>{c.status}</span>
                  </div>
                ))}
              </div>
              <span style={{ marginTop: 'auto', textAlign: 'center', fontSize: 11.5, fontWeight: 600, padding: '6px 0', borderRadius: 999, background: '#1E408A', color: '#fff' }}>{d.viewFullReport}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Roadmap Plan — Timeline / Execution board, a direct port of the
   "Roadmap Timeline" reference prototype: same five lanes, same explicit
   bar rows, same 188px label column + 7.9fr week-1 track, same board
   columns and the same recorded cursor choreography (useRmtShowcase
   below). Markup lives under its own .rmt-* namespace so it doesn't
   collide with the .rm-* rules (the toggle pill) shared with the rest of
   this card. Task text comes from home.engine.demo.roadmap. ── */

// The reference's own palette (its `C` map), one color per lane.
const RMT_COLORS = {
  blue: 'rgb(0, 98, 255)',
  pink: 'rgb(204, 121, 167)',
  yellow: 'rgb(230, 159, 0)',
  green: 'rgb(0, 158, 115)',
  lightBlue: 'rgb(86, 180, 233)',
};
const rmtRange = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

// The plan runs 18 weeks (the header still says so), but the chart stops
// at week 10 — past that the bars are pure color anyway, and the width
// those weeks would cost is what the lane names and the week-1 task
// titles need to be readable rather than truncated.
const RMT_WEEKS = 10;

// Lane rows, spelled out exactly as the reference's `data` — no packing
// heuristic, so every bar lands on the row it was authored on. A cell
// that is an array is the lane's one *named* bar: it starts at week 1
// and spans weeks 1–2, and is the only cell that carries text. A number
// is a plain one-week bar in that week, color only.
const RMT_LANES = [
  {
    labelKey: 'catTechnical', color: RMT_COLORS.blue, rows: [
      [['taskFixCrawlability'], 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18],
      [['taskAllowAiCrawlers'], 4, 18],
      [['taskFixNoindexProAnc'], 4],
    ],
  },
  { labelKey: 'catContentOptimize', color: RMT_COLORS.yellow, rows: [rmtRange(7, 16)] },
  { labelKey: 'catContentPlan', color: RMT_COLORS.green, rows: [rmtRange(3, 18), [3]] },
  { labelKey: 'catInternalLinking', color: RMT_COLORS.pink, rows: [[['taskLinkPillarPage']]] },
  { labelKey: 'catBacklink', color: RMT_COLORS.lightBlue, rows: [rmtRange(8, 15), rmtRange(8, 14)] },
];

// Week 2's named tasks, shown only once the demo moves the current week
// from Week 1 to Week 2 (lane index into RMT_LANES, row within the lane).
const RMT_WEEK2_TASKS = [
  { lane: 2, row: 0, titleKey: 'taskLaunchContentPlan' },
  { lane: 2, row: 1, titleKey: 'taskFirstArticle' },
  { lane: 4, row: 0, titleKey: 'taskSecondBacklink' },
];
// Grid tracks per current week: that week owns the wide track (the only
// one carrying task titles), the rest share the remaining space. Same
// track count either way, so the switch animates (see .rmt-weeks).
const rmtWeekCols = (cur) => rmtRange(1, RMT_WEEKS).map((wk) => `minmax(0, ${wk === cur ? 7.9 : 1}fr)`).join(' ');

// The board lists the five real tasks (the reference's `tasks`), not one
// card per timeline cell — the rest of the plan stays behind "Show N
// more", which is what keeps the Backlog column readable.
const RMT_MOVE_TASK_ID = 'il1';
const RMT_TOTAL_TASKS = 63;
const RMT_BACKLOG_SHOWN = 3;
const RMT_BOARD_TASKS = [
  { id: RMT_MOVE_TASK_ID, labelKey: 'catInternalLinking', color: RMT_COLORS.pink, titleKey: 'taskLinkPillarPage', week: 1, span: 2 },
  { id: 'tf1', labelKey: 'catTechnical', color: RMT_COLORS.blue, titleKey: 'taskFixCrawlability', week: 1, span: 2 },
  { id: 'tf2', labelKey: 'catTechnical', color: RMT_COLORS.blue, titleKey: 'taskAllowAiCrawlers', week: 1, span: 2 },
  { id: 'tf3', labelKey: 'catTechnical', color: RMT_COLORS.blue, titleKey: 'taskFixNoindexProAnc', week: 1, span: 2 },
  { id: 'lc1', labelKey: 'catContentPlan', color: RMT_COLORS.green, titleKey: 'taskBuyingGuide', week: 3, span: 1 },
];

// ── Timeline (Gantt) — the label column and every lane's bar track share
// the same two-column outer grid, and each bar track repeats the week
// columns, so bars line up with the week header above them. Clicking a
// bar selects it (outline + the hint line names it), as in the
// reference; nothing here autoplays — the Execution board carries the
// one animated demo. ── */
function RmTimelinePanel({ week = 1, week2Ref }) {
  const { t } = useLang();
  const d = t('home.engine.demo.roadmap');
  const [sel, setSel] = useState(null);
  const onWeek2 = week === 2;

  // Walk the lanes once, building both the bars to render and the label
  // for whichever one is selected. Once the current week is Week 2, the
  // Week 1 tasks shrink to their own column (no title) and Week 2's own
  // tasks appear in the wide track instead.
  let selLabel = null;
  const lanes = RMT_LANES.map((lane, laneIdx) => {
    const bars = [];
    lane.rows.forEach((row, rowIdx) => row.forEach((cell) => {
      const named = Array.isArray(cell);
      const week = named ? 1 : cell;
      if (week > RMT_WEEKS) return; // chart is cut at RMT_WEEKS, see above
      const id = `${laneIdx}-${rowIdx}-${week}`;
      const label = named ? d[cell[0]] : `${d[lane.labelKey]} · ${d[`wk${week}`]}`;
      if (sel === id) selLabel = `${label} — ${named ? d.week1Span : d[`wk${week}`]}`;
      bars.push({
        id, label,
        text: named && !onWeek2 ? d[cell[0]] : '',
        gridColumn: named && !onWeek2 ? '1 / span 2' : `${week} / span 1`,
        gridRow: `${rowIdx + 1}`,
        outline: sel === id ? `2px solid ${lane.color}` : 'none',
      });
    }));
    if (onWeek2) {
      RMT_WEEK2_TASKS.filter((task) => task.lane === laneIdx).forEach((task) => {
        const id = `${laneIdx}-${task.row}-w2`;
        if (sel === id) selLabel = `${d[task.titleKey]} — ${d.wk2}`;
        bars.push({
          id, label: d[task.titleKey], text: d[task.titleKey], isNew: true,
          gridColumn: '2 / span 1', gridRow: `${task.row + 1}`,
          outline: sel === id ? `2px solid ${lane.color}` : 'none',
        });
      });
    }
    return { key: lane.labelKey, name: d[lane.labelKey], color: lane.color, bars };
  });
  const cols = { gridTemplateColumns: rmtWeekCols(week) };

  return (
    <div className="rmt-timeline">
      <p className="rmt-hint">
        <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M6 1.5v3M6 9.5v3M1.5 7h3M9.5 7h3M2.8 3.8l1.6 1.6M7.6 8.6l1.6 1.6M9.2 3.8L7.6 5.4M4.4 8.6l-1.6 1.6M11.5 11.5l3 3" />
        </svg>
        <span>{selLabel ? `${d.selectedPrefix} ${selLabel}` : d.selectHint}</span>
      </p>
      <div className="rmt-scroll">
      <div className="rmt-grid" style={{ '--rmt-week-cols': RMT_WEEKS - 1 }}>
        <div className="rmt-grid__labelhead" />
        <div className="rmt-weeks" style={cols}>
          {/* The current week owns the wide track — the only one carrying
              task titles — so it gets the filled pill and a full label. */}
          {rmtRange(1, RMT_WEEKS).map((wk) => (wk === week ? (
            <span key={wk} className="rmt-week rmt-week--cur" ref={wk === 2 ? week2Ref : undefined}>
              {d.currentWeekLabel.replace(/\d+$/, String(wk))}
            </span>
          ) : (
            <span key={wk} className="rmt-week" ref={wk === 2 ? week2Ref : undefined}>{d[`wk${wk}`]}</span>
          )))}
        </div>
        {lanes.map((lane) => (
          <Fragment key={lane.key}>
            <div className="rmt-lane-label">
              <span className="rmt-lane-dot" style={{ background: lane.color }} />
              <span>{lane.name}</span>
            </div>
            <div className="rmt-bars" style={cols}>
              {lane.bars.map((bar) => (
                <button
                  key={bar.id}
                  type="button"
                  className={`rmt-bar${bar.isNew ? ' rmt-bar--new' : ''}`}
                  title={bar.label}
                  onClick={() => setSel((cur) => (cur === bar.id ? null : bar.id))}
                  style={{ gridColumn: bar.gridColumn, gridRow: bar.gridRow, background: lane.color, outline: bar.outline }}
                >
                  {bar.text}
                </button>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
      </div>
    </div>
  );
}

function RmtBoardCard({ task, dimmed, done, innerRef }) {
  const { t } = useLang();
  const d = t('home.engine.demo.roadmap');
  const span = task.span ?? 1;
  // "W1"/"S1" → non-digit prefix, so a multi-week task reads "W1–2"
  // without needing a translation key per possible range.
  const weekBadge = span > 1 ? `${d.wk1.replace(/\d+$/, '')}${task.week}–${task.week + span - 1}` : d[`wk${task.week}`];
  return (
    <div className={`rmt-bcard${dimmed ? ' rmt-bcard--dimmed' : ''}${done ? ' rmt-bcard--done' : ''}`} ref={innerRef}>
      <span className="rmt-bcard__top">
        <i className="rmt-bcard__dot" style={{ background: task.color }} />
        <span className="rmt-bcard__cat">{d[task.labelKey]}</span>
        <span className="rmt-bcard__wk">{weekBadge}</span>
      </span>
      <span className="rmt-bcard__title">{d[task.titleKey]}</span>
    </div>
  );
}

// ── Execution Board showcase — ported from the reference prototype's own
// recorded choreography (same waits, same grab-point ratios, same
// two-stage drag): a cursor clicks the Execution board tab, drags the
// one named card from Backlog to In progress, then drags it again from
// In progress to Completed. The one change from the reference: there,
// "Replay interaction" is a manual button and the sequence runs once;
// here it just restarts itself after a pause, on a loop. Starts once the
// card has scrolled into view.
// Pauses a scripted demo while it's off screen: gate(fn) runs fn right away
// if the demo is visible, otherwise holds it until it scrolls back into view
// (setVisible(true) flushes the held steps). So a looping demo stops at its
// next step instead of cycling forever in the background.
function makeVisibilityGate() {
  let visible = false;
  let held = [];
  return {
    setVisible(v) {
      visible = v;
      if (v && held.length) { const run = held; held = []; run.forEach((fn) => fn()); }
    },
    gate(fn) { if (visible) fn(); else held.push(fn); },
    clear() { held = []; },
  };
}

function useRmtShowcase({ rootRef, boardBtnRef, week2Ref, cardRef, progressRef, doneRef, setView, setWeek }) {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, down: false, dur: 0 });
  const [ghost, setGhost] = useState(null); // null | { x, y, w, dur }
  const [over, setOver] = useState(null); // null | 'in_progress' | 'done'
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState('backlog'); // 'backlog' | 'in_progress' | 'done'
  const [ebPressed, setEbPressed] = useState(false);
  const cancelledRef = useRef(false);
  const timersRef = useRef([]);
  const [gate] = useState(makeVisibilityGate);

  // Each step's wait only resolves while the card is on screen, so the loop
  // stops at its next step when scrolled away and resumes when it's back.
  function wait(ms) {
    return new Promise((resolve) => { timersRef.current.push(setTimeout(() => gate.gate(resolve), ms)); });
  }
  function patchCursor(p) {
    setCursor((s) => ({ ...s, ...p }));
  }
  // The demo is laid out at the reference's own 1197px width and scaled
  // down to the card (see .rmt-stage) — so client rects come back in
  // scaled pixels while `left`/`top` on the cursor and ghost are read in
  // the unscaled layout. Divide out the scale to stay in one space.
  function rel(node) {
    const root = rootRef.current;
    const r = node.getBoundingClientRect();
    const o = root.getBoundingClientRect();
    const scale = o.width / root.offsetWidth || 1;
    return { x: (r.left - o.left) / scale, y: (r.top - o.top) / scale, w: r.width / scale, h: r.height / scale };
  }

  async function run() {
    const root = rootRef.current;
    if (!root) return;
    const ok = () => !cancelledRef.current && rootRef.current;
    const W = root.offsetWidth, H = root.offsetHeight;

    setView('timeline'); setWeek(1);
    setStatus('backlog'); setGhost(null); setOver(null); setDragging(false);
    setCursor({ x: W * 0.62, y: H * 0.7, visible: false, down: false, dur: 0 });
    await wait(300); if (!ok()) return;
    patchCursor({ visible: true }); await wait(400); if (!ok()) return;

    // Move the current week from Week 1 to Week 2 (click the W2 header),
    // and hold so Week 2's tasks can be read before going to the board.
    if (!week2Ref.current) return;
    const w2 = rel(week2Ref.current);
    patchCursor({ x: w2.x + w2.w * 0.5, y: w2.y + w2.h * 0.6, dur: 800 }); await wait(950); if (!ok()) return;
    patchCursor({ down: true }); await wait(140); if (!ok()) return;
    setWeek(2); patchCursor({ down: false }); await wait(1700); if (!ok()) return;

    const b = rel(boardBtnRef.current);
    patchCursor({ x: b.x + b.w * 0.55, y: b.y + b.h * 0.6, dur: 900 }); await wait(1050); if (!ok()) return;
    patchCursor({ down: true }); setEbPressed(true); await wait(140); if (!ok()) return;
    setView('board'); setEbPressed(false); patchCursor({ down: false }); await wait(750); if (!ok()) return;
    if (!cardRef.current) return;

    const c = rel(cardRef.current);
    const gx = c.w * 0.42, gy = c.h * 0.55;
    patchCursor({ x: c.x + gx, y: c.y + gy, dur: 900 }); await wait(1050); if (!ok()) return;
    patchCursor({ down: true }); setDragging(true); setGhost({ x: c.x, y: c.y, w: c.w, dur: 0 });
    await wait(260); if (!ok()) return;

    const p = rel(progressRef.current);
    const tx = p.x + 10, ty = p.y + 44;
    setOver('in_progress'); setGhost({ x: tx, y: ty, w: c.w, dur: 1000 });
    patchCursor({ x: tx + gx, y: ty + gy, dur: 1000 }); await wait(1100); if (!ok()) return;
    setStatus('in_progress'); setGhost(null); setOver(null); setDragging(false); patchCursor({ down: false });
    await wait(800); if (!ok()) return;
    if (!cardRef.current) return;

    const c2 = rel(cardRef.current);
    patchCursor({ x: c2.x + gx, y: c2.y + gy, dur: 400 }); await wait(500); if (!ok()) return;
    patchCursor({ down: true }); setDragging(true); setGhost({ x: c2.x, y: c2.y, w: c2.w, dur: 0 });
    await wait(260); if (!ok()) return;

    const don = rel(doneRef.current);
    const dx = don.x + 10, dy = don.y + 44;
    setOver('done'); setGhost({ x: dx, y: dy, w: c2.w, dur: 1000 });
    patchCursor({ x: dx + gx, y: dy + gy, dur: 1000 }); await wait(1100); if (!ok()) return;
    setStatus('done'); setGhost(null); setOver(null); setDragging(false); patchCursor({ down: false });
    await wait(700); if (!ok()) return;

    patchCursor({ visible: false, dur: 0 });
  }

  useEffect(() => {
    // Gate on the nearest ancestor that isn't on a transformed layer. In
    // the bento showcase this card rides the flip panel, whose 3D
    // transform projects its descendants' client rects far off-screen —
    // observing the card itself there means the sequence never starts.
    const root = rootRef.current;
    if (!root) return;
    // Checked in order: the bento's panel sits outside the flip, while
    // the row visual (which the demo also carries a class for) is inside
    // it — a single selector list would match the inner one first.
    const el = root.closest('.engine-showcase__panel') || root.closest('.engine-row__visual') || root;
    async function loop() {
      while (!cancelledRef.current) {
        await run();
        if (cancelledRef.current) return;
        await wait(1400);
      }
    }
    // Starts the first time the card is 30% in view; after that it only
    // tracks visibility, so the loop pauses whenever the card is off screen.
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        gate.setVisible(entry.isIntersecting);
        if (!started && entry.intersectionRatio >= 0.3) { started = true; loop(); }
      },
      { threshold: [0, 0.3] },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      gate.clear();
      cancelledRef.current = true;
      // timersRef.current is a stable array (pushed to, never reassigned)
      // for this hook's whole lifetime, so reading it here is safe.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timersRef.current.forEach(clearTimeout);
    };
    // `run` intentionally isn't a dependency — it's meant to be captured
    // once, the moment the card first scrolls into view, not re-armed on
    // every render; `cancelledRef`/`ok()` checks inside it already guard
    // every await against a stale/unmounted run.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef]);

  return { status, cursor, ghost, over, dragging, ebPressed };
}

function RmExecutionBoardPanel({ status, over, dragging, cardRef, progressRef, doneRef }) {
  const { t } = useLang();
  const d = t('home.engine.demo.roadmap');

  // Only the one card the showcase drags ever leaves Backlog, so the
  // other four stay put. Backlog's count is the whole plan minus
  // whatever has moved — the five cards on screen are just the top of
  // it, with the rest behind "Show N more", as in the reference.
  const moved = status === 'backlog' ? 0 : 1;
  // The reference lists five here; this card's stage only has the height
  // for three at a size anyone can read, so the other two join the ones
  // already behind "Show N more".
  const inBacklog = RMT_BOARD_TASKS
    .filter((task) => task.id !== RMT_MOVE_TASK_ID || status === 'backlog')
    .slice(0, RMT_BACKLOG_SHOWN);
  const moveTask = RMT_BOARD_TASKS.find((task) => task.id === RMT_MOVE_TASK_ID);
  const cols = [
    { key: 'backlog', label: d.colBacklog, count: RMT_TOTAL_TASKS - moved, tasks: inBacklog, hasMore: true },
    { key: 'in_progress', label: d.colInProgress, count: status === 'in_progress' ? 1 : 0, tasks: status === 'in_progress' ? [moveTask] : [], empty: d.colEmptyInProgress, innerRef: progressRef },
    { key: 'done', label: d.colCompleted, count: status === 'done' ? 1 : 0, tasks: status === 'done' ? [moveTask] : [], empty: d.colEmptyCompleted, innerRef: doneRef },
  ];

  return (
    <div className="rmt-board">
      {cols.map((col) => (
        <div
          key={col.key}
          ref={col.innerRef}
          className={`rmt-bcol${over === col.key ? ' rmt-bcol--over' : ''}`}
        >
          <div className="rmt-bcol__hdr">
            <span className="rmt-bcol__label">{col.label}</span>
            <span className="rmt-bcol__count">{col.count}</span>
          </div>
          {/* Its own scroll area, so the column's header and "Show N
              more" stay put while the cards run past the bottom — the
              third card reading as cut off is the point: it says there's
              more of the plan here without costing the height. */}
          <div className="rmt-bcol__list">
            {col.tasks.map((task) => (
              <RmtBoardCard
                key={task.id}
                task={task}
                done={col.key === 'done'}
                dimmed={dragging && task.id === RMT_MOVE_TASK_ID}
                innerRef={task.id === RMT_MOVE_TASK_ID ? cardRef : undefined}
              />
            ))}
          </div>
          {col.hasMore && (
            <button type="button" className="rmt-bcol__more">
              {d.showMore.replace('{n}', RMT_TOTAL_TASKS - col.tasks.length - moved)}
            </button>
          )}
          {col.tasks.length === 0 && <p className="rmt-bcol__empty">{col.empty}</p>}
        </div>
      ))}
    </div>
  );
}

function EngineRoadmapCard() {
  const { t } = useLang();
  const d = t('home.engine.demo.roadmap');
  const [view, setView] = useState('timeline');
  const [week, setWeek] = useState(1);
  const rootRef = useRef(null);
  const boardBtnRef = useRef(null);
  const week2Ref = useRef(null);
  const cardRef = useRef(null);
  const progressRef = useRef(null);
  const doneRef = useRef(null);
  const { status, cursor, ghost, over, dragging, ebPressed } = useRmtShowcase({ rootRef, boardBtnRef, week2Ref, cardRef, progressRef, doneRef, setView, setWeek });
  const moveTask = RMT_BOARD_TASKS.find((ta) => ta.id === RMT_MOVE_TASK_ID);
  const stageRef = useRef(null);

  // Rather than re-tune every size for this card's stage, lay the demo
  // out at RMT_REF_WIDTH and scale it to fill the stage — whichever of
  // width or height runs out first, so nothing is ever clipped and both
  // views are as large as the space allows. The two views have
  // different natural heights, so this re-measures on every change to
  // the laid-out box, not just on resize.
  // Keyed on `view` as well, and in a layout effect, so the switch to
  // the (taller) board is already scaled on the frame it first paints —
  // waiting for the observer leaves one frame of it clipped.
  // Fit on height only (capped at 1:1), so the type stays readable instead
  // of shrinking with the card's width. The inner box is then made exactly
  // as wide as the stage (in unscaled px): the header and board fit it, and
  // only the timeline chart, which needs more room, scrolls sideways
  // (thin scrollbar, see .rmt-timeline).
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const inner = rootRef.current;
    if (!stage || !inner) return;
    const fit = () => {
      const h = inner.offsetHeight;
      if (!h || !stage.clientWidth) return;
      const scale = Math.min(1, stage.clientHeight / h);
      stage.style.setProperty('--rmt-scale', String(scale));
      inner.style.width = `${stage.clientWidth / scale}px`;
      stage.style.setProperty('--rmt-y', `${Math.max(0, (stage.clientHeight - h * scale) / 2)}px`);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [view]);

  return (
    <div className="th-box th-box--roadmap">
      <div className="rmt-stage" ref={stageRef}>
      <div className="rmt-inner" ref={rootRef}>
        <div className="rmt-hdr">
          <div className="rmt-hdr__main">
            <h4 className="rmt-hdr__title">{view === 'timeline' ? d.timelineTitle : d.boardTitle}</h4>
            <p className="rmt-hdr__sub">{view === 'timeline' ? d.timelineSub : d.boardSub}</p>
          </div>
          <div className="rmt-hdr__side">
            <div className="rm-toggle">
              <button type="button" className={`rm-toggle__opt${view === 'timeline' ? ' rm-toggle__opt--active' : ''}`} onClick={() => setView('timeline')}>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <rect x="2" y="3" width="12" height="11" rx="2" /><path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" />
                </svg>
                {d.timeline}
              </button>
              <button
                type="button"
                ref={boardBtnRef}
                className={`rm-toggle__opt${view === 'board' ? ' rm-toggle__opt--active' : ''}${ebPressed ? ' rm-toggle__opt--pressed' : ''}`}
                onClick={() => setView('board')}
              >
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M3 2.5v11M8 2.5v6M13 2.5v8" />
                </svg>
                {d.executionBoard}
              </button>
            </div>
            <span className="rmt-hdr__done">{status === 'done' ? d.tasksDoneOne : d.tasksDone}</span>
          </div>
        </div>
        {view === 'timeline'
          ? <RmTimelinePanel week={week} week2Ref={week2Ref} />
          : <RmExecutionBoardPanel status={status} over={over} dragging={dragging} cardRef={cardRef} progressRef={progressRef} doneRef={doneRef} />}

        {/* Cursor + dragged-card ghost live here (not inside either panel)
            so they can travel across the view switch — e.g. from the
            toggle button, which sits outside both — using coordinates
            relative to this same .rmt-inner box throughout. */}
        <div
          className="rmt-cursor"
          style={{ left: cursor.x, top: cursor.y, opacity: cursor.visible ? 1 : 0, transform: `scale(${cursor.down ? 0.85 : 1})`, '--rmt-dur': `${cursor.dur}ms` }}
        >
          <svg viewBox="0 0 20 22" width="20" height="22"><path d="M3 2v16l4.2-4 2.9 6.4 2.6-1.2-2.9-6.2H16z" fill="#111" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
        </div>
        {ghost && (
          <div className="rmt-ghost" style={{ left: ghost.x, top: ghost.y, width: ghost.w, '--rmt-dur': `${ghost.dur}ms` }}>
            <RmtBoardCard task={moveTask} />
          </div>
        )}
      </div>
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
// Maps to home.engine.demo.citations.cat*/status* — see CitRow.
const CIT_CATEGORY_LABEL_KEY = { review: 'catReview', retail: 'catRetail' };
const CIT_STATUS = {
  mention:    { labelKey: 'statusMention',    bg: '#FEF3C7', fg: '#B45309' },
  unverified: { labelKey: 'statusUnverified', bg: '#F3F4F6', fg: '#6B7280' },
  uncited:    { labelKey: 'statusUncited',    bg: '#FEE2E2', fg: '#DC2626' },
  pending:    { labelKey: 'statusPending',    bg: '#DBEAFE', fg: '#2563EB' },
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
  const { t } = useLang();
  const d = t('home.engine.demo.citations');
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
              alt={row.domain}
              width="32"
              height="32"
              className="cit-favicon__img"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </span>
          <span className="cit-domain">{row.domain}</span>
        </div>
        <span className="cit-url">{row.url}</span>
      </div>
      <div className="cit-col cit-col--cat">
        <span className="cit-pill" style={{ color: catColor, background: `${catColor}1a` }}>{d[CIT_CATEGORY_LABEL_KEY[row.cat]]}</span>
      </div>
      <div className="cit-col cit-col--auth">
        <span className={`cit-pill${row.authority ? ' cit-pill--high' : ' cit-pill--muted'}`}>{row.authority ? d.high : d.no}</span>
      </div>
      <div className="cit-col cit-col--yours">
        <span className="cit-pill cit-pill--status" style={{ color: CIT_STATUS[citationKey].fg, background: CIT_STATUS[citationKey].bg }}>{d[CIT_STATUS[citationKey].labelKey]}</span>
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
              {d.sent}
            </span>
          ) : (
            <span className="cit-buy" ref={buyBtnRef}>{d.buy}</span>
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
  const { t } = useLang();
  const d = t('home.engine.demo.citations');
  return (
    <div className="cit-acq">
      <div className="cit-acq__hdr">
        <div className="cit-acq__title">
          {d.acquireTitle}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <span className="cit-acq__brand">Sony</span>
        </div>
        <div className="cit-acq__sub">{d.acquireSub}</div>
      </div>

      <div className="cit-acq__panel">
        <div className="cit-acq__panel-hdr">
          <div>
            <div className="cit-acq__panel-title">{d.oppTitle}</div>
            <div className="cit-acq__panel-sub">{d.oppSub}</div>
          </div>
          <div className="cit-acq__controls">
            <span className="cit-acq__sync">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="9" height="9"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
              {d.sync}
            </span>
            <span className="cit-acq__search">gadgetreview.com</span>
          </div>
        </div>
        <div className="cit-acq__status-row">
          <span className="cit-acq__status cit-acq__status--found">{d.found} 1</span>
          <span className="cit-acq__status">{d.notFound} 0</span>
          <span className="cit-acq__status cit-acq__status--muted">{d.blacklisted} 0</span>
          <span className="cit-acq__status cit-acq__status--muted">{d.checking} 0</span>
        </div>
        <div className="cit-acq__table">
          <div className="cit-acq__thead">
            <span>{d.acqDomain}</span><span>{d.acqCategory}</span><span>{d.acqDr}</span><span>{d.acqAuthority}</span><span>{d.acqBacklinks}</span><span>{d.acqType}</span><span>{d.acqPrice}</span>
          </div>
          <div className="cit-acq__row">
            <span className="cit-acq__domain">
              <svg viewBox="0 0 24 24" fill="#16A34A" width="10" height="10"><circle cx="12" cy="12" r="10"/></svg>
              gadgetreview.com
            </span>
            <span className="cit-pill" style={{ color: CIT_CATEGORY.review, background: `${CIT_CATEGORY.review}1a` }}>{d.catReview}</span>
            <span>77</span>
            <span>54</span>
            <span>316K</span>
            <span>{d.guestPost}</span>
            <span className="cit-acq__price">$280</span>
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
  const { t } = useLang();
  const d = t('home.engine.demo.citations');
  return (
    <div className="cg-loading">
      <span className="cg-spinner" />
      <div className="cg-loading-title">{d.finding}</div>
      <div className="cg-loading-sub">{d.checkingAvailability}</div>
    </div>
  );
}

function EngineCitationsCard() {
  const { t } = useLang();
  const d = t('home.engine.demo.citations');
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
    // Steps fire only while the card is on screen (see makeVisibilityGate),
    // so the loop stops when scrolled away and resumes when it's back.
    const gate = makeVisibilityGate();
    const after = (ms, fn) => { timers.push(setTimeout(() => gate.gate(fn), ms)); };

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

    const io = new IntersectionObserver(([e]) => {
      gate.setVisible(e.isIntersecting);
      if (!started && e.intersectionRatio >= 0.3) { started = true; cycle(); }
    }, { threshold: [0, 0.3] });
    io.observe(wrap);
    return () => { io.disconnect(); gate.clear(); cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, []);

  return (
    <div className={`cit-stage${fading ? ' cit-stage--fading' : ''}`} ref={wrapRef}>
      {screen === 0 && (
        <div className="cit-card">
          <div className="cit-hdr">
            <div className="th-box-hdr">{d.title}</div>
            <div className="cit-sub">{d.sub}</div>
          </div>
          <div className="cit-filters">
            <span className="cit-filter">
              {d.allCategories}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="10" height="10"><path d="m6 9 6 6 6-6"/></svg>
            </span>
            <span className="cit-filter">
              {d.allCompetitors}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="10" height="10"><path d="m6 9 6 6 6-6"/></svg>
            </span>
          </div>
          <div className="cit-table">
            <div className="cit-thead">
              <span>{d.hSource}</span>
              <span>{d.hCategory}</span>
              <span>{d.hAuthority}</span>
              <span>{d.hCitation}</span>
              <span>{d.hCompetitors}</span>
              <span>{d.hOpp}</span>
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
   ContentGenDemo (./ContentGenDemo.jsx): brief → Kate writes it from the
   product page → published live, one 14.5s loop. */

const ENGINE_VISUALS = { 0: PositionChartDemo, 1: EngineTrustCard, 2: EngineRoadmapCard, 3: ContentGenDemo, 4: EngineCitationsCard };

// The engine cards' hrefs in the locale files are bare ("/visibility"); a
// bare path only reaches the page through a temporary redirect to the EN
// version, so the link is prefixed with the current language here.
const localeHref = (href, lang) => (href.startsWith('/') && !/^\/(en|fr)(\/|$)/.test(href) ? `/${lang}${href}` : href);

function EngineRow({ index, card, learnMore, innerRef, everHighlighted, everRevealed }) {
  const { lang } = useLang();
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
              <Link to={localeHref(card.href, lang)} className="engine-row__link">
                {learnMore}
                <span className="sr-only">: {card.title}</span>
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

// Desktop-only layout: the 5 pillars as a stack of cards on the left, one
// shared window on the right showing whichever card is active. Below
// ENGINE_DESKTOP_MQ the section keeps the alternating EngineRow layout.
const ENGINE_DESKTOP_MQ = '(min-width: 1025px)';

function useEngineDesktop() {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(ENGINE_DESKTOP_MQ).matches);
  useEffect(() => {
    const mql = window.matchMedia(ENGINE_DESKTOP_MQ);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return matches;
}

// One icon per pillar for the desktop showcase cards, in card order:
// Reputation (chart), Trust (shield), Roadmap (calendar), Content (pen),
// Build Trust Across the Web (link).
const ENGINE_ICON_PROPS = { viewBox: '0 0 24 24', width: 20, height: 20, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
const ENGINE_ICONS = [
  <svg key="rep" {...ENGINE_ICON_PROPS}><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 5-6" /></svg>,
  <svg key="trust" {...ENGINE_ICON_PROPS}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
  <svg key="road" {...ENGINE_ICON_PROPS}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
  <svg key="content" {...ENGINE_ICON_PROPS}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>,
  <svg key="web" {...ENGINE_ICON_PROPS}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
];

// Card copy (icon, title, number, short desc, Learn More). `interactive`
// is off for the copies riding on the flip animation — those are purely
// visual, so no second button/link for keyboard or screen readers.
// Which tags each desktop card shows (indexes into card.tags). Cards 01,
// 03 and 04 carry a third; the others stay at two because their longest
// labels ("Smart Content Generation", card 05's FR pair) already fill
// the row side by side.
const ENGINE_CARD_TAGS = [[0, 1, 2], [0, 1], [0, 1, 2], [1, 2, 3], [1, 2]];

function EngineCardFace({ card, index, learnMore, pressed, highlight, interactive }) {
  const { lang } = useLang();
  const title = <span className={highlight ? 'engine-row__title--tour-active' : undefined}>{card.title}</span>;
  return (
    <>
      <div className="engine-card__head">
        <span className="engine-card__icon" aria-hidden="true">{ENGINE_ICONS[index]}</span>
        {interactive ? (
          <h3 className="engine-card__title">
            <button type="button" className="engine-card__trigger" aria-pressed={pressed} aria-controls="engine-showcase-panel">{title}</button>
          </h3>
        ) : (
          <div className="engine-card__title">{title}</div>
        )}
        <span className="engine-card__num">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <p className="engine-card__desc">{card.desc}</p>
      {/* Two of the row layout's tags (the phone/rows layout still shows
          them all), picked per card so they fit on one row in EN and FR. */}
      {card.tags?.length > 0 && (
        <div className="engine-card__tags">
          {(ENGINE_CARD_TAGS[index] || [0, 1]).map((i) => card.tags[i]).filter(Boolean).map((tag) => (
            <span key={tag} className="engine-tag engine-card__tag">{tag}</span>
          ))}
        </div>
      )}
      {card.href && (() => {
        const inner = (
          <>
            {learnMore}
            <span className="sr-only">: {card.title}</span>
            <span className="engine-row__link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </>
        );
        return interactive
          ? <Link to={localeHref(card.href, lang)} className="engine-row__link engine-card__link">{inner}</Link>
          : <span className="engine-row__link engine-card__link">{inner}</span>;
      })()}
    </>
  );
}

// Cards switch on click only (Enter/Space on the card's button counts as a
// click) — not on hover or focus.
function EngineSlot({ card, index, learnMore, isActive, isAway, showProgress, registerSlot, onSelect }) {
  return (
    <div
      ref={(el) => registerSlot(index, el)}
      className={`engine-card${isActive ? ' engine-card--active' : ''}${isAway ? ' engine-card--away' : ''}`}
      onClick={() => onSelect(index)}
    >
      <EngineCardFace card={card} index={index} learnMore={learnMore} pressed={isActive} interactive />
      {/* Autoplay countdown: a stroke that traces the card's border once,
          timed to the hold (after the flip lands), so the visitor can see
          the next card coming. Unmounted while paused, so it restarts from
          zero together with the autoplay timer. */}
      {showProgress && (
        <svg
          className="engine-card__progress"
          aria-hidden="true"
          style={{ '--engine-progress-ms': `${ENGINE_CARD_MS[index] - ENGINE_FLIP_MS}ms`, '--engine-progress-delay': `${ENGINE_FLIP_MS}ms` }}
        >
          <rect x="0" y="0" width="100%" height="100%" rx="20" ry="20" pathLength="100" />
        </svg>
      )}
    </div>
  );
}

const ENGINE_FLIP_MS = 700;
const ENGINE_FLIP_EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
// Autoplay: how long each card stays selected, counted from the click /
// switch (flip included), before the next one flips in (05 wraps back to
// 01). The progress stroke traces the border over the same span, after
// the flip, so it finishes exactly on the switch. Card 02 keeps its full
// ATD_CYCLE so its fix still lands on "Live" (13.6s in), and card 04 its
// full 14.5s brief → write → publish loop.
const ENGINE_CARD_MS = [7000, ATD_CYCLE, 11000, 14500, 10000];

// Center-to-center translate + scale that maps box `to` onto box `from`
// (transform-origin is the element's center), with a fixed perspective so
// the rotateY reads as a real 3D flip.
function engineFlipTransform(from, to, deg) {
  const dx = (from.left + from.width / 2) - (to.left + to.width / 2);
  const dy = (from.top + from.height / 2) - (to.top + to.height / 2);
  return `perspective(1600px) translate(${dx}px, ${dy}px) scale(${from.width / to.width}, ${from.height / to.height}) rotateY(${deg}deg)`;
}

function EngineShowcase({ cards, learnMore }) {
  // null until the section scrolls into view, then 0 — so card 01's own
  // flip into the center is the first thing a visitor sees here.
  const [active, setActive] = useState(null);
  // The previously active card, flying from the center back to its slot.
  const [returning, setReturning] = useState(null);
  // Autoplay only runs while the section is on screen and the visitor
  // isn't pointing at or tabbing through it — any interaction holds the
  // current card until they leave.
  const [onScreen, setOnScreen] = useState(false);
  const [paused, setPaused] = useState(false);
  const wrapRef = useRef(null);
  const flipRef = useRef(null);
  const returnRef = useRef(null);
  const slotRefs = useRef([]);
  const activeRef = useRef(null);
  const reducedMotion = useRef(false);
  const card = active == null ? null : cards[active];
  const Visual = active == null ? null : (ENGINE_VISUALS[active] || EnginePlaceholder);

  const rectIn = (el) => {
    const r = el.getBoundingClientRect();
    const w = wrapRef.current.getBoundingClientRect();
    return { left: r.left - w.left, top: r.top - w.top, width: r.width, height: r.height };
  };

  const select = useCallback((i) => {
    const prev = activeRef.current;
    if (prev === i) return;
    activeRef.current = i;
    if (prev != null && !reducedMotion.current && flipRef.current && slotRefs.current[prev]) {
      setReturning({ index: prev, slot: rectIn(slotRefs.current[prev]), from: rectIn(flipRef.current) });
    } else {
      setReturning(null);
    }
    setActive(i);
  }, []);

  const registerSlot = useCallback((i, el) => { slotRefs.current[i] = el; }, []);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setOnScreen(entry.isIntersecting);
      if (entry.isIntersecting && activeRef.current == null) select(0);
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [select]);

  useEffect(() => {
    if (active == null || !onScreen || paused) return;
    const t = setTimeout(() => select((active + 1) % cards.length), ENGINE_CARD_MS[active]);
    return () => clearTimeout(t);
  }, [active, onScreen, paused, cards.length, select]);

  // Incoming: the center panel itself starts exactly over the card's slot,
  // face up, and flips over (180°) as it grows into the center — its back
  // face is the preview. Once it lands, .is-flipping comes off and the
  // panel is a plain, untransformed preview again.
  useLayoutEffect(() => {
    const flip = flipRef.current;
    const slot = slotRefs.current[active];
    if (active == null || !flip || !slot || reducedMotion.current) return;
    flip.getAnimations().forEach((a) => a.cancel());
    const to = rectIn(flip);
    const from = rectIn(slot);
    flip.classList.add('is-flipping');
    const anim = flip.animate(
      [{ transform: engineFlipTransform(from, to, 0) }, { transform: 'perspective(1600px) translate(0, 0) scale(1, 1) rotateY(180deg)' }],
      { duration: ENGINE_FLIP_MS, easing: ENGINE_FLIP_EASE },
    );
    anim.onfinish = () => flip.classList.remove('is-flipping');
    anim.oncancel = () => flip.classList.remove('is-flipping');
  }, [active]);

  // Outgoing: a stand-in for the previous card starts over the center
  // (preview side up, shown as a blank face) and flips back down into its
  // own slot. The real card reappears there when it lands.
  useLayoutEffect(() => {
    const el = returnRef.current;
    if (!returning || !el) return;
    const anim = el.animate(
      [{ transform: engineFlipTransform(returning.from, returning.slot, 180) }, { transform: 'perspective(1600px) translate(0, 0) scale(1, 1) rotateY(0deg)' }],
      { duration: ENGINE_FLIP_MS, easing: ENGINE_FLIP_EASE },
    );
    anim.onfinish = () => setReturning((r) => (r === returning ? null : r));
    return () => anim.cancel();
  }, [returning]);

  const renderCard = (i) => (
    <EngineSlot
      key={cards[i].title}
      card={cards[i]}
      index={i}
      learnMore={learnMore}
      isActive={i === active}
      // Hidden only while its stand-in is flying back into it, so the card
      // never shows twice; the slot still holds its place in the grid.
      isAway={returning?.index === i && i !== active}
      showProgress={i === active && onScreen && !paused}
      registerSlot={registerSlot}
      onSelect={select}
    />
  );

  // Bento, running around the center panel: 01 top-left, 02 bottom-left,
  // 03 under the panel, 04 bottom-right, 05 top-right. The right column is
  // 04 then 05 in the DOM (CSS lifts 05 to the top) so keyboard/reader
  // order still runs 01 → 05; CSS places each column on the grid.
  return (
    <div
      className="container engine-showcase"
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}
    >
      <div className="engine-showcase__col engine-showcase__col--left">{[0, 1].map(renderCard)}</div>
      <div className="engine-showcase__col engine-showcase__col--center">
        <div className="engine-showcase__panel" id="engine-showcase-panel">
          <div className="engine-flip" ref={flipRef}>
            <div className="engine-flip__front engine-card engine-card--active" aria-hidden="true">
              {card && <EngineCardFace card={card} index={active} learnMore={learnMore} />}
            </div>
            <div className="engine-flip__back">
              {/* Keyed on the active card so each demo remounts and replays
                  from its first frame every time its card is selected. */}
              {card ? (
                <div key={active} className="engine-row__visual engine-showcase__visual reveal visible">
                  <EngineWindow url={card.url} bare><Visual /></EngineWindow>
                </div>
              ) : (
                <div className="engine-flip__spacer" />
              )}
            </div>
          </div>
        </div>
        {renderCard(2)}
      </div>
      <div className="engine-showcase__col engine-showcase__col--right">{[3, 4].map(renderCard)}</div>
      {returning && (
        <div
          className="engine-flip engine-flip--return is-flipping"
          ref={returnRef}
          aria-hidden="true"
          style={{ left: returning.slot.left, top: returning.slot.top, width: returning.slot.width, height: returning.slot.height }}
        >
          <div className="engine-flip__front engine-card engine-card--muted">
            <EngineCardFace card={cards[returning.index]} index={returning.index} learnMore={learnMore} />
          </div>
          <div className="engine-flip__back engine-flip__blank" />
        </div>
      )}
    </div>
  );
}


function PlatformEngine() {
  const { t } = useLang();
  const pe = t('home.engine');
  const isDesktop = useEngineDesktop();
  const rowRefs = useRef([]);
  // Indices whose title highlight has ever played — once added, a card's
  // highlight stays on permanently; only a full page reload clears this.
  // Doubles as "has this row been revealed" for its visual/entrance too —
  // no separate tracking needed since both now happen together, the first
  // time each row scrolls into view (no auto-scroll driving any of it).
  const [visitedIdx, setVisitedIdx] = useState(() => new Set());
  // Off screen, the whole section is marked paused: CSS freezes every
  // animation inside it (.engine--paused), and the JS-driven demos stop on
  // their own visibility checks.
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(true);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setSectionVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
      // Fire once ~20% of the viewport into the row, not on a ratio of the
      // row's own height — a ratio threshold can never be met when a
      // stacked mobile row is taller than ~3× the viewport.
      { threshold: 0, rootMargin: '0px 0px -20% 0px' },
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
    // Desktop renders the bento showcase instead of the rows, so the rows
    // the observer watches only exist (and need re-observing) per layout.
  }, [isDesktop]);

  return (
    <section className={`engine${sectionVisible ? '' : ' engine--paused'}`} id="engine" ref={sectionRef}>
      <div className="container">
        <div className="sec-head reveal">
          <Eyebrow>{pe.eyebrow}</Eyebrow>
          <h2 className="sec-h2">{pe.h2Pre}<br /><HL>{pe.h2Hl}</HL></h2>
          <p className="sec-lead">{pe.lead}</p>
        </div>
      </div>
      {isDesktop ? (
        <EngineShowcase cards={pe.cards} learnMore={pe.learnMore} />
      ) : (
        <div className="engine-rows">
          {/* Keyed by index, not card.title — the title changes on EN↔FR
              switch, which would remount the row with fresh DOM the observer
              above never watches, leaving unvisited rows stuck invisible. */}
          {pe.cards.map((card, i) => (
            <EngineRow
              key={i}
              index={i}
              card={card}
              learnMore={pe.learnMore}
              innerRef={(el) => { rowRefs.current[i] = el; }}
              everHighlighted={visitedIdx.has(i)}
              everRevealed={visitedIdx.has(i)}
            />
          ))}
        </div>
      )}
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
              {/* Same treatment as the other section headings: the second
                  line is highlighted rather than coloured blue. */}
              <h2 className="agents__h2">
                {ag.h2}<br /><HL>{ag.h2Blue}</HL>
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
            width={AVATAR_SIZES[agent.name]?.[0]}
            height={AVATAR_SIZES[agent.name]?.[1]}
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
/* ================================================================
   FAQ — five common questions below the Stakes (native <details>, so each
   opens independently and works without JS), linking out to the full
   /faqs page. Copied from PR #5's home page.
   ================================================================ */
function HomeFaq() {
  const { t, lang } = useLang();
  const d = t('home.faq');
  return (
    <section className="home-faq" id="faq">
      <div className="container home-faq__inner">
        <div className="sec-head reveal">
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <h2 className="sec-h2">{d.h2Pre} <HL>{d.h2Hl}</HL></h2>
        </div>
        <div className="home-faq__list reveal">
          {d.items.map((item) => (
            <details key={item.q} className="home-faq__item">
              <summary className="home-faq__q">
                <span>{item.q}</span>
                <span className="home-faq__icon" aria-hidden="true">+</span>
              </summary>
              <p className="home-faq__a">{item.a}</p>
            </details>
          ))}
        </div>
        <Link to={`/${lang}/faqs`} className="home-faq__all">{d.allLink} →</Link>
      </div>
    </section>
  );
}

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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="30" height="30">
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

