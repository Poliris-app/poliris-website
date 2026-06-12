import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import CtaBand from '../components/CtaBand';
import useReveal from '../hooks/useReveal';
import '../glossary.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// category: 'poliris' | 'geo'
const TERMS = [
  // ── Poliris Terms ──────────────────────────────────────────
  { term: 'Audit',           category: 'poliris', def: 'A full run of your Requests across your Zones and LLMs, with a report at the end.' },
  { term: 'Client',          category: 'poliris', def: 'A brand you work with (agency mode). Each Client has its own Workspace.' },
  { term: 'Dashboard',       category: 'poliris', def: 'The main screen with charts and numbers. One audit = one dashboard.' },
  { term: 'GEO',             category: 'poliris', def: <>Generative Engine Optimization. Making sure AI tools mention and understand your brand. See the longer industry definition under <em>GEO & AI</em>.</> },
  { term: 'LLM',             category: 'poliris', def: '"Large Language Model." The AI brains   ChatGPT, Claude, Gemini, Perplexity, Mistral, and more.' },
  { term: 'Member',          category: 'poliris', def: 'A person on your team. Roles: Owner, Admin, Editor, Viewer.' },
  { term: 'Organization',    category: 'poliris', def: 'Your top-level Poliris account. Holds your branding, members, billing, and clients.' },
  { term: 'Plan',            category: 'poliris', def: 'Your subscription: Starter, Growth, or Scale. Decides your monthly limits.' },
  { term: 'Poli Agent',      category: 'poliris', def: 'The Poliris AI assistant. Helps you navigate the platform, run audits, and summarize results.' },
  { term: 'Product',         category: 'poliris', def: 'Something your brand sells. The thing Poliris looks for in AI answers.' },
  { term: 'Prospect Client', category: 'poliris', def: "A brand you don't work with yet. Run a light audit to pitch them." },
  { term: 'Request',         category: 'poliris', def: 'A question you want Poliris to ask the AI. Usually written like a real customer would type it.' },
  { term: 'Request Prompt',  category: 'poliris', def: 'The behind-the-scenes template Poliris uses to talk to an LLM. A Request is what you ask; the Request Prompt is how Poliris asks it.' },
  { term: 'Sentiment Audit', category: 'poliris', def: 'Part of the GEO Audit. Looks at whether AI talks about you positively, neutrally, or negatively.' },
  { term: 'Trading Zone',    category: 'poliris', def: 'A country or region where you sell. AI answers can change from zone to zone.' },
  { term: 'Visibility Area', category: 'poliris', def: 'The combination of Trading Zones, audiences, and LLMs where Poliris watches for mentions of your brand.' },
  { term: 'Visibility Audit',category: 'poliris', def: 'Part of the GEO Audit. Counts how often AI mentions your brand compared to competitors.' },
  { term: 'Workspace',       category: 'poliris', def: 'One project inside your Organization   usually one brand or one client.' },

  // ── GEO & AI Terms ─────────────────────────────────────────
  { term: 'AI Answer Box / AI Summary',        category: 'geo', def: 'AI-generated boxes on results pages that provide a summary or direct answer to a query. They often combine information from multiple sources and include links to references.' },
  { term: 'AI Overview',                       category: 'geo', def: 'AI-generated summaries on Google results pages, combining information from multiple sources. They provide a quick overview with links to relevant content, often at the top of the SERP.' },
  { term: 'Answer Engine',                     category: 'geo', def: 'A system that directly answers questions by computing or generating a response from external data (e.g., WolframAlpha). Provides a precise answer rather than a list of links.' },
  { term: 'Answer Engine Optimization (AEO)',  category: 'geo', def: 'Content optimization to appear in direct answers provided by answer engines or conversational assistants. AEO focuses on structure, clarity, and reliability so AI can accurately retrieve and cite it.' },
  { term: 'Chunking',                          category: 'geo', def: 'Breaking large volumes of text into smaller units, called "chunks," to make them easier for language models to process. Improves the efficiency and accuracy of summarization or extraction.' },
  { term: 'Citation',                          category: 'geo', def: "Explicit mention of a source or document in a model's response, used to reference the origin of information. RAG systems and AI Overviews use citations to show which pages were consulted." },
  { term: 'Context Window',                    category: 'geo', def: 'The maximum number of tokens a model can consider simultaneously around a word or query. A larger context window allows the model to retain more information.' },
  { term: 'Conversational Search',             category: 'geo', def: 'Search where the user asks questions in natural language and receives responses as in a conversation. Replaces keyword-based searches with full queries.' },
  { term: 'Data Ingestion',                    category: 'geo', def: 'The process by which raw data is collected, imported, and integrated into a system for processing or analysis. Effective ingestion ensures the freshness of information used by generative engines.' },
  { term: 'E-E-A-T',                           category: 'geo', def: 'Experience, Expertise, Authority, Trustworthiness. A content quality evaluation framework used by Google. Strengthening these criteria improves credibility and visibility.' },
  { term: 'Embeddings',                        category: 'geo', def: 'Vector (numerical) representations of words, phrases, or objects, organized so semantically similar items are close in the vector space. Used for semantic search and retrieval.' },
  { term: 'Enriched Results',                  category: 'geo', def: 'Search results that go beyond the traditional blue link, displaying additional data, images, or visuals (reviews, products, events). Often generated from structured data.' },
  { term: 'Entity / Named Entity',             category: 'geo', def: 'An important element of a text (person, place, organization, event, date) that can be detected and categorized via named entity recognition. Feeds knowledge graphs and improves search relevance.' },
  { term: 'Featured Snippet / Position Zero',  category: 'geo', def: 'A highlighted text snippet at the top of a search results page that provides a concise answer. Called "position zero" because it appears before organic results.' },
  { term: 'Generative AI',                     category: 'geo', def: 'A set of models capable of creating text, images, or other original content from existing data. Often based on transformers and LLMs.' },
  { term: 'Generative AI Optimization (GAIO)', category: 'geo', def: 'Optimization of content to adapt it to generative engines (conceptually equivalent to GEO). Combines structuring, markup, and semantic relevance to be cited.' },
  { term: 'Generative Engine Advertising (GEA)',    category: 'geo', def: 'Adapting advertising strategies to optimize brand visibility and recommendations within AI-generated responses. Extends GEO by targeting commercial recommendations.' },
  { term: 'Generative Engine Optimization (GEO)',   category: 'geo', def: 'Optimization of digital content to improve visibility in results generated by AI models, particularly synthetic answers produced by generative engines. The successor to SEO in the AI era.' },
  { term: 'Google AI Mode',                    category: 'geo', def: 'Advanced search experience using deep reasoning and multimodal capabilities to explore a topic in detail. Relies on query fan-out to break a query into sub-questions.' },
  { term: 'Grounding / Factual Anchoring',     category: 'geo', def: "Linking an AI model's output to real, verifiable data to ensure factual results. Improves accuracy by basing generation on authentic documents rather than statistical correlations." },
  { term: 'Hallucination (AI)',                category: 'geo', def: 'Inaccuracy or false statement generated by an AI model while appearing plausible. Occurs when the model misinterprets patterns or lacks reliable information.' },
  { term: 'JSON-LD',                           category: 'geo', def: 'Serialization format that allows structured data to be embedded within HTML using JSON. Recommended by Google for implementing Schema.org without modifying visible content.' },
  { term: 'Knowledge Graph',                   category: 'geo', def: 'A knowledge base that represents entities and their relationships as nodes and edges. Search engines use it to power knowledge panels and generated answers.' },
  { term: 'Knowledge Panel',                   category: 'geo', def: 'Box in search results that presents a summary of information from a knowledge graph (key facts, images, links) about an entity. Optimized via structured data.' },
  { term: 'Large Language Model (LLM)',        category: 'geo', def: 'Large language model trained on very large volumes of text. Based on transformer architectures with billions to trillions of parameters; powers conversational agents and augmented search.' },
  { term: 'LLM Optimization (LLMO)',           category: 'geo', def: 'Optimization of content so it is used and cited by generative AI tools. Prioritizes authoritative sources, semantically complete blocks, and formats easy to analyze.' },
  { term: 'Multimodal Model',                  category: 'geo', def: 'AI model capable of understanding and processing multiple types of information (text, image, audio, video) simultaneously. Powers multimodal search.' },
  { term: 'Natural Language Processing (NLP)', category: 'geo', def: 'A field that enables machines to understand, analyze, and generate human language. Covers syntax, translation, entity recognition, and sentiment analysis.' },
  { term: 'Ontology',                          category: 'geo', def: 'Formal representation of concepts within a domain and the relationships that link them. Crucial for knowledge graphs, semantic search, and enriched results.' },
  { term: 'Passage',                           category: 'geo', def: 'Text segment short enough to be processed or indexed individually. Often created through chunking and used as a unit for search or input into generative systems.' },
  { term: 'Prompt',                            category: 'geo', def: 'Natural-language text describing the task an AI model should perform. Provides initial context and can specify style, format, or required information.' },
  { term: 'Prompt Engineering',                category: 'geo', def: 'The art of formulating and structuring an instruction (prompt) to obtain more relevant responses from a generative AI model.' },
  { term: 'Query Fan-Out',                     category: 'geo', def: 'Technique that breaks a question into multiple subtopics and simultaneously sends several queries. Helps capture different intents and retrieve diverse content.' },
  { term: 'Retrieval-Augmented Generation (RAG)', category: 'geo', def: 'Technique that combines a language model with an information retrieval system to incorporate up-to-date knowledge into generation. Reduces hallucinations and enables verifiable citations.' },
  { term: 'Schema.org',                        category: 'geo', def: 'Collaborative initiative defining schemas for structured data on the web. Used by major search engines to power enriched results and knowledge panels.' },
  { term: 'Search Generative Experience (SGE)',category: 'geo', def: "Google's experience that uses generative AI to provide quick overviews of a topic, related ideas, and follow-up questions. Inspired AI Overviews and AI Mode." },
  { term: 'Search Intent',                     category: 'geo', def: 'What the user actually wants when entering a query: informational, transactional, or navigational. Understanding intent allows content to better meet the need.' },
  { term: 'Search or Crawl Bots',              category: 'geo', def: 'Programs that automatically browse websites to download and index content. Allow search engines to discover and update pages.' },
  { term: 'Semantic Search',                   category: 'geo', def: 'Information retrieval approach that aims to understand intent and contextual meaning rather than relying solely on exact keywords. Leverages embeddings.' },
  { term: 'Structured Data',                   category: 'geo', def: 'Standardized format used to provide information about a page and classify its content. Helps engines understand content and supports enriched results.' },
  { term: 'Taxonomy',                          category: 'geo', def: 'Hierarchical classification used to organize concepts, products, or content into categories and subcategories. Helps models understand relationships between topics.' },
  { term: 'Token',                             category: 'geo', def: 'A sequence of characters considered a processing unit during tokenization (word, subword, symbol). Token count affects context window and processing costs.' },
  { term: 'Transformers',                      category: 'geo', def: 'Neural network architecture based on the multi-head attention mechanism. Introduced in "Attention Is All You Need" (2017); the foundation of most large language models.' },
  { term: 'Vector Database',                   category: 'geo', def: 'Database designed to store and query embeddings (vectors representing meaning or features). Handles multidimensional data and searches by similarity.' },
  { term: 'YMYL (Your Money or Your Life)',     category: 'geo', def: "Category of content that can impact users' health, safety, happiness, or financial stability. Google applies higher quality standards to these pages." },
  { term: 'Zero-Click Search',                 category: 'geo', def: 'Search where the answer to the query is provided directly on the results page, without an additional click. Takes the form of rich snippets, knowledge panels, or generated answers.' },
];

