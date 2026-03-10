"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { aboutContent } from '@/constants/about';

const AboutSection = () => {
  return (
    <section id="about" className="relative bg-white py-(--spacing-section) overflow-hidden">
      {/* Absolute background elements */}
      <div className="absolute top-[20%] -right-24 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] -left-24 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-modern relative z-10">
        <div className="relative max-w-6xl mx-auto min-h-[500px] flex items-center justify-center py-20">

          {/* Founder Cutout - Top Right */}
          <motion.div
            className="absolute top-0 right-0 w-48 h-64 md:w-64 md:h-80 z-20"
            initial={{ opacity: 0, x: 50, y: -50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-border/40">
              <Image
                src={aboutContent.founder.image}
                alt={aboutContent.founder.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 256px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-0.5">{aboutContent.founder.role}</p>
                <p className="text-sm font-medium">{aboutContent.founder.name}</p>
              </div>
            </div>
          </motion.div>

          {/* Co-Founder Cutout - Bottom Left */}
          <motion.div
            className="absolute bottom-0 left-0 w-48 h-64 md:w-64 md:h-80 z-20"
            initial={{ opacity: 0, x: -50, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-border/40">
              <Image
                src={aboutContent.coFounder.image}
                alt={aboutContent.coFounder.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 256px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-0.5">{aboutContent.coFounder.role}</p>
                <p className="text-sm font-medium">{aboutContent.coFounder.name}</p>
              </div>
            </div>
          </motion.div>

          {/* Central Content Section */}
          <motion.div
            className="relative z-10 max-w-2xl text-center px-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6">About Us</h2>
            <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-secondary leading-[1.1] mb-8">
              {aboutContent.title.split(' ').slice(0, -1).join(' ')} <br />
              <span className="italic font-serif text-primary">{aboutContent.title.split(' ').slice(-1)}</span>
            </h3>
            <div className="h-px w-24 bg-primary/20 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed">
              {aboutContent.description}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
