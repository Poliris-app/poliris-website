import { useState, useEffect } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useLang } from '../../contexts/LangContext';
import '../../blog-post.css';

const SECTIONS = [
  { id: 's-defining',     label: 'SEO vs. GEO' },
  { id: 's-newrule',      label: 'The new rule' },
  { id: 's-geo',          label: 'Understanding GEO' },
  { id: 's-crawlers',     label: 'How AI crawlers work' },
  { id: 's-technical',    label: "Technical SEO's role" },
  { id: 's-crawlability', label: 'Crawlability' },
  { id: 's-headings',     label: 'Heading structure' },
  { id: 's-schema',       label: 'Structured data' },
  { id: 's-without',      label: 'GEO without SEO?' },
  { id: 's-poliris',      label: 'Navigating with Poliris' },
  { id: 's-faq',          label: 'FAQ' },
  { id: 's-takeaways',    label: 'Key takeaways' },
];

const FAQ_ITEMS = [
  {
    q: 'What is the typical cost of combining GEO and Technical SEO?',
    a: 'The cost varies based on project scope, required tooling, and whether you build capabilities in-house or hire a specialist. Most enterprise engagements combine technical SEO auditing with GEO monitoring — typically ranging from a few thousand dollars monthly for managed services up to six-figure annual platform contracts for large organizations.',
  },
  {
    q: 'When is the right time to start?',
    a: "Start when your content is already ranking in traditional search but missing from AI-generated answers. That gap is the clearest signal. If ChatGPT or Perplexity are citing competitors instead of you, AI search visibility is already costing you pipeline.",
  },
  {
    q: 'What are the alternatives, and how do they compare?',
    a: "Alternatives like paid search or pure content syndication can drive short-term traffic, but they don't build the crawlable, structured foundation that AI-driven search engines require. GEO without SEO fundamentals is a strategy with a ceiling — bursts of visibility that don't compound over time.",
  },
  {
    q: 'How do you choose the right platform?',
    a: 'Provider selection comes down to three things: (1) Does the platform track both technical SEO signals and GEO citation metrics? (2) Can it audit crawl directives like robots.txt and heading structures? (3) Does it monitor brand sentiment across LLMs like ChatGPT, Gemini, and Perplexity? Poliris is built specifically around those three requirements.',
  },
];

function ImgHold({ label, sub }) {
  return (
    <div className="bp-img-hold">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <div className="bp-img-hold-label">{label}</div>
      {sub && <div className="bp-img-hold-sub">{sub}</div>}
    </div>
  );
}

