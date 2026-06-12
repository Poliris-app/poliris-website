import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';
import useReveal from '../hooks/useReveal';
import '../blog.css';

const CATEGORIES = ['ALL', 'GEO', 'VISIBILITY', 'SENTIMENT', 'AUDIT', 'TRENDS'];

const POSTS = [
  {
    id: 1,
    featured: true,
    label: 'AI · SEARCH',
    gradient: 'radial-gradient(ellipse 65% 65% at 72% 22%, rgba(88,124,220,0.52) 0%, transparent 62%), radial-gradient(ellipse 55% 55% at 18% 78%, rgba(148,182,255,0.32) 0%, transparent 62%), #dce8ff',
    title: 'Why AI search is the new homepage.',
    desc: "Buyers now form an opinion about your brand inside ChatGPT, Perplexity, and Gemini long before they ever visit your site. Here's the new operating model and where to start.",
    author: 'Poliris Team',
    date: 'May 28, 2026',
    category: 'GEO',
  },
  {
    id: 2,
    label: 'SEO → GEO',
    gradient: 'radial-gradient(ellipse 60% 60% at 28% 72%, rgba(60,190,110,0.52) 0%, transparent 62%), radial-gradient(ellipse 50% 50% at 75% 28%, rgba(140,230,170,0.30) 0%, transparent 60%), #dff5e8',
    title: 'SEO vs GEO   what changes when AI becomes the front page.',
    desc: "The same playbook that won Google clicks won't win an AI citation. A short field guide to the new visibility layer.",
    date: 'May 24, 2026',
    category: 'GEO',
  },
  {
    id: 3,
    label: 'LLM SOV',
    gradient: 'radial-gradient(ellipse 60% 60% at 62% 38%, rgba(90,110,220,0.50) 0%, transparent 62%), radial-gradient(ellipse 45% 45% at 25% 70%, rgba(160,180,245,0.28) 0%, transparent 58%), #dce4f8',
    title: 'How to measure LLM visibility, without guessing.',
    desc: "Share-of-voice, citation rate, and brand-mention frequency. The three numbers every modern brand should track across AI engines.",
    date: 'May 20, 2026',
    category: 'VISIBILITY',
  },
  {
    id: 4,
    label: 'SENTIMENT',
    gradient: 'radial-gradient(ellipse 62% 62% at 70% 28%, rgba(220,80,130,0.48) 0%, transparent 62%), radial-gradient(ellipse 50% 50% at 28% 74%, rgba(255,160,190,0.28) 0%, transparent 58%), #fce8f0',
    title: 'The tone AI uses about your brand is now part of the funnel.',
    desc: 'Why "how" you appear matters as much as "where" you appear, and how to track the qualifiers shaping buyer perception.',
    date: 'May 17, 2026',
    category: 'SENTIMENT',
  },
  {
    id: 5,
    label: 'AUDIT',
    gradient: 'radial-gradient(ellipse 60% 60% at 28% 70%, rgba(230,165,40,0.52) 0%, transparent 62%), radial-gradient(ellipse 50% 50% at 72% 28%, rgba(255,210,100,0.28) 0%, transparent 58%), #fef6d0',
    title: 'The technical audit, reimagined for the AI-readable web.',
    desc: "Three pillars   Access, Structure, Content. What changes when your audience is no longer just a crawler.",
    date: 'May 14, 2026',
    category: 'AUDIT',
  },
  {
    id: 6,
    label: 'TRENDS',
    gradient: 'radial-gradient(ellipse 60% 60% at 60% 38%, rgba(140,100,220,0.50) 0%, transparent 62%), radial-gradient(ellipse 48% 48% at 28% 68%, rgba(190,160,245,0.28) 0%, transparent 58%), #ede8fc',
    title: 'AI search in 2026   five shifts every brand should plan for.',
    desc: "From answer-first behavior to vertical AI engines. The shifts redrawing the search map this year.",
    date: 'May 11, 2026',
    category: 'TRENDS',
  },
  {
    id: 7,
    label: 'AEO',
    gradient: 'radial-gradient(ellipse 60% 60% at 72% 22%, rgba(50,190,150,0.50) 0%, transparent 62%), radial-gradient(ellipse 48% 48% at 24% 74%, rgba(120,230,200,0.28) 0%, transparent 58%), #ddf5ee',
    title: "Answer engines reward structure. Here's the structure to ship.",
    desc: "Definition blocks, direct answers, numbered lists, and the FAQ pattern that LLMs lift verbatim into responses.",
    date: 'May 7, 2026',
    category: 'GEO',
  },
  {
    id: 8,
    label: 'BRAND OS',
    gradient: 'radial-gradient(ellipse 60% 60% at 30% 62%, rgba(70,130,220,0.50) 0%, transparent 62%), radial-gradient(ellipse 48% 48% at 72% 30%, rgba(140,190,255,0.28) 0%, transparent 58%), #dceeff',
    title: 'What an AI-driven brand intelligence platform actually does.',
    desc: "From dashboards to direct implementation. A walkthrough of the layer that sits between your brand and every AI engine.",
    date: 'May 3, 2026',
    category: 'VISIBILITY',
  },
  {
    id: 9,
    label: 'AI · NATIVE',
    gradient: 'radial-gradient(ellipse 60% 60% at 60% 36%, rgba(170,100,220,0.50) 0%, transparent 62%), radial-gradient(ellipse 48% 48% at 26% 70%, rgba(210,160,245,0.28) 0%, transparent 58%), #f0e4fc',
    title: 'AI-native optimization, in plain English.',
    desc: "What it means to design a workflow where AI does the audit, picks the fix, and ships it in the same loop.",
    date: 'Apr 28, 2026',
    category: 'TRENDS',
  },
  {
    id: 10,
    label: 'NARRATIVE',
    gradient: 'radial-gradient(ellipse 60% 60% at 68% 28%, rgba(220,90,150,0.46) 0%, transparent 62%), radial-gradient(ellipse 48% 48% at 26% 72%, rgba(255,140,180,0.26) 0%, transparent 58%), #fce4f2',
    title: "How to correct an AI narrative that's gone wrong.",
    desc: "Outdated stats, missing context, mistaken attribution. A practical playbook for repairing how AI talks about you.",
    date: 'Apr 22, 2026',
    category: 'SENTIMENT',
  },
];

