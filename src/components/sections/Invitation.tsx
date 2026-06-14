import { useScrollReveal } from '../../hooks/useScrollReveal';
import { invitation } from '../../content';

export default function Invitation(): React.JSX.Element {
  const sectionRef = useScrollReveal<HTMLElement>({ y: 40, stagger: 0.18, threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="invitation"
      className="py-24 px-6"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
      aria-labelledby="invitation-heading"
    >
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-7">

        {/* Arabic label */}
        <div data-reveal className="flex flex-col items-center gap-1">
          <p
            style={{
              fontFamily: 'var(--font-arabic)',
              fontSize: '1.4rem',
              color: 'var(--color-gold)',
              opacity: 0.75,
              direction: 'rtl',
              letterSpacing: '0.02em',
            }}
          >
            {invitation.arabicLabel}
          </p>
          <p
            className="uppercase tracking-[0.32em] text-xs"
            style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}
          >
            Invitation
          </p>
        </div>

        {/* Heading */}
        <h2
          data-reveal
          id="invitation-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            color: 'var(--color-gold-light)',
            fontWeight: 400,
            lineHeight: 1.15,
          }}
        >
          {invitation.heading}
        </h2>

        {/* Gold rule */}
        <div
          data-reveal
          style={{ width: '3rem', height: '1px', backgroundColor: 'var(--color-gold)', opacity: 0.6 }}
        />

        {/* Poem lines — centred on md+, left-aligned on mobile for readability */}
        <div data-reveal className="flex flex-col gap-2 text-center w-full px-4 md:px-0">
          {invitation.poem.map((line, i) => (
            <p
              key={i}
              className="italic leading-loose"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 2.4vw, 1.25rem)',
                color: 'var(--color-gold-light)',
                opacity: i === 0 ? 1 : 0.75,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Closing */}
        <p
          data-reveal
          className="uppercase tracking-[0.25em] text-xs mt-2"
          style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}
        >
          {invitation.closing}
        </p>

      </div>
    </section>
  );
}
