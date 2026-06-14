import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

export default function PageLoader(): React.JSX.Element {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const crescentRef = useRef<SVGPathElement | null>(null);
  const starRef = useRef<SVGGElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const crescent = crescentRef.current;
    const star = starRef.current;
    const text = textRef.current;
    if (!overlay || !crescent || !star || !text) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      overlay.style.display = 'none';
      return;
    }

    const crescentLength = crescent.getTotalLength();
    gsap.set(crescent, { strokeDasharray: crescentLength, strokeDashoffset: crescentLength, opacity: 1 });
    gsap.set([star, text], { opacity: 0, scale: 0.8, transformOrigin: 'center' });

    const tl = gsap.timeline({
      onComplete: () => {
        overlay.style.display = 'none';
      },
    });

    tl.to(crescent, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: 'power2.inOut',
    })
      .to(star, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' }, '-=0.2')
      .to(text, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, '-=0.1')
      .to(overlay, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, '+=0.5')
      .set(overlay, { display: 'none' });

    return (): void => {
      tl.kill();
    };
  }, []);

  // 6-pointed star (Star of Islamic art) centered at (138, 72), radius 7
  const starPoints = (() => {
    const cx = 138, cy = 72, r = 6, points = 6;
    return Array.from({ length: points }, (_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(' ');
  })();

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: '#060F07' }}
      role="status"
      aria-label="Loading wedding website"
    >
      <svg
        viewBox="0 0 200 200"
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer ring */}
        <circle
          cx="100" cy="100" r="90"
          fill="none"
          stroke="var(--color-gold-light)"
          strokeWidth="0.8"
        />
        {/* Inner ring */}
        <circle
          cx="100" cy="100" r="80"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="0.4"
          strokeDasharray="4 6"
        />

        {/*
          Crescent: two arcs — outer circle minus inner offset circle.
          Drawn as a single path for stroke-dash animation.
          Center 100,100. Outer r=46, inner r=38 offset left by 14.
        */}
        <path
          ref={crescentRef}
          d="
            M 100 54
            A 46 46 0 1 1 100 146
            A 46 46 0 0 1 100 54
            Z
            M 86 58
            A 40 40 0 1 0 86 142
            A 40 40 0 0 1 86 58
            Z
          "
          fill="var(--color-gold)"
          stroke="none"
          fillRule="evenodd"
          style={{ opacity: 0 }}
        />

        {/* 6-pointed star — top right of crescent */}
        <g ref={starRef} style={{ opacity: 0 }}>
          <polygon
            points={starPoints}
            fill="var(--color-gold)"
          />
          {/* Second triangle rotated 60° to complete the Star of David / Islamic hexagram */}
          <polygon
            points={(() => {
              const cx = 138, cy = 72, r = 6, points = 6;
              return Array.from({ length: points }, (_, i) => {
                const angle = (Math.PI / 3) * i - Math.PI / 2 + Math.PI / 3;
                return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
              }).join(' ');
            })()}
            fill="var(--color-gold)"
            opacity="0.6"
          />
        </g>

        {/* Name text */}
        <text
          ref={textRef}
          x="100"
          y="174"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="11"
          fill="var(--color-gold)"
          style={{ opacity: 0 }}
        >
          Hadi &amp; Muhsina
        </text>

        {/* Bottom diamond accent */}
        <polygon points="100,186 102.5,190 100,194 97.5,190" fill="var(--color-gold)" opacity="0.5" />
        {/* Top diamond accent */}
        <polygon points="100,6 102.5,10 100,14 97.5,10" fill="var(--color-gold)" opacity="0.5" />
      </svg>
    </div>
  );
}
