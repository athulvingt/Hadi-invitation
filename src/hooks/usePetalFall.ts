import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

const PETAL_COLORS = ['#2D5A3D', '#3a7a52', '#D4BE8A', '#EAD9B0', '#4a6741'];

function createPetal(canvasWidth: number, canvasHeight: number): Petal {
  return {
    x: Math.random() * canvasWidth,
    y: -20 - Math.random() * canvasHeight * 0.3,
    size: 6 + Math.random() * 10,
    speedY: 0.5 + Math.random() * 1.2,
    speedX: (Math.random() - 0.5) * 0.6,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.04,
    opacity: 0.4 + Math.random() * 0.5,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)] ?? '#2D5A3D',
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, petal: Petal): void {
  ctx.save();
  ctx.translate(petal.x, petal.y);
  ctx.rotate(petal.rotation);
  ctx.globalAlpha = petal.opacity;
  ctx.fillStyle = petal.color;
  ctx.beginPath();
  ctx.ellipse(0, 0, petal.size * 0.4, petal.size, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function usePetalFall(count = 30): React.RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;

    const resize = (): void => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const petals: Petal[] = Array.from({ length: count }, () =>
      createPetal(canvas.width, canvas.height),
    );

    const loop = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const petal of petals) {
        petal.y += petal.speedY;
        petal.x += petal.speedX + Math.sin(petal.y * 0.02) * 0.3;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > canvas.height + 20) {
          Object.assign(petal, createPetal(canvas.width, canvas.height));
          petal.y = -20;
        }

        drawPetal(ctx, petal);
      }
      animFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return canvasRef;
}
