import { useState, useEffect } from 'react';
import ProductCarousel from './ProductCarousel';
import Hero from './Hero';
import CtaBand from './CtaBand';
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
      <Hero
        eyebrow={h.eyebrow}
        title={<>{h.titlePre}<br /><HL>{h.titleHl}</HL> {h.titlePost}</>}
        lead={h.lead}
        primaryCta={h.primaryCta}
        secondaryCta={h.secondaryCta}
        note={h.note}
      />
      <ValueChain />
      <ProductCarousel />
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
          <h2 className="sec-h2">{vc.h2Pre}<br />Poliris lets you <HL>{vc.h2Hl}</HL></h2>
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
      <svg viewBox="0 0 12 12" fill="none" width="16" height="16">
        <path d="M2 6l3 3 5-5" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
  const CrossIcon = () => (
    <span className="comparison__x-icon">
      <svg viewBox="0 0 14 14" fill="none" width="16" height="16">
        <path d="M3 3l8 8M11 3l-8 8" stroke="#B45353" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    </span>
  );
  return (
    <section className="comparison">
      <div className="container">
        <div className="sec-head reveal">
          {(() => { const cp = t('home.comparison'); return (<>
            <Eyebrow>{cp.eyebrow}</Eyebrow>
            <h2 className="sec-h2">{cp.h2}</h2>
            <p className="sec-lead">{cp.lead}</p>
          </>); })()}
        </div>
        <div className="comparison__table-wrap reveal reveal--scale reveal--d1">
          <table className="comparison__table">
            <thead>
              <tr>
                <th className="comparison__th">{cp.headers.capability}</th>
                <th className="comparison__th">{cp.headers.otherTools}</th>
                <th className="comparison__th comparison__th--pol">{cp.headers.poliris}</th>
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
            <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
              <path d="M2 6l3 3 5-5" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
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

