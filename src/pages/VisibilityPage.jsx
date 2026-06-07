import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MarketMapSvg from '../components/MarketMapSvg';
import Hero from '../components/Hero';

const HL = ({ children }) => <span className="hl">{children}</span>;

/* ---- Scope data for the Real Market section -------------- */
const SCOPE_DATA = {
  worldwide: {
    loc: 'World · global',
    verdict: "Against the global platforms you're invisible — and that's fine. They're not who your buyers compare you to.",
    comps: [
      { nm: 'Workday', v: 96 },
      { nm: 'SAP SuccessFactors', v: 93 },
      { nm: 'ADP', v: 90 },
      { nm: 'BambooHR', v: 78 },
      { nm: 'Rippling', v: 74 },
      { nm: 'Sprout (you)', v: 9, me: true },
    ],
  },
  country: {
    loc: 'France · national',
    verdict: 'At national level you rank <b>#6</b> — behind names you rarely meet in a real deal.',
    comps: [
      { nm: 'PayFit', v: 92 },
      { nm: 'Lucca', v: 81 },
      { nm: 'Silae', v: 70 },
      { nm: 'Sage', v: 63 },
      { nm: 'Cegid', v: 58 },
      { nm: 'Sprout (you)', v: 44, me: true },
    ],
  },
  region: {
    loc: 'Auvergne-Rhône-Alpes',
    verdict: 'Across your region you climb to <b>#3</b> — the enterprise names fade.',
    comps: [
      { nm: 'Lucca', v: 78 },
      { nm: 'Combo', v: 70 },
      { nm: 'Sprout (you)', v: 66, me: true },
      { nm: 'Skello', v: 51 },
    ],
  },
  local: {
    loc: 'Lyon · 69001–69009',
    verdict: "In your real market you're <b>#2</b> — a fight you can actually win.",
    comps: [
      { nm: 'Combo', v: 71 },
      { nm: 'Sprout (you)', v: 68, me: true },
      { nm: 'Skello', v: 52 },
    ],
  },
};

