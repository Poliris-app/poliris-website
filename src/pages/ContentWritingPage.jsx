import { useEffect, useState, useRef, useCallback } from 'react';
import '../content-writing.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';
import { useLang } from '../contexts/LangContext';

const HL = ({ children }) => <span className="hl">{children}</span>;

// ---- check / cross icons used in comparison table ----------
function CK({ type }) {
  return (
    <span className={`cw-ck ${type}`}>
      {type === 'yes' && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      )}
      {type === 'no' && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      )}
      {type === 'part' && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
          <path d="M5 12h14"/>
        </svg>
      )}
    </span>
  );
}

// ---- data --------------------------------------------------
const BEFORE_SCORES_DATA = [
  { pct: 30,  cls: 'bad',  val: '3/10'  },
  { pct: 100, cls: '',     val: '10/10' },
  { pct: 50,  cls: 'warn', val: '5/10'  },
  { pct: 10,  cls: 'bad',  val: '1/10'  },
  { pct: 50,  cls: 'warn', val: '5/10'  },
];

const AFTER_SCORES_DATA = [
  { pct: 100, val: '10/10' },
  { pct: 90,  val: '9/10'  },
  { pct: 80,  val: '8/10'  },
  { pct: 80,  val: '8/10'  },
  { pct: 90,  val: '9/10'  },
];

const CMP_ROWS = [
  { cap: 'Knows your brand, products & audiences',      gen: ['no',   null],         seo: ['part', 'manual setup'], us: ['yes', null] },
  { cap: 'Writes to your real AI-visibility gaps',      gen: ['no',   null],         seo: ['no',   null],           us: ['yes', null] },
  { cap: 'SEO + GEO + AEO scoring',                    gen: ['part', 'SEO only'],   seo: ['yes',  null],           us: ['yes', null] },
  { cap: 'Hallucination-audited before publish',        gen: ['no',   null],         seo: ['part', null],           us: ['yes', null] },
  { cap: 'One platform with your audits & sentiment',   gen: ['no',   null],         seo: ['no',   null],           us: ['yes', null] },
  { cap: 'Usable without SEO expertise',                gen: ['part', null],         seo: ['no',   null],           us: ['yes', null] },
];

const FAQS = [
  {
    q: 'Is Kate a generic AI writer in a wrapper?',
    a: 'No. Kate is loaded with your live Poliris data   visibility gaps, sentiment, technical audit, brand, products and audiences   and writes to fix your real weaknesses. A generic writer starts from nothing.',
  },
  {
    q: 'How long does a full article take?',
    a: 'A publish-ready draft takes about 90 seconds. You can start it and keep working; Kate finishes in the background and a floating badge tells you when it\'s ready.',
  },
  {
    q: 'Can I edit the article after Kate generates it?',
    a: 'Yes, every input, section and line is editable at every step. You stay in control of the inputs; Kate handles the heavy work.',
  },
  {
    q: "What's the difference between writing and optimizing?",
    a: 'Writing starts from a topic and produces a new article. Optimizing takes a URL or draft you already have, scores it, and rewrites only the weak parts to lift the score.',
  },
  {
    q: 'How does the scoring work?',
    a: 'Three independent layers: deterministic programmatic checks, a qualitative LLM judge, and a hallucination auditor   combined into one 0–100 score across SEO, GEO and AEO signals.',
  },
  {
    q: 'Do I need to be an SEO expert?',
    a: 'No. Kate is built for non-experts   product managers, founders, teams without an in-house marketing desk. You talk in plain language; she handles the technical depth.',
  },
];

// ---- icons -------------------------------------------------
const IconDoc = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--poliris-blue)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>
    <path d="M14 4v5h5"/><path d="M8 13h8M8 16.5h5"/>
  </svg>
);
const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--poliris-blue)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19V5"/><path d="M4 19h16"/><path d="M7 15l4-4 3 3 5-6"/>
    <path d="M19 8h-3M19 8v3"/>
  </svg>
);
const IconUpload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--poliris-blue)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v11"/><path d="M8 8l4-4 4 4"/>
    <path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/>
  </svg>
);
const IconStar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
    <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z"/>
  </svg>
);

