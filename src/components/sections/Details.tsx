import { Calendar, Clock, MapPin, Shirt } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Card from '../ui/Card';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { details } from '../../content';

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Clock,
  MapPin,
  Shirt,
};

export default function Details(): React.JSX.Element {
  const sectionRef = useScrollReveal<HTMLElement>({ y: 40, stagger: 0.12 });

  return (
    <section
      ref={sectionRef}
      id="details"
      className="bg-arabesque py-20 px-6"
      style={{ backgroundColor: 'var(--color-surface)' }}
      aria-labelledby="details-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div data-reveal className="text-center mb-14">
          <p
            className="uppercase tracking-[0.3em] text-xs mb-3"
            style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}
          >
            The Celebration
          </p>
          <h2
            id="details-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: 'var(--color-gold-light)',
              fontWeight: 400,
            }}
          >
            Wedding Details
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((card) => {
            const Icon = iconMap[card.icon] ?? Calendar;
            return (
              <div key={card.icon} data-reveal>
                <Card ornate className="text-center h-full">
                  <div className="flex flex-col items-center gap-4">
                    <span
                      className="flex items-center justify-center w-12 h-12 rounded-full"
                      style={{ backgroundColor: 'var(--color-surface)' }}
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.5}
                        style={{ color: 'var(--color-gold)' }}
                        aria-hidden="true"
                      />
                    </span>
                    <h3
                      className="text-xs uppercase tracking-[0.25em]"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gold)' }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-base md:text-lg leading-snug whitespace-pre-line"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold-light)', fontWeight: 400 }}
                    >
                      {card.description}
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
