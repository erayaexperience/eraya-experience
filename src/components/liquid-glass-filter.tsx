"use client";

import { useEffect, useRef } from "react";

const GLASS = ".glass, .glass-clear, .glass-cream, .glass-panel, .glass-gold, .glass-gold-light";
const SVG_NS = "http://www.w3.org/2000/svg";
const MAX_MAPS = 48;
const MAP_SIZE = 160;

const maps = new Map<string, string>();

const lensMap = (width: number, height: number, radius: number, bezel: number) => {
  const key = `${width}x${height}x${radius}x${bezel}`;
  const cached = maps.get(key);
  if (cached) return cached;

  const scale = Math.min(1, MAP_SIZE / Math.max(width, height));
  const mapWidth = Math.max(8, Math.round(width * scale));
  const mapHeight = Math.max(8, Math.round(height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = mapWidth;
  canvas.height = mapHeight;
  const context = canvas.getContext("2d")!;
  const image = context.createImageData(mapWidth, mapHeight);
  const halfX = width / 2;
  const halfY = height / 2;

  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      const px = (x + 0.5) / scale - halfX;
      const py = (y + 0.5) / scale - halfY;
      const qx = Math.abs(px) - (halfX - radius);
      const qy = Math.abs(py) - (halfY - radius);
      let depth: number;
      let nx: number;
      let ny: number;

      if (qx > 0 && qy > 0) {
        const length = Math.hypot(qx, qy) || 1;
        depth = radius - length;
        nx = (qx / length) * Math.sign(px);
        ny = (qy / length) * Math.sign(py);
      } else if (qx > qy) {
        depth = radius - qx;
        nx = Math.sign(px);
        ny = 0;
      } else {
        depth = radius - qy;
        nx = 0;
        ny = Math.sign(py);
      }

      const strength = depth < bezel ? (1 - Math.max(depth, 0) / bezel) ** 2 : 0;
      const index = (y * mapWidth + x) * 4;
      image.data[index] = 128 - nx * strength * 127;
      image.data[index + 1] = 128 - ny * strength * 127;
      image.data[index + 2] = 128;
      image.data[index + 3] = 255;
    }
  }

  context.putImageData(image, 0, 0);
  const url = canvas.toDataURL();
  if (maps.size >= MAX_MAPS) maps.delete(maps.keys().next().value!);
  maps.set(key, url);
  return url;
};

export function LiquidGlassFilter() {
  const defsRef = useRef<SVGDefsElement>(null);

  useEffect(() => {
    const defs = defsRef.current;
    if (!defs || !("userAgentData" in navigator)) return;
    document.documentElement.classList.add("has-liquid-glass");

    const filters = new WeakMap<Element, SVGFilterElement>();
    let count = 0;

    const render = (element: HTMLElement) => {
      const width = Math.round(element.offsetWidth);
      const height = Math.round(element.offsetHeight);
      if (!width || !height) return;
      const radius = Math.min(parseFloat(getComputedStyle(element).borderTopLeftRadius) || 0, width / 2, height / 2);
      const bezel = Math.max(4, Math.min(24, height * 0.3, width * 0.3));

      let filter = filters.get(element);
      if (!filter) {
        filter = document.createElementNS(SVG_NS, "filter");
        filter.id = `liquid-glass-${count++}`;
        filter.setAttribute("filterUnits", "userSpaceOnUse");
        filter.setAttribute("color-interpolation-filters", "sRGB");
        filter.innerHTML =
          '<feImage result="map" preserveAspectRatio="none" x="0" y="0" /><feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="G" />';
        defs.appendChild(filter);
        filters.set(element, filter);
        element.style.setProperty("--glass-lens", `url(#${filter.id})`);
      }

      for (const [name, value] of [["x", 0], ["y", 0], ["width", width], ["height", height]] as const) {
        filter.setAttribute(name, String(value));
      }
      const map = filter.firstElementChild!;
      map.setAttribute("width", String(width));
      map.setAttribute("height", String(height));
      map.setAttribute("href", lensMap(width, height, Math.round(radius), Math.round(bezel)));
      filter.lastElementChild!.setAttribute("scale", String(Math.round(bezel * 1.6)));
    };

    const tracked = new WeakSet<Element>();
    const resize = new ResizeObserver((entries) => entries.forEach((entry) => render(entry.target as HTMLElement)));
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal.unobserve(entry.target);
          resize.observe(entry.target);
        }),
      { rootMargin: "200px" }
    );
    const nearViewport = (element: Element) => {
      const { top, bottom } = element.getBoundingClientRect();
      return bottom > -200 && top < window.innerHeight + 200;
    };
    const track = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>(GLASS).forEach((element) => {
        if (tracked.has(element)) return;
        tracked.add(element);
        if (!nearViewport(element)) return reveal.observe(element);
        render(element);
        resize.observe(element);
      });

    track(document);
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        const target = record.target as Element;
        if (record.type === "attributes" && target.matches(GLASS)) track(target.parentElement ?? document);
        record.addedNodes.forEach((node) => node instanceof Element && track(node.parentElement ?? document));
      }
    });
    mutations.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["class"] });

    return () => {
      reveal.disconnect();
      resize.disconnect();
      mutations.disconnect();
    };
  }, []);

  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
      <defs ref={defsRef} />
    </svg>
  );
}
