import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';
import useReveal from '../hooks/useReveal';
import { useLang } from '../contexts/LangContext';
import '../blog.css';

const POST_GRADIENTS = [
  'radial-gradient(ellipse 65% 65% at 72% 22%, rgba(88,124,220,0.52) 0%, transparent 62%), radial-gradient(ellipse 55% 55% at 18% 78%, rgba(148,182,255,0.32) 0%, transparent 62%), #dce8ff',
  'radial-gradient(ellipse 60% 60% at 28% 72%, rgba(60,190,110,0.52) 0%, transparent 62%), radial-gradient(ellipse 50% 50% at 75% 28%, rgba(140,230,170,0.30) 0%, transparent 60%), #dff5e8',
  'radial-gradient(ellipse 60% 60% at 62% 38%, rgba(90,110,220,0.50) 0%, transparent 62%), radial-gradient(ellipse 45% 45% at 25% 70%, rgba(160,180,245,0.28) 0%, transparent 58%), #dce4f8',
  'radial-gradient(ellipse 62% 62% at 70% 28%, rgba(220,80,130,0.48) 0%, transparent 62%), radial-gradient(ellipse 50% 50% at 28% 74%, rgba(255,160,190,0.28) 0%, transparent 58%), #fce8f0',
  'radial-gradient(ellipse 60% 60% at 28% 70%, rgba(230,165,40,0.52) 0%, transparent 62%), radial-gradient(ellipse 50% 50% at 72% 28%, rgba(255,210,100,0.28) 0%, transparent 58%), #fef6d0',
  'radial-gradient(ellipse 60% 60% at 60% 38%, rgba(140,100,220,0.50) 0%, transparent 62%), radial-gradient(ellipse 48% 48% at 28% 68%, rgba(190,160,245,0.28) 0%, transparent 58%), #ede8fc',
  'radial-gradient(ellipse 60% 60% at 72% 22%, rgba(50,190,150,0.50) 0%, transparent 62%), radial-gradient(ellipse 48% 48% at 24% 74%, rgba(120,230,200,0.28) 0%, transparent 58%), #ddf5ee',
  'radial-gradient(ellipse 60% 60% at 30% 62%, rgba(70,130,220,0.50) 0%, transparent 62%), radial-gradient(ellipse 48% 48% at 72% 30%, rgba(140,190,255,0.28) 0%, transparent 58%), #dceeff',
  'radial-gradient(ellipse 60% 60% at 60% 36%, rgba(170,100,220,0.50) 0%, transparent 62%), radial-gradient(ellipse 48% 48% at 26% 70%, rgba(210,160,245,0.28) 0%, transparent 58%), #f0e4fc',
  'radial-gradient(ellipse 60% 60% at 68% 28%, rgba(220,90,150,0.46) 0%, transparent 62%), radial-gradient(ellipse 48% 48% at 26% 72%, rgba(255,140,180,0.26) 0%, transparent 58%), #fce4f2',
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
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const [filterIdx, setFilterIdx] = useState(0);

  const bh      = t('blog.hero');
  const bcta    = t('blog.cta');
  const cats    = t('blog.categories');
  const rawPosts = t('blog.posts');
  const POSTS   = rawPosts.map((p, i) => ({ ...p, gradient: POST_GRADIENTS[i] }));

  const filtered = POSTS.filter(p => {
    const matchCat = filterIdx === 0 || p.category === cats[filterIdx];
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const showFeatured = filterIdx === 0 && !search && filtered[0]?.featured;
  const featured = showFeatured ? filtered[0] : null;
  const grid = showFeatured ? filtered.slice(1) : filtered;

  return (
    <div>
      <Seo page="blog" />
      <Navbar />
      <main>
        <Hero
          eyebrow={bh.eyebrow}
          title={bh.title}
          lead={bh.lead}
          primaryCta={bh.primaryCta}
          secondaryCta={bh.secondaryCta}
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
                  placeholder={t('blog.searchPlaceholder')}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="blog-pills">
                {cats.map((cat, i) => (
                  <button
                    key={cat}
                    className={`blog-pill${filterIdx === i ? ' blog-pill--active' : ''}`}
                    onClick={() => setFilterIdx(i)}
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
                  <span className="blog-read">{t('blog.readArticle')}</span>
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
              !featured && <p className="blog-empty">{t('blog.noResults')}</p>
            )}

          </div>
        </section>

        <CtaBand
          heading={bcta.heading}
          lead={bcta.lead}
          primaryCta={bcta.primaryCta}
          secondaryCta={bcta.secondaryCta}
          note={bcta.note}
        />
      </main>
      <Footer />
    </div>
  );
}
