"use client";

import { useEffect, useRef } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted is set on the DOM node directly for WebKit compliance
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay prevented by browser policy (e.g. iOS Low Power Mode).
        // Background poster handles visual continuity cleanly.
      });
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black bg-[url(/images/hero-mobile-poster.jpg)] bg-cover bg-center lg:bg-[url(/images/hero-desktop-poster.jpg)]">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-mobile-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      >
        <source src="/videos/hero-desktop.mp4" type="video/mp4" media="(min-width: 1024px)" />
        <source src="/videos/hero-mobile.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent h-1/4" />
    </section>
  );
};

export default HeroSection;
