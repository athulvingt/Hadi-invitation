import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useParallax } from '../../hooks/useParallax';
import { story } from '../../content';

export default function Story(): React.JSX.Element {
  const sectionRef = useScrollReveal<HTMLElement>({ y: 50, stagger: 0.15 });
  const parallaxRef = useParallax<HTMLDivElement>({ speed: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="story"
      className="bg-arabesque py-24 px-6 max-w-6xl mx-auto"
      aria-labelledby="story-heading"
    >
      <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
        {/* Left: heading + Quranic verse pull-quote */}
        <div data-reveal className="flex flex-col gap-8">
          <div>
            {/* Arabic section label */}
            <p
              className="mb-1 leading-none"
              style={{
                fontFamily: 'var(--font-arabic)',
                fontSize: '1.1rem',
                color: 'var(--color-gold)',
                opacity: 0.75,
                direction: 'rtl',
              }}
            >
              {story.arabicLabel}
            </p>
            <p
              className="uppercase tracking-[0.3em] text-xs mb-3"
              style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}
            >
              Our Story
            </p>
            <h2
              id="story-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                color: 'var(--color-accent)',
                fontWeight: 400,
                lineHeight: 1.15,
              }}
            >
              {story.heading}
            </h2>
          </div>

          {/* Quranic verse pull-quote */}
          <div
            ref={parallaxRef}
            className="relative pl-6 py-5 flex flex-col gap-3"
            style={{ borderLeft: '3px solid var(--color-gold)' }}
          >
            <p
              className="leading-[2] text-right"
              style={{
                fontFamily: 'var(--font-arabic)',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: 'var(--color-accent)',
                direction: 'rtl',
              }}
            >
              {story.verseArabic}
            </p>
            <p
              className="text-base italic leading-relaxed"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)', opacity: 0.85 }}
            >
              "{story.verseTranslation}"
            </p>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}
            >
              {story.verseSource}
            </p>
          </div>
        </div>

        {/* Right: story paragraphs */}
        <div data-reveal className="flex flex-col gap-6">
          {story.paragraphs.map((para, i) => (
            <p
              key={i}
              className={[
                'text-base md:text-[1.05rem] leading-[1.85]',
                i === 0 ? 'drop-cap' : '',
              ].join(' ')}
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
