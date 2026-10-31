"use client";

import { useRef, useState, useCallback, useEffect, type CSSProperties } from 'react';
import Image from 'next/image';
import type Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { getLenis } from '@/lib/lenis';
import { useSnapSteps } from '@/lib/use-snap-steps';
import { services } from '@/constants/services';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LAST = services.length - 1;
const STEP = 360 / services.length;
const GAP = 0.05;
const RADIUS = (1 + GAP) / (2 * Math.tan(Math.PI / services.length));

const HOLD = 0.2;
const LEAD = 0.3;
const SWING = 0.5;
const SPAN = LAST + 2 * LEAD;

const clampCard = gsap.utils.clamp(0, LAST);
const clampDuration = gsap.utils.clamp(0.65, 1.2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const cardScroll = (trigger: ScrollTrigger, card: number) =>
  trigger.start + ((card + LEAD) / SPAN) * (trigger.end - trigger.start);
const cardAt = (trigger: ScrollTrigger, scroll: number) =>
  ((scroll - trigger.start) / (trigger.end - trigger.start)) * SPAN - LEAD;

const SWIPE_SHARE = 0.15;
const SHORT_SWIPE_MS = 300;
const SHORT_SWIPE_PX = 30;
const AXIS_LOCK_PX = 6;
const EDGE_RESISTANCE = 0.3;

type Drag = { x: number; y: number; t: number; axis: 'x' | 'y' | null };

const restingScroll = (lenis: Lenis) => (lenis.isScrolling === 'smooth' ? lenis.targetScroll : lenis.animatedScroll);

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const swingRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const touchModeRef = useRef(false);
  const activeRef = useRef(0);
  const swipedRef = useRef(false);
  const [active, setActive] = useState(0);

  const show = useCallback((card: number) => {
    activeRef.current = card;
    setActive((prev) => (prev !== card ? card : prev));
  }, []);

  const turnTo = useCallback(
    (index: number) => {
      const card = clampCard(index);
      show(card);
      gsap.to(ringRef.current, { rotationY: -card * STEP, duration: 0.6, ease: 'power3.out', overwrite: true });
    },
    [show]
  );

  const goToCard = useCallback((index: number) => {
    if (touchModeRef.current) return turnTo(index);
    const trigger = triggerRef.current;
    if (!trigger) return;
    const card = clampCard(index);
    const target = cardScroll(trigger, card);
    show(card);

    const lenis = getLenis();
    if (!lenis) {
      window.scrollTo({ top: target, behavior: 'smooth' });
      return;
    }
    const cards = Math.abs(target - lenis.animatedScroll) / ((trigger.end - trigger.start) / SPAN);
    lenis.scrollTo(target, { programmatic: false, duration: clampDuration(0.5 + 0.15 * cards), easing: easeOutCubic });
  }, [show, turnTo]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let drag: Drag | null = null;
    const point = (event: TouchEvent) => event.touches[0] ?? event.changedTouches[0];

    const onStart = (event: TouchEvent) => {
      drag = null;
      if (!touchModeRef.current || event.touches.length !== 1) return;
      const { clientX, clientY } = point(event);
      drag = { x: clientX, y: clientY, t: event.timeStamp, axis: null };
    };

    const onMove = (event: TouchEvent) => {
      if (!drag) return;
      const { clientX, clientY } = point(event);
      const dx = clientX - drag.x;
      const dy = clientY - drag.y;
      if (!drag.axis) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < AXIS_LOCK_PX) return;
        drag.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      }
      if (drag.axis !== 'x') return;
      if (event.cancelable) event.preventDefault();
      const atEdge = (activeRef.current === 0 && dx > 0) || (activeRef.current === LAST && dx < 0);
      const offset = (dx / stage.offsetWidth) * STEP * 1.6 * (atEdge ? EDGE_RESISTANCE : 1);
      gsap.set(ringRef.current, { rotationY: -activeRef.current * STEP + offset });
    };

    const onEnd = (event: TouchEvent) => {
      const done = drag;
      drag = null;
      if (!done || done.axis !== 'x') return;
      const dx = point(event).clientX - done.x;
      const quick = event.timeStamp - done.t < SHORT_SWIPE_MS && Math.abs(dx) > SHORT_SWIPE_PX;
      const commit = quick || Math.abs(dx) > stage.offsetWidth * SWIPE_SHARE;
      turnTo(activeRef.current + (commit ? -Math.sign(dx) : 0));
      swipedRef.current = true;
      window.setTimeout(() => (swipedRef.current = false));
    };

    const onCancel = () => {
      const done = drag;
      drag = null;
      if (done?.axis === 'x') turnTo(activeRef.current);
    };

    stage.addEventListener('touchstart', onStart, { passive: true });
    stage.addEventListener('touchmove', onMove, { passive: false });
    stage.addEventListener('touchend', onEnd);
    stage.addEventListener('touchcancel', onCancel);
    return () => {
      stage.removeEventListener('touchstart', onStart);
      stage.removeEventListener('touchmove', onMove);
      stage.removeEventListener('touchend', onEnd);
      stage.removeEventListener('touchcancel', onCancel);
    };
  }, [turnTo]);

  const snapPoints = useCallback(() => {
    const trigger = triggerRef.current;
    return trigger ? services.map((_, card) => cardScroll(trigger, card)) : [];
  }, []);
  useSnapSteps(snapPoints);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      const swing = swingRef.current;
      const ring = ringRef.current;
      if (!section || !stage || !swing || !ring) return;

      const media = gsap.matchMedia();

      media.add('(pointer: coarse)', () => {
        touchModeRef.current = true;
        gsap.set(ring, { rotationY: -activeRef.current * STEP });
        return () => {
          touchModeRef.current = false;
        };
      });

      media.add('not (pointer: coarse)', () => {
        const turns = gsap.timeline({
          defaults: { ease: 'sine.inOut', duration: 1 - 2 * HOLD },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${section.offsetHeight - stage.offsetHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const lenis = getLenis();
              const next = clampCard(Math.round(cardAt(self, lenis ? restingScroll(lenis) : self.scroll())));
              show(next);
            },
          },
        });

        const trigger = turns.scrollTrigger!;
        triggerRef.current = trigger;

        for (let card = 1; card <= LAST; card++) {
          turns.to(ring, { rotationY: -card * STEP }, LEAD + card - 1 + HOLD);
        }
        turns.set({}, {}, SPAN);

        return () => {
          triggerRef.current = null;
        };
      });

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
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ '--span': SPAN } as CSSProperties}
      className="relative bg-white py-0 [--card:60svh] sm:[--card:65svh] lg:[--card:70svh] h-[calc(100svh+var(--span)*var(--card))] scroll-mt-[calc(var(--header-height)*-1)] pointer-coarse:h-svh"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background to-white sm:h-32" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-white sm:h-32" />

      <div
        ref={stageRef}
        className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pointer-coarse:touch-pan-y"
      >
        <div className="pointer-events-none absolute top-[60%] left-1/2 h-200 w-200 -translate-1/2 bg-[radial-gradient(closest-side,rgb(var(--primary)/0.16),transparent)] lg:h-288 lg:w-6xl" />

        <div className="container-modern relative grid h-full content-center items-center gap-4 pt-[calc(var(--header-height)+0.5rem)] pb-6 sm:gap-6 lg:grid-cols-12 lg:gap-10 lg:py-0 compact:gap-2 compact:pb-4 landscape-phone:grid-cols-12 landscape-phone:gap-6 landscape-phone:pt-[calc(var(--header-height)+0.25rem)] landscape-phone:pb-3">
          <div className="text-center lg:col-span-5 lg:text-left landscape-phone:col-span-6 landscape-phone:text-left">
            <div className="mb-4 inline-flex items-center gap-3 compact:mb-2 landscape-phone:mb-2">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">Core Expertise</span>
              <span className="h-px w-8 bg-primary" />
            </div>
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight text-secondary sm:text-5xl lg:text-[44px] xl:text-[56px] landscape-phone:text-2xl">
              Our Services, <br className="hidden lg:block" />
              <span className="whitespace-nowrap font-serif italic text-primary">Done Right</span>
            </h2>

            <div className="mt-6 grid sm:mt-8 lg:mt-12 compact:mt-3 landscape-phone:mt-3">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={cn(
                    'col-start-1 row-start-1 transition-[opacity,translate] ease-out-expo',
                    index === active
                      ? 'translate-y-0 opacity-100 delay-100 duration-500'
                      : 'pointer-events-none opacity-0 duration-200',
                    index < active && '-translate-y-3',
                    index > active && 'translate-y-4'
                  )}
                >
                  <div className="flex items-baseline justify-center gap-3 lg:justify-start landscape-phone:justify-start">
                    <span className="font-serif text-5xl italic leading-none text-primary lg:text-7xl landscape-phone:text-3xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium text-foreground/35">/ {String(services.length).padStart(2, '0')}</span>
                  </div>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary landscape-phone:mt-2">{service.eyebrow}</p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-secondary sm:text-3xl lg:text-4xl landscape-phone:mt-1 landscape-phone:text-xl">
                    {service.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm font-light leading-relaxed text-foreground/65 sm:text-base lg:mx-0 lg:text-lg landscape-phone:mx-0 landscape-phone:mt-2 landscape-phone:text-sm">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

</div>

          <div
            aria-hidden
            className="relative order-first h-[40svh] sm:h-[42svh] perspective-[1600px] [--panel-h:29svh] [--panel-w:min(56vw,14rem)] sm:[--panel-h:31svh] sm:[--panel-w:16rem] lg:order-0 lg:col-span-7 lg:h-[72svh] lg:[--panel-h:min(54svh,calc(var(--panel-w)*2))] lg:[--panel-w:clamp(14rem,19vw,17rem)] compact:h-[30svh] compact:[--panel-h:22svh] landscape-phone:order-0 landscape-phone:col-span-6 landscape-phone:h-[76svh] landscape-phone:[--panel-h:60svh] landscape-phone:[--panel-w:min(21vw,10rem)]"
          >
            <div
              className="absolute inset-0 transform-3d transform-[rotateX(-6deg)]"
              style={{ transformOrigin: `50% 50% calc(var(--panel-w) * ${RADIUS.toFixed(4)})` }}
            >
              <div ref={swingRef} className="absolute inset-0 transform-3d will-change-transform">
                <div ref={ringRef} className="absolute inset-0 transform-3d will-change-transform">
                  {services.map((service, index) => (
                    <article
                      data-cursor="view"
                      key={service.title}
                      onClick={() => !swipedRef.current && goToCard(index)}
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
