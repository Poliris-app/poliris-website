import { useEffect, useRef } from 'react';
import { useLang } from '../contexts/LangContext';

/* ================================================================
   KPI STRIP — "Poliris in numbers", right below the hero film: one ruled
   row per figure, label and the film's blue tick on the left, what it counts
   in the middle, the number on the right. No card — the rules do the work,
   and the rows echo the tables in the product shot above.
   The numbers count up when the block comes into view. With the RPC set,
   they come live from the platform (polled, ticking up between polls);
   without it, or if the call fails, the fallback below is
   shown. Off poliris.io with no RPC set, small increments are simulated so
   the ticking can be reviewed — never on the real site.
   ================================================================ */
// Prod: VITE_SUPABASE_URL=https://fnltrvsggbusktwxoauj.supabase.co and the
// prod publishable (anon) key. The key only reaches get_public_stats().
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/+$/, '');
const RPC_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
const RPC_URL = SUPABASE_URL && RPC_KEY ? `${SUPABASE_URL}/rest/v1/rpc/get_public_stats` : '';
const POLL_MS = 30000;
// The entrance: each row rises ROW_STAGGER ms after the one above it (the
// same step as --i in poliris.css), and its numbers start counting
// COUNT_DELAY ms into that, for COUNT_MS.
const ROW_STAGGER = 140;
const COUNT_DELAY = 260;
const COUNT_MS = 3500;
// How hard the count slows down at the end (ease-out power). 2.5 keeps the
// numbers visibly climbing: about 58% shown at 1s and 88% at 2s, then a
// gentle landing. (4 raced: 94% shown after the first second.)
const EASE_POWER = 2.5;
// Which row each figure sits in, so it counts on its row's beat.
const ROW_OF = { brands: 0, countries: 0, offers: 0, ai_answers: 1, technical_checks: 2, pages_crawled: 2 };

// Exact values on 27 Oct 2026, shown if the live call fails
const FALLBACK = { brands: 261, countries: 32, offers: 946, ai_answers: 8858, technical_checks: 4041945, pages_crawled: 47048 };

