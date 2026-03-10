"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Share2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import { Button } from './ui/button';
import { caseStudies } from '@/data/case-studies';
import { SectionHeading } from './ui/section-heading';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const CaseStudiesSection = () => {
  const swiperRef = useRef<any>(null);

  return (
    <section id="case-studies" className="relative bg-background py-(--spacing-section) overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />

      <div className="container-modern relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

          {/* Left Column - Heading & Navigation */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionHeading
                subtitle="Case Studies"
                title={
                  <>
                    Proof that craft <br />
                    <span className="text-primary italic font-serif">drives growth</span>
                  </>
                }
                description="Strategy meets premium execution. Explore how we transform vision into market-leading impact."
                layout="stacked"
                className="mb-8"
              />

              <div className="hidden lg:flex items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="rounded-full bg-white shadow-sm hover:bg-secondary hover:text-white transition-all duration-300"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => swiperRef.current?.slideNext()}
                  className="rounded-full bg-white shadow-sm hover:bg-secondary hover:text-white transition-all duration-300"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <div className="h-px w-24 bg-border/40 ml-4" />
              </div>

              <div className="mt-12 hidden lg:block">
                <Button asChild variant="link" className="px-0 text-secondary hover:text-primary transition-colors gap-2 group">
                  <Link href="#contact">
                    Scale your brand with us
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Swiper Carousel */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-[32px] bg-white shadow-lg overflow-hidden"
            >
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                modules={[Autoplay, Navigation, EffectFade]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 7000, disableOnInteraction: false }}
                loop={true}
                grabCursor={true}
                className="case-study-swiper"
              >
                {caseStudies.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="p-3.5 sm:p-6">
                      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 lg:items-center">

                        {/* Interaction Card / Slide Image - Tighter Height */}
                        <div className="lg:col-span-6 relative h-[250px] sm:h-[300px] lg:h-[340px] rounded-2xl overflow-hidden group">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-transparent" />

                          <div className="absolute top-4 left-4">
                            <span className="bg-white/95 backdrop-blur-sm border border-white/20 text-secondary text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                              {item.category}
                            </span>
                          </div>

                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-xl shadow-md">
                              <p className="text-white/70 text-[8px] uppercase tracking-widest mb-0.5 font-medium flex items-center gap-1.5">
                                <TrendingUp className="h-2.5 w-2.5" />
                                Impact Highlight
                              </p>
                              <p className="text-white font-semibold text-sm leading-tight">{item.roi}</p>
                            </div>
                          </div>
                        </div>

                        {/* Content Section - Tightened */}
                        <div className="lg:col-span-6 flex flex-col h-full py-1">
                          <div className="mb-4">
                            <h3 className="text-xl lg:text-2xl font-semibold text-secondary tracking-tight mb-2">
                              {item.title}
                            </h3>
                            <p className="text-foreground/60 font-light leading-relaxed text-xs sm:text-sm line-clamp-3">
                              {item.description}
                            </p>
                          </div>

                          {/* Metrics Grid - Compact Density */}
                          <div className="grid grid-cols-2 gap-2.5 mb-6">
                            {item.metrics.slice(0, 4).map((metric, idx) => (
                              <div key={idx} className="bg-secondary/[0.02] border border-border/30 rounded-xl p-2.5 transition-all hover:bg-white hover:shadow-md hover:border-primary/20 group">
                                <p className="text-lg font-bold text-secondary mb-0 transition-colors group-hover:text-primary">
                                  {metric.value}
                                </p>
                                <p className="text-[8px] uppercase tracking-wider text-foreground/40 font-bold leading-none">
                                  {metric.label}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="mt-auto flex items-center justify-end gap-2.5">
                            <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                              <Share2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button asChild size="sm" className="group h-9">
                              <Link href="#contact" className="flex items-center gap-2">
                                View Project
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Desktop Decoration */}
              <div className="hidden lg:block absolute -top-8 -right-8 h-32 w-32 bg-primary/10 rounded-full blur-2xl" />
              <div className="hidden lg:block absolute -bottom-8 -left-8 h-32 w-32 bg-secondary/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
