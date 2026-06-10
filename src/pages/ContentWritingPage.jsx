import { useEffect, useState } from 'react';
import '../content-writing.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';

const HL = ({ children }) => <span className="hl">{children}</span>;

// ---- check / cross icons used in comparison table ----------
function CK({ type }) {
  return (
    <span className={`cw-ck ${type}`}>
      {type === 'yes' && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      )}
      {type === 'no' && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      )}
      {type === 'part' && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round">
          <path d="M5 12h14"/>
        </svg>
      )}
    </span>
  );
}

// ---- data --------------------------------------------------
const BEFORE_SCORES = [
  { label: 'Keywords',        pct: 30, cls: 'bad',  val: '3/10' },
  { label: 'Topic Depth',     pct: 40, cls: 'bad',  val: '4/10' },
  { label: 'Readability',     pct: 50, cls: 'warn', val: '5/10' },
  { label: 'AI Engine Ready', pct: 10, cls: 'bad',  val: '1/10' },
  { label: 'Writing Quality', pct: 50, cls: 'warn', val: '5/10' },
];

const AFTER_SCORES = [
  { label: 'Keywords',        pct: 100, val: '10/10' },
  { label: 'Topic Depth',     pct: 90,  val: '9/10'  },
  { label: 'Readability',     pct: 80,  val: '8/10'  },
  { label: 'AI Engine Ready', pct: 80,  val: '8/10'  },
  { label: 'Writing Quality', pct: 90,  val: '9/10'  },
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
    a: 'No. Kate is loaded with your live Poliris data — visibility gaps, sentiment, technical audit, brand, products and audiences — and writes to fix your real weaknesses. A generic writer starts from nothing.',
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
    a: 'Three independent layers: deterministic programmatic checks, a qualitative LLM judge, and a hallucination auditor — combined into one 0–100 score across SEO, GEO and AEO signals.',
  },
  {
    q: 'Do I need to be an SEO expert?',
    a: 'No. Kate is built for non-experts — product managers, founders, teams without an in-house marketing desk. You talk in plain language; she handles the technical depth.',
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
  { num:'01', label:'Brief',     text:'Kate interviews you. Three options surface for product, audience, and format — you pick the one that fits your goal.',                        tags:['Interview','Format','Audience'] },
  { num:'02', label:'Angles',    text:'Three distinct editorial takes on the same topic — different hooks, different arguments. You choose the direction that fits.',               tags:['Hook','Direction','Editorial'] },
  { num:'03', label:'Configure', text:'Set keyword focus, writing tone, intent, length target, and grounding facts. Every field is editable before writing starts.',               tags:['Keyword','Tone','Intent','Length'] },
  { num:'04', label:'Links',     text:'Sitemap-aware internal link suggestions appear automatically. Pick the ones you want woven into the piece naturally.',                       tags:['Internal links','Sitemap','SEO'] },
  { num:'05', label:'Outline',   text:'H2 and H3 structure generated with per-section word budgets. Drag to reorder, add, or remove sections freely.',                            tags:['H2 / H3','Word budget','Reorder'] },
  { num:'06', label:'Generate',  text:"Research, write, and score — section by section in the background. Watch each part land as it's written.",                                tags:['Research','Write','Score'] },
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

function PipelineTrack() {
  const [cur, setCur] = useState(0);
  const [fading, setFading] = useState(false);
  const N = PIPELINE_STEPS.length;

  function go(i) {
    if (i < 0 || i >= N || i === cur) return;
    setFading(true);
    setTimeout(() => { setCur(i); setFading(false); }, 150);
  }

  const d = PIPELINE_STEPS[cur];
  return (
    <div className="cw-pipe cw-reveal">
      <div className="cw-pipe-track">
        {PIPELINE_STEPS.map((_, i) => [
          <button key={`dot-${i}`} className={`cw-pipe-dot${i === cur ? ' active' : i < cur ? ' done' : ''}`} onClick={() => go(i)} aria-label={PIPELINE_STEPS[i].label} />,
          i < N - 1 && <div key={`line-${i}`} className="cw-pipe-line"><div className="cw-pipe-line-fill" style={{ width: i < cur ? '100%' : '0%' }} /></div>,
        ])}
      </div>
      <div className="cw-pipe-cards">
        {PIPELINE_STEPS.map((s, i) => (
          <button key={i} className={`cw-pipe-card${i === cur ? ' active' : ''}`} onClick={() => go(i)}>
            <div className="cw-pipe-card-num">{s.num}</div>
            <div className="cw-pipe-card-ic"><PipeIcon index={i} /></div>
            <div className="cw-pipe-card-label">{s.label}</div>
          </button>
        ))}
      </div>
      <div className={`cw-pipe-detail${fading ? ' fading' : ''}`}>
        <div className="cw-pipe-detail-left">
          <div className="cw-pipe-ghost">{d.num}</div>
          <div className="cw-pipe-dlabel">{d.label}</div>
          <div className="cw-pipe-dtext">{d.text}</div>
        </div>
        <div className="cw-pipe-detail-right">
          <div className="cw-pipe-pills">
            {d.tags.map(t => <span key={t} className="cw-pipe-pill">{t}</span>)}
          </div>
          <div className="cw-pipe-nav">
            <button className="cw-pipe-nav-btn" onClick={() => go(cur - 1)} disabled={cur === 0}>
              <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="cw-pipe-nav-btn" onClick={() => go(cur + 1)} disabled={cur === N - 1}>
              <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>
            </button>
          </div>
          <div className="cw-pipe-count"><strong>{cur + 1}</strong> of {N} steps</div>
        </div>
      </div>
    </div>
  );
}

// ---- hub node positions ------------------------------------
const HUB_NODES = [
  { style: { left: '50%', top: '8%'  }, title: 'GEO gaps',      sub: 'where AI skips you',      tag: 'Visibility' },
  { style: { left: '78%', top: '22%' }, title: 'Sentiment',      sub: 'how AI talks about you',  tag: 'Sentiment'  },
  { style: { left: '88%', top: '50%' }, title: 'Technical audit', sub: "what's crawlable",       tag: 'Audit'      },
  { style: { left: '78%', top: '78%' }, title: 'Products',       sub: 'your real catalogue',     tag: null         },
  { style: { left: '50%', top: '92%' }, title: 'Audiences',      sub: 'market & intent',         tag: null         },
  { style: { left: '22%', top: '78%' }, title: 'Competitors',    sub: 'who AI cites instead',    tag: null         },
  { style: { left: '12%', top: '50%' }, title: 'Brand & voice',  sub: 'tone & rules',            tag: null         },
  { style: { left: '22%', top: '22%' }, title: 'Site & links',   sub: 'where to connect',        tag: null         },
];

// ---- SVG spoke endpoints (match hub node positions in %) ---
const SPOKE_ENDS = [
  [50,8],[78,22],[88,50],[78,78],[50,92],[22,78],[12,50],[22,22]
];

export default function ContentWritingPage() {
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
      <Navbar />
      <main>

        {/* ── HERO ──────────────────────────────────────────── */}
        <Hero
          eyebrow="Content Writing · Meet Kate"
          title={<>The AI writing room <HL>built for your brand.</HL></>}
          lead="Kate is your content agent. She already knows your brand and exactly where AI isn't citing you — so you just talk: she writes, optimises and publishes content that gets you cited."
          primaryCta="Start free trial"
          secondaryCta="Book a demo"
          note="Publish-ready draft in ~90 seconds · No SEO expertise · You stay in control"
          showDashboard={false}
        />

        {/* ── DATA SYNERGY — orbital hub ────────────────────── */}
        <section className="cw-sec">
          <div className="cw-wrap">
            <div className="cw-head cw-center cw-reveal">
              <div className="eyebrow">Why Kate is different</div>
              <h2>Kate is already briefed on your<br />entire brand.</h2>
              <p className="cw-lede">
                She knows your products, audiences, competitors and every Poliris audit you've run —
                so she starts writing the moment you ask, with no blank page and nothing to re-explain.
              </p>
            </div>

            <div className="hub-stage cw-reveal">
              <svg className="hub-svg" viewBox="0 0 100 100" aria-hidden="true">
                <circle className="orbit hub-spin" cx="50" cy="50" r="43"/>
                <circle className="orbit" cx="50" cy="50" r="29"/>
                <g className="links">
                  {SPOKE_ENDS.map(([x, y], i) => (
                    <line key={i} x1="50" y1="50" x2={x} y2={y}/>
                  ))}
                </g>
                <g className="ends">
                  {SPOKE_ENDS.map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="1.1"/>
                  ))}
                </g>
              </svg>

              <div className="hcenter">
                <span className="kw-av">K</span>
                <div className="hc-n">Kate</div>
                <div className="hc-s">writes to your strategy</div>
              </div>

              {HUB_NODES.map((node, i) => (
                <div key={i} className="hsrc" style={node.style}>
                  <b>{node.title}</b>
                  <i>{node.sub}</i>
                  {node.tag && <em>{node.tag}</em>}
                </div>
              ))}
            </div>

            <p className="hub-cap cw-reveal">
              Change your market or audience and Kate adapts the angle, tone and references — so the content
              stays <b>aligned with your branding strategy</b>, automatically.
            </p>
          </div>
        </section>

        {/* ── THREE JOBS ────────────────────────────────────── */}
        <section className="cw-sec" style={{ background: 'var(--surface-2)' }}>
          <div className="cw-wrap">
            <div className="cw-head cw-center cw-reveal">
              <div className="eyebrow">One agent, three jobs</div>
              <h2>Write it. Optimize it. Implement it.</h2>
              <p className="cw-lede">Kate covers the full content loop — and you can start anywhere.</p>
            </div>

            <div className="cw-tour cw-reveal">
              {[
                { no: '01', href: '#write',     Icon: IconDoc,    title: 'From a topic to a publish-ready article',  desc: "A short conversational brief, three angles, a full draft with outline, links and metadata, graded as it's written." },
                { no: '02', href: '#optimize',  Icon: IconChart,  title: 'Score it, then lift the weak parts',        desc: 'New article or existing URL. Kate grades it across the signals that matter, then rewrites only what needs fixing to raise the score.' },
                { no: '03', href: '#implement', Icon: IconUpload, title: 'Publish it straight to your site',          desc: 'Approve the draft and Kate deploys it to your website in one click. No copy-paste, no developer, no extra steps.' },
              ].map(({ no, href, Icon, title, desc }) => (
                <a key={no} className="cw-tcard" href={href}>
                  <div className="cw-tcard-top">
                    <div className="cw-tcard-ic"><Icon /></div>
                    <span className="cw-tcard-num">{no}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="cw-tcard-jump">
                    See it
                    <span className="cw-tcard-arr">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12l7 7 7-7"/>
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── WRITE — 7 STEPS ───────────────────────────────── */}
        <section id="write" className="cw-sec">
          <div className="cw-wrap">
            <div className="cw-adv-head cw-center cw-reveal">
              <span className="cw-adv-tag">01 · Write</span>
              <h3>From a topic to a publish-ready article, in seven steps.</h3>
              <p>Conversational up front, structured underneath. Every step is editable — you stay in control of the inputs.</p>
            </div>

            <PipelineTrack />
          </div>
        </section>

        {/* ── OPTIMIZE + SCORE ──────────────────────────────── */}
        <section id="optimize" className="cw-sec" style={{ background: 'var(--surface-2)' }}>
          <div className="cw-wrap">
            <div className="cw-adv-head cw-center cw-reveal">
              <span className="cw-adv-tag">02 · Optimize &amp; Score</span>
              <h3>A score you can trust, and the rewrite to lift it.</h3>
              <p>New article or an existing URL. Kate grades your content, then rewrites only the weak parts.</p>
            </div>

            <div className="ba cw-reveal">
              {/* Before */}
              <div className="cscore before">
                <div className="cs-tag">Your draft, before Kate</div>
                <div className="cs-top">
                  <div className="cs-ttl"><IconStar /> Content Score</div>
                  <div className="cs-num">38<em>/100</em></div>
                </div>
                <div className="cs-track"><i style={{ width: '38%' }}/></div>
                <div className="cs-verdict">Needs work, won't rank</div>
                {BEFORE_SCORES.map(s => (
                  <div key={s.label} className="cs-row">
                    <span className="cs-lab">{s.label}</span>
                    <div className="cs-bar"><i className={s.cls} style={{ width: `${s.pct}%` }}/></div>
                    <span className="cs-val">{s.val}</span>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div className="ba-arrow">
                <span className="ba-lab">After Kate</span>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--poliris-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
                <span className="ba-lab">+44</span>
              </div>

              {/* After */}
              <div className="cscore after">
                <div className="cs-tag">After Kate optimizes</div>
                <div className="cs-top">
                  <div className="cs-ttl"><IconStar /> Content Score</div>
                  <div className="cs-num">82<em>/100</em></div>
                </div>
                <div className="cs-track"><i style={{ width: '82%' }}/></div>
                <div className="cs-verdict">Good, ready to rank</div>
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
        </section>

        {/* ── IMPLEMENT ─────────────────────────────────────── */}
        <section id="implement" className="cw-sec">
          <div className="cw-wrap">
            <div className="cw-adv-head cw-center cw-reveal">
              <span className="cw-adv-tag">03 · Implement</span>
              <h3>Approve once. Kate publishes it for you.</h3>
              <p>No copy-paste, no handover to a developer. The moment you approve, Kate pushes it live — formatted, linked and ready to be indexed.</p>
            </div>

            <div className="impl2 cw-reveal">
              <div className="mbw">
                <div className="mbw-bar">
                  <span className="mbw-dot red"/><span className="mbw-dot yellow"/><span className="mbw-dot green"/>
                  <div className="mbw-url">
                    <svg className="mbw-lock" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                    </svg>
                    nike.com/blog/lifestyle-footwear
                  </div>
                  <span className="mbw-live">✓ Live</span>
                </div>
                <div className="mbw-hero">
                  <span className="mbw-hero-cat">Lifestyle · Sport</span>
                </div>
                <div className="mbw-body">
                  <div className="mbw-meta"><span className="mbw-pin"/>Blog · 6 min read · Just published</div>
                  <h6>Lifestyle footwear that flexes with modern aesthetics</h6>
                  <p className="mbw-p">
                    Nike lifestyle sneakers aren't built for one moment. The pair you lace up for a morning
                    run should still carry you into a Friday dinner — see our{' '}
                    <span className="lk">guide to picking your fit</span>.
                  </p>
                  <div className="mbw-ln"/>
                  <div className="mbw-ln"/>
                  <div className="mbw-ln s"/>
                </div>
              </div>

              <div className="impl-toast">
                <span className="impl-chk">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </span>
                <span>Published by Kate<small>One click, no developer</small></span>
              </div>
            </div>
          </div>
        </section>

        {/* ── INTERNAL LINKING ──────────────────────────────── */}
        <section className="cw-sec" style={{ background: 'var(--surface-2)' }}>
          <div className="cw-wrap">
            <div className="cw-head cw-center cw-reveal">
              <div className="eyebrow">Internal linking, automatic</div>
              <h2>Kate links your article to the<br />rest of your site.</h2>
              <p className="cw-lede">
                As she writes, Kate turns key phrases in your article into links to your other pages.
                Readers click through, and search engines and AI follow the very same links to discover your whole site.
              </p>
            </div>

            <div className="lk3 cw-reveal">
              <svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Keywords in an article linking to pages of your website">
                {/* Article panel */}
                <rect x="20" y="20" width="340" height="280" rx="8" fill="#fff" stroke="#EEEEEE" strokeWidth="1"/>
                <rect x="20" y="20" width="340" height="38" rx="8" fill="#F7FAFE" stroke="#EEEEEE" strokeWidth="1"/>
                <rect x="20" y="46" width="340" height="12" rx="0" fill="#F7FAFE"/>
                <circle cx="38" cy="39" r="5" fill="#EEEEEE"/>
                <circle cx="52" cy="39" r="5" fill="#EEEEEE"/>
                <circle cx="66" cy="39" r="5" fill="#EEEEEE"/>
                <rect x="88" y="33" width="160" height="12" rx="6" fill="#EEEEEE"/>
                <rect x="36" y="74" width="300" height="10" rx="5" fill="#EEF2FB"/>
                <rect x="36" y="90" width="270" height="8" rx="4" fill="#F4F4F4"/>
                <rect x="36" y="104" width="290" height="8" rx="4" fill="#F4F4F4"/>
                <rect x="36" y="124" width="180" height="10" rx="5" fill="#F4F4F4"/>
                {/* keyword links in text */}
                <rect x="36"  y="140" width="88" height="10" rx="5" fill="#D6E0F5"/>
                <rect x="132" y="140" width="70" height="10" rx="5" fill="#F4F4F4"/>
                <rect x="210" y="140" width="110" height="10" rx="5" fill="#D6E0F5"/>
                <rect x="36"  y="158" width="200" height="8" rx="4" fill="#F4F4F4"/>
                <rect x="244" y="158" width="90"  height="8" rx="4" fill="#D6E0F5"/>
                <rect x="36"  y="174" width="130" height="8" rx="4" fill="#F4F4F4"/>
                <rect x="36"  y="194" width="100" height="8" rx="4" fill="#D6E0F5"/>
                <rect x="144" y="194" width="160" height="8" rx="4" fill="#F4F4F4"/>
                <rect x="36"  y="210" width="260" height="8" rx="4" fill="#F4F4F4"/>
                <rect x="36"  y="226" width="190" height="8" rx="4" fill="#F4F4F4"/>
                <rect x="36"  y="246" width="120" height="8" rx="4" fill="#D6E0F5"/>
                <rect x="164" y="246" width="150" height="8" rx="4" fill="#F4F4F4"/>
                <rect x="36"  y="264" width="220" height="8" rx="4" fill="#F4F4F4"/>

                {/* Link lines to destination pages */}
                <line x1="80"  y1="145" x2="420" y2="80"  stroke="#5B7BFB" strokeWidth="1.2" strokeDasharray="4 3" opacity=".7"/>
                <line x1="264" y1="145" x2="420" y2="165" stroke="#5B7BFB" strokeWidth="1.2" strokeDasharray="4 3" opacity=".7"/>
                <line x1="290" y1="162" x2="420" y2="245" stroke="#5B7BFB" strokeWidth="1.2" strokeDasharray="4 3" opacity=".7"/>
                <line x1="86"  y1="198" x2="420" y2="85"  stroke="#5B7BFB" strokeWidth="1.2" strokeDasharray="4 3" opacity=".5"/>
                <line x1="86"  y1="250" x2="420" y2="248" stroke="#5B7BFB" strokeWidth="1.2" strokeDasharray="4 3" opacity=".5"/>

                {/* Destination page cards */}
                {[
                  { y: 48, label: '/running-shoes',  sub: 'Product page' },
                  { y: 133, label: '/size-guide',     sub: 'Guide page'   },
                  { y: 218, label: '/lifestyle-blog', sub: 'Blog index'   },
                ].map((card, i) => (
                  <g key={i}>
                    <rect x="420" y={card.y} width="320" height="70" rx="8" fill="#fff" stroke="#EEEEEE" strokeWidth="1"/>
                    <rect x="438" y={card.y + 14} width="16" height="16" rx="4" fill="#EEF2FB"/>
                    <rect x="462" y={card.y + 16} width="140" height="8" rx="4" fill="#141414" opacity=".7"/>
                    <rect x="438" y={card.y + 38} width="220" height="6" rx="3" fill="#F4F4F4"/>
                    <rect x="438" y={card.y + 50} width="160" height="6" rx="3" fill="#F4F4F4"/>
                    <text x="684" y={card.y + 22} fontSize="9" fill="#9AA0AB" fontFamily="ui-monospace,monospace">{card.label}</text>
                    <text x="684" y={card.y + 35} fontSize="8" fill="#C0C0C0" fontFamily="sans-serif">{card.sub}</text>
                  </g>
                ))}

                {/* Kate badge */}
                <rect x="155" y="284" width="90" height="24" rx="12" fill="#EEF2FB"/>
                <text x="200" y="300" fontSize="9.5" fill="var(--poliris-blue, #1E3893)" fontFamily="sans-serif" fontWeight="700" textAnchor="middle">linked by Kate</text>
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
                Readers
              </span>
              <span className="lk2-chip">
                <span className="lk-ic">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
                  </svg>
                </span>
                Search engines
              </span>
              <span className="lk2-chip">
                <span className="lk-ic">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/>
                    <path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z"/>
                  </svg>
                </span>
                AI engines
              </span>
            </div>
            <p className="lk2-note cw-reveal">All three follow Kate's links to reach every page on your site, so your content is found, ranked and cited.</p>
          </div>
        </section>

        {/* ── MULTI-CHANNEL ─────────────────────────────────── */}
        <section className="cw-sec">
          <div className="cw-wrap">
            <div className="cw-head cw-center cw-reveal">
              <div className="eyebrow">Wherever content lives</div>
              <h2>Not just your blog.</h2>
              <p className="cw-lede">Kate is built to work wherever your brand needs to show up — so you stay present across every channel that matters.</p>
            </div>

            <div className="channels cw-reveal">
              {[
                {
                  label: 'Blog & site',
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--poliris-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>,
                },
                {
                  label: 'Docs',
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--poliris-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5V5a1 1 0 0 1 1-1h10l5 5v10.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M14 4v6h6M8 14h8M8 17h5"/></svg>,
                },
                {
                  label: 'LinkedIn',
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--poliris-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7"/></svg>,
                },
                {
                  label: 'Social posts',
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--poliris-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/></svg>,
                },
                {
                  label: 'Newsletter',
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="var(--poliris-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>,
                },
              ].map(ch => (
                <div key={ch.label} className="chan">
                  <span className="chan-ic">{ch.icon}</span>
                  {ch.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON ────────────────────────────────────── */}
        <section className="cw-sec" style={{ background: 'var(--surface-2)' }}>
          <div className="cw-wrap">
            <div className="cw-head cw-center cw-reveal">
              <div className="eyebrow">Where Kate stands</div>
              <h2>Two kinds of tools. Kate is neither.</h2>
              <p className="cw-lede">Generic AI writers don't know your brand. Standalone SEO-content tools don't see your real AI visibility. Kate is built on both.</p>
            </div>

            <div className="cw-ctable cw-reveal">
              <div className="cw-row cw-thead">
                <div className="cw-cell cw-cap">Capability</div>
                <div className="cw-cell">Generic AI writers</div>
                <div className="cw-cell">Standalone SEO tools</div>
                <div className="cw-cell cw-us">✦ Kate · Poliris</div>
              </div>
              {CMP_ROWS.map((row, i) => (
                <div key={i} className="cw-row">
                  <div className="cw-cell cw-cap">{row.cap}</div>
                  <div className="cw-cell">
                    <CK type={row.gen[0]}/>
                    {row.gen[1] && <span className="cw-cmini">{row.gen[1]}</span>}
                  </div>
                  <div className="cw-cell">
                    <CK type={row.seo[0]}/>
                    {row.seo[1] && <span className="cw-cmini">{row.seo[1]}</span>}
                  </div>
                  <div className="cw-cell cw-us">
                    <CK type={row.us[0]}/>
                    {row.us[1] && <span className="cw-cmini">{row.us[1]}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <section className="cw-sec">
          <div className="cw-wrap">
            <div className="cw-head cw-center cw-reveal">
              <div className="eyebrow">Good to know</div>
              <h2>Quick answers about Kate.</h2>
            </div>
            <div className="cw-faq cw-reveal">
              {FAQS.map((item, i) => (
                <details key={i}>
                  <summary>{item.q}</summary>
                  <div className="faq-a">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BAND ──────────────────────────────────────── */}
        <CtaBand
          heading="Add Kate into your content team."
          lead="The Writing Room ships with every Poliris plan. Your first article in about 90 seconds — no SEO expertise required."
          primaryCta="Start free trial"
          secondaryCta="See pricing"
          note="First draft in ~90 seconds · No credit card · Cancel anytime"
        />

      </main>
      <Footer />
    </div>
  );
}
