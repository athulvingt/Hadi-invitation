import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import { ThreeScene } from '../../lib/three-scene';
import { couple, event } from '../../content';

export default function Hero(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const crestRef = useRef<SVGSVGElement | null>(null);
  const bismillahRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<ThreeScene | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      sceneRef.current = new ThreeScene();
      sceneRef.current.init(canvas);
    }
    return () => sceneRef.current?.destroy();
  }, []);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const crest = crestRef.current;
    const bismillah = bismillahRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!title || !subtitle) return;

    if (reduced) {
      gsap.set([crest, bismillah, title, subtitle], { opacity: 1, y: 0, filter: 'none' });
      title.querySelectorAll('[data-char]').forEach((el) => ((el as HTMLElement).style.opacity = '1'));
      return;
    }

    // No delay — loader already handled the wait
    const tl = gsap.timeline({ delay: 0 });

    if (crest) {
      tl.fromTo(crest,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' },
      );
    }

    if (bismillah) {
      tl.fromTo(bismillah,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
        '-=0.4',
      );
    }

    tl.fromTo(
      title.querySelectorAll('[data-char]'),
      { opacity: 0, y: 36, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.035, ease: 'power3.out' },
      '-=0.3',
    );

    tl.fromTo(
      subtitle.querySelectorAll('[data-line]'),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power2.out' },
      '-=0.25',
    );

    return () => { tl.kill(); };
  }, []);

  const scrollToContent = (): void => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const groomParts = couple.groom.split(' ');
  const brideParts = couple.bride.split(' ');

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #060F07 0%, #0D1F10 40%, #152B1A 70%, #0A1A0D 100%)' }}
      aria-label="Wedding invitation hero"
    >
      {/* Three.js particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.5 }}
        aria-hidden="true"
      />

      {/* Radial warm centre glow — gives depth without washing out text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 42%, rgba(212,190,138,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(6,15,7,0.7) 0%, transparent 40%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 md:px-8 flex flex-col items-center w-full max-w-3xl">

        {/* Monogram crest */}
        <svg
          ref={crestRef}
          viewBox="0 0 200 120"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ width: 'clamp(56px, 16vw, 200px)', opacity: 0, marginBottom: 'clamp(0.3rem, 2vw, 1.5rem)' }}
        >
          {/* Outer ellipse ring */}
          <ellipse cx="100" cy="60" rx="96" ry="56" fill="none" stroke="var(--color-gold)" strokeWidth="0.6" opacity="0.5" />
          {/* Inner ellipse ring */}
          <ellipse cx="100" cy="60" rx="88" ry="49" fill="none" stroke="var(--color-gold)" strokeWidth="0.3" opacity="0.3" />
          {/* Left flourish line */}
          <line x1="4" y1="60" x2="30" y2="60" stroke="var(--color-gold)" strokeWidth="0.6" opacity="0.6" />
          {/* Right flourish line */}
          <line x1="170" y1="60" x2="196" y2="60" stroke="var(--color-gold)" strokeWidth="0.6" opacity="0.6" />
          {/* Left diamond */}
          <polygon points="30,60 34,56 38,60 34,64" fill="var(--color-gold)" opacity="0.7" />
          {/* Right diamond */}
          <polygon points="162,60 166,56 170,60 166,64" fill="var(--color-gold)" opacity="0.7" />
          {/* Monogram */}
          <text
            x="100" y="70"
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontSize="38"
            fontWeight="300"
            fill="var(--color-gold-light)"
            letterSpacing="6"
          >
            {couple.monogram}
          </text>
          {/* Top ornament */}
          <polygon points="100,4 102,8 100,12 98,8" fill="var(--color-gold)" opacity="0.55" />
          {/* Bottom ornament */}
          <polygon points="100,108 102,112 100,116 98,112" fill="var(--color-gold)" opacity="0.55" />
        </svg>

        {/* Bismillah */}
        <p
          ref={bismillahRef}
          style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: 'clamp(0.7rem, 3.2vw, 1.9rem)',
            color: 'var(--color-gold)',
            opacity: 0,
            direction: 'rtl',
            letterSpacing: '0.04em',
            lineHeight: 1.6,
            marginBottom: 'clamp(0.35rem, 2.5vw, 1.75rem)',
          }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        {/* Names */}
        <h1
          ref={titleRef}
          className="flex flex-col items-center"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1rem, 8vw, 6.5rem)',
            color: 'var(--color-gold-light)',
            fontWeight: 300,
            letterSpacing: '0.03em',
            lineHeight: 1.05,
            marginBottom: 'clamp(0.4rem, 3vw, 2.25rem)',
          }}
        >
          <span className="block">
            {groomParts.map((word, wi) => (
              <span key={wi} className="inline-block mr-[0.22em] last:mr-0">
                {word.split('').map((char, ci) => (
                  <span key={ci} data-char className="inline-block" style={{ opacity: 0 }}>{char}</span>
                ))}
              </span>
            ))}
          </span>

          {/* Ampersand — same font, smaller, gold */}
          <span
            data-char
            className="inline-block"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.52em',
              fontStyle: 'italic',
              color: 'var(--color-gold)',
              opacity: 0,
              lineHeight: 1.4,
              letterSpacing: '0.01em',
            }}
            aria-hidden="true"
          >
            &amp;
          </span>

          <span className="block">
            {brideParts.map((word, wi) => (
              <span key={wi} className="inline-block mr-[0.22em] last:mr-0">
                {word.split('').map((char, ci) => (
                  <span key={ci} data-char className="inline-block" style={{ opacity: 0 }}>{char}</span>
                ))}
              </span>
            ))}
          </span>
        </h1>

        {/* Date / Venue / Family */}
        <div ref={subtitleRef} className="flex flex-col items-center w-full" style={{ gap: 'clamp(0.3rem, 2.5vw, 1.5rem)' }}>

          {/* Ruled date line */}
          <div data-line className="flex items-center gap-4 w-full max-w-xs" style={{ opacity: 0 }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,190,138,0.5))' }} />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.6rem, 1.4vw, 0.7rem)',
                color: 'var(--color-gold)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {event.date}
            </p>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,190,138,0.5))' }} />
          </div>

          {/* Venue */}
          <div data-line style={{ opacity: 0 }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.6rem, 1.4vw, 0.7rem)',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              {event.venue}&ensp;·&ensp;{event.location}
            </p>
          </div>

          {/* Family columns */}
          <div
            data-line
            className="mt-2 w-full max-w-md grid grid-cols-2"
            style={{
              opacity: 0,
              borderTop: '1px solid var(--color-border)',
              paddingTop: 'clamp(0.4rem, 2vw, 1.25rem)',
            }}
          >
            <div
              className="flex flex-col items-center gap-1 px-3 sm:px-6"
              style={{ borderRight: '1px solid var(--color-border)' }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'var(--color-gold)', opacity: 0.55, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                {couple.groomFamily.label}
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.65rem, 3.5vw, 1.25rem)', color: 'var(--color-gold-light)', fontWeight: 400, lineHeight: 1.2, textAlign: 'center' }}>
                {couple.groomFamily.name}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6rem, 1.8vw, 0.7rem)', color: 'var(--color-text-muted)', letterSpacing: '0.03em', textAlign: 'center' }}>
                {couple.groomFamily.parents}
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 px-3 sm:px-6">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'var(--color-gold)', opacity: 0.55, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                {couple.brideFamily.label}
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.65rem, 3.5vw, 1.25rem)', color: 'var(--color-gold-light)', fontWeight: 400, lineHeight: 1.2, textAlign: 'center' }}>
                {couple.brideFamily.name}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.6rem, 1.8vw, 0.7rem)', color: 'var(--color-text-muted)', letterSpacing: '0.03em', textAlign: 'center' }}>
                {couple.brideFamily.parents}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div data-line className="flex flex-col items-center gap-4 mt-4" style={{ opacity: 0 }}>
            <button
              onClick={scrollToContent}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.55rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-bg)',
                backgroundColor: 'var(--color-gold)',
                border: '1px solid var(--color-gold)',
                padding: '0.4rem 0.9rem',
                cursor: 'pointer',
                borderRadius: '0',
                transition: 'background-color 0.35s, color 0.35s, border-color 0.35s',
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget;
                b.style.backgroundColor = 'transparent';
                b.style.color = 'var(--color-gold)';
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget;
                b.style.backgroundColor = 'var(--color-gold)';
                b.style.color = 'var(--color-bg)';
              }}
            >
              Celebrate With Us
            </button>

            {/* Cascading scroll chevrons */}
            <div className="flex flex-col items-center" style={{ gap: '0px' }}>
              {[0, 1, 2].map((i) => (
                <ChevronDown
                  key={i}
                  size={14}
                  strokeWidth={1.2}
                  style={{
                    color: 'var(--color-gold)',
                    opacity: 1 - i * 0.3,
                    animation: prefersReducedMotion() ? 'none' : `scrollPulse 1.6s ease-in-out ${i * 0.18}s infinite`,
                    marginTop: i === 0 ? '0' : '-5px',
                    display: 'block',
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
