import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  ornate?: boolean;
}

export default function Card({
  children,
  className = '',
  ornate = false,
}: CardProps): React.JSX.Element {
  return (
    <div
      className={['relative p-6 md:p-8 rounded-card bg-[var(--color-surface)] transition-shadow duration-400', className].join(' ')}
      style={{ boxShadow: '0 2px 8px rgba(45,90,61,0.07)' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-gold)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(45,90,61,0.07)';
      }}
    >
      {ornate && (
        <>
          {/* Decorative corners */}
          <span
            aria-hidden="true"
            className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[var(--color-gold)] rounded-tl-sm"
          />
          <span
            aria-hidden="true"
            className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[var(--color-gold)] rounded-tr-sm"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[var(--color-gold)] rounded-bl-sm"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[var(--color-gold)] rounded-br-sm"
          />
        </>
      )}
      {children}
    </div>
  );
}
