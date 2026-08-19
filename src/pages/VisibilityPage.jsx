import { useEffect } from 'react';
import '../visibility.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import RealMarketMapV2 from '../components/RealMarketMapV2';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';
import VisibilityDashboard from '../components/VisibilityDashboard';
import { useLang } from '../contexts/LangContext';

const HL = ({ children }) => <span className="hl">{children}</span>;

/* ── Source intelligence table (03 · SOURCE INTELLIGENCE) ─────────────── */
const SortIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="10" height="10"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
);
const ChevronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="m6 9 6 6 6-6"/></svg>
);

/* Favicon marks for source domains we don't have a saved logo file for. */
const TomsGuideIcon = () => (
  <svg viewBox="0 0 22 22" width="22" height="22"><rect width="22" height="22" rx="6" fill="#1f6fe5"/><path d="M8 6h6M11 6v10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/></svg>
);
const GoogleGIcon = () => (
  <svg viewBox="0 0 48 48" width="16" height="16">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.11-7.45 2.11-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
  </svg>
);
const ShopeeIcon = () => (
  <svg viewBox="0 0 22 22" width="22" height="22">
    <rect width="22" height="22" rx="6" fill="#ee4d2d"/>
    <path d="M8 9.5c0-1.93 1.34-3.5 3-3.5s3 1.57 3 3.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    <path d="M6.7 9h8.6l-.72 7.13c-.1.96-.91 1.7-1.88 1.7H9.3c-.97 0-1.78-.74-1.88-1.7L6.7 9z" fill="#fff"/>
  </svg>
);
const SOURCE_FAVICONS = { tomsguide: TomsGuideIcon, google: GoogleGIcon, shopee: ShopeeIcon };

/* Competitor pill color is keyed by brand, not row position — the same
   brand always reads the same color wherever it's cited. */
const COMPETITOR_COLORS = ['teal', 'purple', 'pink', 'blue'];
const COMPETITOR_COLOR_MAP = {
  'Adidas': 'teal', 'HOKA': 'teal',
  'New Balance': 'purple', 'ASICS': 'purple', 'Brooks': 'purple',
  'Puma': 'pink', 'Saucony': 'pink', 'Under Armour': 'pink', 'World Balance': 'pink',
  'On': 'blue',
};
function competitorColor(name) {
  if (COMPETITOR_COLOR_MAP[name]) return COMPETITOR_COLOR_MAP[name];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return COMPETITOR_COLORS[hash % COMPETITOR_COLORS.length];
}

const SOURCE_ROWS = [
  { domain: 'youtube.com', logo: 'youtube-com-logo.png', typeKey: 'social', authority: 'high', citation: 'mention',
    url: 'https://www.youtube.com/watch?v=pJmxeHjZYcs',
    competitors: ['Adidas', 'New Balance', 'ASICS', 'Puma', 'On', 'HOKA', 'Brooks'] },
  { domain: 'whowhatwear.com', logo: 'whowhatwear-com-logo.png', typeKey: 'news', authority: 'high', citation: 'uncited',
    url: 'https://www.whowhatwear.com/fashion/shoes/best-minimal-trainers-for-women',
    competitors: ['Adidas', 'Puma', 'On'] },
  { domain: 'tomsguide.com', icon: 'tomsguide', typeKey: 'news', authority: 'high', citation: 'mention',
    url: 'https://www.tomsguide.com/wellness/running/we-asked-toms-guide-readers-what-brand-of-running-shoes-they-wear-and-there-was-a-clear-winner?utm_source=chatgpt.com',
    competitors: ['Adidas', 'New Balance', 'ASICS', 'HOKA', 'Brooks', 'Saucony', 'Puma', 'On'] },
  { domain: 'sites.google.com', icon: 'google', iconBordered: true, typeKey: 'industry', authority: 'high', citation: 'mention',
    url: 'https://sites.google.com/view/quantitative-insights-lab/home/insights-lab/top-smart-running-shoes-companies-how-to-compare-them-2026',
    competitors: ['Adidas', 'New Balance', 'ASICS', 'HOKA', 'Under Armour', 'On'] },
  { domain: 'shopee.ph', icon: 'shopee', typeKey: 'marketplace', authority: 'high', citation: 'mention',
    url: 'https://shopee.ph/blog/affordable-shoe-brands-philippines/',
    competitors: ['World Balance', 'Puma', 'On', 'Adidas', 'New Balance', 'ASICS'] },
];

/* Splits a question into 3 lines balanced by character length (not
   word count), each split falling at the word boundary closest to the
   remaining text's own midpoint — since SVG <text> doesn't wrap on its
   own, and splitting by word count alone can leave one line much
   longer than the others when a few long words land on the same side. */
function wrapQuestion(text, lineCount = 3) {
  const words = text.split(' ');
  const lines = [];
  let start = 0;
  for (let li = 0; li < lineCount - 1; li++) {
    const remainingLines = lineCount - li;
    const target = words.slice(start).join(' ').length / remainingLines;
    let acc = 0, bestIdx = start + 1, bestDiff = Infinity;
    for (let i = start; i < words.length - (remainingLines - 1); i++) {
      acc += words[i].length + 1;
      const diff = Math.abs(acc - target);
      if (diff < bestDiff) { bestDiff = diff; bestIdx = i + 1; }
    }
    lines.push(words.slice(start, bestIdx).join(' '));
    start = bestIdx;
  }
  lines.push(words.slice(start).join(' '));
  return lines;
}

