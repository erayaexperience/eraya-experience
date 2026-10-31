import { useEffect } from "react";
import { getLenis, isTouchFirst } from "./lenis";

type StepEvent = Event & { lenisStopPropagation?: boolean };

const NEW_GESTURE_MS = 160;
const NOTCH_SPEED = 40;
const MIN_NOTCH_GAP_MS = 25;
const MOVING = 0.05;
const MAX_SLOPE = 2.5;
const REST_SLOPE = 2;
const STALE_MS = 100;
const MIN_WHEEL = 8;
const MIN_SWIPE = 20;
const COMMIT_SHARE = 0.25;
const FLICK_SPEED = 0.35;
const DRAG_REACH = 0.45;
const IDLE_SNAP_MS = 90;
const EDGE = 2;
const LINE_HEIGHT = 100 / 6;

const clamp = (min: number, max: number, value: number) => Math.min(max, Math.max(min, value));
const hermite = (slope: number) => (t: number) => slope * (t * t * t - 2 * t * t + t) + t * t * (3 - 2 * t);

const isPrevented = (target: EventTarget | null) =>
  target instanceof Element && !!target.closest("dialog, [data-lenis-prevent]");

const isMouseNotch = (event: WheelEvent) => {
  if (event.deltaMode === 1) return true;
  const legacy = (event as WheelEvent & { wheelDeltaY?: number }).wheelDeltaY;
  return !!legacy && legacy % 120 === 0 && Math.abs(event.deltaY) >= NOTCH_SPEED;
};

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

