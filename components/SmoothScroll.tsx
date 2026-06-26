"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";

type SmoothScrollProps = { children: ReactNode };

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.2,
    });

    // Expose Lenis instance to window for ScrollTrigger integration
    (window as any).__lenis = lenis;

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    const ro = new ResizeObserver(() => {
      lenis.resize();
    });
    ro.observe(document.documentElement);

    const refresh = () => requestAnimationFrame(() => lenis.resize());
    window.addEventListener("load", refresh);
    document.querySelectorAll("img[loading='lazy']").forEach((img) => {
      img.addEventListener("load", refresh, { passive: true } as any);
    });

    return () => {
      window.removeEventListener("load", refresh);
      ro.disconnect();
      cancelAnimationFrame(frameId);
      lenis.destroy();
      // Clean up window reference
      delete (window as any).__lenis;
    };
  }, []);

  return <>{children}</>;
}
