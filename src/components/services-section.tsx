"use client";

import {
  FiUsers,
  FiCamera,
  FiTrendingUp,
  FiMic,
  FiGlobe,
  FiArrowRight,
} from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeading } from './ui/section-heading';

const ServicesSection = () => {
  const services = [
    {
      icon: FiUsers,
      title: 'Influencer Marketing & Events',
      description: 'Authentic influencer partnerships and strategic event curation that drive real results and brand activation.',
      offset: 'lg:-translate-y-12', // Highest
      color: 'bg-[#F9F7F2]',
    },
    {
      icon: FiCamera,
      title: 'Social Media & Photoshoots',
      description: 'Professional content creation, graphics, and paid ads that capture attention and drive unparalleled engagement.',
      offset: 'lg:-translate-y-6', // Mid
      color: 'bg-[#FDFCF9]',
    },
    {
      icon: FiTrendingUp,
      title: 'Performance Marketing',
      description: 'Data-driven campaigns focused strictly on ROI and measurable, sustainable business growth.',
      offset: 'lg:translate-y-0', // Center (Lowest)
      color: 'bg-[#F7F9F7]',
    },
    {
      icon: FiMic,
      title: 'Hoardings & Offline Marketing',
      description: 'Strategic outdoor advertising placements for maximum brand visibility locally and beyond.',
      offset: 'lg:-translate-y-6', // Mid
      color: 'bg-[#FDFCF9]',
    },
    {
      icon: FiGlobe,
      title: 'Website & SEO',
      description: 'Professional, high-performing websites expertly optimized for search engines and unparalleled user experience.',
      offset: 'lg:-translate-y-12', // Highest
      color: 'bg-[#F9F7F2]',
    }
  ];

  return (
    <section id="services" className="relative bg-white py-(--spacing-section) overflow-hidden">
      <div className="container-modern relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <SectionHeading
            subtitle="Core Expertise"
            title={
              <>
                The Feeling Is <span className="text-primary italic font-serif">Mutual</span>
              </>
            }
            description="A meticulously focused suite of marketing services designed to help modern premium brands succeed and scale."
            layout="center"
          />
        </div>

        {/* Staggered Services Grid */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 lg:gap-4 items-center min-h-[500px]">
          {services.map((service, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`group relative flex w-full sm:w-[calc(50%-1.5rem)] lg:w-1/5 flex-col p-8 rounded-[32px] border border-border/20 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 ${service.color} ${service.offset}`}
            >
              <div className="flex flex-col h-full text-center">
                {/* Description */}
                <p className="text-foreground/80 font-light leading-relaxed mb-12 text-sm sm:text-base">
                  &quot;{service.description}&quot;
                </p>

                {/* Service Identifier (Bottom) */}
                <div className="mt-auto flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-white shadow-sm border border-border/20 mb-3 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                    <service.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="text-sm font-semibold text-secondary tracking-tight">
                    {service.title.split(' & ')[0]}
                  </h3>
                  {service.title.includes('&') && (
                    <p className="text-[10px] uppercase tracking-widest text-foreground/40 mt-1">
                      & {service.title.split(' & ')[1]}
                    </p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
