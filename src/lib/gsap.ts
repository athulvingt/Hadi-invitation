import gsapCore from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsapCore.registerPlugin(ScrollTrigger);

/** Returns true if the user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Configured GSAP instance with ScrollTrigger registered */
export const gsap = gsapCore;

export { ScrollTrigger };
