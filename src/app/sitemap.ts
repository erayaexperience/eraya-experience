import type { MetadataRoute } from 'next';
import { aboutContent } from '@/constants/about';
import { creators } from '@/constants/creators';
import { events } from '@/constants/events';
import { services } from '@/constants/services';
import { SITE_URL } from '@/lib/site';

const absolute = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const images = [
    '/images/hero-desktop-frame.webp',
    aboutContent.founder.image,
    aboutContent.coFounder.image,
    ...services.map((service) => service.image),
    ...events.map((event) => event.images[0].src),
    ...creators.map((creator) => creator.image),
  ];

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: [...new Set(images)].map(absolute),
    },
  ];
}