function Thumb({ gradient, label, className }) {
  return (
    <div className={className} style={{ background: gradient }}>
      <span className="blog-thumb-label">{label}</span>
    </div>
  );
}

export default function BlogPage() {
  useReveal();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const filtered = POSTS.filter(p => {
    const matchCat = filter === 'ALL' || p.category === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const showFeatured = filter === 'ALL' && !search && filtered[0]?.featured;
  const featured = showFeatured ? filtered[0] : null;
  const grid = showFeatured ? filtered.slice(1) : filtered;

  return (
    <div>
      <Navbar />
      <main>
        <Hero
          eyebrow="Blog"
          title="Field notes on AI visibility & GEO."
          lead="Strategy, frameworks, and short reads from the team building the operating system for how AI sees your brand."
          primaryCta="Start free trial"
          secondaryCta="Book a demo"
          showDashboard={false}
          showAiBand={false}
        />

        <section className="blog-sec">
          <div className="blog-wrap">

            {/* Filter bar */}
            <div className="blog-filter-bar">
              <div className="blog-search">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="blog-pills">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    className={`blog-pill${filter === cat ? ' blog-pill--active' : ''}`}
                    onClick={() => setFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured post */}
            {featured && (
              <a href="#" className="blog-featured">
                <Thumb gradient={featured.gradient} label={featured.label} className="blog-featured-thumb" />
                <div className="blog-featured-body">
                  <h2 className="blog-featured-title">{featured.title}</h2>
                  <p className="blog-featured-desc">{featured.desc}</p>
                  <p className="blog-featured-meta">By <span>{featured.author}</span> · {featured.date}</p>
                  <span className="blog-read">Read article →</span>
                </div>
              </a>
            )}

            {/* Grid */}
            {grid.length > 0 ? (
              <div className="blog-grid">
                {grid.map(post => (
                  <a key={post.id} href="#" className="blog-card">
                    <Thumb gradient={post.gradient} label={post.label} className="blog-card-thumb" />
                    <div className="blog-card-body">
                      <h3 className="blog-card-title">{post.title}</h3>
                      <p className="blog-card-desc">{post.desc}</p>
                      <span className="blog-card-date">{post.date}</span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              !featured && <p className="blog-empty">No articles match your search.</p>
            )}

          </div>
        </section>

        <CtaBand
          heading="Want updates from the team?"
          lead="One short email a month   new posts, product moves, and what's changing in AI search."
          primaryCta="Subscribe"
          secondaryCta="Browse posts"
          note="No spam · Unsubscribe anytime"
        />
      </main>
      <Footer />
    </div>
  );
}
