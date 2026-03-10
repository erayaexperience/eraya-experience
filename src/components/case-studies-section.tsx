"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiShare2, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import { Button } from './ui/button';
import { caseStudies } from '@/constants/case-studies';
import { SectionHeading } from './ui/section-heading';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="relative bg-background py-section overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />

      <div className="container-modern relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <SectionHeading
            subtitle="Case Studies"
            title={
              <>
                Proof that craft <br />
                <span className="text-primary italic font-serif">drives growth</span>
              </>
            }
            description="Strategy meets premium execution. Explore how we transform vision into market-leading impact."
            layout="stacked"
            className="mb-6 justify-center"
          />

          <Button asChild variant="link" className="px-0 text-secondary hover:text-primary transition-colors gap-2 group mx-auto">
            <Link href="#contact" className="flex items-center">
              Scale your brand with us
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 ml-2" />
            </Link>
          </Button>
        </motion.div>

        {/* Bento Grid Layout - 3 Column Pattern */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Top Row - Span 2 / Image Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 h-100 relative rounded-3xl overflow-hidden group shadow-sm border border-border/10"
          >
            <Image
              src={caseStudies[0].image}
              alt={caseStudies[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{caseStudies[0].title}</h3>
              <p className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-md">{caseStudies[0].subtitle}</p>
            </div>
          </motion.div>

          {/* Card 2: Top Row - Span 1 / Light Brand Accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-1 h-100 bg-[#F5F5F7] rounded-3xl p-10 flex flex-col justify-center border border-black/5 group"
          >
            <h3 className="text-2xl font-semibold text-secondary mb-4 group-hover:text-primary transition-colors leading-tight">{caseStudies[1].title}</h3>
            <p className="text-foreground/60 text-sm md:text-base leading-relaxed mb-8">{caseStudies[1].description}</p>
            <div className="mt-auto">
              <p className="text-xs uppercase tracking-widest font-bold text-primary">{caseStudies[1].category}</p>
            </div>
          </motion.div>

          {/* Card 3: Bottom Row - Span 1 / Eraya Beige */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1 h-100 bg-linear-to-br from-[#D6B685]/10 to-[#D6B685]/20 rounded-3xl p-10 flex flex-col justify-center border border-[#D6B685]/30 group"
          >
            <h3 className="text-2xl font-semibold text-secondary mb-4 group-hover:text-primary transition-colors leading-tight">{caseStudies[2].title}</h3>
            <p className="text-foreground/60 text-sm md:text-base leading-relaxed mb-8">{caseStudies[2].description}</p>
            <div className="mt-auto">
              <p className="text-xs uppercase tracking-widest font-bold text-secondary/60">{caseStudies[2].category}</p>
            </div>
          </motion.div>

          {/* Card 4: Bottom Row - Span 2 / Eraya Navy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 h-100 bg-secondary rounded-3xl overflow-hidden relative group shadow-lg"
          >
            <div className="absolute inset-0 flex flex-col justify-end p-10 z-10 text-white">
              <div className="max-w-md">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">{caseStudies[3].title}</h3>
                <p className="text-white/80 text-sm md:text-base font-light leading-relaxed mb-8">{caseStudies[3].description}</p>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                    <p className="text-[10px] uppercase font-bold text-white/60 mb-0.5">ROI</p>
                    <p className="text-sm font-bold text-white">{caseStudies[3].roi}</p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="bg-transparent border-white/20 text-white hover:bg-white hover:text-secondary rounded-xl transition-all h-10">
                    <Link href="#contact" className="flex items-center gap-2">
                      View details
                      <FiArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Split layout effect like reference */}
            <div className="absolute top-0 right-0 w-2/5 h-2/5 overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity duration-500">
              <Image
                src={caseStudies[3].image}
                alt={caseStudies[3].title}
                fill
                className="object-cover rounded-bl-[100px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
