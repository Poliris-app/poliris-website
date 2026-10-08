import { useEffect, useRef, useState } from 'react';

/* Lottie animations for the "How it works" steps.
   Files live in src/assets/lottie/ (track.json, fix.json, publish.json).
   Source: LottieFiles (fix/publish: Weblodge line-icon series; track:
   #113700 "graph") — Lottie Simple License, free for
   commercial use, no attribution needed — recolored to Poliris
   blue with a soft-blue accent and the white background layer removed.

   lottie-web touches `document` on import, so the player is loaded lazily
   in the browser only — never during the SSG build. Until it is ready (and
   with no JS), the step shows its built-in SVG fallback. */
const ICONS = import.meta.glob('../assets/lottie/*.json', { import: 'default' });

const MAX_PLAY_SECONDS = 1.6;

/* Controlled by the parent: the icon rests on its finished last frame
   until `active` turns true for a new `playKey`, plays once from the
   start, then calls `onDone` and rests on the last frame again.
   With reduced motion, or if the animation can't load, it reports done
   straight away so the sequence never stalls. */
export default function StepLottieIcon({ name, fallback, active = false, playKey = 0, onDone }) {
  const boxRef = useRef(null);
  const animRef = useRef(null);
  const doneRef = useRef(onDone);
  const playedKeyRef = useRef(null);
  const [status, setStatus] = useState('loading'); // loading | ready | failed

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  // Load the player and the icon data in the browser
  useEffect(() => {
    const loadIcon = ICONS[`../assets/lottie/${name}.json`];
    if (!loadIcon || !boxRef.current) {
      setStatus('failed');
      return undefined;
    }
    let cancelled = false;
    Promise.all([import('lottie-web/build/player/lottie_light'), loadIcon()])
      .then(([mod, data]) => {
        if (cancelled) return;
        const anim = mod.default.loadAnimation({
          container: boxRef.current,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData: data,
        });
        // Keep every step brisk: longer animations are sped up to fit
        const seconds = anim.getDuration(false);
        if (seconds > MAX_PLAY_SECONDS) anim.setSpeed(seconds / MAX_PLAY_SECONDS);
        anim.addEventListener('complete', () => doneRef.current?.());
        // Rest on the finished drawing until it's this icon's turn
        anim.goToAndStop(anim.totalFrames - 1, true);
        animRef.current = anim;
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('failed');
      });
    return () => {
      cancelled = true;
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, [name]);

  // Play once each time it's this step's turn
  useEffect(() => {
    if (!active || status === 'loading' || playedKeyRef.current === playKey) return;
    playedKeyRef.current = playKey;
    const anim = animRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (status === 'failed' || !anim || reduce) {
      anim?.goToAndStop(anim.totalFrames - 1, true);
      doneRef.current?.();
      return;
    }
    anim.goToAndPlay(0, true);
  }, [active, playKey, status]);

  const ready = status === 'ready';
  return (
    <>
      {!ready && fallback}
      <span ref={boxRef} className="how__lottie" hidden={!ready} />
    </>
  );
}
