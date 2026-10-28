import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import Navbar from '../../components/Navbar';
import Seo from '../../components/Seo';
import Footer from '../../components/Footer';
import { useLang } from '../../contexts/LangContext';
import { trackEvent } from '../../lib/analytics';
import '../../blog-post.css';
import '../../blog-comparison.css';

// The comparison post is mostly tables, so unlike the other posts its copy
// lives in data files (polirisComparison.en.js / .fr.js) and this component
// renders both languages. That keeps the two versions structurally identical:
// a row added to one table can't drift out of step with the other language.

export const SLUG = 'poliris-comparison';
const TRIAL_URL = 'https://app.poliris.io';
const DEMO_URL = 'https://cal.com/team/poliris/discovery-call';

// Table cell statuses: included, partial / add-on, not mentioned, not disclosed.
const ICONS = {
  y: (
    <svg className="bpc-ic" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#dcfce7" />
      <path d="M7.2 12.4l3.1 3.1 6.5-6.6" fill="none" stroke="#15803d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  p: (
    <svg className="bpc-ic" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#fef3c7" />
      <circle cx="12" cy="12" r="6.2" fill="none" stroke="#b45309" strokeWidth="2" />
      <path d="M12 5.8a6.2 6.2 0 0 1 0 12.4z" fill="#b45309" />
    </svg>
  ),
  n: (
    <svg className="bpc-ic" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#eef0f4" />
      <path d="M8.6 8.6l6.8 6.8M15.4 8.6l-6.8 6.8" stroke="#8a91a0" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  d: (
    <svg className="bpc-ic" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#f4f5f8" />
      <path d="M8 12h8" stroke="#a3a9b6" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
};

const CHECK = (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="10" cy="10" r="10" fill="var(--poliris-blue)" />
    <path d="M5.8 10.3l2.7 2.7 5.6-5.7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BACK_ICON = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

// A cell is a status ('y' | 'p' | 'n' | 'd'), a status with a note
// (['p', 'AI add-on']), a plain text value ('28.8B') or text with a
// note ({ t: '$408', s: 'Starter + content + AI PR' }).
function Cell({ value, ui }) {
  const status = Array.isArray(value) ? value[0] : value;
  if (typeof status === 'string' && ICONS[status]) {
    const note = Array.isArray(value) ? value[1] : null;
    return (
      <div className="bpc-c">
        {ICONS[status]}
        <span className="sr-only">{note ? `${ui.status[status]}, ${note}` : ui.status[status]}</span>
        {note && <small aria-hidden="true">{note}</small>}
      </div>
    );
  }
  const { t, s } = typeof value === 'string' ? { t: value } : value;
  return (
    <div className="bpc-c">
      <span className="bpc-t">{t}</span>
      {s && <small>{s}</small>}
    </div>
  );
}

function CompareTable({ table, label, ui }) {
  const span = table.cols.length + 1;
  return (
    <>
      <div className="bpc-tw" role="region" aria-label={label} tabIndex={0}>
        <table className="bpc-table" style={{ minWidth: table.minWidth ?? 760 }}>
          <caption className="sr-only">{label}</caption>
          {/* table-layout: fixed sizes columns from the first row, which in the
              overview is the empty column-group row, so the widths go here. */}
          <colgroup>
            <col className="bpc-col-label" />
            {table.cols.map((col) => <col key={col} />)}
          </colgroup>
          <thead>
            {table.colGroups && (
              <tr className="bpc-colgroups">
                <td />
                <td />
                {table.colGroups.map(([name, cols]) => (
                  <th key={name} colSpan={cols} scope="colgroup"><span>{name}</span></th>
                ))}
              </tr>
            )}
            <tr>
              <th scope="col" className="bpc-rowh">{table.corner}</th>
              {table.cols.map((col, i) => (
                <th key={col} scope="col" className={i === 0 ? 'bpc-pol' : undefined}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              row.group ? (
                <tr key={row.group} className="bpc-grp">
                  <th colSpan={span} scope="rowgroup"><span>{row.group}</span></th>
                </tr>
              ) : (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.cells.map((value, i) => (
                    <td key={i} className={i === 0 ? 'bpc-pol' : undefined}><Cell value={value} ui={ui} /></td>
                  ))}
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
      <p className="bpc-swipe">{ui.swipe}</p>
    </>
  );
}

function Kpis({ items, label }) {
  return (
    <>
      {label && <div className="bpc-kpis-label">{label}</div>}
      <div className={`bpc-kpis${items.length === 3 ? ' bpc-kpis--3' : ''}`}>
        {items.map((k) => (
          <div key={k.v + k.l} className="bpc-kpi">
            {k.k && <small>{k.k}</small>}
            <b>{k.v}</b>
            <span>{k.l}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function Does({ items, ui }) {
  return (
    <div className="bpc-does">
      <div className="bpc-does-label">{ui.does}</div>
      <ul>
        {items.map((d) => (
          <li key={d.b}>
            {CHECK}
            <div><b>{d.b}</b><p>{d.p}</p></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Further({ text, ui }) {
  return (
    <div className="bp-note">
      <p><strong>{ui.further}</strong> {text}</p>
    </div>
  );
}

function SectionHeader({ n, eyebrow, title }) {
  return (
    <>
      <div className="bpc-eyebrow">{eyebrow}</div>
      <div className="bp-section-header bpc-section-header">
        <span className="bp-num">{String(n).padStart(2, '0')}</span>
        <h2>{title}</h2>
      </div>
    </>
  );
}

function CtaButtons({ ui }) {
  return (
    <div className="bpc-cta-actions">
      <a href={TRIAL_URL} target="_blank" rel="noopener noreferrer" className="bp-cta-btn" onClick={() => trackEvent('trial_cta_clicked')}>
        {ui.trial}
      </a>
      <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="bp-cta-btn bpc-cta-btn--ghost" onClick={() => trackEvent('demo_cta_clicked')}>
        {ui.demo}
      </a>
    </div>
  );
}

function CostBreakdown({ cost }) {
  const { before, after } = cost;
  return (
    <div className="bpc-cost">
      <div className="bpc-panel">
        <div className="bpc-panel-tag">{before.tag}</div>
        <div className="bpc-bill-h">{before.head.map((h) => <span key={h}>{h}</span>)}</div>
        {before.rows.map(([workstream, tool, price]) => (
          <div key={workstream} className="bpc-bill-r">
            <span>{workstream}</span><b>{tool}</b><span>{price}</span>
          </div>
        ))}
        <div className="bpc-bill-note">{before.note}</div>
        <div className="bpc-total"><span>{before.totalLabel}</span><strong>{before.total}</strong></div>
        <ul className="bpc-stats">{before.stats.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>

      <div className="bpc-panel bpc-panel--pol">
        <div className="bpc-panel-tag">{after.tag}</div>
        <div className="bpc-flow">
          <div className="bpc-frame-h"><b>Poliris</b><span>{after.modulesLabel}</span></div>
          <div className="bpc-mods" style={{ width: '100%' }}>
            {after.modules.map(([name, detail]) => (
              <div key={name} className="bpc-mod"><b>{name}</b><span>{detail}</span></div>
            ))}
          </div>
          <div className="bpc-flow-line" />
          <div className="bpc-flow-pill">{after.dataset}</div>
          <div className="bpc-flow-line" />
          <div className="bpc-node bpc-node--dark"><b>{after.ai.b}</b><p>{after.ai.p}</p></div>
          <div className="bpc-flow-line" />
          <div className="bpc-node"><b>{after.team.b}</b><p>{after.team.p}</p></div>
        </div>
        <div className="bpc-total"><span>{after.totalLabel}</span><strong>{after.total}</strong></div>
        <ul className="bpc-stats">{after.stats.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>
    </div>
  );
}

function PriceBars({ bars }) {
  const max = Math.max(...bars.items.map((b) => b.value));
  return (
    <figure className="bpc-bars">
      <figcaption><b>{bars.title}</b><span>{bars.unit}</span></figcaption>
      {bars.items.map((b) => (
        <div key={b.name} className={`bpc-bar${b.own ? ' bpc-bar--own' : ''}`}>
          <div className="bpc-bar-l"><b>{b.name}</b><span>{b.sub}</span></div>
          <div className="bpc-bar-t">
            <i style={{ width: `calc((100% - 64px) * ${(b.value / max).toFixed(3)})` }} />
            <em>{b.price}</em>
          </div>
        </div>
      ))}
    </figure>
  );
}

function Plans({ plans }) {
  return (
    <div className="bpc-plans">
      {plans.map((p) => (
        <div key={p.name} className={`bpc-plan${p.hl ? ' bpc-plan--hl' : ''}`}>
          <b>{p.name}</b>
          <div className="bpc-plan-price"><strong>{p.price}</strong>{p.per && <span>{p.per}</span>}</div>
          <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

export default function PolirisComparisonArticle({ content: c }) {
  const { lang } = useLang();
  const { ui } = c;
  const [openFaq, setOpenFaq] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [progress, setProgress] = useState(0);

  const sections = c.sections;

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
      let current = '';
      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) current = id;
      });
      setActiveSection(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  // Section bodies, keyed by section id; the order and numbering come from c.sections.
  const body = {
    overview: (s) => (
      <>
        <p>{s.lede}</p>
        <div className="bp-pull-quote"><p>{s.claim}</p></div>
        <CompareTable table={s.table} label={s.tableLabel} ui={ui} />
        <div className="bpc-legend">
          {['y', 'p', 'n', 'd'].map((k) => <span key={k}>{ICONS[k]}{ui.legend[k]}</span>)}
        </div>
        <p className="bpc-fine">{s.fine}</p>
      </>
    ),
    cost: (s) => (
      <>
        <p>{s.lede}</p>
        <CostBreakdown cost={s} />
        <p className="bpc-fine">{s.fine}</p>
        <Does items={s.does} ui={ui} />
      </>
    ),
    pricing: (s) => (
      <>
        <p>{s.lede}</p>
        <PriceBars bars={s.bars} />
        <Plans plans={s.plans} />
        <p className="bpc-fine">{s.fine}</p>
      </>
    ),
    method: (s) => (
      <>
        <ul className="bp-prose-list">
          {s.items.map(([b, text]) => <li key={b}><strong>{b}</strong>{ui.colon}{text}</li>)}
        </ul>
        <div className="bp-note">
          <p>{s.fix} <a href="mailto:contact@poliris.io">contact@poliris.io</a>.</p>
        </div>
        <h3>{s.sourcesTitle}</h3>
        <ul className="bpc-sources">
          {/* Our own pricing page: an internal link, so no nofollow. */}
          <li><Link to={`/${lang}/pricing`}>{s.pricingSource}</Link></li>
          {s.sources.map(([name, href]) => (
            <li key={href}><a href={href} target="_blank" rel="nofollow noopener noreferrer">{name}</a></li>
          ))}
        </ul>
      </>
    ),
    faq: () => (
      <div className="bp-faq">
        {c.faq.items.map((item, i) => (
          <div key={item.q} className="bp-faq-item">
            <h3 className="bp-faq-heading">
              <button
                className={`bp-faq-btn${openFaq === i ? ' bp-open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {item.q}
                <span className="bp-faq-icon" />
              </button>
            </h3>
            <div className={`bp-faq-body${openFaq === i ? ' bp-open' : ''}`}>
              <div className="bp-faq-body-inner"><p>{item.a}</p></div>
            </div>
          </div>
        ))}
      </div>
    ),
  };

  // Audit, keywords, links, AI visibility, content and agencies share one shape.
  const standard = (s) => (
    <>
      <p>{s.lede}</p>
      {s.engines && <ul className="bpc-chips">{s.engines.map((e) => <li key={e}>{e}</li>)}</ul>}
      {s.kpis && <Kpis items={s.kpis} />}
      <CompareTable table={s.table} label={s.tableLabel} ui={ui} />
      {s.does && <Does items={s.does} ui={ui} />}
      {s.further && <Further text={s.further} ui={ui} />}
    </>
  );

  return (
    <div className="bp-page">
      <Seo page={`blog/${SLUG}`} type="article" title={c.seo.title} description={c.seo.description} />
      <Head>
        {c.jsonLd.map((ld) => (
          <script key={ld['@type']} type="application/ld+json">{JSON.stringify(ld)}</script>
        ))}
      </Head>
      <Navbar />

      <div className="bp-layout">

        {/* ── Sidenav ── */}
        <aside className="bp-sidenav">
          <Link to={`/${lang}/blog`} className="bp-back-link">{BACK_ICON}{ui.back}</Link>
          <div className="bp-sidenav-label">{ui.onPage}</div>
          <ul className="bp-sidenav-list">
            {sections.map(({ id, nav }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeSection === id ? 'bp-active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                >
                  {nav}
                </a>
              </li>
            ))}
          </ul>
          <div className="bp-sidenav-foot">
            <div className="bp-progress-label">{ui.progress}</div>
            <div className="bp-progress-track">
              <div className="bp-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </aside>

        {/* ── Article ── */}
        <main className="bp-main">

          <Link to={`/${lang}/blog`} className="bp-back-link bp-back-mobile">{BACK_ICON}{ui.back}</Link>

          <header className="bp-hero">
            <div className="bp-meta">
              {/* One line of text, as in the source: "Comparison · updated …" */}
              <span><span className="bp-category">{ui.category}</span> · {ui.updated}</span>
            </div>
            <h1 className="bp-title">{c.hero.title}</h1>
            {/* First line is the source's tagline (blue italic, no full stop). */}
            {c.hero.deck.map((p, i) => <p key={p} className={i === 0 ? 'bpc-tag' : 'bp-deck'}>{p}</p>)}
            <div className="bpc-hero-ctas"><CtaButtons ui={ui} /></div>
            <Kpis items={c.hero.kpis} label={c.hero.kpisLabel} />
          </header>

          {sections.map((s, i) => (
            <section key={s.id} className="bp-section" id={s.id} style={{ scrollMarginTop: '90px' }}>
              <SectionHeader n={i + 1} eyebrow={s.eyebrow} title={s.title} />
              {(body[s.id] ?? standard)(s)}
            </section>
          ))}

          <div className="bp-cta-box">
            <div>
              <p className="bp-cta-heading">{c.cta.heading}</p>
              <p>{c.cta.text}</p>
            </div>
            <CtaButtons ui={ui} />
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
}
