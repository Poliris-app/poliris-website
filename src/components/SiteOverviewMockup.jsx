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
const IconStar = () => (
  <svg className="som-insight-icon" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
    <path d="M327.5 85.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 128l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 128l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 74.8 426.8 18.3C425.1 13.8 420.8 11 416 11s-9.1 3-10.8 7.5L384 74.8l-56.5 21.2zM205.1 73.3c-2.6-5.7-8.3-9.3-14.5-9.3s-11.9 3.6-14.5 9.3L123.5 187.4 9.3 240c-5.7 2.6-9.3 8.3-9.3 14.5s3.6 11.9 9.3 14.5l114.1 52.6L176.1 435c2.6 5.7 8.3 9.3 14.5 9.3s11.9-3.6 14.5-9.3l52.6-114.1 114.1-52.6c5.7-2.6 9.3-8.3 9.3-14.5s-3.6-11.9-9.3-14.5L257.7 187.4 205.1 73.3zM384 374.8l-56.5 21.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L448 438.8l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 438.8l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 374.8l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L384 374.8z" />
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
function IndexedDonut({ pct }) {
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
        <span className="som-donut-lbl">Indexed</span>
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

/* ── PerformanceGauge (40×40 compact) ─────────────────────── */
function PerformanceGauge({ score }) {
  const size = 40, sw = 4, r = (size - sw) / 2;
  const C = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, Math.round(score)));
  const offset = C * (1 - v / 100);
  const stroke = v >= 90 ? '#16A34A' : v >= 50 ? '#F59E0B' : '#EF4444';
  const textColor = v >= 90 ? '#16A34A' : v >= 50 ? '#B45309' : '#DC2626';
  return (
    <div className="som-perf-gauge">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF0F3" strokeWidth={sw} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={stroke} strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="som-perf-num" style={{ color: textColor }}>{v}</span>
    </div>
  );
}

/* ── SegmentedRatingBar (vital bar) ───────────────────────── */
const R_COLORS = ['#22c55e', '#eab308', '#ef4444'];
const R_LABELS = ['Good', 'Needs Improv.', 'Poor'];

