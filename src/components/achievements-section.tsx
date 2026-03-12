"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from './ui/section-heading';

const achievementsLabels = [
    { text: "Press Release", x: "-25%", y: "-30%", delay: 0.1 },
    { text: "Events", x: "0%", y: "-50%", delay: 0.2 },
    { text: "Founders", x: "25%", y: "-30%", delay: 0.3 },
];

const AchievementsSection = () => {
    return (
        <section id="achievements" className="relative overflow-hidden bg-white py-8 md:py-10">
            <div className="container-modern px-6 md:px-12">
                <div className="relative flex min-h-136 items-center justify-center overflow-hidden rounded-4xl md:min-h-160 lg:min-h-184">
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

                    <div className="relative z-10 w-full text-center">
                        <div className="relative mb-10 h-32 md:mb-12 md:h-36">
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
                                    <div className="rounded-full border border-white/45 bg-white/78 px-6 py-2.5 text-sm font-semibold text-secondary shadow-xl shadow-black/5 backdrop-blur-md transition-all duration-300 hover:bg-primary hover:text-white cursor-default select-none">
                                        {label.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <SectionHeading
                            title={
                                <>
                                    Our Awards & <br />
                                    <span className="text-primary italic font-serif">Achievements</span>
                                </>
                            }
                            description="Recognizing excellence, innovation, and our commitment to driving growth for brands across the globe."
                            layout="center"
                            className="mx-auto max-w-4xl px-4 mb-0"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AchievementsSection;
