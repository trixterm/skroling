"use client";

import React, { useEffect, useRef, useState } from "react";

const CONFIG = {
  ROW_COUNT: 8,
  OFFSCREEN_MULTIPLIER: 1.2,
  ANIMATION_TRIGGER: ".fp-sec-services",
  CSS_VAR_NAME: "--grid-border-color",
  COLORS: {
    ACTIVE: "rgba(0, 0, 0, 1)",
    INACTIVE: "rgba(0, 0, 0, 0)",
  },
  // ✅ Desktop breakpoint (pakeisk jei reikia)
  DESKTOP_MQ: "(min-width: 1199px)",
} as const;

export default function GridAnimationHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(CONFIG.DESKTOP_MQ);

    const update = () => setIsDesktop(mq.matches);
    update();

    // Safari fallback
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return; // ✅ mobile: nieko nedarom
    if (typeof window === "undefined") return;

    let killed = false;
    let ctx: any;

    (async () => {
      // ✅ GSAP įsikrauna tik kai desktop
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");

      if (killed) return;

      const gsap = (gsapMod as any).gsap ?? (gsapMod as any).default ?? gsapMod;
      const ScrollTrigger = (stMod as any).ScrollTrigger ?? (stMod as any).default ?? stMod;

      gsap.registerPlugin(ScrollTrigger);

      const triggerElement = document.querySelector(CONFIG.ANIMATION_TRIGGER) as HTMLElement | null;
      if (!triggerElement || !containerRef.current) {
        console.warn("GridAnimation: Trigger element not found in DOM");
        return;
      }

      const varTarget = triggerElement;

      ctx = gsap.context(() => {
        const rows = gsap.utils.toArray<HTMLElement>(".fp-row", containerRef.current);

        const half = Math.ceil(rows.length / 2);
        const topRows = rows.slice(0, half);
        const bottomRows = rows.slice(half);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: "top bottom",
            end: "bottom 50%",
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1
        tl.to(
          topRows,
          {
            y: () => -window.innerHeight * CONFIG.OFFSCREEN_MULTIPLIER,
            ease: "none",
            duration: 1,
          },
          0
        );

        tl.to(
          bottomRows,
          {
            y: () => window.innerHeight * CONFIG.OFFSCREEN_MULTIPLIER,
            ease: "none",
            duration: 1,
          },
          0
        );

        tl.to(
          varTarget,
          {
            [CONFIG.CSS_VAR_NAME]: CONFIG.COLORS.ACTIVE,
            ease: "none",
            duration: 1,
          },
          0
        );

        // Phase 2
        tl.to(
          rows,
          {
            y: 0,
            ease: "none",
            duration: 1,
          },
          1
        );

        tl.to(
          varTarget,
          {
            [CONFIG.CSS_VAR_NAME]: CONFIG.COLORS.INACTIVE,
            ease: "none",
            duration: 1,
          },
          1
        );
      }, containerRef);

      ScrollTrigger.refresh();
    })();

    return () => {
      killed = true;
      ctx?.revert();
    };
  }, [isDesktop]);

  // ✅ mobile: komponentas net nerenderinamas
  if (!isDesktop) return null;

  return (
    <div className="fp-grid-background-2" ref={containerRef}>
      {Array.from({ length: CONFIG.ROW_COUNT }).map((_, index) => (
        <div
          key={index}
          className="fp-row"
          style={{ top: `calc(100% / ${CONFIG.ROW_COUNT} * ${index + 1})` }}
        />
      ))}
    </div>
  );
}