export function useSnapSteps(getPoints: () => number[]) {
  useEffect(() => {
    if (isTouchFirst()) return;
    let gliding = false;
    let consumed = false;
    let glideTarget: number | null = null;
    let glideTimer: number | undefined;
    let idleTimer: number | undefined;
    let lastWheel = 0;
    let lastSpeed = 0;
    let travel = 0;
    let touching = false;
    let ownsTouch: boolean | null = null;
    let touchStart = 0;
    let touchNow = 0;
    let anchor: number | null = null;
    let samples: { y: number; t: number }[] = [];
    let lastScroll = window.scrollY;
    let scrollDirection = 0;
    let velocity = 0;
    let lastInput: "wheel" | "touch" | "key" = "wheel";
    let sampleY = window.scrollY;
    let sampleT = performance.now();

    const points = () => getPoints().sort((a, b) => a - b);
    const destination = () => getLenis()?.targetScroll ?? window.scrollY;
    const inactive = () => !!getLenis()?.isStopped || document.documentElement.classList.contains("programmatic-scroll");

    const swallow = (event: StepEvent) => {
      if (event.cancelable) event.preventDefault();
      event.lenisStopPropagation = true;
    };

    const zone = () => {
      const list = points();
      if (!list.length) return null;
      const reach = list.length > 1 ? (list[1] - list[0]) / 2 : 0;
      return { list, first: list[0], last: list[list.length - 1], reach };
    };

    const nextFrom = (position: number, direction: number) => {
      const z = zone();
      if (!z || position < z.first - z.reach || position > z.last + z.reach) return null;
      if (direction > 0) {
        if (position >= z.last - EDGE) return null;
        return z.list.find((point) => point > position + EDGE) ?? null;
      }
      if (position <= z.first + EDGE) return null;
      return [...z.list].reverse().find((point) => point < position - EDGE) ?? null;
    };

    const entryFrom = (position: number, heading: number, direction: number) => {
      const z = zone();
      if (!z) return null;
      if (direction > 0 && position < z.first - z.reach && heading >= z.first - z.reach) return z.first;
      if (direction < 0 && position > z.last + z.reach && heading <= z.last + z.reach) return z.last;
      return null;
    };

    const release = () => {
      window.clearTimeout(glideTimer);
      gliding = false;
      glideTarget = null;
    };

    const trackVelocity = () => {
      const now = performance.now();
      const y = getLenis()?.animatedScroll ?? window.scrollY;
      const elapsed = now - sampleT;
      if (elapsed > 0) velocity = elapsed > STALE_MS ? 0 : (y - sampleY) / elapsed;
      sampleY = y;
      sampleT = now;
    };
    const currentVelocity = () => (performance.now() - sampleT > STALE_MS ? 0 : velocity);

    const glide = (target: number, restSlope = REST_SLOPE) => {
      const lenis = getLenis();
      const distance = Math.abs(target - (lenis?.animatedScroll ?? window.scrollY));
      const speed = currentVelocity() * Math.sign(target - (lenis?.animatedScroll ?? window.scrollY)) * 1000;
      let duration = clamp(0.5, 0.8, (distance / window.innerHeight) * 0.5);
      let slope = restSlope;
      if (distance >= 1 && speed / 1000 > MOVING) {
        slope = (speed * duration) / distance;
        if (slope > MAX_SLOPE) {
          duration = Math.max(0.2, (MAX_SLOPE * distance) / speed);
          slope = Math.min(MAX_SLOPE, (speed * duration) / distance);
        }
      }

      gliding = true;
      consumed = true;
      glideTarget = target;
      window.clearTimeout(glideTimer);
      glideTimer = window.setTimeout(release, duration * 1000 + 150);
      if (lenis) lenis.scrollTo(target, { duration, easing: hermite(slope), onComplete: release });
      else window.scrollTo({ top: target, behavior: "smooth" });
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || inactive() || isPrevented(event.target)) return;
      lastInput = "wheel";
      const now = event.timeStamp;
      const speed = Math.abs(event.deltaY);
      const gap = now - lastWheel;
      const fresh = gap > NEW_GESTURE_MS || (gap > MIN_NOTCH_GAP_MS && isMouseNotch(event)) || (speed > lastSpeed * 1.6 && speed > 20);
      lastWheel = now;
      lastSpeed = speed;

      const direction = Math.sign(event.deltaY);
      if (!direction) return;
      if (gliding || (consumed && !fresh)) return swallow(event);
      consumed = false;

      const next = nextFrom(window.scrollY, direction);
      if (next === null) {
        const unit = event.deltaMode === 1 ? LINE_HEIGHT : event.deltaMode === 2 ? window.innerHeight : 1;
        const entry = entryFrom(window.scrollY, destination() + event.deltaY * unit, direction);
        if (entry === null) return;
        swallow(event);
        return glide(entry);
      }

      swallow(event);
      travel = fresh ? event.deltaY : travel + event.deltaY;
      if (Math.abs(travel) < MIN_WHEEL) return;
      travel = 0;
      glide(next);
    };

    const neighbour = (point: number, direction: number) => {
      const list = points();
      const index = list.indexOf(point);
      return index < 0 ? null : list[index + direction] ?? null;
    };

    const anchorAt = (position: number) => {
      if (gliding && glideTarget !== null) return glideTarget;
      const list = points();
      if (!list.length || position < list[0] - EDGE || position > list[list.length - 1] + EDGE) return null;
      return list.reduce((best, point) => (Math.abs(point - position) < Math.abs(best - position) ? point : best));
    };

    const onTouchStart = (event: TouchEvent) => {
      touching = true;
      lastInput = "touch";
      touchStart = touchNow = event.touches[0]?.clientY ?? 0;
      samples = [{ y: touchStart, t: event.timeStamp }];
      anchor = anchorAt(window.scrollY);
      ownsTouch = null;
      if (anchor !== null && gliding) swallow(event);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (inactive() || isPrevented(event.target) || event.touches.length > 1) return;
      touchNow = event.touches[0]?.clientY ?? touchStart;
      samples.push({ y: touchNow, t: event.timeStamp });
      if (samples.length > 6) samples.shift();

      const drag = touchStart - touchNow;
      const direction = Math.sign(drag);
      if (ownsTouch === null && direction) ownsTouch = anchor !== null && neighbour(anchor, direction) !== null;
      if (!ownsTouch || anchor === null) return;
      swallow(event);

      const toward = direction ? neighbour(anchor, direction) : null;
      const spacing = toward === null ? 0 : Math.abs(toward - anchor);
      const offset = (drag / (window.innerHeight * DRAG_REACH)) * spacing;
      const target = toward === null ? anchor : anchor + clamp(-spacing, spacing, offset);
      release();
      getLenis()?.scrollTo(target, { immediate: true, force: true });
      if (!getLenis()) window.scrollTo(0, target);
    };

    const onTouchEnd = (event: TouchEvent) => {
      touching = false;
      const owned = ownsTouch;
      ownsTouch = null;
      const drag = touchStart - touchNow;
      const direction = Math.sign(drag);

      if (owned && anchor !== null) {
        swallow(event);
        const first = samples[0];
        const last = samples[samples.length - 1];
        const velocity = last && first && last.t > first.t ? (first.y - last.y) / (last.t - first.t) : 0;
        const toward = direction ? neighbour(anchor, direction) : null;
        const travelled = Math.abs(drag) / (window.innerHeight * DRAG_REACH);
        const commit =
          toward !== null &&
          Math.abs(drag) >= MIN_SWIPE &&
          (travelled >= COMMIT_SHARE || (Math.abs(velocity) >= FLICK_SPEED && Math.sign(velocity) === direction));
        if (commit && toward !== null) glide(toward);
        else glide(anchor, 0);
        anchor = null;
        return;
      }
      anchor = null;
    };


    const onKey = (event: KeyboardEvent) => {
      if (inactive() || isTyping(event.target)) return;
      lastInput = "key";
      const down = ["PageDown", "ArrowDown"].includes(event.key) || (event.key === " " && !event.shiftKey);
      const up = ["PageUp", "ArrowUp"].includes(event.key) || (event.key === " " && event.shiftKey);
      if (!down && !up) return;
      const next = nextFrom(window.scrollY, down ? 1 : -1);
      if (next === null && !gliding) return;
      event.preventDefault();
      if (!gliding && next !== null) glide(next);
    };

    const onScroll = () => {
      const previous = lastScroll;
      const position = window.scrollY;
      if (position !== previous) scrollDirection = Math.sign(position - previous);
      lastScroll = position;
      window.clearTimeout(idleTimer);
      const z = zone();
      if (gliding || touching || !z || inactive()) return;

      if (lastInput === "touch") {
        if (previous < z.first && position >= z.first && position < z.last) return glide(z.first);
        if (previous > z.last && position <= z.last && position > z.first) return glide(z.last);
      }

      idleTimer = window.setTimeout(() => {
        if (gliding || touching || inactive()) return;
        const now = window.scrollY;
        if (now < z.first - z.reach || now > z.last + z.reach) return;
        if ((now < z.first && scrollDirection < 0) || (now > z.last && scrollDirection > 0)) return;
        const nearest = z.list.reduce((best, point) => (Math.abs(point - now) < Math.abs(best - now) ? point : best));
        if (Math.abs(nearest - now) > EDGE) glide(nearest, 0);
      }, IDLE_SNAP_MS);
    };

    const lenis = getLenis();
    const stopTracking = lenis ? lenis.on("scroll", trackVelocity) : undefined;
    if (!lenis) window.addEventListener("scroll", trackVelocity, { passive: true });

    const active = { passive: false, capture: true };
    window.addEventListener("wheel", onWheel, active);
    window.addEventListener("touchstart", onTouchStart, active);
    window.addEventListener("touchmove", onTouchMove, active);
    window.addEventListener("touchend", onTouchEnd, active);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stopTracking?.();
      window.removeEventListener("scroll", trackVelocity);
      window.clearTimeout(glideTimer);
      window.clearTimeout(idleTimer);
      window.removeEventListener("wheel", onWheel, active);
      window.removeEventListener("touchstart", onTouchStart, active);
      window.removeEventListener("touchmove", onTouchMove, active);
      window.removeEventListener("touchend", onTouchEnd, active);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [getPoints]);
}
