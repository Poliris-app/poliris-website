import { Navigate } from 'react-router-dom';
import { LangWrapper } from './contexts/LangContext';
import HomePage from './components/HomePage';
import VisibilityPage from './pages/VisibilityPage';
import SentimentPage from './pages/SentimentPage';
import ContentWritingPage from './pages/ContentWritingPage';
import TechnicalAuditPage from './pages/TechnicalAuditPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import FaqsPage from './pages/FaqsPage';
import GlossaryPage from './pages/GlossaryPage';
import DocsPage from './pages/DocsPage';
import GetaDemoPage from './pages/GetaDemoPage';
import LegalPage from './pages/LegalPage';
import privacyPolicyEnMd from './content/legal/privacy-policy.md?raw';
import privacyPolicyFrMd from './content/legal/privacy-policy.fr.md?raw';
import termsOfServiceEnMd from './content/legal/terms-of-service.md?raw';
import termsOfServiceFrMd from './content/legal/terms-of-service.fr.md?raw';
import mentionsLegalesFrMd from './content/legal/mentions-legales.md?raw';
import mentionsLegalesEnMd from './content/legal/mentions-legales.en.md?raw';

export const routes = [
  // Bare root: client-side redirect to the default locale.
  // Crawlers reaching "/" are redirected at the edge (see vercel.json).
  { path: '/', element: <Navigate to="/en/" replace /> },
  {
    path: '/:lang',
    element: <LangWrapper />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'visibility', element: <VisibilityPage /> },
      { path: 'sentiment', element: <SentimentPage /> },
      { path: 'content-writing', element: <ContentWritingPage /> },
      { path: 'technical-audit', element: <TechnicalAuditPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'faqs', element: <FaqsPage /> },
      { path: 'glossary', element: <GlossaryPage /> },
      { path: 'docs', element: <DocsPage /> },
      { path: 'demo', element: <GetaDemoPage /> },
      { path: 'privacy', element: <LegalPage page="privacy" content={{ en: privacyPolicyEnMd, fr: privacyPolicyFrMd }} /> },
      { path: 'terms', element: <LegalPage page="terms" content={{ en: termsOfServiceEnMd, fr: termsOfServiceFrMd }} /> },
      { path: 'mentions-legales', element: <LegalPage page="mentions-legales" content={{ en: mentionsLegalesEnMd, fr: mentionsLegalesFrMd }} /> },
    ],
  },
];