const PIPELINE_STEPS = [
  { num:'01', label:'Brief',     text:'Kate interviews you. Three options surface for product, audience, and format   you pick the one that fits your goal.',                        tags:['Interview','Format','Audience'] },
  { num:'02', label:'Angles',    text:'Three distinct editorial takes on the same topic   different hooks, different arguments. You choose the direction that fits.',               tags:['Hook','Direction','Editorial'] },
  { num:'03', label:'Configure', text:'Set keyword focus, writing tone, intent, length target, and grounding facts. Every field is editable before writing starts.',               tags:['Keyword','Tone','Intent','Length'] },
  { num:'04', label:'Links',     text:'Sitemap-aware internal link suggestions appear automatically. Pick the ones you want woven into the piece naturally.',                       tags:['Internal links','Sitemap','SEO'] },
  { num:'05', label:'Outline',   text:'H2 and H3 structure generated with per-section word budgets. Drag to reorder, add, or remove sections freely.',                            tags:['H2 / H3','Word budget','Reorder'] },
  { num:'06', label:'Generate',  text:"Research, write, and score   section by section in the background. Watch each part land as it's written.",                                tags:['Research','Write','Score'] },
  { num:'07', label:'Result',    text:'Full article with SEO score and meta tags. Edit inline, re-score, and publish when ready.',                                                tags:['Article','Score','Meta','Publish'] },
];

function PipeIcon({ index, active, done }) {
  const icons = [
    <span key="0" className="cw-pipe-letter">K</span>,
    <span key="1" className="cw-pipe-letter">A</span>,
    <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
    <span key="3" className="cw-pipe-letter">L</span>,
    <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
    <svg key="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"><polyline points="20 6 9 17 4 12"/></svg>,
  ];
  return icons[index];
}

function FaqAccordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="cw-faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`faq-item${isOpen ? ' open' : ''}`}>
            <button className="faq-q" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
              <span className="faq-num">0{i + 1}</span>
              <span className="faq-qtxt">{item.q}</span>
              <span className="faq-chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </button>
            <div className="faq-body">
              <p className="faq-a">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---- count-up hook ---------------------------------------- */
function useCountUp(target, active, duration = 900, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const timer = setTimeout(() => {
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const t = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(target * ease));
        if (t < 1) raf = requestAnimationFrame(step);
      }
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [active, target, duration, delay]);
  return value;
}

