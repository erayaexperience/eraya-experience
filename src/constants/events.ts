export type EventImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  tag?: string;
};

export type EventItem = {
  id: string;
  title: string;
  serifTitle: string;
  category: string;
  location: string;
  partner?: string;
  summary: string;
  images: EventImage[];
};

export const events: EventItem[] = [
  {
    id: 'istoria',
    title: 'Istoria',
    serifTitle: 'North Goa',
    category: 'Sundowner',
    location: 'Goa',
    partner: 'With Maka Di Beer',
    summary: 'Curated influencer gathering and brand experience at Istoria, Goa.',
    images: [
      {
        src: '/images/events/istoria/1.jpeg',
        alt: 'Maka Di Beer at Istoria',
        width: 589,
        height: 1013,
        caption: 'Maka Di Beer × Istoria',
        tag: 'Maka Di Beer',
      },
      {
        src: '/images/events/istoria/2.jpeg',
        alt: 'Istoria brand entrance',
        width: 1078,
        height: 1600,
        caption: 'Istoria Entrance',
        tag: 'Brand Space',
      },
      {
        src: '/images/events/istoria/3.jpeg',
        alt: 'Evening experience at Istoria',
        width: 924,
        height: 1600,
        caption: 'Istoria Lounge',
        tag: 'Nightlife',
      },
      {
        src: '/images/events/istoria/4.jpeg',
        alt: 'Evening moments at Istoria',
        width: 922,
        height: 1600,
        caption: 'Evening Moments at Istoria',
        tag: 'Creator Night',
      },
    ],
  },
  {
    id: 'the-millennial-summit',
    title: 'The Millennial Summit',
    serifTitle: 'Royal Opera House',
    category: 'Summit',
    location: 'Mumbai',
    partner: 'With Rotary District 3141',
    summary: 'Youth leadership summit hosted at the historic Royal Opera House in Mumbai.',
    images: [
      {
        src: '/images/events/tms/1.jpeg',
        alt: 'Keynote session at The Millennial Summit',
        width: 589,
        height: 1093,
        caption: 'Keynote Address',
        tag: 'Keynote',
      },
      {
        src: '/images/events/tms/2.jpeg',
        alt: 'Stage performance and hosting at The Millennial Summit',
        width: 1058,
        height: 1600,
        caption: 'Stage Production',
        tag: 'Stage Energy',
      },
      {
        src: '/images/events/tms/3.jpeg',
        alt: 'Panel discussion at The Millennial Summit',
        width: 1046,
        height: 1600,
        caption: 'Panel Discussion',
        tag: 'Panel Session',
      },
      {
        src: '/images/events/tms/4.jpeg',
        alt: 'Royal Opera House auditorium audience',
        width: 589,
        height: 1020,
        caption: 'Royal Opera House Auditorium',
        tag: 'Auditorium',
      },
    ],
  },
  {
    id: 'i-run-marathon-goa',
    title: 'I-Run Marathon',
    serifTitle: 'Goa Edition',
    category: 'Marathon',
    location: 'Goa',
    partner: 'With I-Help Foundation',
    summary: 'Annual marathon and community run organized in Goa.',
    images: [
      {
        src: '/images/events/marathon/1.jpeg',
        alt: 'Main stage at I-Run Marathon Goa',
        width: 1320,
        height: 1590,
        caption: 'Main Stage Inauguration',
        tag: 'Main Stage',
      },
      {
        src: '/images/events/marathon/2.jpeg',
        alt: '21 KM Finisher at I-Run Marathon Goa',
        width: 1150,
        height: 1600,
        caption: '21 KM Half Marathon',
        tag: 'Finish Line',
      },
      {
        src: '/images/events/marathon/3.jpeg',
        alt: 'Hydration and refreshment station at I-Run Marathon Goa',
        width: 988,
        height: 1600,
        caption: 'Hydration & Recovery Zone',
        tag: 'Hydration Zone',
      },
    ],
  },
];
