export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Column span in masonry grid (1 = normal, 2 = wide) */
  span: 1 | 2;
}

export interface RSVPFormData {
  name: string;
  email: string;
  attendance: 'yes' | 'no';
  guests: number;
  dietary: string;
  message: string;
}

export interface DetailCard {
  /** Lucide icon name */
  icon: string;
  title: string;
  description: string;
}

export interface SocialLink {
  href: string;
  label: string;
  /** Lucide icon name */
  icon: string;
}

export interface EventFunction {
  id: string;
  title: string;
  arabicTitle: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  description: string;
  icon: string;
  dressCode?: string;
  mapUrl?: string;
}
