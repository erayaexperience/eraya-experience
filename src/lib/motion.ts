export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const HOVER_INTENT = 180;
export const CROSSFADE = 1000;

export const rowReveal = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "0px 0px -80px 0px" },
} as const;

export const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  show: (index: number) => ({ opacity: 1, y: 0, transition: { duration: 1, delay: index * 0.12, ease: EASE_OUT_EXPO } }),
};
