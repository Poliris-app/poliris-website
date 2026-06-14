import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';
import useReveal from '../hooks/useReveal';
import { useLang } from '../contexts/LangContext';
import '../glossary.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const sortAlpha = arr => [...arr].sort((a, b) => a.term.localeCompare(b.term));

export default function GlossaryPage() {
  useReveal();
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [letter, setLetter] = useState(null);
  const inputRef = useRef(null);

  const gh   = t('glossary.hero');
  const gcta = t('glossary.cta');
  const tabs  = t('glossary.tabs');
  const TERMS = t('glossary.terms');

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const byCategory = filter === 'all'
    ? TERMS
    : TERMS.filter(term => term.category === filter);

  const activeLetters = new Set(byCategory.map(term => term.term[0].toUpperCase()));

  const q = search.toLowerCase();
  let visible = byCategory.filter(term => {
    const matchSearch = !q || term.term.toLowerCase().includes(q) || (typeof term.def === 'string' && term.def.toLowerCase().includes(q));
    const matchLetter = !letter || term.term[0].toUpperCase() === letter;
    return matchSearch && matchLetter;
  });

  let sorted;
  if (filter === 'all' && !q && !letter) {
    const poliris = sortAlpha(visible.filter(term => term.category === 'poliris'));
    const geo     = sortAlpha(visible.filter(term => term.category === 'geo'));
    sorted = [...poliris, ...geo];
  } else {
    sorted = sortAlpha(visible);
  }

  function toggleLetter(l) {
    setLetter(prev => prev === l ? null : l);
  }

  return (
    <div>
      <Navbar />
      <main>
        <Hero
          eyebrow={gh.eyebrow}
          title={<>{gh.titlePre} <span style={{ color: 'var(--poliris-blue)' }}>{gh.titleHl}</span> {gh.titlePost}</>}
          lead={gh.lead}
          primaryCta={gh.primaryCta}
          secondaryCta={gh.secondaryCta}
          showDashboard={false}
          showAiBand={false}
        />

        <section className="gloss-sec">
          <div className="gloss-wrap">

            {/* Toolbar */}
            <div className="gloss-toolbar">
              <div className="gloss-search">
                <span className="gloss-search-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
                  </svg>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={t('glossary.searchPlaceholder')}
                  value={search}
                  onChange={e => { setSearch(e.target.value); setLetter(null); }}
                />
                <span className="gloss-search-kbd">
                  <span>⌘</span>
                  <span>K</span>
                </span>
              </div>

              <div className="gloss-tabs">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`gloss-tab${filter === tab.id ? ' gloss-tab--active' : ''}`}
                    onClick={() => { setFilter(tab.id); setLetter(null); }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Alphabet nav */}
            <div className="gloss-alpha">
              {ALPHABET.map(l => (
                <button
                  key={l}
                  className={`gloss-alpha-btn${letter === l ? ' gloss-alpha-btn--active' : ''}${!activeLetters.has(l) ? ' gloss-alpha-btn--empty' : ''}`}
                  onClick={() => toggleLetter(l)}
                  disabled={!activeLetters.has(l)}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="gloss-grid">
              {sorted.length > 0 ? sorted.map((term, i) => (
                <div key={i} className="gloss-card">
                  <span className={`gloss-badge gloss-badge--${term.category}`}>
                    {term.category === 'poliris' ? 'Poliris' : 'GEO & AI'}
                  </span>
                  <p className="gloss-term">{term.term}</p>
                  <p className="gloss-def">{term.def}</p>
                </div>
              )) : (
                <p className="gloss-empty">{t('glossary.noResults')}</p>
              )}
            </div>

          </div>
        </section>

        <CtaBand
          heading={gcta.heading}
          lead={gcta.lead}
          primaryCta={gcta.primaryCta}
          secondaryCta={gcta.secondaryCta}
          note={gcta.note}
        />
      </main>
      <Footer />
    </div>
  );
}
