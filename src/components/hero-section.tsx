"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const FADE = 300;

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    let revealed = false;
    let onScreen = true;
    let timer: number | undefined;

    const begin = () => {
      video.pause();
      video.addEventListener(
        "seeked",
        () => {
          setReady(true);
          timer = window.setTimeout(() => {
            revealed = true;
            if (onScreen) video.play().catch(() => {});
          }, FADE);
        },
        { once: true }
      );
      video.currentTime = 0;
    };

    if (!video.paused && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) begin();
    else {
      video.addEventListener("playing", begin, { once: true });
      video.play().catch(() => {});
    }

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (!revealed) return;
      if (onScreen) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      video.removeEventListener("playing", begin);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black bg-[url(/images/hero-mobile-frame.webp)] bg-cover bg-center lg:bg-[url(/images/hero-desktop-frame.webp)]">
      <link rel="preload" as="image" type="image/webp" href="/images/hero-mobile-frame.webp" media="(max-width: 1023px)" fetchPriority="high" />
      <link rel="preload" as="image" type="image/webp" href="/images/hero-desktop-frame.webp" media="(min-width: 1024px)" fetchPriority="high" />
      <h1 className="sr-only">Eraya Experience, a creative and digital marketing agency in Goa, India</h1>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out",
          ready ? "opacity-100" : "opacity-0"
        )}
      >
        <source src="/videos/hero-desktop.mp4" type="video/mp4" media="(min-width: 1024px)" />
        <source src="/videos/hero-mobile.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 h-1/4 bg-linear-to-b from-black/40 via-transparent to-transparent" />
    </section>
  );
};

export default HeroSection;
