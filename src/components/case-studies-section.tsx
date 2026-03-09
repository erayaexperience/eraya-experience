"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { caseStudies } from '@/data/case-studies';

const CaseStudiesSection = () => {
  const [activeCase, setActiveCase] = useState(0);
  const currentCase = caseStudies[activeCase];

  return (
    <section id="case-studies" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">

          {/* Left Column - List */}
          <div className="space-y-10">
            <div>
              <span className="inline-block rounded-full border border-[#e5e5e7] bg-[#f9f9f9] px-4 py-2 text-xs font-medium uppercase tracking-wider text-gray-600 mb-6">
                Case Studies
              </span>
              <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                Proof that craft drives growth
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Each engagement pairs strategic clarity with premium execution. Select a case to explore the details.
              </p>
            </div>

            <div className="space-y-3">
              {caseStudies.map((item, index) => {
                const isActive = index === activeCase;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveCase(index)}
                    className={cn(
                      'w-full rounded-xl border px-6 py-5 text-left transition-all duration-200',
                      isActive
                        ? 'border-[#162451] bg-[#162451] text-white shadow-md'
                        : 'border-[#e5e5e7] bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={cn(
                          'text-xs font-medium uppercase tracking-wider',
                          isActive ? 'text-white/70' : 'text-gray-500'
                        )}>
                          {item.category}
                        </p>
                        <p className="mt-1 text-lg font-semibold">
                          {item.title}
                        </p>
                      </div>
                      <ArrowRight className={cn(
                        'h-5 w-5',
                        isActive ? 'text-white' : 'text-gray-400'
                      )} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column - Detail View */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-[#e5e5e7] bg-white">
              {/* Image */}
              <div className="relative h-[300px] sm:h-[400px]">
                <Image
                  src={currentCase.image}
                  alt={currentCase.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 800px"
                />
                <div className="absolute bottom-4 left-4 rounded-lg bg-white/95 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm">
                  {currentCase.roi}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid gap-10 lg:grid-cols-2">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      The Challenge & Solution
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {currentCase.description}
                    </p>

                    <div className="space-y-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                        Highlights
                      </p>
                      <ul className="space-y-2">
                        {currentCase.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#d6b685]" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Key Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {currentCase.metrics.map((metric) => (
                        <div key={metric.label} className="rounded-lg border border-[#e5e5e7] bg-[#f9f9f9] p-4">
                          <p className="text-xl font-semibold text-[#162451]">
                            {metric.value}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">
                        Services Delivered
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentCase.services.map((service) => (
                          <span
                            key={service}
                            className="rounded-full border border-[#e5e5e7] bg-white px-3 py-1 text-xs font-medium text-gray-600"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-[#e5e5e7] pt-8 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="#contact" className="inline-flex items-center gap-2">
                      Start a similar project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <Award className="h-4 w-4" />
                    Download case study
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
