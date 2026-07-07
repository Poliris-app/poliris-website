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

/* ---- Product Focus: topic coverage cards + the real buyer
   questions rolling up into each one ------------------------ */
const PF_TOPICS = [
  {
    name: 'Performance', prompts: 22, pct: 67, status: 'On par',
    questions: [
      { text: 'Which lightweight gym shoes maximise stability?' },
      { text: 'Professional advice on cross-training shoe selection?' },
    ],
  },
  {
    name: 'Durability', prompts: 15, pct: 13, status: 'Behind',
    questions: [
      // Also rolls up into Performance — a hiking boot is bought for both.
      { text: 'Top-rated waterproof hiking boots for mountain terrain?', sharedWith: 'Performance' },
      { text: 'Best durable footwear for long-distance walking?' },
    ],
  },
  {
    name: 'Design', prompts: 20, pct: 42, status: 'Behind',
    questions: [
      { text: 'Where to find affordable, reliable everyday sneakers?' },
      { text: 'Top footwear collections for a minimalist aesthetic?' },
    ],
  },
  {
    name: 'Brand awareness', prompts: 18, pct: 75, status: 'On par',
    questions: [
      // Also rolls up into Design — style is a design signal too.
      { text: 'Which trendy sneakers lead casual street style?', sharedWith: 'Design' },
    ],
  },
];

/* Splits a question into two lines balanced by character length (not
   word count), at the word boundary closest to the halfway point —
   since SVG <text> doesn't wrap on its own, and splitting by word
   count alone can leave one line much longer than the other when a
   few long words land on the same side. */
function wrapQuestion(text) {
  const words = text.split(' ');
  let bestSplit = 1, bestDiff = Infinity, acc = 0;
  for (let i = 0; i < words.length - 1; i++) {
    acc += words[i].length + 1;
    const diff = Math.abs(acc - text.length / 2);
    if (diff < bestDiff) { bestDiff = diff; bestSplit = i + 1; }
  }
  return [words.slice(0, bestSplit).join(' '), words.slice(bestSplit).join(' ')];
}

/* Exclusive prefix sum of question counts, so each topic's connector
   lines get a unique, stable pf-line--N (drives the staggered draw-in). */
const PF_LINE_OFFSET = PF_TOPICS.reduce((acc, topic) => {
  const prev = acc.length ? acc[acc.length - 1] : 0;
  acc.push(prev + topic.questions.length);
  return acc;
}, []);

