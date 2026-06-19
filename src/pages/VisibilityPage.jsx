import { useState, useEffect, useRef, useCallback } from 'react';
import '../visibility.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import GlobeMap from '../components/GlobeMap';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';
import VisibilityDashboard from '../components/VisibilityDashboard';
import { useLang } from '../contexts/LangContext';

const HL = ({ children }) => <span className="hl">{children}</span>;

/* ---- Scope data for the Real Market section -------------- */
const SCOPE_DATA = {
  worldwide: {
    loc: 'World · global',
    verdict: "Against the global giants you're invisible   and that's fine. They're not who your buyers compare you to.",
    comps: [
      { nm: 'Adidas', v: 96 },
      { nm: 'New Balance', v: 88 },
      { nm: 'Puma', v: 82 },
      { nm: 'ASICS', v: 75 },
      { nm: 'Under Armour', v: 68 },
      { nm: 'Nike (you)', v: 9, me: true },
    ],
  },
  country: {
    loc: 'France · national',
    verdict: 'At national level you rank <b>#6</b>   behind names you rarely meet in a real deal.',
    comps: [
      { nm: 'Adidas', v: 91 },
      { nm: 'New Balance', v: 78 },
      { nm: 'Salomon', v: 70 },
      { nm: 'Hoka', v: 62 },
      { nm: 'On Running', v: 55 },
      { nm: 'Nike (you)', v: 44, me: true },
    ],
  },
  region: {
    loc: 'Auvergne-Rhône-Alpes',
    verdict: 'Across your region you climb to <b>#3</b>   the global names fade out.',
    comps: [
      { nm: 'Salomon', v: 79 },
      { nm: 'Hoka', v: 71 },
      { nm: 'Nike (you)', v: 66, me: true },
      { nm: 'On Running', v: 54 },
    ],
  },
  local: {
    loc: 'Lyon · 69001–69009',
    verdict: "In your real market you're <b>#2</b>   a fight you can actually win.",
    comps: [
      { nm: 'Salomon', v: 72 },
      { nm: 'Nike (you)', v: 68, me: true },
      { nm: 'On Running', v: 51 },
    ],
  },
};

const SCOPES = ['worldwide', 'country', 'region', 'local'];

