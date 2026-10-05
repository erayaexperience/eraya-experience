"use client";

import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { stats } from '@/constants/about';
import { SectionHeading } from './ui/section-heading';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const optimised = (src: string) => `/_next/image?url=${encodeURIComponent(src)}&w=640&q=75`;

const figures = [
    '/images/services/influencer-marketing.jpg',
    '/images/graphics/lilliput-sundowner-by-the-beach.jpg',
    '/images/graphics/lilliput-mixtape-friday.jpg',
    '/images/services/photoshoots.jpg',
];

const figureType =
    'block font-sans font-black leading-[0.95] tracking-[-0.05em] whitespace-nowrap text-[clamp(2.75rem,14vw,4.75rem)] md:text-[clamp(2.75rem,6.9vw,4.25rem)] lg:text-[clamp(3rem,4.9vw,4.5rem)]';

const CountUp = ({ to, start, still }: { to: number; start: boolean; still: boolean }) => {
    const count = useMotionValue(still ? to : 0);
    const shown = useTransform(count, (value) => Math.round(value).toString());

    useEffect(() => {
        if (!start || still) return;
        const controls = animate(count, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
        return () => controls.stop();
    }, [start, still, to, count]);

    return (
        <span className="inline-grid tabular-nums">
            <span className="invisible col-start-1 row-start-1">{to}</span>
            <motion.span className="col-start-1 row-start-1 text-right">{shown}</motion.span>
        </span>
    );
};

const Figure = ({ value, start, still }: { value: string; start: boolean; still: boolean }) => {
    const number = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
    const suffix = value.replace(/[0-9]/g, '');
    return (
        <>
            <CountUp to={number} start={start} still={still} />
            {suffix}
        </>
    );
};

const Stat = ({ index, start, still }: { index: number; start: boolean; still: boolean }) => {
    const stat = stats[index];

    return (
        <li className="flex flex-col items-center text-center">
            <span className="sr-only">
                {stat.value} {stat.label}
            </span>
            <div aria-hidden>
                <span
                    style={{ backgroundImage: `url(${optimised(figures[index])})`, WebkitBackgroundClip: 'text' }}
                    className={`${figureType} bg-secondary bg-cover bg-center bg-clip-text py-[0.06em] pr-[0.12em] pl-[0.04em] text-transparent`}
                >
                    <Figure value={stat.value} start={start} still={still} />
                </span>
            </div>
            <p className="glass-gold-light mt-3 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary/80 sm:rounded-full sm:text-[11px] sm:tracking-[0.18em] lg:mt-6 lg:rounded-2xl lg:px-3 lg:text-[10px] lg:tracking-[0.14em] xl:rounded-full xl:px-4">
                <stat.icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                {stat.label}
            </p>
        </li>
    );
};

const KPIsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const rowRef = useRef<HTMLUListElement>(null);
    const still = !!useReducedMotion();
    const inView = useInView(rowRef, { once: true, amount: 0.3 });

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.fromTo(
                    rowRef.current,
                    { rotateX: 24 },
                    {
                        rotateX: 0,
                        ease: 'none',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'center center', scrub: true },
                    }
                );
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} id="kpis" className="relative overflow-hidden bg-background py-section">
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[60rem] w-[60rem] -translate-1/2 bg-[radial-gradient(closest-side,rgb(var(--primary)/0.12),transparent)]" />

            <div className="container-modern relative grid items-center gap-12 md:gap-16 lg:grid-cols-12 lg:gap-10">
                <SectionHeading
                    subtitle="By the Numbers"
                    title={
                        <>
                            Numbers That <br className="hidden lg:block" />
                            <span className="font-serif italic text-primary">Speak</span>
                        </>
                    }
                    description="Proof, not promises."
                    layout="compact"
                    className="mx-auto mb-0 max-w-md text-center lg:col-span-3 lg:mx-0 lg:text-left [&>p]:mt-4 [&>p]:text-sm md:[&>p]:text-base"
                />

                <div className="perspective-[1400px] lg:col-span-9">
                    <ul
                        ref={rowRef}
                        className="grid origin-top grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 md:grid-cols-4 md:gap-x-6"
                    >
                        {stats.map((stat, index) => (
                            <Stat key={stat.label} index={index} start={inView} still={still} />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default KPIsSection;
