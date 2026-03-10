"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { achievements } from '@/constants/achievements';
import { SectionHeading } from './ui/section-heading';

const achievementsLabels = [
    { text: "Press Release", x: "-25%", y: "-30%", delay: 0.1 },
    { text: "Events", x: "0%", y: "-50%", delay: 0.2 },
    { text: "Founders", x: "25%", y: "-30%", delay: 0.3 },
];

const AchievementsSection = () => {
    return (
        <section id="achievements" className="relative h-[80vh] min-h-150 overflow-hidden flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/achievements-bg.png"
                    alt="Achievements Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/40 to-white" />
            </div>

            <div className="container-modern relative z-10 text-center">
                {/* Floating Arch Labels */}
                <div className="relative h-40 mb-8">
                    {achievementsLabels.map((label, index) => (
                        <motion.div
                            key={label.text}
                            initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                x: label.x,
                                y: label.y
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: label.delay,
                                type: "spring",
                                stiffness: 50
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="bg-white/80 backdrop-blur-md border border-white/40 text-secondary px-6 py-2.5 rounded-full text-sm font-semibold shadow-xl shadow-black/5 hover:bg-primary hover:text-white transition-all duration-300 cursor-default select-none">
                                {label.text}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Central Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-secondary tracking-tight mb-4">
                        Our Awards & <br />
                        <span className="text-primary italic font-serif">Achievements</span>
                    </h2>
                    <p className="text-foreground/60 max-w-xl mx-auto text-lg font-light">
                        Recognizing excellence, innovation, and our commitment to driving growth for brands across the globe.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default AchievementsSection;
