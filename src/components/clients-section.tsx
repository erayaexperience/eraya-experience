"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const clients = [
    { name: 'Koleso 24/7 Lounge Bar', logo: '/images/clients/koleso.png', width: 465, height: 588 },
    { name: 'Sukkha', logo: '/images/clients/sukkha.png', width: 629, height: 290 },
    { name: 'Carlito\'s by the Sea', logo: '/images/clients/carlitos.png', width: 638, height: 305 },
    { name: 'Ikie', logo: '/images/clients/ikie.png', width: 720, height: 259 },
    { name: 'Istorea by the Sea', logo: '/images/clients/istorea.png', width: 648, height: 307 },
    { name: 'Mission Rabies', logo: '/images/clients/mission-rabies.png', width: 552, height: 242 },
    { name: 'Thunder World Goa', logo: '/images/clients/thunder-world.png', width: 370, height: 368 },
    { name: 'Garudadhwaj Foundation', logo: '/images/clients/garudadhwaj.png', width: 338, height: 436 },
    { name: 'Dreamdays', logo: '/images/clients/dreamdays.png', width: 698, height: 175 },
    { name: 'Snow Park Goa', logo: '/images/clients/snow-park.png', width: 454, height: 413 },
    { name: 'Pagal Awwrat', logo: '/images/clients/pagal-awwrat.png', width: 287, height: 329 },
    { name: 'Hotel DevDeep', logo: '/images/clients/hotel-devdeep.png', width: 502, height: 388 },
    { name: 'House of Yogis', logo: '/images/clients/house-of-yogis.png', width: 574, height: 460 },
    { name: 'Get Secured', logo: '/images/clients/get-secured.png', width: 778, height: 187 },
    { name: 'Lilliput', logo: '/images/clients/lilliput.png', width: 707, height: 391 },
    { name: 'The Adhisha', logo: '/images/clients/the-adhisha.png', width: 481, height: 416 },
    { name: 'The A-Frame Builders', logo: '/images/clients/a-frame-builders.png', width: 270, height: 278 },
    { name: 'Nutradried', logo: '/images/clients/nutradried.png', width: 562, height: 210 },
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
                        The Company <span className="text-primary italic font-serif">We Keep</span>
                    </motion.h2>
                    <p className="mt-4 text-base font-light text-foreground/60 md:text-lg">
                        30+ brands across F&amp;B, hospitality, wellness, fashion, finance and beyond.
                    </p>
                </div>

                <ul className="flex flex-wrap justify-center items-center gap-x-6 gap-y-8 md:gap-x-10 md:gap-y-12 lg:gap-x-12">
                    {clients.map((client, index) => (
                        <motion.li
                            key={client.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.04 }}
                            className="basis-[calc(100%/3-1rem)] md:basis-[calc(25%-1.875rem)] lg:basis-[calc(100%/6-2.5rem)] flex h-16 items-center justify-center md:h-20 lg:h-24"
                        >
                            <Image
                                src={client.logo}
                                alt={`${client.name} logo`}
                                width={client.width}
                                height={client.height}
                                sizes="(min-width: 1024px) 180px, (min-width: 768px) 25vw, 33vw"
                                className="h-auto w-auto max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                            />
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default ClientsSection;
