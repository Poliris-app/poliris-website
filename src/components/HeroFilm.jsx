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
 * finishes at FLAT_AT and eases the frame down from its arrival size to its
 * natural one (it reaches exactly 1 so the film isn't left resampled and
 * soft). --p also opens the orbit rings around the frame. Phones and reduced
 * motion pin both to 1.
 *
 * The film holds its own light background and the player keeps the iframe
 * borderless and transparent: nothing is drawn around or behind it.
 */
const MEDIA = `${import.meta.env.BASE_URL}livraison`;
const FILM = `${import.meta.env.BASE_URL}poliris-film`;
// Both language folders sit side by side: film-fr/ carries the French voice and
// labels only, and shares film/assets/ for the screens, images and fonts.
// The film is one composition now, not one per language: live/ plays the
// coded sections in ../sections/ and takes ?lang=fr for the French labels and
// voice (the app screens are the same in both). film/ and film-fr/ still hold
// what it draws from — the clock, the fonts, the audio, the agent portraits.
const FILM_LIVE = 'live';
const FILM_DIR = { en: 'film', fr: 'film-fr' };   // posters and subtitles still live here
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const REVEAL_PX = 480;
const FLAT_AT = 0.85;
const STILL_QUERY = '(max-width: 768px), (prefers-reduced-motion: reduce)';
// Phones and tablets get the poster, not the film. The film loads every one
// of its ~2,000 screen images at once, several GB once decoded, and iOS
// Safari kills a tab long before that ("A problem repeatedly occurred").
// Keep in step with the matching rule in poliris.css that hides the controls.
const POSTER_ONLY_QUERY = '(pointer: coarse), (max-width: 768px)';
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
// How many px of the film may sit off screen and still count as "fits".
// The film keeps playing while any of it is still on screen; it stops
// once this little of it is left, so a sliver at the edge doesn't have
// it starting and stopping as the visitor scrolls past the boundary.
const OFF_SCREEN_SLACK = 8;
// The composition's own length, used for the scrub bar until the player
// reports the real duration.
const FILM_SECONDS = 122.6;

const clock = (s) => {
  const whole = Math.max(0, Math.floor(s || 0));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
};

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
  pause: <>
    <rect x="7" y="5" width="3.6" height="14" rx="1" fill="currentColor" stroke="none" />
    <rect x="13.4" y="5" width="3.6" height="14" rx="1" fill="currentColor" stroke="none" />
  </>,
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
 * It costs nothing in sharpness: #cam holds the app screen and a cursor, no
 * text. The film's own text is drawn outside it and keeps painting normally,
 * crisp at every size. Injected from here rather than edited into the
 * composition, so public/poliris-film/ stays as it is.
 *
 * Since the film became the coded sections, #cam lives inside each section's
 * own frame rather than in the composition, so this walks into them too —
 * and again as they arrive, because they load after the composition does. */
/* Now that the screens are coded, #cam holds the app's live text, and
 * will-change: transform is what blurred it. Chrome rasters a will-change
 * layer once, at the scale it has when the layer is made, and then only
 * stretches that bitmap: every zoom in read soft, and the moment Chrome
 * finally re-rastered it sharp showed as a small jump. So no will-change: the
 * camera is re-rastered at each scale and stays crisp.
 * The 3D tilt on the window went for the same reason. A 3D transform makes the
 * window a layer of its own, rastered at the section's 1920px size and then
 * shrunk by the player into the hero as a bitmap — every screen of the film
 * read smeared next to the same section opened on its own (measured: same
 * frame, with and without the tilt). Without it the text is drawn straight at
 * the size it is shown — but redrawn at a new size every frame of a camera
 * move, the glyphs snap to the pixel grid each time and the text shakes.
 * Keeping the tilt only while the camera moved didn't help: the camera is
 * nearly always drifting, so it was nearly always on.
 * What does both: the tilt on .app (the app screen, already scale(.8)), with
 * the app drawn K times denser. A tilted layer is rastered once, at one pixel
 * per CSS pixel of its own, whatever it is shown at; zoom: K makes those
 * pixels K times finer and scale(.8 / K) brings the app back to its size. The
 * camera then only moves and scales that bitmap — smooth — and it holds
 * enough pixels for the closest push-in. Measured on frames stepped at 60 fps
 * (02, 13.5 → 14.4 s): sharpness 917 against 841 untilted and 156 with the
 * tilt on #win; per-patch shake 0.031px against 0.070 untilted. Layout is
 * unchanged across the film (only anti-aliasing differs). The bitmap ignores
 * the screen's pixel ratio, so K follows it: 2, and up to 3 on a retina
 * screen.
 * A window shown small is the exception: shrunk to under about half size
 * (05's chat and PDF at 0.49, 04's Page Explorer at 0.25–0.4, the docked
 * cards) the bitmap is cut down four times and more and the letters break
 * up — unreadable. Those are drawn flat, the way the sections draw them on
 * their own: crisp, and the camera barely moves on them. Each app is
 * measured every frame and switches at 0.55 / 0.6 of its size, so it does not
 * flicker between the two on the line. */
