"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { caseStudies } from "@/constants/case-studies";
import { SectionHeading } from "./ui/section-heading";
import { cn } from "@/lib/utils";

const cardConfigs = [
  {
    colSpan: "md:col-span-2",
    gradient: "bg-linear-to-t from-black/90 via-black/60 to-transparent group-hover:via-black/70",
    shadow: "shadow-[0_20px_60px_rgba(15,23,42,0.10)]",
    titleContainer: "max-w-152",
    titleClass: "mb-4 max-w-xl text-2xl font-semibold tracking-tight text-white md:text-3xl",
    descClass: "max-w-xl text-sm font-light leading-relaxed text-white/92 md:text-base",
    metricsContainer: "mt-6 flex flex-wrap gap-3",
    padding: "p-8 md:p-10",
    delay: 0,
    animProps: { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } },
    renderMetrics: (study: typeof caseStudies[0]) =>
      study.metrics.slice(0, 3).map((metric) => (
        <div key={metric.label} className="rounded-2xl border border-primary/20 bg-primary/18 px-4 py-3 backdrop-blur-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">{metric.label}</p>
          <p className="mt-1 text-base font-semibold tracking-tight text-white">{metric.value}</p>
        </div>
      )),
  },
  {
    colSpan: "md:col-span-1",
    gradient: "bg-linear-to-t from-black/90 via-black/60 to-transparent group-hover:via-black/70",
    shadow: "shadow-[0_18px_50px_rgba(15,23,42,0.08)]",
    titleContainer: "max-w-sm",
    titleClass: "mb-4 text-2xl font-semibold leading-tight tracking-tight text-white",
    descClass: "mb-6 text-sm leading-relaxed text-white/92",
    metricsContainer: "grid max-w-sm gap-3",
    padding: "p-8 md:p-9",
    delay: 0.1,
    animProps: { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } },
    renderMetrics: (study: typeof caseStudies[0]) =>
      study.metrics.slice(0, 2).map((metric) => (
        <div key={metric.label} className="flex items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-primary/18 px-4 py-3 backdrop-blur-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">{metric.label}</p>
          <p className="text-base font-semibold tracking-tight text-white">{metric.value}</p>
        </div>
      )),
  },
  {
    colSpan: "md:col-span-1",
    gradient: "bg-linear-to-t from-black/90 via-black/60 to-transparent group-hover:via-black/70",
    shadow: "shadow-[0_18px_50px_rgba(15,23,42,0.08)]",
    titleContainer: "max-w-sm",
    titleClass: "mb-4 text-2xl font-semibold leading-tight tracking-tight text-white",
    descClass: "mb-6 text-sm leading-relaxed text-white/92",
    metricsContainer: "grid grid-cols-2 gap-3",
    padding: "p-8 md:p-9",
    delay: 0.2,
    animProps: { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } },
    renderMetrics: (study: typeof caseStudies[0]) =>
      study.metrics.slice(0, 2).map((metric) => (
        <div key={metric.label} className="rounded-2xl border border-primary/20 bg-primary/18 px-4 py-4 backdrop-blur-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">{metric.label}</p>
          <p className="mt-2 text-base font-semibold tracking-tight text-white">{metric.value}</p>
        </div>
      )),
  },
  {
    colSpan: "md:col-span-2",
    gradient: "bg-linear-to-r from-black/90 via-black/60 to-transparent group-hover:via-black/70",
    shadow: "shadow-[0_24px_70px_rgba(10,15,35,0.12)]",
    titleContainer: "max-w-2xl",
    titleClass: "mb-4 text-2xl font-semibold tracking-tight text-white md:text-3xl",
    descClass: "max-w-xl text-sm font-light leading-relaxed text-white/92 md:text-base",
    metricsContainer: "mt-6 flex flex-wrap items-start gap-3",
    padding: "p-8 md:p-10",
    delay: 0.3,
    animProps: { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 } },
    renderMetrics: (study: typeof caseStudies[0] & { roi?: string }) => (
      <>
        <div className="rounded-2xl border border-primary/20 bg-primary/18 px-4 py-3 backdrop-blur-sm">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">ROI</p>
          <p className="text-sm font-semibold text-white">{study.roi}</p>
        </div>
        {study.metrics.slice(0, 2).map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-primary/20 bg-primary/18 px-4 py-3 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">{metric.label}</p>
            <p className="mt-1 text-sm font-semibold tracking-tight text-white">{metric.value}</p>
          </div>
        ))}
      </>
    ),
  },
];

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="relative bg-background py-section overflow-hidden">
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
            description="Strategy translated into elegant execution, sharper positioning, and measurable growth across every engagement."
            layout="center"
            className="mb-0"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => {
            const config = cardConfigs[index];
            if (!config) return null;

            return (
              <motion.article
                key={study.title}
                initial={config.animProps.initial}
                whileInView={config.animProps.whileInView}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: config.delay }}
                className={cn(
                  "group relative h-100 overflow-hidden rounded-3xl border border-border bg-secondary",
                  config.colSpan,
                  config.shadow
                )}
              >
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={cn("absolute inset-0 transition-colors duration-300", config.gradient)} />
                <div className="absolute top-6 left-6 z-10 rounded-full border border-primary/25 bg-primary/20 px-4 py-2 backdrop-blur-md">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/72">
                    {study.category}
                  </p>
                </div>
                <div className={cn("absolute inset-x-0 bottom-0 z-10 text-white", config.padding)}>
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
      </div>
    </section>
  );
};

export default CaseStudiesSection;
