"use client";

import {
  Users,
  Camera,
  TrendingUp,
  Megaphone,
  Search,
  Globe,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { SectionHeading } from './ui/section-heading';

const ServicesSection = () => {
  const services = [
    {
      icon: Users,
      title: 'Influencer Marketing',
      description: 'High engagement campaigns with authentic influencer partnerships that drive real results.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Camera,
      title: 'Social Media Marketing',
      description: 'Graphics, paid ads, and professional content that captures attention and drives engagement.',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Megaphone,
      title: 'Hoardings & Offline Marketing',
      description: 'Strategic outdoor advertising placements for maximum brand visibility locally and beyond.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: TrendingUp,
      title: 'Performance Marketing',
      description: 'Data-driven campaigns focused strictly on ROI and measurable, sustainable business growth.',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Globe,
      title: 'Website & SEO',
      description: 'Professional, high-performing websites expertly optimized for search engines and unparalleled user experience.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      icon: Search,
      title: 'Event Curation',
      description: 'Strategic event planning, execution, and extensive B2B networking for ultimate brand activation.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    }
  ];

  return (
    <section id="services" className="relative bg-background py-(--spacing-section) overflow-hidden">
      <div className="container-modern relative z-10">
        {/* Header */}
        <SectionHeading
          subtitle="Core Expertise"
          title={
            <>
              Services that <br />
              <span className="text-primary italic font-serif pr-2">drive growth</span>
            </>
          }
          description="A meticulously focused suite of marketing services designed to help modern premium brands succeed and scale."
          layout="split"
        />

        {/* Services Grid */}
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-[24px] bg-white border border-border/40 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 mix-blend-multiply" />

                {/* Icon Overlay */}
                <div className="absolute top-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 backdrop-blur shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
                  <service.icon className="h-6 w-6 text-secondary" />
                </div>
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-grow p-8 sm:p-10">
                <h3 className="text-2xl font-medium text-foreground mb-4 transition-colors group-hover:text-secondary">
                  {service.title}
                </h3>
                <p className="text-foreground/70 font-light leading-relaxed mb-10 flex-grow">
                  {service.description}
                </p>

                <div className="mt-auto">
                  <Link
                    href="#contact"
                    className="group/link inline-flex items-center gap-3 text-sm font-semibold tracking-wide uppercase text-secondary relative"
                  >
                    <span className="relative z-10 transition-colors group-hover/link:text-primary">Learn more</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/5 transition-all duration-300 group-hover/link:bg-primary group-hover/link:text-white">
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Call To Action Banner */}
        <motion.div
          className="mt-(--spacing-inner) relative overflow-hidden rounded-[2.5rem] bg-secondary text-white shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Abstract decorative shapes */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 px-8 py-20 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="max-w-2xl">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-6 text-white leading-tight">
                Ready to elevate your <span className="text-primary italic font-serif">brand's legacy?</span>
              </h3>
              <p className="text-white/80 text-lg sm:text-xl font-light leading-relaxed">
                Let's discuss how our tailored marketing strategies can accelerate your growth and transform your vision into reality.
              </p>
            </div>

            <div className="shrink-0 relative">
              <Button asChild variant="secondary" className="group">
                <Link href="#contact" className="inline-flex items-center gap-3 font-semibold">
                  Start a project
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
