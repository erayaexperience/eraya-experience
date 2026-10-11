const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

export type Service = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  imagePosition?: string;
};

export const services: Service[] = [
  {
    title: 'Graphic & Logo Design',
    eyebrow: 'Identity that sticks',
    description: 'Logos, posters and campaign graphics with a point of view, recognised in a second and remembered long after.',
    image: '/images/graphics/lilliput-saturday-blockbuster-tv.jpg',
  },
  {
    title: 'Photoshoots',
    eyebrow: 'Content worth stopping for',
    description: 'Food, drinks, fashion and lifestyle shoots, styled and lit so your product is the hero of every frame.',
    image: '/images/services/photoshoots.jpg',
  },
  {
    title: 'Social Media Marketing',
    eyebrow: 'Feeds with a strategy',
    description: 'Pages planned around your audience and your goals. Consistent, aesthetic and always on brand.',
    image: '/images/graphics/sukkha-instagram-feed.jpg',
    imagePosition: 'center 30%',
  },
  {
    title: 'Meta & Google Ads',
    eyebrow: 'Paid media, measured',
    description: 'Ads built around one number: your return. Every rupee tracked, every campaign sharpened.',
    image: pexels(6569661),
  },
  {
    title: 'Influencer Marketing',
    eyebrow: 'Voices people trust',
    description: 'The right creators for your brand, matched to your audience so people talk, share and show up.',
    image: '/images/services/influencer-marketing.jpg',
    imagePosition: 'center 35%',
  },
  {
    title: 'Brand Kits',
    eyebrow: 'Everything, on brand',
    description: 'Logo, colours, type and branded essentials in one complete kit, so you look the same everywhere you show up.',
    image: '/images/services/brand-kits.jpg',
    imagePosition: '55% center',
  },
  {
    title: 'Website & SEO',
    eyebrow: 'Found, then chosen',
    description: 'Fast, beautiful websites built to rank on Google and turn visitors into customers.',
    image: pexels(40057911),
    imagePosition: '60% center',
  },
];
