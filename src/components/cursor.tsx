"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Mode = "default" | "link" | "view";

const INTERACTIVE = "a, button, [role='button'], summary, label, select";
const follow = { stiffness: 900, damping: 60, mass: 0.35 };
const grow = { type: "spring", stiffness: 320, damping: 30 } as const;

const ringSize: Record<Mode, number> = { default: 12, link: 40, view: 48 };

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export function Cursor() {
  const enabled = useSyncExternalStore(subscribe, () => window.matchMedia(FINE_POINTER).matches, () => false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, follow);
  const smoothY = useSpring(y, follow);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target instanceof Element ? event.target : null;
      setMode(target?.closest("[data-cursor='view']") ? "view" : target?.closest(INTERACTIVE) ? "link" : "default");
    };
    const hide = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", hide);
      root.classList.remove("has-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: smoothX, y: smoothY }}
      className={cn("cursor-layer pointer-events-none fixed top-0 left-0 z-[400] transition-opacity duration-300", !visible && "opacity-0")}
    >
      <motion.div
        initial={false}
        animate={{
          width: ringSize[mode],
          height: ringSize[mode],
          top: -ringSize[mode] / 2,
          left: -ringSize[mode] / 2,
          opacity: mode === "default" ? 0 : 1,
        }}
        transition={grow}
        className={cn(
          "absolute rounded-full",
          mode === "view"
            ? "glass bg-white/5 [--glass-blur:4px] [--glass-shadow:0_4px_14px_rgba(0,0,0,0.12)]"
            : "border-[1.5px] border-primary bg-primary/10"
        )}
      />
      <motion.div
        initial={false}
        animate={{ scale: mode === "default" ? 1 : 0 }}
        transition={grow}
        className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_0_1px_rgba(255,255,255,0.35)] will-change-transform"
      />
    </motion.div>
  );
}
