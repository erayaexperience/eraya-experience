import type Lenis from "lenis";
import type { VirtualScrollData } from "lenis";

let instance: Lenis | null = null;

const TOUCH_FIRST = "(pointer: coarse)";
export const isTouchFirst = () => window.matchMedia(TOUCH_FIRST).matches;

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

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export const scrollToElement = (lenis: Lenis, target: Element, immediate = false) => {
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const destination = target.getBoundingClientRect().top + window.scrollY - padding - margin;
  const distance = Math.abs(destination - lenis.animatedScroll);
  const duration = Math.min(2.4, Math.max(0.8, 0.6 + distance / 6000));
  const root = document.documentElement;
  const settle = () => root.classList.remove("programmatic-scroll");
  root.classList.add("programmatic-scroll");
  window.setTimeout(settle, immediate ? 50 : duration * 1000 + 150);
  lenis.scrollTo(destination, { immediate, duration, easing: easeInOutCubic, force: true });
};
