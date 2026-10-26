import { clamp, easeOut, easeBack } from './heroWindowUtils';

/* AI Assistant — ported from the reference's ChatGPTAnswer card.
   A question is typed and sent, the assistant thinks, types its opening
   line, then drops in the ranked brands one by one and closes with a
   verdict. Three questions run in turn, then the thread clears. */

const PERIOD = 8800;
const SEND_AT = 2000;
const INTRO_AT = 900;
const CHAR_MS = 16;

export const CHAT_CYCLE = PERIOD * 3;

const BRAND = {
  rival: { fg: '#c2410c', bg: '#fdf0e4' },
  bose: { fg: '#be123c', bg: '#fdeaee' },
  apple: { fg: '#6d28d9', bg: '#f1ebfd' },
  own: { fg: '#1e3893', bg: '#e7edfd' },
  samsung: { fg: '#0f8f6f', bg: '#e6f4ef' },
};

const THREADS = [
  {
    q: 'Best wireless earbuds right now?',
    intro: 'Reviewers rate these highest:',
    rank: 3,
    after: 'Named after Jabra and Bose',
    lines: [
      [['Jabra', 'rival'], ' best overall sound'],
      [['Bose', 'bose'], ' most comfortable fit'],
      [['Your Brand', 'own'], ' best value ANC'],
      [['Apple', 'apple'], ' best for iPhone'],
    ],
  },
  {
    q: 'Which earbuds cancel noise best?',
    intro: 'Three models lead lab tests:',
    rank: 2,
    after: 'Named right after Bose',
    lines: [
      [['Bose', 'bose'], ' blocks engine noise'],
      [['Your Brand', 'own'], ' adapts to your ear'],
      [['Jabra', 'rival'], ' cuts voices best'],
    ],
  },
  {
    q: 'Good running earbuds under $150?',
    intro: 'These stay put and cost less:',
    rank: 0,
    after: 'Samsung, Apple and Jabra took the spots',
    lines: [
      [['Samsung', 'samsung'], ' light and secure'],
      [['Apple', 'apple'], ' wing tips lock in'],
      [['Jabra', 'rival'], ' open fit, IPX4'],
    ],
  },
];

const lineAt = (d, i) => INTRO_AT + d.intro.length * CHAR_MS + 200 + i * 400;
const verdictAt = (d) => lineAt(d, d.lines.length - 1) + 450;
const doneAt = (d) => verdictAt(d) + 350;

