import { usePetalFall } from '../../hooks/usePetalFall';
import { couple, footer } from '../../content';

const petalCount = Number(import.meta.env['VITE_PETALS'] ?? 30);

export default function Footer(): React.JSX.Element {
  const canvasRef = usePetalFall(petalCount);

  return (
    <footer
      className="relative py-8 px-6 overflow-hidden text-center"
      style={{ backgroundColor: 'var(--color-accent)' }}
      aria-label="Site footer"
    >
      {/* Petal fall canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* Arabic blessing */}
        <p
          className="leading-none"
          style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
            color: 'var(--color-gold)',
            opacity: 0.8,
            direction: 'rtl',
            letterSpacing: '0.02em',
          }}
        >
          بَارَكَ اللهُ لَكُماَ وَبَارَكَ عَلَيْكُماَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>

        {/* SVG Monogram */}
        <svg
          viewBox="0 0 160 60"
          className="w-28 h-10"
          aria-label={couple.monogram}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="80"
            y="46"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="46"
            fontWeight="400"
            letterSpacing="4"
            fill="var(--color-gold)"
          >
            H &amp; M
          </text>
        </svg>

        {/* Tagline */}
        <p
          className="text-sm tracking-widest uppercase"
          style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-body)' }}
        >
          {footer.tagline}
        </p>

        {/* Hashtag */}
        <p
          className="text-lg"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold)', fontStyle: 'italic' }}
        >
          {footer.hashtag}
        </p>


        {/* Copyright */}
        <p
          className="text-xs tracking-wider"
          style={{ color: 'var(--color-gold-light)', opacity: 0.65, fontFamily: 'var(--font-body)' }}
        >
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
