import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const rotatingWords = ['ChatGPT', 'Gemini', 'Mistral', 'Deepseek', 'Claude', 'Perplexity'];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const ref = useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % rotatingWords.length);
        setFading(false);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Decorative blur */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <div className="w-[700px] h-[700px] rounded-full bg-[#1e3893]/5 blur-3xl" />
      </div>

      <div ref={ref} className="reveal relative max-w-5xl mx-auto px-6 text-center">
        <h1 className="font-display font-semibold leading-[1em] tracking-tight text-[clamp(2.8rem,8vw,4.5rem)] mb-5">
          Prenez le contrôle de votre image sur&nbsp;:{' '}
          <br className="hidden sm:block" />
          <span
            className="text-[#1e3893] inline-block transition-opacity duration-300"
            style={{ opacity: fading ? 0 : 1 }}
          >
            {rotatingWords[wordIndex]}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-8 font-body">
          Poliris, votre partenaire GEO
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-black text-white font-semibold rounded-full hover:bg-[#1e3893] transition-colors text-sm md:text-base"
          >
            Découvrir nos services
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#contact-modal"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-black text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors text-sm md:text-base"
          >
            Parler à un expert
          </a>
        </div>
      </div>
    </section>
  );
}
