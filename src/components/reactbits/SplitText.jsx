import { useLayoutEffect, useRef } from 'react';
import { gsap, reduced } from '../../lib/motion.js';

// React Bits' SplitText, rebuilt on GSAP: splits a line into letters (or words) that rise into
// place one after another. Screen readers get the whole text from aria-label.
export default function SplitText({ text, by = 'chars', className = '', stagger = 0.03, delay = 0.05, duration = 0.7, onScroll = false }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.split-part'), {
        yPercent: 105,
        autoAlpha: 0,
        duration,
        ease: 'power4.out',
        stagger,
        delay,
        scrollTrigger: onScroll ? { trigger: ref.current, start: 'top 85%', once: true } : undefined
      });
    }, ref);
    return () => ctx.revert();
  }, [text, stagger, delay, duration, onScroll]);

  const parts = by === 'chars' ? [...text] : text.split(' ');
  return (
    <span ref={ref} className={`split ${className}`} aria-label={text} role="text">
      {parts.map((part, i) => (
        <span className="split-mask" key={i} aria-hidden="true">
          <span className="split-part">{part === ' ' ? ' ' : part}</span>
          {by === 'words' && i < parts.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  );
}
