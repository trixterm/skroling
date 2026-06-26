"use client";

import {
  useEffect,
  useState,
  useRef,
  useMemo,
  type MouseEvent as ReactMouseEvent,
} from "react";

// Dinaminis GSAP krovimas (labai svarbu)
async function loadGsap() {
  const gsapModule = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsapModule.gsap.registerPlugin(ScrollTrigger);
  return gsapModule.gsap;
}

export default function HeroHomeSection() {
  // ---------------------
  // REACT STATE
  // ---------------------
  const [isFinished, setIsFinished] = useState(false);
  const [isMounting, setIsMounting] = useState(true);

  // ---------------------
  // REFS
  // ---------------------
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const revealed = useRef<Set<number>>(new Set());

  const mousePos = useRef({ x: 0, y: 0 });
  const ballPos = useRef({ x: 0, y: 0 });

  const text = "Websites that move, react and engage your users";
  const chars = useMemo(() => text.split(""), [text]);

  // ---------------------
  // 1. INITIAL THEME & ANIMATION LOGIC
  // ---------------------
  useEffect(() => {
    const seen = localStorage.getItem("hero_animation_seen");
    const theme = localStorage.getItem("theme");

    if (seen === "true" || theme === "light") {
      setIsFinished(true);
      document.body.classList.add("hero-animation-finished");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    const t = setTimeout(() => setIsMounting(false), 50);
    return () => clearTimeout(t);
  }, []);

  // ---------------------
  // 2. GSAP SCROLL FADE-OUT
  // ---------------------
  useEffect(() => {
    if (!headingRef.current || !containerRef.current) return;

    loadGsap().then((gsap) => {
      const ctx = gsap.context(() => {
        gsap.to(headingRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "center top",
            scrub: true,
          },
        });
      });

      return () => ctx.revert();
    });
  }, []);

  // ---------------------
  // 3. MOUSE TRACKING
  // ---------------------
  const handleMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (isFinished || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // ---------------------
  // 4. FLASHLIGHT ANIMATION LOOP
  // ---------------------
  useEffect(() => {
    if (isFinished) return;

    // predefined revealed spaces
    chars.forEach((c, i) => {
      if (c === " ") revealed.current.add(i);
    });

    let frameId: number;
    const radius = 130;
    const r2 = radius * radius;
    let charCenters: { x: number; y: number }[] = [];

    const computeCenters = () => {
      if (!containerRef.current) return;

      const contRect = containerRef.current.getBoundingClientRect();
      charCenters = charsRef.current.map((span) => {
        if (!span) return { x: -9999, y: -9999 };
        const r = span.getBoundingClientRect();
        return {
          x: r.left - contRect.left + r.width / 2,
          y: r.top - contRect.top + r.height / 2,
        };
      });
    };

    computeCenters();

    const resizeObserver = new ResizeObserver(() => computeCenters());
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    const loop = () => {
      if (revealed.current.size >= chars.length) {
        finishAnimation();
        return;
      }

      // movement interpolation
      const dx = mousePos.current.x - ballPos.current.x;
      const dy = mousePos.current.y - ballPos.current.y;
      ballPos.current.x += dx * 0.1;
      ballPos.current.y += dy * 0.1;

      const ballEl = document.getElementById("tracker-ball");
      if (ballEl) {
        ballEl.style.transform = `translate(${ballPos.current.x - 150}px, ${
          ballPos.current.y - 150
        }px)`;
      }

      // reveal logic
      charCenters.forEach((c, i) => {
        if (revealed.current.has(i)) return;
        const ddx = ballPos.current.x - c.x;
        const ddy = ballPos.current.y - c.y;

        if (ddx * ddx + ddy * ddy <= r2) {
          revealed.current.add(i);
          charsRef.current[i]?.classList.add("revealed");
        }
      });

      if (revealed.current.size === chars.length) {
        finishAnimation();
      } else {
        frameId = requestAnimationFrame(loop);
      }
    };

    const finishAnimation = () => {
      setIsFinished(true);
      document.documentElement.classList.remove("dark");
      document.body.classList.add("hero-animation-finished");
      localStorage.setItem("hero_animation_seen", "true");
      localStorage.setItem("theme", "light");
      window.dispatchEvent(new Event("storage"));
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [isFinished, chars]);

  // ---------------------
  // RENDER
  // ---------------------
  const transitionClass = isMounting ? "duration-0" : "duration-1000";

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMove}
      className={`
        fp-sec-hero-home flex justify-center items-center 
        min-h-svh relative overflow-hidden transition-colors ease-in-out 
        dark:bg-[#1A1A1A] ${transitionClass}
        ${isFinished ? "cursor-auto" : "cursor-none"}
      `}
    >
      {/* BALL */}
      <div
        id="tracker-ball"
        className={`gradient-ball absolute pointer-events-none transition-opacity duration-700 ${
          isFinished ? "opacity-0" : "opacity-100"
        }`}
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
          position: "absolute",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
      />

      <div className="container mx-auto relative pointer-events-none">
        <div className="inner max-w-[325px] sm:max-w-[690px] md:max-w-[820px] mx-auto text-center select-none">
          <div
            ref={headingRef}
            className="fp-extra-font text-[50px] sm:text-[54px] lg:text-[65px] font-medium leading-14 sm:leading-16 md:leading-tight will-change-opacity relative z-10"
          >
            {chars.map((char, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) charsRef.current[i] = el;
                }}
                className={`char inline-block whitespace-pre transition-colors duration-300 ${
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
