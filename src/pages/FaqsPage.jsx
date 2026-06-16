import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';
import useReveal from '../hooks/useReveal';
import { useLang } from '../contexts/LangContext';
import '../faqs.css';

function FaqItem({ item, id, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  const { intro, bullets, callout } = item.a;

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen, intro, bullets, callout]);

  return (
    <div className={`faq2-item${isOpen ? ' open' : ''}`}>
      <button className="faq2-btn" onClick={() => onToggle(id)} aria-expanded={isOpen}>
        <span className="faq2-q">{item.q}</span>
        <span className="faq2-icon">+</span>
      </button>
      <div className="faq2-body" style={{ height }}>
        <div ref={contentRef} className="faq2-content">
          <p className="faq2-a">{intro}</p>
          {bullets && (
            <ul className="faq2-list">
              {bullets.map((b, bi) => (
                <li key={bi}><b>{b.label}</b> {b.text}</li>
              ))}
            </ul>
          )}
          {callout && <div className="faq2-callout">{callout}</div>}
        </div>
      </div>
    </div>
  );
}

function FaqGroup({ group, openId, onToggle }) {
  return (
    <div className="faqs-group">
      <h2 className="faqs-group-hdr">{group.label}</h2>
      {group.items.map((item, i) => {
        const id = `${group.label}-${i}`;
        return (
          <FaqItem key={i} item={item} id={id} isOpen={openId === id} onToggle={onToggle} />
        );
      })}
    </div>
  );
}

export default function FaqsPage() {
  useReveal();
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [openId, setOpenId] = useState(null);
  const inputRef = useRef(null);

  const fh   = t('faqs.hero');
  const fcta = t('faqs.cta');
  const allLabel = t('faqs.allLabel');
  const FAQ_GROUPS = t('faqs.groups');
  const totalQ = FAQ_GROUPS.reduce((acc, g) => acc + g.items.length, 0);
  const categories = [{ id: 'all', label: allLabel }, ...FAQ_GROUPS.map(g => ({ id: g.label, label: g.label }))];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function toggle(id) {
    setOpenId(prev => prev === id ? null : id);
  }

  const q = search.toLowerCase();
  const byCategory = category === 'all'
    ? FAQ_GROUPS
    : FAQ_GROUPS.filter(group => group.label === category);
  const filtered = byCategory.map(group => ({
    ...group,
    items: group.items.filter(item => !q || item.q.toLowerCase().includes(q)),
  })).filter(group => group.items.length > 0);

  return (
    <div>
      <Seo page="faqs" />
      <Navbar />
      <main>
        <Hero
          eyebrow={fh.eyebrow}
          title={fh.title}
          lead={fh.lead}
          primaryCta={fh.primaryCta}
          secondaryCta={fh.secondaryCta}
          showDashboard={false}
          showAiBand={false}
          bottom={
            <div className="faq-hero-bottom">
              <div className="faq-stats">
                <span><strong>{totalQ}</strong> {fh.statsQ}</span>
                <span className="faq-stats-dot" aria-hidden="true">·</span>
                <span><strong>{FAQ_GROUPS.length}</strong> {fh.statsTopics}</span>
                <span className="faq-stats-dot" aria-hidden="true">·</span>
                <span>{fh.statsDocs}</span>
              </div>
              <div className="faqs-search faq-hero-search">
                <span className="faqs-search-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
                  </svg>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={t('faqs.searchPlaceholder')}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <span className="faqs-search-slash">/</span>
              </div>
            </div>
          }
        />

        <section className="faqs-sec">
          <div className="faqs-wrap">

            {/* Category filter */}
            <div className="faqs-cats">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`faqs-cat${category === cat.id ? ' faqs-cat--active' : ''}`}
                  onClick={() => setCategory(cat.id)}
                  aria-pressed={category === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* FAQ groups */}
            {filtered.length > 0 ? (
              filtered.map((group, i) => (
                <FaqGroup key={i} group={group} openId={openId} onToggle={toggle} />
              ))
            ) : (
              <p className="faqs-empty">{t('faqs.noResults')} "{search}"</p>
            )}

          </div>
        </section>

        <CtaBand
          heading={fcta.heading}
          lead={fcta.lead}
          primaryCta={fcta.primaryCta}
          secondaryCta={fcta.secondaryCta}
          note={fcta.note}
        />
      </main>
      <Footer />
    </div>
  );
}
