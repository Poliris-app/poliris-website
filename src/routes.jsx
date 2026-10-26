import { Navigate } from 'react-router-dom';
import { LangWrapper } from './contexts/LangContext';
import NotFoundRedirect from './components/NotFoundRedirect';
import RouteErrorBoundary from './components/RouteErrorBoundary';
import HomePage from './components/HomePage';
import VisibilityPage from './pages/VisibilityPage';
import SentimentPage from './pages/SentimentPage';
import ContentWritingPage from './pages/ContentWritingPage';
import TechnicalAuditPage from './pages/TechnicalAuditPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import FaqsPage from './pages/FaqsPage';
import GlossaryPage from './pages/GlossaryPage';
import AuditPage from './pages/AuditPage';
import GetaDemoPage from './pages/GetaDemoPage';
import PricingPage from './pages/PricingPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
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
    // Replaces react-router's raw "Unexpected Application Error!" screen;
    // reloads tabs left on an old deploy (see RouteErrorBoundary).
    errorElement: <RouteErrorBoundary />,
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
      // The documentation carries ~470 KB of copy per language. Loading it
      // lazily keeps all of it out of the bundle every other page pays for,
      // while still prerendering to real HTML (ssgOptions.includedRoutes).
      { path: 'docs', lazy: () => import('./pages/DocsPage').then((m) => ({ Component: m.default })) },
      { path: 'docs/:chapter', lazy: () => import('./pages/DocsChapterPage').then((m) => ({ Component: m.default })) },
      { path: 'audit/:slug', element: <AuditPage /> },
      { path: 'demo', element: <GetaDemoPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'checkout/success', element: <CheckoutSuccessPage /> },
      { path: 'privacy', element: <LegalPage page="privacy" content={{ en: privacyPolicyEnMd, fr: privacyPolicyFrMd }} /> },
      { path: 'terms', element: <LegalPage page="terms" content={{ en: termsOfServiceEnMd, fr: termsOfServiceFrMd }} /> },
      { path: 'mentions-legales', element: <LegalPage page="mentions-legales" content={{ en: mentionsLegalesEnMd, fr: mentionsLegalesFrMd }} /> },
      { path: '*', element: <NotFoundRedirect /> },
    ],
  },
  // Anything outside "/" and "/:lang/*" (e.g. no lang segment at all).
  { path: '*', element: <Navigate to="/en/" replace /> },
];
