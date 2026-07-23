import { useState, useEffect } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useLang } from '../../contexts/LangContext';
import '../../blog-post.css';

const SECTIONS = [
  { id: 's-shift',      label: 'Entity-Based vs. Traditional SEO' },
  { id: 's-kg',         label: 'Knowledge Graph Optimization' },
  { id: 's-llms',       label: 'Semantic Entities & LLMs' },
  { id: 's-implement',  label: 'Implementing Semantic SEO' },
  { id: 's-faq',        label: 'FAQ' },
  { id: 's-takeaways',  label: 'Key takeaways' },
];

const FAQ_ITEMS = [
  {
    q: 'What Is an Example of an SEO Entity?',
    a: <><strong>Short answer:</strong> An <strong>SEO entity</strong> is any real-world object, person, organization, or concept that a search engine can uniquely identify and connect to related facts. A practical example is a medical clinic. Google's Knowledge Graph doesn't just read the words "Boston Children's Hospital." It resolves that string to a verified node. That node carries attributes: location, specialty, founding date, affiliated physicians. Content that names and contextualizes those attributes earns stronger semantic authority than content stuffed with keyword variations.</>,
  },
  {
    q: 'How Do LLMs Crawl Knowledge Graphs?',
    a: <><strong>Short answer:</strong> <strong>LLMs</strong> don't crawl <strong>knowledge graphs</strong> the way a traditional bot indexes pages. They learn relational patterns during training, then retrieve structured facts through retrieval-augmented generation at query time. Think of it like a student who read every encyclopedia before an exam. At test time, they recall connected facts, not isolated pages. This is why entity context matters more than keyword density. Content that names entities with clear subject-predicate-object relationships gets cited more reliably in neural search outputs.</>,
  },
  {
    q: 'What Is a Common Mistake in Entity Optimization?',
    a: <><strong>Short answer:</strong> The most damaging <strong>common mistake</strong> in <strong>entity optimization</strong> is treating schema markup as a cosmetic layer rather than a structural foundation. Many specialists add schema after content is written, without adjusting the underlying copy. Schema should mirror the relational claims in the text. A second frequent error is ignoring co-occurrence. Entities gain semantic weight when they appear consistently alongside their verified relationships across multiple pages, not just once in an isolated article.</>,
  },
];

function ImgHold({ label, sub }) {
  return (
    <div className="bp-img-hold">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
      <span className="bp-img-hold-label">{label}</span>
      <span className="bp-img-hold-sub">{sub}</span>
    </div>
  );
}

