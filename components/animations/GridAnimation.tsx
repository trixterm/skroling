"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GridAnimation() {
  useEffect(() => {
    // Guard against SSR
    if (typeof window === "undefined") return;

    // Ensure ScrollTrigger is registered
    gsap.registerPlugin(ScrollTrigger);

    // Wait for DOM to be ready
    const initAnimation = () => {
      // Check if required elements exist
      const serviceSection = document.querySelector(".fp-sec-services");
      const gridContainer = document.querySelector(".fp-grid-background-1");
      const container = document.querySelector(".container");

      if (!serviceSection || !gridContainer) {
        console.warn("GridAnimation: Required elements not found in DOM");
        return null;
      }

      // Check for container specifically for the new feature
      if (!container) {
        console.warn("GridAnimation: .container element not found. Alignment features may not work.");
      }

      // Create GSAP context for cleanup
      const ctx = gsap.context(() => {
        // Select all grid lines
        const lines = gsap.utils.toArray<HTMLElement>(
          ".fp-grid-background-1 .fp-line"
        );

        if (lines.length === 0) {
          console.warn("GridAnimation: No .fp-line elements found");
          return;
        }

        // --- GROUPING LOGIC ---

        // Group 1: Lines flying completely OFF to the LEFT
        // Left half: indices 0-5 → half of them slide left
        // Indices: 1, 2, 4, 5 (excluding fixed 0 and 3)
        const flyLeftLines = lines.filter((_, index) => {
          return [1, 2, 4, 5].includes(index);
        });

        // Group 2: Lines flying completely OFF to the RIGHT
        // Right half: indices 6-11 → half of them slide right
        // Indices: 6, 8, 9, 10 (excluding fixed 7 and 11)
        const flyRightLines = lines.filter((_, index) => {
          return [6, 8, 9, 10].includes(index);
        });

        // Group 3: Lines changing COLOR
        // Fixed lines (0, 3, 7, 11) - edges and dividers stay static
        // Lines 4 (1/3) and 8 (2/3) are the column dividers
        const colorLines = [lines[0], lines[3], lines[7], lines[11]].filter(Boolean);

        // Store original background color for restoration
        const originalBgColor = "#dddddd";

        // ---------------------------------------------------------
        // PHASE 1: ENTER (Išsiskirstymas)
        // ---------------------------------------------------------
        const tlEnter = gsap.timeline({
          scrollTrigger: {
            trigger: ".fp-sec-services",
            start: "top 75%", // Starts when top of section hits 75% of viewport (1/4 from bottom)
            end: "top center",   // Ends when top of section hits center of viewport
            scrub: 1,
            markers: false,
            invalidateOnRefresh: true, // IMPORTANT: Recalculates function-based values on resize
          },
        });

        // 1. Standard Fly-Out Left
        tlEnter.to(
          flyLeftLines,
          {
            x: (_index, target) => {
              const rect = target.getBoundingClientRect();
              return -(rect.right + 7.5);
            },
            ease: "none",
            duration: 1,
          },
          0
        );

        // 2. Standard Fly-Out Right
        tlEnter.to(
          flyRightLines,
          {
            x: (_index, target) => {
              const rect = target.getBoundingClientRect();
              return (window.innerWidth - rect.left) + 7.5;
            },
            ease: "none",
            duration: 1,
          },
          0
        );

        // 3. Color Animation (Fixed + Container Lines)
        tlEnter.to(
          colorLines,
          {
            backgroundColor: "#000000",
            ease: "none",
            duration: 1,
          },
          0
        );

        // ---------------------------------------------------------
        // PHASE 2: EXIT (Sugrįžimas)
        // ---------------------------------------------------------
        const tlExit = gsap.timeline({
          scrollTrigger: {
            trigger: ".fp-sec-services",
            start: "bottom bottom",
            end: "bottom center",
            scrub: 1,
            markers: false,
            immediateRender: false,
            invalidateOnRefresh: true, 
          },
        });

        // Return ALL lines to x: 0
        // We can target all subsets to ensure everything resets correctly
        const allMovingLines = [...flyLeftLines, ...flyRightLines];

        tlExit.to(
          allMovingLines,
          {
            x: 0,
            ease: "none",
            duration: 1,
          },
          0
        );

        // Return Color
        tlExit.to(
          colorLines,
          {
            backgroundColor: originalBgColor,
            ease: "none",
            duration: 1,
          },
          0
        );
      });

      return ctx;
    };

    // Initialize with a small delay to ensure DOM is ready and layout is stable
    const timeoutId = setTimeout(() => {
      const ctx = initAnimation();
      
      if (ctx) {
        (window as any).__gridAnimationContext = ctx;
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      
      const ctx = (window as any).__gridAnimationContext;
      if (ctx) {
        ctx.revert();
        delete (window as any).__gridAnimationContext;
      }
      
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === ".fp-sec-services") {
          trigger.kill();
        }
      });
    };
  }, []);

  return null;
}