import { createRoot } from 'react-dom/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LangWrapper } from '../src/contexts/LangContext';
import Navbar from '../src/components/Navbar';
import { LandingTop } from '../src/components/LandingPage';
import '../src/index.css';

/* Entry for the single-file export of the landing page down to the end of
   "How it works" - see scripts/build-standalone.mjs, which builds this and
   then inlines the script, the styles and every asset into one .html.

   Nothing is reimplemented here: it mounts the real Navbar and the real
   LandingTop (hero + How it works) inside the real language provider, so
   the export cannot drift from the live page.

   MemoryRouter stands in for the app's router - the Navbar's <Link>s and
   LangWrapper's useParams need one, and the export has no URL of its own. */
createRoot(document.getElementById('root')).render(
  <MemoryRouter initialEntries={['/en/']}>
    <Routes>
      <Route path="/:lang" element={<LangWrapper />}>
        <Route
          index
          element={(
            <>
              <Navbar />
              <main>
                <LandingTop />
              </main>
            </>
          )}
        />
      </Route>
    </Routes>
  </MemoryRouter>,
);
