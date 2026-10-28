import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLang } from '../contexts/LangContext';

/**
 * Product film (public/poliris-film/) — sits in the landing hero. It is not a
 * video file in a player: it's the HyperFrames composition itself, played live
 * in the page by <hyperframes-player>, so every label, bar and panel stays
 * crisp HTML text at any width. The app screens inside it are video layers the
 * composition plays in step with the animation and the voiceover.
 *
 * It plays muted and looped only while the whole film fits on screen (below
 * the fixed navbar), and pauses as soon as it's scrolled partly out of view;
 * sound only comes on from the button bottom-right. The first time sound comes
 * on, the film restarts so the voiceover is heard from its first line.
 *
 * Captions are drawn by us from the .vtt file (the player has no text track),
 * so they can be styled. They're off until the visitor turns them on with the
 * CC button.
 *
 * Scroll reveal: --p eases 0→1 over REVEAL_PX of scroll from the moment
 * the section enters the viewport and drives the tracing light; --t
 * finishes at FLAT_AT and scales the frame up to full size (it reaches
 * exactly 1 so the film isn't left resampled and soft). --p also opens
 * the orbit rings around the frame. Phones and reduced motion pin both to 1.
 *
 * The film holds its own light background and the player keeps the iframe
 * borderless and transparent: nothing is drawn around or behind it.
 */
const MEDIA = `${import.meta.env.BASE_URL}livraison`;
const FILM = `${import.meta.env.BASE_URL}poliris-film`;
// Both language folders sit side by side: film-fr/ carries the French voice and
// labels only, and shares film/assets/ for the screens, images and fonts.
const FILM_DIR = { en: 'film', fr: 'film-fr' };
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const REVEAL_PX = 480;
const FLAT_AT = 0.85;
const STILL_QUERY = '(max-width: 768px), (prefers-reduced-motion: reduce)';
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
// How many px of the film may sit off screen and still count as "fits".
const FIT_SLACK = 24;

// Orbit rings share one centre — the frame's — so the outer ones wrap it
// and rise above and below it. The viewBox is scaled to the stage width
// (.hfilm__orbit), so the radii are relative, not pixels.
const CX = 840, CY = 520;
const RINGS = [
  { rx: 540, ry: 320, opacity: 0.24 },
  { rx: 680, ry: 410, opacity: 0.18, dashed: true },
  { rx: 820, ry: 500, opacity: 0.11 },
];

const Icon = {
  play: <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" />,
  pause: <><rect x="7" y="5" width="3.6" height="14" rx="1" fill="currentColor" stroke="none" /><rect x="13.4" y="5" width="3.6" height="14" rx="1" fill="currentColor" stroke="none" /></>,
  muted: <><path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" /><path d="m22 9-6 6" /><path d="m16 9 6 6" /></>,
  sound: <><path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" /></>,
  soundLow: <><path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /></>,
  cc: <><rect x="2.5" y="5" width="19" height="14" rx="3" /><path d="M10.5 10.2a2.4 2.4 0 1 0 0 3.6" /><path d="M17 10.2a2.4 2.4 0 1 0 0 3.6" /></>,
};
const Svg = ({ children }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

// The player is one 93 KB script for the whole page, loaded once and shared by
// every language the visitor switches to.
let playerScript = null;
function loadPlayerScript() {
  if (playerScript) return playerScript;
  playerScript = new Promise((resolve, reject) => {
    if (window.customElements?.get('hyperframes-player')) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = `${FILM}/player/hyperframes-player.global.js`;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('hyperframes-player failed to load'));
    document.head.appendChild(s);
  });
  return playerScript;
}

/* Steadies the film.
 *
 * #cam is the composition's camera: the 1120x730 window holding the app-screen
 * videos, panned and zoomed by a fraction of a pixel on every frame for the
 * whole two minutes. Left to paint normally, that window is re-rasterised and
 * snapped to whole device pixels frame after frame — against the still text
 * around it the screens read as trembling, which an MP4 of the same film never
 * shows. Giving the camera its own compositing layer hands the motion to the
 * GPU — but a layer alone is not enough: Chrome still snaps a flat (2D)
 * transform to whole pixels, so on slow drifts the screens stepped a pixel at
 * a time and jumped back (measured on captured frames). A near-zero 3D tilt on
 * #win, which the timeline never animates, makes the transform 3D: the motion
 * keeps its sub-pixel precision and glides. Sharpness was checked unchanged.
 *
 * It costs nothing in sharpness: #cam holds videos and a cursor, no text. The
 * film's own text is drawn outside it and keeps painting normally, crisp at
 * every size. Injected from here rather than edited into the composition, so
 * public/poliris-film/ stays exactly as it was delivered. */
