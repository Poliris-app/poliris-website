import { useLang } from '../contexts/LangContext';
import '../site-overview-mockup.css';

function DonutChart({ pct, color = '#1e3893', bg = '#e5e7eb' }) {
  const r = 38;
  const C = 2 * Math.PI * r;
  const dash = C * (pct / 100);
  return (
    <svg className="som-donut" viewBox="0 0 92 92" width="92" height="92">
      <circle cx="46" cy="46" r={r} fill="none" stroke={bg} strokeWidth="10" />
      <circle
        cx="46" cy="46" r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeDasharray={`${dash} ${C - dash}`}
        strokeDashoffset={C * 0.25}
        strokeLinecap="round"
      />
      <text x="46" y="41" textAnchor="middle" fontSize="17" fontWeight="800" fill="#111827">{pct}%</text>
      <text x="46" y="57" textAnchor="middle" fontSize="10.5" fill="#6b7280" fontWeight="500">Indexed</text>
    </svg>
  );
}

function ScoreRing({ score }) {
  const r = 24;
  const C = 2 * Math.PI * r;
  const dash = C * (score / 100);
  const color = score >= 90 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
  return (
    <svg viewBox="0 0 60 60" width="56" height="56">
      <circle cx="30" cy="30" r={r} fill="none" stroke="#e5e7eb" strokeWidth="5.5" />
      <circle
        cx="30" cy="30" r={r}
        fill="none"
        stroke={color}
        strokeWidth="5.5"
        strokeDasharray={`${dash} ${C}`}
        strokeDashoffset={C * 0.25}
        strokeLinecap="round"
      />
      <text x="30" y="35" textAnchor="middle" fontSize="15" fontWeight="800" fill="#111827">{score}</text>
    </svg>
  );
}

function VitalsBar({ position }) {
  return (
    <div className="som-vbar">
      <div className="som-vbar-track">
        <div className="som-vbar-g" />
        <div className="som-vbar-f" />
        <div className="som-vbar-p" />
      </div>
      <div className="som-vbar-pin" style={{ left: `${position}%` }} />
    </div>
  );
}

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
const IconExternalLink = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#1e3893" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H5.5M9.5 2.5V6.5"/>
  </svg>
);
const IconList = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconBars = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="12" width="4" height="9"/><rect x="10" y="6" width="4" height="15"/><rect x="17" y="3" width="4" height="18"/>
  </svg>
);
const IconStar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#3b82f6" aria-hidden="true">
    <path d="M12 3l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);

