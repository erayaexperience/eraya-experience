"use client";

import { LazyMotion } from "framer-motion";

const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

/**
 * Lets every `m.*` component share one lazily loaded copy of framer-motion's
 * animation features instead of bundling them into each `motion.*` import.
 * `strict` throws if a full `motion.*` component slips back in.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
