import { useEffect, useRef, type RefObject } from "react";

export function useMouseParallax(): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const layers = () => root.querySelectorAll<HTMLElement>("[data-parallax]");
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let running = true;

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      if (!running) return;
      cx += (tx - cx) * 0.075;
      cy += (ty - cy) * 0.075;
      layers().forEach((el) => {
        const depth = Number(el.dataset.parallax) || 10;
        el.style.transform = `translate3d(${(cx * depth).toFixed(2)}px, ${(cy * depth).toFixed(2)}px, 0)`;
      });
      const idle = Math.abs(tx - cx) < 0.002 && Math.abs(ty - cy) < 0.002;
      raf = idle ? 0 : requestAnimationFrame(tick);
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return ref;
}
