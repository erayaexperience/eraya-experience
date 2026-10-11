"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { aboutContent } from '@/constants/about';
import { SectionHeading } from './ui/section-heading';
import { EASE_OUT_EXPO } from '@/lib/motion';

const AboutSection = () => {
  return (
    <section id="about" className="bg-white py-section border-b border-zinc-200 overflow-hidden">
      <div className="container-modern px-6 md:px-12 relative">
        <div className="relative max-w-6xl mx-auto grid grid-cols-2 gap-4 sm:gap-6 xl:block xl:min-h-150">

          <motion.div
            className="row-start-2 col-start-1 justify-self-end w-full max-w-56 z-20 xl:absolute xl:top-6 xl:right-2 xl:w-64 xl:max-w-none"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
          >
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group">
              <Image
                src={aboutContent.founder.image}
                alt={aboutContent.founder.name}
                fill
                style={{ objectPosition: 'center top' }}
                className="object-cover object-top transition-transform duration-700 scale-100 group-hover:scale-105"
                sizes="(max-width: 1279px) 224px, 256px"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 mb-0.5">{aboutContent.founder.role}</p>
                <p className="text-xs font-semibold text-white">{aboutContent.founder.name}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="row-start-2 col-start-2 justify-self-start w-full max-w-56 z-20 xl:absolute xl:bottom-6 xl:left-2 xl:w-64 xl:max-w-none"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
          >
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group">
              <Image
                src={aboutContent.coFounder.image}
                alt={aboutContent.coFounder.name}
                fill
                style={{ objectPosition: 'center top' }}
                className="object-cover object-top transition-transform duration-700 scale-100 group-hover:scale-105"
                sizes="(max-width: 1279px) 224px, 256px"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 mb-0.5">{aboutContent.coFounder.role}</p>
                <p className="text-xs font-semibold text-white">{aboutContent.coFounder.name}</p>
              </div>
            </div>
          </motion.div>

          <div className="col-span-2 row-start-1 mb-6 flex justify-center xl:absolute xl:inset-0 xl:mb-0 xl:items-center">
            <SectionHeading
              subtitle="Who We Are"
              title={
                <>
                  {aboutContent.title.split(' ').slice(0, -1).join(' ')} <br />
                  <span className="italic font-serif text-primary">{aboutContent.title.split(' ').slice(-1)}</span>
                </>
              }
              description={aboutContent.description}
              layout="center"
              className="relative z-10 w-full max-w-lg lg:max-w-xl px-4 sm:px-6 mb-0 md:mb-0"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
