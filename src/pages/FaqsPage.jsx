import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';
import useReveal from '../hooks/useReveal';
import '../faqs.css';

const FAQ_GROUPS = [
  {
    label: 'Getting Started',
    items: [
      {
        q: 'What is GEO?',
        a: 'Generative Engine Optimisation (GEO) is the practice of making your brand visible inside AI-generated answers — in tools like ChatGPT, Perplexity, Gemini, and Copilot. Where traditional SEO targets search rankings, GEO targets citations and mentions inside AI responses.',
      },
      {
        q: 'Why is GEO essential?',
        a: 'AI engines are increasingly the first stop for research, product discovery, and brand comparisons. If your brand isn\'t cited in those answers, you\'re invisible at the moment buyers are forming an opinion — often before they ever visit your site.',
      },
      {
        q: 'Which AI platforms are supported?',
        a: 'Poliris tracks visibility across ChatGPT, Perplexity, Gemini, Claude, Copilot, Grok, Mistral, and DeepSeek. We add new engines as they reach meaningful market share.',
      },
      {
        q: 'Which markets and languages do you cover?',
        a: 'We currently support English, French, German, Spanish, and Portuguese across major global markets. Additional languages are being added on a rolling basis — reach out if yours isn\'t listed.',
      },
      {
        q: 'Is my site\'s data secure?',
        a: 'Yes. Poliris only reads publicly available signals — we never access your CMS, database, or backend. All data in transit is TLS-encrypted and stored in ISO 27001-certified infrastructure.',
      },
    ],
  },
  {
    label: 'The Audit',
    items: [
      {
        q: 'What does the scoping audit include?',
        a: 'The scoping audit gives you a fast read on where you stand: an AI visibility score, your share-of-voice across the main engines, top sentiment themes, and a prioritised list of gaps to address. It runs in minutes.',
      },
      {
        q: 'What does the full audit include?',
        a: 'The full audit covers AI visibility by product and market, sentiment analysis (tone, qualifiers, narrative), a technical crawlability report, competitor citation benchmarking, and a ranked action plan with effort and impact scores.',
      },
      {
        q: 'Scoping audit vs full audit — which one do I need?',
        a: 'Start with the scoping audit if you\'re new to GEO or want to validate the opportunity before committing. Upgrade to the full audit when you need the complete picture to brief a team or set a roadmap.',
      },
      {
        q: 'How do you assess AI sentiment?',
        a: 'We send structured prompts to each AI engine and analyse how they describe your brand — the adjectives used, the qualifiers, the context they place you in, and how that compares to how they describe your competitors.',
      },
      {
        q: 'How do you measure visibility?',
        a: 'Visibility is measured as citation rate: out of a representative sample of relevant queries, how often does your brand appear in the AI response? We break this down by product category, competitor set, and engine.',
      },
      {
        q: 'How is the score calculated per pillar?',
        a: 'Each pillar (Visibility, Sentiment, Technical) is scored 0–100 using a combination of deterministic checks, LLM-based qualitative evaluation, and benchmarking against category averages. Scores are weighted and combined into an overall GEO health score.',
      },
    ],
  },
  {
    label: 'Deliverables & Process',
    items: [
      {
        q: 'What are the timelines?',
        a: 'The scoping audit is available in the dashboard within minutes of setup. Full audits typically complete within 24 hours depending on site size and the number of markets tracked.',
      },
      {
        q: 'What deliverables do you receive?',
        a: 'You get a live dashboard (always up to date), a PDF snapshot report for stakeholders, an exportable action plan, and — if you\'re on a plan with Kate — draft content targeted at your top gaps.',
      },
      {
        q: 'What action plans does Poliris propose after the audit?',
        a: 'Action plans are ranked by impact-to-effort ratio and tied directly to the gaps in your audit. Each action includes a plain-English explanation of why it matters, what to change, and an estimate of the visibility lift.',
      },
      {
        q: 'What ROI can be expected?',
        a: 'This varies by brand and category, but clients typically see measurable visibility lift within 60–90 days of acting on the top recommendations. We help you set a baseline so you can track improvement directly in the dashboard.',
      },
      {
        q: 'Do you work with SEO agencies and partners?',
        a: 'Yes. We have a partner programme for agencies that want to offer GEO audits and content to their clients. Reach out via the contact page to discuss white-label or reseller arrangements.',
      },
    ],
  },
  {
    label: 'Content & Kate',
    items: [
      {
        q: 'What is Kate?',
        a: 'Kate is Poliris\'s AI content agent. She\'s pre-loaded with your audit data — visibility gaps, sentiment findings, brand, products and audiences — and writes articles designed to close those gaps and get you cited in AI answers.',
      },
      {
        q: 'Is Kate included in all plans?',
        a: 'Kate is available on all paid plans. The number of articles you can generate per month depends on your plan tier. All plans include unlimited scoring and optimisation of existing content.',
      },
      {
        q: 'Can Kate publish directly to my site?',
        a: 'Yes. Kate integrates with major CMS platforms (WordPress, Webflow, Contentful, and more) and can push a formatted, linked article live with a single approval click — no copy-paste, no developer needed.',
      },
    ],
  },
];

function FaqGroup({ group, openId, onToggle }) {
  return (
    <div className="faqs-group">
      <div className="faqs-group-hdr">{group.label}</div>
      {group.items.map((item, i) => {
        const id = `${group.label}-${i}`;
        const isOpen = openId === id;
        return (
          <div key={i} className={`faq2-item${isOpen ? ' open' : ''}`}>
            <button className="faq2-btn" onClick={() => onToggle(id)} aria-expanded={isOpen}>
              <span className="faq2-q">{item.q}</span>
              <span className="faq2-icon">+</span>
            </button>
            <div className="faq2-body">
              <p className="faq2-a">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function FaqsPage() {
  useReveal();
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState(null);
  const inputRef = useRef(null);

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
  const filtered = FAQ_GROUPS.map(group => ({
    ...group,
    items: group.items.filter(item =>
      !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    ),
  })).filter(group => group.items.length > 0);

  return (
    <div>
      <Navbar />
      <main>
        <Hero
          eyebrow="FAQs"
          title="Answers, before you ask."
          lead="Plain-English answers to the questions teams ask most. Search the list, or browse from the top."
          primaryCta="Start free trial"
          secondaryCta="Book a demo"
          showDashboard={false}
          showAiBand={false}
        />

        <section className="faqs-sec">
          <div className="faqs-wrap">

            {/* Search */}
            <div className="faqs-search">
              <span className="faqs-search-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
                </svg>
              </span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask anything"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <span className="faqs-search-slash">/</span>
            </div>

            {/* FAQ groups */}
            {filtered.length > 0 ? (
              filtered.map((group, i) => (
                <FaqGroup key={i} group={group} openId={openId} onToggle={toggle} />
              ))
            ) : (
              <p className="faqs-empty">No results for "{search}"</p>
            )}

          </div>
        </section>

        <CtaBand
          heading="Still have questions?"
          lead="Our team usually replies within an hour during business hours."
          primaryCta="Talk to us"
          secondaryCta="Start free trial"
          note="No credit card · Cancel anytime"
        />
      </main>
      <Footer />
    </div>
  );
}
