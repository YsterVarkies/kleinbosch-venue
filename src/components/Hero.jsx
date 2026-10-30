import SplitText from './reactbits/SplitText.jsx';
import Img from './Img.jsx';
import { site } from '../data/site.js';

export const chapters = [
  { href: '#grove', label: 'The grove' },
  { href: '#venue', label: 'The venue' },
  { href: '#occasions', label: 'Occasions' },
  { href: '#questions', label: 'Questions' },
  { href: '#visit', label: 'Visit' }
];

export default function Hero() {
  return (
    <header className="hero" id="top" data-ground="hero">
      <div className="hero-panel">
        <div className="hero-view">
          <Img
            name="venue-visit"
            alt="The Kleinbosch hall arranged with lounge seating and high tables beneath timber trusses and chandeliers"
            eager
            className="hero-photo"
            sizes="(min-width: 900px) 90vw, 100vw"
          />
        </div>

        <p className="hero-place">{site.town}, {site.region}</p>

        <div className="hero-title">
          <h1>
            <SplitText text="Kleinbosch" className="line" />
            <SplitText text="Venue" className="line" delay={0.2} />
          </h1>
          <p className="hero-lead">{site.summary}</p>
        </div>

      </div>
    </header>
  );
}
