"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { caseStudies } from "@/data/case-studies";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { value: "6+", label: "Years Experience" },
    { value: "18", label: "Brands Partnered" },
    { value: "92", label: "Client NPS Score" },
    { value: "4.8x", label: "Average ROI" },
  ];

  const heroCase = caseStudies[0];

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-white overflow-hidden pt-24 lg:pt-0">
      {/* Subtle modern background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="container-modern relative z-10 mx-auto px-6 py-12 lg:py-20 lg:px-12 flex-grow flex flex-col justify-center">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8 items-center">

          {/* Left Column - Content */}
          <motion.div
            className="flex flex-col justify-center lg:col-span-7 xl:col-span-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="mb-8 inline-flex"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="px-4 py-2 rounded-full border border-border/60 bg-white shadow-sm flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70">
                  Experience Design Studio
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-[72px]">
              We create experiences that{" "}
              <span className="relative inline-block text-secondary">
                define brands
                <motion.span
                  className="absolute bottom-1 left-0 w-full h-3 bg-primary/20 -z-10"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8, ease: "circOut" }}
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-8 max-w-xl text-lg sm:text-xl leading-relaxed text-foreground/70 font-light">
              Eraya Experience partners with ambitious teams to craft premium brand
              experiences that feel intuitive, memorable, and unmistakably yours.
            </p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Button asChild className="group">
                <Link href="#contact" className="inline-flex items-center gap-2">
                  Start a project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#portfolio">View our work</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {stats.map((stat, i) => (
                <div key={stat.value} className="relative group">
                  <div className="absolute -inset-4 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="relative text-3xl font-medium tracking-tight text-secondary">
                    {stat.value}
                  </p>
                  <p className="relative mt-2 text-xs font-semibold uppercase tracking-wider text-foreground/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Featured Case Study */}
          <motion.div
            className="lg:col-span-5 xl:col-span-6 lg:pl-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-secondary/10 translate-x-4 translate-y-4 rounded-[2rem] transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />

              <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-white shadow-lg">
                {/* Image */}
                <div className="relative h-[400px] sm:h-[480px] overflow-hidden">
                  <Image
                    src={heroCase.image}
                    alt={heroCase.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />

                  {/* Category Tag */}
                  <div className="absolute left-6 top-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 text-xs font-medium text-white tracking-wide uppercase">
                    {heroCase.category}
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-white transform transition-transform duration-500">
                    <p className="text-secondary-foreground/80 text-xs uppercase tracking-[0.2em] mb-3">
                      Featured Project
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-medium leading-tight mb-3">
                      {heroCase.title}
                    </h3>
                    <p className="text-white/80 text-sm line-clamp-2 mb-6 max-w-sm">
                      {heroCase.subtitle}
                    </p>

                    <Link
                      href="#case-studies"
                      className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase hover:text-primary transition-colors duration-300"
                    >
                      View case study
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-foreground/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;