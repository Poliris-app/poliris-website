import { useEffect, useRef } from 'react';
import { useLang } from '../contexts/LangContext';

/* ================================================================
   KPI CARDS — "Poliris in numbers", before the Platform section.
   The numbers count up when the block comes into view. With the RPC set,
   they come live from the platform (polled, ticking up between polls);
   without it, or if the call fails, the fallback below is
   shown. Off poliris.io with no RPC set, small increments are simulated so
   the ticking can be reviewed — never on the real site.
   ================================================================ */
const RPC_URL = '';   // "https://fnltrvsggbusktwxoauj.supabase.co/rest/v1/rpc/get_public_stats"
const RPC_KEY = '';   // Supabase publishable (anon) key
const POLL_MS = 30000;

// Exact values on 27 Oct 2026, shown if the live call fails
const FALLBACK = { brands: 261, countries: 32, offers: 946, ai_answers: 8858, technical_checks: 4041945, pages_crawled: 47048 };

const ICONS = {
  brands: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" /><circle cx="7.5" cy="7.5" r="1.5" /></svg>
  ),
  answers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 9h8M8 13h5" /></svg>
  ),
  checks: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
  ),
};

function fetchStats() {
  if (!RPC_URL) return Promise.resolve(null);
  return fetch(RPC_URL, {
    method: 'POST',
    headers: { apikey: RPC_KEY, Authorization: `Bearer ${RPC_KEY}`, 'Content-Type': 'application/json' },
    body: '{}',
  }).then((r) => (r.ok ? r.json() : null))
    .catch(() => null);
}

export default function KpiStats() {
  const { t, lang } = useLang();
  const d = t('home.kpi');
  const rootRef = useRef(null);
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
  const fmt = (k) => FALLBACK[k].toLocaleString(locale);

  // The counting writes the numbers straight into their spans, as the
  // original block did: a 30s tick on six numbers stays out of React.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const els = {};
    root.querySelectorAll('[data-stat]').forEach((el) => {
      const k = el.getAttribute('data-stat');
      (els[k] = els[k] || []).push(el);
    });
    const shown = {};   // value currently displayed, per key
    const anim = {};    // running animation, per key
    let raf = 0;
    let timer = 0;
    let gone = false;

    function paint(key, v) {
      shown[key] = v;
      const txt = Math.round(v).toLocaleString(locale);
      (els[key] || []).forEach((el) => { el.textContent = txt; });
    }

    // Increases tick up over `dur` ms (linear, so a burst of new checks reads
    // as a steady count). Decreases (hourly reconciliation) land at once.
    function animateTo(key, target, dur, ease) {
      const from = shown[key];
      if (from === undefined || reduce || target <= from) { paint(key, target); return; }
      const start = performance.now();
      const id = {};
      anim[key] = id;
      (function tick(now) {
        if (gone || anim[key] !== id) return;
        const p = Math.min(1, (now - start) / dur);
        const e = ease ? 1 - (1 - p) ** 3 : p;
        paint(key, Math.floor(from + (target - from) * e));
        if (p < 1) raf = requestAnimationFrame(tick); else paint(key, target);
      })(start);
    }

    const isPreview = !RPC_URL && !/(^|\.)poliris\.io$/.test(location.hostname);
    const demo = { ...FALLBACK };
    function demoStats() {
      demo.ai_answers += Math.floor(Math.random() * 6);
      demo.technical_checks += 200 + Math.floor(Math.random() * 600);
      demo.pages_crawled += Math.floor(Math.random() * 5);
      return Promise.resolve({ ...demo });
    }

    function update(first) {
      return (isPreview ? demoStats() : fetchStats()).then((live) => {
        if (gone) return false;
        const data = live || FALLBACK;
        Object.keys(els).forEach((k) => {
          if (typeof data[k] !== 'number') return;
          if (first) { shown[k] = 0; animateTo(k, data[k], 1600, true); }
          else animateTo(k, data[k], POLL_MS, false);
        });
        return !!live;
      });
    }

    function start() {
      update(true).then((isLive) => {
        if (!isLive || gone) return;
        timer = setInterval(() => { if (!document.hidden) update(false); }, POLL_MS);
      });
    }

    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        start();
      }, { threshold: 0.3 });
      io.observe(root);
    } else start();

    return () => {
      gone = true;
      io?.disconnect();
      cancelAnimationFrame(raf);
      clearInterval(timer);
    };
  }, [locale]);

  return (
    <section className="pl-stats" aria-labelledby="pl-stats-title" ref={rootRef}>
      <div className="pl-stats__inner">
        {/* The landing's own section header: eyebrow, heading with the
            second line highlighted, lead below (Eyebrow / HL in LandingPage). */}
        <div className="sec-head reveal">
          <div className="eyebrow">{d.eyebrow}</div>
          <h2 className="sec-h2" id="pl-stats-title">{d.h2Pre}<br /><span className="hl">{d.h2Hl}</span></h2>
          <p className="sec-lead">{d.lead}</p>
        </div>

        <div className="pl-stats__grid">
          <article className="pl-card">
            <div className="pl-card__icon" aria-hidden="true">{ICONS.brands}</div>
            <p className="pl-card__value"><span data-stat="brands">{fmt('brands')}</span></p>
            <h3 className="pl-card__label">{d.brands.label}</h3>
            <p className="pl-card__desc">{d.brands.desc}</p>
            <div className="pl-card__foot">
              <span className="pl-chip"><span data-stat="countries">{fmt('countries')}</span> {d.brands.countries}</span>
              <span className="pl-chip"><span data-stat="offers">{fmt('offers')}</span> {d.brands.offers}</span>
            </div>
          </article>

          <article className="pl-card">
            <div className="pl-card__icon" aria-hidden="true">{ICONS.answers}</div>
            <p className="pl-card__value"><span data-stat="ai_answers">{fmt('ai_answers')}</span></p>
            <h3 className="pl-card__label">{d.answers.label}</h3>
            <p className="pl-card__desc">{d.answers.desc}</p>
            <div className="pl-card__foot">
              {d.answers.chips.map((c) => <span key={c} className="pl-chip">{c}</span>)}
            </div>
          </article>

          <article className="pl-card">
            <div className="pl-card__icon" aria-hidden="true">{ICONS.checks}</div>
            <p className="pl-card__value"><span data-stat="technical_checks">{fmt('technical_checks')}</span></p>
            <h3 className="pl-card__label">{d.checks.label}</h3>
            <p className="pl-card__desc">
              {d.checks.descBefore} <span data-stat="pages_crawled">{fmt('pages_crawled')}</span> {d.checks.descAfter}
            </p>
            <div className="pl-card__foot">
              {d.checks.chips.map((c) => <span key={c} className="pl-chip">{c}</span>)}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
