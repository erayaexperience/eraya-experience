"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { caseStudies } from '@/data/case-studies';

const HeroSection = () => {
  const stats = [
    { value: '6+', label: 'Years of experience' },
    { value: '18', label: 'Brands partnered' },
    { value: '92', label: 'Client NPS score' },
    { value: '4.8x', label: 'Average ROI' },
  ];

  const heroCase = caseStudies[0];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
        {/* Main Grid */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">

          {/* Left Column - Content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-block rounded-full border border-[#e5e5e7] bg-[#f9f9f9] px-4 py-2 text-xs font-medium uppercase tracking-wider text-gray-600">
                Experience Design Studio
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              We create experiences that{' '}
              <span className="text-[#d6b685]">define brands</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
              Eraya Experience partners with ambitious teams to craft premium brand experiences that feel intuitive, memorable, and unmistakably yours.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#contact" className="inline-flex items-center gap-2">
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#portfolio">
                  View our work
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-[#e5e5e7] pt-10 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.value}>
                  <p className="text-3xl font-semibold tracking-tight text-gray-900">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Featured Case Study */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-[#e5e5e7] bg-white">
              {/* Image */}
              <div className="relative h-[300px] sm:h-[360px]">
                <Image
                  src={heroCase.image}
                  alt={heroCase.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                {/* Category Tag */}
                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-gray-700">
                  {heroCase.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Featured Project
                </p>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {heroCase.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {heroCase.subtitle}
                </p>

                {/* Metrics */}
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#e5e5e7] pt-6">
                  {heroCase.metrics.slice(0, 3).map((metric) => (
                    <div key={metric.label}>
                      <p className="text-lg font-semibold text-[#162451]">
                        {metric.value}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Link */}
                <Link
                  href="#case-studies"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#162451] hover:underline"
                >
                  View case study
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By */}
        <div className="mt-20 border-t border-[#e5e5e7] pt-12">
          <p className="text-center text-xs font-medium uppercase tracking-wider text-gray-400">
            Trusted by leading brands
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {['Snow Park Goa', 'Beach Walk', 'Mission Rabies', 'Dreamdays', 'Xavier\'s Cafe'].map((brand) => (
              <span key={brand} className="text-base font-medium text-gray-400">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;