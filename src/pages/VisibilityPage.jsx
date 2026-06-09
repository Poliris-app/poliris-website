import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobeMap from '../components/GlobeMap';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';
import VisibilityDashboard from '../components/VisibilityDashboard';

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
            <VisibilityDashboard />
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
              <svg viewBox="0 0 980 920" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Real buyer questions mapped to topic coverage" className="pf-svg">
                <text x="36" y="46" className="pf-collbl">REAL BUYER QUESTIONS</text>
                <text x="950" y="46" textAnchor="end" className="pf-collbl">PERCENTAGE COVERAGE</text>
                {/* Connector curves — Performance (4) */}
                <path className="pf-line pf-line--1"  d="M 440 96  C 526 96  524 213 610 213" fill="none" stroke="#1e3893" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--2"  d="M 440 174 C 526 174 524 213 610 213" fill="none" stroke="#1e3893" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--3"  d="M 440 252 C 526 252 524 213 610 213" fill="none" stroke="#1e3893" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--4"  d="M 440 330 C 526 330 524 213 610 213" fill="none" stroke="#1e3893" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Connector curves — Quality (2) */}
                <path className="pf-line pf-line--5"  d="M 440 408 C 526 408 524 447 610 447" fill="none" stroke="#7c5cbf" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--6"  d="M 440 486 C 526 486 524 447 610 447" fill="none" stroke="#7c5cbf" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Connector curves — Design (2) */}
                <path className="pf-line pf-line--7"  d="M 440 564 C 526 564 524 603 610 603" fill="none" stroke="#d98a2b" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--8"  d="M 440 642 C 526 642 524 603 610 603" fill="none" stroke="#d98a2b" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Connector curves — Durability (3) */}
                <path className="pf-line pf-line--9"  d="M 440 720 C 526 720 524 798 610 798" fill="none" stroke="#0d7963" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--10" d="M 440 798 C 526 798 524 798 610 798" fill="none" stroke="#0d7963" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--11" d="M 440 876 C 526 876 524 798 610 798" fill="none" stroke="#0d7963" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Question boxes — Performance */}
                <rect x="30" y="70"  width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="80"  width="5" height="32" rx="2.5" fill="#1e3893"/>
                <text x="54" y="101" className="pf-q">"Which lightweight training shoes maximise stability?"</text>
                <rect x="30" y="148" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="158" width="5" height="32" rx="2.5" fill="#1e3893"/>
                <text x="54" y="179" className="pf-q">"Best footwear for intense cross-training workouts?"</text>
                <rect x="30" y="226" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="236" width="5" height="32" rx="2.5" fill="#1e3893"/>
                <text x="54" y="257" className="pf-q">"Professional advice on cross-training shoe selection?"</text>
                <rect x="30" y="304" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="314" width="5" height="32" rx="2.5" fill="#1e3893"/>
                <text x="54" y="335" className="pf-q">"Which athletic shoes improve gym training performance?"</text>
                {/* Question boxes — Quality */}
                <rect x="30" y="382" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="392" width="5" height="32" rx="2.5" fill="#7c5cbf"/>
                <text x="54" y="413" className="pf-q">"Where to find affordable, reliable everyday sneakers?"</text>
                <rect x="30" y="460" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="470" width="5" height="32" rx="2.5" fill="#7c5cbf"/>
                <text x="54" y="491" className="pf-q">"Most comfortable everyday shoes with arch support?"</text>
                {/* Question boxes — Design */}
                <rect x="30" y="538" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="548" width="5" height="32" rx="2.5" fill="#d98a2b"/>
                <text x="54" y="569" className="pf-q">"Top footwear collections for a minimalist aesthetic?"</text>
                <rect x="30" y="616" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="626" width="5" height="32" rx="2.5" fill="#d98a2b"/>
                <text x="54" y="647" className="pf-q">"Which trendy sneakers lead casual street style?"</text>
                {/* Question boxes — Durability */}
                <rect x="30" y="694" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="704" width="5" height="32" rx="2.5" fill="#0d7963"/>
                <text x="54" y="725" className="pf-q">"Best durable footwear for long-distance walking?"</text>
                <rect x="30" y="772" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="782" width="5" height="32" rx="2.5" fill="#0d7963"/>
                <text x="54" y="803" className="pf-q">"Top-rated waterproof hiking boots for mountain terrain?"</text>
                <rect x="30" y="850" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="860" width="5" height="32" rx="2.5" fill="#0d7963"/>
                <text x="54" y="881" className="pf-q">"High-performance running shoes for trail conditions?"</text>
                {/* Topic boxes */}
                <rect x="610" y="154" width="340" height="118" rx="13" fill="#eef1fb" stroke="#1e3893" strokeOpacity=".30"/>
                <rect x="610" y="168" width="5" height="90" rx="2.5" fill="#1e3893"/>
                <text x="636" y="202" className="pf-tname">Performance</text>
                <text x="636" y="228" className="pf-tsub">from 22 prompts</text>
                <text x="926" y="208" textAnchor="end" className="pf-tscore">75%</text>
                <rect x="856" y="224" width="70" height="24" rx="12" fill="#fbf2e3"/>
                <text x="891" y="240" textAnchor="middle" className="pf-tlab" fill="#d98a2b">On par</text>
                <rect x="610" y="388" width="340" height="118" rx="13" fill="#f3eefb" stroke="#7c5cbf" strokeOpacity=".30"/>
                <rect x="610" y="402" width="5" height="90" rx="2.5" fill="#7c5cbf"/>
                <text x="636" y="436" className="pf-tname">Quality</text>
                <text x="636" y="462" className="pf-tsub">from 18 prompts</text>
                <text x="926" y="442" textAnchor="end" className="pf-tscore">67%</text>
                <rect x="856" y="458" width="70" height="24" rx="12" fill="#fbf2e3"/>
                <text x="891" y="474" textAnchor="middle" className="pf-tlab" fill="#d98a2b">On par</text>
                <rect x="610" y="544" width="340" height="118" rx="13" fill="#fbf3e6" stroke="#d98a2b" strokeOpacity=".30"/>
                <rect x="610" y="558" width="5" height="90" rx="2.5" fill="#d98a2b"/>
                <text x="636" y="592" className="pf-tname">Design</text>
                <text x="636" y="618" className="pf-tsub">from 20 prompts</text>
                <text x="926" y="598" textAnchor="end" className="pf-tscore">42%</text>
                <rect x="856" y="614" width="70" height="24" rx="12" fill="#fbeae8"/>
                <text x="891" y="630" textAnchor="middle" className="pf-tlab" fill="#d2453a">Behind</text>
                <rect x="610" y="739" width="340" height="118" rx="13" fill="#e6f7f3" stroke="#0d7963" strokeOpacity=".30"/>
                <rect x="610" y="753" width="5" height="90" rx="2.5" fill="#0d7963"/>
                <text x="636" y="787" className="pf-tname">Durability</text>
                <text x="636" y="813" className="pf-tsub">from 15 prompts</text>
                <text x="926" y="793" textAnchor="end" className="pf-tscore">34%</text>
                <rect x="856" y="809" width="70" height="24" rx="12" fill="#fbeae8"/>
                <text x="891" y="825" textAnchor="middle" className="pf-tlab" fill="#d2453a">Behind</text>
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
                    <GlobeMap scope={scope} />
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

            {/* Stats row */}
            <div className="src-stats reveal">
              {[
                { n: '149', label: 'Sources tracked',      sub: 'Across 6 AI engines'   },
                { n: '87',  label: 'Cite competitors only', sub: 'Visibility gaps'        },
                { n: '14',  label: 'Cite your brand',       sub: 'Expand influence'       },
                { n: '48',  label: 'Cite both',             sub: 'Strengthen position'    },
              ].map(s => (
                <div key={s.n} className="src-stat">
                  <div className="src-stat-n">{s.n}</div>
                  <div className="src-stat-label">{s.label}</div>
                  <div className="src-stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Source intelligence report */}
            <div className="src-intel reveal">
              <div className="src-intel-hdr">
                <div>
                  <div className="src-intel-title">Source intelligence report</div>
                  <div className="src-intel-meta">Running Shoes · nike.com · Updated 2 hours ago</div>
                </div>
                <span className="src-intel-engines">6 AI engines</span>
              </div>

              <div className="sit-head">
                <div className="sit-c">Source</div>
                <div className="sit-c">Authority</div>
                <div className="sit-c">Citations</div>
                <div className="sit-c">Brand Attribution</div>
                <div className="sit-c">Your Visibility</div>
                <div className="sit-c">Opportunity</div>
              </div>

              {[
                { fav: 'R', bg: '#cc2200', domain: 'runrepeat.com',      type: 'Review',               da: 72, cite: 14, attr: 'both', vis: 38,   opp: 'strengthen', oppLabel: 'Strengthen'    },
                { fav: 'T', bg: '#e8321c', domain: 'tomsguide.com',      type: 'Media',                da: 91, cite: 7,  attr: 'both', vis: 45,   opp: 'expand',     oppLabel: 'Expand reach'  },
                { fav: 'O', bg: '#5b8c5a', domain: 'outdoorgearlab.com', type: 'Review',               da: 68, cite: 7,  attr: 'comp', vis: 0,    opp: 'featured',   oppLabel: 'Get featured'  },
                { fav: 'W', bg: '#1c1c1c', domain: 'whowhatwear.com',    type: 'Media',                da: 82, cite: 6,  attr: 'both', vis: 41,   opp: 'strengthen', oppLabel: 'Strengthen'    },
                { fav: 'R', bg: '#ff4500', domain: 'reddit.com',         type: 'Social',               da: 95, cite: 6,  attr: 'both', vis: 31,   opp: 'strengthen', oppLabel: 'Strengthen'    },
                { fav: 'R', bg: '#111111', domain: 'rei.com',            type: 'Retail',               da: 84, cite: 5,  attr: 'you',  vis: 74,   opp: 'expand',     oppLabel: 'Expand reach'  },
                { fav: 'A', bg: '#111111', domain: 'adidas.com',         type: 'Retail',               da: 92, cite: 4,  attr: 'comp', vis: 0,    opp: 'pitch',      oppLabel: 'Pitch content' },
                { fav: 'C', bg: '#cc0000', domain: 'cnn.com',            type: 'News',                 da: 95, cite: 4,  attr: 'both', vis: 35,   opp: 'strengthen', oppLabel: 'Strengthen'    },
                { fav: 'R', bg: '#e64c00', domain: 'runnersworld.com',   type: 'Media',                da: 84, cite: 4,  attr: 'both', vis: 48,   opp: 'expand',     oppLabel: 'Expand reach'  },
                { fav: 'N', bg: '#e8243c', domain: 'newbalance.com',     type: 'Retail',               da: 88, cite: 4,  attr: 'comp', vis: 0,    opp: 'pitch',      oppLabel: 'Pitch content' },
              ].map(row => {
                const attrLabels = { comp: 'Competitors only', both: 'Both brands', you: 'Your brand', none: 'Not yet cited' };
                const visColor = row.attr === 'comp' ? '#ef4444' : row.attr === 'you' ? '#16a34a' : '#111827';
                return (
                  <div key={row.domain} className="sit-row">
                    <div className="sit-c sit-c--source">
                      <span className="fav" style={{ background: row.bg }}>{row.fav}</span>
                      <div>
                        <div className="sit-domain">{row.domain}</div>
                        <div className="sit-type">{row.type}</div>
                      </div>
                    </div>
                    <div className="sit-c sit-c--da">
                      <span className="sit-da-n">{row.da}</span>
                      <span className="sit-bar-track"><i style={{ width: `${row.da}%`, background: '#2563eb' }} /></span>
                    </div>
                    <div className="sit-c sit-c--cite">
                      <div className="sit-cite-n">{row.cite}</div>
                      <div className="sit-cite-sub">this month</div>
                    </div>
                    <div className="sit-c">
                      <span className={`sit-attr sit-attr--${row.attr}`}>{attrLabels[row.attr]}</span>
                    </div>
                    <div className="sit-c sit-c--vis">
                      {row.vis !== null ? (
                        <>
                          <span className="sit-vis-n" style={{ color: visColor }}>{row.vis}%</span>
                          <span className="sit-bar-track"><i style={{ width: `${Math.max(row.vis, 4)}%`, background: visColor }} /></span>
                        </>
                      ) : (
                        <span className="sit-vis-dash">—</span>
                      )}
                    </div>
                    <div className="sit-c">
                      <span className={`sit-opp sit-opp--${row.opp}`}>
                        {row.opp === 'featured'   && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>}
                        {row.opp === 'strengthen' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>}
                        {row.opp === 'expand'     && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>}
                        {row.opp === 'pitch'      && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>}
                        {row.oppLabel}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="src-intel-legend">
                <span><span className="sil-chip sil-chip--you">Your brand</span> Source already cites you</span>
                <span><span className="sil-chip sil-chip--comp">Competitors only</span> Visibility gap, an opportunity to enter</span>
                <span><span className="sil-chip sil-chip--both">Both brands</span> Shared citation, opportunity to strengthen your position</span>
              </div>
              <div className="src-intel-count">Showing 10 of 149 sources</div>
            </div>
          </div>
        </section>

        {/* ======================== 04 · NORA ======================== */}
        <section>
          <div className="wrap">
            <div className="dark reveal" id="nora">
              <div className="inner">
                <div className="nora-grid">
                  {/* LEFT */}
                  <div>
                    <div className="agent-pill">
                      <span className="sp">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/>
                        </svg>
                      </span>
                      Meet Nora — your AI visibility expert
                    </div>
                    <div className="eyebrow nora-eyebrow">04 — NORA ACTS ON IT</div>
                    <h2>Not just insights.<br />A clear path forward.</h2>
                    <p className="lead">Nora reads every data point from your visibility report and turns it into a ranked action plan — then helps you implement it, step by step.</p>
                    <ul className="agent-pts">
                      <li>
                        <span className="ic">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                          </svg>
                        </span>
                        <span>
                          <span className="tt">Understands your situation</span>
                          <span className="dd">Nora reads your full visibility report, sentiment data and source analysis — then explains what it means in plain language.</span>
                        </span>
                      </li>
                      <li>
                        <span className="ic">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                            <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                          </svg>
                        </span>
                        <span>
                          <span className="tt">Prioritises what matters most</span>
                          <span className="dd">Every recommendation is ranked by expected impact — so you always know what to fix first.</span>
                        </span>
                      </li>
                      <li>
                        <span className="ic">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </span>
                        <span>
                          <span className="tt">Implements the fix for you</span>
                          <span className="dd">From structured data to FAQ content — Nora prepares the changes and Poliris publishes them directly to your site.</span>
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* RIGHT */}
                  <div className="shot">
                    <span className="tab tab--live">LIVE SESSION</span>
                    <div className="chat chat--v2">

                      {/* Chat header */}
                      <div className="chat-hdr-v2">
                        <div className="chat-hdr-left">
                          <span className="av av--nora-v2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>
                            </svg>
                          </span>
                          <div className="chat-hdr-info">
                            <span className="chat-hdr-name">Nora</span>
                            <span className="chat-hdr-sub"><span className="chat-online-dot" />Online · Sprout · Pricing focus</span>
                          </div>
                        </div>
                        <div className="chat-hdr-right">
                          <span className="chat-hdr-date">Visibility report · 2 Jun 2026</span>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="chat-msgs">
                        <div className="chat-msg chat-msg--user">
                          <div className="bub user">Why is our Pricing score only 54% when Reliability is at 88%?</div>
                          <span className="av av--j av--sm">J</span>
                        </div>
                        <div className="chat-msg chat-msg--bot">
                          <span className="av av--nora-v2 av--sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
                              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>
                            </svg>
                          </span>
                          <div className="bub bot">Good question. <b>Two root causes:</b> First, your pricing page is blocked by robots.txt — AI engines can't read it. Second, Competitor A has two detailed pricing comparison articles on forbes.com and techradar.com that dominate results for value-related queries. You appear in neither.</div>
                        </div>
                        <div className="chat-msg chat-msg--user">
                          <div className="bub user">What should we fix first?</div>
                          <span className="av av--j av--sm">J</span>
                        </div>
                        <div className="chat-msg chat-msg--bot">
                          <span className="av av--nora-v2 av--sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
                              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>
                            </svg>
                          </span>
                          <div className="bub bot">I've built your action plan. Start here — these three changes move the needle fastest:</div>
                        </div>
                      </div>

                      {/* Nested action plan */}
                      <div className="plan plan--v2">
                        <div className="plan-h plan-h--v2">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                          </svg>
                          NORA'S ACTION PLAN — PRICING &amp; VALUE
                        </div>
                        <div className="plan-items">
                          <div className="plan-item">
                            <span className="rk">1</span>
                            <span className="t">Fix robots.txt — allow AI crawlers to index /pricing</span>
                            <span className="impact hi">High impact</span>
                          </div>
                          <div className="plan-item">
                            <span className="rk">2</span>
                            <span className="t">Add FAQ schema to pricing page with 6 value-question answers</span>
                            <span className="impact hi">High impact</span>
                          </div>
                          <div className="plan-item">
                            <span className="rk">3</span>
                            <span className="t">Pitch a pricing comparison article to techradar.com</span>
                            <span className="impact md">Medium impact</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="chat-btns">
                        <button className="chat-btn chat-btn--primary">✓ Implement fix #1</button>
                        <button className="chat-btn">Approve FAQ schema</button>
                        <button className="chat-btn">Ask follow-up</button>
                        <button className="chat-btn">Continue analysis</button>
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

        <CtaBand
          heading="See your AI visibility score — free."
          lead="Find out where you appear in AI answers today — by topic and by market — and exactly what's eating your share."
          primaryCta="Get a free audit"
          secondaryCta="Talk to an expert"
          note="No credit card · result in 60s · cancel anytime"
        />

      </main>
      <Footer />
    </div>
  );
}
