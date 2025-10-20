"use client";

import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Layers,
  LineChart,
  Play,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Badge from './ui/badge';
import Heading from './ui/heading';
import { Button } from './ui/button';
import { caseStudies } from '@/data/case-studies';

const HeroSection = () => {
  const stats = [
    { value: '6+', label: 'Years orchestrating experience systems' },
    { value: '18', label: 'Brands we partner with across markets' },
    { value: '92', label: 'NPS from retained leadership teams' },
    { value: '4.8x', label: 'Average lift delivered inside 90 days' },
  ];

  const experienceHighlights = [
    {
      title: 'Experience architecture',
      description:
        'Service blueprints unite product, retail, and marketing touchpoints into one signature flow.',
      icon: <Sparkles className="h-5 w-5 text-secondary" />,
    },
    {
      title: 'Enterprise-grade systems',
      description:
        'Design languages ship as code-ready libraries so every squad releases with pixel fidelity.',
      icon: <Layers className="h-5 w-5 text-secondary" />,
    },
    {
      title: 'Decision-grade insights',
      description:
        'Behavioural data, instrumentation, and experimentation loops prove the uplift leadership expects.',
      icon: <LineChart className="h-5 w-5 text-secondary" />,
    },
  ];

  const heroCase = caseStudies[0];
  const heroCaseMetrics = heroCase.metrics.slice(0, 3);
  const heroCaseHighlights = heroCase.highlights.slice(0, 3);

  const trustedPartners = [
    'Snow Park Goa',
    'Beach Walk',
    'Mission Rabies',
    'You & Me Anjuna',
    'Dreamdays',
  ];

  return (
    <section className="section-shell relative overflow-hidden bg-gradient-to-b from-white via-white/90 to-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 -top-[35%] h-[520px] bg-[radial-gradient(circle_at_15%_20%,rgba(214,182,133,0.38),transparent_70%)] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_85%_15%,rgba(22,36,81,0.18),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='160' height='160' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='160' height='160' fill='none' stroke='rgba(29,29,31,0.07)' stroke-width='1'/%3E%3C/svg%3E\")",
            backgroundSize: '160px 160px',
          }}
        />
      </div>

      <div className="container-modern relative z-10 grid items-start gap-16 py-24 lg:grid-cols-[1.15fr_1fr] lg:gap-28 lg:py-28">
        <motion.div
          className="flex flex-col gap-10 text-center sm:text-left"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <Badge
                icon={<Sparkles className="h-4 w-4 text-secondary" />}
                className="bg-white/85"
              >
                Experience architecture studio
              </Badge>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-foreground/55 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary/80" />
                Since 2017
              </div>
            </div>
            <Heading
              as="h1"
              center={false}
              before="We choreograph"
              gradient="category-defining experiences"
              after=" that feel inevitable."
              className="text-balance sm:leading-[1.02]"
              subtitle="Eraya Experience partners with leadership teams to connect bold brand stories with product ecosystems, delivering journeys that feel premium, intuitive, and unmistakably yours."
            />
          </div>

          <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
            <Button asChild size="lg" className="group w-full sm:w-auto">
              <Link href="#contact" className="inline-flex items-center gap-3">
                Start a project
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="subtle"
              className="group w-full sm:w-auto"
            >
              <Link href="#portfolio" className="inline-flex items-center gap-3 text-foreground">
                Watch our reel
                <Play className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experienceHighlights.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/80 p-6 text-left shadow-[0_22px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-transform duration-500 ease-out hover:-translate-y-1"
              >
                <div className="relative z-10 flex flex-col gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary shadow-[0_12px_30px_rgba(22,36,81,0.12)] backdrop-blur">
                    {item.icon}
                  </span>
                  <p className="text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/65">
                    {item.description}
                  </p>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-secondary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>

          <motion.div
            className="mt-12 rounded-[28px] border border-white/70 bg-white/80 px-6 py-6 shadow-[0_24px_48px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground/45">
              Trusted by teams at
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-foreground/65 sm:text-base">
              {trustedPartners.map((brand) => (
                <span key={brand} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary/45" />
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-5 pt-4 text-left sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-[26px] border border-white/65 bg-white/75 px-6 py-5 shadow-[0_18px_42px_rgba(15,23,42,0.08)] backdrop-blur-xl"
              >
                <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.85rem]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative flex justify-center lg:justify-end lg:pl-12"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -left-28 top-6 hidden h-[420px] w-[420px] rounded-full bg-[rgba(214,182,133,0.28)] blur-3xl lg:block" />
          <motion.div
            className="relative w-full max-w-[620px]"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pointer-events-none absolute inset-x-8 -top-16 hidden h-40 rounded-full bg-gradient-to-r from-primary/30 via-secondary/20 to-transparent blur-3xl sm:block" />
            <div className="relative space-y-6 lg:space-y-0 lg:rounded-[48px] lg:bg-transparent lg:p-0">
              <div className="relative h-[400px] overflow-hidden rounded-[44px] border border-white/55 bg-white/85 shadow-[0_40px_90px_rgba(15,23,42,0.2)] backdrop-blur-3xl sm:h-[460px]">
                <Image
                  src={heroCase.image}
                  alt={heroCase.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary/45 via-secondary/20 to-transparent" />

                <div className="absolute left-6 top-6 inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/55 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-secondary/75 shadow-[0_10px_28px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  Case study / {heroCase.category}
                </div>

                <div className="absolute bottom-6 left-6 right-6 rounded-[30px] border border-white/50 bg-white/85 p-6 shadow-[0_30px_60px_rgba(15,23,42,0.16)] backdrop-blur-2xl">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
                        Featured case study
                      </p>
                      <p className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                        {heroCase.title}
                      </p>
                      <p className="text-sm text-foreground/60">{heroCase.subtitle}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {heroCaseMetrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-[22px] border border-white/60 bg-white/80 px-4 py-3 text-left shadow-[0_18px_36px_rgba(15,23,42,0.12)]"
                        >
                          <p className="text-lg font-semibold tracking-tight text-secondary">
                            {metric.value}
                          </p>
                          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 border-t border-white/60 pt-4 text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em]">
                      <span>Duration</span>
                      <span className="rounded-full bg-secondary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.24em] text-secondary">
                        {heroCase.duration}
                      </span>
                      <span className="hidden h-1 w-1 rounded-full bg-foreground/30 sm:inline-flex" />
                      <span>Outcome: {heroCase.roi}</span>
                    </div>
                    <Link
                      href="#case-studies"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-secondary/80"
                    >
                      View full project
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <motion.div
                className="relative z-10 mt-6 rounded-[32px] border border-white/60 bg-white/85 p-6 text-left shadow-[0_24px_52px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:max-w-[360px] sm:rounded-[36px] sm:p-7 lg:absolute lg:-right-12 lg:top-14 lg:mt-0"
                initial={{ opacity: 0, x: 30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/45">
                  Highlight reel
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/65">
                  {heroCaseHighlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-secondary/55" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-white/70 bg-white/80 px-7 py-3 text-sm font-medium text-foreground/60 shadow-[0_22px_44px_rgba(15,23,42,0.12)] backdrop-blur-xl md:flex"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="uppercase tracking-[0.26em] text-[11px] text-foreground/45">
          Scroll
        </span>
        <span className="h-px w-8 bg-foreground/15" />
        <Link href="#services" className="inline-flex items-center gap-2 text-foreground/75">
          Explore the studio
          <ChevronDown className="h-4 w-4 animate-bounce text-secondary/70" aria-hidden />
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
