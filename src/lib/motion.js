import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;

// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in step with it.
export function startSmoothScroll() {
  if (reduced()) return () => {};
  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    // If something else moved the page (find-in-page, a jump link, assistive tech) and a wheel
    // event arrives before Lenis has heard about it, start from where the page really is
    // instead of springing back to the old position.
    virtualScroll: () => {
      if (!lenis.isScrolling && Math.abs(lenis.actualScroll - lenis.animatedScroll) > 1) {
        lenis.animatedScroll = lenis.targetScroll = lenis.actualScroll;
      }
      return true;
    }
  });
  lenis.on('scroll', ScrollTrigger.update);
  // The same while Lenis is still easing a wheel scroll: a jump far from where it is heading
  // came from outside, so it wins.
  const onJump = () => {
    if (lenis.isScrolling === 'smooth' && Math.abs(window.scrollY - lenis.animatedScroll) > 80) {
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    }
  };
  window.addEventListener('scroll', onJump, { passive: true });
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    window.removeEventListener('scroll', onJump);
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenis = null;
  };
}

// Smoothly scrolls to an in-page anchor; falls back to the browser's jump.
export function scrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { offset: 0 });
  else target.scrollIntoView();
}

// Staggered entrance for the parts of a section: each [data-rise] child lifts in as the section
// enters. Content is visible by default, so nothing stays hidden if this never runs.
export function riseIn(scope) {
  if (reduced()) return () => {};
  const ctx = gsap.context(() => {
    gsap.utils.toArray('[data-rise-group]', scope).forEach((group) => {
      const items = group.querySelectorAll('[data-rise]');
      gsap.from(items, {
        y: 18,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: { trigger: group, start: 'top 82%', once: true }
      });
    });
  }, scope);
  return () => ctx.revert();
}

export { gsap, ScrollTrigger };
