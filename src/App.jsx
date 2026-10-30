import { useEffect, useState } from 'react';
import Hero from './components/Hero.jsx';
import Intro from './components/Intro.jsx';
import Venue from './components/Venue.jsx';
import Occasions from './components/Occasions.jsx';
import Verbs from './components/Verbs.jsx';
import Gallery from './components/Gallery.jsx';
import Questions from './components/Questions.jsx';
import Visit from './components/Visit.jsx';
import Footer from './components/Footer.jsx';
import ChapterBar from './components/ChapterBar.jsx';
import { riseIn, startSmoothScroll, ScrollTrigger } from './lib/motion.js';

export default function App() {
  // The month the visitor is planning for; starts on this month.
  const [month, setMonth] = useState(() => new Date().getMonth());

  useEffect(() => startSmoothScroll(), []);
  useEffect(() => riseIn(document.body), []);
  useEffect(() => {
    // Pictures load lazily and change the page height; re-measure triggers once they have.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <>
      <a className="skip-link" href="#grove">Skip to content</a>
      <ChapterBar />
      <div className="page">
        <Hero />
        <main>
          <Intro />
          <Venue />
          <Occasions />
          <Verbs />
          <Gallery />
          <Questions />
          <Visit month={month} />
        </main>
      </div>
      <Footer />
    </>
  );
}
