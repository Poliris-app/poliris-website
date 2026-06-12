import { useEffect } from 'react';

export default function useReveal(selector = '.reveal') {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible', 'in');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(selector).forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}
