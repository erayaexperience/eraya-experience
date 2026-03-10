"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "./ui/button";
import { navItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > 10);
          const doc = document.documentElement;
          const totalScrollable = doc.scrollHeight - window.innerHeight;
          const nextProgress =
            totalScrollable > 0 ? Math.min(scrollY / totalScrollable, 1) : 0;
          setScrollProgress(nextProgress);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const itemVariants: Variants = {
    closed: { opacity: 0, x: -20 },
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "tween", duration: 0.3 },
    },
  };

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out",
        scrolled
          ? "bg-white/75 backdrop-blur-lg border-b border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] supports-backdrop-filter:bg-white/60"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-modern">
        <div className="flex items-center justify-between py-3 lg:py-4">
          {/* Logo */}
          <motion.div>
            <Link href="/" className="flex items-center">
              {/* Desktop Logo */}
              <Image
                src="/logo.png"
                alt="ERAYA Logo"
                width={160}
                height={40}
                className={cn(
                  "hidden lg:block transition-all duration-300",
                  !scrolled && "invert brightness-[2] grayscale"
                )}
                priority
              />
              {/* Mobile/Tablet Logo */}
              <Image
                src="/logo-small.png"
                alt="ERAYA Logo Small"
                width={120}
                height={32}
                className={cn(
                  "block lg:hidden transition-all duration-300",
                  !scrolled && "invert brightness-[2] grayscale"
                )}
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden lg:flex items-center space-x-12"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative text-[15px] font-medium transition-all duration-300 group cursor-pointer",
                    scrolled ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full",
                    scrolled ? "bg-primary/70" : "bg-white/70"
                  )}></span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild className={cn("group", !scrolled && "bg-white text-black hover:bg-white/90")}>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 cursor-pointer"
                >
                  Get Started
                  <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            className="lg:hidden p-3 rounded-[18px] liquid-glass transition-all duration-200 hover:-translate-y-0.5"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiX className={cn("h-6 w-6", scrolled ? "text-foreground" : "text-white")} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiMenu className={cn("h-6 w-6", scrolled ? "text-foreground" : "text-white")} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
            className="fixed inset-0 z-50 bg-white/90 backdrop-blur-3xl border-b border-white/40 lg:hidden flex flex-col items-center justify-center space-y-8 p-6"
          >
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                whileHover={{ x: 10 }}
              >
                <Link
                  href={item.href}
                  className="block text-2xl font-semibold text-foreground hover:text-foreground/70 transition-all duration-300 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              variants={itemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild className="group w-full justify-center">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-3 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                  <FiArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;

