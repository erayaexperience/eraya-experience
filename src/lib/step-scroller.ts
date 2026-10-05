import type Lenis from "lenis";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { addScrollInterceptor } from "./lenis";

type StepScrollerOptions = {
  trigger: ScrollTrigger;
  lenis: Lenis;
  steps: number;
  onStep: (step: number) => void;
  duration?: number;
};

export function createStepScroller({ trigger, lenis, steps, onStep, duration = 0.65 }: StepScrollerOptions) {
  const GESTURE_GAP = 180;
  const INTENT = 30;
  const SWIPE = 28;
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
  const average = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / (values.length || 1);

  let animating = false;
  let safetyTimer: number | undefined;

  type Gesture = { travel: number; acted: "none" | "step" | "exit"; magnitudes: number[] };
  let gesture: Gesture = { travel: 0, acted: "none", magnitudes: [] };
  let lastWheel = 0;
  let lastActionAt = 0;
  let queued = 0;

  let touching = false;
  let touchY = 0;
  let touchStartedInside = false;
  let touchStepped = false;
  let lastInput: "wheel" | "touch" | "other" = "other";
  let lastScroll = lenis.actualScroll;

  const stepLength = () => (trigger.end - trigger.start) / steps || 1;
  const positionOf = (step: number) => trigger.start + step * stepLength();
  const stepAt = (scroll: number) =>
    Math.min(steps, Math.max(0, Math.round((scroll - trigger.start) / stepLength())));
  const inside = (scroll: number) => scroll >= trigger.start - 1 && scroll <= trigger.end + 1;

  const glideTo = (step: number) => {
    animating = true;
    queued = 0;
    onStep(step);
    const done = () => {
      if (!animating) return;
      animating = false;
      window.clearTimeout(safetyTimer);
      if (!queued) return;
      const next = stepAt(lenis.actualScroll) + queued;
      queued = 0;
      if (next < 0 || next > steps) return;
      gesture = { travel: 0, acted: "step", magnitudes: [] };
      lastActionAt = performance.now();
      glideTo(next);
    };
    safetyTimer = window.setTimeout(done, duration * 1000 + 400);
    lenis.scrollTo(positionOf(step), { duration, easing: easeOut, force: true, onComplete: done });
  };

  const stopMomentum = () => {
    const root = document.documentElement;
    root.style.overflow = "hidden";
    requestAnimationFrame(() => {
      root.style.overflow = "";
    });
  };

  const removeInterceptor = addScrollInterceptor(({ deltaX, deltaY, event }) => {
    if (event.type.startsWith("touch")) return true;
    if ((event as WheelEvent).ctrlKey || Math.abs(deltaX) > Math.abs(deltaY)) return true;
    lastInput = "wheel";

    const now = performance.now();
    const gap = now - lastWheel;
    lastWheel = now;
    const magnitude = Math.abs(deltaY);
    const recent = average(gesture.magnitudes.slice(-3));
    const before = average(gesture.magnitudes.slice(-8, -3));
    const stillFading =
      gap < 800 && gesture.magnitudes.length >= 6 && recent < before * 0.97 && magnitude <= recent * 1.3;
    const accelerating =
      gesture.acted !== "none" &&
      gesture.magnitudes.length >= 8 &&
      now - lastActionAt > 300 &&
      Math.max(recent, magnitude) > 8 &&
      (recent + magnitude) / 2 > before * 1.8;
    const paused = gap > GESTURE_GAP && !stillFading;
    if (!animating && (paused || accelerating)) {
      gesture = { travel: 0, acted: "none", magnitudes: [] };
    } else if (animating && paused && magnitude >= 50) {
      queued = Math.sign(deltaY);
    }
    gesture.magnitudes.push(magnitude);
    if (gesture.magnitudes.length > 24) gesture.magnitudes.shift();

    if (gesture.acted === "exit") return true;
    if (animating || gesture.acted === "step") return false;

    gesture.travel += deltaY;
    const direction = Math.sign(gesture.travel);
    const scroll = lenis.actualScroll;

    if (inside(scroll)) {
      if (Math.abs(gesture.travel) < INTENT) return false;
      lastActionAt = now;
      const next = stepAt(scroll) + direction;
      if (next < 0 || next > steps) {
        gesture.acted = "exit";
        return true;
      }
      gesture.acted = "step";
      glideTo(next);
      return false;
    }

    const heading = lenis.targetScroll + deltaY;
    const fromAbove = deltaY > 0 && scroll < trigger.start && heading >= trigger.start;
    const fromBelow = deltaY < 0 && scroll > trigger.end && heading <= trigger.end;
    if (fromAbove || fromBelow) {
      lastActionAt = now;
      gesture.acted = "step";
      glideTo(fromAbove ? 0 : steps);
      return false;
    }
    return true;
  });

  const removeScrollListener = lenis.on("scroll", () => {
    const scroll = lenis.actualScroll;
    const previous = lastScroll;
    lastScroll = scroll;
    if (animating || touching || lastInput !== "touch" || lenis.isScrolling !== "native") return;
    const fromAbove = previous < trigger.start - 1 && scroll >= trigger.start - 1 && scroll < trigger.end;
    const fromBelow = previous > trigger.end + 1 && scroll <= trigger.end + 1 && scroll > trigger.start;
    if (!fromAbove && !fromBelow) return;
    stopMomentum();
    glideTo(fromAbove ? 0 : steps);
  });

  const onTouchStart = (event: TouchEvent) => {
    lastInput = "touch";
    touching = true;
    touchStepped = false;
    touchY = event.touches[0].clientY;
    touchStartedInside = inside(lenis.actualScroll);
  };
  const onTouchMove = (event: TouchEvent) => {
    const scroll = lenis.actualScroll;
    if (!inside(scroll)) return;
    if (animating || touchStepped) {
      if (event.cancelable) event.preventDefault();
      return;
    }
    const travel = touchY - event.touches[0].clientY;
    const direction = Math.sign(travel);
    if (!direction) return;
    const next = touchStartedInside ? stepAt(scroll) + direction : direction > 0 ? 0 : steps;
    if (next < 0 || next > steps) return;
    if (event.cancelable) event.preventDefault();
    if (Math.abs(travel) > SWIPE || !touchStartedInside) {
      touchStepped = true;
      glideTo(next);
    }
  };
  const onTouchEnd = () => {
    touching = false;
    const scroll = lenis.actualScroll;
    if (animating || touchStepped || !inside(scroll)) return;
    if (Math.abs(scroll - positionOf(stepAt(scroll))) < 2) return;
    stopMomentum();
    glideTo(stepAt(scroll));
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest("input, textarea, select, [contenteditable], [role='listbox'], [role='option']")) return;
    if (event.key === " " && target?.closest("button, a")) return;
    const down = event.key === "ArrowDown" || event.key === "PageDown" || (event.key === " " && !event.shiftKey);
    const up = event.key === "ArrowUp" || event.key === "PageUp" || (event.key === " " && event.shiftKey);
    if (!down && !up) return;
    lastInput = "other";
    const scroll = lenis.actualScroll;
    if (!inside(scroll)) return;
    if (animating) {
      event.preventDefault();
      return;
    }
    const next = stepAt(scroll) + (down ? 1 : -1);
    if (next < 0 || next > steps) return;
    event.preventDefault();
    glideTo(next);
  };

  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
  window.addEventListener("touchcancel", onTouchEnd, { passive: true });
  window.addEventListener("keydown", onKeyDown);

  return {
    isAnimating: () => animating,
    settle: () => {
      const scroll = lenis.actualScroll;
      if (animating || touching || !inside(scroll)) return;
      if (Math.abs(scroll - positionOf(stepAt(scroll))) < 2) return;
      glideTo(stepAt(scroll));
    },
    destroy: () => {
      window.clearTimeout(safetyTimer);
      removeInterceptor();
      removeScrollListener();
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    },
  };
}
