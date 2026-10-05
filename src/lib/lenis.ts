import type Lenis from "lenis";
import type { VirtualScrollData } from "lenis";

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
