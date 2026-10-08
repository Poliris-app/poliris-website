import { useLang } from '../contexts/LangContext';
import '../site-overview-mockup.css';

/* ── Icons ─────────────────────────────────────────────────── */
const IconRefresh = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconExternal = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#1e3893" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H5.5M9.5 2.5V6.5"/>
  </svg>
);
const IconInfo = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
  </svg>
);
const IconList = () => (
  <svg width="14" height="14" viewBox="0 0 15 10" fill="none" stroke="currentColor" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.375.875H13.708M4.375 4.958H13.708M4.375 9.041H13.708M.875.875h.006M.875 4.958h.006M.875 9.041h.006"/>
  </svg>
);
const IconGraph = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M.583 8.458h3.5v5.25H.583V8.458ZM5.833 4.083h3.5v9.625h-3.5V4.083ZM11.083.583h3.5v13.125h-3.5V.583Z"/>
  </svg>
);

/* ── IndexedDonut ──────────────────────────────────────────── */
function IndexedDonut({ pct, label }) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <div className="som-donut">
      <svg width="96" height="96" viewBox="0 0 120 120" className="som-donut-svg">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="60" cy="60" r={radius}
          fill="none" stroke="#2563eb" strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="som-donut-inner">
        <span className="som-donut-pct">{pct}%</span>
        <span className="som-donut-lbl">{label}</span>
      </div>
    </div>
  );
}

/* ── SegmentedBar (stacked pills with gap) ─────────────────── */
function SegmentedBar({ segments }) {
  const visible = segments.filter(s => s.value > 0);
  const total = visible.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <div className="som-seg-bar">
      {visible.map(s => (
        <div key={s.key} className="som-seg-pill" style={{ width: `${(s.value / total) * 100}%`, background: s.color }} />
      ))}
    </div>
  );
}

/* ── SegmentedRatingBar (vital bar) ───────────────────────── */
const R_COLORS = ['#22c55e', '#eab308', '#ef4444'];

