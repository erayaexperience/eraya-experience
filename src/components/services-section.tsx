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
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Heading from './ui/heading';
import Badge from './ui/badge';

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
    <section id="services" className="section-padding relative overflow-hidden" ref={ref}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 40% at 80% 0%, rgba(214,182,133,0.12), transparent 60%), radial-gradient(60% 40% at 0% 100%, rgba(22,36,81,0.10), transparent 60%)'
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
            <Badge icon={<Zap className="w-4 h-4 mr-2 text-eraya-navy/60" />}>Our Services</Badge>
          </motion.div>
          <Heading
            as="h2"
            before="Use our expert services to "
            gradient="kick boost"
            after=" your brand"
            subtitle="A focused suite of services to shape exceptional brand experiences."
          />
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
              className="group liquid-card glass-noise rounded-3xl overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-eraya-navy/20 focus-within:outline-none"
              variants={cardVariants}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.99 }}
              role="region"
              aria-labelledby={`service-${index}`}
            >
              <div className="relative h-44 md:h-48 overflow-hidden">
                <motion.img
                  src={service.image}
                  alt=""
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent" />

                <div className="absolute top-5 left-5 w-11 h-11 liquid-glass hairline-border rounded-xl flex items-center justify-center">
                  <service.icon className="w-5 h-5 text-eraya-navy" />
                </div>

                <div className="absolute top-5 right-5 w-9 h-9 liquid-glass hairline-border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4 text-eraya-navy" />
                </div>
              </div>

              <div className="p-6 md:p-7">
                <h3 id={`service-${index}`} className="text-xl md:text-2xl font-medium text-eraya-navy mb-3">
                  {service.title}
                </h3>
                <p className="text-eraya-navy/60 font-light leading-relaxed mb-5">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-eraya-navy/60">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-eraya-beige mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
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
            className="liquid-glass hairline-border rounded-3xl p-8 md:p-12 max-w-3xl md:max-w-4xl mx-auto"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 250, damping: 28 }}
          >
            <h3 className="text-2xl md:text-4xl font-light text-eraya-navy mb-4">Let’s build something meaningful</h3>
            <p className="text-base md:text-lg text-eraya-navy/60 mb-6 md:mb-8 font-light">
              Tell us your goals. We’ll bring the craft.
            </p>
            <motion.button
              className="liquid-button text-white px-7 md:px-8 py-3.5 md:py-4 rounded-2xl font-medium group text-base md:text-lg inline-flex items-center"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Start your project
              <ArrowUpRight className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;