"use client";

import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Desktop Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 hidden h-full w-full object-cover lg:block"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-vertical-shot-4402-large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Mobile Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 block h-full w-full object-cover lg:hidden"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-laptop-4006-large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle Overlays for better blending and visibility */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent h-1/4" />


    </section>
  );
};

export default HeroSection;