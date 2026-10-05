"use client";

import { useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { getLenis } from '@/lib/lenis';
import { createStepScroller } from '@/lib/step-scroller';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

type Service = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  imagePosition?: string;
};

const services: Service[] = [
  {
    title: 'Graphic & Logo Design',
    eyebrow: 'Identity that sticks',
    description: 'Logos, posters and campaign graphics with a point of view, recognised in a second and remembered long after.',
    image: '/images/graphics/lilliput-saturday-blockbuster-tv.jpg',
  },
  {
    title: 'Photoshoots',
    eyebrow: 'Content worth stopping for',
    description: 'Food, drinks, fashion and lifestyle shoots, styled and lit so your product is the hero of every frame.',
    image: '/images/services/photoshoots.jpg',
  },
  {
    title: 'Social Media Marketing',
    eyebrow: 'Feeds with a strategy',
    description: 'Pages planned around your audience and your goals. Consistent, aesthetic and always on brand.',
    image: '/images/graphics/sukkha-instagram-feed.jpg',
    imagePosition: 'center 30%',
  },
  {
    title: 'Meta & Google Ads',
    eyebrow: 'Paid media, measured',
    description: 'Ads built around one number: your return. Every rupee tracked, every campaign sharpened.',
    image: pexels(6569661),
  },
  {
    title: 'Influencer Marketing',
    eyebrow: 'Voices people trust',
    description: 'The right creators for your brand, matched to your audience so people talk, share and show up.',
    image: '/images/services/influencer-marketing.jpg',
    imagePosition: 'center 35%',
  },
  {
    title: 'Brand Kits',
    eyebrow: 'Everything, on brand',
    description: 'Logo, colours, type and branded essentials in one complete kit, so you look the same everywhere you show up.',
    image: '/images/services/brand-kits.jpg',
    imagePosition: '55% center',
  },
  {
    title: 'Website & SEO',
    eyebrow: 'Found, then chosen',
    description: 'Fast, beautiful websites built to rank on Google and turn visitors into customers.',
    image: pexels(574077),
  },
];

const STEP = 360 / services.length;
const GAP = 0.05;
const RADIUS = (1 + GAP) / (2 * Math.tan(Math.PI / services.length));

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = services[active];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const steps = services.length - 1;
        let scroller: ReturnType<typeof createStepScroller> | null = null;
        const tween = gsap.to(ringRef.current, {
          rotateY: -STEP * steps,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${steps * window.innerHeight * 0.42}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (scroller?.isAnimating()) return;
              const next = Math.round(self.progress * steps);
              setActive((prev) => (prev === next ? prev : next));
            },
          },
        });

        const lenis = getLenis();
        if (!lenis || !tween.scrollTrigger) return;
        scroller = createStepScroller({
          trigger: tween.scrollTrigger,
          lenis,
          steps,
          onStep: (step) => setActive(step),
        });
        const settle = () => scroller?.settle();
        ScrollTrigger.addEventListener('scrollEnd', settle);

        return () => {
          ScrollTrigger.removeEventListener('scrollEnd', settle);
          scroller?.destroy();
        };
      });
    },
    { scope: sectionRef }
  );

  return (
    <div>
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-white will-change-transform motion-safe:h-svh motion-reduce:py-section"
    >
      <div className="pointer-events-none absolute top-[60%] left-1/2 h-[72rem] w-[72rem] -translate-1/2 bg-[radial-gradient(closest-side,rgb(var(--primary)/0.16),transparent)]" />

      <div className="container-modern relative grid h-full content-center items-center gap-8 pt-20 pb-6 sm:gap-10 lg:grid-cols-12 lg:gap-10 lg:py-0 motion-reduce:hidden">
        <div className="text-center lg:col-span-5 lg:text-left">
          <div className="mb-4 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">Core Expertise</span>
          </div>
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-secondary sm:text-5xl lg:text-[44px] xl:text-[56px]">
            The Feeling Is <span className="font-serif italic text-primary">Mutual</span>
          </h2>

          <div className="relative mt-6 min-h-44 lg:mt-12 lg:min-h-64">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeOut' } }}
              >
                <div className="flex items-baseline justify-center gap-3 lg:justify-start">
                  <span className="font-serif text-5xl italic leading-none text-primary lg:text-7xl">
                    {String(active + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium text-foreground/35">/ {String(services.length).padStart(2, '0')}</span>
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{current.eyebrow}</p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-secondary lg:text-4xl">{current.title}</h3>
                <p className="mx-auto mt-3 hidden max-w-md text-base font-light leading-relaxed text-foreground/65 sm:block lg:mx-0 lg:text-lg">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div
          aria-hidden
          className="relative order-first h-[40svh] perspective-[1600px] [--panel-h:30svh] [--panel-w:min(56vw,15rem)] sm:h-[42svh] sm:[--panel-h:31svh] sm:[--panel-w:16rem] lg:order-none lg:col-span-7 lg:h-[72svh] lg:[--panel-h:54svh] lg:[--panel-w:clamp(14rem,19vw,19rem)]"
        >
          <div className="absolute inset-0 transform-3d [transform:rotateX(-6deg)]">
            <div ref={ringRef} className="absolute inset-0 transform-3d will-change-transform">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  style={{ transform: `rotateY(${index * STEP}deg) translateZ(calc(var(--panel-w) * ${RADIUS.toFixed(4)}))` } as CSSProperties}
                  className="absolute inset-0 m-auto h-(--panel-h) w-(--panel-w) overflow-hidden rounded-2xl bg-secondary ring-1 ring-black/5 backface-hidden lg:rounded-3xl"
                >
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 304px, (min-width: 640px) 256px, 56vw"
                    className="object-cover"
                    style={{ objectPosition: service.imagePosition }}
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-transparent" />
                  <span className="absolute top-4 left-5 font-serif text-4xl italic leading-none text-white/45 md:top-6 md:left-7 md:text-5xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div
                    className={cn(
                      'absolute inset-0 bg-white/40 transition-opacity duration-700 will-change-[opacity]',
                      index === active ? 'opacity-0' : 'opacity-100'
                    )}
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-modern hidden space-y-6 motion-reduce:block">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-secondary sm:text-5xl">
          The Feeling Is <span className="font-serif italic text-primary">Mutual</span>
        </h2>
        {services.map((service) => (
          <article key={service.title} className="relative overflow-hidden rounded-3xl bg-secondary p-8 text-white">
            <Image src={service.image} alt="" fill sizes="100vw" className="object-cover opacity-40" style={{ objectPosition: service.imagePosition }} />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{service.eyebrow}</p>
              <h3 className="mt-2 text-2xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-white/80">{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
    </div>
  );
};

export default ServicesSection;
