import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Eraya Experience | Digital Marketing Agency',
    short_name: 'Eraya Experience',
    description: 'We craft human-first brand experiences that merge strategy, storytelling, and premium execution across Goa and Pan-India.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#09090b',
    icons: [
      {
        src: '/icon.png',
        sizes: '500x500',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '500x500',
        type: 'image/png',
      },
    ],
  };
}
