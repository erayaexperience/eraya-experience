"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { aboutContent } from '@/constants/about';
import { SectionHeading } from './ui/section-heading';
import { EASE_OUT_EXPO } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Person = { name: string; role: string; image: string };

const FounderCard = ({
  person,
  progress,
  depth,
  enterY,
  delay,
  className,
}: {
  person: Person;
  progress: MotionValue<number>;
  depth: number;
  enterY: number;
  delay: number;
  className: string;
}) => {
  const y = useTransform(progress, [0, 1], [depth * 90, depth * -90]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.95, y: enterY }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay }}
    >
      <motion.div style={{ y }}>
        <div data-cursor="view" className="group relative aspect-3/4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <Image
            src={person.image}
            alt={person.name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 639px) 45vw, (max-width: 1279px) 224px, 256px"
          />
          <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-4 opacity-100 transition-opacity duration-500 xl:opacity-0 xl:group-hover:opacity-100">
            <p className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">{person.role}</p>
            <p className="text-xs font-semibold text-white">{person.name}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const words = aboutContent.title.split(' ');

  return (
    <section ref={sectionRef} id="about" className="relative z-10 overflow-hidden border-b border-zinc-200 bg-white py-section">
      <div className="container-modern relative px-6 md:px-12">
        <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:gap-6 xl:block xl:min-h-150">
          <FounderCard
            person={aboutContent.founder}
            progress={scrollYProgress}
            depth={1}
            enterY={20}
            delay={0}
            className={cn('z-20 col-start-1 row-start-2 w-full max-w-56 justify-self-end', 'xl:absolute xl:top-6 xl:right-2 xl:w-64 xl:max-w-none')}
          />
          <FounderCard
            person={aboutContent.coFounder}
            progress={scrollYProgress}
            depth={0.45}
            enterY={-20}
            delay={0.2}
            className={cn('z-20 col-start-2 row-start-2 w-full max-w-56 justify-self-start', 'xl:absolute xl:bottom-6 xl:left-2 xl:w-64 xl:max-w-none')}
          />

          <div className="col-span-2 row-start-1 mb-6 flex justify-center xl:absolute xl:inset-0 xl:mb-0 xl:items-center">
            <SectionHeading
              subtitle="Who We Are"
              title={
                <>
                  {words.slice(0, -1).join(' ')} <br />
                  <span className="font-serif italic text-primary">{words.at(-1)}</span>
                </>
              }
              description={aboutContent.description}
              layout="center"
              className="relative z-10 mb-0 w-full max-w-lg px-4 sm:px-6 md:mb-0 lg:max-w-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
