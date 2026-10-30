"use client";

import { useRef, useState, useCallback, useEffect, type CSSProperties } from 'react';
import Image from 'next/image';
import type Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { getLenis, addScrollInterceptor } from '@/lib/lenis';
import { snapWithLenis } from '@/lib/lenis-snap';
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

const GESTURE_QUIET_MS = 200;
const SWIPE_DISTANCE = 30;

const clampCard = gsap.utils.clamp(0, LAST);
const clampDuration = gsap.utils.clamp(0.65, 1.2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const cardScroll = (trigger: ScrollTrigger, card: number) =>
  trigger.start + ((card + LEAD) / SPAN) * (trigger.end - trigger.start);
const cardAt = (trigger: ScrollTrigger, scroll: number) =>
  ((scroll - trigger.start) / (trigger.end - trigger.start)) * SPAN - LEAD;

const stepFrom = (position: number, direction: number) => {
  const shown = clampCard(position);
  const next = direction > 0 ? Math.floor(shown + HOLD) + 1 : Math.ceil(shown - HOLD) - 1;
  return next < 0 || next > LAST ? null : next;
};

const restingScroll = (lenis: Lenis) => (lenis.isScrolling === 'smooth' ? lenis.targetScroll : lenis.animatedScroll);

const isPrevented = (event: Event) =>
  event.target instanceof Element && !!event.target.closest('dialog, [data-lenis-prevent]');

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const swingRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  const goToCard = useCallback((index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const card = clampCard(index);
    const target = cardScroll(trigger, card);
    setActive(card);

    const lenis = getLenis();
    if (!lenis) {
      window.scrollTo({ top: target, behavior: 'smooth' });
      return;
    }
    const cards = Math.abs(target - lenis.animatedScroll) / ((trigger.end - trigger.start) / SPAN);
    lenis.scrollTo(target, { programmatic: false, duration: clampDuration(0.5 + 0.15 * cards), easing: easeOutCubic });
  }, []);

  useEffect(() => {
    let locked = false;
    let lockedAt = 0;
    let lastSpeed = 0;
    let quietTimer: number | undefined;
    let touch: { x: number; y: number; mode: 'pending' | 'step' | 'native'; stepped: boolean } | null = null;

    const consume = (event: Event) => {
      if (event.cancelable) event.preventDefault();
      return false;
    };

    const keepLocked = () => {
      window.clearTimeout(quietTimer);
      quietTimer = window.setTimeout(() => {
        locked = false;
      }, GESTURE_QUIET_MS);
    };
    const lock = () => {
      locked = true;
      lockedAt = performance.now();
      keepLocked();
    };

    const onWheel = (event: WheelEvent, deltaY: number, trigger: ScrollTrigger, lenis: Lenis) => {
      if (event.ctrlKey || isPrevented(event)) return true;

      const speed = Math.abs(deltaY);
      if (locked && speed > 15 && speed > lastSpeed * 2 && performance.now() - lockedAt > 300) locked = false;
      lastSpeed = speed;
      if (locked) keepLocked();
      if (deltaY === 0) return true;

      const direction = Math.sign(deltaY);
      const rest = restingScroll(lenis);
      const first = cardScroll(trigger, 0);
      const last = cardScroll(trigger, LAST);

      if (direction > 0 ? rest < first - 1 : rest > last + 1) {
        const entry = direction > 0 ? first : last;
        lock();
        if (direction > 0 ? rest + deltaY < entry : rest + deltaY > entry) return true;
        lenis.scrollTo(entry, { programmatic: false, lerp: lenis.options.lerp });
        return consume(event);
      }
      if (rest < first - 1 || rest > last + 1) {
        lock();
        return true;
      }
      if (locked) return consume(event);

      lock();
      const next = stepFrom(cardAt(trigger, rest), direction);
      if (next === null) return true;
      goToCard(next);
      return consume(event);
    };

    const onTouch = (event: TouchEvent, trigger: ScrollTrigger, lenis: Lenis) => {
      if (event.type === 'touchstart') {
        const point = event.touches[0];
        touch =
          event.touches.length === 1 && !isPrevented(event)
            ? { x: point.clientX, y: point.clientY, mode: 'pending', stepped: false }
            : null;
        return true;
      }
      if (!touch) return true;
      if (event.type !== 'touchmove') {
        const owned = touch.mode === 'step';
        touch = null;
        return !owned;
      }
      if (event.touches.length > 1) {
        touch = null;
        return true;
      }

      const point = event.touches[0];
      const dx = point.clientX - touch.x;
      const dy = point.clientY - touch.y;
      const vertical = Math.abs(dy) >= Math.abs(dx);
      const direction = -Math.sign(vertical ? dy : dx);

      if (touch.mode === 'pending') {
        if (dx === 0 && dy === 0) return true;
        const rest = restingScroll(lenis);
        const pinned = rest >= trigger.start - 1 && rest <= trigger.end + 1;
        const leaving = vertical && stepFrom(cardAt(trigger, rest), direction) === null;
        touch.mode = event.cancelable && pinned && !leaving ? 'step' : 'native';
      }
      if (touch.mode === 'native') return true;

      if (!touch.stepped && Math.max(Math.abs(dx), Math.abs(dy)) >= SWIPE_DISTANCE) {
        touch.stepped = true;
        const next = stepFrom(cardAt(trigger, restingScroll(lenis)), direction);
        if (next !== null) goToCard(next);
      }
      return consume(event);
    };

    const unsubscribe = addScrollInterceptor((data) => {
      const trigger = triggerRef.current;
      const lenis = getLenis();
      if (!trigger || !lenis || lenis.isStopped) return true;
      const { event } = data;
      return event instanceof WheelEvent ? onWheel(event, data.deltaY, trigger, lenis) : onTouch(event, trigger, lenis);
    });

    return () => {
      unsubscribe();
      window.clearTimeout(quietTimer);
    };
  }, [goToCard]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      const swing = swingRef.current;
      const ring = ringRef.current;
      if (!section || !stage || !swing || !ring) return;

      const turns = gsap.timeline({
        defaults: { ease: 'sine.inOut', duration: 1 - 2 * HOLD },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${section.offsetHeight - stage.offsetHeight}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const lenis = getLenis();
            const next = clampCard(Math.round(cardAt(self, lenis ? restingScroll(lenis) : self.scroll())));
            setActive((prev) => (prev !== next ? next : prev));
          },
        },
      });

      const trigger = turns.scrollTrigger!;
      triggerRef.current = trigger;

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

      const releaseSnap = snapWithLenis(trigger, (progress, direction) => {
        const position = clampCard(progress * SPAN - LEAD);
        if (Math.abs(position - Math.round(position)) <= HOLD) return null;
        return ((direction > 0 ? Math.ceil(position) : Math.floor(position)) + LEAD) / SPAN;
      });

      return () => {
        releaseSnap();
        triggerRef.current = null;
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ '--span': SPAN } as CSSProperties}
      className="relative bg-white py-0 [--card:60svh] sm:[--card:65svh] lg:[--card:70svh] h-[calc(100svh+var(--span)*var(--card))] scroll-mt-[calc(var(--header-height)*-1)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background to-white sm:h-32" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-white sm:h-32" />

      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden flex flex-col justify-center">
        <div className="pointer-events-none absolute top-[60%] left-1/2 h-200 w-200 -translate-1/2 bg-[radial-gradient(closest-side,rgb(var(--primary)/0.16),transparent)] lg:h-288 lg:w-6xl" />

        <div className="container-modern relative grid h-full content-center items-center gap-4 pt-[calc(var(--header-height)+0.5rem)] pb-6 sm:gap-6 lg:grid-cols-12 lg:gap-10 lg:py-0 max-lg:[@media(max-height:760px)]:gap-2 max-lg:[@media(max-height:760px)]:pb-4">
          <div className="text-center lg:col-span-5 lg:text-left">
            <div className="mb-4 inline-flex items-center gap-3 max-lg:[@media(max-height:760px)]:mb-2">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">Core Expertise</span>
              <span className="h-px w-8 bg-primary" />
            </div>
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight text-secondary sm:text-5xl lg:text-[44px] xl:text-[56px]">
              Our Services, <br className="hidden lg:block" />
              <span className="whitespace-nowrap font-serif italic text-primary">Done Right</span>
            </h2>

            <div className="mt-6 grid sm:mt-8 lg:mt-12 max-lg:[@media(max-height:760px)]:mt-3">
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
          </div>

          <div
            aria-hidden
            className="relative order-first h-[40svh] sm:h-[42svh] perspective-[1600px] [--panel-h:29svh] [--panel-w:min(56vw,14rem)] sm:[--panel-h:31svh] sm:[--panel-w:16rem] lg:order-0 lg:col-span-7 lg:h-[72svh] lg:[--panel-h:54svh] lg:[--panel-w:clamp(14rem,19vw,19rem)] max-lg:[@media(max-height:760px)]:h-[30svh] max-lg:[@media(max-height:760px)]:[--panel-h:22svh]"
          >
            <div className="absolute inset-0 transform-3d transform-[rotateX(-6deg)]">
              <div ref={swingRef} className="absolute inset-0 transform-3d will-change-transform">
                <div ref={ringRef} className="absolute inset-0 transform-3d will-change-transform">
                  {services.map((service, index) => (
                    <article
                      data-cursor="view"
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
