import { clamp, easeOut, easeInOut, easeBack, smoothPath, yAt } from './heroWindowUtils';

/* Visibility — 9.5s loop, ported from the reference.
   Act 1 checks four AI answers one by one, a scan band following the row
   under test; the third comes back "Not found" and flips to "Now #2" at
   2.9s. Act 2 rolls the list up and draws the share-of-AI-chats curve. */

export const VIS_CYCLE = 9500;

const YOU = [18, 23, 31, 42, 55, 69, 82];
const RIVAL = [50, 52, 51, 49, 47, 46, 44];
const QUESTIONS = [
  ['best noise cancelling earbuds', true],
  ['earbuds for flights', true],
  ['long battery earbuds', false],
  ['wireless earbuds for running', true],
];

const YOU_PATH = smoothPath(YOU);
const YOU_AREA = `${YOU_PATH} L294 100 L6 100 Z`;
const RIVAL_PATH = smoothPath(RIVAL);

// Where the two series finish, as a percentage down the chart box.
const END_Y = 95 - 82 * 0.74;
const COMP_Y = 95 - 44 * 0.74;

export default function WinVisibility({ now }) {
  const te = now % VIS_CYCLE;
  const cycle = Math.floor(now / VIS_CYCLE);
  // At the top of every later loop the chart is still on screen and fades
  // out while the questions fade back in.
  const carry = cycle > 0 && te < 900;
  const ec = easeOut((te - 350) / 500);
  const cOut = easeOut(te / 350);

  let mentions = 0;
  const rows = QUESTIONS.map(([q, ok], i) => {
    const t0 = 500 + i * 550;
    const flip = !ok && te >= 2900;
    const yes = ok || flip;
    const k = (te - t0) / 320;
    const kf = (te - 2900) / 320;
    if (te >= t0 && yes) mentions++;
    return {
      q,
      label: yes ? (flip ? '✓ Now #2' : '✓ Mentioned') : 'Not found',
      bg: yes ? '#EAF2FF' : '#F3F5F8',
      color: yes ? '#1d4ed8' : '#8a94a6',
      o: easeOut(k),
      ro: easeOut((te - 100 - i * 90) / 300),
      s: flip && kf < 1 ? 0.7 + 0.3 * easeBack(kf) : k < 0 ? 0.7 : 0.7 + 0.3 * easeBack(k),
    };
  });

  const scanRow = te < 2900 ? Math.min(3, Math.max(0, Math.floor((te - 350) / 550))) : 2;
  const rollUp = easeInOut((te - 3600) / 550);
  const chartIn = easeOut((te - 4100) / 400);
  const draw = easeInOut(clamp((te - 4300) / 2400));
  const headY = yAt(YOU, draw * 6);
  const headVal = (95 - headY) / 0.74;
  const endK = (te - 6750) / 380;
  const targetK = (te - 3950) / 380;
  const targetO = carry ? 1 - cOut : easeOut(targetK);
  const pulse = (now % 1400) / 1400;

  const qOpacity = (carry ? ec : 1) * (1 - rollUp);
  const qScale = (carry ? 0.97 + 0.03 * ec : 1) * (1 - 0.85 * rollUp);
  const cO = carry ? 1 - cOut : chartIn;
  const cY = carry ? -6 * cOut : (1 - chartIn) * 6;
  const reveal = carry ? 294 : te < 4300 ? 0 : 6 + 288 * draw;
  const delta = carry ? 64 : te < 4300 ? 0 : Math.max(0, Math.round(headVal - 18));
  const endO = carry
    ? 1 - cOut
    : te < 6750
      ? easeOut((te - 4050) / 300) * clamp((4500 - te) / 250) + (te > 6750 ? 1 : 0)
      : easeOut(endK);

  return (
    <div className="hfw__body">
      {/* Act 1 — the four answers being checked */}
      <div className="hfw-vis__act" style={{ opacity: qOpacity, transform: `scale(${qScale})`, transformOrigin: '92% 42%' }}>
        <div className="hfw__row hfw__row--between">
          <div className="hfw__stack">
            <span className="hfw__title">AI answers checked</span>
            <span className="hfw__sub">Do they mention you?</span>
          </div>
          <span
            className="hfw__pill hfw__pill--num"
            style={{ background: mentions === 4 ? '#DCFCE7' : '#EEF4FF', color: mentions === 4 ? '#15803d' : '#0047b8' }}
          >
            {mentions}/4 mention you
          </span>
        </div>

        <div className="hfw-vis__rows">
          <span
            className="hfw-vis__scan"
            style={{ top: `${scanRow * 25}%`, opacity: te > 350 && te < 3400 ? 1 : 0 }}
          />
          {rows.map((r) => (
            <div key={r.q} className="hfw-vis__row" style={{ opacity: r.ro }}>
              <span className="hfw-vis__ai">AI</span>
              <span className="hfw-vis__q">&ldquo;{r.q}&rdquo;</span>
              <span
                className="hfw-vis__verdict"
                style={{ background: r.bg, color: r.color, opacity: r.o, transform: `scale(${r.s})` }}
              >
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Act 2 — share of AI chats */}
      <div className="hfw-vis__act">
        <div className="hfw__row hfw__row--between" style={{ opacity: cO, transform: `translateY(${cY}px)` }}>
          <span className="hfw__title">Share of AI chats</span>
          <span className="hfw__pill" style={{ background: '#DCFCE7', color: '#15803d' }}>&uarr; {delta} pts</span>
        </div>
        <div className="hfw-vis__legend" style={{ opacity: cO, transform: `translateY(${cY}px)` }}>
          <span className="hfw-vis__legend-you"><i />Your brand</span>
          <span className="hfw-vis__legend-rival"><i />Competitor avg</span>
        </div>

        <div className="hfw-vis__chart">
          <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="hfw-vis__svg">
            <defs>
              <linearGradient id="hfwVisFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0062FF" stopOpacity=".16" />
                <stop offset=".7" stopColor="#0062FF" stopOpacity=".03" />
                <stop offset="1" stopColor="#0062FF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="hfwVisStroke" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="300" y2="0">
                <stop offset="0" stopColor="#9cbcff" />
                <stop offset=".55" stopColor="#3d7dff" />
                <stop offset="1" stopColor="#0062FF" />
              </linearGradient>
              <clipPath id="hfwVisClip">
                <rect x="0" y="-20" width={reveal} height="140" />
              </clipPath>
            </defs>
            <g opacity={cO}>
              <line x1="0" y1="21" x2="300" y2="21" stroke="#e9edf3" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="58" x2="300" y2="58" stroke="#e9edf3" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="95" x2="300" y2="95" stroke="#e3e7ee" vectorEffect="non-scaling-stroke" />
            </g>
            <g clipPath="url(#hfwVisClip)" opacity={cO}>
              <path d={YOU_AREA} fill="url(#hfwVisFill)" />
              <path d={RIVAL_PATH} fill="none" stroke="#b4bccb" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d={YOU_PATH} fill="none" stroke="url(#hfwVisStroke)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </g>
          </svg>

          {/* Where the curve lands, pulsing */}
          <span className="hfw-vis__end" style={{ top: `${END_Y}%`, opacity: targetO }}>
            <i className="hfw-vis__end-pulse" style={{ transform: `scale(${1 + 0.5 * pulse})`, opacity: 0.3 * (1 - pulse) }} />
            <i className="hfw-vis__end-dot" style={{ transform: `scale(${targetK < 0 ? 0 : easeBack(targetK)})` }} />
          </span>

          {/* The level the competitors sit at */}
          <span className="hfw-vis__comp" style={{ top: `${COMP_Y}%`, opacity: targetO }}>44%</span>

          {/* The head of the curve while it draws */}
          <span
            className="hfw-vis__head"
            style={{ left: `${(6 + 288 * draw) / 3}%`, top: `${headY}%`, opacity: te > 4300 && draw < 0.98 ? 1 : 0 }}
          />

          <span
            className="hfw-vis__end-label"
            style={{ top: `${END_Y}%`, opacity: endO, transform: `translate(calc(-100% - 6px),calc(-100% - 6px)) scale(${te < 6750 ? 1 : endK < 0 ? 0.8 : 0.8 + 0.2 * easeBack(endK)})` }}
          >
            {carry || te >= 6750 ? 'You 82%' : 'This week · 82%'}
          </span>
        </div>

        <div className="hfw-vis__months" style={{ opacity: cO }}>
          <span>Jun</span><span>Sep</span><span>Dec</span>
        </div>
      </div>
    </div>
  );
}
