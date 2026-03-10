"use client";

import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

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
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent h-1/4" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;