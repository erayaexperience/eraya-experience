import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "./lenis";

// Returns the progress to snap to, or null to leave the scroll where it came to rest.
type SnapTo = (progress: number, direction: number) => number | null;

const WHEEL_QUIET_MS = 90;
const NATIVE_QUIET_MS = 140;

const clamp = (min: number, max: number, value: number) => Math.min(max, Math.max(min, value));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

// ScrollTrigger's own snap waits out Lenis's easing tail and then fights it for a frame, so this
// snaps through Lenis instead. Wheel scrolling snaps from where Lenis is already heading and keeps
// its speed, so the motion carries straight through; touch and other native scrolling snap once
// they have come to rest, never mid-gesture.
export function snapWithLenis(trigger: ScrollTrigger, snapTo: SnapTo) {
  let held = false;
  let gliding = false;
  let timer: number | undefined;

  const settle = () => {
    const lenis = getLenis();
    if (!lenis || held || gliding || lenis.isStopped) return;
    const smooth = lenis.isScrolling === "smooth";
    const scroll = lenis.animatedScroll;
    const rest = smooth ? lenis.targetScroll : scroll;
    if (rest <= trigger.start || rest >= trigger.end) return;

    const direction = (smooth && Math.sign(lenis.targetScroll - scroll)) || trigger.direction;
    const progress = snapTo((rest - trigger.start) / (trigger.end - trigger.start), direction);
    if (progress === null) return;
    const distance = trigger.start + progress * (trigger.end - trigger.start) - scroll;
    if (Math.abs(distance) < 1) return;

    const duration = clamp(0.45, 0.85, 0.3 + Math.abs(distance) / 1000);
    const slope = smooth ? clamp(0, 2.5, (trigger.getVelocity() * duration) / distance) : 0;
    gliding = true;
    lenis.scrollTo(scroll + distance, {
      duration,
      easing: (t) => slope * (t * t * t - 2 * t * t + t) + smoothstep(t),
      onComplete: () => {
        gliding = false;
      },
    });
  };

  const arm = (delay: number) => {
    window.clearTimeout(timer);
    if (!held && !gliding) timer = window.setTimeout(settle, delay);
  };
  const onScroll = () => {
    if (trigger.isActive && getLenis()?.isScrolling !== "smooth") arm(NATIVE_QUIET_MS);
  };
  const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey) return;
    gliding = false;
    arm(WHEEL_QUIET_MS);
  };
  const onHold = (event: PointerEvent | TouchEvent) => {
    if ("pointerType" in event && event.pointerType !== "mouse") return;
    held = true;
    gliding = false;
    window.clearTimeout(timer);
  };
  const onRelease = (event: PointerEvent | TouchEvent) => {
    if ("pointerType" in event && event.pointerType !== "mouse") return;
    if ("touches" in event && event.touches.length) return;
    held = false;
    arm(NATIVE_QUIET_MS);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("touchstart", onHold, { passive: true });
  window.addEventListener("touchend", onRelease, { passive: true });
  window.addEventListener("touchcancel", onRelease, { passive: true });
  window.addEventListener("pointerdown", onHold, { passive: true });
  window.addEventListener("pointerup", onRelease, { passive: true });

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onHold);
    window.removeEventListener("touchend", onRelease);
    window.removeEventListener("touchcancel", onRelease);
    window.removeEventListener("pointerdown", onHold);
    window.removeEventListener("pointerup", onRelease);
  };
}
