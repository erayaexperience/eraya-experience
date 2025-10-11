"use client";

import { ArrowRight, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, easeInOut } from 'framer-motion';
import Badge from './ui/badge';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const, // ✅ TS-safe
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: easeInOut, // ✅ function, not string
      },
    },
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-25"
    >
      {/* Enhanced Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-eraya-navy/8 to-eraya-beige/15"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-eraya-beige/5 via-transparent to-eraya-navy/3"></div>
      {/* Liquid Glass Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 morphing-blob floating-orb"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(22, 36, 81, 0.2) 0%, rgba(214, 182, 133, 0.15) 25%, rgba(22, 36, 81, 0.1) 50%, rgba(214, 182, 133, 0.08) 75%, rgba(22, 36, 81, 0.12) 100%)',
            filter: 'blur(60px)',
            top: '10%',
            left: '10%',
            x: useTransform(scrollY, [0, 1000], [0, 100]),
            y: y1,
          }}
          variants={floatingVariants}
          animate="animate"
        />

        <motion.div
          className="absolute w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 morphing-blob floating-orb"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(214, 182, 133, 0.25) 0%, rgba(22, 36, 81, 0.18) 30%, rgba(214, 182, 133, 0.12) 60%, rgba(22, 36, 81, 0.08) 100%)',
            filter: 'blur(70px)',
            bottom: '20%',
            right: '15%',
            x: useTransform(scrollY, [0, 1000], [0, -80]),
            y: y2,
          }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />

        <motion.div
          className="absolute w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 morphing-blob"
          style={{
            background:
              'linear-gradient(45deg, rgba(22, 36, 81, 0.15) 0%, rgba(214, 182, 133, 0.12) 25%, rgba(22, 36, 81, 0.08) 50%, rgba(214, 182, 133, 0.06) 75%, transparent 100%)',
            filter: 'blur(50px)',
            top: '60%',
            left: '70%',
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
        />

        {/* Additional floating elements for more depth */}
        <motion.div
          className="absolute w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 morphing-blob"
          style={{
            background:
              'conic-gradient(from 180deg, rgba(214, 182, 133, 0.15) 0%, rgba(22, 36, 81, 0.12) 50%, rgba(214, 182, 133, 0.08) 100%)',
            filter: 'blur(40px)',
            top: '30%',
            right: '30%',
            x: mousePosition.x * -0.01,
            y: mousePosition.y * -0.01,
          }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
      </div>

      <motion.div
        className="container-modern text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4">
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <Badge icon={<Sparkles className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />}>6+ Years of Digital Excellence</Badge>
          </motion.div>

          {/* Main heading */}
          <motion.div className="" variants={itemVariants}>
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight leading-none tracking-tighter mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                staggerChildren: 0.1,
              }}
            >
              <motion.span
                className="block text-eraya-navy"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                We help brands
              </motion.span>
              <motion.span
                className="block font-semibold bg-gradient-to-r from-eraya-navy via-eraya-beige to-eraya-navy bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                grow with
              </motion.span>
              <motion.span
                className="block text-eraya-navy"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                social media
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-eraya-navy/70 mb-6 sm:mb-8 max-w-3xl mx-auto font-light leading-relaxed px-4"
            variants={itemVariants}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            From eye-catching hoardings and creative photoshoots to result-driven
            ads and paid campaigns, we cover it all. Our B2B strategies and
            workshops build stronger connections.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 px-4"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Link
                href="#contact"
                className="bg-eraya-beige text-eraya-navy px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold group text-sm sm:text-base inline-flex items-center w-full sm:w-auto justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start your project
                <ArrowRight className="ml-2 sm:ml-3 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </motion.div>

            <motion.button
              className="bg-white/80 backdrop-blur-sm border border-eraya-navy/20 hover:bg-white hover:border-eraya-navy/30 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold group text-sm sm:text-base text-eraya-navy inline-flex items-center w-full sm:w-auto justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <Play className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
              View our work
            </motion.button>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative max-w-5xl mx-auto px-4"
            variants={itemVariants}
            whileHover={{ y: -10 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
          >
            <motion.div
              className="backdrop-blur-sm border-6 border-eraya-beige/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Modern digital marketing workspace"
                className="w-full h-[200px] sm:h-[280px] md:h-[350px] lg:h-[400px] xl:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-eraya-navy/40 via-eraya-navy/10 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-eraya-navy/15 via-eraya-beige/8 to-eraya-navy/12"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-eraya-beige/5 via-transparent to-eraya-navy/8"></div>
            </motion.div>

            {/* Floating stats cards - hidden on mobile, visible on larger screens */}
            <motion.div
              className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 lg:-top-8 lg:-left-8 bg-eraya-beige/20 backdrop-blur-2xl border border-eraya-beige/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl hidden md:block text-white"
              initial={{ opacity: 0, x: -50, y: -50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              whileHover={{ scale: 1.1, rotate: 2, y: -5 }}
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1">6+</div>
              <div className="text-xs sm:text-sm font-medium">Years experience</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 lg:-bottom-8 lg:-right-8 bg-eraya-beige/20 backdrop-blur-2xl border border-eraya-beige/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl hidden md:block text-white"
              initial={{ opacity: 0, x: 50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              whileHover={{ scale: 1.1, rotate: -2, y: -5 }}
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1">Pan India</div>
              <div className="text-xs sm:text-sm font-medium">Reach & presence</div>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto mt-8 sm:mt-10 px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { value: "6+", label: "Years experience" },
              { value: "18+", label: "Successfully grown" },
              { value: "Pan India", label: "Reach & presence" },
              { value: "11+", label: "Creative heads" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 1.8 + index * 0.1,
                    type: "spring" as const,
                    stiffness: 200,
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="font-medium text-xs sm:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
