import { clamp, easeOut, easeInOut, easeBack, lerp } from './heroWindowUtils';

/* Implementation — ported from the reference's ImplementationFlow.
   A fix travels Site audit → Poliris → sony.com: it is picked up, written,
   deployed, and lands as "✓ Live". The counter ticks up and the newest line
   drops into the log. One pass is 3400 units of its own slowed clock. */

// One pass. The clock is slowed by HeroWindows before it gets here.
const PERIOD = 3400;

const FIXES = [
  'Added Product schema',
  'Fixed 24 image alt texts',
  'Added FAQ markup',
  'Repaired 9 broken links',
  'Compressed hero images',
  'Wrote 15 meta descriptions',
];
const TOKENS = ['Product schema', 'Alt text', 'FAQ markup', 'Broken links', 'Slow images', 'Meta descriptions'];
const X = [30, 114, 198];

const pop = (k, f = 0.6) => (k < 0 ? f : f + (1 - f) * easeBack(k));

function AuditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
      <path d="M14 3v5h5" />
      <circle cx="16.5" cy="16.5" r="3.2" />
      <path d="m19 19 2.2 2.2" />
    </svg>
  );
}

export default function WinImplementation({ now }) {
  const T = now;
  const pass = Math.floor(T / PERIOD);
  const tc = T % PERIOD;
  const ci = pass % FIXES.length;

  let tx;
  let label;
  let bg = '#EF4444';
  let spinning = false;
  let tokenO = 1;
  let line;

  if (tc < 900) {
    const k = easeInOut(tc / 900);
    tx = lerp(X[0], X[1], k);
    label = TOKENS[ci];
    tokenO = easeOut(tc / 200);
    line = (X[1] - X[0]) * k;
  } else if (tc < 1600) {
    tx = X[1];
    label = 'Writing fix';
    bg = '#0062FF';
    spinning = true;
    line = X[1] - X[0];
  } else if (tc < 2500) {
    const k = easeInOut((tc - 1600) / 900);
    tx = lerp(X[1], X[2], k);
    label = 'Deploying';
    bg = '#0062FF';
    line = (X[1] - X[0]) + (X[2] - X[1]) * k;
  } else {
    tx = X[2];
    label = '✓ Live';
    bg = '#16A34A';
    tokenO = 1 - easeOut((tc - 2900) / 400);
    line = (X[2] - X[0]) * (1 - easeOut((tc - 2900) / 450));
  }

  const ring = (t0, color) => {
    const k = (tc - t0) / 700;
    return { ringO: k > 0 && k < 1 ? 0.7 * (1 - k) : 0, ringS: 1 + 0.25 * clamp(k), ringC: color };
  };

  const nodes = [
    { x: X[0], label: 'Site audit', kind: 'audit', border: '#e6e9ef', scale: tc < 400 ? pop(tc / 400, 0.94) : 1, badge: tc < 400 ? pop(tc / 400, 0.5) : 1, ...ring(0, '#EF4444') },
    { x: X[1], label: 'Poliris', kind: 'poliris', border: tc >= 900 && tc < 1600 ? '#BFD3FF' : '#e6e9ef', scale: 1, ...ring(900, '#0062FF') },
    { x: X[2], label: 'sony.com', kind: 'site', border: tc >= 2500 ? '#bfe8cd' : '#e6e9ef', scale: tc >= 2500 ? pop((tc - 2500) / 300, 0.92) : 1, flash: tc >= 2500 ? 0.35 * (1 - clamp((tc - 2500) / 700)) : 0, ...ring(2500, '#16A34A') },
  ];

  const done = pass + (tc >= 2500 ? 1 : 0);
  const ins = tc >= 2500 ? easeOut((tc - 2500) / 450) : 1;
  const log = [];
  for (let j = 0; j < 4; j++) {
    const idx = done - 1 - j;
    if (idx < 0) break;
    const fresh = j === 0 && tc >= 2500;
    log.push({
      key: `${idx}`,
      text: FIXES[((idx % 6) + 6) % 6],
      when: j === 0 ? 'just now' : `${j + 1} min ago`,
      o: fresh ? ins : 1,
      s: fresh ? pop((tc - 2550) / 320, 0.5) : 1,
    });
  }

  const onNode = (tc >= 900 && tc < 1600) || tc >= 2500;
  const tokenW = label.length * 5.4 + 24;
  const px = Math.max(tokenW / 2, Math.min(228 - tokenW / 2, tx));

  return (
    <div className="hfw__body hfw-impl">
      <div className="hfw-impl__flow">
        <span className="hfw-impl__track" />
        <span className="hfw-impl__fill" style={{ width: `${line}px` }} />

        {nodes.map((nd) => (
          <div key={nd.label} className="hfw-impl__node" style={{ left: `${nd.x}px` }}>
            <span className="hfw-impl__tile" style={{ boxShadow: `0 0 0 1px ${nd.border},0 8px 18px -10px rgba(22,50,141,.4)`, transform: `scale(${nd.scale})` }}>
              <span className="hfw-impl__ring" style={{ borderColor: nd.ringC, opacity: nd.ringO, transform: `scale(${nd.ringS})` }} />

              {nd.kind === 'audit' && (
                <>
                  <span className="hfw-impl__glyph hfw-impl__glyph--doc"><AuditIcon /></span>
                  <span className="hfw-impl__badge hfw-impl__badge--alert" style={{ transform: `scale(${nd.badge})` }}>!</span>
                </>
              )}
              {nd.kind === 'poliris' && (
                <img className="hfw-impl__mark" src={`${import.meta.env.BASE_URL}Poliris-Logo-Frame.png`} alt="Poliris" width="54" height="54" />
              )}
              {nd.kind === 'site' && (
                <>
                  {/* The product shot the site is being fixed for: a case
                      with an earbud resting against it. */}
                  <span className="hfw-impl__thumb">
                    <i className="hfw-impl__thumb-case" />
                    <i className="hfw-impl__thumb-bud" />
                    <i className="hfw-impl__flash" style={{ background: `rgba(22,163,74,${nd.flash})` }} />
                  </span>
                  <span className="hfw-impl__badge hfw-impl__badge--w">W</span>
                </>
              )}
            </span>
            <span className="hfw-impl__label">{nd.label}</span>
          </div>
        ))}

        <span className="hfw-impl__dot" style={{ left: `${tx}px`, background: bg, boxShadow: `0 0 0 3px #fff,0 0 10px ${bg}`, opacity: onNode ? 0 : tokenO }} />
        <div className="hfw-impl__token" style={{ left: `${px}px`, background: bg, opacity: tokenO }}>
          {spinning && <span className="hfw-impl__spin" />}
          {label}
        </div>
      </div>

      <div className="hfw-impl__head">
        <span className="hfw-impl__head-label">LIVE ON SONY.COM</span>
        <span className="hfw-impl__head-total">{128 + done} fixes</span>
      </div>

      <div className="hfw-impl__log">
        <div style={{ transform: `translateY(${tc >= 2500 ? -25 * (1 - ins) : 0}px)` }}>
          {log.map((g) => (
            <div key={g.key} className="hfw-impl__log-row" style={{ opacity: g.o }}>
              <span className="hfw-impl__check" style={{ transform: `scale(${g.s})` }}>&#10003;</span>
              <span className="hfw-impl__log-text">{g.text}</span>
              <span className="hfw-impl__log-when">{g.when}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
