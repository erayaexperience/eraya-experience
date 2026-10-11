import type Lenis from "lenis";
import type { VirtualScrollData } from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;

type Interceptor = (data: VirtualScrollData) => boolean;
const interceptors = new Set<Interceptor>();

export const addScrollInterceptor = (interceptor: Interceptor) => {
  interceptors.add(interceptor);
  return () => {
    interceptors.delete(interceptor);
  };
};

export const runScrollInterceptors = (data: VirtualScrollData) => {
  for (const interceptor of interceptors) {
    if (interceptor(data) === false) return false;
  }
  return true;
};

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export const scrollToElement = (lenis: Lenis, target: Element) => {
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const destination = target.getBoundingClientRect().top + window.scrollY - padding - margin;
  const runway = window.innerHeight;
  const distance = destination - lenis.animatedScroll;

  if (Math.abs(distance) > runway) {
    lenis.scrollTo(destination - Math.sign(distance) * runway, { immediate: true });
    ScrollTrigger.update();
    for (const trigger of ScrollTrigger.getAll()) {
      const scrub = trigger.getTween();
      if (scrub) scrub.progress(1);
    }
  }
  lenis.scrollTo(destination, { duration: 1, easing: easeOutQuart });
};
