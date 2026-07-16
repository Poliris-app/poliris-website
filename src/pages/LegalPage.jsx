import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { useLang } from '../contexts/LangContext';
import '../legal.css';

// Shared renderer for the legal pages (Privacy Policy, Terms of Service,
// Mentions légales). Content lives as plain Markdown in src/content/legal/
// and is rendered as-is here, rather than hand-transcribed into JSX, so the
// pages stay a faithful copy of the source documents as they're updated.
// `content` is `{ en, fr }` — both languages are real, human-reviewed-
// pending translations (see the .fr.md / .en.md files), not the same
// text reused across both URLs.
export default function LegalPage({ page, content }) {
  const { lang } = useLang();
  const body = content[lang] ?? content.en;

  return (
    <div className="legal-page">
      <Seo page={page} />
      <Navbar />
      <main className="legal-wrap">
        <article className="legal-doc">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </article>
      </main>
      <Footer />
    </div>
  );
}
