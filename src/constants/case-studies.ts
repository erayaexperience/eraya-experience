export type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  imagePosition?: string;
  lightImage?: boolean;
  metrics: Array<{ label: string; value: string }>;
  highlights: string[];
  services: string[];
  duration?: string;
  roi?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'mission-rabies',
    title: 'Mission Rabies',
    subtitle: 'National NGO rebrand',
    category: 'Social Media Marketing',
    description:
      'A national NGO on a mission to make India Rabies Mukt. We swapped the usual NGO tone for a quirky, fun and informative voice, and proved any cause can be fun to follow.',
    image: '/images/case-studies/mission-rabies.jpg',
    imagePosition: 'center 40%',
    metrics: [
      { label: 'Total reach', value: '912.5K' },
      { label: 'Engagement', value: '11,666' },
      { label: 'Follower growth', value: '+727' },
    ],
    highlights: [
      'Repositioned a regular NGO page as quirky, fun and informative',
      '912.5K total reach',
      '11,666 engagements',
      '727 new followers',
    ],
    services: ['Social Media Management', 'Content Creation', 'Brand Repositioning'],
  },
  {
    id: 'snow-park-goa',
    title: 'Snow Park Goa',
    subtitle: 'Entertainment venue growth campaign',
    category: 'Influencer Marketing',
    description:
      'Influencer buzz and paid reach working together, turning online attention into real footfall.',
    image: '/images/case-studies/snow-park-goa.jpg',
    imagePosition: 'center 65%',
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
    subtitle: 'Luxury resort paid campaigns',
    category: 'Performance Marketing',
    description:
      'Premium resort content behind a paid funnel built for bookings, with 87.5% of all views driven by paid optimisation.',
    image:
      'https://images.pexels.com/photos/9228503/pexels-photo-9228503.jpeg?auto=compress&cs=tinysrgb&w=1600',
    metrics: [
      { label: 'Views generated', value: '80,404' },
      { label: 'External taps', value: '+1,900%' },
      { label: 'Profile activity', value: '+26.8%' },
      { label: 'Profile visits', value: '+19.1%' },
    ],
    highlights: [
      'Shot and edited premium resort storytelling',
      '87.5% of total views delivered via paid optimisation',
      'Sharp measurement model informed conversion tweaks',
      'Sustained uplift in on-site bookings and inquiries',
    ],
    services: ['Performance Marketing', 'Paid Media', 'Content Production', 'Analytics'],
    duration: '6 months',
    roi: 'Bookings & conversions uplift',
  },
  {
    id: 'sukkha',
    title: 'Sukkha',
    subtitle: 'Restaurant hiring in the off-season',
    category: 'Recruitment Ads',
    description:
      'Monsoon off-season, and the restaurant needed staff. Our recruitment ads brought in 17+ enquiries in a single day, and the hiring was a success.',
    image: '/images/case-studies/sukkha.jpg',
    imagePosition: 'center top',
    metrics: [
      { label: 'Enquiries in one day', value: '17+' },
      { label: 'Season', value: 'Monsoon off-season' },
    ],
    highlights: [
      'Recruitment ads run during the monsoon off-season',
      '17+ enquiries in a single day',
      'Successful recruitment for the restaurant',
    ],
    services: ['Performance Marketing', 'Recruitment Ads'],
  },
  {
    id: 'get-secured',
    title: 'Get Secured',
    subtitle: 'Insurance brand kit',
    category: 'Brand Design',
    description:
      'A new-age insurance company needed a brand identity, fast. We designed their logos and delivered a complete brand kit in just 3 days.',
    image: '/images/case-studies/get-secured-brand-kit.jpg',
    imagePosition: 'right top',
    lightImage: true,
    metrics: [
      { label: 'Turnaround', value: '3 days' },
      { label: 'The idea', value: 'A person held inside a lock' },
    ],
    highlights: [
      'Logo suite for a new-age insurance company',
      'Complete brand kit delivered in 3 days',
    ],
    services: ['Brand Design', 'Logo Design', 'Brand Kit'],
  },
  {
    id: 'the-adhisha',
    title: 'The Adhisha',
    subtitle: 'Yoga school, Rishikesh',
    category: 'Logo Design',
    description:
      'A logo that tells the story of Hatha yoga through the union of Shiv and Shakti, designed to resonate deeply and stay with people.',
    image: '/images/services/brand-kits.jpg',
    imagePosition: 'center top',
    lightImage: true,
    metrics: [
      { label: 'The idea', value: 'Union of Shiv & Shakti' },
      { label: 'Tells the story of', value: 'Hatha yoga' },
    ],
    highlights: ['Logo telling the story of Hatha yoga through Shiv and Shakti'],
    services: ['Brand Design', 'Logo Design'],
  },
  {
    id: 'fashion-label',
    title: 'Fashion Label',
    subtitle: 'From zero sales to 189',
    category: 'Sales Ads',
    description:
      'Three months, zero sales. Then our ads went live, and the very first month brought in 189 sales.',
    image: 'https://images.pexels.com/photos/13208880/pexels-photo-13208880.jpeg?auto=compress&cs=tinysrgb&w=1600',
    metrics: [
      { label: 'Sales in month one', value: '189' },
      { label: 'Sales in the 3 months before', value: '0' },
    ],
    highlights: ['0 sales in the three months before', '189 sales in the first month of ads'],
    services: ['Performance Marketing', 'Paid Media'],
  },
  {
    id: 'house-of-yogis',
    title: 'House of Yogis',
    subtitle: 'Slow Hatha yoga, Rishikesh',
    category: 'Logo Design',
    description:
      'A home for slow, well-rooted Hatha yoga. The logo shows that our roots and sense of home come from within: grounded, calm and centred.',
    image: 'https://images.pexels.com/photos/5466261/pexels-photo-5466261.jpeg?auto=compress&cs=tinysrgb&w=1600',
    metrics: [
      { label: 'The idea', value: 'Home comes from within' },
      { label: 'The feel', value: 'Grounded, calm, centred' },
    ],
    highlights: ['Logo built on the idea of slow, well-rooted Hatha yoga'],
    services: ['Brand Design', 'Logo Design'],
  },
  {
    id: 'animal-welfare-ngo',
    title: 'Animal Welfare NGO',
    subtitle: 'Finding a home for a Persian cat',
    category: 'Adoption Campaign',
    description:
      'An adoption campaign for a Persian cat drew so many enquiries that we had to switch the ad off early.',
    image: 'https://images.pexels.com/photos/3423805/pexels-photo-3423805.jpeg?auto=compress&cs=tinysrgb&w=1600',
    metrics: [
      { label: 'Enquiries', value: 'Overflowing' },
      { label: 'Result', value: 'Ad paused early' },
    ],
    highlights: ['So many adoption enquiries the ad was stopped early'],
    services: ['Performance Marketing'],
  },
  {
    id: 'the-a-frame-builders',
    title: 'The A-Frame Builders',
    subtitle: 'Wooden construction, B2B',
    category: 'Logo Design',
    description:
      'An identity built on a promise: what they build lasts and is kind to the planet, with client relationships that grow the way a home does, with care and trust.',
    image: 'https://images.pexels.com/photos/27669642/pexels-photo-27669642.jpeg?auto=compress&cs=tinysrgb&w=1600',
    metrics: [
      { label: 'The promise', value: 'Built to last' },
      { label: 'Values', value: 'Kind to the planet' },
    ],
    highlights: ['Identity for a wooden construction brand built to last'],
    services: ['Brand Design', 'Logo Design'],
  },
  {
    id: 'b2b-brand',
    title: 'B2B Brand',
    subtitle: 'Growing lead volume',
    category: 'Lead Generation',
    description:
      'The goal was to grow lead volume. Our campaign delivered 203 high-intent leads.',
    image: 'https://images.pexels.com/photos/327540/pexels-photo-327540.jpeg?auto=compress&cs=tinysrgb&w=1600',
    metrics: [
      { label: 'High-intent leads', value: '203' },
    ],
    highlights: ['203 high-intent leads'],
    services: ['Performance Marketing', 'Lead Generation'],
  },
  {
    id: 'fnb-brand',
    title: 'F&B Brand',
    subtitle: 'Beating a staff shortage',
    category: 'Hiring Ads',
    description:
      'Hit by staff shortages, the business needed people fast. Our hiring ad brought an immediate surge of 29 candidates, and the roles were filled.',
    image: 'https://images.pexels.com/photos/20509791/pexels-photo-20509791.jpeg?auto=compress&cs=tinysrgb&w=1600',
    metrics: [
      { label: 'Candidates', value: '29' },
      { label: 'Staffing', value: 'Successful' },
    ],
    highlights: ['29 candidates from one hiring ad', 'Successful staffing'],
    services: ['Performance Marketing', 'Recruitment Ads'],
  },
];