const STEADY_CSS = `
  #cam { will-change: transform; }
  #win { transform: perspective(1000px) rotateX(0.001deg); }
  #cam video, #cam img { backface-visibility: hidden; }
`;
function steadyCamera(player) {
  const doc = player.iframeElement?.contentDocument;
  if (!doc || doc.getElementById('hfilm-steady')) return;
  const style = doc.createElement('style');
  style.id = 'hfilm-steady';
  style.textContent = STEADY_CSS;
  (doc.head || doc.documentElement).appendChild(style);
}

const cueTime = (stamp) =>
  stamp.split(':').reverse().reduce((t, part, i) => t + Number(part) * 60 ** i, 0);

function parseVtt(text) {
  const cues = [];
  for (const block of text.replace(/\r/g, '').split('\n\n')) {
    const lines = block.split('\n').filter((l) => l.trim() !== '');
    const i = lines.findIndex((l) => l.includes('-->'));
    if (i === -1) continue;
    const [from, to] = lines[i].split('-->').map((s) => s.trim().split(/\s+/)[0]);
    const start = cueTime(from);
    const end = cueTime(to);
    if (!Number.isFinite(start) || !Number.isFinite(end)) continue;
    cues.push({ start, end, text: lines.slice(i + 1).join('\n') });
  }
  return cues;
}