export default function EntityBasedSeoPage() {
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
        <title>Entity-Based SEO: Moving from Strings to Things | Poliris</title>
        <link rel="canonical" href="https://poliris.io/en/blog/entity-based-seo" />
        <link rel="alternate" hrefLang="en" href="https://poliris.io/en/blog/entity-based-seo" />
        <link rel="alternate" hrefLang="x-default" href="https://poliris.io/en/blog/entity-based-seo" />
        <meta name="description" content="Stop tracking keyword density. Learn how to map content to Knowledge Graph nodes, pass NER frameworks, and secure RAG citations in the AI era." />
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
              <span>10 min read</span>
              <span className="bp-dot" />
              <span>Poliris Team</span>
              <span className="bp-dot" />
              <span>Jul 7, 2026</span>
            </div>
            <h1 className="bp-title">The Rise of Entity-Based SEO: Moving from Strings to Things in the AI Era</h1>
            <p className="bp-deck"><strong>Semantic SEO</strong> is the practice of optimizing content around meaning, entities, and relationships rather than isolated keyword strings. Search engines no longer match words, they resolve concepts. <a target="_blank" rel="noopener" href="https://developers.google.com/knowledge-graph">Google's Knowledge Graph</a> connects entities like people, places, and ideas into a structured map of meaning. That shift is the core of the AI era's impact on search. The pain point for most SEO specialists is real: strategies built on keyword density and backlink volume are losing ground to systems that reward <strong>entity resolution</strong> and contextual relevance. If your content doesn't map to a recognized entity node, it's nearly invisible to modern <strong>neural search</strong> systems. This section frames the <strong>evolution</strong> of search from string-matching to meaning-matching. Understanding that shift tells you exactly where to invest your optimization effort next. The goal isn't to abandon what works, it's to extend it into semantic territory before your competitors do.</p>
          </header>

          <div className="bp-note">
            <div className="bp-note-label">Expert Tip</div>
            <p>The clearest signal that <strong>user intent</strong> has overtaken keyword frequency is <a target="_blank" rel="noopener" href="https://blog.google/products-and-platforms/products/search/search-language-understanding-bert/">Google's BERT rollout</a>, which began prioritizing whole-sentence context over individual query tokens. That architectural decision made entity relationships a first-class ranking signal, not a secondary refinement.</p>
          </div>

          {/* 01 */}
          <section className="bp-section" id="s-shift" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">01</span>
              <h2>Entity-Based SEO vs. Traditional SEO: The Structural Shift</h2>
            </div>
            <p><strong>Traditional SEO treats every query as a string of characters to match.</strong> Semantic SEO treats it as a question from a person with context, intent, and a specific meaning. That distinction sounds simple. In practice, it changes everything about how you build content.</p>
            <h3>How Keyword Matching Diverges from Entity Resolution</h3>
            <p><strong>Keyword matching</strong> works by counting word frequency and measuring proximity. A page with "best running shoes" appearing twelve times ranked well. The engine didn't ask what running shoes <em>were</em>, it just tallied strings. <strong>Entity resolution</strong> works differently. It asks: what real-world thing does this query describe? Google's Knowledge Graph, for example, doesn't store the string "Paris." It stores Paris as a node, a city, a capital, a cultural entity, connected to France, the Eiffel Tower, and the Seine River. Those relationships carry meaning that keywords never could. Here's where the structural problem with <strong>legacy metrics</strong> becomes clear:</p>
            <ul className="bp-prose-list">
              <li>Keyword density measures repetition, not relevance.</li>
              <li>TF-IDF scores term frequency against a corpus, but ignores entity relationships.</li>
              <li>Backlink counts signal authority without confirming topical coherence.</li>
            </ul>
            <p>None of these signals tell a search engine <em>what</em> a page is actually about.</p>
            <ImgHold label="Figure 1" sub="From strings to things: how entity resolution replaces keyword matching" />
            <h3>The Structural Gap in Legacy SEO</h3>
            <p><strong>Entity-based</strong> thinking resolves this gap. Named Entity Recognition frameworks, the kind powering modern crawlers, classify nouns into typed categories: person, place, organization, concept. Once classified, they connect to Wikidata nodes and Knowledge Graph entries. A page that explicitly surfaces those connections earns <strong>semantic depth</strong> that keyword-stuffed content never reaches.</p>
            <div className="bp-note">
              <div className="bp-note-label">Expert Tip</div>
              <p>Run a Named Entity Recognition pass on your top-performing pages. If your entities don't map cleanly to Knowledge Graph nodes, your content is invisible to neural search engines regardless of its keyword density.</p>
            </div>
            <p>This fundamental shift explains why understanding the <Link to={`/${lang}/blog/why-seo-is-the-cornerstone-of-geo-success`}>cornerstone of GEO success</Link> is critical for anyone building a modern visibility strategy. The shift from string-matching to entity resolution isn't a trend. It's the operating model search has already adopted.</p>
          </section>

          {/* 02 */}
          <section className="bp-section" id="s-kg" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">02</span>
              <h2>Knowledge Graph Optimization for Search Visibility</h2>
            </div>
            <p>Knowledge graphs determine which entities Google treats as verified, authoritative sources of truth. When Google's <strong>knowledge graph</strong> links your brand, product, or concept to confirmed external references, your content gains <strong>semantic authority</strong> that keyword density alone can't produce. Think of it like a citation network in academic publishing: the more credible sources point to your entity, the more trusted it becomes.</p>
            <h3>How Verified Nodes Build Semantic Authority</h3>
            <p>Every entity in Google's Knowledge Graph exists as a node with defined relationships to other entities. A <strong>verified node</strong> for a software company, for example, connects to its founders, its product category, its industry, and its competitors. Each confirmed connection strengthens the entity's credibility signal in neural search environments. <strong>Search visibility</strong> rises when those connections are sourced from high-authority references like Wikidata, Wikipedia, or structured schema markup on your own domain. Named Entity Recognition frameworks, including those built into most modern NLP pipelines, read these connections to classify content relevance. So the richer your entity's relationship map, the more confidently an NLP system categorizes your content.</p>
            <h3>Playbook for Building Definitive Entity Profiles</h3>
            <p>Use this four-step process to build <strong>entity profiles</strong> that Google can verify:</p>
            <ol className="bp-steps">
              <li>Claim or create a <a target="_blank" rel="noopener" href="https://www.wikidata.org/">Wikidata entry</a> that accurately describes your entity using recognized subject-predicate-object triples.</li>
              <li>Add structured schema markup (Organization, Person, or Product schema) to your site's core pages, linking it to your Wikidata and Wikipedia sources.</li>
              <li>Publish consistent co-citation signals: ensure your entity's name, description, and attributes appear identically across authoritative third-party sources.</li>
              <li>Audit your entity connections regularly using schema validators or Google's Rich Results Test, and expand your node relationships as your entity grows.</li>
            </ol>
            <ImgHold label="Figure 2" sub="The four-step playbook for building definitive entity profiles" />
            <div className="bp-note">
              <div className="bp-note-label">Expert Tip</div>
              <p>The most common gap in entity-based SEO is incomplete co-citation. Your entity may exist in the knowledge graph but connect to too few verified sources to trigger high-confidence rankings. Treat co-citation building the same way you'd treat link building in traditional SEO.</p>
            </div>
            <p>If you need a quick technical breakdown of these core concepts, explore our semantic <Link to={`/${lang}/glossary`}>SEO &amp; GEO Glossary</Link> as you map out your architecture.</p>
          </section>

          {/* 03 */}
          <section className="bp-section" id="s-llms" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">03</span>
              <h2>How Semantic Entities Shape Content Strategy for LLMs</h2>
            </div>
            <p><strong>Large language models don't read pages the way search crawlers do.</strong> They extract meaning by identifying named entities, mapping relationships between them, and then scoring your content against their internal knowledge models. That shift changes everything about how you write. <strong>Semantic entities</strong> are the foundation of this process. An LLM doesn't process the string "New York attorney." It recognizes "New York" as a geopolitical entity and "attorney" as a professional role. Then connects both to legal services through trained associations. Your content strategy must mirror that structure, not fight it.</p>
            <h3>How LLMs Use Entity Relationships to Award Rag Citations</h3>
            <p><strong>LLMs</strong> use entities to handle <strong>intent interpretation</strong> before they generate any response. When a model pulls source content to answer a query, it selects passages where entities are clearly defined, directly connected, and consistent with its training data. That selection process is what drives <strong>RAG citations</strong>. Content that names entities explicitly and states their relationships in Subject-Predicate-Object form wins those citations far more often than keyword-dense prose. In practice, a product page that states "Stripe processes card payments for e-commerce merchants" gives an LLM a clean triple to extract. A page that says "our platform helps businesses handle transactions better" gives it almost nothing to work with. Design <strong>content loops</strong> so each page reinforces the same entity relationships across multiple formats: a definition paragraph, a how-to section, and a structured FAQ. This repetition across content types deepens the semantic signal without keyword stuffing. For a broader view of how these shifts are rewriting discovery, explore our deep dive on the <Link to={`/${lang}/blog/death-of-traditional-search-geo-priority`}>death of traditional search and why GEO is now a priority</Link>.</p>
          </section>

          {/* 04 */}
          <section className="bp-section" id="s-implement" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">04</span>
              <h2>Implementing Semantic SEO: Steps &amp; Tools</h2>
            </div>
            <p>Migrating to entity-based SEO feels less daunting once you break it into a clear sequence. The right <strong>migration steps</strong> follow a logical order: audit what exists, restructure what's broken, then build outward toward verified entity connections.</p>
            <h3>How Do You Migrate Your Existing Site Framework?</h3>
            <p>Start by inventorying your current <strong>site framework</strong> for entity gaps. Run a crawl to identify pages that describe concepts without naming them as entities. A product page that says "fast delivery" without mentioning the brand, location, or service category as a named node gives search engines nothing to anchor. Here's a practical sequence most teams follow:</p>
            <ol className="bp-steps">
              <li><strong>Audit existing content</strong> for unresolved entity references using Named Entity Recognition (NER) tools such as Google's Natural Language API.</li>
              <li><strong>Run connection audits</strong> to map which entities on your site link to verified nodes in Google's Knowledge Graph or Wikidata.</li>
              <li><strong>Deploy custom schema</strong> markup (Organization, Product, FAQPage, or Event types) so each entity carries machine-readable attributes.</li>
              <li><strong>Cross-check semantic authority</strong> by comparing your entity coverage against competitor pages that rank in AI-generated summaries.</li>
              <li><strong>Validate with a </strong><Link to={`/${lang}/technical-audit`}><strong>Technical Audit</strong></Link> to catch orphaned schema, broken structured data, and missing entity identifiers before publishing.</li>
            </ol>
            <p>Good <strong>SEO tools</strong> make step two and three manageable. Schema validators, knowledge graph checkers, and NER dashboards each serve a distinct role. Don't try to run all three from a single generalist platform. A semantic SEO example worth studying: a SaaS brand that replaced vague feature descriptions with structured entity blocks saw its product pages appear in AI-generated comparison answers within a standard re-indexing cycle.</p>
          </section>

          {/* 05 */}
          <section className="bp-section" id="s-faq" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">05</span>
              <h2>Frequently Asked Questions</h2>
            </div>
            <p>Semantic SEO puzzles even experienced practitioners. Here are direct answers to the questions that come up most often.</p>
            <div className="bp-faq">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bp-faq-item">
                  <h3 className="bp-faq-heading">
                    <button
                      className={`bp-faq-btn${openFaq === i ? ' bp-open' : ''}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      {item.q}
                      <span className="bp-faq-icon" />
                    </button>
                  </h3>
                  <div className={`bp-faq-body${openFaq === i ? ' bp-open' : ''}`}>
                    <div className="bp-faq-body-inner"><p>{item.a}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Takeaways */}
          <div id="s-takeaways" style={{ scrollMarginTop: '90px', marginTop: '3.5rem' }}>
            <h2 className="bp-section-h2">Conclusion</h2>
            <p className="bp-takeaways-intro">The shift from string matching to entity resolution marks one of the most significant <strong>evolution</strong>s in search history. <strong>Semantic SEO</strong> isn't a trend to monitor from a distance. It's the operating framework that determines whether your content earns a citation in AI-generated answers or disappears from neural search results entirely.</p>
            <div className="bp-takeaways">
              <h2 className="bp-takeaways-title">Key Takeaways</h2>
              <ul className="bp-takeaways-list">
                <li><strong>Knowledge graphs</strong> connect named entities to verified facts, giving AI engines a structured map to interpret and cite your content.</li>
                <li><strong>Semantic authority</strong> is built through consistent entity profiles across your site, schema markup, and third-party corroboration.</li>
                <li>LLMs reward content that resolves entity relationships clearly. Ambiguity reduces your RAG citation probability.</li>
                <li>A sound <strong>content strategy</strong> maps every page to a defined entity node before a single word is written.</li>
                <li>The <strong>AI future</strong> of search favors sites that function as knowledge sources, not keyword containers.</li>
                <li>Schema audits and entity resolution are maintenance tasks, not one-time migrations. Treat them as ongoing operations.</li>
                <li>SEO specialists who adopt entity-based thinking now build a compounding advantage that keyword-focused peers cannot easily replicate.</li>
              </ul>
            </div>
            <p className="bp-takeaways-intro">The practitioners who thrive in this environment treat their site as a structured knowledge base. They map entities to Wikidata identifiers. They run schema audits on a regular cycle. That operational discipline separates sites that surface in AI Overviews from those that don't. The <strong>evolution</strong> continues. Start with one entity. Build from there.</p>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
}
