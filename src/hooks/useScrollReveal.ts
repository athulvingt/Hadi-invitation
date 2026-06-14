import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

interface ScrollRevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  threshold?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const { y = 40, duration = 0.9, delay = 0, stagger = 0.12, threshold = 0.15 } = options;
    const children = el.querySelectorAll('[data-reveal]');
    const targets = children.length > 0 ? Array.from(children) : [el];

    gsap.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: `top ${Math.round((1 - threshold) * 100)}%`,
          toggleActions: 'play none none none',
        },
      },
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === el)
        .forEach((t) => t.kill());
    };
  }, [options.y, options.duration, options.delay, options.stagger, options.threshold]);

  return ref;
}
