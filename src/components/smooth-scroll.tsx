"use client";

import { useLayoutEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis, runScrollInterceptors } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.09,
      anchors: true,
      prevent: (node) => node instanceof Element && !!node.closest("dialog"),
      virtualScroll: runScrollInterceptors,
    });

    setLenis(lenis);
    if (process.env.NODE_ENV === "development") (window as unknown as { lenis?: Lenis }).lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let refreshTimer: number | undefined;
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    let lastHeight = document.body.scrollHeight;
    const observer = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (Math.abs(height - lastHeight) < 1) return;
      lastHeight = height;
      scheduleRefresh();
    });
    observer.observe(document.body);
    document.fonts?.ready.then(scheduleRefresh);

    return () => {
      window.clearTimeout(refreshTimer);
      observer.disconnect();
      gsap.ticker.remove(tick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
