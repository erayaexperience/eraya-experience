import { FiMail, FiPhone } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import { site } from '@/lib/site';

export const contactInfo = [
    { icon: FiMail, title: 'Email', details: site.email, href: `mailto:${site.email}` },
    { icon: FiPhone, title: 'Phone', details: site.phoneLabel, href: `tel:${site.telephone}` },
    { icon: FaInstagram, title: 'Instagram', details: `@${site.instagramHandle}`, href: site.instagram, external: true },
];

export const serviceOptions = [
    'Graphic & Logo Design',
    'Photoshoots',
    'Social Media Marketing',
    'Meta & Google Ads',
    'Influencer Marketing',
    'Brand Kits',
    'Website & SEO',
    'The Full Package'
];
