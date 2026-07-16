import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import '../legal.css';

// Shared renderer for the legal pages (Privacy Policy, Terms of Service,
// Mentions légales). Content lives as plain Markdown in src/content/legal/
// and is rendered as-is here, rather than hand-transcribed into JSX, so the
// pages stay a faithful copy of the source documents as they're updated.
export default function LegalPage({ page, content }) {
  return (
    <div className="legal-page">
      <Seo page={page} />
      <Navbar />
      <main className="legal-wrap">
        <article className="legal-doc">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </main>
      <Footer />
    </div>
  );
}
