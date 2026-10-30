"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { creators, instagramUrl, type Creator } from "@/constants/creators";
import { SectionHeading } from "./ui/section-heading";
import { scrimBottom } from "./ui/card-scrim";
import { cardReveal, CROSSFADE, HOVER_INTENT, rowReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

const drift = [
  [50, -30],
  [-10, 30],
  [70, -50],
];

const Cover = ({
  creator,
  index,
  progress,
}: {
  creator: Creator;
  index: number;
  progress: MotionValue<number>;
}) => {
  const y = useTransform(progress, [0, 1], drift[index % drift.length]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [first, ...rest] = creator.name.split(" ");

  const start = (delay = HOVER_INTENT) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setActive(true);
      videoRef.current?.play().catch(() => {});
    }, delay);
  };

  const stop = () => {
    clearTimeout(timer.current);
    setActive(false);
    timer.current = setTimeout(() => {
      const video = videoRef.current;
      if (!video) return;
      video.pause();
      video.currentTime = 0;
      setReady(false);
    }, CROSSFADE);
  };

  const showFirstFrame = () => {
    const video = videoRef.current;
    if (video && "requestVideoFrameCallback" in video) video.requestVideoFrameCallback(() => setReady(true));
    else setReady(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;

    const warm = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        video.preload = "auto";
        warm.disconnect();
      },
      { rootMargin: "400px" }
    );
    warm.observe(video);

    if (!window.matchMedia("(hover: none)").matches) {
      return () => {
        warm.disconnect();
        clearTimeout(timer.current);
      };
    }

    const focus = new IntersectionObserver(([entry]) => (entry.intersectionRatio >= 0.75 ? start(0) : stop()), {
      threshold: [0, 0.75],
    });
    focus.observe(video);

    return () => {
      warm.disconnect();
      focus.disconnect();
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <motion.article
      style={{ y }}
      className={cn(
        "w-[78vw] max-w-80 shrink-0 snap-center max-md:transform-none! md:w-auto md:max-w-none",
        index % 3 === 1 && "md:mt-16 lg:mt-24"
      )}
    >
      <motion.a
        href={instagramUrl(creator)}
        data-cursor="view"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${creator.name} on Instagram, opens in a new tab`}
        onMouseEnter={() => start()}
        onMouseLeave={stop}
        onFocus={() => start(0)}
        onBlur={stop}
        custom={index}
        variants={cardReveal}
        className="group relative block aspect-[3/4.2] cursor-pointer overflow-hidden rounded-(--r) bg-secondary [--r:1.5rem] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] outline-none select-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <div className="absolute inset-0 transition-transform duration-1200 ease-out-expo group-hover:scale-[1.04]">
          <Image
            src={creator.image}
            alt={creator.name}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 78vw"
            className="object-cover"
            style={{ objectPosition: creator.imagePosition }}
          />
          <video
            ref={videoRef}
            src={creator.video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            onPlaying={showFirstFrame}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out",
              active && ready ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-3/5 bg-linear-to-b from-black/75 via-black/35 via-40% to-transparent" />
        <div className={scrimBottom} />

        <div className="pointer-events-none absolute inset-(--m) z-20 rounded-[calc(var(--r)-var(--m))] border border-white/0 transition-colors duration-700 ease-out-expo [--m:0.75rem] group-hover:border-white/35" />

        <div className="absolute inset-x-0 top-0 z-20 p-6 sm:p-7">
          <h3 className="text-[2rem] font-semibold leading-[1] tracking-[-0.04em] text-white lg:text-[2.25rem] xl:text-[2.75rem]">
            {first}{" "}
            <span className="block font-serif font-normal italic tracking-[-0.02em] text-primary">{rest.join(" ")}</span>
          </h3>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4 border-t border-white/25 pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white">{creator.role}</p>
            <p className="flex items-center gap-1 font-serif text-sm italic text-white/85 transition-colors duration-500 group-hover:text-primary">
              {creator.handle ? `@${creator.handle}` : "Instagram"}
              <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </p>
          </div>
        </div>
      </motion.a>
    </motion.article>
  );
};

export default function CreatorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  return (
    <section ref={sectionRef} id="creators" className="relative overflow-hidden bg-background py-section">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-240 w-240 -translate-1/2 bg-[radial-gradient(closest-side,rgb(var(--primary)/0.12),transparent)]" />

      <div className="container-modern relative">
        <SectionHeading
          subtitle="Talent Network"
          title={
            <>
              Creators We <span className="font-serif italic text-primary">Collaborate With</span>
            </>
          }
          description="The tastemakers, culture curators and visual storytellers behind our brand campaigns."
          layout="center"
        />
      </div>

      <motion.div
        {...rowReveal}
        className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[calc((100vw-min(78vw,20rem))/2)] pt-2 pb-8 [scrollbar-width:none] md:mx-auto md:grid md:pb-0 md:max-w-7xl md:grid-cols-3 md:gap-6 md:overflow-visible md:px-8 lg:gap-8 lg:px-12">
        {creators.map((creator, index) => (
          <Cover key={creator.id} creator={creator} index={index} progress={scrollYProgress} />
        ))}
      </motion.div>

      <div className="container-modern relative mt-8 flex justify-center md:mt-12">
        <a
          href="#contact"
          className="tap group inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-primary"
        >
          Are you a creator? Join the network
          <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
