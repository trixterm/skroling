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

      if (!serviceSection || !gridContainer) {
        console.warn("GridAnimation: Required elements not found in DOM");
        return null;
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

        // Filter lines for left movement (indices 0-5, excluding index 3 which is 4th line)
        const leftLines = lines.filter((_, index) => {
          return index >= 0 && index <= 5 && index !== 3;
        });

        // Filter lines for right movement (indices 6-11, excluding index 7 which is 8th line)
        const rightLines = lines.filter((_, index) => {
          return index >= 6 && index <= 11 && index !== 7;
        });

        // Select the 4th and 8th lines (indices 3 and 7) for color animation
        const fixedLines = [lines[3], lines[7]].filter(Boolean);

        // Store original background color for restoration
        const originalBgColor = "#dddddd";

        // Create master timeline with ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".fp-sec-services",
            start: "top bottom", // Animation starts when top of section enters viewport
            end: "bottom 50%", // Animation ends when bottom of section reaches top of viewport
            scrub: 1, // Smooth scrubbing, makes animation tied to scroll position
            markers: false, // Set to true during development to see trigger points
            anticipatePin: 1,
          },
        });

        // PHASE 1: Lines move outward + Fixed lines turn black (first half of scroll range)
        
        // Left lines move to the left
        tl.to(
          leftLines,
          {
            x: () => -window.innerWidth * 1.2, // Move off-screen with buffer
            ease: "none", // Linear easing for scroll-tied animations
            duration: 1,
          },
          0
        );

        // Right lines move to the right
        tl.to(
          rightLines,
          {
            x: () => window.innerWidth * 1.2, // Move off-screen with buffer
            ease: "none",
            duration: 1,
          },
          0
        );

        // 4th and 8th lines: Animate background color to black
        tl.to(
          fixedLines,
          {
            backgroundColor: "#000000",
            ease: "none",
            duration: 1,
          },
          0 // Start at the same time as movement
        );

        // PHASE 2: Lines return to original position + Fixed lines return to original color (second half of scroll range)
        
        // Left lines return
        tl.to(
          leftLines,
          {
            x: 0,
            ease: "none",
            duration: 1,
          },
          1
        );

        // Right lines return
        tl.to(
          rightLines,
          {
            x: 0,
            ease: "none",
            duration: 1,
          },
          1
        );

        // 4th and 8th lines: Return background color to original
        tl.to(
          fixedLines,
          {
            backgroundColor: originalBgColor,
            ease: "none",
            duration: 1,
          },
          1 // Start at the same time as lines returning
        );
      });

      return ctx;
    };

    // Initialize with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const ctx = initAnimation();
      
      // Store context for cleanup
      if (ctx) {
        (window as any).__gridAnimationContext = ctx;
      }
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      
      const ctx = (window as any).__gridAnimationContext;
      if (ctx) {
        ctx.revert();
        delete (window as any).__gridAnimationContext;
      }
      
      // Kill all ScrollTriggers created by this component
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === ".fp-sec-services") {
          trigger.kill();
        }
      });
    };
  }, []);

  // This component doesn't render anything visible
  // It only attaches animation logic to existing DOM elements
  return null;
}