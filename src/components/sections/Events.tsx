import { MapPin } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { functions } from '../../content';

export default function Events(): React.JSX.Element {
  const sectionRef = useScrollReveal<HTMLElement>({ y: 40, stagger: 0.14, threshold: 0.1 });
  const fn = functions[0];
  if (!fn) return <></>;

  return (
    <section
      ref={sectionRef}
      id="events"
      className="bg-arabesque py-20 px-6"
      style={{ backgroundColor: 'var(--color-surface)' }}
      aria-labelledby="events-heading"
    >
      <div className="max-w-3xl mx-auto">

        {/* Section eyebrow */}
        <div data-reveal className="text-center mb-10">
          <p
            className="uppercase tracking-[0.3em] text-xs mb-2"
            style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}
          >
            You are cordially invited to
          </p>
        </div>

        {/* Split card */}
        <div
          data-reveal
          className="relative flex flex-col md:flex-row"
          style={{
            border: '1px solid rgba(212,190,138,0.3)',
            backgroundColor: 'var(--color-bg)',
          }}
        >
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none" style={{ borderTop: '1.5px solid var(--color-gold)', borderLeft: '1.5px solid var(--color-gold)' }} />
          <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none" style={{ borderTop: '1.5px solid var(--color-gold)', borderRight: '1.5px solid var(--color-gold)' }} />
          <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none" style={{ borderBottom: '1.5px solid var(--color-gold)', borderLeft: '1.5px solid var(--color-gold)' }} />
          <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none" style={{ borderBottom: '1.5px solid var(--color-gold)', borderRight: '1.5px solid var(--color-gold)' }} />

          {/* LEFT — identity + description */}
          <div
            className="flex flex-col justify-center gap-5 p-8 md:p-10 flex-1"
            style={{ borderBottom: '1px solid rgba(212,190,138,0.2)' }}
          >
            {/* Arabic + title */}
            <div>
              <h2
                id="events-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  color: 'var(--color-gold-light)',
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                {fn.title}
              </h2>
            </div>

            {/* Thin rule */}
            <div style={{ width: '2.5rem', height: '1px', backgroundColor: 'var(--color-gold)', opacity: 0.5 }} />

            {/* Description */}
            <p
              className="italic leading-relaxed"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                color: 'var(--color-gold-light)',
                opacity: 0.8,
                maxWidth: '28rem',
              }}
            >
              {fn.description}
            </p>
          </div>

          {/* RIGHT — logistics + CTA */}
          <div
            className="flex flex-col justify-between gap-6 p-8 md:p-10 md:w-64 border-t md:border-t-0 md:border-l"
            style={{ borderColor: 'rgba(212,190,138,0.2)' }}
          >
            {/* Date */}
            <div className="flex flex-col gap-1">
              <p
                className="uppercase tracking-[0.22em] text-xs"
                style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}
              >
                Date
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  color: 'var(--color-gold-light)',
                  lineHeight: 1.35,
                }}
              >
                {fn.date}
              </p>
            </div>

            {/* Time */}
            <div className="flex flex-col gap-1">
              <p
                className="uppercase tracking-[0.22em] text-xs"
                style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}
              >
                Time
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  color: 'var(--color-gold-light)',
                }}
              >
                {fn.time}
              </p>
            </div>

            {/* Venue */}
            <div className="flex flex-col gap-1">
              <p
                className="uppercase tracking-[0.22em] text-xs"
                style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}
              >
                Venue
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  color: 'var(--color-gold-light)',
                  lineHeight: 1.35,
                }}
              >
                {fn.venue}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  color: 'var(--color-gold-light)',
                  opacity: 0.55,
                  letterSpacing: '0.04em',
                  marginTop: '0.1rem',
                }}
              >
                {fn.location}
              </p>
            </div>

            {/* Get Route */}
            {fn.mapUrl && (
              <a
                href={fn.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-auto"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-bg)',
                  backgroundColor: 'var(--color-gold)',
                  padding: '0.7rem 1.2rem',
                  textDecoration: 'none',
                  transition: 'background-color 0.25s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-gold-light)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-gold)'; }}
              >
                <MapPin size={12} strokeWidth={2} aria-hidden="true" />
                Get Route
              </a>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
