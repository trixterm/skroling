"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useAnimation } from "@/context/AnimationContext";

const ORIGINAL_TEXT = "Where performance meets perfection.";
const RADIUS = 110;
const RADIUS_SQUARED = RADIUS * RADIUS;

export default function IntroSection() {
  const { setIntroFinished } = useAnimation()!;

  // Track revealed state for each character in React state
  const [revealed, setRevealed] = useState<boolean[]>(
    () => new Array(ORIGINAL_TEXT.length).fill(false)
  );
  const [fullyRevealed, setFullyRevealed] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Refs for DOM measurements (not manipulation)
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const charRectsRef = useRef<DOMRect[]>([]);

  // Update character bounding rects
  const updateRects = useCallback(() => {
    charRectsRef.current = charRefs.current.map(
      (span) => span?.getBoundingClientRect() ?? new DOMRect()
    );
  }, []);

  // Finish animation handler
  const finishAnimation = useCallback(() => {
    setFullyRevealed(true);
    setShowCursor(false);
    document.body.classList.add("white-mode");
    document.body.style.cursor = "auto";

    setTimeout(() => {
      document.body.classList.add("flash-done");
    }, 600);

    setIntroFinished(true);
  }, [setIntroFinished]);

  // Mouse move handler
  useEffect(() => {
    if (fullyRevealed) return;

    updateRects();

    const handleMouseMove = (e: MouseEvent) => {
      // Animate cursor
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
        });
      }

      const mx = e.clientX;
      const my = e.clientY;

      setRevealed((prev) => {
        const next = [...prev];
        let changed = false;
        let revealedCount = 0;

        for (let i = 0; i < ORIGINAL_TEXT.length; i++) {
          if (next[i]) {
            revealedCount++;
            continue;
          }

          const rect = charRectsRef.current[i];
          if (!rect) continue;

          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = mx - cx;
          const dy = my - cy;

          if (dx * dx + dy * dy <= RADIUS_SQUARED) {
            next[i] = true;
            changed = true;
            revealedCount++;
          }
        }

        // Check if all revealed
        if (revealedCount === ORIGINAL_TEXT.length) {
          // Schedule finish outside of setState
          setTimeout(() => finishAnimation(), 0);
        }

        return changed ? next : prev;
      });
    };

    const handleResize = () => updateRects();

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [fullyRevealed, updateRects, finishAnimation]);

  // Initial rect calculation after mount
  useEffect(() => {
    updateRects();
  }, [updateRects]);

  return (
    <section className="fp-sec-hero-home flex justify-center items-center h-screen">
      {showCursor && (
        <div ref={cursorRef} className="spotlight-cursor" />
      )}
      <h1
        className={`text-5xl font-medium reveal-title text-center ${
          fullyRevealed ? "fully-revealed" : ""
        }`}
      >
        {ORIGINAL_TEXT.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => { charRefs.current[i] = el; }}
            className={`char ${revealed[i] ? "revealed" : ""}`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </section>
  );
}
