import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Seo from '../../components/Seo';
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
    a: <><strong>Short answer:</strong> An <strong>SEO entity</strong> is any real thing a search engine can name and link to facts: a person, a place, a brand, or an idea. Take a hospital. Google's Knowledge Graph doesn't just read the words "Boston Children's Hospital." It links them to one known node. That node holds facts: where it is, what it treats, when it was founded, who works there. Content that names those facts earns more trust than content stuffed with keyword variants.</>,
  },
  {
    q: 'How Do LLMs Crawl Knowledge Graphs?',
    a: <><strong>Short answer:</strong> <strong>LLMs</strong> don't crawl <strong>knowledge graphs</strong> the way a search bot reads pages. They learn how facts link up while they train. Then, when a user asks something, they pull in fresh facts to answer. Think of a student who read every book before an exam. On the day, they recall linked facts, not single pages. That's why entity context counts for more than keyword density. Content that names entities and states clearly how they link gets cited more often.</>,
  },
  {
    q: 'What Is a Common Mistake in Entity Optimization?',
    a: <><strong>Short answer:</strong> The worst <strong>common mistake</strong> in <strong>entity optimization</strong> is treating schema markup as a coat of paint, not a core part of the page. Many teams add schema after the copy is done and never change the text. Schema should match the claims the text makes. A second mistake is ignoring co-occurrence. Entities gain weight when they show up next to the same known facts on many pages, not just once in one post.</>,
  },
];

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
      <Seo page="blog/entity-based-seo" type="article" title="Entity-Based SEO: Moving from Strings to Things | Poliris" description="Stop tracking keyword density. Learn how to map content to Knowledge Graph nodes, pass NER frameworks, and secure RAG citations in the AI era." />
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
            <h1 className="bp-title">The Rise of Entity-Based SEO: From Strings to Things in the AI Era</h1>
            <p className="bp-deck"><strong>Semantic SEO</strong> means building content around meaning, entities, and how they link, not around single keywords. Search engines no longer just match words. They work out what you mean. <a target="_blank" rel="noopener" href="https://developers.google.com/knowledge-graph">Google's Knowledge Graph</a> links people, places, and ideas into one map of meaning. That shift is how AI has changed search. And it hurts. Plans built on keyword density and backlink counts are losing ground to systems that reward <strong>entity resolution</strong> and context. If your content doesn't map to a known entity, <strong>neural search</strong> can barely see it. This post covers the <strong>evolution</strong> of search from matching strings to matching meaning. Once you see that shift, you know where to spend your effort next. You don't need to drop what works. You need to extend it before your rivals do.</p>
          </header>

          <div className="bp-note">
            <div className="bp-note-label">Expert Tip</div>
            <p>The clearest sign that <strong>user intent</strong> now beats keyword counts is <a target="_blank" rel="noopener" href="https://blog.google/products-and-platforms/products/search/search-language-understanding-bert/">Google's BERT launch</a>. With BERT, Google began to read the whole sentence, not just single words. That made the links between entities a core ranking signal, not a small tweak.</p>
          </div>

          {/* 01 */}
          <section className="bp-section" id="s-shift" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">01</span>
              <h2>Entity-Based SEO vs. Traditional SEO: The Structural Shift</h2>
            </div>
            <p><strong>Traditional SEO treats every query as a string of characters to match.</strong> Semantic SEO treats it as a question from a real person, with a goal and a clear meaning. That sounds like a small change. In practice, it changes how you build every page.</p>
            <h3>How Keyword Matching Diverges from Entity Resolution</h3>
            <p><strong>Keyword matching</strong> counts how often words appear and how close they sit. A page that said "best running shoes" twelve times ranked well. The engine never asked what running shoes <em>were</em>. It just counted. <strong>Entity resolution</strong> works in a new way. It asks: what real thing is this query about? Google's Knowledge Graph, for example, doesn't store the word "Paris." It stores Paris as a node: a city, a capital, a place with its own culture. That node links to France, the Eiffel Tower, and the Seine. Those links carry meaning that keywords never could. Here's where <strong>legacy metrics</strong> fall short:</p>
            <ul className="bp-prose-list">
              <li>Keyword density measures repetition, not relevance.</li>
              <li>TF-IDF checks how often a term shows up, but not how entities link.</li>
              <li>Backlink counts show trust, but not whether the page stays on topic.</li>
            </ul>
            <p>None of these signals tell a search engine <em>what</em> a page is actually about.</p>
            <h3>The Structural Gap in Legacy SEO</h3>
            <p><strong>Entity-based</strong> thinking closes this gap. Named Entity Recognition (NER) tools, the kind that power today's crawlers, sort nouns into types: person, place, brand, idea. Each one then links to a Wikidata node or Knowledge Graph entry. A page that shows those links clearly earns <strong>semantic depth</strong> that keyword-stuffed pages never reach.</p>
            <div className="bp-note">
              <div className="bp-note-label">Expert Tip</div>
              <p>Run an NER check on your best pages. If your entities don't map cleanly to Knowledge Graph nodes, neural search can't see your content, no matter how many keywords it has.</p>
            </div>
            <p>This shift is why the <Link to={`/${lang}/blog/why-seo-is-the-cornerstone-of-geo-success`}>cornerstone of GEO success</Link> matters to anyone who wants to be seen in search today. The move from matching strings to matching entities isn't a trend. It's how search already works.</p>
          </section>

          {/* 02 */}
          <section className="bp-section" id="s-kg" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">02</span>
              <h2>Knowledge Graph Optimization for Search Visibility</h2>
            </div>
            <p>Knowledge graphs decide which entities Google treats as trusted facts. When Google's <strong>knowledge graph</strong> links your brand, product, or idea to trusted outside sources, your content gains <strong>semantic authority</strong>. Keyword density alone can't give you that. Think of how research papers cite each other: the more trusted sources point to your entity, the more it is trusted.</p>
            <h3>How Verified Nodes Build Semantic Authority</h3>
            <p>Every entity in Google's Knowledge Graph is a node with set links to other entities. A <strong>verified node</strong> for a software firm, for example, links to its founders, its product type, its market, and its rivals. Each proven link makes the entity more trusted in neural search. <strong>Search visibility</strong> grows when those links come from strong sources like Wikidata, Wikipedia, or schema markup on your own site. NER tools read these links to judge what your content is about. So the richer your entity's map of links, the more sure an AI system is about your content.</p>
            <h3>Playbook for Building Definitive Entity Profiles</h3>
            <p>Use these four steps to build <strong>entity profiles</strong> that Google can check:</p>
            <ol className="bp-steps">
              <li>Claim or create a <a target="_blank" rel="noopener" href="https://www.wikidata.org/">Wikidata entry</a> that describes your entity in clear "subject, verb, object" facts.</li>
              <li>Add schema markup (Organization, Person, or Product) to your main pages, and link it to your Wikidata and Wikipedia pages.</li>
              <li>Keep your co-citations in sync: make sure your entity's name, summary, and facts read the same on every trusted outside site.</li>
              <li>Check your entity links often with a schema checker or Google's Rich Results Test, and add new links as your entity grows.</li>
            </ol>
            <div className="bp-note">
              <div className="bp-note-label">Expert Tip</div>
              <p>The most common gap in entity-based SEO is weak co-citation. Your entity may be in the knowledge graph but link to too few trusted sources to rank with confidence. Treat co-citation the way you'd treat link building in classic SEO.</p>
            </div>
            <p>For quick definitions of these terms, see our <Link to={`/${lang}/glossary`}>SEO &amp; GEO Glossary</Link> as you plan your site.</p>
          </section>

          {/* 03 */}
          <section className="bp-section" id="s-llms" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">03</span>
              <h2>How Semantic Entities Shape Content Strategy for LLMs</h2>
            </div>
            <p><strong>Large language models don't read pages the way search crawlers do.</strong> They find the named entities, map how they link, and then score your content against what they already know. That changes how you should write. <strong>Semantic entities</strong> are the base of this process. An LLM doesn't see "New York attorney" as just a string. It sees "New York" as a place and "attorney" as a job. Then it links both to legal services, based on what it learned in training. Your content plan should match that structure, not fight it.</p>
            <h3>How LLMs Use Entity Relationships to Award Rag Citations</h3>
            <p><strong>LLMs</strong> use entities to work out <strong>intent</strong> before they write any answer. When a model pulls in pages to answer a question, it picks passages where entities are clear, linked, and match what it already knows. That choice is what drives <strong>RAG citations</strong>. Content that names entities and states plainly how they link, in "subject, verb, object" form, wins those citations far more often than keyword-heavy text. Say a product page states "Stripe handles card payments for online shops." That gives an LLM a clean fact to pull out. A page that says "our platform helps businesses handle transactions better" gives it almost nothing. Build <strong>content loops</strong> so each page repeats the same entity links in more than one format: a short definition, a how-to section, and an FAQ. Repeating the facts this way makes the signal stronger without keyword stuffing. For the bigger picture, read our deep dive on the <Link to={`/${lang}/blog/death-of-traditional-search-geo-priority`}>death of traditional search and why GEO is now a priority</Link>.</p>
          </section>

          {/* 04 */}
          <section className="bp-section" id="s-implement" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">04</span>
              <h2>Implementing Semantic SEO: Steps &amp; Tools</h2>
            </div>
            <p>Moving to entity-based SEO feels less scary once you break it into clear steps. The right <strong>migration steps</strong> go in order: check what you have, fix what's broken, then build out links to trusted entities.</p>
            <h3>How Do You Migrate Your Existing Site Framework?</h3>
            <p>Start by checking your current <strong>site framework</strong> for entity gaps. Run a crawl to find pages that talk about ideas without naming them. Say a product page reads "fast delivery" but never names the brand, the place, or the type of service. Search engines then have nothing to hold on to. Here's the order most teams follow:</p>
            <ol className="bp-steps">
              <li><strong>Audit your content</strong> for unclear entity mentions, using NER tools such as Google's Natural Language API.</li>
              <li><strong>Run link audits</strong> to see which entities on your site link to known nodes in Google's Knowledge Graph or Wikidata.</li>
              <li><strong>Add custom schema</strong> markup (Organization, Product, FAQPage, or Event) so each entity has facts that machines can read.</li>
              <li><strong>Check your semantic authority</strong> by comparing your entities with rival pages that show up in AI answers.</li>
              <li><strong>Check it with a </strong><Link to={`/${lang}/technical-audit`}><strong>Technical Audit</strong></Link> to catch stray schema, broken markup, and missing entity IDs before you publish.</li>
            </ol>
            <p>Good <strong>SEO tools</strong> make steps two and three easy to manage. Schema checkers, knowledge graph tools, and NER dashboards each do a different job. Don't try to run all three from one all-in-one tool. Here's a semantic SEO example worth a look: a SaaS brand swapped vague feature text for clear entity blocks. Its product pages then showed up in AI comparison answers within one normal re-index cycle.</p>
          </section>

          {/* 05 */}
          <section className="bp-section" id="s-faq" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">05</span>
              <h2>Frequently Asked Questions</h2>
            </div>
            <p>Semantic SEO puzzles even seasoned pros. Here are short answers to the questions we hear most.</p>
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
            <p className="bp-takeaways-intro">The move from matching strings to matching entities is one of the biggest steps in the <strong>evolution</strong> of search. <strong>Semantic SEO</strong> isn't a trend to watch from afar. It decides whether your content gets cited in AI answers or drops out of neural search for good.</p>
            <div className="bp-takeaways">
              <h2 className="bp-takeaways-title">Key Takeaways</h2>
              <ul className="bp-takeaways-list">
                <li><strong>Knowledge graphs</strong> link named entities to trusted facts. That gives AI engines a clear map to read and cite your content.</li>
                <li><strong>Semantic authority</strong> comes from the same entity profile across your site, your schema markup, and outside sources.</li>
                <li>LLMs reward content that makes entity links clear. Vague content gets fewer RAG citations.</li>
                <li>A sound <strong>content strategy</strong> maps every page to one clear entity before a single word is written.</li>
                <li>The <strong>AI future</strong> of search favors sites that act as sources of facts, not bags of keywords.</li>
                <li>Schema audits and entity checks are ongoing upkeep, not one-time jobs. Keep doing them.</li>
                <li>SEO pros who switch to entity-based thinking now build a lead that grows over time. Keyword-focused rivals will struggle to catch up.</li>
              </ul>
            </div>
            <p className="bp-takeaways-intro">The teams who win here treat their site as a well-ordered base of facts. They map entities to Wikidata IDs. They run schema audits on a set schedule. That habit is what sets apart the sites that show up in AI Overviews from those that don't. The <strong>evolution</strong> continues. Start with one entity. Build from there.</p>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
}