/* ---- Scope data for the Real Market section -------------- */
const SCOPE_DATA = {
  worldwide: { loc: 'World · global' },
  country:   { loc: 'France · national' },
  region:    { loc: 'Auvergne-Rhône-Alpes' },
  local:     { loc: 'Lyon · 69001–69009' },
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
              <svg viewBox="0 0 1120 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Topic coverage cards with the real buyer questions rolling up into each one" className="pf-svg">
                {(() => {
                  const CARD_W = 252, CARD_X = [0, 290, 580, 870], CARD_Y = 24, CARD_H = 180, CARD_BOTTOM = CARD_Y + CARD_H;
                  const PILL_W = 222, PILL_H = 56, ROW_TOP0 = CARD_BOTTOM + 60, ROW_PITCH = 76;
                  const CONTENT_H = 103, CY = CARD_Y + (CARD_H - CONTENT_H) / 2 - 19;
                  const topicIndexByName = Object.fromEntries(PF_TOPICS.map((tp, idx) => [tp.name, idx]));

                  /* Cards + lines render first, then every node circle
                     renders in a second pass on top — a cross-topic line
                     can start exactly at another card's anchor point, and
                     if that other card's group comes earlier in the DOM
                     its node would otherwise get painted over. */
                  const bodies = PF_TOPICS.map((topic, t) => {
                    const cardX = CARD_X[t];
                    const anchorX = cardX + CARD_W / 2;
                    const lineBase = t === 0 ? 0 : PF_LINE_OFFSET[t - 1];
                    const slug = topic.name.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <g key={topic.name} className={`pf-topic pf-topic--${slug}`}>
                        <rect className="pf-card" x={cardX} y={CARD_Y} width={CARD_W} height={CARD_H}/>
                        <text x={cardX + 24} y={CY + 30} className="pf-tname">{topic.name}</text>
                        <text x={cardX + 24} y={CY + 53} className="pf-tsub">from {topic.prompts} prompts</text>
                        <line className="pf-divider" x1={cardX + 24} y1={CY + 72} x2={cardX + CARD_W - 24} y2={CY + 72}/>
                        <text x={cardX + 24} y={CY + 122} className="pf-tscore">{topic.pct} %</text>
                        <rect className="pf-status" x={cardX + CARD_W - 94} y={CY + 98} width="70" height="24"/>
                        <text x={cardX + CARD_W - 59} y={CY + 114} textAnchor="middle" className="pf-tlab">{topic.status}</text>
                        {topic.questions.map((q, i) => {
                          const lineNum = lineBase + i + 1;
                          const rowTop = ROW_TOP0 + i * ROW_PITCH;
                          const centerY = rowTop + PILL_H / 2;
                          const railX = cardX + 6;
                          const railTurnY = CARD_BOTTOM + 30;
                          const pillX = cardX + 20;
                          const [line1, line2] = wrapQuestion(q.text);
                          const sharedIdx = q.sharedWith ? topicIndexByName[q.sharedWith] : undefined;
                          const sharedAnchorX = sharedIdx !== undefined ? CARD_X[sharedIdx] + CARD_W / 2 : null;
                          const sharedBusY = CARD_BOTTOM + 14;
                          const sharedSlug = q.sharedWith ? q.sharedWith.toLowerCase().replace(/\s+/g, '-') : null;
                          return (
                            <g key={i}>
                              <path
                                className={`pf-line pf-line--${lineNum}`}
                                d={`M ${anchorX} ${CARD_BOTTOM} L ${anchorX} ${railTurnY} L ${railX} ${railTurnY} L ${railX} ${centerY} L ${pillX} ${centerY}`}
                              />
                              {sharedAnchorX !== null && (
                                <path
                                  className={`pf-line pf-cross-line pf-line--${lineNum}`}
                                  style={{ stroke: `var(--pf-color-${sharedSlug})` }}
                                  d={`M ${sharedAnchorX} ${CARD_BOTTOM} L ${sharedAnchorX} ${sharedBusY} L ${pillX} ${sharedBusY} L ${pillX} ${centerY}`}
                                />
                              )}
                              <rect className="pf-pill" x={pillX} y={rowTop} width={PILL_W} height={PILL_H}/>
                              <text x={pillX + 22} y={rowTop + 24} className="pf-q">"{line1}</text>
                              <text x={pillX + 22} y={rowTop + 41} className="pf-q">{line2}"</text>
                            </g>
                          );
                        })}
                      </g>
                    );
                  });

                  const nodes = PF_TOPICS.map((topic, t) => {
                    const cardX = CARD_X[t];
                    const anchorX = cardX + CARD_W / 2;
                    const slug = topic.name.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <g key={`${topic.name}-nodes`} className={`pf-topic--${slug}`}>
                        <circle className="pf-node" cx={anchorX} cy={CARD_BOTTOM}/>
                        {topic.questions.map((q, i) => {
                          const rowTop = ROW_TOP0 + i * ROW_PITCH;
                          const centerY = rowTop + PILL_H / 2;
                          const pillX = cardX + 20;
                          const sharedSlug = q.sharedWith ? q.sharedWith.toLowerCase().replace(/\s+/g, '-') : null;
                          return sharedSlug ? (
                            <g key={i}>
                              <circle cx={pillX} cy={centerY} r="5" fill="#fff"/>
                              <path
                                d={`M ${pillX} ${centerY - 5} A 5 5 0 0 0 ${pillX} ${centerY + 5}`}
                                fill="none" stroke="var(--pf-accent)" strokeWidth="3"
                              />
                              <path
                                d={`M ${pillX} ${centerY - 5} A 5 5 0 0 1 ${pillX} ${centerY + 5}`}
                                fill="none" stroke={`var(--pf-color-${sharedSlug})`} strokeWidth="3"
                              />
                            </g>
                          ) : (
                            <circle key={i} className="pf-node" cx={pillX} cy={centerY}/>
                          );
                        })}
                      </g>
                    );
                  });

                  return <>{bodies}{nodes}</>;
                })()}
              </svg>
              {/* <div className="pf-foot" dangerouslySetInnerHTML={{ __html: t('visibility.productFocus.foot') }} /> */}
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
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================== 03 · SOURCE INTELLIGENCE ======================== */}
        <section id="sources">
          <div className="wrap">
            <div className="adv-head si-head reveal">
              {(() => { const si = t('visibility.sourceIntel'); return (<>
                <div className="si-head-copy">
                  <div className="eyebrow">{si.eyebrow}</div>
                  <h2>{si.h2Pre} <span className="hl">{si.h2Hl}</span></h2>
                </div>
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
            {/* <div className="src-stats reveal">
              {t('visibility.sourceIntel.stats').map(s => (
                <div key={s.n} className="src-stat">
                  <div className="src-stat-n">{s.n}</div>
                  <div className="src-stat-label">{s.label}</div>
                  <div className="src-stat-sub">{s.sub}</div>
                </div>
              ))}
            </div> */}

            {/* Source intelligence report */}
            <div className="src-intel reveal">
              <div className="src-intel-hdr">
                <div>
                  <div className="src-intel-title">{t('visibility.sourceIntel.title')}</div>
                  <div className="src-intel-meta">{t('visibility.sourceIntel.meta')}</div>
                </div>
              </div>

              <div className="src-intel-scroll">
              <div className="sit-head">
                {(() => { const h = t('visibility.sourceIntel.tableHeaders'); return (<>
                  <div className="sit-c">{h.url}</div>
                  <div className="sit-c">{h.domain}</div>
                  <div className="sit-c">{h.category}</div>
                  <div className="sit-c">{h.authority}</div>
                  <div className="sit-c">{h.comp}</div>
                  <div className="sit-c">{h.link}</div>
                </>); })()}
              </div>

              {[
                { url: 'https://www.youtube.com/watch?v=y9UN1T-olHY', fav: '▶', bg: '#FF0000', domain: 'youtube.com', typeKey: 'social',      authority: 'high', comp: false, link: 'broken' },
                { url: 'https://www.yahoo.com/lifestyle/articles/editors-trainers-tested-dozens-cross-152500350.html?utm_source=chatgpt.com', fav: '!', bg: '#6001D2', domain: 'yahoo.com', typeKey: 'news', authority: 'high', comp: false, link: false },
                { url: 'https://www.whowhatwear.com/fashion/shopping/best-sneakers-under-250-spring-2026', fav: 'W', bg: '#111111', domain: 'whowhatwear.com', typeKey: 'news', authority: 'high', comp: false, link: 'broken' },
                { url: 'https://www.walmart.com/ip/No-Boundaries-Womens-Classic-Lace-Up-Casual-Sneakers-Wide-Width-Available/407365252?utm_source=openai', fav: '✦', bg: '#FFC220', domain: 'walmart.com', typeKey: 'marketplace', authority: 'high', comp: false, link: false },
                { url: 'https://www.vogue.com/article/the-row-shoes?utm_source=chatgpt.com', fav: 'V', bg: '#000000', domain: 'vogue.com', typeKey: 'media', authority: 'high', comp: 'warning', link: false },
              ].map(row => {
                const sourceTypes = t('visibility.sourceIntel.sourceTypes');
                return (
                  <div key={row.domain} className="sit-row">
                    <div className="sit-c sit-c--url">
                      <a className="sit-url-link" href={row.url} target="_blank" rel="noopener noreferrer">
                        {row.url}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                      </a>
                    </div>
                    <div className="sit-c sit-c--source">
                      <span className="fav" style={{ background: row.bg }}>{row.fav}</span>
                      <div className="sit-domain">{row.domain}</div>
                    </div>
                    <div className="sit-c">
                      <span className="sit-cat">{sourceTypes[row.typeKey]}</span>
                    </div>
                    <div className="sit-c">
                      <span className={`sit-authority sit-authority--${row.authority}`}>
                        {row.authority.charAt(0).toUpperCase() + row.authority.slice(1)}
                      </span>
                    </div>
                    <div className="sit-c">
                      {row.comp === 'warning' ? (
                        <svg className="sit-icon sit-icon--warn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      ) : (
                        <span className="sit-dash">–</span>
                      )}
                    </div>
                    <div className="sit-c">
                      {row.link === 'broken' ? (
                        <svg className="sit-icon sit-icon--broken" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                      ) : (
                        <span className="sit-dash">–</span>
                      )}
                    </div>
                  </div>
                );
              })}
              </div>{/* /src-intel-scroll */}

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
