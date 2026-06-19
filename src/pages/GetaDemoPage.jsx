import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';
import useReveal from '../hooks/useReveal';
import { useLang } from '../contexts/LangContext';
import '../demo.css';

const LOCK_ICON = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const ARROW_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

const CALENDAR_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);

const CHART_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

const PEOPLE_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const CARD_ICONS = {
  dark: CALENDAR_ICON,
  green: CHART_ICON,
  purple: PEOPLE_ICON,
};

export default function GetaDemoPage() {
  useReveal();
  const { t } = useLang();
  const d = t('demo');

  const [topic, setTopic] = useState(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', company: '', role: '', size: '', message: '', privacy: false });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, topicIndex: topic }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setTopic(null);
      setForm({ firstName: '', lastName: '', email: '', company: '', role: '', size: '', message: '', privacy: false });
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="demo-page">
      <Seo page="demo" />
      <Navbar />

      <main>
        <Hero
          eyebrow={d.hero.eyebrow}
          title={d.hero.title}
          lead={d.hero.lead}
          primaryCta={d.hero.primaryCta}
          secondaryCta={d.hero.secondaryCta}
          showDashboard={false}
          showAiBand={false}
        />

        <section className="demo-section">

          {/* ── Left: form ── */}
          <div className="demo-form-col">
            <p className="demo-eyebrow">{d.eyebrow}</p>
            <h1 className="demo-heading">{d.heading}</h1>
            <p className="demo-lead">{d.lead}</p>

            {/* Topic chips */}
            <div className="demo-chips">
              {d.topics.map((label, i) => (
                <button
                  key={i}
                  type="button"
                  className={`demo-chip${topic === i ? ' demo-chip--active' : ''}`}
                  onClick={() => setTopic(prev => prev === i ? null : i)}
                >
                  {label}
                </button>
              ))}
            </div>

            <form className="demo-form" onSubmit={handleSubmit} noValidate>
                <div className="demo-row">
                  <div className="demo-field">
                    <label className="demo-label">{d.fields.firstName}<span>*</span></label>
                    <input className="demo-input" name="firstName" placeholder={d.placeholders.firstName} value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div className="demo-field">
                    <label className="demo-label">{d.fields.lastName}<span>*</span></label>
                    <input className="demo-input" name="lastName" placeholder={d.placeholders.lastName} value={form.lastName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="demo-row">
                  <div className="demo-field">
                    <label className="demo-label">{d.fields.email}<span>*</span></label>
                    <input className="demo-input" name="email" type="email" placeholder={d.placeholders.email} value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="demo-field">
                    <label className="demo-label">{d.fields.company}</label>
                    <input className="demo-input" name="company" placeholder={d.placeholders.company} value={form.company} onChange={handleChange} />
                  </div>
                </div>

                <div className="demo-row">
                  <div className="demo-field">
                    <label className="demo-label">{d.fields.role}</label>
                    <select className="demo-select" name="role" value={form.role} onChange={handleChange}>
                      <option value="">{d.placeholders.select}</option>
                      {d.roleOptions.map((o, i) => <option key={i} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="demo-field">
                    <label className="demo-label">{d.fields.size}</label>
                    <select className="demo-select" name="size" value={form.size} onChange={handleChange}>
                      <option value="">{d.placeholders.select}</option>
                      {d.sizeOptions.map((o, i) => <option key={i} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div className="demo-field">
                  <label className="demo-label">{d.fields.message}<span>*</span></label>
                  <textarea
                    className="demo-textarea"
                    name="message"
                    placeholder={topic !== null ? d.messagePlaceholders[topic] : d.placeholders.message}
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>

                <div className="demo-privacy">
                  <input type="checkbox" id="demo-privacy" name="privacy" checked={form.privacy} onChange={handleChange} required />
                  <label className="demo-privacy-label" htmlFor="demo-privacy">
                    {d.privacyPre}
                    <a href="#" onClick={e => e.preventDefault()}>{d.privacyLink}</a>
                    {d.privacyPost}
                  </label>
                </div>

                {error && <p style={{ color: '#d2453a', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
                {sent && <div className="demo-success">{d.successMsg}</div>}

                <div className="demo-submit-row">
                  <button type="submit" className="demo-btn" disabled={sending}>
                    {sending ? 'Sending…' : <>{d.submit} {ARROW_ICON}</>}
                  </button>
                  <span className="demo-security">
                    {LOCK_ICON} {d.security}
                  </span>
                </div>
            </form>
          </div>

          {/* ── Right: info cards ── */}
          <div className="demo-info-col">
            <div className="demo-reply-badge">
              <span className="demo-reply-dot" />
              <span>{d.replyTime}</span>
            </div>

            {d.cards.map((card, i) => {
              const colorKey = ['dark', 'green', 'purple'][i];
              return (
                <div key={i} className="demo-card">
                  <div className={`demo-card-icon demo-card-icon--${colorKey}`}>
                    {CARD_ICONS[colorKey]}
                  </div>
                  <p className="demo-card-eyebrow">{card.eyebrow}</p>
                  <p className="demo-card-title">{card.title}</p>
                  <p className="demo-card-desc">{card.desc}</p>
                  <a href={card.href} className="demo-card-link" target="_blank" rel="noopener noreferrer">
                    {card.cta} {ARROW_ICON}
                  </a>
                </div>
              );
            })}
          </div>

        </section>

        <CtaBand
          heading={d.cta.heading}
          lead={d.cta.lead}
          primaryCta={d.cta.primaryCta}
          secondaryCta={d.cta.secondaryCta}
          note={d.cta.note}
        />
      </main>

      <Footer />
    </div>
  );
}
