import { useEffect, useRef } from 'react';
import { gsap, reduced } from '../../lib/motion.js';

// React Bits' Magnet: the wrapped control leans toward the pointer when it comes close.
export default function Magnet({ children, strength = 0.28, padding = 60, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (reduced() || window.matchMedia('(hover: none)').matches) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const near = Math.abs(dx) < r.width / 2 + padding && Math.abs(dy) < r.height / 2 + padding;
      xTo(near ? dx * strength : 0);
      yTo(near ? dy * strength : 0);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [strength, padding]);

  return (
    <span ref={ref} className={`magnet ${className}`}>
      {children}
    </span>
  );
}
