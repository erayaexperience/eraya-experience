"use client";

import { useRef, useState, type CSSProperties, type RefObject } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay, EffectFade } from "swiper/modules";
import { testimonials, type Testimonial } from "@/constants/testimonials";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/effect-fade";

const grain: CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
};

const reveal =
  "transition-[opacity,translate,filter] ease-out-expo duration-300 in-[.swiper-slide-active]:duration-900 in-[.swiper-slide-active]:delay-(--delay)";
const hidden = "translate-y-[0.3em] opacity-0 blur-[6px]";
const shown = "in-[.swiper-slide-active]:translate-y-0 in-[.swiper-slide-active]:opacity-100 in-[.swiper-slide-active]:blur-[0px]";

const DELAY = 7000;
const RING = 2 * Math.PI * 23;
const multiple = testimonials.length > 1;

const ArrowButton = ({
  direction,
  label,
  onClick,
  ringRef,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
  ringRef?: RefObject<SVGCircleElement | null>;
}) => {
  const Icon = direction === "prev" ? FiArrowLeft : FiArrowRight;
  const nudge = direction === "prev" ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white transition-colors duration-300 hover:bg-white/5 hover:text-primary active:scale-95",
        !ringRef && "border border-white/15 hover:border-primary/60"
      )}
    >
      {ringRef && (
        <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
          <circle cx="24" cy="24" r="23" fill="none" stroke="currentColor" strokeOpacity="0.15" className="text-white" />
          <circle
            ref={ringRef}
            cx="24"
            cy="24"
            r="23"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={RING}
            strokeDashoffset={RING}
            className="stroke-primary"
          />
        </svg>
      )}
      <Icon className={cn("relative h-4 w-4 transition-transform duration-300 ease-out-expo", nudge)} />
    </button>
  );
};

const wordsOf = ({ quote, highlight }: Testimonial) => {
  const start = quote.indexOf(highlight);
  const end = start + highlight.length;
  let cursor = 0;
  return quote.split(" ").map((text) => {
    const accent = start !== -1 && cursor >= start && cursor < end;
    cursor += text.length + 1;
    return { text, accent };
  });
};

const Slide = ({ item }: { item: Testimonial }) => {
  const words = wordsOf(item);

  return (
    <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
      <div data-cursor="view" className="relative mx-auto aspect-4/5 w-full max-w-xs overflow-hidden rounded-4xl bg-black sm:max-w-sm lg:col-span-4 lg:max-w-none">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, 24rem"
          className="scale-110 object-cover transition-transform duration-1400 ease-out-expo in-[.swiper-slide-active]:scale-100"
          style={{ objectPosition: item.image.position }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 via-45% to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex justify-center p-6 sm:p-8">
          <Image
            src={item.logo.src}
            alt={item.brand}
            width={item.logo.width}
            height={item.logo.height}
            sizes="176px"
            className="h-auto max-h-11 w-auto max-w-44 object-contain"
          />
        </div>
      </div>

      <figure className="text-center lg:col-span-7 lg:col-start-6 lg:text-left">
        <blockquote className="text-[clamp(1.75rem,7.4vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-[clamp(2.75rem,3.5vw,3.5rem)]">
          <span aria-hidden className="font-serif font-normal text-primary lg:-ml-[0.45em]">
            &ldquo;
          </span>
          {words.map((word, index) => (
            <span
              key={index}
              style={{ "--delay": `${180 + index * 45}ms` } as CSSProperties}
              className={cn(
                "inline-block",
                reveal,
                hidden,
                shown,
                word.accent && "font-serif font-normal italic tracking-[-0.02em] text-primary"
              )}
            >
              {word.text}
              {index === words.length - 1 ? (
                <span aria-hidden className="font-serif font-normal not-italic tracking-normal text-primary">
                  &rdquo;
                </span>
              ) : (
                <>&nbsp;</>
              )}
            </span>
          ))}
        </blockquote>

        <figcaption
          style={{ "--delay": "500ms" } as CSSProperties}
          className={cn(
            "mt-10 flex flex-wrap items-end justify-center gap-x-10 gap-y-6 border-t border-white/12 pt-7 lg:justify-between",
            reveal,
            hidden,
            shown
          )}
        >
          <div>
            <p className="text-base font-semibold tracking-tight text-white sm:text-lg">{item.clientName}</p>
            <p className="mt-1 text-sm font-light text-white/55">
              {item.clientRole}, {item.brand}
            </p>
          </div>
          <div className="lg:text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">What we did</p>
            <p className="mt-2 font-serif text-base italic text-primary sm:text-lg">{item.service}</p>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default function TestimonialsSection() {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  return (
    <section id="testimonials" className="relative bg-linear-to-b from-white to-background p-2 sm:p-3">
      <div className="relative overflow-clip rounded-[2rem] bg-secondary py-section text-white sm:rounded-[2.75rem]">
        <div aria-hidden style={grain} className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-overlay" />
        <div className="pointer-events-none absolute -top-40 -left-40 h-240 w-240 bg-[radial-gradient(closest-side,rgb(var(--primary)/0.14),transparent)]" />
        <div className="pointer-events-none absolute -right-60 -bottom-60 h-280 w-280 bg-[radial-gradient(closest-side,rgb(var(--primary)/0.1),transparent)]" />

        <div className="container-modern relative">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            className="grid gap-6 text-center lg:grid-cols-12 lg:items-end lg:text-left"
          >
            <div className="lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-12 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Client Trust</span>
                <span className="h-px w-12 bg-primary" />
              </div>
              <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[56px]">
                Words From <span className="font-serif font-normal italic text-primary">Our Partners</span>
              </h2>
            </div>
            <div className="flex flex-col items-center gap-6 lg:col-span-5 lg:items-end lg:text-right">
              <p className="text-base font-light leading-relaxed text-white/60 sm:text-lg lg:whitespace-nowrap">
                Straight from the brands we build with, in their own words.
              </p>
              {multiple && (
                <div className="flex items-center gap-3">
                  <ArrowButton direction="prev" label="Previous testimonial" onClick={() => swiper?.slidePrev()} />
                  <ArrowButton
                    direction="next"
                    label="Next testimonial"
                    onClick={() => swiper?.slideNext()}
                    ringRef={ringRef}
                  />
                </div>
              )}
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
            className="mt-12 lg:mt-16"
          >
            <Swiper
              modules={[A11y, Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={900}
              loop={multiple}
              autoplay={multiple ? { delay: DELAY, disableOnInteraction: false } : false}
              onSwiper={setSwiper}
              onAutoplayTimeLeft={(_, __, progress) => {
                ringRef.current?.setAttribute("stroke-dashoffset", String(RING * progress));
              }}
              a11y={{ containerRoleDescriptionMessage: "carousel", itemRoleDescriptionMessage: "testimonial" }}
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <Slide item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
