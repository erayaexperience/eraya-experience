import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { site } from '@/lib/site';

export const navColumns = [
    {
        title: 'Services',
        links: [
            { name: 'Graphic & Logo Design', href: '#services' },
            { name: 'Photoshoots', href: '#services' },
            { name: 'Social Media Marketing', href: '#services' },
            { name: 'Meta & Google Ads', href: '#services' },
            { name: 'Influencer Marketing', href: '#services' },
            { name: 'Brand Kits', href: '#services' },
            { name: 'Website & SEO', href: '#services' },
        ],
    },
    {
        title: 'Company',
        links: [
            { name: 'About', href: '#about' },
            { name: 'Press', href: '#press' },
            { name: 'Events', href: '#events' },
            { name: 'Case Studies', href: '#case-studies' },
            { name: 'Portfolio', href: '#portfolio' },
            { name: 'FAQ', href: '#faq' },
            { name: 'Contact', href: '#contact' },
        ],
    },
];

export const contactItems = [
    { icon: FiMapPin, label: `${site.locality}, ${site.region}` },
    { icon: FiMail, label: site.email, href: `mailto:${site.email}` },
    { icon: FiPhone, label: site.phoneLabel, href: `tel:${site.telephone}` },
];

export const socialLinks = [
    { icon: FaInstagram, href: site.instagram, label: 'Instagram' },
    { icon: FaLinkedinIn, href: site.linkedin, label: 'LinkedIn' },
];
