"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "./ui/button";
import { navItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionIds = ["about", "press", "services", "case-studies", "portfolio", "contact"];
    let sections: { href: string; top: number; bottom: number }[] = [];
    let threshold = 0;
    let pageEnd = 0;
    let ticking = false;

    const measure = () => {
      sections = sectionIds.flatMap((id) => {
        const el = document.getElementById(id);
        if (!el) return [];
        const box = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
        const top = box.getBoundingClientRect().top + window.scrollY;
        return [{ href: `#${id}`, top, bottom: top + box.offsetHeight }];
      });
      threshold = window.innerHeight - (navRef.current?.offsetHeight ?? 0);
      pageEnd = document.documentElement.scrollHeight - window.innerHeight - 80;
    };

    const update = () => {
      ticking = false;
      const scrollY = window.scrollY;
      setScrolled(scrollY >= threshold);
      const probe = scrollY + 160;
      let current = sections.find((section) => probe >= section.top && probe < section.bottom)?.href ?? "";
      if (scrollY >= pageEnd) current = "#contact";
      setActiveSection(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    const remeasure = () => {
      measure();
      update();
    };

    remeasure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", remeasure);
    window.addEventListener("load", remeasure);
    ScrollTrigger.addEventListener("refresh", remeasure);
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
      ScrollTrigger.removeEventListener("refresh", remeasure);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    getLenis()?.stop();
    return () => getLenis()?.start();
  }, [isOpen]);

  const closeMenu = () => {
    getLenis()?.start();
    setIsOpen(false);
  };

  const menuVariants: Variants = {
    closed: { opacity: 0, transition: { duration: 0.25, ease: "easeOut" } },
    open: {
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.05, delayChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: 16, transition: { duration: 0.15 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  };

  const onLight = scrolled || isOpen;

  return (
    <>
    <motion.nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out",
        scrolled && !isOpen
          ? "bg-[rgb(251_248_242/0.78)] backdrop-blur-lg backdrop-saturate-150 border-b border-primary/20 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-modern">
        <div className="flex items-center justify-between py-3 lg:py-4">
          <motion.div>
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="ERAYA Logo"
                width={160}
                height={40}
                className={cn(
                  "hidden lg:block transition-all duration-300",
                  !onLight && "invert brightness-[2] grayscale"
                )}
                priority
              />
              <Image
                src="/logo-small.png"
                alt="ERAYA Logo Small"
                width={48}
                height={48}
                className={cn(
                  "block lg:hidden h-12 w-12 object-contain transition-all duration-300",
                  !onLight && "invert brightness-[2] grayscale"
                )}
                priority
              />
            </Link>
          </motion.div>

          <motion.div
            className="hidden lg:flex items-center space-x-8 xl:space-x-12"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative text-[15px] font-medium transition-all duration-300 group cursor-pointer",
                      isActive
                        ? (scrolled ? "text-primary font-semibold" : "text-white font-semibold")
                        : (scrolled ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white")
                    )}
                  >
                    {item.name}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 transition-all duration-300",
                        isActive ? "w-full bg-primary" : "w-0 group-hover:w-full",
                        !isActive && (scrolled ? "bg-primary/70" : "bg-white/70")
                      )}
                    />
                  </Link>
                </motion.div>
              );
            })}
            <Button
              asChild
              variant="secondary"
              className={cn(
                "group",
                !scrolled && "bg-white text-secondary hover:bg-white/90"
              )}
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 cursor-pointer"
              >
                Let&apos;s Talk
                <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          <button
            className={cn(
              "lg:hidden relative z-60 h-12 w-12 flex items-center justify-center rounded-2xl transition-[color,filter,scale] duration-300 active:scale-95 cursor-pointer hover:brightness-110",
              onLight ? "text-foreground" : "text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 rounded-2xl glass-gold transition-opacity duration-300",
                onLight ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 rounded-2xl glass-gold-light transition-opacity duration-300",
                onLight ? "opacity-100" : "opacity-0"
              )}
            />
            <span aria-hidden className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute top-0.5 left-0 h-0.5 w-5 rounded-full bg-current transition-[translate,rotate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isOpen && "translate-y-[5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute top-[7px] left-0 h-0.5 w-5 rounded-full bg-current transition-[opacity,scale] duration-200",
                  isOpen && "scale-x-0 opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0.5 left-0 h-0.5 w-5 rounded-full bg-current transition-[translate,rotate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isOpen && "-translate-y-[5px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>
    </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-linear-to-b from-[rgb(251_248_242/0.97)] to-[rgb(243_233_215/0.97)] backdrop-blur-md lg:hidden flex flex-col items-center justify-center space-y-8 p-6"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <motion.div key={item.name} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block text-2xl font-semibold transition-colors duration-300 cursor-pointer",
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    )}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div variants={itemVariants} className="w-full">
              <Button asChild variant="secondary" className="group w-full justify-center">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-3 cursor-pointer"
                  onClick={closeMenu}
                >
                  Let&apos;s Talk
                  <FiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

