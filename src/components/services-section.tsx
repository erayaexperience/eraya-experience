"use client";

import {
  FiUsers,
  FiCamera,
  FiTrendingUp,
  FiMic,
  FiGlobe,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { SectionHeading } from './ui/section-heading';

const ServicesSection = () => {
  const services = [
    {
      icon: FiUsers,
      title: 'Influencer Marketing & Events',
      eyebrow: 'Community-led growth',
      description: 'Authentic influencer partnerships and strategic event curation that drive real results and brand activation.',
      offset: 'lg:-translate-y-12', // Highest
    },
    {
      icon: FiCamera,
      title: 'Social Media & Photoshoots',
      eyebrow: 'Editorial brand presence',
      description: 'Professional content creation, graphics, and paid ads that capture attention and drive unparalleled engagement.',
      offset: 'lg:-translate-y-6', // Mid
    },
    {
      icon: FiTrendingUp,
      title: 'Performance Marketing',
      eyebrow: 'Measured conversion systems',
      description: 'Data-driven campaigns focused strictly on ROI and measurable, sustainable business growth.',
      offset: 'lg:translate-y-0', // Center (Lowest)
    },
    {
      icon: FiMic,
      title: 'Hoardings & Offline Marketing',
      eyebrow: 'Physical-world visibility',
      description: 'Strategic outdoor advertising placements for maximum brand visibility locally and beyond.',
      offset: 'lg:-translate-y-6', // Mid
    },
    {
      icon: FiGlobe,
      title: 'Website & SEO',
      eyebrow: 'Search-ready digital foundation',
      description: 'Professional, high-performing websites expertly optimized for search engines and unparalleled user experience.',
      offset: 'lg:-translate-y-12', // Highest
    }
  ];

  return (
    <section id="services" className="relative bg-white py-section overflow-hidden">
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
        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 lg:gap-4 items-center min-h-125">
          {services.map((service, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`relative flex w-full sm:w-[calc(50%-1.5rem)] lg:w-1/5 flex-col overflow-hidden rounded-4xl border border-border bg-transparent border-t-8 ${service.offset}`}
            >
              <div className="relative z-10 flex flex-col p-7 text-left md:p-8">
                <div className="mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <div className="mb-5 space-y-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {service.eyebrow}
                  </p>
                  <h3 className="text-xl font-semibold leading-tight tracking-tight text-secondary">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm font-light leading-relaxed text-foreground/70 sm:text-[15px]">
                  {service.description}
                </p>

              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
