import { useEffect } from 'react';
import '../technical-audit.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';
import { useLang } from '../contexts/LangContext';
import { trackEvent } from '../lib/analytics';
import { AuditVis } from '../components/ProductCarousel';
import SiteOverviewMockup from '../components/SiteOverviewMockup';

const HL = ({ children }) => <span className="hl">{children}</span>;

/* ─── SVG icons ─── */
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.2" style={{ fill: 'var(--blue-bright)', fillOpacity: .18, stroke: 'none' }} />
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.2" style={{ fill: 'none', stroke: 'var(--blue)', strokeWidth: 1.7 }} />
      <path d="M8 10.5V7.2a4 4 0 0 1 7.7-1.5" style={{ fill: 'none', stroke: 'var(--blue)', strokeWidth: 1.7, strokeLinecap: 'round' }} />
      <circle cx="12" cy="15" r="1.5" style={{ fill: 'var(--blue)', stroke: 'none' }} />
    </svg>
  );
}
function IconFile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3.5h7l5 5V20a.8.8 0 0 1-.8.8H6a.8.8 0 0 1-.8-.8V4.3A.8.8 0 0 1 6 3.5z" style={{ fill: 'var(--blue-bright)', fillOpacity: .18, stroke: 'none' }} />
      <path d="M6 3.5h7l5 5V20a.8.8 0 0 1-.8.8H6a.8.8 0 0 1-.8-.8V4.3A.8.8 0 0 1 6 3.5z" style={{ fill: 'none', stroke: 'var(--blue)', strokeWidth: 1.7, strokeLinejoin: 'round' }} />
      <path d="M13 3.5v5h5" style={{ fill: 'none', stroke: 'var(--blue)', strokeWidth: 1.7, strokeLinejoin: 'round' }} />
      <path d="M8 12.5h7M8 15.5h7M8 18h4" style={{ fill: 'none', stroke: 'var(--blue)', strokeWidth: 1.7, strokeLinecap: 'round' }} />
    </svg>
  );
}
function IconTree() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="4.6" rx="1.2" style={{ fill: 'var(--blue-bright)', fillOpacity: .18, stroke: 'none' }} />
      <rect x="9" y="3" width="6" height="4.6" rx="1.2" style={{ fill: 'none', stroke: 'var(--blue)', strokeWidth: 1.7 }} />
      <rect x="3" y="16.4" width="6" height="4.6" rx="1.2" style={{ fill: 'none', stroke: 'var(--blue)', strokeWidth: 1.7 }} />
      <rect x="15" y="16.4" width="6" height="4.6" rx="1.2" style={{ fill: 'none', stroke: 'var(--blue)', strokeWidth: 1.7 }} />
      <path d="M12 7.6v3M6 16.4v-2.4h12v2.4M12 11v3.6" style={{ fill: 'none', stroke: 'var(--blue)', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }} />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/>
    </svg>
  );
}
function IconLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1 1"/>
      <path d="M14 11a5 5 0 0 0-7.1 0l-2 2a5 5 0 0 0 7.1 7.1l1-1"/>
    </svg>
  );
}
function IconH() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v16M18 4v16M6 12h12"/>
    </svg>
  );
}

const ISSUE_ICONS = [<IconDoc key="doc" />, <IconLink key="link" />, <IconH key="h" />];

const TOC_ICONS = [
  /* 01 — Complex, made simple */
  <svg key="toc1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
  </svg>,
  /* 02 — Every tool, one place */
  <svg key="toc2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>,
  /* 03 — Fixed, not flagged */
  <svg key="toc3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>,
  /* 04 — Your agent does it */
  <svg key="toc4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>,
];

