"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { caseStudies } from "@/constants/case-studies";
import { SectionHeading } from "./ui/section-heading";

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="relative bg-background py-(--spacing-section) overflow-hidden">
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
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative h-100 overflow-hidden rounded-3xl border border-border bg-secondary md:col-span-2 shadow-[0_20px_60px_rgba(15,23,42,0.10)]"
          >
            <Image
              src={caseStudies[0].image}
              alt={caseStudies[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-secondary/90 via-secondary/62 to-secondary/14 transition-colors duration-300 group-hover:via-secondary/70" />
            <div className="absolute top-6 left-6 rounded-full border border-primary/25 bg-primary/20 px-4 py-2 backdrop-blur-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/72">
                {caseStudies[0].category}
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 p-8 text-white md:p-10">
              <div className="max-w-[38rem]">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/78">
                {caseStudies[0].subtitle}
              </p>
              <h3 className="mb-4 max-w-xl text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {caseStudies[0].title}
              </h3>
              <p className="max-w-xl text-sm font-light leading-relaxed text-white/92 md:text-base">
                {caseStudies[0].description}
              </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {caseStudies[0].metrics.slice(0, 3).map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-primary/20 bg-primary/18 px-4 py-3 backdrop-blur-sm"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
                      {metric.label}
                    </p>
                    <p className="mt-1 text-base font-semibold tracking-tight text-white">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative h-100 overflow-hidden rounded-3xl border border-border bg-secondary md:col-span-1 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
          >
            <Image
              src={caseStudies[1].image}
              alt={caseStudies[1].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-secondary/91 via-secondary/64 to-secondary/14 transition-colors duration-300 group-hover:via-secondary/72" />
            <div className="absolute top-6 left-6 rounded-full border border-primary/25 bg-primary/20 px-4 py-2 backdrop-blur-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/72">
                {caseStudies[1].category}
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 p-8 text-white md:p-9">
              <div className="max-w-sm">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/78">
                {caseStudies[1].subtitle}
              </p>
              <h3 className="mb-4 text-2xl font-semibold leading-tight tracking-tight text-white">
                {caseStudies[1].title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-white/92">
                {caseStudies[1].description}
              </p>
              </div>
              <div className="grid max-w-sm gap-3">
                {caseStudies[1].metrics.slice(0, 2).map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-primary/18 px-4 py-3 backdrop-blur-sm"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
                      {metric.label}
                    </p>
                    <p className="text-base font-semibold tracking-tight text-white">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative h-100 overflow-hidden rounded-3xl border border-border bg-secondary md:col-span-1 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
          >
            <Image
              src={caseStudies[2].image}
              alt={caseStudies[2].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-secondary/91 via-secondary/62 to-secondary/14 transition-colors duration-300 group-hover:via-secondary/70" />
            <div className="absolute top-6 left-6 rounded-full border border-primary/25 bg-primary/20 px-4 py-2 backdrop-blur-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/72">
                {caseStudies[2].category}
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 p-8 text-white md:p-9">
              <div className="max-w-sm">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/78">
                {caseStudies[2].subtitle}
              </p>
              <h3 className="mb-4 text-2xl font-semibold leading-tight tracking-tight text-white">
                {caseStudies[2].title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-white/92">
                {caseStudies[2].description}
              </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {caseStudies[2].metrics.slice(0, 2).map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-primary/20 bg-primary/18 px-4 py-4 backdrop-blur-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-base font-semibold tracking-tight text-white">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative h-100 overflow-hidden rounded-3xl border border-border bg-secondary md:col-span-2 shadow-[0_24px_70px_rgba(10,15,35,0.12)]"
          >
            <Image
              src={caseStudies[3].image}
              alt={caseStudies[3].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-secondary/88 via-secondary/58 to-secondary/20 transition-colors duration-300 group-hover:via-secondary/66" />
            <div className="absolute top-6 left-6 z-10 rounded-full border border-primary/25 bg-primary/20 px-4 py-2 backdrop-blur-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/72">
                {caseStudies[3].category}
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 p-8 text-white md:p-10">
              <div className="max-w-2xl">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/78">
                  {caseStudies[3].subtitle}
                </p>
                <h3 className="mb-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {caseStudies[3].title}
                </h3>
                <p className="max-w-xl text-sm font-light leading-relaxed text-white/92 md:text-base">
                  {caseStudies[3].description}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-start gap-3">
                <div className="rounded-2xl border border-primary/20 bg-primary/18 px-4 py-3 backdrop-blur-sm">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">ROI</p>
                  <p className="text-sm font-semibold text-white">{caseStudies[3].roi}</p>
                </div>
                {caseStudies[3].metrics.slice(0, 2).map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-primary/20 bg-primary/18 px-4 py-3 backdrop-blur-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">
                      {metric.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold tracking-tight text-white">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
