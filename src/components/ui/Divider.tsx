import { motion, useReducedMotion } from 'framer-motion';

interface DividerProps {
  className?: string;
}

export default function Divider({ className = '' }: DividerProps): React.JSX.Element {
  const reducedMotion = useReducedMotion();

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: reducedMotion ? 0 : 1.4, ease: 'easeInOut' },
    },
  };

  const starVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: reducedMotion ? 0 : 0.5, duration: reducedMotion ? 0 : 0.6, ease: 'backOut' },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: reducedMotion ? 0 : 1.0, duration: reducedMotion ? 0 : 0.3 },
    },
  };

  // 8-pointed star: two overlapping squares rotated 45° relative to each other
  // Built from a single polygon path centered at (180, 20), radius 12 outer, 5 inner
  const starPath = (() => {
    const cx = 180, cy = 20, outer = 11, inner = 4.5, points = 8;
    const coords: string[] = [];
    for (let i = 0; i < points * 2; i++) {
      const angle = (Math.PI / points) * i - Math.PI / 2;
      const r = i % 2 === 0 ? outer : inner;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      coords.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(3)},${y.toFixed(3)}`);
    }
    return coords.join(' ') + ' Z';
  })();

  return (
    <div
      className={['flex items-center justify-center py-5 md:py-10 px-4', className].join(' ')}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 360 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-sm h-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Left line */}
        <motion.line
          x1="0" y1="20" x2="155" y2="20"
          stroke="var(--color-gold)"
          strokeWidth="0.8"
          variants={lineVariants}
        />

        {/* Small diamond — left */}
        <motion.polygon
          points="163,20 166,17 169,20 166,23"
          fill="var(--color-gold)"
          opacity="0.7"
          variants={starVariants}
        />

        {/* 8-pointed star — center */}
        <motion.path
          d={starPath}
          fill="var(--color-gold)"
          opacity="0.9"
          style={{ originX: '180px', originY: '20px' }}
          variants={starVariants}
        />

        {/* Center dot */}
        <motion.circle
          cx="180" cy="20" r="2"
          fill="var(--color-bg)"
          variants={dotVariants}
        />

        {/* Small diamond — right */}
        <motion.polygon
          points="191,20 194,17 197,20 194,23"
          fill="var(--color-gold)"
          opacity="0.7"
          variants={starVariants}
        />

        {/* Right line */}
        <motion.line
          x1="205" y1="20" x2="360" y2="20"
          stroke="var(--color-gold)"
          strokeWidth="0.8"
          variants={lineVariants}
        />
      </motion.svg>
    </div>
  );
}