// The blue tick of the film's finished steps, in its round badge.
const CHECK = (
  <span className="pl-stat__badge" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
  </span>
);

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
  //
  // Entrance: the section is "armed" (rows hidden, numbers at 0) as soon as
  // JS runs, and plays when the sheet scrolls into view: the rows rise one
  // after the other (CSS, .pl-stats--armed / .is-in), and each row's numbers
  // count up on the same beat. The live figures are asked for on mount, so
  // they are usually in by then; if they come late, the count glides on to
  // them instead of starting again. Without JS the server-rendered fallback
  // numbers simply show; with reduced motion they land without counting.
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
    const want = {};    // value each key is heading to
    const anim = {};    // the animation that owns each key
    const timers = [];
    let poll = 0;
    let gone = false;

    function paint(key, v) {
      shown[key] = v;
      const txt = Math.round(v).toLocaleString(locale);
      (els[key] || []).forEach((el) => { el.textContent = txt; });
    }

    // Count `key` from where it stands to want[key] over `dur` ms, after
    // `delay` ms (the target is read when it starts, so a late live figure
    // set before then is picked up). Eased for the entrance; linear for the
    // live ticking, so a burst of new checks reads as a steady count.
    // Decreases (hourly reconciliation) land at once.
    function animateTo(key, dur, ease, delay = 0) {
      const id = {};
      anim[key] = id;
      const begin = () => {
        if (gone || anim[key] !== id) return;
        const from = shown[key] ?? 0;
        const target = want[key];
        if (reduce || target <= from) { paint(key, target); return; }
        const start = performance.now();
        (function tick(now) {
          if (gone || anim[key] !== id) return;
          const p = Math.min(1, (now - start) / dur);
          const e = ease ? 1 - (1 - p) ** EASE_POWER : p;
          paint(key, Math.floor(from + (target - from) * e));
          if (p < 1) requestAnimationFrame(tick); else paint(key, target);
        })(start);
      };
      if (delay > 0) timers.push(setTimeout(begin, delay)); else begin();
    }

    const isPreview = !RPC_URL && !/(^|\.)poliris\.io$/.test(location.hostname);
    const demo = { ...FALLBACK };
    function demoStats() {
      demo.ai_answers += Math.floor(Math.random() * 6);
      demo.technical_checks += 200 + Math.floor(Math.random() * 600);
      demo.pages_crawled += Math.floor(Math.random() * 5);
      return Promise.resolve({ ...demo });
    }
    const load = () => (isPreview ? demoStats() : fetchStats());
    const keys = (data) => Object.keys(els).filter((k) => typeof data?.[k] === 'number');

    function startPolling() {
      poll = setInterval(() => {
        if (document.hidden) return;
        load().then((live) => {
          if (gone || !live) return;
          keys(live).forEach((k) => { want[k] = live[k]; animateTo(k, POLL_MS, false); });
        });
      }, POLL_MS);
    }

    const firstData = load();   // asked for now, used when the sheet shows
    const entered = root.classList.contains('is-in'); // a language switch re-runs this

    if (reduce || entered) {
      // No entrance: show the figures as they are, then keep them live.
      Object.keys(els).forEach((k) => { want[k] = shown[k] ?? FALLBACK[k]; });
      firstData.then((live) => {
        if (gone) return;
        keys(live || FALLBACK).forEach((k) => { want[k] = (live || FALLBACK)[k]; paint(k, want[k]); });
        if (live) startPolling();
      });
      return () => { gone = true; timers.forEach(clearTimeout); clearInterval(poll); };
    }

    root.classList.add('pl-stats--armed');
    Object.keys(els).forEach((k) => paint(k, 0));

    function play() {
      root.classList.add('is-in');
      const early = Promise.race([firstData, new Promise((r) => { timers.push(setTimeout(() => r(null), 700)); })]);
      early.then((data) => {
        if (gone) return;
        const first = data || FALLBACK;
        keys(first).forEach((k) => {
          want[k] = first[k];
          animateTo(k, COUNT_MS, true, COUNT_DELAY + (ROW_OF[k] ?? 0) * ROW_STAGGER);
        });
        firstData.then((live) => {
          if (gone || !live) return;
          // Came after the count started: glide on to the live figures.
          if (!data) keys(live).forEach((k) => { want[k] = live[k]; if (shown[k] > 0) animateTo(k, 1400, true); });
          startPolling();
        });
      });
    }

    let io = null;
    const sheet = root.querySelector('.pl-sheet') || root;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        if (!entries.some((en) => en.isIntersecting)) return;
        io.disconnect();
        play();
      }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
      io.observe(sheet);
    } else play();

    return () => {
      gone = true;
      io?.disconnect();
      timers.forEach(clearTimeout);
      clearInterval(poll);
    };
  }, [locale]);

  const stats = [
    {
      key: 'brands', label: d.brands.label, desc: d.brands.desc,
      meta: [
        <li key="countries"><span data-stat="countries">{fmt('countries')}</span> {d.brands.countries}</li>,
        <li key="offers"><span data-stat="offers">{fmt('offers')}</span> {d.brands.offers}</li>,
      ],
    },
    {
      key: 'ai_answers', label: d.answers.label, desc: d.answers.desc,
      meta: d.answers.chips.map((c) => <li key={c}>{c}</li>),
    },
    {
      key: 'technical_checks', label: d.checks.label,
      desc: <>{d.checks.descBefore} <span data-stat="pages_crawled">{fmt('pages_crawled')}</span> {d.checks.descAfter}</>,
      meta: d.checks.chips.map((c) => <li key={c}>{c}</li>),
    },
  ];
  const value = (k) => <span data-stat={k}>{fmt(k)}</span>;

  return (
    <section className="pl-stats" aria-labelledby="pl-stats-title" ref={rootRef}>
      <div className="pl-stats__inner">
        <div className="pl-stats__head reveal">
          <h2 className="pl-stats__title" id="pl-stats-title">{d.h2Pre} {d.h2Hl}</h2>
          <p className="pl-stats__lead">{d.lead}</p>
        </div>

        <dl className="pl-sheet">
          {stats.map((s, i) => (
            <div className="pl-sheet__row" key={s.key} style={{ '--i': i }}>
              <dt className="pl-sheet__label">{CHECK}<span>{s.label}</span></dt>
              <dd className="pl-sheet__body">
                <p className="pl-sheet__desc">{s.desc}</p>
                <ul className="pl-dotlist">{s.meta}</ul>
              </dd>
              <dd className="pl-sheet__value">{value(s.key)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
