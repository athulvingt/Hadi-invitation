import { useRef, useCallback, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[var(--color-accent)] text-[var(--color-gold-light)] border border-[var(--color-accent)] hover:bg-[var(--color-gold)] hover:text-[var(--color-text)] hover:border-[var(--color-gold)]',
  secondary:
    'bg-transparent text-[var(--color-accent)] border border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-gold-light)]',
  ghost:
    'bg-transparent text-[var(--color-gold)] border border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-text)]',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm tracking-widest',
  md: 'px-7 py-3 text-base tracking-widest',
  lg: 'px-10 py-4 text-lg tracking-widest',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps): React.JSX.Element {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>): void => {
    const btn = btnRef.current;
    if (!btn) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  }, []);

  const handleMouseLeave = useCallback((): void => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0, 0)';
  }, []);

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.25s cubic-bezier(.23,1,.32,1), background 0.3s, color 0.3s, border-color 0.3s' }}
      className={[
        'relative inline-flex items-center justify-center font-body uppercase rounded-none cursor-pointer select-none',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