export default function WinAskPoli({ now }) {
  const T = now;
  const n = Math.floor(T / PERIOD);
  const tc = T % PERIOD;
  const blink = T % 900 < 500 ? 1 : 0;

  const buildBlock = (m, u) => {
    const d = THREADS[m % 3];
    const uk = easeOut(u / 340);
    const ak = easeOut((u - 250) / 320);
    const introLen = Math.round(d.intro.length * clamp((u - INTRO_AT) / (d.intro.length * CHAR_MS)));
    const vk = easeOut((u - verdictAt(d)) / 400);
    const hit = d.rank > 0;
    const ik = (u - verdictAt(d) - 120) / 380;

    return {
      key: m,
      q: d.q,
      uH: 43 * uk,
      uO: uk,
      aH: 30 * ak,
      aO: ak,
      thinking: u < INTRO_AT,
      dots: [0, 1, 2].map((i) => {
        const s = Math.max(0, Math.sin(u / 150 - i * 0.8));
        return { y: -3 * s, o: 0.4 + 0.6 * s };
      }),
      intro: d.intro.slice(0, introLen),
      caret: u >= INTRO_AT && introLen < d.intro.length ? blink : 0,
      lines: d.lines.map((segs, i) => {
        const t0 = lineAt(d, i);
        const k = easeOut((u - t0) / 380);
        return {
          h: 25 * k,
          o: k,
          y: (1 - k) * 4,
          segs: segs.map((s, si) => {
            if (typeof s === 'string') return { key: si, text: s, pill: false };
            const pk = (u - t0 - 60) / 380;
            const rk = clamp((u - t0 - 250) / 1100);
            return {
              key: si,
              text: s[0],
              pill: true,
              fg: BRAND[s[1]].fg,
              bg: BRAND[s[1]].bg,
              s: pk < 0 ? 0.7 : 0.7 + 0.3 * easeBack(pk),
              ring: s[1] === 'own' ? 2.5 * Math.sin(Math.PI * rk) : 0,
            };
          }),
        };
      }),
      vH: 52 * vk,
      vO: vk,
      vY: (1 - vk) * 6,
      vIs: ik < 0 ? 0.6 : 0.6 + 0.4 * easeBack(ik),
      vBg: hit ? '#f2fbf5' : '#fff4ec',
      vBd: hit ? '#bfe8cd' : '#fbd5bd',
      vIc: hit ? '#16A34A' : '#ea6a1f',
      vMark: hit ? '✓' : '✕',
      vC: hit ? '#14532d' : '#9a3412',
      vTitle: hit ? `Your Brand is #${d.rank}` : "Your Brand isn't mentioned",
      vSub: d.after,
      showFix: !hit,
    };
  };

  const r = Math.floor(n / 3);
  const first = n % 3 === 0;
  const reset = first && r > 0;

  const blocks = [];
  let threadO = 1;
  let threadY = 0;
  if (reset && tc < 520) {
    for (let m = n - 3; m < n; m++) blocks.push(buildBlock(m, 1e9));
    const k = easeOut(tc / 520);
    threadO = 1 - k;
    threadY = -24 * k;
  } else {
    for (let m = Math.max(3 * r, n - 2); m <= n; m++) {
      if (m < n) blocks.push(buildBlock(m, 1e9));
      else if (tc >= SEND_AT) blocks.push(buildBlock(m, tc - SEND_AT));
    }
  }

  const cur = THREADS[n % 3];
  const u = tc - SEND_AT;
  const typeStart = reset ? 850 : 300;
  const typed = tc >= typeStart && tc < SEND_AT
    ? cur.q.slice(0, Math.round(cur.q.length * clamp((tc - typeStart) / (SEND_AT - typeStart - 350))))
    : '';
  const busy = tc >= SEND_AT && u < doneAt(cur);

  let greetO = 0;
  let greetY = 0;
  if (first) {
    const gin = reset ? easeOut((tc - 380) / 420) : 1;
    const gout = easeOut((tc - SEND_AT) / 300);
    greetO = Math.min(gin, 1 - gout);
    greetY = (1 - gin) * 10 - 14 * gout;
  }

  // The reference answers in ChatGPT's voice, and marks the replies with
  // its own logo — the same mark the window's title bar carries.
  const avatar = `${import.meta.env.BASE_URL}hero-chatgpt-mark.png`;

  return (
    <div className="hfw__body hfw-chat">
      <div className="hfw-chat__thread-wrap">
        <div className="hfw-chat__greet" style={{ opacity: greetO, transform: `translateY(${greetY}px)` }}>
          <span>What can I help with?</span>
        </div>

        <div className="hfw-chat__thread" style={{ opacity: threadO, transform: `translateY(${threadY}px)` }}>
          {blocks.map((b) => (
            <div key={b.key}>
              <div className="hfw-chat__ask" style={{ height: `${b.uH}px` }}>
                <div className="hfw-chat__bubble" style={{ opacity: b.uO }}>{b.q}</div>
              </div>

              <div className="hfw-chat__answer" style={{ height: `${b.aH}px` }}>
                <div className="hfw-chat__answer-row" style={{ opacity: b.aO }}>
                  <span className="hfw-chat__avatar"><img src={avatar} alt="ChatGPT" width="12" height="12" /></span>
                  {b.thinking ? (
                    <span className="hfw-chat__dots">
                      {b.dots.map((d, i) => (
                        <span key={i} style={{ opacity: d.o, transform: `translateY(${d.y}px)` }} />
                      ))}
                    </span>
                  ) : (
                    <span className="hfw-chat__intro">
                      {b.intro}
                      <span className="hfw-chat__caret" style={{ opacity: b.caret }} />
                    </span>
                  )}
                </div>
              </div>

              {b.lines.map((ln, i) => (
                <div key={i} className="hfw-chat__line" style={{ height: `${ln.h}px` }}>
                  <div className="hfw-chat__line-inner" style={{ opacity: ln.o, transform: `translateY(${ln.y}px)` }}>
                    <span className="hfw-chat__bullet" />
                    <div className="hfw-chat__line-text">
                      {ln.segs.map((sg) => (sg.pill ? (
                        <span
                          key={sg.key}
                          className="hfw-chat__brand"
                          style={{ color: sg.fg, background: sg.bg, transform: `scale(${sg.s})`, boxShadow: `0 0 0 ${sg.ring}px rgba(30,56,147,.22)` }}
                        >
                          {sg.text}
                        </span>
                      ) : (
                        <span key={sg.key}>{sg.text}</span>
                      )))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="hfw-chat__verdict-wrap" style={{ height: `${b.vH}px` }}>
                <div
                  className="hfw-chat__verdict"
                  style={{ background: b.vBg, boxShadow: `0 0 0 1px ${b.vBd}`, opacity: b.vO, transform: `translateY(${b.vY}px)` }}
                >
                  <span className="hfw-chat__verdict-icon" style={{ background: b.vIc, transform: `scale(${b.vIs})` }}>{b.vMark}</span>
                  <div className="hfw-chat__verdict-text">
                    <span style={{ color: b.vC }}>{b.vTitle}</span>
                    <span>{b.vSub}</span>
                  </div>
                  {b.showFix && <span className="hfw-chat__fix">Fix &rarr;</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hfw-chat__input-wrap">
        <div
          className="hfw-chat__input"
          style={{ borderColor: typed ? '#c9d2e6' : '#e4e7ef', boxShadow: typed ? '0 0 0 3px rgba(30,56,147,.08)' : 'none' }}
        >
          <span className="hfw-chat__input-text" style={{ color: typed ? '#202124' : '#9a9aa0' }}>
            {typed || 'Ask anything'}
            <span className="hfw-chat__caret" style={{ opacity: typed ? blink : 0 }} />
          </span>
          <span
            className="hfw-chat__send"
            style={{
              background: busy ? '#9aa3bb' : typed && typed.length === cur.q.length ? '#152a6b' : '#c7cdda',
              transform: `scale(${tc > SEND_AT - 150 && tc < SEND_AT ? 0.86 : 1})`,
            }}
          >
            {busy
              ? <span className="hfw-chat__spin" />
              : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5" /><path d="m5 12 7-7 7 7" />
                </svg>
              )}
          </span>
        </div>
      </div>
    </div>
  );
}
