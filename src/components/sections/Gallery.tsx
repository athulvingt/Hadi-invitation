import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { gallery } from '../../content';
import type { GalleryItem } from '../../types';

export default function Gallery(): React.JSX.Element {
  const sectionRef = useScrollReveal<HTMLElement>({ y: 30, stagger: 0.08 });
  const reducedMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number): void => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback((): void => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const prev = useCallback((): void => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
  }, []);

  const next = useCallback((): void => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.length));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, closeLightbox, prev, next]);

  const currentItem: GalleryItem | undefined =
    lightboxIndex !== null ? gallery[lightboxIndex] : undefined;

  return (
    <section ref={sectionRef} id="gallery" className="py-20 px-6 max-w-6xl mx-auto" aria-labelledby="gallery-heading">
      <div data-reveal className="text-center mb-12">
        <p className="uppercase tracking-[0.3em] text-xs mb-3" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}>
          Moments
        </p>
        <h2 id="gallery-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.2rem)', color: 'var(--color-accent)', fontWeight: 400 }}>
          Our Gallery
        </h2>
      </div>

      {/* Masonry grid */}
      <div
        data-reveal
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        style={{ gridAutoRows: '180px' }}
      >
        {gallery.map((item, index) => (
          <button
            key={item.id}
            onClick={() => openLightbox(index)}
            className="relative overflow-hidden rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] cursor-pointer"
            style={{ gridColumn: item.span === 2 ? 'span 2' : 'span 1', gridRow: item.span === 2 ? 'span 1' : 'span 1' }}
            aria-label={`Open photo: ${item.alt}`}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              width={item.width}
              height={item.height}
            />
            <span className="absolute inset-0 bg-[var(--color-accent)] opacity-0 hover:opacity-20 transition-opacity duration-300" aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(10,20,12,0.92)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
          >
            <motion.img
              key={currentItem.id}
              src={currentItem.src}
              alt={currentItem.alt}
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-[85vh] rounded-card object-contain shadow-2xl"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={closeLightbox} className="absolute top-4 right-4 p-2 rounded-full" style={{ color: 'var(--color-gold-light)', background: 'rgba(0,0,0,0.4)' }} aria-label="Close lightbox">
              <X size={22} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full" style={{ color: 'var(--color-gold-light)', background: 'rgba(0,0,0,0.4)' }} aria-label="Previous photo">
              <ChevronLeft size={24} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full" style={{ color: 'var(--color-gold-light)', background: 'rgba(0,0,0,0.4)' }} aria-label="Next photo">
              <ChevronRight size={24} />
            </button>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}>
              {lightboxIndex + 1} / {gallery.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
