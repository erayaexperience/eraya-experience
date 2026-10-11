"use client";

import { useState, useRef, useEffect, type TouchEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { events, type EventItem } from "@/constants/events";
import { SectionHeading } from "./ui/section-heading";
import { Lightbox, type LightboxItem } from "./ui/lightbox";
import { scrimBottom } from "./ui/card-scrim";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, HOVER_INTENT } from "@/lib/motion";

const PHOTO_DWELL = 1800;

function EventBentoCard({
  event,
  index,
  onOpenLightbox,
}: {
  event: EventItem;
  index: number;
  onOpenLightbox: (photoIndex: number) => void;
}) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const intent = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const images = event.images;
  const activeImage = images[currentPhoto];

  useEffect(() => {
    if (!isHovered) return;
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % images.length);
    }, PHOTO_DWELL);

    return () => clearInterval(timer);
  }, [isHovered, images.length]);

  useEffect(() => () => clearTimeout(intent.current), []);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (deltaX < -35) {
      setCurrentPhoto((prev) => (prev + 1) % images.length);
    } else if (deltaX > 35) {
      setCurrentPhoto((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <article
      onClick={() => onOpenLightbox(currentPhoto)}
      onMouseEnter={() => {
        clearTimeout(intent.current);
        intent.current = setTimeout(() => {
          setIsHovered(true);
          setCurrentPhoto((prev) => (prev + 1) % images.length);
        }, HOVER_INTENT);
      }}
      onMouseLeave={() => {
        clearTimeout(intent.current);
        setIsHovered(false);
        setCurrentPhoto(0);
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenLightbox(currentPhoto);
        }
      }}
      aria-label={`Open ${event.title} gallery`}
      className={cn(
        "group relative flex h-130 sm:h-140 lg:h-150 w-[80vw] max-w-[22rem] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-4xl border border-border/80 bg-secondary shadow-[0_20px_50px_rgba(0,0,0,0.14)] cursor-pointer select-none transition-all duration-500 hover:border-primary/80 hover:shadow-[0_25px_60px_rgba(214,182,133,0.22)] md:w-auto md:max-w-none"
      )}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 transition-transform duration-1200 ease-out-expo group-hover:scale-[1.04]">
          {images.map((image, photo) => (
            <Image
              key={image.src}
              src={image.src}
              alt={photo === currentPhoto ? image.alt : ""}
              fill
              priority={index === 0 && photo === 0}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 85vw"
              className={cn(
                "object-cover object-top transition-opacity duration-700 ease-in-out",
                photo === currentPhoto ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-linear-to-b from-black/45 to-transparent" />
      <div className={scrimBottom} />

      <div className="absolute top-[15px] right-[15px] sm:top-[13px] sm:right-[13px] z-20 pointer-events-none">
        <motion.div
          layout
          transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
          className="relative flex h-8 sm:h-9 items-center overflow-hidden rounded-full border border-white/25 bg-black/55 px-3.5 sm:px-4 shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-2xl"
        >
          <div className="pointer-events-none absolute -inset-full bg-linear-to-r from-transparent via-primary/15 to-transparent rotate-45" />

          <div className="relative flex items-center gap-2.5 leading-none">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />

            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-white leading-none">
              {event.location}
            </span>

            {activeImage.tag && (
              <>
                <span className="text-primary/70 text-[10px] select-none font-serif leading-none">✦</span>
                <div className="relative inline-flex items-center overflow-hidden py-0.5">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={activeImage.tag}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                      className="inline-block font-serif italic text-white text-xs tracking-wide leading-none whitespace-nowrap"
                    >
                      {activeImage.tag}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <div className="relative z-20 mt-auto p-6 sm:p-7 text-white pointer-events-none">
        {event.partner && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-1.5">
            {event.partner}
          </p>
        )}

        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight">
          {event.title}
        </h3>

        <p className="mt-1 font-serif italic text-primary/95 text-lg sm:text-xl font-normal">
          {event.serifTitle}
        </p>

        {event.images.length > 1 && (
          <div className="mt-4 flex items-center gap-1.5 md:hidden">
            {event.images.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === currentPhoto ? "w-5 bg-primary" : "w-1.5 bg-white/40"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    eventIndex: number;
    photoIndex: number;
  }>({
    isOpen: false,
    eventIndex: 0,
    photoIndex: 0,
  });

  const openLightbox = (eventIndex: number, photoIndex: number) => {
    setLightboxState({ isOpen: true, eventIndex, photoIndex });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const activeEvent = events[lightboxState.eventIndex] || events[0];
  const activeLightboxItems: LightboxItem[] = activeEvent.images.map((img) => ({
    src: img.src,
    alt: img.alt,
    width: img.width,
    height: img.height,
    title: activeEvent.title,
    caption: `${img.caption} · ${activeEvent.location}`,
  }));

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative overflow-hidden bg-background py-section"
    >
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-240 w-240 -translate-x-1/2 -translate-y-1/4 bg-[radial-gradient(closest-side,rgb(var(--primary)/0.12),transparent)]" />

      <div className="container-modern relative z-10">
        <SectionHeading
          subtitle="Events"
          title={
            <>
              Moments That Move{" "}
              <span className="font-serif italic text-primary">Crowds</span>
            </>
          }
          description="From historic opera house conclaves to creator sundowners and city-wide marathons."
          layout="center"
          className="mb-12 md:mb-16"
        />

        <div className="relative -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[calc((100vw-min(80vw,22rem))/2)] pt-2 pb-6 [scrollbar-width:none] md:mx-auto md:grid md:max-w-7xl md:grid-cols-3 md:gap-6 md:overflow-visible md:px-6 lg:gap-8 lg:px-8">
          {events.map((event, index) => (
            <EventBentoCard
              key={event.id}
              event={event}
              index={index}
              onOpenLightbox={(photoIndex) => openLightbox(index, photoIndex)}
            />
          ))}
        </div>
      </div>

      <Lightbox
        items={activeLightboxItems}
        index={lightboxState.isOpen ? lightboxState.photoIndex : null}
        onIndexChange={(newIndex) => {
          if (newIndex === null) {
            closeLightbox();
          } else {
            setLightboxState((prev) => ({ ...prev, photoIndex: newIndex }));
          }
        }}
        label={`${activeEvent.title} Gallery`}
      />
    </section>
  );
}
