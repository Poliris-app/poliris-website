/* The hero image inside the "Kate writes it" card: the earbuds with the
 * ambient noise arriving on one side and the processed output leaving the
 * other.
 *
 * A photograph rather than drawn artwork. It replaced an inline SVG, which
 * is why this is still a component and not an <img> at the call sites: both
 * acts of the demo show the same picture, and one import keeps them in step.
 *
 * `cover` rather than `contain`, matching the preserveAspectRatio="slice"
 * the artwork used, because the two boxes it fills are different shapes
 * (140 x 76 in act 2, 210 x 118 in act 3) and letterboxing either would
 * show the card's grey through the gap.
 */
import { useLang } from '../contexts/LangContext';

const SRC = `${import.meta.env.BASE_URL}hero-anc.webp`;

// Not alt="": scripts/seo-check.mjs (Screaming Frog's rule) fails the build
// on an empty alt, even for a decorative image.
const ALT = {
  en: 'Wireless earbuds with active noise cancellation',
  fr: 'Écouteurs sans fil à réduction de bruit active',
};

export default function HeroArt({ style }) {
  const { lang } = useLang();
  return (
    <img
      src={SRC}
      alt={ALT[lang] ?? ALT.en}
      width="1200"
      height="654"
      loading="lazy"
      decoding="async"
      style={{ objectFit: 'cover', ...style }}
    />
  );
}
