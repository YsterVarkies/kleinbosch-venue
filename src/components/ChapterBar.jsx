import { useLayoutEffect, useState } from 'react';
import { ScrollTrigger, scrollToHash } from '../lib/motion.js';
import { site } from '../data/site.js';
import { chapters } from './Hero.jsx';
import Img from './Img.jsx';

// The fixed site navigation follows the ground and ink of the chapter under it.
export default function ChapterBar() {
  const [ground, setGround] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const sections = [...document.querySelectorAll('.page [data-ground], .footer[data-ground]')];
    const syncGround = () => {
      const current = sections.find((el) => {
        const bounds = el.getBoundingClientRect();
        return bounds.top <= 28 && bounds.bottom > 28;
      });
      if (current) setGround(current.dataset.ground);
    };

    const chapters = sections.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 28px',
        end: 'bottom 28px',
        onToggle: (self) => self.isActive && setGround(el.dataset.ground)
      })
    );
    syncGround();
    window.addEventListener('pageshow', syncGround);
    return () => {
      window.removeEventListener('pageshow', syncGround);
      chapters.forEach((t) => t.kill());
    };
  }, []);

  return (
    <nav className="chapter-bar" data-on={ground} aria-label="Main navigation">
      <a
        className="chapter-brand"
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          setMenuOpen(false);
          scrollToHash('#top');
        }}
      >
        <Img name="logo" alt="Kleinbosch Venue logo" eager sizes="64px" className="chapter-logo" />
        <span className="chapter-brand-name">Kleinbosch</span>
      </a>
      <button
        className="chapter-menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="chapter-links"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className="chapter-links" id="chapter-links" data-open={menuOpen}>
        {chapters.map((chapter) => (
          <a
            key={chapter.href}
            href={chapter.href}
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              scrollToHash(chapter.href);
            }}
          >
            {chapter.label}
          </a>
        ))}
        <a
          className="chapter-cta"
          href="#visit"
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            scrollToHash('#visit');
          }}
        >
          Contact us
        </a>
      </div>
    </nav>
  );
}
