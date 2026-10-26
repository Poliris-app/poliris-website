import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Seo from '../../components/Seo';
import Footer from '../../components/Footer';
import { useLang } from '../../contexts/LangContext';
import '../../blog-post.css';

const SECTIONS = [
  { id: 's-core',      label: 'Core Principles of GEO' },
  { id: 's-onpage',    label: 'On-Page Formatting' },
  { id: 's-semantic',  label: 'Semantic HTML & Schema' },
  { id: 's-local',     label: 'Local GEO & Corroboration' },
  { id: 's-citation',  label: 'Citation Formatting & Recency' },
  { id: 's-checklist', label: 'AI Visibility Checklist' },
  { id: 's-faq',       label: 'FAQ' },
];

const FAQ_ITEMS = [
  {
    q: 'Does excessive DOM size impact how RAG systems chunk content?',
    a: <>Yes. When a page has far more code than text (DOM bloat), a language model has a hard time pulling out entities. If a page is packed with nested <code>{'<div>'}</code> tags or too much inline styling, parsers can't tell where one chunk of text ends and the next begins. Keep a high "Plain Text Rate" and a shallow DOM. Then your content takes less work to turn into vectors.</>,
  },
  {
    q: 'How do AI crawlers process JavaScript-rendered text versus server-side HTML?',
    a: <>Googlebot is now very good at running JavaScript. But many AI crawlers (like GPTBot, ClaudeBot, or Perplexity) can do far less. If your key facts or citations need heavy JavaScript to load, there's a good chance AI engines will see a blank or half-empty page. For the best GEO results, use Server-Side Rendering (SSR) or static HTML.</>,
  },
  {
    q: 'Should we prioritize inline textual citations or JSON-LD schema for factual grounding?',
    a: <>Use both. They do two different jobs. JSON-LD schema (like Organization or Article) tells AI who and what the page is about. It works as a quick trust signal. Inline citations do the fine-grained work. They name the source of each fact right in the text, which is what RAG models need to build direct answers and AI Overviews.</>,
  },
];

