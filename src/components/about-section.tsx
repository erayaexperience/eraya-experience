"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Users, Target, Zap, MapPin } from 'lucide-react';
import Heading from './ui/heading';
import Badge from './ui/badge';

const AboutSection = () => {
  const stats = [
    { label: 'Years Experience', value: '6+', icon: Target },
    { label: 'Successfully Grown', value: '18+', icon: Award },
    { label: 'Creative Heads', value: '11+', icon: Users },
    { label: 'Pan India Reach', value: '100%', icon: MapPin },
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

  const principles = [
    'Audience-first storytelling',
    'Premium craft & polish',
    'Always-on measurement',
    'Partnership over vendor mindset',
  ];

  return (
    <section
      id="about"
      className="section-padding section-shell relative overflow-hidden bg-gradient-to-b from-[#f5f5f7] via-white to-[#f5f5f7]"
    >
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary/12 blur-3xl"></div>

      <div className="container-modern">
        <div className="mb-20 text-center">
          <div className="mb-8">
            <Badge icon={<Zap className="mr-2 h-4 w-4 text-secondary/70" />} className="mx-auto">
              About Eraya Experience
            </Badge>
          </div>

          <Heading as="h2" before="KPI's about " gradient="Eraya Experience" />
        </div>

        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <div>
            <p className="mb-8 text-2xl leading-relaxed text-foreground md:text-3xl">
              We help brands grow with social media management and influencer marketing that boost visibility.
            </p>
            <p className="mb-12 text-base leading-relaxed text-foreground/65 md:text-lg">
              From eye-catching hoardings and creative photoshoots to result-driven ads and paid campaigns, we cover it all. Our B2B strategies and workshops build stronger connections, while our focus on ROI marketing ensures every effort delivers real growth.
            </p>

            <div className="mb-12 flex flex-wrap gap-3">
              {principles.map((principle) => (
                <span
                  key={principle}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(209,209,214,0.6)] bg-white/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55 shadow-[0_12px_26px_rgba(15,23,42,0.08)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary/50" />
                  {principle}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-8 text-center sm:text-left">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-[28px] border border-[rgba(209,209,214,0.5)] bg-white/90 p-6 text-center shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_56px_rgba(15,23,42,0.14)]"
                >
                  <stat.icon className="mx-auto mb-4 h-8 w-8 text-secondary/70 transition-transform duration-300 group-hover:scale-110" />
                  <div className="mb-2 text-4xl font-semibold text-foreground transition-transform duration-300 group-hover:scale-105">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div className="image-reveal overflow-hidden rounded-[40px] border border-[rgba(209,209,214,0.6)] bg-white/80 shadow-[0_38px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl">
              <div className="relative h-[460px] w-full md:h-[560px]">
                <Image
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Eraya Experience team at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 520px"
                  priority
                />
              </div>
            </motion.div>

            <motion.div className="floating-element absolute -bottom-8 -left-8 rounded-[24px] border border-[rgba(209,209,214,0.6)] bg-white/90 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.12)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-secondary/70" />
                <div>
                  <div className="font-semibold text-foreground">Pan India</div>
                  <div className="text-sm text-foreground/60">Reach & Presence</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-24">
          <div className="mb-16 text-center">
            <h3 className="mb-6 text-4xl font-semibold text-foreground md:text-5xl">Our expertise</h3>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/60">
              Comprehensive digital marketing services tailored to your business needs.
            </p>
          </div>

          <div className="rounded-3xl border border-[rgba(209,209,214,0.6)] bg-white/90 p-12 text-center shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
            <div className="flex flex-wrap justify-center gap-4">
              {services.map((service) => (
                <div
                  key={service}
                  className="rounded-full border border-[rgba(209,209,214,0.6)] bg-white px-6 py-3 text-sm font-semibold tracking-[0.08em] text-foreground/70 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h3 className="mb-6 text-4xl font-semibold text-foreground md:text-5xl">Industries we have worked in</h3>
          <p className="mx-auto mb-16 max-w-2xl text-lg leading-relaxed text-foreground/60">
            Our diverse portfolio spans across multiple industries, delivering tailored solutions for each sector.
          </p>

          <div className="grid grid-cols-2 gap-8 text-left md:grid-cols-3">
            {industries.map((industry) => (
              <motion.div
                key={industry.name}
                className="group modern-card h-full overflow-hidden"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src={industry.image}
                      alt={industry.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 240px"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/25 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <h4 className="text-2xl font-medium text-white">{industry.name}</h4>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-relaxed text-foreground/65">{industry.description}</p>
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
