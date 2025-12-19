"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CONFIG = {
  ROW_COUNT: 8,
  OFFSCREEN_MULTIPLIER: 1.2,
  ANIMATION_TRIGGER: ".fp-sec-services",
  CSS_VAR_NAME: "--grid-border-color",
  COLORS: {
    ACTIVE: "rgba(0, 0, 0, 1)",
    INACTIVE: "rgba(0, 0, 0, 0)",
  },
} as const;

export default function GridAnimationHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = document.querySelector(CONFIG.ANIMATION_TRIGGER) as HTMLElement | null;
    if (!triggerElement || !containerRef.current) {
      console.warn("GridAnimation: Trigger element not found in DOM");
      return;
    }

    // Animaciją daryk ant pačios sekcijos, kurioje yra linijos (mažiau “paveldėjimo” bugų)
    const varTarget = triggerElement;

    const ctx = gsap.context(() => {
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
    return () => ctx.revert();
  }, []);

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
