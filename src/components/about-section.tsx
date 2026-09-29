"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { aboutContent } from '@/constants/about';
import { SectionHeading } from './ui/section-heading';

const AboutSection = () => {
  return (
    <section id="about" className="bg-white py-(--spacing-section) border-b border-zinc-200 overflow-hidden">
      <div className="container-modern px-6 md:px-12 relative">
        <div className="relative max-w-6xl mx-auto min-h-150 lg:min-h-175 flex items-center justify-center">

          {/* Founder Portrait - Top Right Alignment (High Precision) */}
          <motion.div
            className="absolute -top-12 -right-4 lg:right-0 w-44 md:w-56 lg:w-64 z-20"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group">
              <Image
                src={aboutContent.founder.image}
                alt={aboutContent.founder.name}
                fill
                style={{ objectPosition: 'center top' }}
                className="object-cover object-top transition-transform duration-700 scale-100 group-hover:scale-105"
                sizes="(max-width: 768px) 176px, 256px"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 mb-0.5">{aboutContent.founder.role}</p>
                <p className="text-xs font-semibold text-white">{aboutContent.founder.name}</p>
              </div>
            </div>
          </motion.div>

          {/* Co-Founder Portrait - Bottom Left Alignment (High Precision) */}
          <motion.div
            className="absolute -bottom-12 -left-4 lg:left-0 w-44 md:w-56 lg:w-64 z-20"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group">
              <Image
                src={aboutContent.coFounder.image}
                alt={aboutContent.coFounder.name}
                fill
                style={{ objectPosition: 'center top' }}
                className="object-cover object-top transition-transform duration-700 scale-100 group-hover:scale-105"
                sizes="(max-width: 768px) 176px, 256px"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 mb-0.5">{aboutContent.coFounder.role}</p>
                <p className="text-xs font-semibold text-white">{aboutContent.coFounder.name}</p>
              </div>
            </div>
          </motion.div>

          {/* Standardized Central Narrative Header */}
          <div className="absolute inset-0 flex items-center justify-center">
            <SectionHeading
              subtitle="Our Agency"
              title={
                <>
                  {aboutContent.title.split(' ').slice(0, -1).join(' ')} <br />
                  <span className="italic font-serif text-primary">{aboutContent.title.split(' ').slice(-1)}</span>
                </>
              }
              description={aboutContent.description}
              layout="center"
              className="relative z-10 w-full max-w-2xl px-6 mb-0"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