const sortAlpha = arr => [...arr].sort((a, b) => a.term.localeCompare(b.term));

export default function GlossaryPage() {
  useReveal();
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('all');   // 'all' | 'poliris' | 'geo'
  const [letter, setLetter]     = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Terms visible given current category filter
  const byCategory = filter === 'all'
    ? TERMS
    : TERMS.filter(t => t.category === filter);

  // Which letters have at least one term in current category filter
  const activeLetters = new Set(byCategory.map(t => t.term[0].toUpperCase()));

  // Apply search + letter filter
  const q = search.toLowerCase();
  let visible = byCategory.filter(t => {
    const matchSearch = !q || t.term.toLowerCase().includes(q) || (typeof t.def === 'string' && t.def.toLowerCase().includes(q));
    const matchLetter = !letter || t.term[0].toUpperCase() === letter;
    return matchSearch && matchLetter;
  });

  // Sort: Poliris A-Z first, then GEO & AI A-Z (only in "all" view with no letter/search filter)
  let sorted;
  if (filter === 'all' && !q && !letter) {
    const poliris = sortAlpha(visible.filter(t => t.category === 'poliris'));
    const geo     = sortAlpha(visible.filter(t => t.category === 'geo'));
    sorted = [...poliris, ...geo];
  } else {
    sorted = sortAlpha(visible);
  }

  function toggleLetter(l) {
    setLetter(prev => prev === l ? null : l);
  }

  return (
    <div>
      <Navbar />
      <main>
        <Hero
          eyebrow="Glossary"
          title={<>The plain-English <span style={{ color: 'var(--poliris-blue)' }}>AI-visibility</span> glossary.</>}
          lead="Every term we use   defined the way you'd explain it to your CEO."
          primaryCta="Start free trial"
          secondaryCta="Book a demo"
          showDashboard={false}
          showAiBand={false}
        />

        <section className="gloss-sec">
          <div className="gloss-wrap">

            {/* Toolbar */}
            <div className="gloss-toolbar">
              <div className="gloss-search">
                <span className="gloss-search-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
                  </svg>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search terms..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setLetter(null); }}
                />
                <span className="gloss-search-kbd">
                  <span>⌘</span>
                  <span>K</span>
                </span>
              </div>

              <div className="gloss-tabs">
                {[
                  { id: 'all',     label: 'All' },
                  { id: 'poliris', label: 'Poliris Terms' },
                  { id: 'geo',     label: 'GEO & AI' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    className={`gloss-tab${filter === tab.id ? ' gloss-tab--active' : ''}`}
                    onClick={() => { setFilter(tab.id); setLetter(null); }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Alphabet nav */}
            <div className="gloss-alpha">
              {ALPHABET.map(l => (
                <button
                  key={l}
                  className={`gloss-alpha-btn${letter === l ? ' gloss-alpha-btn--active' : ''}${!activeLetters.has(l) ? ' gloss-alpha-btn--empty' : ''}`}
                  onClick={() => toggleLetter(l)}
                  disabled={!activeLetters.has(l)}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="gloss-grid">
              {sorted.length > 0 ? sorted.map((t, i) => (
                <div key={i} className="gloss-card">
                  <span className={`gloss-badge gloss-badge--${t.category}`}>
                    {t.category === 'poliris' ? 'Poliris' : 'GEO & AI'}
                  </span>
                  <p className="gloss-term">{t.term}</p>
                  <p className="gloss-def">{t.def}</p>
                </div>
              )) : (
                <p className="gloss-empty">No terms match your search.</p>
              )}
            </div>

          </div>
        </section>

        <CtaBand
          heading="Want a deeper dive?"
          lead="Read the Poliris Documentation for product walkthroughs and integration guides."
          primaryCta="Read the docs"
          secondaryCta="Start free trial"
          note="No credit card · Cancel anytime"
        />
      </main>
      <Footer />
    </div>
  );
}