export default function VisibilityPage() {
  const [dashTab, setDashTab] = useState('v1');
  const [scope, setScope] = useState('worldwide');

  /* Reveal-on-scroll: adds .in to every .reveal element */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scopeData = SCOPE_DATA[scope];
  const sortedComps = [...scopeData.comps].sort((a, b) => b.v - a.v);

  return (
    <div className="vis-page">
      <Navbar />
      <main>

        {/* ======================== HERO ======================== */}
        <Hero
          dark
          eyebrow="Poliris Visibility"
          title={<>Win the share of voice<br />inside <HL>AI answers.</HL></>}
          lead="The AI-visibility analysis built around your product — and your real market. See exactly where you're recommended, topic by topic and market by market."
          primaryCta="Get your free trial"
          secondaryCta="Book a demo"
          note="14 days free · No credit card required"
          showDashboard={false}
        />

        {/* ======================== DASHBOARD ======================== */}
        <div className="dash-wrap">
          <div className="wrap reveal">
            <div className="dash-cap"><span className="eyebrow">Inside the dashboard</span></div>
            <div className="browser">
              <div className="browser-bar">
                <div className="dots">
                  <i /><i /><i />
                </div>
                <span className="url">app.poliris.io · Sprout HR</span>
              </div>
              <div className="app-canvas">
                <div className="app-head">
                  <div className="app-brand">
                    <div className="ab-logo">S</div>
                    <div>
                      <div className="ab-name">Sprout HR</div>
                      <div className="ab-tag">AI Visibility · <span className="ab-meta">Updated today</span></div>
                    </div>
                  </div>
                  <div className="app-status">
                    <span className="sl">Overall score</span>
                    <span className="status-pill">↑ 73 / 100</span>
                  </div>
                </div>
                <div className="nora-banner">
                  <span className="sp">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/>
                    </svg>
                  </span>
                  <p><b>Nora:</b> Strong overall — but your Pricing coverage is slipping. Worth a look before it spreads.</p>
                </div>
                <div className="app-tabs">
                  {[
                    { id: 'v1', label: 'By topic' },
                    { id: 'v2', label: 'By AI model' },
                    { id: 'v3', label: 'Over time' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      className={`app-tab${dashTab === t.id ? ' active' : ''}`}
                      onClick={() => setDashTab(t.id)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Tab: By topic */}
                <div className={`app-panel${dashTab === 'v1' ? ' active' : ''}`}>
                  <div className="axis-row">
                    <div className="ar-top"><span>Reliability</span><span className="vp good">Leading</span></div>
                    <div className="dbar"><i style={{ width: '88%' }} /></div>
                  </div>
                  <div className="axis-row">
                    <div className="ar-top"><span>Integrations</span><span className="vp mid">On par</span></div>
                    <div className="dbar"><i className="mid" style={{ width: '67%' }} /></div>
                  </div>
                  <div className="axis-row">
                    <div className="ar-top"><span>Pricing &amp; value</span><span className="vp low">Behind</span></div>
                    <div className="dbar"><i className="low" style={{ width: '54%' }} /></div>
                  </div>
                </div>

                {/* Tab: By AI model */}
                <div className={`app-panel${dashTab === 'v2' ? ' active' : ''}`}>
                  <div className="byai-row">
                    <span className="eng">◍ ChatGPT</span>
                    <div className="dbar"><i style={{ width: '81%' }} /></div>
                    <span className="vp good">Strong</span>
                  </div>
                  <div className="byai-row">
                    <span className="eng">✦ Gemini</span>
                    <div className="dbar"><i className="mid" style={{ width: '59%' }} /></div>
                    <span className="vp mid">Mixed</span>
                  </div>
                  <div className="byai-row">
                    <span className="eng">✶ Perplexity</span>
                    <div className="dbar"><i style={{ width: '74%' }} /></div>
                    <span className="vp good">Strong</span>
                  </div>
                  <p className="byai-cap">Same brand, different engines — strong on ChatGPT, softer on Gemini.</p>
                </div>

                {/* Tab: Over time */}
                <div className={`app-panel${dashTab === 'v3' ? ' active' : ''}`}>
                  <div className="trend-top">
                    <span className="big">Growing</span>
                    <span className="alert">▼ Pricing −8 pts / 30d</span>
                  </div>
                  <svg className="trend-svg" viewBox="0 0 560 130" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="vtg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#1e3893" stopOpacity="0.16"/>
                        <stop offset="1" stopColor="#1e3893" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="34" x2="560" y2="34" stroke="#eef0f5"/>
                    <line x1="0" y1="68" x2="560" y2="68" stroke="#eef0f5"/>
                    <line x1="0" y1="102" x2="560" y2="102" stroke="#eef0f5"/>
                    <path d="M0,60 L112,57 L224,55 L336,52 L448,48 L560,45 L560,130 L0,130 Z" fill="url(#vtg)"/>
                    <path d="M0,60 L112,57 L224,55 L336,52 L448,48 L560,45" fill="none" stroke="#1e3893" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M0,72 L112,75 L224,80 L336,90 L448,100 L560,110" fill="none" stroke="#d98a2b" strokeWidth="2" strokeDasharray="5 4" strokeLinecap="round"/>
                    <circle cx="560" cy="45" r="5" fill="#1e3893" stroke="#fff" strokeWidth="2.5"/>
                    <circle cx="560" cy="110" r="4.5" fill="#d98a2b" stroke="#fff" strokeWidth="2.5"/>
                  </svg>
                  <div className="trend-axis">
                    <span>30 days ago</span>
                    <span>Today · overall up, Pricing slipping</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ======================== TOUR ======================== */}
        <section style={{ background: 'var(--surface-2)', paddingTop: 84, paddingBottom: 84 }}>
          <div className="wrap">
            <div className="sec-head mid reveal">
              <div className="eyebrow">What's inside</div>
              <h2>Four ways we read <span className="hl">your AI visibility.</span></h2>
              <p className="lead">Not prompt counts — the way buyers actually judge you. Tap any card to jump straight to it.</p>
            </div>
            <div className="tour reveal">
              <a href="#focus" className="tcard">
                <div className="tcard-top">
                  <div className="ic">
                    <svg className="licon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                    </svg>
                  </div>
                  <div className="num">01</div>
                </div>
                <h3>Product focus</h3>
                <p>Scored on the topics buyers judge on — reliability, integrations, pricing — not isolated prompts.</p>
                <span className="jump">See it below <span className="arr"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></span></span>
              </a>
              <a href="#market" className="tcard">
                <div className="tcard-top">
                  <div className="ic">
                    <svg className="licon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="num">02</div>
                </div>
                <h3>Real market</h3>
                <p>Benchmarked against the brands that actually surface in your market — from worldwide down to local.</p>
                <span className="jump">See it below <span className="arr"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></span></span>
              </a>
              <a href="#sources" className="tcard">
                <div className="tcard-top">
                  <div className="ic">
                    <svg className="licon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                    </svg>
                  </div>
                  <div className="num">03</div>
                </div>
                <h3>Source intelligence</h3>
                <p>Every answer traced back to the domains AI trusts — and the ones citing competitors instead of you.</p>
                <span className="jump">See it below <span className="arr"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></span></span>
              </a>
              <a href="#nora" className="tcard">
                <div className="tcard-top">
                  <div className="ic">
                    <svg className="licon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                    </svg>
                  </div>
                  <div className="num">04</div>
                </div>
                <h3>Nora acts on it</h3>
                <p>Your dedicated AI analyst turns every gap above into one clear, prioritised next step.</p>
                <span className="jump">See it below <span className="arr"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></span></span>
              </a>
            </div>
          </div>
        </section>

        {/* ======================== 01 · PRODUCT FOCUS ======================== */}
        <section id="focus">
          <div className="wrap">
            <div className="adv-head mid reveal">
              <div className="eyebrow">01 — Product focus</div>
              <h2>We score topics. <span className="hl">Not just prompts.</span></h2>
              <p className="lead">Dozens of questions, one theme. We map each to the topic it speaks to and score your coverage — the view that drives decisions.</p>
            </div>
            <div className="pf-wrap reveal">
              <svg viewBox="0 0 980 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Real buyer questions mapped to topic coverage" className="pf-svg">
                <text x="36" y="46" className="pf-collbl">REAL BUYER QUESTIONS</text>
                <text x="950" y="46" textAnchor="end" className="pf-collbl">PERCENTAGE COVERAGE</text>
                {/* Connector curves */}
                <path d="M 440 96 C 526 96 524 129 610 129" fill="none" stroke="#1e3893" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path d="M 440 174 C 526 174 524 129 610 129" fill="none" stroke="#1e3893" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path d="M 440 252 C 526 252 524 291 610 291" fill="none" stroke="#7c5cbf" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path d="M 440 330 C 526 330 524 291 610 291" fill="none" stroke="#7c5cbf" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path d="M 440 408 C 526 408 524 453 610 453" fill="none" stroke="#d98a2b" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path d="M 440 486 C 526 486 524 453 610 453" fill="none" stroke="#d98a2b" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Question boxes */}
                <rect x="30" y="70" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="80" width="5" height="32" rx="2.5" fill="#1e3893"/>
                <text x="54" y="101" className="pf-q">"What's the best payroll software to scale with?"</text>
                <rect x="30" y="148" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="158" width="5" height="32" rx="2.5" fill="#1e3893"/>
                <text x="54" y="179" className="pf-q">"Which HR platform handles multi-country payroll?"</text>
                <rect x="30" y="226" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="236" width="5" height="32" rx="2.5" fill="#7c5cbf"/>
                <text x="54" y="257" className="pf-q">"What's the best tool to sync payroll to accounting?"</text>
                <rect x="30" y="304" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="314" width="5" height="32" rx="2.5" fill="#7c5cbf"/>
                <text x="54" y="335" className="pf-q">"Which HRIS integrates best with Slack and Xero?"</text>
                <rect x="30" y="382" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="392" width="5" height="32" rx="2.5" fill="#d98a2b"/>
                <text x="54" y="413" className="pf-q">"What's the best-value HRIS for a 200-person team?"</text>
                <rect x="30" y="460" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="470" width="5" height="32" rx="2.5" fill="#d98a2b"/>
                <text x="54" y="491" className="pf-q">"Which payroll tool gives the best value for money?"</text>
                {/* Topic boxes */}
                <rect x="610" y="70" width="340" height="118" rx="13" fill="#eef1fb" stroke="#1e3893" strokeOpacity=".30"/>
                <rect x="610" y="84" width="5" height="90" rx="2.5" fill="#1e3893"/>
                <text x="636" y="118" className="pf-tname">Reliability</text>
                <text x="636" y="144" className="pf-tsub">from 18 prompts</text>
                <text x="926" y="124" textAnchor="end" className="pf-tscore">88%</text>
                <rect x="848" y="140" width="78" height="24" rx="12" fill="#e7f4ee"/>
                <text x="887" y="156" textAnchor="middle" className="pf-tlab" fill="#1f8a5b">Leading</text>
                <rect x="610" y="232" width="340" height="118" rx="13" fill="#f3eefb" stroke="#7c5cbf" strokeOpacity=".30"/>
                <rect x="610" y="246" width="5" height="90" rx="2.5" fill="#7c5cbf"/>
                <text x="636" y="280" className="pf-tname">Integrations</text>
                <text x="636" y="306" className="pf-tsub">from 14 prompts</text>
                <text x="926" y="286" textAnchor="end" className="pf-tscore">67%</text>
                <rect x="856" y="302" width="70" height="24" rx="12" fill="#fbf2e3"/>
                <text x="891" y="318" textAnchor="middle" className="pf-tlab" fill="#d98a2b">On par</text>
                <rect x="610" y="394" width="340" height="118" rx="13" fill="#fbf3e6" stroke="#d98a2b" strokeOpacity=".30"/>
                <rect x="610" y="408" width="5" height="90" rx="2.5" fill="#d98a2b"/>
                <text x="636" y="442" className="pf-tname">Pricing &amp; value</text>
                <text x="636" y="468" className="pf-tsub">from 16 prompts</text>
                <text x="926" y="448" textAnchor="end" className="pf-tscore">54%</text>
                <rect x="856" y="464" width="70" height="24" rx="12" fill="#fbeae8"/>
                <text x="891" y="480" textAnchor="middle" className="pf-tlab" fill="#d2453a">Behind</text>
              </svg>
              <div className="pf-foot">
                Each topic is a real buying decision — so your score stops being a ranking and becomes a <b>to-do list</b>.
              </div>
            </div>
          </div>
        </section>

        {/* ======================== 02 · REAL MARKET ======================== */}
        <section id="market" style={{ background: 'var(--surface-2)' }}>
          <div className="wrap">
            <div className="mkt">
              {/* Left: text */}
              <div className="adv-head reveal">
                <div className="eyebrow">02 — Real market</div>
                <h2>Your real market, <span className="hl">not the whole world.</span></h2>
                <p className="lead">Scope from worldwide down to your city. Zoom in and the global giants fall away — leaving the competitors you actually meet.</p>
                <div className="scope-ladder">
                  <span className="sl">Worldwide</span><span className="sep">›</span>
                  <span className="sl">Country</span><span className="sep">›</span>
                  <span className="sl">Region</span><span className="sep">›</span>
                  <span className="sl">Local</span>
                </div>
                <div className="mkt-hint">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                  </svg>
                  Each level has its own competitors — pick a scope and watch the names change.
                </div>
              </div>

              {/* Right: map card */}
              <div className="reveal">
                <div className="zoomctl">
                  <span className="zl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                    </svg>
                    Scope
                  </span>
                  <div className="scope-tog">
                    {['worldwide', 'country', 'region', 'local'].map((s) => (
                      <button
                        key={s}
                        className={scope === s ? 'on' : ''}
                        onClick={() => setScope(s)}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mkt-card">
                  <div className="mkt-bar">
                    <span className="d" /><span className="d" /><span className="d" />
                    <span className="loc">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {scopeData.loc}
                    </span>
                  </div>
                  <div className="mkt-map">
                    <MarketMapSvg scope={scope} />
                  </div>
                  <div className="mkt-rivals">
                    <div
                      className="mkt-verdict"
                      dangerouslySetInnerHTML={{ __html: scopeData.verdict }}
                    />
                    {sortedComps.map((r) => (
                      <div key={r.nm} className={`rival${r.me ? ' me' : ''}`}>
                        <span className="nm">{r.nm}</span>
                        <span className="track"><i style={{ width: `${r.v}%` }} /></span>
                        <span className="v">{r.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================== 03 · SOURCE INTELLIGENCE ======================== */}
        <section id="sources">
          <div className="wrap">
            <div className="adv-head mid reveal">
              <div className="eyebrow">03 — Source intelligence</div>
              <h2>The domains AI trusts — <span className="hl">and where you're missing.</span></h2>
              <p className="lead">We collect the domains AI cites on your category, then show where you're present, absent, or beaten.</p>
            </div>

            {/* 2-step primer */}
            <div className="src-primer reveal">
              <div className="src-step">
                <div className="si">
                  <svg className="licon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>
                  </svg>
                </div>
                <div className="t">AI cites its sources</div>
                <p className="s">To answer a buyer's question, AI pulls from real websites — review sites, media, forums — and cites them.</p>
                <div className="chips">
                  <span>g2.com</span><span>capterra.com</span><span>reddit.com</span>
                </div>
              </div>
              <div className="src-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </div>
              <div className="src-step lead-step">
                <div className="si">
                  <svg className="licon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                  </svg>
                </div>
                <div className="t">We collect &amp; analyse them</div>
                <p className="s">Poliris rolls every cited URL up to its domain and maps who each one cites — surfacing where you're present, absent, and your best openings.</p>
              </div>
            </div>

            {/* Domain table */}
            <div className="src-table reveal">
              <div className="src-head">
                <div>Source domain</div>
                <div>Authority</div>
                <div>Who it cites</div>
                <div>Your move</div>
              </div>
              {[
                { fav: 'G', bg: '#e8443b', domain: 'g2.com', da: 91, cite: 'comp', citeLabel: 'Cites competitors', opp: 'out', oppLabel: 'Outreach' },
                { fav: 'C', bg: '#f47b20', domain: 'capterra.com', da: 88, cite: 'both', citeLabel: 'You & competitors', opp: 'def', oppLabel: 'Defend' },
                { fav: 'V', bg: '#111', domain: 'theverge.com', da: 95, cite: 'comp', citeLabel: 'Cites competitors', opp: 'out', oppLabel: 'Outreach' },
                { fav: 'A', bg: '#5e74c4', domain: 'appvizer.fr', da: 71, cite: 'comp', citeLabel: 'Cites competitors', opp: 'part', oppLabel: 'Partnership' },
                { fav: 'R', bg: '#ff5722', domain: 'reddit.com', da: 92, cite: 'both', citeLabel: 'You & competitors', opp: 'def', oppLabel: 'Defend' },
                { fav: 'G', bg: '#1f8a5b', domain: 'getapp.com', da: 84, cite: 'you', citeLabel: 'Cites you', opp: 'has', oppLabel: 'Already citing you' },
              ].map((row) => (
                <div key={row.domain} className="src-row">
                  <div className="src-dom">
                    <span className="fav" style={{ background: row.bg }}>{row.fav}</span>
                    <span className="u">{row.domain}</span>
                  </div>
                  <div className="src-da">
                    <span className="n">{row.da}</span>
                    <span className="t"><i style={{ width: `${row.da}%` }} /></span>
                  </div>
                  <div><span className={`cite ${row.cite}`}>{row.citeLabel}</span></div>
                  <div>
                    <span className={`opp ${row.opp}`}>
                      {row.opp === 'out' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>}
                      {row.opp === 'def' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                      {row.opp === 'part' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                      {row.opp === 'has' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
                      {row.oppLabel}
                    </span>
                  </div>
                </div>
              ))}
              <div className="src-foot">
                <span><b>9</b> high-authority domains cite competitors, not you</span>
                <span><b>12</b> outreach targets, ranked by influence</span>
                <span><b>4</b> partnership leads in your category</span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================== 04 · NORA ======================== */}
        <section>
          <div className="wrap">
            <div className="dark reveal" id="nora">
              <div className="inner">
                <div className="nora-grid">
                  <div>
                    <div className="agent-pill">
                      <span className="sp">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/>
                        </svg>
                      </span>
                      Meet Nora · your AI visibility agent
                    </div>
                    <h2>Your analyst, on tap.</h2>
                    <p className="lead">Nora reads every topic, engine and source — then tells you what changed, why, and what to do, in plain language.</p>
                    <ul className="agent-pts">
                      <li>
                        <span className="ic">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>
                          </svg>
                        </span>
                        <span>
                          <span className="tt">Explains</span>
                          <span className="dd">What's lifting each topic, what's dragging it.</span>
                        </span>
                      </li>
                      <li>
                        <span className="ic">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M13 2 3 14h9l-1 8 10-12h-9z"/>
                          </svg>
                        </span>
                        <span>
                          <span className="tt">Alerts</span>
                          <span className="dd">Flags a slipping topic before it becomes a problem.</span>
                        </span>
                      </li>
                      <li>
                        <span className="ic">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                          </svg>
                        </span>
                        <span>
                          <span className="tt">Recommends</span>
                          <span className="dd">A concrete next step, not just a number.</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="shot">
                    <span className="tab">Screenshot</span>
                    <div className="chat">
                      <div className="chat-id">
                        <span className="av">N</span> Nora · Visibility analyst
                      </div>
                      <div className="bub user">Why is my Pricing topic so low in France?</div>
                      <div className="bub bot">
                        On French pricing prompts you sit at <b>#6</b>. PayFit and Lucca win because comparison sites publish their plans — and yours aren't listed.
                      </div>
                      <div className="bub user">What do I do?</div>
                    </div>
                    <div className="plan">
                      <div className="plan-h">
                        <span className="av" style={{ width: 20, height: 20, fontSize: 11 }}>N</span>
                        Nora's action plan
                      </div>
                      <div className="plan-item">
                        <span className="rk">1</span>
                        <span className="t">Publish pricing on your G2 &amp; Capterra profiles</span>
                        <span className="impact hi">High</span>
                      </div>
                      <div className="plan-item">
                        <span className="rk">2</span>
                        <span className="t">Get listed on 2 French comparison sites</span>
                        <span className="impact hi">High</span>
                      </div>
                      <div className="plan-item">
                        <span className="rk">3</span>
                        <span className="t">Add a French pricing FAQ page</span>
                        <span className="impact md">Medium</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================== STAKES ======================== */}
        <section style={{ background: 'var(--surface-2)' }}>
          <div className="wrap">
            <div className="sec-head mid reveal" style={{ marginBottom: 42 }}>
              <h2>Visibility is the <span className="hl">new traffic.</span></h2>
            </div>
            <div className="vstakes reveal">
              <div className="vstakes-grid">
                <div>
                  <div className="n">60%</div>
                  <div className="d">of B2B buyers now use AI in their research phase</div>
                </div>
                <div>
                  <div className="n">3 in 4</div>
                  <div className="d">brands have zero visibility into their AI mention data</div>
                </div>
                <div>
                  <div className="n">+3.4×</div>
                  <div className="d">average mention lift on Poliris within 90 days</div>
                </div>
                <div>
                  <div className="n">5×</div>
                  <div className="d">faster decisions when buyers see your brand in AI</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================== CTA BAND ======================== */}
        <section className="cta-band">
          <div className="wrap">
            <div className="inner reveal">
              <h2>See your AI visibility score — free.</h2>
              <p className="lead">Find out where you appear in AI answers today — by topic and by market — and exactly what's eating your share.</p>
              <div className="hero-cta">
                <a href="#" className="btn btn-primary btn-lg">
                  Get a free audit{' '}
                  <span className="btn-icon">
                    <svg className="licon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </span>
                </a>
                <a href="#" className="btn btn-ondark btn-lg">Talk to an expert</a>
              </div>
              <div className="note">No credit card · result in 60s · cancel anytime</div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
