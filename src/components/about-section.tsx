"use client";

import Image from 'next/image';
import { FiAward, FiUsers, FiTarget, FiMapPin } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from './ui/section-heading';

const AboutSection = () => {
  const stats = [
    { label: 'Years Experience', value: '6+', icon: FiTarget },
    { label: 'Successfully Grown', value: '18+', icon: FiAward },
    { label: 'Creative Heads', value: '11+', icon: FiUsers },
    { label: 'Pan India Reach', value: '100%', icon: FiMapPin },
  ];

  const industries = [
    {
      name: 'F&B',
      description: 'Restaurants, cafes, and food delivery services',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Hospitality',
      description: 'Hotels, resorts, and travel experiences',
      image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Healthcare',
      description: 'Medical services and wellness brands',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Fashion',
      description: 'Clothing, accessories, and lifestyle brands',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Finance',
      description: 'Banking, investment, and financial services',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Utility/Stores',
      description: 'Retail, e-commerce, and utility services',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const services = [
    'Social Media Management',
    'Influencer Marketing',
    'Hoardings',
    'Photoshoots',
    'ADS/Paid Marketing',
    'B2B',
    'Workshops',
    'ROI Marketing',
  ];

  return (
    <section id="about" className="bg-white py-(--spacing-section)">
      <div className="container-modern">
        {/* Header */}
        <SectionHeading
          subtitle="About Eraya Experience"
          title={
            <>
              KPIs that <span className="text-primary italic font-serif">matter</span>
            </>
          }
          layout="center"
        />

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-medium leading-[1.3] text-foreground sm:text-4xl">
              We help brands grow with strategic social media management and bespoke campaigns.
            </h3>
            <p className="mt-8 text-lg leading-relaxed text-foreground/70 font-light">
              From eye-catching hoardings and creative photoshoots to result-driven ads and paid campaigns, we encompass the entire brand spectrum. Our B2B strategies and dynamic workshops build lasting connections, while our pure focus on measurable ROI ensures every marketing endeavor propels concrete growth.
            </p>

            {/* Stats Grid */}
            <div className="mt-16 grid grid-cols-2 gap-6 sm:gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group rounded-[24px] border border-border/40 bg-white p-8 relative overflow-hidden transition-colors hover:border-primary/30"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
                  <stat.icon className="h-8 w-8 text-secondary mb-6" strokeWidth={1.5} />
                  <p className="text-4xl font-semibold text-foreground tracking-tight mb-2">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-wider font-medium text-foreground/50">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-[600px] overflow-hidden rounded-[32px] border border-border/40 shadow-2xl shadow-black/5">
              <Image
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Eraya Experience team at work"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-8 -left-8 rounded-[24px] border border-white/20 bg-white/90 backdrop-blur-xl p-8 shadow-2xl hidden lg:block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-white shadow-inner">
                  <FiMapPin className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground tracking-tight">Pan India</p>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/50 mt-1">Presence</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Expertise Container */}
        <motion.div
          className="mt-(--spacing-inner) rounded-[3rem] bg-background border border-border/40 p-12 lg:p-24 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <SectionHeading
            title="Our Expertise"
            description="Comprehensive digital marketing pipelines tailored exactly to your brand's narrative."
            layout="center"
            className="mb-(--spacing-component) relative z-10"
          />

          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            {services.map((service, i) => (
              <motion.span
                key={service}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-full border border-border/60 bg-white px-8 py-4 text-sm font-medium tracking-wide text-foreground/80 hover:bg-secondary hover:text-white hover:border-secondary transition-all cursor-default shadow-sm"
              >
                {service}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Industries */}
        <div className="mt-(--spacing-inner)">
          <SectionHeading
            subtitle="Sectors"
            title={
              <>
                Industries We <span className="text-primary italic font-serif">Serve</span>
              </>
            }
            description="Delivering tailored solutions across diverse and highly competitive sectors."
            layout="center"
            className="mb-20"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.name}
                className="group relative h-[320px] overflow-hidden rounded-[24px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h4 className="text-2xl font-medium text-white mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">{industry.name}</h4>
                  <p className="text-white/70 font-light opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out translate-y-4 group-hover:translate-y-0">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
