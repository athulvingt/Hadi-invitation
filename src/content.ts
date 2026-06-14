import type { GalleryItem, DetailCard, SocialLink, EventFunction } from './types';

export const couple = {
  bride: 'Muhsina Zainab',
  groom: 'Hadi Fayiz',
  names: 'Hadi Fayiz & Muhsina Zainab',
  monogram: 'H & M',
  groomFamily: {
    label: 'The Groom',
    name: 'Hadi Fayiz',
    parents: 'S/o Abdul Jabbar & Saifunnisa',
  },
  brideFamily: {
    label: 'The Bride',
    name: 'Muhsina Zainab',
    parents: 'D/o Ibrahim & Saleena',
  },
} as const;

export const event = {
  date: 'July 30, 2026',
  dateISO: '2026-07-30',
  time: '5:00 PM onwards',
  venue: 'Paramount Auditorium',
  location: 'Kodiyathur, Kozhikode',
  fullVenue: 'Paramount Auditorium, Kozhikode',
  dressCode: '',
} as const;

export const story = {
  heading: 'Written in His Plan',
  arabicLabel: 'قِصَّتُنَا',
  verseArabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا',
  verseTranslation: 'And of His signs is that He created for you from yourselves mates, that you may find tranquillity in them.',
  verseSource: '— Surah Ar-Rum, 30:21',
  paragraphs: [
    'What Allah wills, comes to pass — and in His infinite wisdom, He brought Hadi and Muhsina together. They first met in the autumn of 2021, introduced by mutual friends at a small gathering in Dubai. What began as a polite exchange of greetings quickly became an hours-long conversation neither wanted to end.',
    'In the months that followed, their bond deepened quietly and surely — the kind of closeness that feels less like chance and more like an answered prayer. Hadi asked for Muhsina\'s hand on a still evening by the waterfront, the Dubai skyline glittering before them, both hearts full of gratitude for a path that had led them here.',
    'Alhamdulillah — we are grateful for every person who has been a part of this journey. On December 20, 2026, surrounded by family and those we love, we begin the next chapter that Allah has written for us.',
  ],
  pullQuote: 'What Allah wills, comes to pass — and in His infinite wisdom, He brought them together.',
} as const;

export const invitation = {
  arabicLabel: 'دَعْوَة',
  heading: 'You Are Invited',
  poem: [
    'Two hearts, one promise — blessed by Allah above.',
    'With family beside us and gratitude in our souls,',
    'we humbly invite you to witness the beginning',
    'of a love written long before we knew each other\'s names.',
  ],
  closing: 'Your presence is our greatest gift.',
} as const;

export const functions: EventFunction[] = [
  {
    id: 'walima',
    title: 'Reception',
    arabicTitle: 'وَلِيمَة',
    date: 'Thursday, July 30, 2026',
    time: '5:00 PM onwards',
    venue: 'Paramount Auditorium',
    location: 'Kodiyathur, Kozhikode',
    description: 'Join us for an evening of joy, warmth, and celebration as we gather with family and friends to honour this blessed union.',
    icon: 'Star',
    mapUrl: 'https://www.google.com/maps/place/Paramount+Auditorium/@11.2743661,75.9854887,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba645b56a3625e1:0xf7ba57658aaa1399!8m2!3d11.2743661!4d75.9854887!16s%2Fg%2F11qbrbmgzt?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D',
  },
];

export const details: DetailCard[] = [
  {
    icon: 'Calendar',
    title: 'Date',
    description: 'Sunday, December 20, 2026',
  },
  {
    icon: 'Clock',
    title: 'Time',
    description: 'Ceremony begins at 6:00 PM\nReception to follow',
  },
  {
    icon: 'MapPin',
    title: 'Venue',
    description: 'The Grand Ballroom\nDubai, UAE',
  },
  {
    icon: 'Shirt',
    title: 'Dress Code',
    description: 'Black Tie\nFormal evening attire requested',
  },
];

export const gallery: GalleryItem[] = [
  { id: '1', src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80', alt: 'Hadi and Muhsina — engagement portrait', width: 800, height: 600, span: 2 },
  { id: '2', src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80', alt: 'Romantic portrait of the couple', width: 600, height: 800, span: 1 },
  { id: '3', src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80', alt: 'Intertwined hands with engagement rings by the waterfront', width: 600, height: 400, span: 1 },
  { id: '4', src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80', alt: 'Couple silhouetted at golden hour', width: 600, height: 400, span: 1 },
  { id: '5', src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80', alt: 'Laughing together in the garden', width: 800, height: 600, span: 2 },
  { id: '6', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80', alt: 'Elegant close-up engagement portrait', width: 600, height: 800, span: 1 },
];

export const socialLinks: SocialLink[] = [
  {
    href: 'https://www.instagram.com/',
    label: 'Follow our journey on Instagram',
    icon: 'Instagram',
  },
  {
    href: 'https://wa.me/',
    label: 'Message us on WhatsApp',
    icon: 'MessageCircle',
  },
];

export const footer = {
  copyright: '© 2026 Hadi & Muhsina. With love.',
  hashtag: '#HadiAndMuhsina',
  tagline: 'Join us as we begin our forever.',
} as const;

export const rsvp = {
  heading: 'Kindly Reply',
  subheading: 'Please respond by November 1, 2026',
  successHeading: 'Thank You!',
  successMessage: 'We have received your RSVP and cannot wait to celebrate with you.',
} as const;
