"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Award } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Heading from './ui/heading';
import Badge from './ui/badge';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  metrics: Array<{ label: string; value: string }>;
  highlights: string[];
  services: string[];
  duration: string;
  roi: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: 'you-and-me-anjuna',
    title: 'You And Me Anjuna',
    subtitle: 'Restaurant social transformation',
    category: 'Social Media Marketing',
    description:
      'A nimble, stock-first content system rebuilt their feed with emotion-led storytelling and a cadence that feels effortless.',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600',
    metrics: [
      { label: 'Follower growth', value: '+18.5%' },
      { label: 'Engagement lift', value: '+340%' },
      { label: 'Total reach', value: '10K+' },
      { label: 'Posts shipped', value: '12' },
    ],
    highlights: [
      'Optimised and set up Google Business Profile',
      'Reworked the feed with cohesive art direction',
      'Delivered 12 high-performing post templates',
      'Unlocked consistent organic follower growth',
    ],
    services: ['Social Media Management', 'Content Creation', 'GMB Optimization', 'Account Setup'],
    duration: '3 months',
    roi: 'High engagement & walk-in',
  },
  {
    id: 'snow-park-goa',
    title: 'Snow Park Goa',
    subtitle: 'Entertainment venue growth campaign',
    category: 'Influencer Marketing',
    description:
      'A blended influencer and paid push that injected energy, broadened awareness, and converted online buzz into footfall.',
    image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1600',
    metrics: [
      { label: 'Followers gained', value: '+108' },
      { label: 'Walk-in lift', value: '+20%' },
      { label: 'Campaign reach', value: '50M+' },
      { label: 'Engagement status', value: 'High' },
    ],
    highlights: [
      '20% increase in walk-in traffic from social',
      'Influencer amplification delivered 50M+ reach',
      'Optimised creative direction for shareability',
      'Strengthened top-of-mind awareness across Goa',
    ],
    services: ['Influencer Marketing', 'Social Media Marketing', 'ROI Marketing', 'Brand Awareness'],
    duration: '4 months',
    roi: 'High engagement & visibility',
  },
  {
    id: 'beach-walk-resort',
    title: 'Beach Walk Resort',
    subtitle: 'Luxury resort digital reset',
    category: 'Digital Marketing',
    description:
      'End-to-end digital transformation anchored in premium content, streamlined analytics, and a bookings-focused funnel.',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600',
    metrics: [
      { label: 'Profile activity', value: '+26.8%' },
      { label: 'Profile visits', value: '+19.1%' },
      { label: 'Views generated', value: '80,404' },
      { label: 'External taps', value: '+1,900%' },
    ],
    highlights: [
      'Shot and edited premium resort storytelling',
      '87.5% of total views delivered via paid optimisation',
      'Sharp measurement model informed conversion tweaks',
      'Sustained uplift in on-site bookings and inquiries',
    ],
    services: ['Content Production', 'Performance Marketing', 'Paid Media', 'Analytics'],
    duration: '6 months',
    roi: 'Bookings & conversions uplift',
  },
];

const CaseStudiesSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' });
  const [activeCase, setActiveCase] = useState(0);

  const currentCase = caseStudies[activeCase];

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#f5f5f7] to-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-20 h-[320px] bg-[radial-gradient(circle_at_top,_rgba(214,182,133,0.2),_transparent_70%)]" />
      </div>

      <div className="container-modern relative z-10 py-28">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge className="w-fit">Case Studies</Badge>
            <Heading
              as="h2"
              center={false}
              before="Proof that human-first craft drives"
              gradient="measurable movement"
              after="for ambitious brands."
              className="max-w-xl"
            />
            <p className="max-w-xl text-base leading-relaxed text-foreground/65">
              Each engagement pairs Apple&apos;s Human Interface principles with operational clarity. Tap a case to explore
              the orchestration and the numbers.
            </p>

            <div className="mt-12 space-y-3">
              {caseStudies.map((item, index) => {
                const isActive = index === activeCase;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveCase(index)}
                    className={cn(
                      'w-full rounded-[26px] border border-[rgba(209,209,214,0.65)] bg-white/85 px-6 py-5 text-left transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(15,23,42,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                      isActive &&
                        'border-transparent bg-primary text-white shadow-[0_28px_56px_rgba(22,36,81,0.32)] hover:shadow-[0_32px_72px_rgba(22,36,81,0.35)]'
                    )}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div>
                        <p
                          className={cn(
                            'text-xs font-semibold uppercase tracking-[0.16em]',
                            isActive ? 'text-white/70' : 'text-foreground/50'
                          )}
                        >
                          {item.category}
                        </p>
                        <p
                          className={cn(
                            'mt-2 text-lg font-semibold tracking-tight',
                            isActive ? 'text-white' : 'text-foreground'
                          )}
                        >
                          {item.title}
                        </p>
                      </div>
                      <ArrowUpRight
                        className={cn(
                          'h-5 w-5 transition-transform duration-300',
                          isActive ? 'text-white' : 'text-secondary/70'
                        )}
                      />
                    </div>
                    <p
                      className={cn(
                        'mt-3 text-sm leading-relaxed',
                        isActive ? 'text-white/80' : 'text-foreground/60'
                      )}
                    >
                      {item.subtitle}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.article
              key={currentCase.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <motion.div
                className="relative overflow-hidden rounded-[40px] border border-[rgba(209,209,214,0.5)] bg-white/95 shadow-[0_28px_64px_rgba(15,23,42,0.14)] backdrop-blur-xl"
              >
                <div className="relative h-[320px] w-full sm:h-[380px] lg:h-[420px]">
                  <Image
                    src={currentCase.image}
                    alt={currentCase.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 560px"
                    priority={currentCase.id === 'you-and-me-anjuna'}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(22,36,81,0.22)] via-transparent to-white/35" />
                <div className="absolute bottom-6 left-6 rounded-[24px] bg-white/90 px-5 py-3 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">
                    {currentCase.duration}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{currentCase.roi}</p>
                </div>
              </motion.div>

              <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    What we put into the world
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/65">{currentCase.description}</p>
                  <ul className="space-y-3">
                    {currentCase.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-sm text-foreground/70">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-secondary/50" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">Key metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {currentCase.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-[24px] border border-[rgba(209,209,214,0.5)] bg-white/85 p-5 shadow-[0_16px_32px_rgba(15,23,42,0.08)]"
                      >
                        <p className="text-2xl font-semibold tracking-tight text-foreground">{metric.value}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.16em] text-foreground/50">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[26px] border border-[rgba(209,209,214,0.5)] bg-white/90 p-6 shadow-[0_18px_36px_rgba(15,23,42,0.1)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">Services</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {currentCase.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full border border-[rgba(209,209,214,0.6)] bg-white px-4 py-2 text-xs font-semibold tracking-[0.08em] text-foreground/70"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="group w-full sm:w-auto justify-center">
                  <Link href="#contact" className="inline-flex items-center gap-3">
                    Plan a similar launch
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="inline-flex items-center justify-center gap-3 text-foreground/70 w-full sm:w-auto"
                >
                  <Award className="h-5 w-5 text-secondary/70" />
                  Download credentials deck
                </Button>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;


