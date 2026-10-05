"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { caseStudies, type CaseStudy } from "@/constants/case-studies";
import { SectionHeading } from "./ui/section-heading";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";

const glass = 'glass-gold';

type CardConfig = {
  colSpan: string;
  sizes: string;
  shadow: string;
  titleContainer: string;
  titleClass: string;
  descClass: string;
  metricsContainer: string;
  padding: string;
  renderMetrics: (study: CaseStudy) => ReactNode;
};

const featureCard: CardConfig = {
  colSpan: "md:col-span-2",
  sizes: "(min-width: 1024px) 66vw, 100vw",
  shadow: "shadow-[0_20px_60px_rgba(0,0,0,0.12)]",
  titleContainer: "max-w-152",
  titleClass: "mb-4 max-w-xl text-2xl font-semibold tracking-tight text-white md:text-3xl",
  descClass: "max-w-xl text-sm font-light leading-relaxed text-white/92 md:text-base",
  metricsContainer: "mt-6 flex flex-wrap gap-3",
  padding: "p-8 md:p-10",
  renderMetrics: (study) =>
    study.metrics.slice(0, 3).map((metric) => (
      <div key={metric.label} className={cn("rounded-2xl px-4 py-3", glass)}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">{metric.label}</p>
        <p className="mt-1 text-base font-semibold tracking-tight text-white">{metric.value}</p>
      </div>
    )),
};

const listCard: CardConfig = {
  colSpan: "md:col-span-1",
  sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  shadow: "shadow-[0_18px_50px_rgba(0,0,0,0.10)]",
  titleContainer: "max-w-sm",
  titleClass: "mb-4 text-2xl font-semibold leading-tight tracking-tight text-white",
  descClass: "mb-6 text-sm leading-relaxed text-white/92",
  metricsContainer: "grid max-w-sm gap-3",
  padding: "p-8 md:p-9",
  renderMetrics: (study) =>
    study.metrics.slice(0, 2).map((metric) => (
      <div key={metric.label} className={cn("flex items-center justify-between gap-3 rounded-2xl px-4 py-3", glass)}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">{metric.label}</p>
        <p className="text-base font-semibold tracking-tight text-white">{metric.value}</p>
      </div>
    )),
};

const gridCard: CardConfig = {
  ...listCard,
  metricsContainer: "grid grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))] gap-3",
  renderMetrics: (study) =>
    study.metrics.slice(0, 2).map((metric) => (
      <div key={metric.label} className={cn("rounded-2xl px-4 py-4", glass)}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">{metric.label}</p>
        <p className="mt-2 text-base font-semibold tracking-tight text-white">{metric.value}</p>
      </div>
    )),
};

const FEATURED = new Set([0, 6, 10]);
const INITIAL_COUNT = 5;

const layoutFor = (index: number, visible: number): CardConfig => {
  const featured = FEATURED.has(index);
  const style = featured ? featureCard : index % 2 === 1 ? listCard : gridCard;
  let colSpan = "";
  if (index === 0) colSpan = "md:col-span-2";
  else if (featured) colSpan = "lg:col-span-2";
  else if (index === visible - 1 && visible % 2 === 0) colSpan = "md:col-span-2 lg:col-span-1";
  const sizes = colSpan.includes("col-span-2") ? "(min-width: 1024px) 66vw, 100vw" : style.sizes;
  return { ...style, colSpan, sizes };
};

const CaseStudiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? caseStudies : caseStudies.slice(0, INITIAL_COUNT);

  const toggle = () => {
    if (showAll) {
      const top = (sectionRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 80;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(top, { duration: 0.8 });
      else window.scrollTo({ top, behavior: "smooth" });
    }
    setShowAll((value) => !value);
  };

  return (
    <section ref={sectionRef} id="case-studies" className="relative bg-background py-section overflow-hidden">
      <div className="container-modern relative z-10 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <SectionHeading
            subtitle="Case Studies"
            title={
              <>
                Proof That Craft <br />
                <span className="text-primary italic font-serif">Drives Growth</span>
              </>
            }
            description="Real brands, real numbers. This is what happens when sharp strategy meets standout creative."
            layout="center"
            className="mb-0"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((study, index) => {
            const config = layoutFor(index, visible.length);

            return (
              <motion.article
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                className={cn(
                  "group relative flex min-h-100 flex-col justify-end overflow-hidden rounded-3xl border border-border bg-secondary",
                  config.colSpan,
                  config.shadow
                )}
              >
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  sizes={config.sizes}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={study.imagePosition ? { objectPosition: study.imagePosition } : undefined}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-linear-to-t transition-colors duration-300",
                    study.lightImage
                      ? "from-black from-45% via-black/85 via-65% to-black/10"
                      : "from-black/90 via-black/60 to-transparent group-hover:via-black/70"
                  )}
                />
                <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-black/55 to-transparent" />
                <div className={cn("absolute top-6 left-6 z-10 rounded-full px-4 py-2", glass)}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/72">
                    {study.category}
                  </p>
                </div>
                <div className={cn("relative z-10 text-white", config.padding, "pt-20 md:pt-20")}>
                  <div className={config.titleContainer}>
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/78">
                      {study.subtitle}
                    </p>
                    <h3 className={config.titleClass}>
                      {study.title}
                    </h3>
                    <p className={config.descClass}>
                      {study.description}
                    </p>
                  </div>
                  <div className={config.metricsContainer}>
                    {config.renderMetrics(study)}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {caseStudies.length > INITIAL_COUNT && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={toggle}
              aria-expanded={showAll}
              className={cn(
                "group inline-flex cursor-pointer items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300",
                showAll
                  ? "border border-secondary/15 bg-white text-secondary hover:border-primary hover:text-primary"
                  : "bg-primary text-secondary hover:bg-secondary hover:text-primary"
              )}
            >
              {showAll ? "Show less" : "See all"}
              <FiChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", showAll && "rotate-180")} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
