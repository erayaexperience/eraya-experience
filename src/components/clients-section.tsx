"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const clients = [
    { name: 'Amazon', logo: 'https://cdn.worldvectorlogo.com/logos/amazon-2.svg' },
    { name: 'Myntra', logo: 'https://cdn.worldvectorlogo.com/logos/myntra.svg' },
    { name: 'Hotel DevDeep', logo: '/images/placeholder-logo.svg' },
    { name: 'Beach Walk', logo: '/images/placeholder-logo.svg' },
    { name: 'Xavier\'s Cafe', logo: '/images/placeholder-logo.svg' },
    { name: 'Mission Rabies', logo: '/images/placeholder-logo.svg' },
    { name: 'Snow Park Goa', logo: '/images/placeholder-logo.svg' },
    { name: 'Koleso Lounge', logo: '/images/placeholder-logo.svg' },
    { name: 'Optica Indira', logo: '/images/placeholder-logo.svg' },
    { name: 'Thunder World', logo: '/images/placeholder-logo.svg' },
    { name: 'Carlito\'s', logo: '/images/placeholder-logo.svg' },
    { name: 'Dreamdays', logo: '/images/placeholder-logo.svg' },
];

const ClientsSection = () => {
    return (
        <section className="bg-white py-(--spacing-section) border-y border-border/20">
            <div className="container-modern">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-semibold tracking-tight text-secondary"
                    >
                        Trusted by <span className="text-primary italic font-serif">various brands</span> across industries
                    </motion.h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 items-center">
                    {clients.map((client, index) => (
                        <motion.div
                            key={client.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                        >
                            {/* Using a stylized text logo for now since images are placeholders */}
                            <div className="text-xl font-bold text-secondary/40 hover:text-primary transition-colors cursor-default select-none">
                                {client.name}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientsSection;
