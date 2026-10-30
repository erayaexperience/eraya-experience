"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { graphics } from "@/constants/graphics";
import { SectionHeading } from "./ui/section-heading";
import { Button } from "./ui/button";
import { Lightbox, type LightboxItem } from "./ui/lightbox";
import { cn } from "@/lib/utils";

const lightboxItems: LightboxItem[] = graphics.map((graphic) => ({
  src: graphic.src,
  alt: graphic.alt,
  width: graphic.width,
  height: graphic.height,
  title: graphic.title,
  caption: graphic.brand,
}));

const rows = [
  { order: [0, 1, 11, 8, 13], animation: "animate-[gallery-left_144s_linear_infinite]" },
  { order: [4, 2, 12, 9, 10], animation: "animate-[gallery-right_162s_linear_infinite]" },
  { order: [6, 5, 7, 14, 3], animation: "animate-[gallery-left_153s_linear_infinite]" },
];

const GraphicsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [26, 14, 6]);

  return (
    <section id="portfolio" className="relative overflow-hidden bg-background py-section">
      <div className="pointer-events-none absolute top-28 left-[calc(25%+15rem)] h-224 w-4xl -translate-1/2 bg-[radial-gradient(closest-side,rgb(var(--primary)/0.16),transparent)]" />
      <div className="pointer-events-none absolute right-[calc(20%+17rem)] bottom-28 h-256 w-5xl translate-1/2 bg-[radial-gradient(closest-side,rgb(var(--primary)/0.12),transparent)]" />

      <div className="container-modern relative">
        <SectionHeading
          subtitle="Creative Portfolio"
          title={
            <>
              Made to Stop the <span className="text-primary italic font-serif">Scroll</span>
            </>
          }
          description="Event posters, social campaigns and brand feeds, each one crafted to be noticed, shared and remembered."
          layout="center"
          className="mb-8 md:mb-10"
        />
      </div>

      <div
        ref={stageRef}
        className="relative perspective-[1600px]"
      >
        <motion.div
          style={{ rotateX, rotateZ: -5 }}
          className="-mx-[12%] flex origin-top flex-col gap-4 pt-4 pb-10 md:gap-6 md:pt-6 md:pb-16"
        >
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="group/row overflow-x-clip">
              <div
                className={cn(
                  "flex w-max gap-4 md:gap-6 group-hover/row:[animation-play-state:paused]",
                  row.animation
                )}
              >
                {[0, 1].map((copy) =>
                  [...row.order, ...row.order, ...row.order].map((graphicIndex, position) => {
                    const graphic = graphics[graphicIndex];
                    const isCopy = copy === 1 || position >= row.order.length;
                    return (
                      <button
                        key={`${copy}-${position}`}
                        type="button"
                        onClick={() => setOpenIndex(graphicIndex)}
                        aria-label={isCopy ? undefined : `View ${graphic.brand}: ${graphic.title}`}
                        aria-hidden={isCopy || undefined}
                        tabIndex={isCopy ? -1 : undefined}
                        style={{ aspectRatio: `${graphic.width} / ${graphic.height}` }}
                        data-cursor="view"
                        className="group/tile relative h-44 shrink-0 cursor-pointer rounded-xl outline-none md:h-60 md:rounded-2xl lg:h-72"
                      >
                        <span className="absolute inset-0 overflow-hidden rounded-xl bg-secondary/5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.28)] ring-1 ring-black/5 transition-[translate,scale,box-shadow] duration-500 ease-out group-hover/tile:-translate-y-3 group-hover/tile:scale-[1.06] group-hover/tile:shadow-[0_40px_70px_-15px_rgba(0,0,0,0.4)] group-focus-visible/tile:-translate-y-3 group-focus-visible/tile:scale-[1.06] group-focus-visible/tile:ring-2 group-focus-visible/tile:ring-primary md:rounded-2xl">
                          <Image
                            src={graphic.src}
                            alt={isCopy ? "" : graphic.alt}
                            fill
                            sizes="(min-width: 1024px) 260px, (min-width: 768px) 200px, 150px"
                            loading="eager"
                            className="object-cover"
                          />
                          <span className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden [@media(hover:none)]:hidden transition-[clip-path] duration-300 ease-out [clip-path:inset(100%_0_0_0)] group-hover/tile:[clip-path:inset(0)] group-focus-visible/tile:[clip-path:inset(0)]">
                            <span aria-hidden className="absolute inset-x-0 bottom-0 hidden h-44 group-hover/tile:block group-focus-visible/tile:block md:h-60 lg:h-72">
                              <Image
                                src={graphic.src}
                                alt=""
                                fill
                                sizes="(min-width: 1024px) 260px, (min-width: 768px) 200px, 150px"
                                className="scale-110 object-cover blur-md"
                              />
                            </span>
                            <span aria-hidden className="absolute inset-0 bg-linear-to-br from-primary/35 via-black/40 to-black/55" />
                            <span className="relative block border-t border-primary/45 px-3 py-2.5 text-left md:px-4 md:py-3">
                              <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-primary md:text-[10px]">
                                {graphic.brand}
                              </span>
                              <span className="mt-0.5 block text-xs font-medium text-white md:text-sm">{graphic.title}</span>
                            </span>
                          </span>
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container-modern relative mt-10 flex justify-center md:mt-14">
        <Button asChild variant="secondary" size="lg" className="group">
          <a href="#contact" className="inline-flex items-center gap-2">
            Let&apos;s design yours
            <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Button>
      </div>

      <Lightbox
        items={lightboxItems}
        index={openIndex}
        onIndexChange={setOpenIndex}
        label="Graphics showcase"
      />
    </section>
  );
};

export default GraphicsSection;
