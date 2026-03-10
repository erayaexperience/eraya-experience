"use client";

import { motion } from 'framer-motion';
import { SectionHeading } from './ui/section-heading';
import { stats } from '@/constants/about';

const KPIsSection = () => {
    return (
        <section id="kpis" className="bg-white py-(--spacing-section) border-b border-border/40 overflow-hidden">
            <div className="container-modern">
                {/* Header */}
                <SectionHeading
                    subtitle="Our Impact"
                    title={
                        <>
                            KPIs that <span className="text-primary italic font-serif">matter</span>
                        </>
                    }
                    layout="center"
                    className="mb-12 md:mb-16"
                />

                <div className="max-w-4xl mx-auto relative group">
                    {/* Subtle separator lines - centered */}
                    <div className="absolute top-1/2 -inset-x-4 h-px bg-border/40 -translate-y-1/2 pointer-events-none hidden sm:block" />
                    <div className="absolute left-1/2 -inset-y-4 w-px bg-border/40 -translate-x-1/2 pointer-events-none" />

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 lg:gap-x-12">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="relative flex flex-col items-center text-center px-2 group"
                            >
                                <div className="mb-4">
                                    <stat.icon className="h-5 w-5 text-primary opacity-80" strokeWidth={2} />
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <p className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-secondary font-serif">
                                        {stat.value.includes('+') ? stat.value.replace('+', '') : stat.value.includes('%') ? stat.value.replace('%', '') : stat.value}
                                    </p>
                                    {(stat.value.includes('+') || stat.value.includes('%')) && (
                                        <span className="text-2xl sm:text-3xl text-primary font-bold">
                                            {stat.value.includes('+') ? '+' : '%'}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-3 text-[10px] uppercase tracking-[0.15em] font-bold text-foreground/50 group-hover:text-primary transition-colors">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KPIsSection;