function SegmentedRatingBar({ activeIndex, fraction, weights }) {
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
              style={{ flexGrow: weights[i], flexBasis: 0, outline: `2px solid ${color}`, outlineOffset: '2px' }}
            >
              <div style={{ flexGrow: fraction, flexBasis: 0, height: '100%', borderRadius: 99, background: color }} />
              <span className="som-rating-pin-wrap" aria-hidden="true">
                <span className="som-rating-pin" style={{ borderColor: color }} />
              </span>
              <div style={{ flexGrow: Math.max(0, 1 - fraction), flexBasis: 0, height: '100%', borderRadius: 99, background: color }} />
            </div>
          );
        })}
      </div>
      <div className="som-rating-labels">
        {R_LABELS.map((lbl, i) => (
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

  const crawlSegs = [
    { key: 'indexed',    value: 25, color: '#2563eb', label: d.indexed },
    { key: 'notIndexed', value: 75, color: '#ef4444', label: d.notIndexed },
  ];
  const statusSegs = [
    { key: 'accessible', value: 32, color: '#1e3893', label: d.accessible, bg: '#dbeafe', fg: '#1e40af' },
    { key: 'redirecting',value:  4, color: '#f97316', label: d.redirecting, bg: '#ffedd5', fg: '#9a3412' },
    { key: 'blocked',    value:  0, color: '#fb923c', label: d.blocked,     bg: '#ffedd5', fg: '#9a3412' },
    { key: 'error',      value: 64, color: '#ef4444', label: d.error,       bg: '#fee2e2', fg: '#991b1b' },
  ];

  return (
    <div className="som">

      {/* Browser chrome */}
      <div className="som-chrome">
        <span className="som-dot som-dot-r" />
        <span className="som-dot som-dot-y" />
        <span className="som-dot som-dot-g" />
        <span className="som-chrome-label">Poliris · {d.tabTechnical}</span>
      </div>

      <div className="som-body">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="som-head">
          <div className="som-head-left">
            <h2 className="som-h2">{d.siteOverview}</h2>
            <div className="som-url-row">
              <a className="som-url" href="#">www.nike.com</a>
              <IconExternal />
              <span className="som-sep">·</span>
              <span className="som-brand">Nike</span>
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
            <img src="/nike_landingpage.png" alt="Nike landing page" className="som-thumb-img" />
          </div>
        </div>

        {/* ── Tabs ───────────────────────────────────────── */}
        <div className="som-tab-row">
          <div className="som-tabs">
            <button className="som-tab som-tab-active">{d.tabOverview}</button>
            <button className="som-tab">{d.tabIssues}</button>
            <button className="som-tab">{d.tabViz}</button>
          </div>
        </div>

        {/* ── AI Insight ─────────────────────────────────── */}
        <div className="som-insight">
          <IconStar />
          <div className="som-insight-body">
            <p className="som-insight-title">{d.poliAiInsight}</p>
            <p className="som-insight-text">{d.insightText}</p>
          </div>
        </div>

        {/* ── View toggle (above columns, right-aligned) ── */}
        <div className="som-controls">
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
                <IndexedDonut pct={25} />
                <div className="som-crawl-aside">
                  <span className="som-crawl-lbl">100 {d.pagesOf} 100 {d.pagesCrawledShort}</span>
                  <SegmentedBar segments={crawlSegs} />
                  <ul className="som-crawl-legend">
                    {crawlSegs.map(s => (
                      <li key={s.key}>
                        <span className="som-legend-dot" style={{ background: s.color }} />
                        {s.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="som-hint-box">
                <p className="som-hint-text">{d.crawlDesc}</p>
                <button className="som-ask-btn">{d.askPoli}</button>
              </div>
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
                {statusSegs.map(s => (
                  <li key={s.key} className="som-status-row">
                    <div className="som-status-left">
                      <span className="som-status-dot" style={{ background: s.color }} />
                      <span className="som-status-lbl">{s.label}</span>
                    </div>
                    <span className="som-pct-chip" style={{ background: s.bg, color: s.fg }}>{s.value}%</span>
                  </li>
                ))}
              </ul>
              <div className="som-hint-box">
                <p className="som-hint-text">{d.statusDesc}</p>
                <button className="som-ask-btn">{d.askPoli}</button>
              </div>
            </div>
          </div>

          {/* Col 3 — Page Speed Insights */}
          <div className="som-col som-col-3">
            <div className="som-col-head">
              <div className="som-col-head-text">
                <h3 className="som-col-title">{d.speedTitle} <IconInfo /></h3>
                <p className="som-col-sub">{d.speedSub}</p>
              </div>
              <PerformanceGauge score={70} />
            </div>
            <div className="som-col-body">
              <ul className="som-vitals">
                {/* LCP — Needs Improvement, fraction 0.8 */}
                <li className="som-vital">
                  <div className="som-vital-head">
                    <span className="som-vital-name">{d.lcp}</span>
                    <span className="som-vital-val">· 3.7 s</span>
                    <span className="som-vital-chip" style={{ background: '#fefce8', color: '#eab308' }}>{d.needsImprovement}</span>
                  </div>
                  <SegmentedRatingBar activeIndex={1} fraction={0.8} weights={[41.7, 25, 33.3]} />
                </li>
                {/* INP — Poor, fraction 1 */}
                <li className="som-vital">
                  <div className="som-vital-head">
                    <span className="som-vital-name">{d.inp}</span>
                    <span className="som-vital-val">· 818 ms</span>
                    <span className="som-vital-chip" style={{ background: '#fef2f2', color: '#ef4444' }}>{d.poor}</span>
                  </div>
                  <SegmentedRatingBar activeIndex={2} fraction={1} weights={[26.7, 40, 33.3]} />
                </li>
                {/* CLS — Good, fraction 0.4 */}
                <li className="som-vital">
                  <div className="som-vital-head">
                    <span className="som-vital-name">{d.cls}</span>
                    <span className="som-vital-val">· 0.040</span>
                    <span className="som-vital-chip" style={{ background: '#dcfce7', color: '#22c55e' }}>{d.good}</span>
                  </div>
                  <SegmentedRatingBar activeIndex={0} fraction={0.4} weights={[26.7, 40, 33.3]} />
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
