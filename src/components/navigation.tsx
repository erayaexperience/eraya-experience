"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "./ui/button";

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

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

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
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(245, 245, 247, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(209, 209, 214, 0.6)' : '1px solid transparent',
        boxShadow: scrolled ? '0 18px 32px rgba(15, 23, 42, 0.08)' : 'none'
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-50 h-0.5 overflow-hidden">
        <motion.span
          className="block h-full origin-left bg-gradient-to-r from-transparent via-primary to-secondary"
          style={{ scaleX: isOpen ? 1 : scrollProgress }}
        />
      </div>
      <div className="container-modern">
        <div className="flex items-center justify-between py-5 lg:py-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Link href="/" className="flex items-center">
              {/* Desktop Logo */}
              <Image
                src="/logo.png"
                alt="ERAYA Logo"
                width={160}
                height={40}
                className="hidden lg:block"
                priority
              />
              {/* Mobile/Tablet Logo */}
              <Image
                src="/logo-small.png"
                alt="ERAYA Logo Small"
                width={120}
                height={32}
                className="block lg:hidden"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden lg:flex items-center space-x-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={item.href}
                  className="relative text-[15px] font-medium text-foreground/70 hover:text-foreground transition-all duration-300 group cursor-pointer"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary/70 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="sm" className="group">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 cursor-pointer"
                >
                  Get Started
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            className="lg:hidden p-3 rounded-[20px] bg-white/80 border border-[rgba(209,209,214,0.6)] shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
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
                  <X className="h-6 w-6 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-foreground" />
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
            className="fixed inset-0 z-50 bg-[#f5f5f7]/95 backdrop-blur-3xl border-b border-[rgba(209,209,214,0.6)] lg:hidden flex flex-col items-center justify-center space-y-8 p-6"
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
              <Button asChild size="lg" className="group w-full justify-center">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-3 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
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

