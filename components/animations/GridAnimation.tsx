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
        // Indices: 1, 2, 4, 5 (Index 3 is fixed, Index 0 is container-aligned)
        const flyLeftLines = lines.filter((_, index) => {
          return [1, 2, 4, 5].includes(index);
        });

        // Group 2: Lines flying completely OFF to the RIGHT
        // Indices: 6, 8, 9, 10 (Index 7 is fixed, Index 11 is container-aligned)
        const flyRightLines = lines.filter((_, index) => {
          return [6, 8, 9, 10].includes(index);
        });

        // Group 3: Lines aligning to CONTAINER edges
        const alignLeftLine = lines[0];  // First line
        const alignRightLine = lines[11]; // Last line

        // Group 4: Lines changing COLOR
        // Fixed lines (3, 7) + Container lines (0, 11)
        const colorLines = [lines[0], lines[3], lines[7], lines[11]].filter(Boolean);

        // Store original background color for restoration
        const originalBgColor = "#dddddd";

        // ---------------------------------------------------------
        // PHASE 1: ENTER (Išsiskirstymas)
        // ---------------------------------------------------------
        const tlEnter = gsap.timeline({
          scrollTrigger: {
            trigger: ".fp-sec-services",
            start: "top bottom", // Starts when top of section hits bottom of viewport
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
            x: (index, target) => {
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
            x: (index, target) => {
              const rect = target.getBoundingClientRect();
              return (window.innerWidth - rect.left) + 7.5;
            },
            ease: "none",
            duration: 1,
          },
          0
        );

        // Konfigūracija
        const padding = 15; 

        // 3. Container Alignment - Left (Line 0)
        if (container && alignLeftLine) {
          tlEnter.to(alignLeftLine, {
            x: () => {
              const containerRect = container.getBoundingClientRect();
              const lineRect = alignLeftLine.getBoundingClientRect();
              
              // Calculate delta to move line to container's left edge + 20px padding
              return (containerRect.left - lineRect.left) + padding;
            },
            ease: "none",
            duration: 1,
          }, 0);
        }

        // 4. Container Alignment - Right (Line 11)
        if (container && alignRightLine) {
          tlEnter.to(alignRightLine, {
            x: () => {
              const containerRect = container.getBoundingClientRect();
              const lineRect = alignRightLine.getBoundingClientRect();
              
              // Calculate delta to move line to container's right edge - 20px padding
              return (containerRect.right - lineRect.right) - padding;
            },
            ease: "none",
            duration: 1,
          }, 0);
        }

        // 5. Color Animation (Fixed + Container Lines)
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
        if (alignLeftLine) allMovingLines.push(alignLeftLine);
        if (alignRightLine) allMovingLines.push(alignRightLine);

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