export default function SiteOverviewMockup() {
  const { t } = useLang();
  const d = t('siteOverviewMockup');

  return (
    <div className="som">
      {/* Browser chrome */}
      <div className="som-chrome">
        <span className="som-dot som-dot-r" />
        <span className="som-dot som-dot-y" />
        <span className="som-dot som-dot-g" />
        <span className="som-chrome-label">Poliris · {d.tabTechnical}</span>
      </div>

      {/* Page body */}
      <div className="som-body">

        {/* ── Header ───────────────────────────────────────── */}
        <div className="som-head">
          <div className="som-head-left">
            <h2 className="som-h2">{d.siteOverview}</h2>
            <div className="som-url-row">
              <a className="som-url" href="#">www.nike.com</a>
              <IconExternalLink />
              <span className="som-sep">·</span>
              <span className="som-brand">Nike</span>
            </div>
            <div className="som-meta-row">
              <IconRefresh />
              <span>{d.lastUpdate}</span>
              <span className="som-sep">·</span>
              <IconCalendar />
              <span>100/100 {d.pagesCrawled}</span>
            </div>
          </div>
          <div className="som-thumb">
            <div className="som-thumb-inner">
              <div className="som-thumb-nav" />
              <div className="som-thumb-hero" />
              <div className="som-thumb-rows">
                <div /><div /><div />
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs + view toggle ───────────────────────────── */}
        <div className="som-tab-row">
          <div className="som-tabs">
            <button className="som-tab som-tab-active">{d.tabOverview}</button>
            <button className="som-tab">{d.tabIssues}</button>
            <button className="som-tab">{d.tabViz}</button>
          </div>
          <div className="som-view-btns">
            <button className="som-view-btn"><IconList /></button>
            <button className="som-view-btn"><IconBars /></button>
          </div>
        </div>

        {/* ── Poli AI Insight ──────────────────────────────── */}
        <div className="som-insight">
          <div className="som-insight-title">
            <IconStar />
            <strong>Poli AI Insight</strong>
          </div>
          <p className="som-insight-text">{d.insightText}</p>
        </div>

        {/* ── Cards ────────────────────────────────────────── */}
        <div className="som-cards">

          {/* Card 1 — Crawl & Indexation */}
          <div className="som-card">
            <div className="som-card-top">
              <div className="som-card-title-row">
                <span className="som-card-title">{d.crawlTitle}</span>
                <span className="som-iicon">ⓘ</span>
              </div>
              <span className="som-badge som-badge-crit">{d.critical}</span>
            </div>
            <p className="som-card-sub">{d.crawlSub}</p>

            <div className="som-card-viz">
              <div className="som-donut-row">
                <DonutChart pct={25} color="#1e3893" bg="#e5e7eb" />
                <div className="som-donut-aside">
                  <span className="som-pages-label">100 {d.pagesOf} 100 {d.pagesCrawledShort}</span>
                  <div className="som-mini-bar">
                    <div style={{ width: '25%', background: '#1e3893' }} />
                    <div style={{ width: '75%', background: '#ef4444' }} />
                  </div>
                  <div className="som-legend">
                    <span><em style={{ background: '#1e3893' }} />{d.indexed}</span>
                    <span><em style={{ background: '#ef4444' }} />{d.notIndexed}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="som-card-foot">
              <p className="som-foot-text">{d.crawlDesc}</p>
              <button className="som-ask-btn">{d.askPoli}</button>
            </div>
          </div>

          {/* Card 2 — Page Status */}
          <div className="som-card">
            <div className="som-card-top">
              <div className="som-card-title-row">
                <span className="som-card-title">{d.statusTitle}</span>
                <span className="som-iicon">ⓘ</span>
              </div>
              <span className="som-badge som-badge-crit">{d.critical}</span>
            </div>
            <p className="som-card-sub">{d.statusSub}</p>

            <div className="som-card-viz">
              <div className="som-status-bar">
                <div style={{ width: '32%', background: '#1e3893', borderRadius: '4px 0 0 4px' }} />
                <div style={{ width: '4%',  background: '#f97316' }} />
                <div style={{ width: '64%', background: '#ef4444', borderRadius: '0 4px 4px 0' }} />
              </div>
              <div className="som-status-list">
                <div className="som-status-row">
                  <span className="som-dot-sm" style={{ background: '#1e3893' }} />
                  <span className="som-status-lbl">{d.accessible}</span>
                  <span className="som-pct-pill som-pct-blue">100%</span>
                </div>
                <div className="som-status-row">
                  <span className="som-dot-sm" style={{ background: '#f97316' }} />
                  <span className="som-status-lbl">{d.redirecting}</span>
                  <span className="som-pct-pill som-pct-orange">4%</span>
                </div>
                <div className="som-status-row">
                  <span className="som-dot-sm" style={{ background: '#fb923c' }} />
                  <span className="som-status-lbl">{d.blocked}</span>
                  <span className="som-pct-pill som-pct-orange">0%</span>
                </div>
                <div className="som-status-row">
                  <span className="som-dot-sm" style={{ background: '#ef4444' }} />
                  <span className="som-status-lbl">{d.error}</span>
                  <span className="som-pct-pill som-pct-red">64%</span>
                </div>
              </div>
            </div>

            <div className="som-card-foot">
              <p className="som-foot-text">{d.statusDesc}</p>
              <button className="som-ask-btn">{d.askPoli}</button>
            </div>
          </div>

          {/* Card 3 — Page Speed Insights */}
          <div className="som-card">
            <div className="som-card-top">
              <div className="som-card-title-row">
                <span className="som-card-title">{d.speedTitle}</span>
                <span className="som-iicon">ⓘ</span>
              </div>
              <ScoreRing score={70} />
            </div>
            <p className="som-card-sub">{d.speedSub}</p>

            <div className="som-card-viz som-cwv">
              <div className="som-cwv-item">
                <div className="som-cwv-head">
                  <span className="som-iicon">ⓘ</span>
                  <span className="som-cwv-name">{d.lcp}</span>
                  <span className="som-cwv-val">· 3.7 s</span>
                  <span className="som-chip som-chip-fair">{d.needsImprovement}</span>
                </div>
                <VitalsBar position={59} />
                <div className="som-cwv-labels">
                  <span>{d.good}</span><span>{d.needsImprovementShort}</span><span>{d.poor}</span>
                </div>
              </div>

              <div className="som-cwv-item">
                <div className="som-cwv-head">
                  <span className="som-iicon">ⓘ</span>
                  <span className="som-cwv-name">{d.inp}</span>
                  <span className="som-cwv-val">· 818 ms</span>
                  <span className="som-chip som-chip-poor">{d.poor}</span>
                </div>
                <VitalsBar position={87} />
                <div className="som-cwv-labels">
                  <span>{d.good}</span><span>{d.needsImprovementShort}</span><span>{d.poor}</span>
                </div>
              </div>

              <div className="som-cwv-item">
                <div className="som-cwv-head">
                  <span className="som-iicon">ⓘ</span>
                  <span className="som-cwv-name">{d.cls}</span>
                  <span className="som-cwv-val">· 0.040</span>
                  <span className="som-chip som-chip-good">{d.good}</span>
                </div>
                <VitalsBar position={13} />
                <div className="som-cwv-labels">
                  <span>{d.good}</span><span>{d.needsImprovementShort}</span><span>{d.poor}</span>
                </div>
              </div>
            </div>

            <a href="#" className="som-see-more">{d.seeMore} →</a>
          </div>

        </div>
      </div>
    </div>
  );
}
