"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { pressItems, type PressItem } from "@/constants/press";
import { SectionHeading } from "./ui/section-heading";
import { Lightbox, type LightboxItem } from "./ui/lightbox";
import { cn } from "@/lib/utils";

const lightboxItems: LightboxItem[] = pressItems
  .filter((item) => !item.href)
  .map((item) => ({
    src: item.src,
    alt: item.alt,
    width: item.width,
    height: item.height,
    title: item.headline,
    caption: [item.publication, item.section, item.date].filter(Boolean).join(" · "),
  }));

const order = [1, 0, 2];
const layout = [
  { tilt: -4, drift: [60, -40] },
  { tilt: 0, drift: [-30, 30] },
  { tilt: 4, drift: [80, -60] },
];

const PressCard = ({
  item,
  slot,
  progress,
  onOpen,
}: {
  item: PressItem;
  slot: number;
  progress: MotionValue<number>;
  onOpen: () => void;
}) => {
  const y = useTransform(progress, [0, 1], layout[slot].drift);

  return (
    <motion.article
      data-cursor="view"
      style={{ y }}
      className={cn("w-[72vw] max-w-xs shrink-0 snap-center max-sm:transform-none! sm:w-auto sm:max-w-none", slot === 1 && "sm:-mt-6 md:-mt-10")}
    >
      {item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read ${item.publication}: ${item.headline} (opens in a new tab)`}
          style={{ "--tilt": `${layout[slot].tilt}deg` } as CSSProperties}
          className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-3xl bg-secondary/10 ring-1 ring-black/5 transition-[rotate,translate] duration-500 ease-out hover:-translate-y-2 sm:rotate-(--tilt) sm:hover:rotate-0!"
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 640px) 33vw, 72vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </a>
      ) : (
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${item.publication}: ${item.headline}`}
          style={{ "--tilt": `${layout[slot].tilt}deg` } as CSSProperties}
          className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-3xl bg-secondary/10 ring-1 ring-black/5 transition-[rotate,translate] duration-500 ease-out hover:-translate-y-2 sm:rotate-(--tilt) sm:hover:rotate-0!"
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 640px) 33vw, 72vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </button>
      )}

      <div className="mt-6 text-left md:mt-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          {item.publication} · {item.section}
        </p>
        <h3 className="mt-2 font-serif text-xl leading-snug text-secondary italic sm:text-base md:text-xl lg:text-2xl">
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              {item.headline}
            </a>
          ) : (
            item.headline
          )}
        </h3>
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="tap group mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-primary"
          >
            Read the feature
            <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : (
          <button
            type="button"
            onClick={onOpen}
            className="tap group mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-primary"
          >
            Read the feature
            <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        )}
      </div>
    </motion.article>
  );
};

const PressSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const handleOpenLightbox = (item: PressItem) => {
    const lightboxIndex = pressItems
      .filter((p) => !p.href)
      .findIndex((p) => p.src === item.src);
    if (lightboxIndex !== -1) {
      setOpenIndex(lightboxIndex);
    }
  };

  return (
    <section ref={sectionRef} id="press" className="relative overflow-hidden bg-background py-section">
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-240 w-240 -translate-x-1/2 -translate-y-1/4 bg-[radial-gradient(closest-side,rgb(var(--primary)/0.12),transparent)]" />

      <div className="container-modern relative">
        <SectionHeading
          subtitle="In the Press"
          title={
            <>
              The Press Is <span className="font-serif italic text-primary">Talking</span>
            </>
          }
          description="Features on our work, our approach to collaborative marketing, and the founders behind Eraya."
          layout="center"
          className="mb-14 md:mb-20"
        />
      </div>

      <div className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[calc((100vw-min(72vw,20rem))/2)] pt-2 pb-6 [scrollbar-width:none] sm:mx-auto sm:grid sm:pb-0 sm:max-w-7xl sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-8 sm:pt-8 md:gap-10 md:pt-10 lg:gap-14 lg:px-12">
        {order.map((index, slot) => {
          const item = pressItems[index];
          return (
            <PressCard
              key={item.src}
              item={item}
              slot={slot}
              progress={scrollYProgress}
              onOpen={() => handleOpenLightbox(item)}
            />
          );
        })}
      </div>

      {lightboxItems.length > 0 && (
        <Lightbox items={lightboxItems} index={openIndex} onIndexChange={setOpenIndex} label="Press feature" />
      )}
    </section>
  );
};

export default PressSection;
