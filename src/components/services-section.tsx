"use client";

import { useRef, useState, useCallback, type CSSProperties } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { snapWithLenis } from '@/lib/lenis-snap';

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

const LAST = services.length - 1;
const STEP = 360 / services.length;
const GAP = 0.05;
const RADIUS = (1 + GAP) / (2 * Math.tan(Math.PI / services.length));

// Desktop scroll choreography
const HOLD = 0.2;
const LEAD = 0.3;
const SWING = 0.5;
const SPAN = LAST + 2 * LEAD;

const clampCard = gsap.utils.clamp(0, LAST);

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const swingRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const isAnimatingRef = useRef(false);
  const activeRef = useRef(active);
  activeRef.current = active;

  // Discrete mobile 1-card navigation with gesture throttling
  const goToCard = useCallback((targetIndex: number) => {
    const next = clampCard(targetIndex);
    if (next === activeRef.current && !isAnimatingRef.current) return;
    const ring = ringRef.current;
    if (!ring) return;

    isAnimatingRef.current = true;
    setActive(next);
    gsap.to(ring, {
      rotationY: -next * STEP,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  }, []);

  // Mobile horizontal swipe handling: strictly 1 card advancement per swipe
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    // Trigger only if horizontal swipe intent is clear
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        goToCard(activeRef.current + 1);
      } else {
        goToCard(activeRef.current - 1);
      }
    }
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      const swing = swingRef.current;
      const ring = ringRef.current;
      if (!section || !stage || !swing || !ring) return;

      const mm = gsap.matchMedia();

      // Desktop: Cinematic pinned scroll scrub
      mm.add('(min-width: 1024px)', () => {
        const turns = gsap.timeline({
          defaults: { ease: 'sine.inOut', duration: 1 - 2 * HOLD },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${section.offsetHeight - stage.offsetHeight}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            const next = clampCard(Math.round(-Number(gsap.getProperty(ring, 'rotationY')) / STEP));
            setActive((prev) => (prev !== next ? next : prev));
          },
        });

        for (let card = 1; card <= LAST; card++) {
          turns.to(ring, { rotationY: -card * STEP }, LEAD + card - 1 + HOLD);
        }
        turns.set({}, {}, SPAN);

        gsap.fromTo(
          swing,
          { rotationY: SWING * STEP },
          { rotationY: 0, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: 0.5 } }
        );
        gsap.fromTo(
          swing,
          { rotationY: 0 },
          {
            rotationY: -SWING * STEP,
            ease: 'power2.in',
            immediateRender: false,
            scrollTrigger: { trigger: section, start: 'bottom bottom', end: 'bottom top', scrub: 0.5 },
          }
        );

        return snapWithLenis(turns.scrollTrigger!, (progress, direction) => {
          const position = clampCard(progress * SPAN - LEAD);
          if (Math.abs(position - Math.round(position)) <= HOLD) return null;
          return ((direction > 0 ? Math.ceil(position) : Math.floor(position)) + LEAD) / SPAN;
        });
      });

      // Mobile: Ensure clean orientation without residual scroll offsets
      mm.add('(max-width: 1023px)', () => {
        gsap.set(swing, { rotationY: 0 });
        gsap.set(ring, { rotationY: -activeRef.current * STEP });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ '--span': SPAN } as CSSProperties}
      className="relative bg-white py-16 sm:py-24 lg:py-0 lg:[--card:40svh] lg:h-[calc(100svh+var(--span)*var(--card))] lg:scroll-mt-[calc(var(--header-height)*-1)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background to-white sm:h-32" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-white sm:h-32" />

      <div ref={stageRef} className="relative overflow-hidden lg:sticky lg:top-0 lg:h-svh">
        <div className="pointer-events-none absolute top-[60%] left-1/2 h-200 w-200 -translate-1/2 bg-[radial-gradient(closest-side,rgb(var(--primary)/0.16),transparent)] lg:h-288 lg:w-6xl" />

        <div className="container-modern relative grid h-full content-center items-center gap-8 pt-4 pb-6 sm:gap-10 sm:pt-12 lg:grid-cols-12 lg:gap-10 lg:py-0">
          {/* Service Information */}
          <div className="text-center lg:col-span-5 lg:text-left">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">Core Expertise</span>
              <span className="h-px w-8 bg-primary" />
            </div>
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight text-secondary sm:text-5xl lg:text-[44px] xl:text-[56px]">
              The Feeling Is <span className="font-serif italic text-primary">Mutual</span>
            </h2>

            {/* Active Service Card Text with Smooth Transitions */}
            <div className="mt-6 grid sm:mt-8 lg:mt-12">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={cn(
                    'col-start-1 row-start-1 transition-[opacity,translate] ease-[cubic-bezier(0.16,1,0.3,1)]',
                    index === active
                      ? 'translate-y-0 opacity-100 delay-100 duration-500'
                      : 'pointer-events-none opacity-0 duration-200',
                    index < active && '-translate-y-3',
                    index > active && 'translate-y-4'
                  )}
                >
                  <div className="flex items-baseline justify-center gap-3 lg:justify-start">
                    <span className="font-serif text-5xl italic leading-none text-primary lg:text-7xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium text-foreground/35">/ {String(services.length).padStart(2, '0')}</span>
                  </div>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{service.eyebrow}</p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-secondary sm:text-3xl lg:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm font-light leading-relaxed text-foreground/65 sm:text-base lg:mx-0 lg:text-lg">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile Navigation Controls (1-swipe / 1-tap per turn) */}
            <div className="mt-6 flex items-center justify-center gap-4 lg:hidden">
              <button
                type="button"
                onClick={() => goToCard(active - 1)}
                disabled={active === 0}
                aria-label="Previous service"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-secondary shadow-sm transition hover:bg-white active:scale-95 disabled:pointer-events-none disabled:opacity-30"
              >
                <FiChevronLeft className="h-5 w-5" />
              </button>

              {/* Dots Indicator */}
              <div className="flex items-center gap-1.5">
                {services.map((service, index) => (
                  <button
                    key={service.title}
                    type="button"
                    onClick={() => goToCard(index)}
                    aria-label={`Go to ${service.title}`}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      index === active ? 'w-6 bg-primary' : 'w-2 bg-black/15 hover:bg-black/30'
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => goToCard(active + 1)}
                disabled={active === LAST}
                aria-label="Next service"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-secondary shadow-sm transition hover:bg-white active:scale-95 disabled:pointer-events-none disabled:opacity-30"
              >
                <FiChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* 3D Cylindrical Ring Stage */}
          <div
            aria-hidden
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative order-first h-[38svh] touch-pan-y perspective-[1600px] [--panel-h:28svh] [--panel-w:min(60vw,15rem)] sm:h-[42svh] sm:[--panel-h:31svh] sm:[--panel-w:16rem] lg:order-0 lg:col-span-7 lg:h-[72svh] lg:[--panel-h:54svh] lg:[--panel-w:clamp(14rem,19vw,19rem)]"
          >
            <div className="absolute inset-0 transform-3d transform-[rotateX(-6deg)]">
              <div ref={swingRef} className="absolute inset-0 transform-3d will-change-transform">
                <div ref={ringRef} className="absolute inset-0 transform-3d will-change-transform">
                  {services.map((service, index) => (
                    <article
                      key={service.title}
                      onClick={() => goToCard(index)}
                      style={{ transform: `rotateY(${index * STEP}deg) translateZ(calc(var(--panel-w) * ${RADIUS.toFixed(4)}))` }}
                      className="absolute inset-0 m-auto h-(--panel-h) w-(--panel-w) cursor-pointer overflow-hidden rounded-2xl bg-secondary ring-1 ring-black/5 backface-hidden lg:rounded-3xl"
                    >
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 70vw"
                        className="rounded-[inherit] object-cover"
                        style={{ objectPosition: service.imagePosition }}
                      />
                      <div className="absolute inset-0 rounded-[inherit] bg-linear-to-b from-black/35 via-transparent to-transparent" />
                      <span className="absolute top-4 left-5 font-serif text-4xl italic leading-none text-white/45 md:top-6 md:left-7 md:text-5xl">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div
                        className={cn(
                          'absolute inset-0 rounded-[inherit] bg-white/40 transition-opacity duration-700',
                          index === active ? 'opacity-0' : 'opacity-100'
                        )}
                      />
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
