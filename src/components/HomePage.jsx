import Navbar from './Navbar';
import Footer from './Footer';
import LandingPage from './LandingPage';
import Seo from './Seo';

export default function HomePage() {
  return (
    <>
      <Seo page="home" />
      <Navbar />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </>
  );
}
