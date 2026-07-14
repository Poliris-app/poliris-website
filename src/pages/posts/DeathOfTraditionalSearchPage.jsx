import { useState, useEffect } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useLang } from '../../contexts/LangContext';
import '../../blog-post.css';

const SECTIONS = [
  { id: 's-paradigm',   label: 'The Paradigm Shift' },
  { id: 's-vs-seo',     label: 'GEO vs. Traditional SEO' },
  { id: 's-visibility', label: 'Boosting AI Search Visibility' },
  { id: 's-technical',  label: 'Technical SEO Prerequisites' },
  { id: 's-faq',        label: 'FAQ' },
  { id: 's-takeaways',  label: 'Key takeaways' },
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

export default function DeathOfTraditionalSearchPage() {
  const { lang } = useLang();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [progress, setProgress] = useState(0);

  const FAQ_ITEMS = [
    {
      q: 'Will GEO Completely Replace Traditional SEO?',
      a: 'No. Any consultant telling you otherwise is selling you something. SEO versus GEO is not a binary choice. Traditional technical SEO forms the crawlable foundation that AI engines depend on. Without clean site architecture and indexable content, no AI engine will cite you. Think of it this way. Technical SEO is the road. GEO is the signage that tells the AI where to go.',
    },
    {
      q: 'How Do You Measure ROI on AI Search Visibility?',
      a: <>
        <p>ROI measurement for AI visibility is still maturing, but you are not flying blind. Track these signals:</p>
        <ul>
          <li>Branded mention volume in AI-generated answers.</li>
          <li>Referral traffic from AI-sourced clicks. Monitor the direct impact of your GEO efforts as AI engines increasingly surface and link to your content.</li>
          <li>Share of voice in AI answer panels versus competitors. You can track your exact share of voice across all major AI engines using <Link to={`/${lang}/visibility`}>Poliris AI Visibility</Link>.</li>
          <li>Growth in branded search queries. These often spike when AI engines cite you repeatedly.</li>
        </ul>
      </>,
    },
    {
      q: 'What Is the Biggest Mistake Brands Make?',
      a: 'The biggest mistake brands make is treating GEO as a simple content formatting tweak. In practice, it requires a structural change. Teams that simply tack FAQ sections onto the end of existing blog posts see little return. The brands that win restructure their entire content hierarchy around entity authority and machine-readable claims.',
    },
  ];

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
        <title>The Death of Traditional Search: Why GEO Is Your New Priority | Poliris</title>
        <link rel="canonical" href="https://poliris.io/en/blog/death-of-traditional-search-geo-priority" />
        <link rel="alternate" hrefLang="en" href="https://poliris.io/en/blog/death-of-traditional-search-geo-priority" />
        <link rel="alternate" hrefLang="x-default" href="https://poliris.io/en/blog/death-of-traditional-search-geo-priority" />
        <meta name="description" content="Generative engine optimization (GEO) is the practice of structuring content so AI answer engines extract and cite it directly. Here's why it's your new priority." />
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
              <span>Jun 30, 2026</span>
            </div>
            <h1 className="bp-title">The Death of Traditional Search: Why Generative Engine Optimization (GEO) Is Your New Priority</h1>
            <p className="bp-deck">Generative engine optimization (GEO) is the practice of structuring content so AI answer engines extract and cite it directly. These engines include ChatGPT, Claude, and Gemini. Traditional SEO optimizes for ranked lists on Google. GEO targets the answer layer above the search results page.</p>
            <p className="bp-deck">Search behavior has already changed. <a target="_blank" rel="noopener" href="https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents" style={{ textDecoration: 'underline' }}>Gartner projects that traditional search volume will decline 25% by 2026</a>. Queries are shifting heavily to conversational AI interfaces. If your content lacks the right structure for this environment, it will likely be overlooked. Your Google rank will not matter. This guide is your digital strategy reset. You will learn exactly how GEO works, why it demands a different content architecture than classic SEO, and how generative AI SEO principles help you adapt today.</p>
            <div className="bp-tags">GEO · SEO · AI Search Visibility</div>
          </header>

          {/* 01 */}
          <section className="bp-section" id="s-paradigm" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">01</span>
              <h2>The Paradigm Shift: What Is Generative Engine Optimization?</h2>
            </div>
            <p>Adapting to GEO means moving beyond ranking for clicks. The new goal is to become the trusted source an AI quotes. Search did not change suddenly. For decades, SEO rewarded pages that matched keywords and earned backlinks. Then large language models arrived, and the retrieval logic flipped. AI engines now synthesize an answer from the sources they trust most instead of returning a list of links. If your content lacks the proper structure for that synthesis, it remains invisible.</p>
            <p>In practice, GEO looks like this. A founder asks Gemini how to reduce customer churn. Gemini does not show ten blue links. It composes a paragraph and attributes ideas to two or three credible sources. One of those sources wins the conversation. Generative search optimization is the discipline that puts your content in that winning seat.</p>
            <p>Entity authority earns that placement. AI engines do not just scan keywords. They assess whether your brand, your authors, and your claims form a coherent and trustworthy entity across the web. This discipline matters most for content strategists, SEO professionals, and founders. Their buyers already use AI tools to research decisions. In fact, <a target="_blank" rel="noopener" href="https://www.prnewswire.com/news-releases/73-of-b2b-buyers-use-ai-tools-in-purchase-research-multi-source-analysis-finds-302733319.html#:~:text=B2B%20buyers%20use%20AI%20search,tools%20into%20their%20research%20process.">73% of B2B buyers use AI tools like ChatGPT or Perplexity in vendor research</a>. If your audience asks questions in ChatGPT before they visit a search engine, GEO is your priority today. Sound SEO integration remains the foundation. You can explore how those two disciplines connect in our guide, <Link to={`/${lang}/blog/why-seo-is-the-cornerstone-of-geo-success`}>Why SEO is the Cornerstone of GEO Success</Link>.</p>
            <ImgHold label="Figure 1" sub="The retrieval shift: from ranked links to a single synthesized answer" />
            <div className="bp-note">
              <div className="bp-note-label">Expert Tip</div>
              <p>Write every key claim as a single, declarative sentence under 50 words. That is the exact format AI engines extract verbatim when composing answers.</p>
            </div>
          </section>

          {/* 02 */}
          <section className="bp-section" id="s-vs-seo" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">02</span>
              <h2>GEO vs. Traditional SEO: Why Blue Links Are Dying</h2>
            </div>
            <p>Blue links are losing ground fast. A user asks ChatGPT or Gemini a question and gets a direct answer. They do not get a list of ten URLs to click. That single shift changes everything about how brands win visibility online.</p>
            <p>The core of the GEO versus SEO debate comes down to one question. Are you optimizing for a ranking position, or for being cited as the source? Traditional SEO chased keyword density and backlink counts. GEO builds entity authority. This means AI engines must recognize your brand as a trusted, well-defined source on a specific topic. Think of it like the difference between appearing on a crowded shelf and being the brand a knowledgeable store clerk recommends by name.</p>
            <h3>From Keyword Density to Entity Authority</h3>
            <p>The transition to GEO is not a replacement. It is a layering process. Traditional technical SEO remains the required foundation. AI crawlers simply cannot parse your content accurately without clean crawl directives, properly structured heading hierarchies, and fast-loading pages. A technically broken site is invisible to Google and generative engines alike.</p>
            <p>What changes above that foundation is the ultimate goal. Early SEO rewarded the repetition of a target phrase. GEO rewards depth of meaning and clarity of attribution. AI engines extract answers from content that explicitly defines concepts, names real entities, and connects them with logical reasoning. Here is where most brands fall short in practical terms:</p>
            <ul className="bp-prose-list">
              <li>They optimize for clicks but never structure content for direct extraction.</li>
              <li>They treat schema markup as optional rather than the machine-readable backbone it is.</li>
              <li>They ignore whether AI engines can attribute a claim back to them specifically.</li>
            </ul>
            <div className="bp-note">
              <div className="bp-note-label">Expert Tip</div>
              <p>If an AI engine cannot summarize your content in two sentences without guessing, your entity authority is too weak. Rewrite your core pages with declarative, fact-dense prose that stands alone without surrounding context.</p>
            </div>
          </section>

          {/* 03 */}
          <section className="bp-section" id="s-visibility" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">03</span>
              <h2>Boosting AI Search Visibility: How Engines Extract Answers</h2>
            </div>
            <p>AI search visibility starts with one fundamental truth. Engines like ChatGPT, Claude, and Gemini do not rank pages. They parse them. The question is not whether your content appears in an index. It is whether a language model can extract a clean, confident answer from your prose and cite it.</p>
            <p>Most content fails that test. It fails because it was not written for content parsing. Long paragraphs, buried claims, and vague transitions make it easy for a human reader to follow along. However, they make it nearly impossible for an AI engine to extract a standalone answer. Think of it like a filing cabinet. A human can rifle through folders to find what they need. An AI engine needs clearly labeled drawers.</p>
            <h3>How to Align with AI Search Standards</h3>
            <p>Meeting GEO standards means restructuring how you deliver claims. Follow these steps to integrate AI search optimization into your existing content strategy:</p>
            <ol className="bp-steps">
              <li><strong>Lead with answers:</strong> Place your core claim in the first sentence of every section. AI engines heavily weigh opening sentences for citation extraction.</li>
              <li><strong>Use plain language:</strong> Target an 8th-grade to 10th-grade reading level. Complexity hides meaning from both parsers and human readers.</li>
              <li><strong>Apply AI-driven insights:</strong> Use tools that surface the actual questions AI engines are answering for your target topics. Build content that addresses them directly.</li>
              <li><strong>Build entity-rich context:</strong> Name the what, who, and why explicitly. Generative search optimization rewards content that defines its own terms rather than assuming shared industry knowledge.</li>
              <li><strong>Structure with hierarchy:</strong> Clear H2 and H3 headings act as vital navigation cues for AI crawlers.</li>
            </ol>
            <ImgHold label="Figure 2" sub="The five-step framework for aligning content with AI search standards" />
            <div className="bp-note">
              <div className="bp-note-label">Expert Tip</div>
              <p>Run your draft through a Flesch reading-level checker before publishing. If your content scores above a 10th-grade reading level, rewrite the densest paragraphs first. Simpler sentence structures dramatically improve AI citation rates.</p>
            </div>
            <p>In practice, a financial services brand restructured its FAQ pages around declarative, answer-first sentences. AI engines began to surface its definitions as direct answers shortly after publication. The substance of the content did not change. Only the delivery changed. Backlinks alone no longer signal authority. Clean reading, direct parsing, and repetition now signal authority.</p>
          </section>

          {/* 04 */}
          <section className="bp-section" id="s-technical" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">04</span>
              <h2>The Technical SEO Prerequisites for AI Crawlers</h2>
            </div>
            <p>AI crawlers do not browse your site the way Google bots do. They parse, extract, and synthesize. If your technical foundation is weak, language models skip your content entirely. This happens no matter how strong your prose is. Most people assume polished writing is enough for generative engine optimization. In practice, the real gatekeeper is technical. Get the infrastructure wrong, and your content never enters the model's awareness.</p>
            <h3>Audit Your Crawl Directives First</h3>
            <p>Technical SEO starts with access. AI agents like GPTBot and ClaudeBot read your robots.txt file before touching a single page. If your directives accidentally block them, your indexing stalls at the door. Here is how to fix it:</p>
            <ul className="bp-prose-list">
              <li>Open your robots.txt file and check for broad Disallow rules that catch AI user-agents unintentionally.</li>
              <li>Add explicit Allow directives for crawlers you want to grant access to, such as GPTBot and Google-Extended.</li>
              <li>Audit meta robots tags site-wide. A noindex tag on a cornerstone page blocks AI crawlers just as surely as it blocks standard search engines.</li>
            </ul>
            <h3>Structure Data for Entity Extraction</h3>
            <p>Raw text is hard for language models to parse quickly. Schema markup changes that by wrapping your content in a machine-readable format. This makes entity relationships explicit. Use Article schema on editorial content. Add FAQPage schema to Q&A sections. This is where AI engines pull direct answers. Apply Organization schema to your About page to strengthen overall entity authority. Additionally, implementing an llm.txt file is a critical new standard for LLM indexing. This file acts as a direct map for AI crawlers and ensures your core data is parsed without friction.</p>
            <ImgHold label="Figure 3" sub="The crawl-to-citation dependency stack: access, schema, and heading hierarchy" />
            <h3>Fix Content Hierarchy and Readability</h3>
            <p>Broken heading levels confuse parsers. An H4 tag appearing directly after an H2 with no H3 in between signals poor structure. Language models weigh properly nested headings as a sign of logical, trustworthy content. Plain language matters just as much. Short sentences, clear claims, and logical flow all reduce parsing friction for AI systems.</p>
            <p><strong>Key takeaway:</strong> Clean crawl access, comprehensive schema, and logical heading hierarchies are the three non-negotiable prerequisites before any generative search optimization effort can gain traction.</p>
          </section>

          {/* 05 */}
          <section className="bp-section" id="s-faq" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">05</span>
              <h2>Frequently Asked Questions</h2>
            </div>
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
                    <div className="bp-faq-body-inner">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Takeaways */}
          <div id="s-takeaways" style={{ scrollMarginTop: '90px', marginTop: '3.5rem' }}>
            <h2 className="bp-section-h2">Conclusion</h2>
            <p className="bp-takeaways-intro">The future of search is already here. AI engines are actively reshaping how answers surface, and brands that wait will lose ground fast. Adapting your digital strategy to this reality is not optional.</p>
            <p className="bp-takeaways-intro">Understanding the mechanics of generative engine optimization is the first step. Executing it consistently is what separates brands that get cited from brands that get ignored. The gap between those two groups will widen every quarter. Start your GEO audit today by identifying your three highest-traffic pages. Rewrite their opening paragraphs as direct, declarative answers.</p>
            <div className="bp-takeaways">
              <h2 className="bp-takeaways-title">Key Takeaways</h2>
              <ul className="bp-takeaways-list">
                <li>Generative engine optimization shifts the focus from ranking for clicks to structuring content so AI engines can extract and cite it.</li>
                <li>Traditional technical SEO is the non-negotiable foundation for any GEO implementation. This includes clean crawl directives, proper schema, and clear heading hierarchies.</li>
                <li>AI search visibility depends heavily on entity authority and readability, not keyword density.</li>
                <li>GEO and SEO are not competing strategies. GEO builds on the technical foundation of SEO and extends it for AI-driven environments.</li>
              </ul>
            </div>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
}