export default function HighVisibilityContentPage() {
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
      <Seo page="blog/blueprint-for-high-visibility-content" type="article" title="The Blueprint for High-Visibility Content in AI Search" description="Structure every page with a strict heading hierarchy, short paragraphs and explicit inline citations to win visibility in AI answers." />
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
              <span>Aug 20, 2026</span>
            </div>
            <h1 className="bp-title">High-Visibility Content: Formatting, Readability & AI Optimization</h1>
            <p className="bp-deck">Search is splitting into many places. To <strong>optimize content for generative AI</strong>, writers need to know that large language models (LLMs) don't read pages the way search crawlers do. Classic search engines like Google weigh keywords and backlinks. AI engines that use RAG (Retrieval-Augmented Generation) work in a new way. They cut pages into chunks, turn ideas into vectors, and match each question to the meaning of the text.</p>
          </header>

          {/* Intro */}
          <div className="bp-section">
            <p>In a 2024 report, <a target="_blank" rel="noopener" href="https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents">Gartner projected a 25% drop in traditional search volume by 2026, driven by AI chatbots and virtual agents</a>. That shift is real, but it looks different than the forecast. OpenAI says ChatGPT alone now gets <a target="_blank" rel="noopener" href="https://techcrunch.com/2025/07/21/chatgpt-users-send-2-5-billion-prompts-a-day/">2.5 billion prompts a day</a>. Yet classic search hasn't gone away. Google has kept most of the market by putting AI Overviews right in its results. For writers, the lesson is the same: getting cited in an AI answer is now a second way to be found. You have to compete for it, on top of your normal rankings.</p>
            <p>The key rule is simple but strict. Give every page a clean heading order, short paragraphs, and clear inline citations. Then AI systems can chunk, pull out, and cite your text as a trusted answer.</p>
            <p>Also, keep in mind that each AI platform picks content in its own way:</p>
            <ul className="bp-prose-list">
              <li><strong>Perplexity</strong> strongly favors fresh content with clear sources.</li>
              <li><strong>Claude</strong> tends to favor full, well-built arguments.</li>
              <li><strong>Google's AI Overviews</strong> favor short, direct answers from pages that already rank well in SEO.</li>
            </ul>
            <p>Strong <strong>SEO content formatting</strong> works for all of them at once. It gives AI systems clean signals they can read and trust.</p>
          </div>

          {/* 01 */}
          <section className="bp-section" id="s-core" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">01</span>
              <h2>Core Principles of Generative Engine Optimization (GEO)</h2>
            </div>
            <p>Writing for generative AI means moving away from keyword density. Focus on clear structure and facts with sources. The format choices you make in the first draft decide whether a RAG system can read your page, or just skips it. If your team needs hands-on help, our <Link to={`/${lang}/content-writing`}>content writing services</Link> can blend human writing with a structure AI can read.</p>
            <p>LLMs are mostly black boxes. So GEO today relies on testing and rules of thumb, not on a fixed set of known rules. The rule that holds up best: treat every H2 section as a chunk that makes sense on its own. That makes your page much easier for machines to read.</p>
          </section>

          {/* 02 */}
          <section className="bp-section" id="s-onpage" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">02</span>
              <h2>On-Page Formatting: Architecture for Machine Extraction</h2>
            </div>
            <p>Formatting is the base that lets machines pull text from your page. Clear formatting doesn't promise an AI citation. But dense walls of text are often ignored by RAG systems. When you review your pages, split the check into three parts: Readability, Structure, and Architecture.</p>
            <h3>Readability and Syntax Heuristics</h3>
            <p>For <strong>AI readability standards</strong>, most experts aim for a Flesch-Kincaid grade level of 8 to 10. LLMs can read dense, academic text. But plain sentences and paragraphs of 2-3 sentences give them much cleaner chunks to work with. As a bonus, this short format also suits people reading on their phones.</p>
            <p><strong>Strategic Micro-Formatting (Structure)</strong></p>
            <p>Micro-formatting works like road signs for AI readers. It isn't a direct ranking factor in classic SEO. But using the same markup rules every time seems to help RAG systems quickly see how ideas link.</p>
            <div className="bp-table-wrap">
              <table className="bp-table">
                <thead>
                  <tr>
                    <th>Formatting Type</th>
                    <th>Implementation Rule</th>
                    <th>AI/GEO Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Entity Bolding</strong></td>
                    <td>Bold the first mention of each key entity.</td>
                    <td>A common way to flag the main idea of a paragraph.</td>
                  </tr>
                  <tr>
                    <td><strong>Unordered Lists ({'<ul>'})</strong></td>
                    <td>Use bullet points only for facts or options in no set order.</td>
                    <td>Groups related entities without implying an order.</td>
                  </tr>
                  <tr>
                    <td><strong>Ordered Lists ({'<ol>'})</strong></td>
                    <td>Use numbered lists only for steps or ranked items.</td>
                    <td>Tells the LLM the order: which step comes first and what matters most.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 03 */}
          <section className="bp-section" id="s-semantic" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">03</span>
              <h2>Semantic HTML and Schema Architecture</h2>
            </div>
            <p>A good heading structure gives the page a clear map. When an AI system cuts a page into chunks, it often uses the headings to keep each chunk in context. A full <Link to={`/${lang}/technical-audit`}>technical audit</Link> is the fastest way to find and fix broken heading maps on older sites.</p>
            <h3>Strict HTML Heading Hierarchy</h3>
            <p>Semantic HTML gives LLMs an outline they can read without guessing what the page is about.</p>
            <ul className="bp-prose-list">
              <li><strong>The H1</strong> sets the main topic of the page.</li>
              <li><strong>The H2s</strong> set the main subtopics.</li>
              <li><strong>The H3s</strong> go into the fine details.</li>
            </ul>
            <p>Breaking that chain, like jumping from an H1 straight to an H3, can split up the page's context. The model may then lose track of which idea sits under which. That can lead to a made-up answer or a missed citation.</p>
            <h3>The Answer-First Pattern (BLUF)</h3>
            <p>To raise your odds of being quoted and shown in Google's AI Overviews, we suggest the Bottom Line Up Front (BLUF) method.</p>
            <p><strong>Implementation:</strong> Put a short, direct answer right below each H2 and H3. Then add the details.</p>
            <h3>Targeted JSON-LD Schema Integration</h3>
            <p>Clean HTML on the page should always come with exact structured data behind it. Generic JSON-LD isn't enough. It has to match the type of content on the page. Using the official <a target="_blank" rel="noopener" href="https://schema.org/docs/documents.html">Schema.org standards</a> helps search engines file your ideas right away.</p>
            <p>When you plan these updates, ask your developer to add the right schema to each page type:</p>
            <ol className="bp-steps">
              <li><strong>Article or NewsArticle Schema:</strong> Use this to name the main entities and the authors.</li>
              <li><strong>FAQPage Schema:</strong> Use this for question-and-answer blocks, so AI can match them to real questions.</li>
              <li><strong>ItemList Schema:</strong> Use this for ranked lists, side-by-side guides, and "Top 10" posts.</li>
              <li><strong>LocalBusiness or Organization Schema:</strong> Add this to every page. It tells AI where your brand is, where it works, and who it is, for local questions.</li>
              <li><strong>ProfilePage and Person Schema:</strong> Use this on author bios and team pages. It sends clear E-E-A-T signals and shows AI engines that real experts wrote the content.</li>
            </ol>
          </section>

          {/* 04 */}
          <section className="bp-section" id="s-local" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">04</span>
              <h2>Local GEO and Off-Page Entity Corroboration</h2>
            </div>
            <p>On-page <strong>semantic structure for SEO</strong> is only half the job. AI engines check a claim against many sources before they trust it.</p>
            <p>A brand, fact, or idea that shows up on many trusted, unrelated sites carries far more weight in a RAG system. Brand mentions (even without links) and steady PR are key. They build the entity authority you need to earn top AI citations.</p>
            <p><strong>The Local GEO Advantage:</strong> For brands that want to be found locally, outside proof matters even more. AI engines check what your page says against local listings, local news, and map data. Keep your NAP (Name, Address, Phone) exactly the same everywhere, and in line with your page text. Then LLMs won't get mixed signals about your business.</p>
          </section>

          {/* 05 */}
          <section className="bp-section" id="s-citation" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">05</span>
              <h2>AI Citation Formatting and Recency</h2>
            </div>
            <p>AI models care a lot about sourced facts and fresh content. Content with no clear sources is often skipped in favor of pages that cite theirs.</p>
            <h3>Anchoring Facts and Claims</h3>
            <p>Write your facts, stats, and quotes so a machine can easily tell where they came from.</p>
            <p>Put the source name and year right in the sentence (for example, <em>"A 2024 Gartner survey found that..."</em>). Don't hide it in a footer or behind a link. When the source sits next to the claim, an LLM is far less likely to treat your fact as just an opinion.</p>
            <h3>Freshness and Recency Signals</h3>
            <p>AI engines, Perplexity most of all, strongly prefer new content. Citations often drop fast as a page gets older. To fight this, show a "Last Updated" date on the page. Add the same date to your schema too. That tells AI bots the content is still current.</p>
          </section>

          {/* 06 */}
          <section className="bp-section" id="s-checklist" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">06</span>
              <h2>The AI Visibility Checklist for Editorial Teams</h2>
            </div>
            <p>To follow GEO best practice and reach every LLM, run this check on each draft before you publish:</p>
            <ul className="bp-prose-list">
              <li><strong>Check Heading Depth:</strong> Keep a strict H1 → H2 → H3 order. Never skip a level.</li>
              <li><strong>Check Answer Placement:</strong> Each H2 and H3 should open with a short, direct answer before the details (BLUF method).</li>
              <li><strong>Check Readability:</strong> Aim for a Flesch-Kincaid grade level of 8 to 10.</li>
              <li><strong>Keep Paragraphs Short:</strong> Split any paragraph longer than three sentences, so it's easy to chunk.</li>
              <li><strong>Use the Right Lists:</strong> Use numbered ({'<ol>'}) lists for steps and bullet ({'<ul>'}) lists for items in no set order.</li>
            </ul>
            <ul className="bp-prose-list">
              <li><strong>Bold Key Entities:</strong> Bold the main idea or entity the first time it shows up in a section.</li>
              <li><strong>Check Schema Types:</strong> Make sure the right JSON-LD schema for the page type (e.g., Article, FAQPage, ItemList) is there, correct, and free of errors.</li>
              <li><strong>Cite Inline:</strong> Name the source of every stat, number, and outside claim right in the text.</li>
              <li><strong>Keep Dates Fresh:</strong> Check that the "Last Updated" date is current and shows both on the page and in the schema.</li>
            </ul>
            <p>To see how these steps affect your whole site, track your <Link to={`/${lang}/visibility`}>AI visibility metrics</Link> with <Link to={`/${lang}`}>Poliris</Link>.</p>
          </section>

          {/* 07 */}
          <section className="bp-section" id="s-faq" style={{ scrollMarginTop: '90px' }}>
            <div className="bp-section-header">
              <span className="bp-num">07</span>
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
                    <div className="bp-faq-body-inner"><p>{item.a}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
      <Footer />
    </div>
  );
}
