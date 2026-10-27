import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLang } from '../contexts/LangContext';

/**
 * Product film (public/livraison/) — sits in the landing hero. It plays
 * muted and looped only while the whole video fits on screen (below the
 * fixed navbar), and pauses as soon as it's scrolled partly out of view;
 * sound only comes on from the button bottom-right.
 * The first time sound comes on, the film restarts so the voiceover is
 * heard from its first line.
 *
 * Captions are drawn by us (the track is "hidden") so they can be styled.
 * They're off until the visitor turns them on with the CC button.
 *
 * Scroll reveal: --p eases 0→1 over REVEAL_PX of scroll from the moment
 * the section enters the viewport and drives the tracing light; --t
 * finishes at FLAT_AT and scales the frame up to full size (it reaches
 * exactly 1 so the video isn't left resampled and soft). --p also opens
 * the orbit rings around the frame. Phones and reduced motion pin both to 1.
 */
const MEDIA = `${import.meta.env.BASE_URL}livraison`;
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const REVEAL_PX = 480;
const FLAT_AT = 0.85;
const STILL_QUERY = '(max-width: 768px), (prefers-reduced-motion: reduce)';
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
// How many px of the video may sit off screen and still count as "fits".
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

export default function HeroFilm() {
  const { lang, t } = useLang();
  const f = t('film');
  const ref = useRef(null);
  const videoRef = useRef(null);
  const userPaused = useRef(false);
  const heardSound = useRef(false);
  const rampRef = useRef(0);
  const rampDone = useRef(0);
  const ramping = useRef(false);
  const fitting = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [cue, setCue] = useState('');

  // Start playback on its own (not from a click). A pause the visitor asked
  // for sticks until they press play again; reduced motion never autoplays.
  function autoPlay() {
    const video = videoRef.current;
    if (userPaused.current || window.matchMedia(REDUCED_QUERY).matches) return;
    video.play().catch(() => {
      // Playing with sound was refused: fall back to muted.
      if (video.muted) return;
      video.muted = true;
      setMuted(true);
      video.play().catch(() => {});
    });
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
      // At full size the frame drops its transform so the video isn't resampled.
      el.toggleAttribute('data-done', t >= 1);

      // Play only while the video fits on screen, between the fixed navbar
      // and the bottom of the window; when the window is too short for all
      // of it, while it fills what's visible. Act on changes only, so a
      // pause or play the visitor chose isn't overridden mid-view.
      const screen = el.querySelector('.hfilm__screen').getBoundingClientRect();
      const top = document.querySelector('.nav')?.getBoundingClientRect().bottom ?? 0;
      const shown = Math.min(screen.bottom, window.innerHeight) - Math.max(screen.top, top);
      const fits = shown >= Math.min(screen.height, window.innerHeight - top) - FIT_SLACK;
      if (fits !== fitting.current) {
        fitting.current = fits;
        if (fits) autoPlay();
        else videoRef.current.pause();
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

  // The sound button and volume slider are the source of truth. Any new <video> element (a
  // language switch, key={lang}, or a hot reload in dev) is created muted,
  // so re-apply the setting after every render rather than at set moments.
  useEffect(() => {
    const video = videoRef.current;
    if (video.muted !== muted) video.muted = muted;
    if (!ramping.current && video.volume !== volume) video.volume = volume;
  });

  // Switching language swaps in a new <video>, which starts at 0:00. Both
  // versions share the same footage, so pick up at the same moment.
  const resumeAt = useRef(0);
  useEffect(() => {
    const video = videoRef.current;
    const at = resumeAt.current;
    if (at) {
      const seek = () => { video.currentTime = at; };
      if (video.readyState >= 1) seek();
      else video.addEventListener('loadedmetadata', seek, { once: true });
    }
    return () => { resumeAt.current = video.currentTime; };
  }, [lang]);

  // A language switch swaps in a new <video>: start it if the film is
  // already in view.
  useEffect(() => {
    if (fitting.current) autoPlay();
  }, [lang]);

  // Captions: read the cues ourselves instead of letting the browser draw them.
  useEffect(() => {
    const track = videoRef.current.textTracks[0];
    if (!track) return;
    track.mode = 'hidden';
    const onCue = () => {
      const active = track.activeCues?.[0];
      setCue(active ? active.text : '');
    };
    track.addEventListener('cuechange', onCue);
    return () => track.removeEventListener('cuechange', onCue);
  }, [lang]);

  useEffect(() => {
    const video = videoRef.current;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [lang]);

  function togglePlay() {
    const video = videoRef.current;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
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
    const video = videoRef.current;
    if (!heardSound.current) {
      heardSound.current = true;
      video.currentTime = 0;
    }
    video.muted = false;
    setMuted(false);
    userPaused.current = false;
    video.play().catch(() => {});
    if (!fade) {
      video.volume = target;
      return;
    }
    // Ease the volume in rather than switching it on.
    ramping.current = true;
    video.volume = 0;
    const t0 = performance.now();
    const ramp = (now) => {
      const k = Math.min(1, (now - t0) / 450);
      video.volume = k * target;
      if (k < 1) rampRef.current = requestAnimationFrame(ramp);
      else ramping.current = false;
    };
    rampRef.current = requestAnimationFrame(ramp);
    // Frames don't run in a background tab; make sure the fade still lands.
    rampDone.current = setTimeout(() => {
      stopFade();
      video.volume = target;
    }, 600);
  }

  function toggleSound() {
    const video = videoRef.current;
    stopFade();
    if (!muted) {
      video.muted = true;
      video.volume = volume;
      setMuted(true);
      return;
    }
    // Slider was dragged to zero: come back at full volume.
    const target = volume > 0 ? volume : 1;
    setVolume(target);
    unmute(target, true);
  }

  function changeVolume(e) {
    const video = videoRef.current;
    const v = Number(e.target.value);
    stopFade();
    setVolume(v);
    video.volume = v;
    if (v === 0 && !muted) {
      video.muted = true;
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
              <video
                key={lang}
                ref={videoRef}
                className="hfilm__video"
                src={`${MEDIA}/videos/poliris-film-${lang}-1080p.mp4`}
                poster={`${MEDIA}/apercus/poliris-film-${lang}-apercu.webp`}
                muted
                loop
                playsInline
                preload="metadata"
                width="1920"
                height="1080"
                onClick={togglePlay}
              >
                <track
                  kind="subtitles"
                  src={`${MEDIA}/sous-titres/poliris-film-${lang}.vtt`}
                  srcLang={lang}
                  label={lang === 'fr' ? 'Français' : 'English'}
                  default
                />
              </video>

              {!playing && (
                <button type="button" className="hfilm__bigplay" onClick={togglePlay} aria-label={f.play}>
                  <Svg>{Icon.play}</Svg>
                </button>
              )}

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
                      it floats over the video, so nothing shifts. */}
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
