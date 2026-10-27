import { iconPath } from './chapterMeta';

/** The chapter's icon in a tinted tile; `--accent` comes from the caller. */
export default function ChapterIcon({ slug, size = 'md' }) {
  return (
    <span className={`docs-icon docs-icon--${size}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={iconPath(slug)} />
      </svg>
    </span>
  );
}