/* ---- animated before/after score cards -------------------- */
function AnimatedScoreCards({ beforeScores, afterScores, labels, beforeLabel, afterLabel, afterKate, beforeVerdict, afterVerdict }) {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState('idle'); // idle | before | arrow | after

  /* trigger sequence on scroll */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        io.disconnect();
        setPhase('before');
        setTimeout(() => setPhase('arrow'),  900);
        setTimeout(() => setPhase('after'),  1300);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const beforeActive = phase !== 'idle';
  const afterActive  = phase === 'after';
  const arrowActive  = phase === 'arrow' || phase === 'after';

  const beforeNum = useCountUp(50, beforeActive, 700, 0);
  const afterNum  = useCountUp(82, afterActive,  800, 0);

  return (
    <div className="ba" ref={containerRef}>

      {/* ── Before card ── */}
      <div className={`cscore before${beforeActive ? ' cs-active' : ''}`}>
        <div className="cs-header">
          <div className="cs-header-left">
            <div className="cs-tag">{beforeLabel}</div>
            <div className="cs-ttl">
              <IconStar /> Content Score
            </div>
          </div>
          <div className="cs-bubble">
            <div className="cs-num">{beforeNum}<em>/100</em></div>
          </div>
        </div>
        <div className="cs-track-wrap">
          <div className="cs-track">
            <i style={{ width: beforeActive ? '50%' : '0%' }} />
          </div>
          <div className="cs-verdict">{beforeVerdict}</div>
        </div>
        <div className="cs-rows">
          {beforeScores.map((s, i) => (
            <div key={s.label} className="cs-row">
              <span className="cs-lab">{s.label}</span>
              <div className="cs-bar">
                <i className={s.cls} style={{ width: beforeActive ? `${s.pct}%` : '0%', transitionDelay: `${i * 80}ms` }} />
              </div>
              <span className="cs-val">{s.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Arrow divider ── */}
      <div className="ba-arrow">
        <span className="ba-lab">{afterKate}</span>
        <div className={`ba-arrow-icon${arrowActive ? ' ba-arrow-pulse' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </div>
        <span className="ba-lab">+44</span>
      </div>

      {/* ── After card ── */}
      <div className={`cscore after${afterActive ? ' cs-active' : ''}`}>
        <div className="cs-header">
          <div className="cs-header-left">
            <div className="cs-tag">{afterLabel}</div>
            <div className="cs-ttl">
              <IconStar /> Content Score
            </div>
          </div>
          <div className="cs-bubble">
            <div className="cs-num">{afterNum}<em>/100</em></div>
          </div>
        </div>
        <div className="cs-track-wrap">
          <div className="cs-track">
            <i style={{ width: afterActive ? '82%' : '0%' }} />
          </div>
          <div className="cs-verdict">{afterVerdict}</div>
        </div>
        <div className="cs-rows">
          {afterScores.map((s, i) => (
            <div key={s.label} className="cs-row">
              <span className="cs-lab">{s.label}</span>
              <div className="cs-bar">
                <i style={{ width: afterActive ? `${s.pct}%` : '0%', transitionDelay: `${i * 80}ms` }} />
              </div>
              <span className="cs-val">{s.val}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function PipelineTrack() {
  const { t } = useLang();
  const wr = t('contentWriting.write');
  const steps = wr.steps;
  const [cur, setCur] = useState(0);
  const [fading, setFading] = useState(false);
  const N = steps.length;

  function go(i) {
    if (i < 0 || i >= N || i === cur) return;
    setFading(true);
    setTimeout(() => { setCur(i); setFading(false); }, 150);
  }

  /* Auto-advance through the steps; restarts whenever cur changes,
     whether from the timer or a manual click. */
  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCur(c => (c + 1) % N);
        setFading(false);
      }, 150);
    }, 2500);
    return () => clearInterval(id);
  }, [cur, N]);

  const d = steps[cur];
  return (
    <div className="cw-pipe cw-reveal">
      <div className="cw-pipe-track">
        {steps.map((s, i) => [
          <div key={`step-${i}`} className="cw-pipe-step-wrap">
            <button className={`cw-pipe-step${i === cur ? ' active' : ''}${i < cur ? ' done' : ''}`} onClick={() => go(i)} aria-label={s.label}>
              <span className="cw-pipe-step-ic"><PipeIcon index={i} /></span>
            </button>
            <div className="cw-pipe-step-label">{s.label}</div>
          </div>,
          i < N - 1 && <div key={`line-${i}`} className="cw-pipe-line"><div className="cw-pipe-line-fill" style={{ width: i < cur ? '100%' : '0%' }} /></div>,
        ])}
      </div>
      <div className={`cw-pipe-detail${fading ? ' fading' : ''}`}>
        <div className="cw-pipe-detail-top">
          <div className="cw-pipe-dhead">
            <span className={`cw-pipe-dic${cur === N - 1 ? ' last' : ''}`}><PipeIcon index={cur} /></span>
            <div className="cw-pipe-dlabel">{d.label}</div>
          </div>
          <div className="cw-pipe-count"><strong>{cur + 1}</strong> / {N}</div>
        </div>
        <div className="cw-pipe-ddivider" />
        <div className="cw-pipe-detail-bottom">
          <div className="cw-pipe-detail-left">
            <div className="cw-pipe-dtext">{d.text}</div>
          </div>
          <div className="cw-pipe-detail-right">
            <div className="cw-pipe-pills">
              {d.tags.map(tag => <span key={tag} className="cw-pipe-pill">{tag}</span>)}
            </div>
            <div className="cw-pipe-nav">
              <button className="cw-pipe-nav-btn" onClick={() => go(cur - 1)} disabled={cur === 0}>
                <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="cw-pipe-nav-btn" onClick={() => go(cur + 1)} disabled={cur === N - 1}>
                <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- hub node positions (hexagon: top pair / mid pair / bottom pair) ----
// Index order: GEO gaps (TL), Sentiment (TR), Technical audit (ML), Brand & voice (MR), Products (BL), Audiences (BR)
const HUB_NODE_STYLES = [
  { left: '5%',  top: '-3%'  },
  { left: '95%',  top: '-3%'  },
  { left: '-20%', top: '49%'  },
  { left: '120%', top: '49%'  },
  { left: '5%',  top: '104%' },
  { left: '95%',  top: '104%' },
];
// Icons sit exactly on the outer ring (r=43, hexagon vertices)
const HUB_ICON_STYLES = [
  { left: '28.5%', top: '12.8%' },
  { left: '71.5%', top: '12.8%' },
  { left: '7%',    top: '50%'   },
  { left: '93%',   top: '50%'   },
  { left: '28.5%', top: '87.2%' },
  { left: '71.5%', top: '87.2%' },
];
const HUB_NODE_TAGS = ['Visibility', 'Sentiment', 'Audit', null, null, null];
const HUB_NODE_INDICES = [0, 1, 2, 7, 4, 5];

// ---- inner ring crossing points (r=29) — small dot markers ----
const SPOKE_STARTS = [
  [35.5,24.9],[64.5,24.9],[21,50],[79,50],[35.5,75.1],[64.5,75.1]
];

export default function ContentWritingPage() {
  const { t } = useLang();
  const cwHero = t('contentWriting.hero');
  const cwFaqs = t('contentWriting.faqs');
  const cwCta  = t('contentWriting.cta');
  const scoreLabels = t('contentWriting.scoreLabels');
  const contentIdeas = t('contentWriting.contentIdeas');
  const cwImpl = t('contentWriting.implement');
  const cwLink = t('contentWriting.internalLinking');
  const cwChan = t('contentWriting.multiChannel');
  const cwCmp  = t('contentWriting.comparison');
  const cwScore = t('contentWriting.contentScore');
  const BEFORE_SCORES = BEFORE_SCORES_DATA.map((d, i) => ({ ...d, label: scoreLabels[i] }));
  const AFTER_SCORES  = AFTER_SCORES_DATA.map((d, i) => ({ ...d, label: scoreLabels[i] }));
  const allHubNodes = t('contentWriting.dataSynergy.hubNodes');
  const HUB_NODES = HUB_NODE_INDICES.map((srcIdx, i) => ({
    style: HUB_NODE_STYLES[i],
    iconStyle: HUB_ICON_STYLES[i],
    title: allHubNodes[srcIdx].title,
    sub: allHubNodes[srcIdx].sub,
    tag: HUB_NODE_TAGS[i],
  }));
  const connectNode = allHubNodes[8];

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in', 'visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.cw-reveal, .reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="cw-page">
      <Seo page="content-writing" />
      <Navbar />
      <main>

        {/* ── HERO ──────────────────────────────────────────── */}
        <Hero
          eyebrow={cwHero.eyebrow}
          title={<>{cwHero.titlePre} <HL>{cwHero.titleHl}</HL></>}
          lead={cwHero.lead}
          primaryCta={cwHero.primaryCta}
          secondaryCta={cwHero.secondaryCta}
          note={cwHero.note}
          showDashboard={false}
        />

        {/* ── PRODUCT PREVIEW   Kate Studio dashboard ──────── */}
        

        {/* ── DATA SYNERGY   orbital hub ────────────────────── */}
        <section className="cw-sec">
          <div className="cw-wrap">
            <div className="cw-hub-section">
              <div className="cw-hub-text cw-adv-head cw-reveal">
                {(() => { const ds = t('contentWriting.dataSynergy'); return (<>
                  <div className="eyebrow">{ds.eyebrow}</div>
                  <h2>{ds.h2Pre} <HL>{ds.h2Hl}</HL></h2>
                  <p className="cw-lede">{ds.lead}</p>
                  <p className="cw-lede">{ds.cap}</p>
                </>); })()}
              </div>

              <div className="hub-stage cw-reveal">
                <div className="hub-inner">
                  <svg className="hub-svg" viewBox="0 0 100 100" aria-hidden="true">
                    <circle className="orbit orbit-cut hub-spin" cx="50" cy="50" r="43"/>
                    <circle className="orbit" cx="50" cy="50" r="29"/>
                    <g className="ends">
                      {SPOKE_STARTS.map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="0.6"/>
                      ))}
                    </g>
                  </svg>

                  <div className="hcenter">
                    <span className="kw-av">K</span>
                    <div className="hc-n">Kate</div>
                    <div className="hc-s">{t('contentWriting.dataSynergy.kateSub')}</div>
                    <span className="hc-connect">{connectNode.title} · {connectNode.sub}</span>
                  </div>

                  {HUB_NODES.map((node, i) => (
                    <div key={i} className="hicon" style={node.iconStyle}>
                      <img src={`${import.meta.env.BASE_URL}Groupe%20477.svg`} alt="" />
                    </div>
                  ))}

                  {HUB_NODES.map((node, i) => (
                    <div key={i} className="hsrc" style={node.style}>
                      {node.tag
                        ? <em>{node.tag}</em>
                        : <em className="hsrc-blank" aria-hidden="true" />}
                      <b>{node.title}</b>
                      <i>{node.sub}</i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THREE JOBS ────────────────────────────────────── */}
        <section className="cw-sec" style={{ background: 'var(--surface-2)' }}>
          <div className="cw-wrap">
            <div className="cw-head cw-center cw-reveal">
              {(() => { const tj = t('contentWriting.threeJobs'); return (<>
                <div className="eyebrow">{tj.eyebrow}</div>
                <h2>{tj.h2Pre} <HL>{tj.h2Hl}</HL></h2>
                <p className="cw-lede">{tj.lead}</p>
              </>); })()}
            </div>

            <div className="cw-tour cw-reveal">
              {t('contentWriting.threeJobs.cards').map((card, idx) => {
                const Icons = [IconDoc, IconChart, IconUpload];
                const hrefs = ['#write', '#optimize', '#implement'];
                const Icon = Icons[idx]; const href = hrefs[idx]; const no = card.no;
                const { title, desc } = card;
                return (
                <a key={no} className="cw-tcard" href={href}>
                  <div className="cw-tcard-top">
                    <div className="cw-tcard-ic"><Icon /></div>
                    <span className="cw-tcard-num">{no}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="cw-tcard-jump">
                    {t('contentWriting.threeJobs.seeIt')}
                    <span className="cw-tcard-arr">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12l7 7 7-7"/>
                      </svg>
                    </span>
                  </div>
                </a>
              );
              })}
            </div>
          </div>
        </section>

        {/* ── WRITE   7 STEPS ───────────────────────────────── */}
        <section id="write" className="cw-sec">
          <div className="cw-wrap">
            <div className="cw-adv-head cw-adv-head--split cw-reveal">
              {(() => { const wr = t('contentWriting.write'); return (<>
                <div className="cw-adv-head-left">
                  <span className="cw-adv-tag cw-adv-tag--pill">{wr.tag}</span>
                  <h3>{wr.h3Pre} <HL>{wr.h3Hl}</HL> {wr.h3Post}</h3>
                </div>
                <p className="cw-adv-head-side">{wr.p}</p>
              </>); })()}
            </div>

            <PipelineTrack />
          </div>
        </section>

        {/* ── OPTIMIZE + SCORE ──────────────────────────────── */}
        <section id="optimize" className="cw-sec" style={{ background: 'var(--surface-2)' }}>
          <div className="cw-wrap">
            <div className="cw-adv-head cw-center cw-reveal">
              {(() => { const op = t('contentWriting.optimize'); return (<>
                <span className="cw-adv-tag">{op.tag}</span>
                <h3>{op.h3Pre} <HL>{op.h3Hl}</HL></h3>
                <p>{op.p}</p>
              </>); })()}
            </div>

            <div className="ba cw-reveal">
              {/* Before */}
              <div className="cscore before">
                <div className="cs-header">
                  <div className="cs-header-left">
                    <div className="cs-tag">{t('contentWriting.optimize.beforeLabel')}</div>
                    <div className="cs-ttl"><IconStar /> {cwScore}</div>
                  </div>
                  <div className="cs-bubble">
                    <div className="cs-num">50<em>/100</em></div>
                  </div>
                </div>
                <div className="cs-track-wrap">
                  <div className="cs-track"><i style={{ width: '50%' }}/></div>
                  <div className="cs-verdict">{t('contentWriting.optimize.beforeVerdict')}</div>
                </div>
                <div className="cs-rows">
                  {BEFORE_SCORES.map(s => (
                    <div key={s.label} className="cs-row">
                      <span className="cs-lab">{s.label}</span>
                      <div className="cs-bar"><i className={s.cls} style={{ width: `${s.pct}%` }}/></div>
                      <span className="cs-val">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="ba-arrow">
                <span className="ba-lab">{t('contentWriting.optimize.afterKate')}</span>
                <div className="ba-arrow-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </div>
                <span className="ba-lab">+44</span>
              </div>

              {/* After */}
              <div className="cscore after">
                <div className="cs-header">
                  <div className="cs-header-left">
                    <div className="cs-tag">{t('contentWriting.optimize.afterLabel')}</div>
                    <div className="cs-ttl"><IconStar /> {cwScore}</div>
                  </div>
                  <div className="cs-bubble">
                    <div className="cs-num">82<em>/100</em></div>
                  </div>
                </div>
                <div className="cs-track-wrap">
                  <div className="cs-track"><i style={{ width: '82%' }}/></div>
                  <div className="cs-verdict">{t('contentWriting.optimize.afterVerdict')}</div>
                </div>
                <div className="cs-rows">
                  {AFTER_SCORES.map(s => (
                    <div key={s.label} className="cs-row">
                      <span className="cs-lab">{s.label}</span>
                      <div className="cs-bar"><i style={{ width: `${s.pct}%` }}/></div>
                      <span className="cs-val">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── IMPLEMENT ─────────────────────────────────────── */}
        <section id="implement" className="cw-sec">
          <div className="cw-wrap">
            <div className="cw-adv-head cw-center cw-reveal">
              {(() => { const im = t('contentWriting.implement'); return (<>
                <span className="cw-adv-tag">{im.tag}</span>
                <h3>{im.h3Pre} <HL>{im.h3Hl}</HL></h3>
                <p>{im.p}</p>
              </>); })()}
            </div>

            <div className="impl2 cw-reveal">
              <div className="mbw">
                <div className="mbw-bar">
                  <div className="mbw-url">
                    <svg className="mbw-lock" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                    </svg>
                    nike.com/blog/lifestyle-footwear
                  </div>
                  <span className="mbw-live-wrap">
                    <span className="mbw-live">{cwImpl.mockup.live}</span>
                    <span className="mbw-live-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--cw-ok)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    </span>
                  </span>
                </div>
                <div className="mbw-hero">
                  <span className="mbw-hero-cat">{cwImpl.mockup.category}</span>
                </div>
                <div className="mbw-body">
                  <div className="mbw-toprow">
                    <div className="mbw-meta"><span className="mbw-pin"/>{cwImpl.mockup.meta}</div>
                    <span className="mbw-cat-pill">{cwImpl.mockup.category}</span>
                  </div>
                  <h6>{cwImpl.mockup.h6}</h6>
                  <p className="mbw-p">
                    {cwImpl.mockup.p}{' '}
                    <span className="lk">{cwImpl.mockup.linkText}</span>.
                  </p>
                  <div className="mbw-ln"/>
                  <div className="mbw-ln"/>
                  <div className="mbw-ln s"/>
                </div>
              </div>

              <div className="mbw-cms">
                <span className="mbw-cms-ic"><img src={`${import.meta.env.BASE_URL}wordpress.png`} alt="WordPress" /></span>
                <span className="mbw-cms-ic"><img src={`${import.meta.env.BASE_URL}wix.png`} alt="Wix" /></span>
                <span className="mbw-cms-ic"><img src={`${import.meta.env.BASE_URL}shopify.png`} alt="Shopify" /></span>
              </div>

              <div className="impl-toast">
                <span className="impl-chk">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </span>
                <span>{cwImpl.mockup.publishedByKate}<small>{cwImpl.mockup.oneClick}</small></span>
              </div>
            </div>
          </div>
        </section>

        {/* ── INTERNAL LINKING ──────────────────────────────── */}
        <section className="cw-sec" style={{ background: 'var(--surface-2)' }}>
          <div className="cw-wrap">
            <div className="cw-head cw-center cw-reveal">
              <div className="eyebrow">{cwLink.eyebrow}</div>
              <h2>{cwLink.h2Pre}<br /><HL>{cwLink.h2Hl}</HL></h2>
              <p className="cw-lede">{cwLink.lead}</p>
            </div>

            <div className="lk3 cw-reveal">
              <svg viewBox="0 0 860 490" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Article keywords linking to Nike site pages">
                <defs>
                  <marker id="lk-arr1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M 0 2 L 8 5 L 0 8 z" fill="#1e3893"/>
                  </marker>
                  <marker id="lk-arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M 0 2 L 8 5 L 0 8 z" fill="#3d52b8"/>
                  </marker>
                  <marker id="lk-arr3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M 0 2 L 8 5 L 0 8 z" fill="#5b7bfb"/>
                  </marker>
                </defs>

                {/* Column labels */}
                <text x="157" y="19" fontSize="9" fill="#9AA0AB" fontFamily="sans-serif" fontWeight="700" letterSpacing="1.1" textAnchor="middle">{cwLink.yourArticle}</text>
                <text x="632" y="19" fontSize="9" fill="#1e3893" fontFamily="sans-serif" fontWeight="700" letterSpacing="1.1" textAnchor="middle">{cwLink.pagesOnSite}</text>

                {/* Left: Article card */}
                <rect x="30" y="28" width="255" height="444" rx="12" fill="#fff" stroke="#e8ecf5" strokeWidth="1.5"/>
                <rect x="48" y="48" width="220" height="52" rx="6" fill="#EEF2FB"/>
                <rect x="48" y="114" width="185" height="9" rx="4.5" fill="#E8ECFB"/>
                <rect x="48" y="129" width="155" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="48" y="142" width="170" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="48" y="155" width="125" height="7" rx="3.5" fill="#F4F4F4"/>

                {/* Keyword pill 1   Footwear */}
                <rect x="48" y="176" width="130" height="26" rx="5" fill="#1e3893"/>
                <text x="113" y="193" fontSize="11" fill="#fff" fontFamily="sans-serif" fontWeight="700" textAnchor="middle">Footwear</text>
                <rect x="48" y="215" width="160" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="48" y="228" width="135" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="48" y="241" width="150" height="7" rx="3.5" fill="#F4F4F4"/>

                {/* Keyword pill 2   Apparel */}
                <rect x="48" y="262" width="125" height="26" rx="5" fill="#3d52b8"/>
                <text x="110" y="279" fontSize="11" fill="#fff" fontFamily="sans-serif" fontWeight="700" textAnchor="middle">Apparel</text>
                <rect x="48" y="300" width="145" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="48" y="313" width="120" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="48" y="326" width="165" height="7" rx="3.5" fill="#F4F4F4"/>

                {/* Keyword pill 3   Gear & Accessories */}
                <rect x="48" y="348" width="165" height="26" rx="5" fill="#5b7bfb"/>
                <text x="130" y="365" fontSize="11" fill="#fff" fontFamily="sans-serif" fontWeight="700" textAnchor="middle">Gear &amp; Accessories</text>
                <rect x="48" y="386" width="140" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="48" y="399" width="115" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="48" y="412" width="155" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="48" y="425" width="100" height="7" rx="3.5" fill="#F4F4F4"/>

                {/* Kate badge */}
                <rect x="92" y="450" width="100" height="22" rx="11" fill="#EEF2FB"/>
                <text x="142" y="465" fontSize="9.5" fill="#1E3893" fontFamily="sans-serif" fontWeight="700" textAnchor="middle">{cwLink.linkedByKate}</text>

                {/* Right: Dashed pages container */}
                <rect x="425" y="28" width="410" height="444" rx="12" fill="rgba(238,242,251,.35)" stroke="#c5cce8" strokeWidth="1.5" strokeDasharray="6 4"/>

                {/* Card 1   nike.com/footwear */}
                <rect x="438" y="46" width="384" height="118" rx="8" fill="#fff" stroke="#e8ecf5" strokeWidth="1"/>
                <rect x="438" y="46" width="5" height="118" rx="2" fill="#1e3893"/>
                <circle cx="455" cy="64" r="3" fill="#e8ecf5"/>
                <circle cx="465" cy="64" r="3" fill="#e8ecf5"/>
                <circle cx="475" cy="64" r="3" fill="#e8ecf5"/>
                <text x="488" y="68" fontSize="9" fill="#9AA0AB" fontFamily="ui-monospace,monospace">nike.com/footwear</text>
                <rect x="450" y="80" width="70" height="60" rx="5" fill="#EEF2FB"/>
                <rect x="530" y="83" width="115" height="8" rx="4" fill="#e8ecf5"/>
                <rect x="530" y="97" width="88" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="530" y="110" width="100" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="530" y="123" width="75" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="530" y="137" width="58" height="7" rx="3.5" fill="#F4F4F4"/>

                {/* Card 2   nike.com/apparel */}
                <rect x="438" y="186" width="384" height="118" rx="8" fill="#fff" stroke="#e8ecf5" strokeWidth="1"/>
                <rect x="438" y="186" width="5" height="118" rx="2" fill="#3d52b8"/>
                <circle cx="455" cy="204" r="3" fill="#e8ecf5"/>
                <circle cx="465" cy="204" r="3" fill="#e8ecf5"/>
                <circle cx="475" cy="204" r="3" fill="#e8ecf5"/>
                <text x="488" y="208" fontSize="9" fill="#9AA0AB" fontFamily="ui-monospace,monospace">nike.com/apparel</text>
                <rect x="450" y="220" width="70" height="60" rx="5" fill="#EEF2FB"/>
                <rect x="530" y="223" width="108" height="8" rx="4" fill="#e8ecf5"/>
                <rect x="530" y="237" width="82" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="530" y="250" width="95" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="530" y="263" width="70" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="530" y="277" width="55" height="7" rx="3.5" fill="#F4F4F4"/>

                {/* Card 3   nike.com/gear */}
                <rect x="438" y="326" width="384" height="118" rx="8" fill="#fff" stroke="#e8ecf5" strokeWidth="1"/>
                <rect x="438" y="326" width="5" height="118" rx="2" fill="#5b7bfb"/>
                <circle cx="455" cy="344" r="3" fill="#e8ecf5"/>
                <circle cx="465" cy="344" r="3" fill="#e8ecf5"/>
                <circle cx="475" cy="344" r="3" fill="#e8ecf5"/>
                <text x="488" y="348" fontSize="9" fill="#9AA0AB" fontFamily="ui-monospace,monospace">nike.com/gear</text>
                <rect x="450" y="360" width="70" height="60" rx="5" fill="#EEF2FB"/>
                <rect x="530" y="363" width="112" height="8" rx="4" fill="#e8ecf5"/>
                <rect x="530" y="377" width="86" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="530" y="390" width="98" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="530" y="403" width="68" height="7" rx="3.5" fill="#F4F4F4"/>
                <rect x="530" y="417" width="52" height="7" rx="3.5" fill="#F4F4F4"/>

                {/* Curved arrows: pill right-edge → card left-edge */}
                <path d="M 178 189 C 290 189, 355 105, 438 105" fill="none" stroke="#1e3893" strokeWidth="2" markerEnd="url(#lk-arr1)"/>
                <path d="M 173 275 C 285 275, 350 245, 438 245" fill="none" stroke="#3d52b8" strokeWidth="2" markerEnd="url(#lk-arr2)"/>
                <path d="M 213 361 C 310 361, 370 385, 438 385" fill="none" stroke="#5b7bfb" strokeWidth="2" markerEnd="url(#lk-arr3)"/>
              </svg>
            </div>

            <div className="lk2-foot cw-reveal">
              <span className="lk2-chip">
                <span className="lk-ic">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="3.5"/>
                    <path d="M5 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5"/>
                  </svg>
                </span>
                {cwLink.chips[0]}
              </span>
              <span className="lk2-chip">
                <span className="lk-ic">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
                  </svg>
                </span>
                {cwLink.chips[1]}
              </span>
              <span className="lk2-chip">
                <span className="lk-ic">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/>
                    <path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z"/>
                  </svg>
                </span>
                {cwLink.chips[2]}
              </span>
            </div>
            <p className="lk2-note cw-reveal">{cwLink.note}</p>
          </div>
        </section>

        {/* ── MULTI-CHANNEL ─────────────────────────────────── */}
        <section className="cw-sec">
          <div className="cw-wrap">
            <div className="cw-head cw-center cw-reveal">
              <div className="eyebrow">{cwChan.eyebrow}</div>
              <h2>{cwChan.h2Pre} <HL>{cwChan.h2Hl}</HL></h2>
              <p className="cw-lede">{cwChan.lead}</p>
            </div>

            <div className="channels cw-reveal">
              {[
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--poliris-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg> },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--poliris-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5V5a1 1 0 0 1 1-1h10l5 5v10.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M14 4v6h6M8 14h8M8 17h5"/></svg> },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--poliris-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7"/></svg> },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--poliris-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/></svg> },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--poliris-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg> },
              ].map((ch, idx) => (
                <div key={idx} className="chan">
                  <span className="chan-ic">{ch.icon}</span>
                  {cwChan.channels[idx]}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON ────────────────────────────────────── */}
        <section className="cw-sec" style={{ background: 'var(--surface-2)' }}>
          <div className="cw-wrap">
            <div className="cw-head cw-center cw-reveal">
              <>
                <div className="eyebrow">{cwCmp.eyebrow}</div>
                <h2>{cwCmp.h2Pre} <HL>{cwCmp.h2Hl}</HL></h2>
                <p className="cw-lede">{cwCmp.lead}</p>
              </>
            </div>

            <div className="cw-ctable cw-reveal">
              <div className="cw-row cw-thead">
                {cwCmp.headers.slice(0, 3).map((h, i) => (
                  <div key={i} className={`cw-cell${i === 0 ? ' cw-cap' : ''}`}>{h}</div>
                ))}
                <div className="cw-cell cw-us">
                  <span className="cw-us-pill">Kate - Poliris</span>
                </div>
              </div>
              {CMP_ROWS.map((row, i) => {
                const note = cwCmp.rowNotes[i] || {};
                return (
                  <div key={i} className="cw-row">
                    <div className="cw-cell cw-cap">
                      {cwCmp.rows[i] || row.cap}
                    </div>
                    <div className="cw-cell">
                      <CK type={row.gen[0]}/>
                      {note.gen && <span className="cw-cmini">{note.gen}</span>}
                    </div>
                    <div className="cw-cell">
                      <CK type={row.seo[0]}/>
                      {note.seo && <span className="cw-cmini">{note.seo}</span>}
                    </div>
                    <div className="cw-cell cw-us">
                      <CK type={row.us[0]}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <section className="cw-sec">
          <div className="cw-wrap">
            <div className="cw-head cw-center cw-reveal">
              <div className="eyebrow">{cwFaqs.eyebrow}</div>
              <h2>{cwFaqs.h2Pre} <HL>{cwFaqs.h2Hl}</HL></h2>
            </div>
            <div className="cw-reveal">
              <FaqAccordion items={cwFaqs.items} />
            </div>
          </div>
        </section>

        {/* ── CTA BAND ──────────────────────────────────────── */}
        <CtaBand
          heading={cwCta.heading}
          lead={cwCta.lead}
          primaryCta={cwCta.primaryCta}
          secondaryCta={cwCta.secondaryCta}
          note={cwCta.note}
        />

      </main>
      <Footer />
    </div>
  );
}