const SMALL = 0.55;
const LARGE = 0.6;
const STEADY_CSS = `
  .app:not([data-hfilm-flat]) { zoom: var(--hfilm-k); transform: perspective(1000px) rotateX(0.001deg) scale(var(--hfilm-s)); }
  #cam img, #cam2 img { backface-visibility: hidden; }
`;
function steadyDoc(doc) {
  const view = doc?.defaultView;
  if (!view || doc.getElementById('hfilm-steady')) return;
  const style = doc.createElement('style');
  style.id = 'hfilm-steady';
  style.textContent = STEADY_CSS;
  (doc.head || doc.documentElement).appendChild(style);
  const k = Math.min(3, Math.max(2, 1.5 * (view.devicePixelRatio || 1)));
  doc.documentElement.style.setProperty('--hfilm-k', k);
  doc.documentElement.style.setProperty('--hfilm-s', (0.8 / k).toFixed(5));
  const apps = [...doc.querySelectorAll('.app')];
  const frame = view.frameElement;                       // the section's layer in the composition
  const film = frame?.ownerDocument.defaultView.frameElement;   // the composition in the player
  if (!apps.length || !frame || !film) return;
  const fit = () => {
    if (frame.parentElement?.style.visibility !== 'hidden' && frame.offsetWidth && film.offsetWidth) {
      const outer = (frame.getBoundingClientRect().width / frame.offsetWidth) *
        (film.getBoundingClientRect().width / film.offsetWidth);
      apps.forEach((app) => {
        const box = app.parentElement;                   // unzoomed, and moved by the camera with the app
        if (!box?.offsetWidth) return;
        const size = outer * (box.getBoundingClientRect().width / box.offsetWidth) * 0.8;
        const flat = app.hasAttribute('data-hfilm-flat');
        if (!flat && size < SMALL) app.setAttribute('data-hfilm-flat', '');
        else if (flat && size > LARGE) app.removeAttribute('data-hfilm-flat');
      });
    }
    view.requestAnimationFrame(fit);
  };
  view.requestAnimationFrame(fit);
}
function steadyCamera(player) {
  const doc = player.iframeElement?.contentDocument;
  if (!doc) return;
  steadyDoc(doc);
  // the section layers, now and whenever one finishes loading
  for (const frame of doc.querySelectorAll('iframe.sec')) {
    const apply = () => steadyDoc(frame.contentDocument);
    apply();
    frame.addEventListener('load', apply);
  }
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
  // A pause the visitor asked for sticks: scrolling the film back into view
  // must not start it again behind them.
  const userPaused = useRef(false);
  // While a thumb is down, the bar follows the pointer rather than the film.
  const scrubbing = useRef(false);
  const rampRef = useRef(0);
  const rampDone = useRef(0);
  const ramping = useRef(false);
  const onScreen = useRef(false);
  const cues = useRef([]);
  // The player is a custom element: until its script has run, the <hyperframes-player>
  // in the page is an inert unknown element with none of the API on it.
  const live = useRef(false);
  // The scroll pass raises this as soon as the block comes near the window;
  // loadFilm is what it calls once the player exists.
  const nearWindow = useRef(false);
  const loadFilm = useRef(null);

  // The language whose film has painted / started playing. A language switch
  // swaps in a new player, so the poster covers it again until it plays.
  const [painted, setPainted] = useState(null);
  const [started, setStarted] = useState(null);
  const filmShown = painted === lang && started === lang;
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [cue, setCue] = useState('');
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  // The composition's length until the player reports its own.
  const [duration, setDuration] = useState(FILM_SECONDS);

  // The slider's volume, for fades started from callbacks set up on an
  // older render.
  const volumeRef = useRef(volume);

  // With the sound on, pause and play fade the volume rather than cut it:
  // the film's audio stops dead on pause, and a voice cut off mid-word
  // comes out of the speakers as a click or a stutter.
  const pausing = useRef(false);
  function softPause() {
    const player = playerRef.current;
    if (player.paused || pausing.current) return;
    setPlaying(false);
    if (player.muted || player.volume === 0) {
      player.pause();
      return;
    }
    fadeVolume(0, 160);
    // Set after the fade starts, since starting one ends any pause in progress.
    pausing.current = true;
  }
  function softPlay() {
    const player = playerRef.current;
    setPlaying(true);
    // Pressed again while still fading out: it never stopped, so fade back.
    if (pausing.current) {
      pausing.current = false;
      fadeVolume(volumeRef.current, 160);
      return;
    }
    if (!player.paused) return;
    if (player.muted) {
      player.play();
      return;
    }
    stopFade();
    player.volume = 0;
    player.play();
    fadeVolume(volumeRef.current, 220);
  }

  // Ease the volume from where it is to `to` over `ms`.
  function fadeVolume(to, ms) {
    const player = playerRef.current;
    stopFade();
    ramping.current = true;
    const from = player.volume;
    const t0 = performance.now();
    const finish = () => {
      player.volume = to;
      stopFade();
    };
    const ramp = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      player.volume = from + (to - from) * k;
      if (k < 1) rampRef.current = requestAnimationFrame(ramp);
      else finish();
    };
    rampRef.current = requestAnimationFrame(ramp);
    // Frames don't run in a background tab; make sure the fade still lands.
    rampDone.current = setTimeout(finish, ms + 150);
  }

  // Ending a fade-out, whether it ran its course or a volume change cut it
  // short, completes the pause it was for. The volume stays at zero: the
  // film's audio stops a moment after pause() returns, and putting the
  // volume back straight away lets a burst of it through. Playing again
  // fades it back up.
  function stopFade() {
    cancelAnimationFrame(rampRef.current);
    clearTimeout(rampDone.current);
    ramping.current = false;
    if (pausing.current) {
      pausing.current = false;
      playerRef.current.pause();
    }
  }

  // Start playback on its own. The film plays while any of it is on screen
  // and pauses once it has been scrolled past; a pause the visitor chose
  // outranks that until they press play again. Reduced motion never
  // autoplays. Sound is never forced here: browsers only allow a muted start.
  function autoPlay() {
    const player = playerRef.current;
    if (!live.current || !player || userPaused.current) return;
    if (window.matchMedia(REDUCED_QUERY).matches) return;
    softPlay();
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

      // Play while any part of the film is on screen, between the fixed
      // navbar and the bottom of the window — not only while all of it is.
      // Scrolling past the frame is what stops it, nothing less. Act on
      // changes only, so a pause or play the visitor chose isn't
      // overridden mid-view.
      const screen = el.querySelector('.hfilm__screen').getBoundingClientRect();
      // Fetch the film once the block comes within 300px of the window: a
      // visitor who never scrolls this far downloads none of it.
      if (screen.top < window.innerHeight + 300 && screen.bottom > -300) {
        nearWindow.current = true;
        loadFilm.current?.();
      }
      const top = document.querySelector('.nav')?.getBoundingClientRect().bottom ?? 0;
      const shown = Math.min(screen.bottom, window.innerHeight) - Math.max(screen.top, top);
      const seen = shown > OFF_SCREEN_SLACK;
      if (seen !== onScreen.current) {
        onScreen.current = seen;
        if (seen) autoPlay();
        else if (live.current) softPause();
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
    // Poster only: neither the player's script nor the film is fetched.
    if (window.matchMedia(POSTER_ONLY_QUERY).matches) return;
    const player = playerRef.current;
    let current = true;

    function load() {
      if (!current || !live.current || player.hasAttribute('src')) return;
      player.setAttribute('runtime-src', new URL(`${FILM}/player/hyperframe.runtime.iife.js`, location.href).href);
      // ?bg=transparent turns the composition's own backdrop off so the film
      // sits on the page rather than in a box of its own (see LISEZ-MOI).
      const q = lang === 'fr' ? '?bg=transparent&lang=fr' : '?bg=transparent';
      player.setAttribute('src', new URL(`${FILM}/${FILM_LIVE}/index.html${q}`, location.href).href);
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
      if (onScreen.current) autoPlay();
    }).catch(() => {});

    return () => { current = false; live.current = false; loadFilm.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // The sound button and volume slider are the source of truth. A new player
  // (a language switch, key={lang}, or a hot reload in dev) starts muted, so
  // re-apply the setting after every render rather than at set moments. The
  // volume is left alone while paused: a soft pause parks it at zero, and
  // playing again fades it back (softPlay).
  useEffect(() => {
    volumeRef.current = volume;
    if (!live.current) return;
    const player = playerRef.current;
    if (player.muted !== muted) player.muted = muted;
    if (!ramping.current && !player.paused && player.volume !== volume) player.volume = volume;
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
    if (onScreen.current) autoPlay();
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
    const onPlay = () => setStarted(lang);
    const onReady = () => steadyCamera(player);
    const onPainted = () => { steadyCamera(player); setPainted(lang); };
    const onTime = (e) => {
      const at = e.detail?.currentTime ?? player.currentTime ?? 0;
      const active = cues.current.find((c) => at >= c.start && at < c.end);
      setCue(active ? active.text : '');
      // while a thumb is down the bar is the visitor's, not the film's
      if (!scrubbing.current) setTime(at);
    };
    const onPlaying = () => setPlaying(true);
    const onPaused = () => setPlaying(false);
    const onDuration = () => { if (player.duration > 0) setDuration(player.duration); };
    player.addEventListener('play', onPlay);
    player.addEventListener('play', onPlaying);
    player.addEventListener('pause', onPaused);
    player.addEventListener('durationchange', onDuration);
    player.addEventListener('ready', onDuration);
    player.addEventListener('ready', onReady);
    player.addEventListener('painted', onPainted);
    player.addEventListener('timeupdate', onTime);
    return () => {
      player.removeEventListener('play', onPlay);
      player.removeEventListener('play', onPlaying);
      player.removeEventListener('pause', onPaused);
      player.removeEventListener('durationchange', onDuration);
      player.removeEventListener('ready', onDuration);
      player.removeEventListener('ready', onReady);
      player.removeEventListener('painted', onPainted);
      player.removeEventListener('timeupdate', onTime);
    };
  }, [lang]);

  function togglePlay() {
    const player = playerRef.current;
    if (!live.current || !player) return;
    if (player.paused || pausing.current) {
      userPaused.current = false;
      softPlay();
    } else {
      userPaused.current = true;
      softPause();
    }
  }


  // The bar follows the pointer while it's down, and the film follows the
  // bar. Seeking a paused film leaves it paused, so scrubbing back to look
  // at something doesn't start it again.
  function scrub(e) {
    const player = playerRef.current;
    const at = Number(e.target.value);
    setTime(at);
    if (live.current && player) player.seek(at);
  }

  // The player's seek() stops the film, so a film that was playing would sit
  // frozen after a scrub. Note whether it was playing when the thumb goes
  // down, and start it again once it's let go.
  const playAfterScrub = useRef(false);
  function startScrub() {
    if (scrubbing.current) return;
    scrubbing.current = true;
    const player = playerRef.current;
    playAfterScrub.current = !!(live.current && player && !player.paused);
  }
  function endScrub() {
    if (!scrubbing.current) return;
    scrubbing.current = false;
    if (playAfterScrub.current && live.current) playerRef.current.play();
    playAfterScrub.current = false;
  }



  // Sound on at `target` volume, from wherever the film has got to. It used
  // to jump back to 0:00 the first time so the voiceover was heard from its
  // first line, but that threw away whatever the visitor was watching; the
  // scrub bar is there if they want the start.
  function unmute(target, fade) {
    const player = playerRef.current;
    player.muted = false;
    setMuted(false);
    userPaused.current = false;
    // Unmuted mid fade-out: it plays on rather than finishing the pause.
    pausing.current = false;
    setPlaying(true);
    player.play();
    if (!fade) {
      player.volume = target;
      return;
    }
    // Ease the volume in rather than switching it on.
    player.volume = 0;
    fadeVolume(target, 450);
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
                // The poster covers the film while it loads; the player's own
                // black "Loading assets" screen would only show through it.
                assets-loading-ui="none"
              />

              {/* Held over the film until it first plays (and has painted a
                  frame), so the block shows the poster rather than the film's
                  opening frame standing still; then it fades out over the
                  playing film. Back at once on a language switch, while the
                  new film loads. */}
              <img
                className={`hfilm__poster${filmShown ? ' is-gone' : ''}`}
                aria-hidden={filmShown}
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

              {/* Quiet until the pointer is over the film: a line of elapsed
                  time, a play/pause, and a thumb to drag back. */}
              <div className="hfilm__bar">
                <button
                  type="button"
                  className="hfilm__btn hfilm__btn--play"
                  onClick={togglePlay}
                  aria-label={playing ? f.pause : f.play}
                >
                  <Svg>{playing ? Icon.pause : Icon.play}</Svg>
                </button>
                <div className="hfilm__seek">
                  <span className="hfilm__seek-fill" style={{ width: `${(time / duration) * 100}%` }} />
                  <input
                    type="range"
                    className="hfilm__seek-range"
                    min="0"
                    max={duration}
                    step="0.05"
                    value={Math.min(time, duration)}
                    onChange={scrub}
                    onPointerDown={startScrub}
                    onPointerUp={endScrub}
                    onPointerCancel={endScrub}
                    onKeyDown={startScrub}
                    onKeyUp={endScrub}
                    aria-label={f.seek}
                  />
                </div>
                <span className="hfilm__time">{clock(time)}</span>
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
