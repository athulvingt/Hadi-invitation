import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import confetti from 'canvas-confetti';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Button from '../ui/Button';
import { rsvp } from '../../content';
import type { RSVPFormData } from '../../types';

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  attendance: z.enum(['yes', 'no'], { required_error: 'Please select your attendance' }),
  guests: z.number({ coerce: true }).int().min(0).max(10),
  dietary: z.string().max(200),
  message: z.string().max(500),
});

function fireConfetti(): void {
  void confetti({ particleCount: 120, spread: 80, colors: ['#D4BE8A', '#2D5A3D', '#EAD9B0'], origin: { y: 0.6 } });
}

const fieldClass =
  'w-full px-4 py-3 rounded-sm border text-sm outline-none transition-colors duration-200 focus:border-[var(--color-accent)]';
const fieldStyle = {
  backgroundColor: 'var(--color-bg)',
  borderColor: 'var(--color-gold)',
  color: 'var(--color-text)',
  fontFamily: 'var(--font-body)',
};

export default function RSVP(): React.JSX.Element {
  const sectionRef = useScrollReveal<HTMLElement>({ y: 40 });
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RSVPFormData>({
    resolver: zodResolver(schema),
    defaultValues: { guests: 1, dietary: '', message: '' },
  });

  const attendance = watch('attendance');

  const onSubmit = async (data: RSVPFormData): Promise<void> => {
    const endpoint = import.meta.env['VITE_FORM_ENDPOINT'] as string | undefined;
    if (endpoint) {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
    }
    setSubmitted(true);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fireConfetti();
    }
  };

  const labelClass = 'block text-xs uppercase tracking-widest mb-1';
  const labelStyle = { color: 'var(--color-accent)', fontFamily: 'var(--font-body)' };
  const errorStyle = { color: '#b94040', fontSize: '0.75rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)' };

  return (
    <section ref={sectionRef} id="rsvp" className="py-20 px-6" style={{ backgroundColor: 'var(--color-surface)' }} aria-labelledby="rsvp-heading">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-xs mb-3" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}>
            Will you join us?
          </p>
          <h2 id="rsvp-heading" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.2rem)', color: 'var(--color-accent)', fontWeight: 400 }}>
            {rsvp.heading}
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-body)' }}>
            {rsvp.subheading}
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-16 flex flex-col items-center gap-4">
            <span style={{ fontSize: '3rem' }}>🌿</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-accent)', fontWeight: 400 }}>
              {rsvp.successHeading}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}>
              {rsvp.successMessage}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
            {/* Name */}
            <div>
              <label htmlFor="rsvp-name" className={labelClass} style={labelStyle}>Full Name</label>
              <input id="rsvp-name" type="text" autoComplete="name" className={fieldClass} style={fieldStyle} {...register('name')} />
              {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="rsvp-email" className={labelClass} style={labelStyle}>Email Address</label>
              <input id="rsvp-email" type="email" autoComplete="email" className={fieldClass} style={fieldStyle} {...register('email')} />
              {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
            </div>

            {/* Attendance */}
            <fieldset>
              <legend className={labelClass} style={labelStyle}>Will you attend?</legend>
              <div className="flex gap-6 mt-2">
                {(['yes', 'no'] as const).map((val) => (
                  <label key={val} className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}>
                    <input type="radio" value={val} className="accent-[var(--color-accent)]" {...register('attendance')} />
                    {val === 'yes' ? 'Joyfully accepts' : 'Regretfully declines'}
                  </label>
                ))}
              </div>
              {errors.attendance && <p style={errorStyle}>{errors.attendance.message}</p>}
            </fieldset>

            {/* Guests — only if attending */}
            {attendance === 'yes' && (
              <div>
                <label htmlFor="rsvp-guests" className={labelClass} style={labelStyle}>Number of Guests (including yourself)</label>
                <input id="rsvp-guests" type="number" min={1} max={10} className={fieldClass} style={fieldStyle} {...register('guests', { valueAsNumber: true })} />
                {errors.guests && <p style={errorStyle}>{errors.guests.message}</p>}
              </div>
            )}

            {/* Dietary */}
            <div>
              <label htmlFor="rsvp-dietary" className={labelClass} style={labelStyle}>Dietary Restrictions (optional)</label>
              <input id="rsvp-dietary" type="text" className={fieldClass} style={fieldStyle} placeholder="e.g. Vegetarian, Gluten-free" {...register('dietary')} />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="rsvp-message" className={labelClass} style={labelStyle}>Message for the Couple (optional)</label>
              <textarea id="rsvp-message" rows={4} className={fieldClass} style={{ ...fieldStyle, resize: 'vertical' }} {...register('message')} />
            </div>

            <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full mt-2">
              {isSubmitting ? 'Sending…' : 'Send RSVP'}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