export default function VisibilityPage() {
  const { t } = useLang();
  const PF_TOPICS = t('visibility.productFocus.topics');
  /* Exclusive prefix sum of question counts, so each topic's connector
     lines get a unique, stable pf-line--N (drives the staggered draw-in). */
  const PF_LINE_OFFSET = PF_TOPICS.reduce((acc, topic) => {
    const prev = acc.length ? acc[acc.length - 1] : 0;
    acc.push(prev + topic.questions.length);
    return acc;
  }, []);

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

  return (
    <div className="vis-page">
      <Seo page="visibility" />
      <Navbar />
      <main>

        {/* ======================== HERO ======================== */}
        <Hero
          eyebrow={t('visibility.hero.eyebrow')}
          title={<>{t('visibility.hero.titlePre')}<br /><HL>{t('visibility.hero.titleHl')}</HL></>}
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
              <svg viewBox="0 0 1120 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Topic coverage cards with the real buyer questions rolling up into each one" className="pf-svg">
                {(() => {
                  const CARD_W = 252, CARD_X = [0, 290, 580, 870], CARD_Y = 24, CARD_H = 180, CARD_BOTTOM = CARD_Y + CARD_H;
                  const PILL_W = 222, PILL_H = 78, ROW_TOP0 = CARD_BOTTOM + 60, ROW_PITCH = 98;
                  const CONTENT_H = 103, CY = CARD_Y + (CARD_H - CONTENT_H) / 2 - 19;
                  const fromPromptsTemplate = t('visibility.productFocus.fromPrompts');

                  const bodies = PF_TOPICS.map((topic, ti) => {
                    const cardX = CARD_X[ti];
                    const anchorX = cardX + CARD_W / 2;
                    const lineBase = ti === 0 ? 0 : PF_LINE_OFFSET[ti - 1];
                    const slug = topic.key;
                    return (
                      <g key={topic.key} className={`pf-topic pf-topic--${slug}`}>
                        <rect className="pf-card" x={cardX} y={CARD_Y} width={CARD_W} height={CARD_H}/>
                        <text x={cardX + 24} y={CY + 30} className="pf-tname">{topic.name}</text>
                        <text x={cardX + 24} y={CY + 53} className="pf-tsub">{fromPromptsTemplate.replace('{shown}', topic.questions.length).replace('{n}', topic.prompts)}</text>
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
                          const lines = wrapQuestion(q.text);
                          return (
                            <g key={i}>
                              <path
                                className={`pf-line pf-line--${lineNum}`}
                                d={`M ${anchorX} ${CARD_BOTTOM} L ${anchorX} ${railTurnY} L ${railX} ${railTurnY} L ${railX} ${centerY} L ${pillX} ${centerY}`}
                              />
                              <rect className="pf-pill" x={pillX} y={rowTop} width={PILL_W} height={PILL_H}/>
                              {lines.map((line, li) => (
                                <text key={li} x={pillX + 22} y={rowTop + 22 + li * 17} className="pf-q">
                                  {li === 0 ? '"' : ''}{line}{li === lines.length - 1 ? '"' : ''}
                                </text>
                              ))}
                            </g>
                          );
                        })}
                      </g>
                    );
                  });

                  const nodes = PF_TOPICS.map((topic, ti) => {
                    const cardX = CARD_X[ti];
                    const anchorX = cardX + CARD_W / 2;
                    const slug = topic.key;
                    return (
                      <g key={`${topic.key}-nodes`} className={`pf-topic--${slug}`}>
                        <circle className="pf-node" cx={anchorX} cy={CARD_BOTTOM}/>
                        {topic.questions.map((q, i) => {
                          const rowTop = ROW_TOP0 + i * ROW_PITCH;
                          const centerY = rowTop + PILL_H / 2;
                          const pillX = cardX + 20;
                          return <circle key={i} className="pf-node" cx={pillX} cy={centerY}/>;
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
              {/* Heading */}
              <div className="adv-head si-head reveal">
                {(() => { const rm = t('visibility.realMarket'); return (<>
                  <div className="si-head-copy">
                    <div className="eyebrow">{rm.eyebrow}</div>
                    <h2>{rm.h2Pre} <span className="hl">{rm.h2Hl}</span></h2>
                  </div>
                  <p className="lead">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                    </svg>
                    {rm.lead}
                  </p>
                </>); })()}
              </div>

              {/* Map: full width, below the heading */}
              <div className="rm2-wrap reveal">
                <RealMarketMapV2 />
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
                <button type="button" className="src-intel-x" tabIndex={-1} aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>

              <div className="src-intel-toolbar">
                <span className="src-intel-toolbar-label">{t('visibility.sourceIntel.categoryLabel')}</span>
                <span className="src-intel-select">
                  {t('visibility.sourceIntel.allCategories')}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><path d="m6 9 6 6 6-6"/></svg>
                </span>
              </div>

              <div className="src-intel-scroll">
              <div className="sit-head sit-head--v2">
                {(() => { const h = t('visibility.sourceIntel.tableHeaders'); return (<>
                  <div className="sit-c">{h.source}</div>
                  <div className="sit-c sit-c--sortable sit-c--center">{h.category} <SortIcon /></div>
                  <div className="sit-c sit-c--sortable sit-c--center">{h.authority} <ChevronIcon /></div>
                  <div className="sit-c sit-c--sortable sit-c--center">{h.yourCitation} <SortIcon /></div>
                  <div className="sit-c sit-c--sortable">{h.competitorCitations} <SortIcon /></div>
                </>); })()}
              </div>

              <div className="sit-body">
              {SOURCE_ROWS.map(row => {
                const sourceTypes = t('visibility.sourceIntel.sourceTypes');
                const citation = t('visibility.sourceIntel.citation');
                return (
                  <div key={row.domain} className="sit-row sit-row--v2">
                    <div className="sit-c sit-c--source">
                      <div className="sit-source-stack">
                        <div className="sit-source-top">
                          {row.logo ? (
                            <span className="fav">
                              <img src={`${import.meta.env.BASE_URL}Source%20Intelligence/${row.logo}`} alt="" />
                            </span>
                          ) : SOURCE_FAVICONS[row.icon] ? (() => {
                            const Icon = SOURCE_FAVICONS[row.icon];
                            return (
                              <span className={`fav${row.iconBordered ? ' fav--bordered' : ''}`}>
                                <Icon />
                              </span>
                            );
                          })() : (
                            <span className="fav fav--letter" style={{ background: row.letterBg || '#6c6c7c' }}>
                              {row.domain.charAt(0).toUpperCase()}
                            </span>
                          )}
                          <div className="sit-domain">{row.domain}</div>
                        </div>
                        <a className="sit-url-link" href={row.url} target="_blank" rel="noopener noreferrer">
                          {row.url}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                        </a>
                      </div>
                    </div>
                    <div className="sit-c sit-c--center">
                      <span className="sit-cat">{sourceTypes[row.typeKey]}</span>
                    </div>
                    <div className="sit-c sit-c--center">
                      <span className={`sit-authority sit-authority--${row.authority}`}>
                        {row.authority.charAt(0).toUpperCase() + row.authority.slice(1)}
                      </span>
                    </div>
                    <div className="sit-c sit-c--center">
                      <span className={`sit-citation sit-citation--${row.citation}`}>
                        {citation[row.citation]}
                      </span>
                    </div>
                    <div className="sit-c sit-c--pills">
                      {row.competitors.map(name => (
                        <span key={name} className={`sit-pill sit-pill--${competitorColor(name)}`}>{name}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
              </div>{/* /sit-body */}
              </div>{/* /src-intel-scroll */}

              <div className="src-intel-count">{t('visibility.sourceIntel.showingOf')}</div>
            </div>
          </div>
        </section>

        {/* ======================== 04 · NORA ======================== */}
        <section id="nora">
          <div className="dark reveal">
            <div className="wrap">
              <div className="inner">
                <div className="nora-grid">
                  {/* LEFT */}
                  <div className="vis-agent-body">
                    <div className="agent-pill">
                      <span className="sp">
                        <img src={`${import.meta.env.BASE_URL}Illustrations/nora.png`} alt="Nora" />
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
                            <img src={`${import.meta.env.BASE_URL}Illustrations/nora.png`} alt="Nora" />
                          </span>
                          <div className="chat-hdr-info">
                            <span className="chat-hdr-name">Nora</span>
                            <span className="chat-hdr-sub"><span className="chat-online-dot" />{t('visibility.nora.online')}</span>
                          </div>
                        </div>
                        <div className="chat-hdr-right">
                          <span className="chat-hdr-date">{t('visibility.nora.chatDate')}</span>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="chat-msgs">
                        {t('visibility.nora.bubbles').map((bub, i) => (
                          <div key={i} className={`chat-msg chat-msg--${bub.from === 'user' ? 'user' : 'bot'}`}>
                            {bub.from === 'user' ? (
                              <>
                                <div className="bub user" dangerouslySetInnerHTML={{ __html: bub.text }} />
                                <span className="av av--j av--sm">J</span>
                              </>
                            ) : (
                              <>
                                <span className="av av--nora-v2 av--sm">
                                  <img src={`${import.meta.env.BASE_URL}Illustrations/nora.png`} alt="Nora" />
                                </span>
                                <div className="bub bot" dangerouslySetInnerHTML={{ __html: bub.text }} />
                              </>
                            )}
                          </div>
                        ))}
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
                          {t('visibility.nora.planItems').map((item, i) => (
                            <div key={i} className="plan-item">
                              <span className="rk">{i + 1}</span>
                              <span className="t">{item.t}</span>
                              <span className={`impact ${item.impact}`}>{item.label}</span>
                            </div>
                          ))}
                        </div>
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
