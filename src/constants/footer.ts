import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';

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
    { icon: FiMapPin, label: 'Porvorim, Goa' },
    { icon: FiMail, label: 'info.erayaexp@gmail.com' },
    { icon: FiPhone, label: '+91 8208664702' },
];

export const socialLinks = [
    { icon: FaInstagram, href: 'https://instagram.com/erayaexperience', label: 'Instagram' },
];
