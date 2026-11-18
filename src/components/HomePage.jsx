import Navbar from './Navbar';
import Footer from './Footer';
import LandingPage from './LandingPage';
import Seo from './Seo';
import { useLang } from '../contexts/LangContext';
import { faqPageNode } from '../lib/schema';

export default function HomePage() {
  const { t, lang } = useLang();
  // Same items the home FAQ section renders (LandingPage, t('home.faq')).
  const faq = faqPageNode(lang, 'home', t('home.faq')?.items);
  return (
    <>
      <Seo page="home" schema={[faq]} />
      <Navbar />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </>
  );
}
