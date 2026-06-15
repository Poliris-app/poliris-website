import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { LangWrapper } from './contexts/LangContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import VisibilityPage from './pages/VisibilityPage';
import SentimentPage from './pages/SentimentPage';
import ContentWritingPage from './pages/ContentWritingPage';
import TechnicalAuditPage from './pages/TechnicalAuditPage';
import BlogPage from './pages/BlogPage';
import FaqsPage from './pages/FaqsPage';
import GlossaryPage from './pages/GlossaryPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Redirect bare root to /en/ */}
        <Route path="/" element={<Navigate to="/en/" replace />} />

        {/* Language-prefixed routes */}
        <Route path="/:lang" element={<LangWrapper />}>
          <Route index element={<HomePage />} />
          <Route path="visibility" element={<VisibilityPage />} />
          <Route path="sentiment" element={<SentimentPage />} />
          <Route path="content-writing" element={<ContentWritingPage />} />
          <Route path="technical-audit" element={<TechnicalAuditPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="faqs" element={<FaqsPage />} />
          <Route path="glossary" element={<GlossaryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
