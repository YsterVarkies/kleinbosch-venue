import { useLayoutEffect, useRef } from 'react';
import Img from './Img.jsx';
import { gsap, reduced } from '../lib/motion.js';

// A pinned stage: three venue photographs rise at their own speeds as you scroll.
export default function Gallery() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (reduced()) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 }
      });
      tl.fromTo('.tri-centre', { yPercent: 38, scale: 0.82 }, { yPercent: 0, scale: 1, ease: 'none' }, 0)
        .fromTo('.tri-left', { yPercent: 60 }, { yPercent: 8, ease: 'none' }, 0)
        .fromTo('.tri-right', { yPercent: 75 }, { yPercent: 8, ease: 'none' }, 0);
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="gallery" ref={ref} aria-labelledby="gallery-heading" data-ground="deep" data-rise-group>
      <div className="gallery-stage">
        <div className="gallery-head">
          <h2 id="gallery-heading" data-rise>From the grove to the table</h2>
          <p data-rise>
            Hold your ceremony beneath the poplars, then gather inside for dinner beneath the timber trusses.
            Kleinbosch brings the grove and the hall into one celebration.
          </p>
        </div>
        <div className="triptych">
          <Img
            className="tri tri-left"
            name="venue-ceremony-trees"
            alt="Wicker chairs and a ceremony aisle beneath the poplars at Kleinbosch"
            sizes="30vw"
          />
          <Img
            className="tri tri-centre"
            name="venue-visit"
            alt="The Kleinbosch hall arranged with lounge seating and high tables beneath its timber trusses"
            sizes="(min-width: 900px) 50vw, 90vw"
          />
          <Img className="tri tri-right" name="venue-window-view" alt="A view through the Kleinbosch windows to a table set inside the hall" sizes="30vw" />
        </div>
      </div>
    </section>
  );
}
