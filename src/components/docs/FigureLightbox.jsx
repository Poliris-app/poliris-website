import { useEffect } from 'react';
import { createPortal } from 'react-dom';

// A screenshot opened at full size over the page. Shown scaled down in the
// column, the dense ones are hard to read; clicking one lands here.
export default function FigureLightbox({ image, onClose, closeLabel }) {
  useEffect(() => {
    if (!image) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [image, onClose]);

  if (!image) return null;

  return createPortal(
    <div className="docs-lightbox" role="dialog" aria-modal="true" aria-label={image.alt} onClick={onClose}>
      <button type="button" className="docs-lightbox__close" aria-label={closeLabel} onClick={onClose}>×</button>
      <figure className="docs-lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.alt} />
        {image.alt ? <figcaption>{image.alt}</figcaption> : null}
      </figure>
    </div>,
    document.body,
  );
}
