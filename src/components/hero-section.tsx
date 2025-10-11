"use client";

import { ArrowRight, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Badge from './ui/badge';
import Heading from './ui/heading';
import { Button } from './ui/button';

const HeroSection = () => {

  const stats = [
    { value: '6+', label: 'Years crafting experiences' },
    { value: '18+', label: 'Brands we have elevated' },
    { value: '11', label: 'Specialists in-house' },
    { value: 'Pan India', label: 'Presence and reach' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-transparent via-white to-white">
      <div className="pointer-events-none absolute inset-x-0 top-[-30vh] h-[90vh] bg-[radial-gradient(circle_at_top,_rgba(214,182,133,0.24),_transparent_65%)]" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-[320px] w-[320px] rounded-full bg-[rgba(22,36,81,0.12)] blur-3xl" />

      <div className="container-modern relative z-10 grid min-h-[85vh] items-center gap-20 py-24 lg:grid-cols-[1.05fr_1fr]">
        <motion.div
          className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge icon={<Sparkles className="h-4 w-4 text-secondary" />} className="mx-auto sm:mx-0">
            Human-first experience studio
          </Badge>

          <Heading
            as="h1"
            before="We craft digital moments that make"
            gradient="brands feel native"
            after="everywhere."
            className="max-w-2xl mx-auto text-balance sm:mx-0 sm:text-left"
            subtitle="Eraya Experience pairs brand strategy with product craft to design interfaces that feel unmistakably intuitive and unmistakably premium."
          />

          <div className="mt-8 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
            <Button asChild size="lg" className="group w-full sm:w-auto">
              <Link href="#contact" className="inline-flex items-center gap-3">
                Start a project
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="subtle"
              className="group w-full text-foreground sm:w-auto"
            >
              <Link href="#portfolio" className="inline-flex items-center gap-3">
                View our work
                <Play className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-10 gap-y-8 text-center sm:text-left sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.value} className="space-y-1.5">
                <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {stat.value}
                </p>
                <p className="text-sm leading-relaxed text-foreground/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative flex justify-end"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -left-24 top-10 hidden h-[360px] w-[360px] rounded-full bg-[rgba(214,182,133,0.22)] blur-3xl lg:block" />
          <motion.div className="relative mx-auto w-full max-w-[580px] lg:mx-0">
            <div className="relative h-[360px] overflow-hidden rounded-[40px] border border-[rgba(209,209,214,0.5)] bg-white/95 shadow-[0_28px_64px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:h-[420px]">
              <Image
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Modern workspace with designers collaborating"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 540px"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(22,36,81,0.24)] via-transparent to-white/40" />
            </div>

            <motion.div
              className="pointer-events-none absolute -bottom-8 left-1/2 w-[260px] -translate-x-1/2 rounded-[28px] border border-[rgba(209,209,214,0.5)] bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.15)] backdrop-blur-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-sm font-semibold text-foreground">
                Latest launch
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                128% uplift
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-foreground/50">
                Conversion rate
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-secondary">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="text-sm leading-tight text-foreground/70">
                  Apple-aligned journeys built end-to-end.
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
