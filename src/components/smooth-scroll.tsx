"use client";

import { useLayoutEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis, runScrollInterceptors, scrollToElement } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useLayoutEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      prevent: (node) => node instanceof Element && !!node.closest("dialog"),
      virtualScroll: runScrollInterceptors,
    });

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href);
      if (!url.hash || url.origin !== location.origin || url.pathname !== location.pathname) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      history.pushState(null, "", url.hash);
      requestAnimationFrame(() => scrollToElement(lenis, target));
    };
    window.addEventListener("click", onClick, { capture: true });

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

    ScrollTrigger.clearScrollMemory("manual");
    const landOnHash = () => {
      const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) requestAnimationFrame(() => scrollToElement(lenis, target));
    };
    if (document.readyState === "complete") landOnHash();
    else window.addEventListener("load", landOnHash, { once: true });

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("load", landOnHash);
      observer.disconnect();
      gsap.ticker.remove(tick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
