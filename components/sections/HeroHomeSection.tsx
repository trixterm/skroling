"use client";

import { useEffect, useState, useRef, useLayoutEffect, type MouseEvent as ReactMouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin outside the component to avoid re-registering on renders
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroHomeSection() {
  const [isFinished, setIsFinished] = useState(false);

  const mousePos = useRef({ x: 0, y: 0 });
  const ballPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null); // Added ref for specific targeting
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const revealedIndices = useRef<Set<number>>(new Set());

  const text = "Websites that move, react, and engage your user";

  // --- GSAP Scroll Animation Logic ---
  useLayoutEffect(() => {
    // Safety check
    if (!containerRef.current || !headingRef.current) return;

    // Create a GSAP context for easy cleanup
    const ctx = gsap.context(() => {
      gsap.to(headingRef.current, {
        opacity: 0,
        ease: "none", // crucial for scrubbing to feel 1:1 with scroll
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",      // Animation starts when top of hero hits top of viewport
          end: "center top",
          scrub: true,           // Links animation progress directly to scrollbar
          invalidateOnRefresh: true, // Recalculates on resize
        },
      });
    }, containerRef); // Scope selectors to this container

    return () => ctx.revert(); // Cleanup GSAP instance when component unmounts
  }, []);

  // --- Existing Reveal Logic (Unchanged) ---
  const handleMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (isFinished || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
        setIsFinished(true);
        document.documentElement.classList.remove("dark");
        return; 
    }

    text.split("").forEach((char, index) => {
      if (char === " ") revealedIndices.current.add(index);
    });

    let frameId: number;
    const radius = 130;
    const r2 = radius * radius;
    const totalChars = text.length;
    let charRects: { x: number; y: number }[] = [];
    
    const calculateRects = () => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        charRects = charsRef.current.map((span) => {
            if (!span) return { x: -9999, y: -9999 };
            const rect = span.getBoundingClientRect();
            return {
                x: rect.left - containerRect.left + rect.width / 2,
                y: rect.top - containerRect.top + rect.height / 2,
            };
        });
    };

    setTimeout(calculateRects, 100);
    window.addEventListener("resize", calculateRects);

    const loop = () => {
      if (revealedIndices.current.size >= totalChars) {
        if (!isFinished) finishAnimation();
        return;
      }

      const dx = mousePos.current.x - ballPos.current.x;
      const dy = mousePos.current.y - ballPos.current.y;
      ballPos.current.x += dx * 0.1;
      ballPos.current.y += dy * 0.1;

      const ball = document.getElementById("tracker-ball");
      if (ball) {
        ball.style.transform = `translate(${ballPos.current.x - 150}px, ${ballPos.current.y - 150}px)`;
      }

      charRects.forEach((rect, i) => {
        if (revealedIndices.current.has(i)) return;
        const distDx = ballPos.current.x - rect.x;
        const distDy = ballPos.current.y - rect.y;

        if (distDx * distDx + distDy * distDy <= r2) {
          revealedIndices.current.add(i);
          if (charsRef.current[i]) {
            charsRef.current[i]?.classList.add("revealed");
          }
        }
      });

      if (revealedIndices.current.size === totalChars) {
        finishAnimation();
      } else {
        frameId = requestAnimationFrame(loop);
      }
    };

    const finishAnimation = () => {
      setIsFinished(true);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      window.dispatchEvent(new Event("storage"));
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", calculateRects);
    };
  }, [isFinished]); // Added dependency to ensure safe execution

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMove}
      className={`
        fp-sec-hero-home flex justify-center items-center h-screen relative overflow-hidden 
        transition-colors duration-1000 ease-in-out
        ${isFinished 
            ? "bg-[#f5f5f5] dark:bg-[#1A1A1A] text-black dark:text-white cursor-auto" 
            : "bg-[#1A1A1A] text-transparent cursor-none"
        }
      `}
    >
      <div
        id="tracker-ball"
        className={`gradient-ball absolute pointer-events-none transition-opacity duration-700 ${
          isFinished ? "opacity-0" : "opacity-100"
        }`}
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
          position: "absolute",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
      />

      <div className="container mx-auto relative z-10 pointer-events-none">
        <div className="inner max-w-[800px] mx-auto text-center select-none">
          {/* Added ref={headingRef} here. 
             Added will-change-opacity to hint the browser for optimization.
          */}
          <div 
            ref={headingRef} 
            className="fp-heading text-5xl font-semibold leading-tight will-change-opacity"
          >
            {text.split("").map((char, i) => (
              <span
                key={i}
                ref={(el) => { charsRef.current[i] = el; }}
                className={`char transition-colors duration-300 inline-block whitespace-pre ${
                  isFinished 
                    ? "text-black dark:text-white" 
                    : "text-[#333]"
                }`}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}