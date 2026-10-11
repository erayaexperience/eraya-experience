"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiArrowUpRight, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "./ui/button";
import { navGroups, sectionIds, type NavGroup, type NavLink } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { getLenis } from "@/lib/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const isGroupActive = (group: NavGroup, active: string) =>
  group.children ? group.children.some((child) => child.href === active) : group.href === active;

const MegaPanel = ({
  group,
  links,
  activeSection,
  onNavigate,
}: {
  group: string;
  links: NavLink[];
  activeSection: string;
  onNavigate: () => void;
}) => {
  const [preview, setPreview] = useState(() => Math.max(0, links.findIndex((link) => link.href === activeSection)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 6, scale: 0.98, filter: "blur(4px)", transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
      className="absolute top-full left-1/2 z-10 -translate-x-1/2 pt-4"
    >
      <div className="grid w-136 grid-cols-[10.5rem_1fr] gap-3 rounded-[1.75rem] border border-primary/30 bg-[rgb(251_248_242/0.985)] p-3 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150">
        <div className="relative overflow-hidden rounded-t-full rounded-b-2xl bg-secondary">
          {links.map((link, index) => (
            <Image
              key={link.href}
              src={link.image}
              alt=""
              fill
              sizes="168px"
              className={cn(
                "object-cover object-top transition-[opacity,scale] duration-700 ease-out-expo",
                index === preview ? "scale-100 opacity-100" : "scale-110 opacity-0"
              )}
            />
          ))}
        </div>

        <div className="flex flex-col py-2">
          <div className="mb-2 flex items-center gap-2 px-3">
            <span className="h-px w-5 bg-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/50">{group}</span>
            <span className="h-px w-5 bg-primary" />
          </div>
          <ul className="flex flex-1 flex-col justify-between gap-1">
            {links.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  onMouseEnter={() => setPreview(index)}
                  onFocus={() => setPreview(index)}
                  className="group/link flex items-center justify-between gap-3 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-primary/12 focus-visible:bg-primary/12"
                >
                  <span>
                    <span className="block text-[15px] font-semibold tracking-tight text-secondary">{link.name}</span>
                    <span className="mt-0.5 block text-xs font-light text-foreground/60">{link.description}</span>
                  </span>
                  <FiArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 text-primary opacity-0 transition-[opacity,translate] duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let sections: { href: string; top: number; bottom: number }[] = [];
    let threshold = 0;
    let pageEnd = 0;
    let ticking = false;

    const measure = () => {
      sections = sectionIds.flatMap((id) => {
        const el = document.getElementById(id);
        if (!el) return [];
        const top = el.getBoundingClientRect().top + window.scrollY;
        return [{ href: `#${id}`, top, bottom: top + el.offsetHeight }];
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

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const closeMenu = () => {
    getLenis()?.start();
    setIsOpen(false);
  };

  const openDropdown = (name: string | null) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };

  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
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
    open: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
  };

  const onLight = scrolled || isOpen;
  const directLinks = navGroups.filter((group) => !group.children);
  const menuGroups = navGroups.filter((group) => group.children);

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
        <div className="flex items-center justify-between py-2.5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6 lg:py-3">
          <div className="flex">
            <Link href="#top" aria-label="Eraya Experience, back to top" onClick={() => { setOpenMenu(null); if (isOpen) closeMenu(); }} className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="ERAYA Logo"
                width={124}
                height={44}
                className={cn(
                  "hidden lg:block h-11 w-auto transition-all duration-300",
                  !onLight && "invert brightness-[2] grayscale"
                )}
                priority
              />
              <Image
                src="/logo-small.png"
                alt="ERAYA Logo Small"
                width={40}
                height={40}
                className={cn(
                  "block lg:hidden h-10 w-10 object-contain transition-all duration-300",
                  !onLight && "invert brightness-[2] grayscale"
                )}
                priority
              />
            </Link>
          </div>

          <ul
            onMouseLeave={() => {
              setHovered(null);
              scheduleClose();
            }}
            className={cn(
              "hidden lg:flex items-center gap-0.5 rounded-full p-[3px] transition-colors duration-500",
              scrolled ? "bg-white/55 ring-1 ring-primary/25" : "glass-gold"
            )}
          >
            {navGroups.map((group) => {
              const groupActive = isGroupActive(group, activeSection);
              const expanded = openMenu === group.name;
              const itemClass = cn(
                "relative z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                scrolled
                  ? groupActive || expanded
                    ? "text-secondary"
                    : "text-foreground/65 hover:text-secondary"
                  : groupActive || expanded
                    ? "text-white"
                    : "text-white/80 hover:text-white"
              );

              return (
                <li
                  key={group.name}
                  className="relative"
                  onMouseEnter={() => {
                    setHovered(group.name);
                    openDropdown(group.children ? group.name : null);
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null) && expanded) setOpenMenu(null);
                  }}
                >
                  {groupActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      className={cn(
                        "absolute inset-0 rounded-full",
                        scrolled
                          ? "bg-primary/18"
                          : "bg-white/18"
                      )}
                    />
                  )}
                  {hovered === group.name && !groupActive && (
                    <motion.span
                      layoutId="nav-hover"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className={cn("absolute inset-0 rounded-full", scrolled ? "bg-secondary/5" : "bg-white/10")}
                    />
                  )}

                  {group.children ? (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-haspopup="true"
                      onClick={() => openDropdown(expanded ? null : group.name)}
                      className={itemClass}
                    >
                      {group.name}
                      <FiChevronDown className={cn("h-3.5 w-3.5 opacity-70 transition-transform duration-300", expanded && "rotate-180")} />
                    </button>
                  ) : (
                    <Link href={group.href} className={itemClass} onClick={() => setOpenMenu(null)}>
                      {group.name}
                    </Link>
                  )}


                  <AnimatePresence>
                    {group.children && expanded && (
                      <MegaPanel
                        group={group.name}
                        links={group.children}
                        activeSection={activeSection}
                        onNavigate={() => setOpenMenu(null)}
                      />
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex justify-end">
            <Button
              asChild
              variant="secondary"
              className={cn(
                "group h-10 rounded-full px-5",
                !scrolled && "bg-white text-secondary hover:bg-white/90",
                activeSection === "#contact" && "ring-2 ring-primary/40 ring-offset-2 ring-offset-transparent"
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
          </div>

          <button
            className={cn(
              "lg:hidden relative z-60 h-10 w-10 flex items-center justify-center rounded-xl transition-[color,filter,scale] duration-300 active:scale-95 cursor-pointer hover:brightness-110",
              onLight ? "text-foreground" : "text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 rounded-xl glass-gold transition-opacity duration-300",
                onLight ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 rounded-xl glass-gold-light transition-opacity duration-300",
                onLight ? "opacity-100" : "opacity-0"
              )}
            />
            <span aria-hidden className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute top-0.5 left-0 h-0.5 w-5 rounded-full bg-current transition-[translate,rotate] duration-300 ease-out-expo",
                  isOpen && "translate-y-1.25 rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute top-1.75 left-0 h-0.5 w-5 rounded-full bg-current transition-[opacity,scale] duration-200",
                  isOpen && "scale-x-0 opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0.5 left-0 h-0.5 w-5 rounded-full bg-current transition-[translate,rotate] duration-300 ease-out-expo",
                  isOpen && "-translate-y-1.25 -rotate-45"
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
            data-lenis-prevent
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-linear-to-b from-[rgb(251_248_242/0.97)] to-[rgb(243_233_215/0.97)] px-6 pt-28 pb-8 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {directLinks.map((group) => {
                const isActive = activeSection === group.href;
                return (
                  <motion.div key={group.name} variants={itemVariants}>
                    <Link
                      href={group.href!}
                      onClick={closeMenu}
                      className={cn(
                        "flex items-baseline gap-3 text-[2.6rem] font-semibold leading-[1.05] tracking-tight transition-colors duration-300",
                        isActive ? "text-primary" : "text-secondary hover:text-primary"
                      )}
                    >
                      {group.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariants} className="my-8 h-px bg-primary/30" />

            <div className="grid grid-cols-2 gap-6">
              {menuGroups.map((group) => (
                <motion.div key={group.name} variants={itemVariants}>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-px w-5 bg-primary" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/50">{group.name}</span>
                    <span className="h-px w-5 bg-primary" />
                  </div>
                  <ul className="flex flex-col gap-3">
                    {group.children!.map((link) => {
                      const isActive = activeSection === link.href;
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={closeMenu}
                            className={cn(
                              "flex items-center gap-2 text-xl font-semibold tracking-tight transition-colors duration-300",
                              isActive ? "text-primary" : "text-secondary hover:text-primary"
                            )}
                          >
                            {link.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="mt-auto w-full pt-10">
              <Button asChild variant="secondary" className="group h-14 w-full justify-center rounded-full text-base">
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
