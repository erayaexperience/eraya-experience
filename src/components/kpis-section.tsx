"use client";

import { motion } from 'framer-motion';
import { stats } from '@/constants/about';
import { RollingNumber } from './ui/rolling-number';
import { cn } from '@/lib/utils';
import { SectionHeading } from './ui/section-heading';

const KPIsSection = () => {
    return (
        <section id="kpis" className="relative bg-white py-16 border-b border-border/30 overflow-hidden">
            <div className="container-modern relative px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
                    {/* Left side - Branded Understated Heading */}
                    <div className="lg:col-span-2 flex flex-col items-start lg:pr-12">
                        <SectionHeading
                            subtitle="Growth Metrics"
                            title={
                                <>
                                    KPIs That <br />
                                    <span className="text-primary italic font-serif">Matter</span>
                                </>
                            }
                            layout="compact"
                            className="mb-0"
                        />
                    </div>

                    {/* Right side - Elite Branded Grid */}
                    <div className="lg:col-span-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 border-l-2 border-primary/25">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                    className={cn(
                                        "px-6 md:px-8 lg:px-10 py-10 group cursor-default border-r-2 border-primary/25",
                                        // Vertical lines for mobile: Top border for everything except first row (first 2 items)
                                        "border-t-2 border-primary/25 md:border-t-0",
                                        i < 2 ? "border-t-0" : ""
                                    )}
                                >
                                    <div className="flex flex-col gap-8">
                                        <div className="flex flex-col gap-3">
                                            <stat.icon className="h-4 w-4 text-primary/60 group-hover:text-primary transition-colors duration-500" strokeWidth={1.5} />
                                            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-foreground/60 group-hover:text-secondary transition-colors duration-500">
                                                {stat.label}
                                            </p>
                                        </div>

                                        <RollingNumber
                                            value={stat.value}
                                            className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.05em] text-secondary leading-none"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KPIsSection;