export default function VisibilityPage() {
  const { t } = useLang();
  const [scope, setScope]   = useState('worldwide');
  const [fading, setFading] = useState(false);
  const timerRef  = useRef(null);
  const fadeTimer = useRef(null);

  /* Fade out → swap scope → fade in */
  const changeScope = useCallback((nextOrFn) => {
    clearTimeout(fadeTimer.current);
    setFading(true);
    fadeTimer.current = setTimeout(() => {
      setScope(nextOrFn);
      setFading(false);
    }, 200);
  }, []);

  /* Auto-cycle scope: Worldwide → Country → Region → Local → … */
  const startCycle = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      changeScope(prev => SCOPES[(SCOPES.indexOf(prev) + 1) % SCOPES.length]);
    }, 3000);
  }, [changeScope]);

  useEffect(() => {
    startCycle();
    return () => { clearInterval(timerRef.current); clearTimeout(fadeTimer.current); };
  }, [startCycle]);

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
      <Seo page="visibility" />
      <Navbar />
      <main>

        {/* ======================== HERO ======================== */}
        <Hero
          eyebrow={t('visibility.hero.eyebrow')}
          title={<>{t('visibility.hero.titlePre')}<br />inside <HL>{t('visibility.hero.titleHl')}</HL></>}
          lead={t('visibility.hero.lead')}
          primaryCta={t('visibility.hero.primaryCta')}
          secondaryCta={t('visibility.hero.secondaryCta')}
          note={t('visibility.hero.note')}
          showDashboard={false}
        />

        {/* ======================== DASHBOARD ======================== */}
        <div className="dash-wrap">
          <div className="wrap reveal">
            <div className="dash-cap"><span className="eyebrow">{t('visibility.insideDash')}</span></div>
            <VisibilityDashboard />
          </div>
        </div>

        {/* ======================== TOUR ======================== */}
        <section style={{ background: 'var(--surface-2)', paddingTop: 84, paddingBottom: 84 }}>
          <div className="wrap">
            <div className="sec-head mid reveal">
              {(() => { const wi = t('visibility.whatsInside'); return (<>
                <div className="eyebrow">{wi.eyebrow}</div>
                <h2>{wi.h2Pre} <span className="hl">{wi.h2Hl}</span></h2>
                <p className="lead">{wi.lead}</p>
              </>); })()}
            </div>
            <div className="tour reveal">
{t('visibility.tourCards').map((card, i) => (
              <a key={i} href={['#focus','#market','#sources','#nora'][i]} className="tcard">
                <div className="tcard-top">
                  <div className="ic">
                    <svg className="licon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {i === 0 && <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>}
                      {i === 1 && <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>}
                      {i === 2 && <><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></>}
                      {i === 3 && <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>}
                    </svg>
                  </div>
                  <div className="num">0{i + 1}</div>
                </div>
                <h3>{card.h3}</h3>
                <p>{card.p}</p>
                <span className="jump">{t('visibility.seeBelow')} <span className="arr"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></span></span>
              </a>
            ))}
            </div>
          </div>
        </section>

        {/* ======================== 01 · PRODUCT FOCUS ======================== */}
        <section id="focus">
          <div className="wrap">
            <div className="adv-head mid reveal">
              {(() => { const pf = t('visibility.productFocus'); return (<>
                <div className="eyebrow">{pf.eyebrow}</div>
                <h2>{pf.h2Pre} <span className="hl">{pf.h2Hl}</span></h2>
                <p className="lead">{pf.lead}</p>
              </>); })()}
            </div>
            <div className="pf-wrap reveal">
              <svg viewBox="0 0 980 920" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Real buyer questions mapped to topic coverage" className="pf-svg">
                <defs>
                  <linearGradient id="bar-pd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="50%" stopColor="#1e3893"/>
                    <stop offset="50%" stopColor="#0d7963"/>
                  </linearGradient>
                  <linearGradient id="bar-db" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="50%" stopColor="#d98a2b"/>
                    <stop offset="50%" stopColor="#7c5cbf"/>
                  </linearGradient>
                </defs>
                <text x="36" y="46" className="pf-collbl">REAL BUYER QUESTIONS</text>
                <text x="950" y="46" textAnchor="end" className="pf-collbl">PERCENTAGE COVERAGE</text>
                {/* Connector curves   Performance (Slots 0–1) */}
                <path className="pf-line pf-line--1"  d="M 440 96  C 526 96  524 129 610 129" fill="none" stroke="#1e3893" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--2"  d="M 440 174 C 526 174 524 129 610 129" fill="none" stroke="#1e3893" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Connector curves   Performance+Durability (Slots 2–3, each connects to both) */}
                <path className="pf-line pf-line--3"  d="M 440 252 C 526 252 524 129 610 129" fill="none" stroke="#1e3893" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--4"  d="M 440 252 C 526 252 524 408 610 408" fill="none" stroke="#0d7963" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--5"  d="M 440 330 C 526 330 524 129 610 129" fill="none" stroke="#1e3893" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--6"  d="M 440 330 C 526 330 524 408 610 408" fill="none" stroke="#0d7963" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Connector curves   Durability (Slot 4) */}
                <path className="pf-line pf-line--7"  d="M 440 408 C 526 408 524 408 610 408" fill="none" stroke="#0d7963" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Connector curves   Design (Slots 5–8) */}
                <path className="pf-line pf-line--8"  d="M 440 486 C 526 486 524 603 610 603" fill="none" stroke="#d98a2b" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--9"  d="M 440 564 C 526 564 524 603 610 603" fill="none" stroke="#d98a2b" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--10" d="M 440 642 C 526 642 524 603 610 603" fill="none" stroke="#d98a2b" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--11" d="M 440 720 C 526 720 524 603 610 603" fill="none" stroke="#d98a2b" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Connector curves   Design+Brand awareness (Slot 9, connects to both) */}
                <path className="pf-line pf-line--12" d="M 440 798 C 526 798 524 603 610 603" fill="none" stroke="#d98a2b" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                <path className="pf-line pf-line--13" d="M 440 798 C 526 798 524 798 610 798" fill="none" stroke="#7c5cbf" strokeWidth="2.4" strokeOpacity=".8" strokeLinecap="round"/>
                {/* Question boxes   Slot 0: Performance */}
                <rect x="30" y="70"  width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="80"  width="5" height="32" rx="2.5" fill="#1e3893"/>
                <text x="54" y="101" className="pf-q">"Which lightweight gym shoes maximise stability?"</text>
                {/* Slot 1: Performance */}
                <rect x="30" y="148" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="158" width="5" height="32" rx="2.5" fill="#1e3893"/>
                <text x="54" y="179" className="pf-q">"Professional advice on cross-training shoe selection?"</text>
                {/* Slot 2: Performance + Durability */}
                <rect x="30" y="226" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="236" width="5" height="32" rx="2.5" fill="url(#bar-pd)"/>
                <text x="54" y="257" className="pf-q">"Top-rated waterproof hiking boots for mountain terrain?"</text>
                {/* Slot 3: Performance + Durability */}
                <rect x="30" y="304" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="314" width="5" height="32" rx="2.5" fill="url(#bar-pd)"/>
                <text x="54" y="335" className="pf-q">"High-performance running shoes for trail conditions?"</text>
                {/* Slot 4: Durability */}
                <rect x="30" y="382" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="392" width="5" height="32" rx="2.5" fill="#0d7963"/>
                <text x="54" y="413" className="pf-q">"Best durable footwear for long-distance walking?"</text>
                {/* Slot 5: Design */}
                <rect x="30" y="460" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="470" width="5" height="32" rx="2.5" fill="#d98a2b"/>
                <text x="54" y="491" className="pf-q">"Where to find affordable, reliable everyday sneakers?"</text>
                {/* Slot 6: Design */}
                <rect x="30" y="538" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="548" width="5" height="32" rx="2.5" fill="#d98a2b"/>
                <text x="54" y="569" className="pf-q">"Top footwear collections for a minimalist aesthetic?"</text>
                {/* Slot 7: Design */}
                <rect x="30" y="616" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="626" width="5" height="32" rx="2.5" fill="#d98a2b"/>
                <text x="54" y="647" className="pf-q">"Best value-for-money sneakers for daily commuting?"</text>
                {/* Slot 8: Design */}
                <rect x="30" y="694" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="704" width="5" height="32" rx="2.5" fill="#d98a2b"/>
                <text x="54" y="725" className="pf-q">"Most comfortable everyday shoes with arch support?"</text>
                {/* Slot 9: Design + Brand awareness */}
                <rect x="30" y="772" width="410" height="52" rx="10" fill="#ffffff" stroke="#e6e9f2"/>
                <rect x="30" y="782" width="5" height="32" rx="2.5" fill="url(#bar-db)"/>
                <text x="54" y="803" className="pf-q">"Which trendy sneakers lead casual street style?"</text>
                {/* Topic boxes   Performance */}
                <rect x="610" y="70"  width="340" height="118" rx="13" fill="#eef1fb" stroke="#1e3893" strokeOpacity=".30"/>
                <rect x="610" y="84"  width="5" height="90" rx="2.5" fill="#1e3893"/>
                <text x="636" y="118" className="pf-tname">Performance</text>
                <text x="636" y="144" className="pf-tsub">from 22 prompts</text>
                <text x="926" y="124" textAnchor="end" className="pf-tscore">67%</text>
                <rect x="856" y="140" width="70" height="24" rx="12" fill="#fbf2e3"/>
                <text x="891" y="156" textAnchor="middle" className="pf-tlab" fill="#d98a2b">On par</text>
                {/* Durability */}
                <rect x="610" y="349" width="340" height="118" rx="13" fill="#e6f7f3" stroke="#0d7963" strokeOpacity=".30"/>
                <rect x="610" y="363" width="5" height="90" rx="2.5" fill="#0d7963"/>
                <text x="636" y="397" className="pf-tname">Durability</text>
                <text x="636" y="423" className="pf-tsub">from 15 prompts</text>
                <text x="926" y="403" textAnchor="end" className="pf-tscore">13%</text>
                <rect x="856" y="419" width="70" height="24" rx="12" fill="#fbeae8"/>
                <text x="891" y="435" textAnchor="middle" className="pf-tlab" fill="#d2453a">Behind</text>
                {/* Design */}
                <rect x="610" y="544" width="340" height="118" rx="13" fill="#fbf3e6" stroke="#d98a2b" strokeOpacity=".30"/>
                <rect x="610" y="558" width="5" height="90" rx="2.5" fill="#d98a2b"/>
                <text x="636" y="592" className="pf-tname">Design</text>
                <text x="636" y="618" className="pf-tsub">from 20 prompts</text>
                <text x="926" y="598" textAnchor="end" className="pf-tscore">42%</text>
                <rect x="856" y="614" width="70" height="24" rx="12" fill="#fbeae8"/>
                <text x="891" y="630" textAnchor="middle" className="pf-tlab" fill="#d2453a">Behind</text>
                {/* Brand awareness */}
                <rect x="610" y="739" width="340" height="118" rx="13" fill="#f3eefb" stroke="#7c5cbf" strokeOpacity=".30"/>
                <rect x="610" y="753" width="5" height="90" rx="2.5" fill="#7c5cbf"/>
                <text x="636" y="787" className="pf-tname">Brand awareness</text>
                <text x="636" y="813" className="pf-tsub">from 18 prompts</text>
                <text x="926" y="793" textAnchor="end" className="pf-tscore">75%</text>
                <rect x="856" y="809" width="70" height="24" rx="12" fill="#fbf2e3"/>
                <text x="891" y="825" textAnchor="middle" className="pf-tlab" fill="#d98a2b">On par</text>
              </svg>
              <div className="pf-foot" dangerouslySetInnerHTML={{ __html: t('visibility.productFocus.foot') }} />
            </div>
          </div>
        </section>

        {/* ======================== 02 · REAL MARKET ======================== */}
        <section id="market" style={{ background: 'var(--surface-2)' }}>
          <div className="wrap">
            <div className="mkt">
              {/* Left: text */}
              <div className="adv-head reveal">
                {(() => { const rm = t('visibility.realMarket'); return (<>
                  <div className="eyebrow">{rm.eyebrow}</div>
                  <h2>{rm.h2Pre} <span className="hl">{rm.h2Post}</span></h2>
                  <p className="lead">{rm.lead}</p>
                </>); })()}
                <div className="scope-ladder">
                  {t('visibility.realMarket.ladder').map((l, i, arr) => (
                    <span key={i}><span className="sl">{l}</span>{i < arr.length - 1 && <span className="sep">›</span>}</span>
                  ))}
                </div>
                <div className="mkt-hint">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                  </svg>
                  {t('visibility.realMarket.hint')}
                </div>
              </div>

              {/* Right: map card */}
              <div className="reveal">
                <div className="zoomctl">
                  <span className="zl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                    </svg>
                    {t('visibility.realMarket.scopeLabel')}
                  </span>
                  <div className="scope-tog">
                    {SCOPES.map((s) => (
                      <button
                        key={s}
                        className={scope === s ? 'on' : ''}
                        onClick={() => { changeScope(s); startCycle(); }}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mkt-card">
                  <div className="mkt-bar">
                    <span className="d" /><span className="d" /><span className="d" />
                    <span className={`loc${fading ? ' fading' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {scopeData.loc}
                    </span>
                  </div>
                  <div className="mkt-map">
                    <GlobeMap scope={scope} />
                  </div>
                  <div className={`mkt-rivals${fading ? ' fading' : ''}`}>
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
              {(() => { const si = t('visibility.sourceIntel'); return (<>
                <div className="eyebrow">{si.eyebrow}</div>
                <h2>{si.h2Pre} <span className="hl">{si.h2Hl}</span></h2>
                <p className="lead">{si.lead}</p>
              </>); })()}
            </div>

            {/* 6-step pipeline */}
            <div className="src-pipeline reveal">
              {t('visibility.sourceIntel.pipeline').map((step, idx, arr) => (
                <div key={idx} className={`src-pipeline-item${idx < arr.length - 1 ? ' src-pipeline-item--sep' : ''}`}>
                  <div className="src-pipeline-num">{idx + 1}</div>
                  <div className="src-pipeline-text">
                    <span className="src-pipeline-title">{step.title}</span>
                    <span className="src-pipeline-sub">{step.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="src-stats reveal">
              {t('visibility.sourceIntel.stats').map(s => (
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
                  <div className="src-intel-title">{t('visibility.sourceIntel.title')}</div>
                  <div className="src-intel-meta">Running Shoes · nike.com · Updated 2 hours ago</div>
                </div>
                <span className="src-intel-engines">{t('visibility.sourceIntel.aiEngines')}</span>
              </div>

              <div className="sit-head">
                {(() => { const h = t('visibility.sourceIntel.tableHeaders'); return (<>
                  <div className="sit-c">{h.source}</div>
                  <div className="sit-c">{h.authority}</div>
                  <div className="sit-c">{h.citations}</div>
                  <div className="sit-c">{h.brandAttr}</div>
                  <div className="sit-c">{h.visibility}</div>
                  <div className="sit-c">{h.opportunity}</div>
                </>); })()}
              </div>

              {[
                { fav: 'R', bg: '#cc2200', domain: 'runrepeat.com',      typeKey: 'review', da: 72, cite: 14, attr: 'both', vis: 38, opp: 'strengthen' },
                { fav: 'T', bg: '#e8321c', domain: 'tomsguide.com',      typeKey: 'media',  da: 91, cite: 7,  attr: 'both', vis: 45, opp: 'expand'     },
                { fav: 'O', bg: '#5b8c5a', domain: 'outdoorgearlab.com', typeKey: 'review', da: 68, cite: 7,  attr: 'comp', vis: 0,  opp: 'featured'   },
                { fav: 'W', bg: '#1c1c1c', domain: 'whowhatwear.com',    typeKey: 'media',  da: 82, cite: 6,  attr: 'both', vis: 41, opp: 'strengthen' },
                { fav: 'R', bg: '#ff4500', domain: 'reddit.com',         typeKey: 'social', da: 95, cite: 6,  attr: 'both', vis: 31, opp: 'strengthen' },
                { fav: 'R', bg: '#111111', domain: 'rei.com',            typeKey: 'retail', da: 84, cite: 5,  attr: 'you',  vis: 74, opp: 'expand'     },
                { fav: 'A', bg: '#111111', domain: 'adidas.com',         typeKey: 'retail', da: 92, cite: 4,  attr: 'comp', vis: 0,  opp: 'pitch'      },
                { fav: 'C', bg: '#cc0000', domain: 'cnn.com',            typeKey: 'news',   da: 95, cite: 4,  attr: 'both', vis: 35, opp: 'strengthen' },
                { fav: 'R', bg: '#e64c00', domain: 'runnersworld.com',   typeKey: 'media',  da: 84, cite: 4,  attr: 'both', vis: 48, opp: 'expand'     },
                { fav: 'N', bg: '#e8243c', domain: 'newbalance.com',     typeKey: 'retail', da: 88, cite: 4,  attr: 'comp', vis: 0,  opp: 'pitch'      },
              ].map(row => {
                const attrLabels = t('visibility.sourceIntel.attrLabels');
                const oppLabels  = t('visibility.sourceIntel.oppLabels');
                const sourceTypes = t('visibility.sourceIntel.sourceTypes');
                const visColor = row.attr === 'comp' ? '#ef4444' : row.attr === 'you' ? '#16a34a' : '#111827';
                return (
                  <div key={row.domain} className="sit-row">
                    <div className="sit-c sit-c--source">
                      <span className="fav" style={{ background: row.bg }}>{row.fav}</span>
                      <div>
                        <div className="sit-domain">{row.domain}</div>
                        <div className="sit-type">{sourceTypes[row.typeKey]}</div>
                      </div>
                    </div>
                    <div className="sit-c sit-c--da">
                      <span className="sit-da-n">{row.da}</span>
                      <span className="sit-bar-track"><i style={{ width: `${row.da}%`, background: '#2563eb' }} /></span>
                    </div>
                    <div className="sit-c sit-c--cite">
                      <div className="sit-cite-n">{row.cite}</div>
                      <div className="sit-cite-sub">{t('visibility.sourceIntel.thisMonth')}</div>
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
                        <span className="sit-vis-dash"> </span>
                      )}
                    </div>
                    <div className="sit-c">
                      <span className={`sit-opp sit-opp--${row.opp}`}>
                        {row.opp === 'featured'   && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>}
                        {row.opp === 'strengthen' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>}
                        {row.opp === 'expand'     && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>}
                        {row.opp === 'pitch'      && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>}
                        {oppLabels[row.opp]}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="src-intel-legend">
                {t('visibility.sourceIntel.legend').map((l, i) => {
                  const cls = ['you','comp','both'][i];
                  const lbl = Object.values(t('visibility.sourceIntel.attrLabels'))[i < 2 ? i === 0 ? 2 : 0 : 1];
                  return <span key={i}><span className={`sil-chip sil-chip--${cls}`}>{lbl}</span> {l}</span>;
                })}
              </div>
              <div className="src-intel-count">{t('visibility.sourceIntel.showingOf')}</div>
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
                  <div className="vis-agent-body">
                    <div className="agent-pill">
                      <span className="sp">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/>
                        </svg>
                      </span>
                      {t('visibility.nora.agentPill')}
                    </div>
                    <div className="eyebrow nora-eyebrow">{t('visibility.nora.eyebrow')}</div>
                    <h2 dangerouslySetInnerHTML={{ __html: t('visibility.nora.h2').replace('\n', '<br />') }} />
                    <p className="lead">{t('visibility.nora.lead')}</p>
                    <ul className="agent-pts">
                      {t('visibility.nora.points').map((pt, i) => (
                        <li key={i}>
                          <span className="ic">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              {i === 0 && <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>}
                              {i === 1 && <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>}
                              {i === 2 && <polyline points="20 6 9 17 4 12"/>}
                            </svg>
                          </span>
                          <span>
                            <span className="tt">{pt.tt}</span>
                            <span className="dd">{pt.dd}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* RIGHT */}
                  <div className="shot">
                    <span className="tab tab--live">{t('visibility.nora.liveSession')}</span>
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
                            <span className="chat-hdr-sub"><span className="chat-online-dot" />Online · Nike · Pricing focus</span>
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
                          <div className="bub bot">Good question. <b>Two root causes:</b> First, your pricing page is blocked by robots.txt   AI engines can't read it. Second, Competitor A has two detailed pricing comparison articles on forbes.com and techradar.com that dominate results for value-related queries. You appear in neither.</div>
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
                          <div className="bub bot">I've built your action plan. Start here   these three changes move the needle fastest:</div>
                        </div>
                      </div>

                      {/* Nested action plan */}
                      <div className="plan plan--v2">
                        <div className="plan-h plan-h--v2">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                          </svg>
                          {t('visibility.nora.planTitle')}
                        </div>
                        <div className="plan-items">
                          <div className="plan-item">
                            <span className="rk">1</span>
                            <span className="t">Fix robots.txt   allow AI crawlers to index /pricing</span>
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
                        {t('visibility.nora.chatBtns').map((btn, i) => (
                          <button key={i} className={`chat-btn${i === 0 ? ' chat-btn--primary' : ''}`}>{btn}</button>
                        ))}
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
              <h2>{t('visibility.stakes.h2Pre')} <span className="hl">{t('visibility.stakes.h2Hl')}</span></h2>
            </div>
            <div className="vstakes reveal">
              <div className="vstakes-grid">
                {t('visibility.stakes.stats').map((s, i) => (
                  <div key={i}>
                    <div className="n">{s.n}</div>
                    <div className="d">{s.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CtaBand
          heading={t('visibility.cta.heading')}
          lead={t('visibility.cta.lead')}
          primaryCta={t('visibility.cta.primaryCta')}
          secondaryCta={t('visibility.cta.secondaryCta')}
          note={t('visibility.cta.note')}
        />

      </main>
      <Footer />
    </div>
  );
}