export default function HeroFilm() {
  const { lang, t } = useLang();
  const f = t('film');
  const ref = useRef(null);
  const playerRef = useRef(null);
  const userPaused = useRef(false);
  const heardSound = useRef(false);
  const rampRef = useRef(0);
  const rampDone = useRef(0);
  const ramping = useRef(false);
  const fitting = useRef(false);
  const cues = useRef([]);
  // The player is a custom element: until its script has run, the <hyperframes-player>
  // in the page is an inert unknown element with none of the API on it.
  const live = useRef(false);
  // The scroll pass raises this as soon as the block comes near the window;
  // loadFilm is what it calls once the player exists.
  const nearWindow = useRef(false);
  const loadFilm = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [painted, setPainted] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [cue, setCue] = useState('');

  // Start playback on its own (not from a click). A pause the visitor asked
  // for sticks until they press play again; reduced motion never autoplays.
  // Sound is never forced here: browsers only allow a muted start.
  function autoPlay() {
    const player = playerRef.current;
    if (!live.current || !player || userPaused.current) return;
    if (window.matchMedia(REDUCED_QUERY).matches) return;
    player.play();
  }

  useLayoutEffect(() => {
    const el = ref.current;
    const still = window.matchMedia(STILL_QUERY);
    let raf = 0;
    function update() {
      raf = 0;
      let p = 1;
      if (!still.matches) {
        const y = window.scrollY;
        const start = Math.max(0, el.getBoundingClientRect().top + y - window.innerHeight);
        p = easeOutCubic(Math.min(1, Math.max(0, (y - start) / REVEAL_PX)));
      }
      const t = Math.min(1, p / FLAT_AT);
      el.style.setProperty('--p', p.toFixed(4));
      el.style.setProperty('--t', t.toFixed(4));
      // At full size the frame drops its transform so the film isn't resampled.
      el.toggleAttribute('data-done', t >= 1);

      // Play only while the film fits on screen, between the fixed navbar
      // and the bottom of the window; when the window is too short for all
      // of it, while it fills what's visible. Act on changes only, so a
      // pause or play the visitor chose isn't overridden mid-view.
      const screen = el.querySelector('.hfilm__screen').getBoundingClientRect();
      // Fetch the film once the block comes within 300px of the window: a
      // visitor who never scrolls this far downloads none of it.
      if (screen.top < window.innerHeight + 300 && screen.bottom > -300) {
        nearWindow.current = true;
        loadFilm.current?.();
      }
      const top = document.querySelector('.nav')?.getBoundingClientRect().bottom ?? 0;
      const shown = Math.min(screen.bottom, window.innerHeight) - Math.max(screen.top, top);
      const fits = shown >= Math.min(screen.height, window.innerHeight - top) - FIT_SLACK;
      if (fits !== fitting.current) {
        fitting.current = fits;
        if (fits) autoPlay();
        else if (live.current) playerRef.current.pause();
      }
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    still.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      still.removeEventListener('change', schedule);
    };
  }, []);

  // Point the player at this language's composition. Nothing is fetched until
  // the scroll pass finds the block near the window, so a visitor who never
  // reaches it downloads none of the film. Absolute URLs: the player injects
  // the runtime into the film's own frame, where a relative path would point
  // elsewhere.
  useEffect(() => {
    const player = playerRef.current;
    let current = true;

    function load() {
      if (!current || !live.current || player.hasAttribute('src')) return;
      player.setAttribute('runtime-src', new URL(`${FILM}/player/hyperframe.runtime.iife.js`, location.href).href);
      // ?bg=transparent turns the composition's own backdrop off so the film
      // sits on the page rather than in a box of its own (see LISEZ-MOI).
      player.setAttribute('src', new URL(`${FILM}/${FILM_DIR[lang]}/index.html?bg=transparent`, location.href).href);
    }
    // Before the player's script lands, load() is a no-op; the call after it
    // lands catches up.
    loadFilm.current = load;

    loadPlayerScript().then(() => {
      if (!current) return;
      live.current = true;
      player.loop = true;
      player.disableClickToPlay = true;
      player.muted = muted;
      player.volume = volume;
      if (nearWindow.current) load();
      // The scroll pass may already have found the film on screen while the
      // player was still an inert element; start it now that it can play.
      if (fitting.current) autoPlay();
    }).catch(() => {});

    return () => { current = false; live.current = false; loadFilm.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // The sound button and volume slider are the source of truth. A new player
  // (a language switch, key={lang}, or a hot reload in dev) starts muted, so
  // re-apply the setting after every render rather than at set moments.
  useEffect(() => {
    if (!live.current) return;
    const player = playerRef.current;
    if (player.muted !== muted) player.muted = muted;
    if (!ramping.current && player.volume !== volume) player.volume = volume;
  });

  // Switching language swaps in a new player, which starts at 0:00. Both
  // versions are the same film, so pick up at the same moment.
  const resumeAt = useRef(0);
  useEffect(() => {
    const player = playerRef.current;
    const at = resumeAt.current;
    // The player's script is loaded by now on any switch that can carry a
    // time over; seeking cancels a play that was waiting on the composition,
    // so ask for playback again after it.
    if (at && typeof player.seek === 'function') {
      const seek = () => { player.seek(at); autoPlay(); };
      if (player.ready) seek();
      else player.addEventListener('ready', seek, { once: true });
    }
    return () => { resumeAt.current = typeof player.currentTime === 'number' ? player.currentTime : 0; };
  }, [lang]);

  // A language switch swaps in a new player: start it if the film is
  // already in view.
  useEffect(() => {
    if (fitting.current) autoPlay();
  }, [lang]);

  // Captions: the player has no text track, so read the cues ourselves off
  // its clock and draw them.
  useEffect(() => {
    let current = true;
    cues.current = [];
    fetch(`${MEDIA}/sous-titres/poliris-film-${lang}.vtt`)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((text) => {
        if (!current) return;
        cues.current = parseVtt(text);
        setCue('');
      })
      .catch(() => {});
    return () => { current = false; };
  }, [lang]);

  useEffect(() => {
    const player = playerRef.current;
    const onPlay = () => { setPlaying(true); setStarted(true); };
    const onPause = () => setPlaying(false);
    const onReady = () => steadyCamera(player);
    const onPainted = () => { steadyCamera(player); setPainted(true); };
    const onTime = (e) => {
      const at = e.detail?.currentTime ?? player.currentTime ?? 0;
      const active = cues.current.find((c) => at >= c.start && at < c.end);
      setCue(active ? active.text : '');
    };
    player.addEventListener('play', onPlay);
    player.addEventListener('pause', onPause);
    player.addEventListener('ready', onReady);
    player.addEventListener('painted', onPainted);
    player.addEventListener('timeupdate', onTime);
    return () => {
      player.removeEventListener('play', onPlay);
      player.removeEventListener('pause', onPause);
      player.removeEventListener('ready', onReady);
      player.removeEventListener('painted', onPainted);
      player.removeEventListener('timeupdate', onTime);
    };
  }, [lang]);

  function togglePlay() {
    const player = playerRef.current;
    if (!live.current) return;
    if (player.paused) {
      userPaused.current = false;
      player.play();
    } else {
      userPaused.current = true;
      player.pause();
    }
  }

  function stopFade() {
    cancelAnimationFrame(rampRef.current);
    clearTimeout(rampDone.current);
    ramping.current = false;
  }

  // Sound on at `target` volume. The first time, the film restarts so the
  // voiceover is heard from its first line.
  function unmute(target, fade) {
    const player = playerRef.current;
    if (!heardSound.current) {
      heardSound.current = true;
      player.seek(0);
    }
    player.muted = false;
    setMuted(false);
    userPaused.current = false;
    player.play();
    if (!fade) {
      player.volume = target;
      return;
    }
    // Ease the volume in rather than switching it on.
    ramping.current = true;
    player.volume = 0;
    const t0 = performance.now();
    const ramp = (now) => {
      const k = Math.min(1, (now - t0) / 450);
      player.volume = k * target;
      if (k < 1) rampRef.current = requestAnimationFrame(ramp);
      else ramping.current = false;
    };
    rampRef.current = requestAnimationFrame(ramp);
    // Frames don't run in a background tab; make sure the fade still lands.
    rampDone.current = setTimeout(() => {
      stopFade();
      player.volume = target;
    }, 600);
  }

  function toggleSound() {
    const player = playerRef.current;
    stopFade();
    if (!muted) {
      player.muted = true;
      player.volume = volume;
      setMuted(true);
      return;
    }
    // Slider was dragged to zero: come back at full volume.
    const target = volume > 0 ? volume : 1;
    setVolume(target);
    unmute(target, true);
  }

  function changeVolume(e) {
    const player = playerRef.current;
    const v = Number(e.target.value);
    stopFade();
    setVolume(v);
    player.volume = v;
    if (v === 0 && !muted) {
      player.muted = true;
      setMuted(true);
    } else if (v > 0 && muted) {
      unmute(v, false);
    }
  }

  function toggleCaptions() {
    setCaptionsOn((on) => !on);
  }

  return (
    <section className="hfilm" ref={ref} aria-label={f.label}>
      <div className="hfilm__glow" aria-hidden="true" />
      <div className="hfilm__stage">
        {/* Sized from the stage, so the rings keep their proportions around
            the frame at any width. Painted first, so they sit behind it. */}
        <svg
          className="hfilm__orbit"
          viewBox={`0 0 ${CX * 2} ${CY * 2}`}
          aria-hidden="true"
        >
          {RINGS.map(({ rx, ry, opacity, dashed }) => (
            <ellipse
              key={rx}
              cx={CX} cy={CY} rx={rx} ry={ry}
              fill="none"
              stroke="#0062FF"
              strokeOpacity={opacity}
              strokeWidth="1"
              strokeDasharray={dashed ? '4 6' : undefined}
            />
          ))}
        </svg>
        <div className="hfilm__frame">
          <div className="hfilm__mat">
            <div className="hfilm__screen">
              <hyperframes-player
                key={lang}
                ref={playerRef}
                className="hfilm__player"
                onClick={togglePlay}
              />

              {/* Held over the film until it first plays (and has painted a
                  frame), so the block shows the poster rather than the film's
                  opening frame standing still; then it fades out over the
                  playing film. */}
              <img
                className={`hfilm__poster${painted && started ? ' is-gone' : ''}`}
                aria-hidden={painted && started}
                src={`${FILM}/${FILM_DIR[lang]}/poster.webp`}
                alt={f.label}
                width="1920"
                height="1080"
              />

              {captionsOn && cue && (
                <p className="hfilm__caption" aria-hidden="true">
                  <span>{cue}</span>
                </p>
              )}

              <div className="hfilm__controls">
                <button type="button" className="hfilm__btn" onClick={togglePlay} aria-label={playing ? f.pause : f.play}>
                  <Svg>{playing ? Icon.pause : Icon.play}</Svg>
                </button>
                <div className="hfilm__controls-end">
                  <button
                    type="button"
                    className={`hfilm__btn${captionsOn ? ' is-on' : ''}`}
                    onClick={toggleCaptions}
                    aria-label={captionsOn ? f.captionsOff : f.captionsOn}
                    aria-pressed={captionsOn}
                  >
                    <Svg>{Icon.cc}</Svg>
                  </button>
                  {/* Hover (or focus) opens the volume slider above the button;
                      it floats over the film, so nothing shifts. */}
                  <div className="hfilm__vol">
                    <div className="hfilm__vol-pop">
                      <input
                        type="range"
                        className="hfilm__vol-range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={muted ? 0 : volume}
                        onChange={changeVolume}
                        aria-label={f.volume}
                        style={{ '--vol': `${(muted ? 0 : volume) * 100}%` }}
                      />
                    </div>
                    <button
                      type="button"
                      className={`hfilm__btn hfilm__btn--sound${muted ? ' is-muted' : ''}`}
                      onClick={toggleSound}
                      aria-label={muted ? f.soundOn : f.soundOff}
                      aria-pressed={!muted}
                    >
                      <Svg>{muted ? Icon.muted : volume < 0.5 ? Icon.soundLow : Icon.sound}</Svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
