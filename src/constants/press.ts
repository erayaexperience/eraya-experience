export type PressItem = {
    publication: string;
    section: string;
    date?: string;
    headline: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    href?: string;
};

export const pressItems: PressItem[] = [
    {
        publication: 'The Times of India',
        section: 'Goa Times',
        date: 'March 21, 2026',
        headline: 'Goa agency taps into rise of collaborative marketing',
        src: '/images/press/times-of-india-goa-times.jpg',
        alt: 'Goa Times, The Times of India article "Goa agency taps into rise of collaborative marketing" featuring Eraya Experience',
        width: 482,
        height: 788,
        href: '/Times%20of%20India_Goa.pdf',
    },
    {
        publication: 'ItsGoa',
        section: 'Entrepreneur',
        headline: 'Eraya Experience LLP',
        src: '/images/press/itsgoa-eraya-experience.jpg',
        alt: 'ItsGoa entrepreneur feature on Eraya Experience LLP',
        width: 1320,
        height: 1313,
        href: 'https://itsgoa.com/eraya-experience-llp',
    },
    {
        publication: 'ItsGoa',
        section: 'Cover Feature',
        headline: 'Alizah Alam, founder of Eraya Experience',
        src: '/images/press/itsgoa-alizah-alam.jpg',
        alt: 'ItsGoa cover feature on Alizah Alam, founder of Eraya Experience',
        width: 1320,
        height: 1322,
        href: 'https://issuu.com/itsgoa/docs/goa_tycoon_-_november_issue_2025',
    },
];
