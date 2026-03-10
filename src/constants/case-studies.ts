export type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  metrics: Array<{ label: string; value: string }>;
  highlights: string[];
  services: string[];
  duration: string;
  roi: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'you-and-me-anjuna',
    title: 'You And Me Anjuna',
    subtitle: 'Restaurant social transformation',
    category: 'Social Media Marketing',
    description:
      'A nimble, stock-first content system rebuilt their feed with emotion-led storytelling and a cadence that feels effortless.',
    image:
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600',
    metrics: [
      { label: 'Follower growth', value: '+18.5%' },
      { label: 'Engagement lift', value: '+340%' },
      { label: 'Total reach', value: '10K+' },
      { label: 'Posts shipped', value: '12' },
    ],
    highlights: [
      'Optimised and set up Google Business Profile',
      'Reworked the feed with cohesive art direction',
      'Delivered 12 high-performing post templates',
      'Unlocked consistent organic follower growth',
    ],
    services: ['Social Media Management', 'Content Creation', 'GMB Optimization', 'Account Setup'],
    duration: '3 months',
    roi: 'High engagement & walk-in',
  },
  {
    id: 'snow-park-goa',
    title: 'Snow Park Goa',
    subtitle: 'Entertainment venue growth campaign',
    category: 'Influencer Marketing',
    description:
      'A blended influencer and paid push that injected energy, broadened awareness, and converted online buzz into footfall.',
    image:
      'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1600',
    metrics: [
      { label: 'Followers gained', value: '+108' },
      { label: 'Walk-in lift', value: '+20%' },
      { label: 'Campaign reach', value: '50M+' },
      { label: 'Engagement status', value: 'High' },
    ],
    highlights: [
      '20% increase in walk-in traffic from social',
      'Influencer amplification delivered 50M+ reach',
      'Optimised creative direction for shareability',
      'Strengthened top-of-mind awareness across Goa',
    ],
    services: ['Influencer Marketing', 'Social Media Marketing', 'ROI Marketing', 'Brand Awareness'],
    duration: '4 months',
    roi: 'High engagement & visibility',
  },
  {
    id: 'beach-walk-resort',
    title: 'Beach Walk Resort',
    subtitle: 'Luxury resort digital reset',
    category: 'Digital Marketing',
    description:
      'End-to-end digital transformation anchored in premium content, streamlined analytics, and a bookings-focused funnel.',
    image:
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600',
    metrics: [
      { label: 'Profile activity', value: '+26.8%' },
      { label: 'Profile visits', value: '+19.1%' },
      { label: 'Views generated', value: '80,404' },
      { label: 'External taps', value: '+1,900%' },
    ],
    highlights: [
      'Shot and edited premium resort storytelling',
      '87.5% of total views delivered via paid optimisation',
      'Sharp measurement model informed conversion tweaks',
      'Sustained uplift in on-site bookings and inquiries',
    ],
    services: ['Content Production', 'Performance Marketing', 'Paid Media', 'Analytics'],
    duration: '6 months',
    roi: 'Bookings & conversions uplift',
  },
  {
    id: 'eraya-brand-launch',
    title: 'Eraya Brand Launch',
    subtitle: 'Strategic brand identity & awareness',
    category: 'Brand Identity',
    description:
      'A comprehensive brand launch strategy that established Eraya as a premium agency in the Indian market, focusing on storytelling and visual excellence.',
    image:
      'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1600',
    metrics: [
      { label: 'Brand reach', value: '1M+' },
      { label: 'Partner leads', value: '+50' },
      { label: 'Industry mentions', value: '15' },
      { label: 'Social following', value: '5K+' },
    ],
    highlights: [
      'Developed core visual identity and brand guidelines',
      'Launched high-impact multi-channel campaign',
      'Secured partnerships with key industry players',
      'Established strong digital presence from day one',
    ],
    services: ['Brand Strategy', 'Visual Identity', 'Launch Campaign', 'PR'],
    duration: '2 months',
    roi: 'Market entry & brand authority',
  },
];