/* ─── Hub diagram (P2 section) ─── */
const AUDIT_HUB_STYLES = [
  { left: '50%', top: '7%'  },
  { left: '84%', top: '25%' },
  { left: '84%', top: '75%' },
  { left: '50%', top: '93%' },
  { left: '16%', top: '75%' },
  { left: '16%', top: '25%' },
];
const AUDIT_SPOKE_ENDS = [[50,7],[84,25],[84,75],[50,93],[16,75],[16,25]];
// Where each spoke crosses the inner ring — this is where the small dot
// marker sits, not at the satellite itself (that's hidden behind the icon).
const AUDIT_SPOKE_DOTS = [[50,21],[73.4,32.8],[73.4,67.2],[50,79],[26.6,67.2],[26.6,32.8]];

const TESTS = [
  'robots.txt', 'HTTP status', 'canonical', 'indexability', 'sitemap', 'hreflang', 'meta title',
];

// Cycled across the test tags (and reused for the pipeline's stage dots
// below) so the grid reads as colorful/varied rather than one monochrome tone.
const TAG_COLORS = ['#716BEB', '#6BC591', '#F2B5A5', '#1E3893', '#E2935E'];
function tagTint(hex) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},.12)`;
}
// 3 rows of the same 7 tags, colored by absolute position so the tint
// shifts down each column rather than repeating identically per row.
const TESTS_GRID = [...TESTS, ...TESTS, ...TESTS].map((tag, i) => ({ tag, color: TAG_COLORS[i % TAG_COLORS.length] }));

export default function TechnicalAuditPage() {
  const { t } = useLang();

  const ta      = t('technicalAudit');
  const hero    = ta.hero;
  const llm     = ta.llmBand;
  const dash    = ta.dashboard;
  const toc     = ta.toc;
  const p1      = ta.p1;
  const p2      = ta.p2;
  const p3      = ta.p3;

  const AUDIT_HUB_TOOLS = [
    { name: 'Search Console', logo: 'logo_search_console.svg' },
    { name: 'Analytics',      logo: 'google-analytics-logo-png_seeklogo-463929.png' },
    { name: 'Matomo',         logo: 'Matomo_Logo.svg' },
    { name: p2.addTool,       add: true },
    { name: 'Screaming Frog', logo: 'screaming-frog-seeklogo-2.svg' },
    { name: 'WordPress',      logo: 'wordpress.png' },
  ];
  const p4      = ta.p4;
  const cta     = ta.cta;

  /* reveal-on-scroll */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in', 'visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="ta-page">
      <Seo page="technical-audit" />
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────── */}
        <Hero
          eyebrow={hero.eyebrow}
          title={<>{hero.titlePre} <HL>{hero.titleHl}</HL></>}
          lead={hero.lead}
          primaryCta={hero.primaryCta}
          secondaryCta={hero.secondaryCta}
          note={hero.note}
          showDashboard={false}
        />

        {/* ── LLM chips + dashboard ─────────────────── */}
        <section style={{ background: 'var(--surface-2)', paddingTop: 48, paddingBottom: 64 }}>
          <div className="ta-app-wrap reveal">
            <p className="ta-app-cap">{dash.cap}</p>
            <div className="ta-app ta-app--mockup">
              <SiteOverviewMockup />
            </div>
          </div>
        </section>

        {/* ── TOC ──────────────────────────────────── */}
        <section className="ta-sec soft">
          <div className="wrap">
            <div className="sec-head mid reveal">
              <div className="eyebrow">{toc.eyebrow}</div>
              <h2 className="sec-h2">{toc.h2Pre} <HL>{toc.h2Hl}</HL></h2>
              <p className="lead">{toc.lead}</p>
            </div>
            <div className="tour reveal">
              {toc.cards.map((card, i) => (
                <a key={card.n} className="tcard" href={card.href}>
                  <div className="tcard-top">
                    <div className="ic">{TOC_ICONS[i]}</div>
                    <span className="num">{card.n}</span>
                  </div>
                  <h3>{card.h4}</h3>
                  <p>{card.p}</p>
                  <div className="jump">
                    {ta.seeIt}
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

        {/* ── P1 · THREE-PHASE AUDIT ───────────────── */}
        <section className="ta-sec soft" id="p1">
          <div className="wrap">
            <div className="ta-adv-head center reveal">
              <span className="eyebrow">{p1.tag}</span>
              <h2 className="sec-h2">{p1.h3Pre} <HL>{p1.h3Hl}</HL></h2>
              <p>{p1.p}</p>
            </div>

            <div className="ta-audit-card reveal">
              <div className="ta-tests-header">
                <span className="ta-tests-label">
                  {(() => {
                    const [bold, ...rest] = p1.testsLabel.split(' · ');
                    return <><strong>{bold}</strong>{rest.length ? ` · ${rest.join(' · ')}` : ''}</>;
                  })()}
                </span>
                <span className="ta-tests-badge">140 tests</span>
              </div>
              <div className="ta-tests-pills">
                {TESTS_GRID.map(({ tag, color }, i) => (
                  <span key={i} style={{ color, background: tagTint(color) }}>{tag}</span>
                ))}
              </div>
              <div className="ta-tests-more">{p1.testsMore}</div>

              <div className="ta-cx-arrow">
                <span>{p1.simplify}</span>
                <div className="ar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>
                  </svg>
                </div>
              </div>

              <AuditVis />
            </div>
          </div>
        </section>

        {/* ── P2 · EVERY TOOL, ONE PLACE ───────────── */}
        <section className="ta-sec" id="p2">
          <div className="wrap">
            <div className="ta-hub-section">
              <div className="ta-hub-text ta-adv-head reveal">
                <span className="eyebrow">{p2.tag}</span>
                <h2 className="sec-h2">{p2.h3Pre} <HL>{p2.h3Hl}</HL> {p2.h3Post}</h2>
                <p>{p2.p}</p>
                <p>{p2.constellationCap}</p>
              </div>

              <div className="ta-hub-stage reveal">
                <svg className="ta-hub-svg" viewBox="0 0 100 100" aria-hidden="true">
                  <circle className="ta-orbit ta-orbit-cut ta-hub-spin" cx="50" cy="50" r="43"/>
                  <circle className="ta-orbit" cx="50" cy="50" r="29"/>
                  <g className="ta-links">
                    {AUDIT_SPOKE_ENDS.map(([x, y], i) => (
                      <line key={i} x1="50" y1="50" x2={x} y2={y}/>
                    ))}
                  </g>
                  <g className="ta-ends">
                    {AUDIT_SPOKE_DOTS.map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="1.6"/>
                    ))}
                  </g>
                </svg>

                <div className="ta-hcenter">
                  <span className="ta-pav">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0.5 L13.7 9.1 C13.9 10 14 10.1 14.9 10.3 L23.5 12 L14.9 13.7 C14 13.9 13.9 14 13.7 14.9 L12 23.5 L10.3 14.9 C10.1 14 10 13.9 9.1 13.7 L0.5 12 L9.1 10.3 C10 10.1 10.1 10 10.3 9.1 Z"/>
                    </svg>
                  </span>
                  <div className="ta-hc-n">Poliris</div>
                  <div className="ta-hc-s">{p2.hubSub}</div>
                </div>

                {AUDIT_HUB_TOOLS.map((tool, i) => (
                  <div key={i} className={`ta-hsrc${tool.add ? ' ta-hsrc--add' : ''}`} style={AUDIT_HUB_STYLES[i]} title={tool.name}>
                    {tool.add ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14"/><path d="M5 12h14"/>
                      </svg>
                    ) : (
                      <img
                        src={`${import.meta.env.BASE_URL}${tool.logo}`}
                        alt={tool.name}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── P3 · FIND IT, FIX IT ─────────────────── */}
        <section className="ta-sec soft" id="p3">
          <div className="wrap">
            <div className="ta-adv-head center reveal">
              <span className="eyebrow">{p3.tag}</span>
              <h2 className="sec-h2">{p3.h3Pre} <HL>{p3.h3Hl}</HL></h2>
              <p>{p3.p}</p>
            </div>

            <div className="ta-bana">
              {/* Before */}
              <div className="reveal reveal--left">
                <div className="ta-ba-tag">{p3.beforeLabel}</div>
                <div className="ta-ba-card ta-ba-before">
                  <div className="ta-ba-page">
                    <span className="ta-ba-url">{p3.url}</span>
                  </div>
                  {p3.issues.before.map((issue, i) => (
                    <div key={i} className="ta-ba-issue">
                      <span className="ta-ba-ic bad">{ISSUE_ICONS[i]}</span>
                      <div><b>{issue.b}</b><span>{issue.span}</span></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="ta-ba-act reveal reveal--d3">
                <div className="ta-ba-rec">
                  <span className="ta-ba-rav">P</span>{p3.fixesReady}
                </div>
                <button className="ta-ba-apply">{p3.applyBtn}</button>
                <div className="ta-ba-flow">{p3.flowLabel}</div>
              </div>

              {/* After */}
              <div className="reveal reveal--right reveal--d5">
                <div className="ta-ba-tag ok">{p3.afterLabel}</div>
                <div className="ta-ba-card ta-ba-after">
                  <div className="ta-ba-page">
                    <span className="ta-ba-url">{p3.url}</span>
                    <span className="ta-ba-live">{p3.liveLabel}</span>
                  </div>
                  {p3.issues.after.map((issue, i) => (
                    <div key={i} className="ta-ba-issue" style={{ transitionDelay: `${0.5 + i * 0.12}s` }}>
                      <span className="ta-ba-ic ok">{ISSUE_ICONS[i]}</span>
                      <div><b>{issue.b}</b><span>{issue.span}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="ta-gate-cap reveal">{p3.footCap}</p>
          </div>
        </section>

        {/* ── P4 · TOM AGENT ────────────────────────── */}
        <section className="ta-sec" id="p4">
          <div className="wrap">
            <div className="ta-agent-card reveal">
              <div className="ta-agent-grid">

                {/* Left: text */}
                <div>
                  <div className="eyebrow">{p4.eyebrow}</div>
                  <h2>{p4.h2Pre}<br /><HL>{p4.h2Hl}</HL> {p4.h2Post}</h2>
                  <p className="lead ta-agent-lead">{p4.lead}</p>
                  <ul className="ta-agent-list">
                    {p4.points.map((pt, i) => (
                      <li key={i}><i>›</i> {pt}</li>
                    ))}
                  </ul>
                  <a className="ta-btn-blue" href="https://app.poliris.io" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('trial_cta_clicked')}>
                    {p4.meetTom}
                  </a>
                </div>

                {/* Right: chat UI */}
                <div className="ta-agent-shot">
                  <span className="ta-agent-tab">{p4.chatAgentLabel.split('·')[0].trim()}</span>
                  <div className="ta-chat">
                    <div className="ta-tom-id">
                      <span className="ta-tom-av">T</span>
                      {p4.chatAgentLabel}
                    </div>
                    {p4.bubbles.map((bub, i) => (
                      <div
                        key={i}
                        className={`ta-bub ${bub.from}`}
                        dangerouslySetInnerHTML={{ __html: bub.text }}
                      />
                    ))}
                  </div>
                  <div className="ta-plan">
                    <div className="ta-plan-h">
                      <span className="ta-tom-av">T</span>
                      {p4.planTitle}
                    </div>
                    {p4.planItems.map((item, i) => (
                      <div key={i} className="ta-plan-item">
                        <span className="t">{item.t}</span>
                        <span className={`ta-impact ${item.impact}`}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BAND ─────────────────────────────── */}
        <CtaBand
          heading={cta.heading}
          lead={cta.lead}
          primaryCta={cta.primaryCta}
          secondaryCta={cta.secondaryCta}
          note={cta.note}
        />

      </main>
      <Footer />
    </div>
  );
}