export default function SeoGeoCornerstonePage() {
  const { lang } = useLang();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
      let current = '';
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) current = id;
      });
      setActiveSection(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="bp-page">
      <Head>
        <title>Why SEO is the Cornerstone of GEO Success | Poliris</title>
        <meta name="description" content="GEO needs SEO. Without solid technical foundations, even the best generative engine strategy collapses. Here is why and what to fix first." />
      </Head>
      <Navbar />

      <div className="bp-layout">

        {/* ── Sidenav ── */}
        <aside className="bp-sidenav">
          <Link to={`/${lang}/blog`} className="bp-back-link">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to blog
          </Link>
          <div className="bp-sidenav-label">On this page</div>
          <ul className="bp-sidenav-list">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={activeSection === id ? 'bp-active' : ''}
                  onClick={e => { e.preventDefault(); scrollTo(id); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="bp-sidenav-foot">
            <div className="bp-progress-label">Reading progress</div>
            <div className="bp-progress-track">
              <div className="bp-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </aside>

        {/* ── Article ── */}
        <main className="bp-main">

          <Link to={`/${lang}/blog`} className="bp-back-link bp-back-mobile">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to blog
          </Link>

          <header className="bp-hero">
            <div className="bp-meta">
              <span className="bp-category">GEO Insights</span>
              <span className="bp-dot" />
              <span>9 min read</span>
              <span className="bp-dot" />
              <span>Poliris Team</span>
              <span className="bp-dot" />
              <span>Jun 23, 2026</span>
            </div>
            <h1 className="bp-title">Why SEO is the cornerstone of GEO success</h1>
            <p className="bp-deck">GEO needs SEO. Ignoring that connection is one of the most expensive mistakes a search team can make right now. Without solid SEO fundamentals underneath, even the best GEO strategy collapses.</p>
            <div className="bp-tags">GEO · Technical SEO · AI Search Visibility</div>
          </header>

          {/* 01 */}
          <section className="bp-section" id="s-defining" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">01</span>
              <h2>Defining the disciplines: SEO vs. GEO</h2>
            </div>
            <div className="bp-def-pair">
              <div className="bp-def-cell">
                <div className="bp-def-label">GEO — Generative Engine Optimization</div>
                <p>Structuring content so AI-powered search engines can accurately interpret, cite, and surface it in generated responses. GEO earns you a citation inside the answer itself.</p>
              </div>
              <div className="bp-def-cell">
                <div className="bp-def-label">SEO — Search Engine Optimization</div>
                <p>The structural backbone that makes GEO possible. Built on clean crawl directives, structured content, and strong site performance. SEO earns you a blue link.</p>
              </div>
              <div className="bp-def-synergy">
                <div className="bp-def-label" style={{ color: 'rgba(255,255,255,0.45)' }}>The synergy</div>
                <p>The two disciplines are not competing priorities. They are the same engine running on different fuel. SEO gets you on the shelf. GEO gets you read aloud by the assistant behind the counter.</p>
              </div>
            </div>
          </section>

          {/* 02 */}
          <section className="bp-section" id="s-newrule" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">02</span>
              <h2>The new rule of search</h2>
            </div>
            <p><strong>GEO needs SEO</strong> is the principle that generative engine optimization cannot function effectively without a technical SEO foundation. AI systems read the same signals that traditional search engines do. Without clean crawl directives, structured content, and strong site performance, AI engines skip your pages.</p>
            <div className="bp-pull-quote">
              <p>"GEO amplifies what SEO builds. Without the foundation, there is nothing for AI engines to surface."</p>
            </div>
            <p>This is not a future concern. A B2B SaaS company with strong keyword rankings but poor heading structure may find its content ignored by AI-generated summaries. The fix requires both approaches working together.</p>
            <h3>Where to start</h3>
            <ol className="bp-steps">
              <li>Audit crawl directives and <code>robots.txt</code> configurations.</li>
              <li>Clean up heading hierarchies so AI crawlers can parse your page structure.</li>
              <li>Align content schema with the questions AI engines are actually answering.</li>
            </ol>
          </section>

          {/* 03 */}
          <section className="bp-section" id="s-geo" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">03</span>
              <h2>Understanding generative engine optimization</h2>
            </div>
            <p>Generative engine optimization refers to the practice of structuring content so AI-powered search engines can accurately interpret, cite, and surface it in generated responses. Unlike traditional ranking, GEO is not about keyword density. It is about making your content trustworthy and machine-readable enough that an AI engine picks it over a competitor's.</p>
            <p>A procurement manager searching for vendor comparisons, or a financial analyst looking for market benchmarks, may never scroll past an AI-generated summary. If your content is not cited in that summary, you do not exist for that user. This is where GEO's visibility reach diverges from classic SEO logic.</p>
            <ImgHold label="Diagram: SEO to GEO signal flow" sub="Flowchart showing how SEO signals feed AI crawler and GEO citation rates" />
            <p className="bp-img-caption">Fig. 1 — How technical SEO signals cascade into AI citation outcomes</p>
            <div className="bp-note">
              <div className="bp-note-label">Expert note</div>
              <p>Do not optimize for GEO in isolation. AI citation rates improve fastest when your technical SEO fundamentals are already sound. Think of GEO as the top floor of a building, and technical SEO as the foundation it stands on.</p>
            </div>
          </section>

          {/* 04 */}
          <section className="bp-section" id="s-crawlers" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">04</span>
              <h2>How AI crawlers scrape websites</h2>
            </div>
            <p>AI web crawlers do not read your content the way a human does. They parse structure, follow directives, and extract meaning from signals you may not even see. Unlike traditional search bots, they do not just index keywords. They assess semantic context, heading hierarchy, and machine-readable markup to decide what a page actually means.</p>
            <ImgHold label="Illustration: AI crawler parsing page structure" sub="Split-screen showing raw HTML vs. AI's structured extraction view" />
            <p className="bp-img-caption">Fig. 2 — What an AI crawler sees vs. what a browser renders</p>
            <h3>How this affects GEO indexing and ranking</h3>
            <p>AI engines do not just store a URL. They extract claims, entities, and facts, then rank them by credibility and clarity. A page buried in JavaScript or missing clean heading tags is essentially invisible to these systems.</p>
            <p>Consider two competing blog posts on the same topic: the one with explicit H2 definitions and schema markup gets cited by Perplexity. The one without gets ignored entirely. Crawlability is a precondition for AI citation.</p>
            <h3>Three signals that matter most</h3>
            <ul className="bp-prose-list">
              <li><strong>Clean crawl directives</strong> in your <code>robots.txt</code> and meta robots tags.</li>
              <li><strong>Logical heading structure</strong> that mirrors content hierarchy.</li>
              <li><strong>Structured data</strong> that clearly identifies your key topics and entities.</li>
            </ul>
          </section>

          {/* 05 */}
          <section className="bp-section" id="s-technical" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">05</span>
              <h2>The role of technical SEO in GEO</h2>
            </div>
            <p>Technical SEO is the invisible foundation that determines whether AI-driven search engines can read, trust, and cite your content. Without it, even the most well-crafted GEO strategy falls flat.</p>
            <div className="bp-pull-quote">
              <p>"GEO is the interior design. Technical SEO is the wiring, the plumbing, and the load-bearing walls."</p>
            </div>
            <ImgHold label="Diagram: Technical SEO as the foundation layer" sub="Layered architecture — crawl, index, GEO citation" />
            <p className="bp-img-caption">Fig. 3 — The dependency stack from crawl health to AI visibility</p>
          </section>

          {/* 06 */}
          <section className="bp-section" id="s-crawlability" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">06</span>
              <h2>Crawlability: your first line of visibility</h2>
            </div>
            <p>If AI crawlers cannot reach your content, nothing else matters. Your <code>robots.txt</code> file and meta robots directives control exactly what crawlers can access.</p>
            <ul className="bp-prose-list">
              <li>Verify <code>robots.txt</code> is not accidentally blocking key content directories.</li>
              <li>Check meta robots tags. <code>noindex</code> or <code>nofollow</code> on critical pages cuts AI access entirely.</li>
              <li>Monitor crawl errors in Google Search Console regularly.</li>
              <li>Use canonical tags correctly to avoid duplicate content confusion.</li>
            </ul>
          </section>

          {/* 07 */}
          <section className="bp-section" id="s-headings" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">07</span>
              <h2>Heading structure and content hierarchy</h2>
            </div>
            <p>AI engines do not just read your words. They read the shape of your content. Proper heading hierarchy (H1, H2, H3) is one of the clearest signals an AI crawler uses to understand what a page is about and which sections carry the most weight.</p>
            <p>A page with a single H1, logical H2 sections, and supporting H3 subsections gives AI systems a clear map. A page where headings are used for visual styling rather than semantic meaning will be misread or skipped.</p>
            <ImgHold label="Example: good vs. broken heading hierarchy" sub="Side-by-side comparison of a well-structured vs. flat heading tree" />
            <p className="bp-img-caption">Fig. 4 — How heading hierarchy maps to AI crawler comprehension</p>
          </section>

          {/* 08 */}
          <section className="bp-section" id="s-schema" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">08</span>
              <h2>Structured data: speaking the machine's language</h2>
            </div>
            <p>Schema markup is the closest thing to a direct conversation with AI crawlers. It labels your content explicitly, telling engines not just what your page says, but what it <em>is</em>. Consider two competitors publishing equivalent content. One uses FAQ schema and Article markup. The other publishes plain HTML. The structured site earns the citation. The other does not appear in the summary at all.</p>
            <h3>What actually moves the needle</h3>
            <ul className="bp-prose-list">
              <li>Tag core entities using <strong>Organization</strong>, <strong>Product</strong>, and <strong>Article</strong> schema.</li>
              <li>Add <strong>FAQ schema</strong> to content that answers direct questions.</li>
              <li>Use <strong>BreadcrumbList</strong> markup to help crawlers map your site hierarchy.</li>
              <li>Validate markup regularly with Google's Rich Results Test or equivalent tools.</li>
            </ul>
            <div className="bp-note">
              <div className="bp-note-label">Poliris tracks this</div>
              <p>Poliris monitors schema health alongside brand citation rates, showing exactly which structured data gaps are costing you visibility across ChatGPT, Gemini, and Perplexity.</p>
            </div>
          </section>

          {/* 09 */}
          <section className="bp-section" id="s-without" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">09</span>
              <h2>Can GEO work without SEO?</h2>
            </div>
            <p>GEO strategies cannot replace traditional SEO. Without a solid technical foundation, AI-driven search engines have no reliable content to cite. Think of GEO like a recommendation engine for a store with no inventory system. It can try to surface products, but if the catalog is disorganized or blocked from crawlers, nothing gets recommended accurately.</p>
            <h3>What breaks without the foundation</h3>
            <ul className="bp-prose-list">
              <li><strong>Traffic conversion</strong> drops because AI citations point to pages that load slowly or return crawl errors.</li>
              <li><strong>Engagement metrics</strong> fall when users land on poorly structured content not optimized for readability.</li>
              <li><strong>AI web crawlers</strong> skip or misindex pages blocked by misconfigured <code>robots.txt</code> directives.</li>
            </ul>
            <h3>The long-term cost of going GEO-only</h3>
            <p>Missing GEO and SEO synergy does not just hurt short-term rankings. It creates compounding visibility gaps. Over time, AI models train on accessible, well-structured content from competitors, widening the gap further. Sites that focus on GEO without addressing crawlability and structured data rarely sustain citation rates.</p>
          </section>

          {/* 10 */}
          <section className="bp-section" id="s-poliris" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">10</span>
              <h2>Navigating modern search visibility with Poliris</h2>
            </div>
            <p>Most platforms force you to choose between tracking traditional rankings and monitoring AI citation performance. Poliris removes that trade-off entirely with a dual-layer auditing architecture: automated technical SEO crawls combined with a live GEO monitoring dashboard.</p>
            <ImgHold label="Screenshot: Poliris GEO monitoring dashboard" sub="Poliris UI showing citation rates and crawl health side by side" />
            <p className="bp-img-caption">Fig. 5 — The Poliris dashboard: technical crawl health alongside AI citation metrics</p>
            <ul className="bp-prose-list">
              <li>Tracks crawl directives, meta robots, and heading structures automatically.</li>
              <li>Monitors brand mentions, AI citation rates, and sentiment scores across ChatGPT, Gemini, and Perplexity.</li>
              <li>Shows direct cause-and-effect between technical fixes and AI visibility outcomes.</li>
              <li>Closes the measurement gap most auditing platforms leave open.</li>
            </ul>
            <div className="bp-cta-box">
              <div>
                <h3>Measure GEO and SEO in one place</h3>
                <p>Poliris tracks citation rates across all major LLMs alongside your technical crawl health.</p>
              </div>
              <a href="https://app.poliris.io" target="_blank" rel="noopener noreferrer" className="bp-cta-btn">
                Try Poliris →
              </a>
            </div>
          </section>

          {/* 11 */}
          <section className="bp-section" id="s-faq" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">11</span>
              <h2>Frequently asked questions</h2>
            </div>
            <div className="bp-faq">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bp-faq-item">
                  <button
                    className={`bp-faq-btn${openFaq === i ? ' bp-open' : ''}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    {item.q}
                    <span className="bp-faq-icon" />
                  </button>
                  <div className={`bp-faq-body${openFaq === i ? ' bp-open' : ''}`}>
                    <div className="bp-faq-body-inner">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Takeaways */}
          <div className="bp-takeaways" id="s-takeaways" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-takeaways-title">Key takeaways</div>
            <ul className="bp-takeaways-list">
              <li><strong>GEO needs SEO as its structural foundation.</strong> Without crawlable, technically sound pages, AI systems will not cite your content.</li>
              <li><strong>Technical SEO signals</strong> like robots.txt, canonical tags, and heading hierarchy directly influence AI crawler behavior.</li>
              <li><strong>Structured data and schema markup</strong> make content machine-readable, improving AI citation rates across ChatGPT and Perplexity.</li>
              <li>The <strong>strategic importance of a combined approach</strong> grows as generative engines increasingly replace traditional search results.</li>
              <li>The <strong>SEO future</strong> belongs to organizations that treat AI visibility as a measurable metric, not a byproduct of rankings.</li>
              <li><strong>AI-driven success</strong> requires unified tracking of both technical health and brand sentiment across LLMs simultaneously.</li>
              <li>Platforms like <strong>Poliris</strong> audit both dimensions in one dashboard, closing the gap between SEO fundamentals and GEO performance.</li>
            </ul>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
}
