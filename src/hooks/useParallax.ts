import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {},
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const { speed = 0.3, direction = 'vertical' } = options;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const offset = (progress - 0.5) * 100 * speed;
        if (direction === 'vertical') {
          gsap.set(el, { y: offset });
        } else {
          gsap.set(el, { x: offset });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [options.speed, options.direction]);

  return ref;
}
