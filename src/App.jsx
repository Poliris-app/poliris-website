import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import VisibilityPage from './pages/VisibilityPage';
import SentimentPage from './pages/SentimentPage';

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visibility" element={<VisibilityPage />} />
        <Route path="/sentiment" element={<SentimentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