function SegmentedRatingBar({ activeIndex, fraction, weights, labels }) {
  return (
    <div>
      <div className="som-rating-track">
        {R_COLORS.map((color, i) => {
          if (i !== activeIndex) {
            return (
              <div key={i} className="som-rating-seg" style={{ flexGrow: weights[i], flexBasis: 0, background: color, opacity: 0.25 }} />
            );
          }
          return (
            <div
              key={i}
              className="som-rating-seg-active"
              style={{ flexGrow: weights[i], flexBasis: 0, outline: `2px solid ${color}`, outlineOffset: '1px' }}
            >
              <div style={{ flexGrow: fraction, flexBasis: 0, height: '40%', borderRadius: 99, background: color }} />
              <span className="som-rating-pin-wrap" aria-hidden="true">
                <span className="som-rating-pin" style={{ borderColor: color }} />
              </span>
              <div style={{ flexGrow: Math.max(0, 1 - fraction), flexBasis: 0, height: '40%', borderRadius: 99, background: color }} />
            </div>
          );
        })}
      </div>
      <div className="som-rating-labels">
        {labels.map((lbl, i) => (
          <span key={i} style={{
            flexGrow: weights[i], flexBasis: 0,
            color: i === activeIndex ? '#3F3F46' : '#9ca3af',
            fontWeight: i === activeIndex ? 600 : 400,
          }}>{lbl}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ────────────────────────────────────────── */
export default function SiteOverviewMockup() {
  const { t } = useLang();
  const d = t('siteOverviewMockup');

  const ratingLabels = [d.good, d.needsImprovementShort, d.poor];

  const crawlSegs = [
    { key: 'indexed',    value: 25, color: '#2563eb', label: d.indexed },
    { key: 'notIndexed', value: 75, color: '#d1d5db', label: d.notIndexed },
  ];
  const statusSegs = [
    { key: 'accessible', value: 32, color: '#1e3893', label: d.accessible },
    { key: 'redirecting',value:  4, color: '#f97316', label: d.redirecting },
    { key: 'blocked',    value:  0, color: '#fb923c', label: d.blocked },
    { key: 'error',      value: 64, color: '#ef4444', label: d.error },
    { key: 'missing',    value:  0, color: '#9ca3af', label: d.missing },
  ];
  // Displayed ranked by share (highest first), independent of the bar's
  // own left-to-right stacking order above.
  const statusList = [...statusSegs].sort((a, b) => b.value - a.value);

  return (
    <div className="som">

      {/* Browser chrome */}

      <div className="som-body">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="som-head">
          <div className="som-head-left">
            <h2 className="som-h2">{d.siteOverview}</h2>
            <div className="som-url-row">
              <a className="som-url" href="#">www.sony.com</a>
              <IconExternal />
              <span className="som-sep">·</span>
              <span className="som-brand">Sony</span>
            </div>
            <div className="som-meta-row">
              <IconRefresh />
              <IconCalendar />
              <span>{d.lastUpdate}</span>
              <span className="som-sep">·</span>
              <span>100/100 {d.pagesCrawled}</span>
            </div>
          </div>
          <div className="som-thumb">
            <img src="/sony_landingpage.png" alt="Sony landing page" className="som-thumb-img" />
          </div>
        </div>

        {/* ── Tabs + view toggle (same row) ────────────────── */}
        <div className="som-tab-row">
          <div className="som-tabs">
            <button className="som-tab som-tab-active">{d.tabOverview}</button>
            <button className="som-tab">{d.tabIssues}</button>
          </div>
          <div className="som-view-toggle">
            <button className="som-vt-btn som-vt-active" aria-pressed="true"><IconList /></button>
            <button className="som-vt-btn" aria-pressed="false"><IconGraph /></button>
          </div>
        </div>

        {/* ── Three columns ──────────────────────────────── */}
        <div className="som-cols">

          {/* Col 1 — Crawl & Indexation */}
          <div className="som-col som-col-1">
            <div className="som-col-head">
              <div className="som-col-head-text">
                <h3 className="som-col-title">{d.crawlTitle} <IconInfo /></h3>
                <p className="som-col-sub">{d.crawlSub}</p>
              </div>
              <span className="som-tone-badge som-tone-crit">{d.critical}</span>
            </div>
            <div className="som-col-body">
              <div className="som-crawl-row">
                <IndexedDonut pct={25} label={d.indexed} />
                <div className="som-crawl-aside">
                  <span className="som-crawl-big-num">36<span className="som-crawl-big-denom"> / 100</span></span>
                  <span className="som-crawl-big-sub">{d.pagesCrawledAndIndexed}</span>
                </div>
              </div>
              <SegmentedBar segments={crawlSegs} />
              <ul className="som-crawl-legend">
                {crawlSegs.map(s => (
                  <li key={s.key}>
                    <span className="som-legend-dot" style={{ background: s.color }} />
                    {s.label} {s.value}%
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 2 — Page Status */}
          <div className="som-col som-col-2">
            <div className="som-col-head">
              <div className="som-col-head-text">
                <h3 className="som-col-title">{d.statusTitle} <IconInfo /></h3>
                <p className="som-col-sub">{d.statusSub}</p>
              </div>
              <span className="som-tone-badge som-tone-crit">{d.critical}</span>
            </div>
            <div className="som-col-body">
              <SegmentedBar segments={statusSegs} />
              <ul className="som-status-list">
                {statusList.map(s => (
                  <li key={s.key} className="som-status-row">
                    <div className="som-status-left">
                      <span className="som-status-dot" style={{ background: s.color }} />
                      <span className="som-status-lbl">{s.label}</span>
                    </div>
                    <span className="som-pct-plain" style={{ color: s.color }}>{s.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 3 — Page Speed Insights */}
          <div className="som-col som-col-3">
            <div className="som-col-head">
              <div className="som-col-head-text">
                <h3 className="som-col-title">{d.speedTitle} <IconInfo /></h3>
                <p className="som-col-sub">{d.speedSub}</p>
                <p className="som-col-sub">{d.scoreCoverage.replace('{pct}', 33)}</p>
              </div>
            </div>
            <div className="som-col-body">
              <ul className="som-vitals">
                {/* LCP — Needs Improvement, fraction 0.8 */}
                <li className="som-vital">
                  <div className="som-vital-head">
                    <span className="som-vital-name-group">
                      <IconInfo />
                      <span className="som-vital-name">{d.lcp}</span>
                      <span className="som-vital-val">· 3.7 s</span>
                    </span>
                    <span className="som-vital-right">
                      <span className="som-vital-fraction">{d.goodOf.replace('{n}', 8).replace('{total}', 36)}</span>
                      <span className="som-vital-chip" style={{ background: '#fef2f2', color: '#ef4444' }}>{d.poor}</span>
                    </span>
                  </div>
                  <SegmentedRatingBar activeIndex={2} fraction={0.8} weights={[41.7, 25, 33.3]} labels={ratingLabels} />
                </li>
                {/* INP — Poor, fraction 1 */}
                <li className="som-vital">
                  <div className="som-vital-head">
                    <span className="som-vital-name-group">
                      <IconInfo />
                      <span className="som-vital-name">{d.inp}</span>
                      <span className="som-vital-val">· 818 ms</span>
                    </span>
                    <span className="som-vital-right">
                      <span className="som-vital-fraction">{d.goodOf.replace('{n}', 3).replace('{total}', 13)}</span>
                      <span className="som-vital-chip" style={{ background: '#fef2f2', color: '#ef4444' }}>{d.poor}</span>
                    </span>
                  </div>
                  <SegmentedRatingBar activeIndex={2} fraction={1} weights={[26.7, 40, 33.3]} labels={ratingLabels} />
                </li>
                {/* CLS — Good, fraction 0.4 */}
                <li className="som-vital">
                  <div className="som-vital-head">
                    <span className="som-vital-name-group">
                      <IconInfo />
                      <span className="som-vital-name">{d.cls}</span>
                      <span className="som-vital-val">· 0.040</span>
                    </span>
                    <span className="som-vital-right">
                      <span className="som-vital-fraction">{d.goodOf.replace('{n}', 31).replace('{total}', 36)}</span>
                      <span className="som-vital-chip" style={{ background: '#dcfce7', color: '#22c55e' }}>{d.good}</span>
                    </span>
                  </div>
                  <SegmentedRatingBar activeIndex={0} fraction={0.4} weights={[26.7, 40, 33.3]} labels={ratingLabels} />
                </li>
              </ul>
              <a href="#" className="som-see-more">{d.seeMore} →</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
