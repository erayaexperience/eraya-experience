import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const navColumns = [
    {
        title: 'Services',
        links: [
            { name: 'Social Media Management', href: '#services' },
            { name: 'Influencer Marketing', href: '#services' },
            { name: 'Performance Marketing', href: '#services' },
            { name: 'Website & SEO', href: '#services' },
        ],
    },
    {
        title: 'Company',
        links: [
            { name: 'About', href: '#about' },
            { name: 'Case Studies', href: '#case-studies' },
            { name: 'Portfolio', href: '#portfolio' },
            { name: 'Contact', href: '#contact' },
        ],
    },
];

export const contactItems = [
    { icon: FiMapPin, label: 'Porvorim, Goa' },
    { icon: FiMail, label: 'ino.erayaexp@gmail.com' },
    { icon: FiPhone, label: '+91 9272166475' },
];

export const socialLinks = [
    { icon: FaInstagram, href: 'https://instagram.com/erayaexperience', label: 'Instagram' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
];
