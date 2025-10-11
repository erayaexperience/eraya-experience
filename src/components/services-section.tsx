"use client";

import {
  Users,
  Camera,
  TrendingUp,
  Megaphone,
  Search,
  Globe,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Heading from './ui/heading';
import Badge from './ui/badge';
import { Button } from './ui/button';

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Users,
      title: 'Influencer Marketing',
      description: 'High engagement & walk-in campaigns with authentic influencer partnerships that drive real results.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Micro & Macro Influencers', 'Campaign Strategy', 'Performance Tracking']
    },
    {
      icon: Camera,
      title: 'Social Media Marketing',
      description: 'Graphics, paid ads, and professional shoots that capture attention and drive engagement.',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Content Creation', 'Paid Advertising', 'Community Management']
    },
    {
      icon: Megaphone,
      title: 'Hoardings & Offline Marketing',
      description: 'High engagement, walk-in & visibility through strategic outdoor advertising placements.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Billboard Design', 'Location Strategy', 'Brand Visibility']
    },
    {
      icon: TrendingUp,
      title: 'Performance Marketing',
      description: 'Data-driven campaigns focused on ROI and measurable business growth.',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['ROI Optimization', 'Analytics & Reporting', 'Conversion Tracking']
    },
    {
      icon: Globe,
      title: 'Website/SEO Development',
      description: 'Professional websites optimized for search engines and user experience.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Responsive Design', 'SEO Optimization', 'Performance Monitoring']
    },
    {
      icon: Search,
      title: 'Event Curation/B2B',
      description: 'High engagement, walk-in & visibility through strategic event planning and B2B networking.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Event Planning', 'B2B Networking', 'Brand Activation']
    }
  ];

  const servicePromises = [
    {
      title: 'Strategy pods',
      description: 'A dedicated squad calibrates to your KPIs and market realities before we touch execution.',
    },
    {
      title: 'Human + AI craft',
      description: 'We pair AI-assisted tooling with senior editors to keep storytelling premium and on-brand.',
    },
    {
      title: 'Live visibility',
      description: 'Transparent dashboards, weekly syncs, and responsive tweaks keep momentum measurable.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="services" className="section-padding section-shell relative overflow-hidden" ref={ref}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 40% at 80% 0%, rgba(214,182,133,0.18), transparent 60%), radial-gradient(60% 40% at 0% 100%, rgba(22,36,81,0.1), transparent 60%)',
        }}
        aria-hidden
      />

      <div className="container-modern">
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Badge icon={<Zap className="mr-2 h-4 w-4 text-secondary/70" />} className="mx-auto">
              Our Services
            </Badge>
          </motion.div>
          <Heading
            as="h2"
            before="A focused suite of services for "
            gradient="modern brands"
            after=" to feel effortless."
            className="mx-auto max-w-3xl"
            subtitle="Strategy, craft, and production shaped by Apple's Human Interface principles."
          />
        </motion.div>

        <motion.div
          className="mx-auto mb-16 grid w-full gap-4 rounded-[30px] border border-[rgba(209,209,214,0.45)] bg-white/85 p-6 shadow-[0_22px_48px_rgba(15,23,42,0.08)] backdrop-blur-lg md:grid-cols-3 md:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {servicePromises.map((promise, index) => (
            <div key={promise.title} className="relative pr-0 md:pr-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
                {promise.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                {promise.description}
              </p>
              {index < servicePromises.length - 1 && (
                <span className="absolute -right-3 top-1/2 hidden h-9 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-foreground/10 to-transparent md:block" />
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service, index) => (
            <motion.article
              key={index}
              className="group flex h-full flex-col overflow-hidden rounded-3xl liquid-card glass-noise cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/20"
              variants={cardVariants}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.99 }}
              role="region"
              aria-labelledby={`service-${index}`}
            >
              <motion.div
                className="relative h-44 md:h-48 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent" />

                <div className="absolute top-5 left-5 w-11 h-11 liquid-glass hairline-border rounded-xl flex items-center justify-center">
                  <service.icon className="h-5 w-5 text-secondary" />
                </div>

                <div className="absolute top-5 right-5 w-9 h-9 liquid-glass hairline-border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="h-4 w-4 text-secondary" />
                </div>
              </motion.div>

              <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
                <div className="space-y-4">
                  <h3 id={`service-${index}`} className="text-xl font-semibold text-foreground md:text-2xl">
                  {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/65 md:text-base">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-foreground/60">
                        <span className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-primary/40" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between border-t border-white/60 pt-4 text-xs uppercase tracking-[0.22em] text-foreground/40">
                    <span>Service {String(index + 1).padStart(2, '0')}</span>
                    <Link
                      href="#contact"
                      className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-secondary/80 transition-transform duration-300 hover:translate-x-1"
                    >
                      Plan this
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.div
            className="liquid-glass hairline-border mx-auto max-w-3xl rounded-3xl p-8 md:max-w-4xl md:p-12"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 250, damping: 28 }}
          >
            <h3 className="mb-4 text-2xl font-semibold text-foreground md:text-4xl">Let&apos;s build something meaningful</h3>
            <p className="mb-6 text-base leading-relaxed text-foreground/65 md:mb-8 md:text-lg">
              Tell us your goals. We&apos;ll bring the craft.
            </p>
            <motion.div
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button type="button" size="lg" className="group inline-flex items-center gap-3 w-full sm:w-auto justify-center">
                Start your project
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
