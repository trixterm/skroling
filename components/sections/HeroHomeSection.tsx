"use client";

import { useEffect, useState, useRef, useLayoutEffect, type MouseEvent as ReactMouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Saugiai registruojame GSAP papildinį
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroHomeSection() {
  // Būsenos
  const [isFinished, setIsFinished] = useState(false);
  const [isMounting, setIsMounting] = useState(true); // Reikalingas, kad sustabdytų transition krovimosi metu

  // Refs elementams ir logikai
  const mousePos = useRef({ x: 0, y: 0 });
  const ballPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const revealedIndices = useRef<Set<number>>(new Set());

  const text = "Websites that move, react, and engage your user";

  // --- 1. Pirminis patikrinimas (Initial Load Check) ---
  useLayoutEffect(() => {
    // Patikriname, ar vartotojas jau matė animaciją
    const animationSeen = localStorage.getItem("hero_animation_seen");
    const currentTheme = localStorage.getItem("theme");

    // Jei animacija jau rodyta ARBA vartotojas pasirinkęs šviesią temą
    if (animationSeen === "true" || currentTheme === "light") {
      setIsFinished(true);
      
      // Pažymime body elementą (globaliam stiliui)
      document.body.classList.add("hero-animation-finished");

      if (currentTheme === "light") {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Priverstinai uždedame dark klasę startui (animacijos metu fonas turi būti tamsus)
      document.documentElement.classList.add("dark");
    }

    // Leidžiame CSS transitions veikti tik po trumpo laiko (kad nebūtų flash efekto)
    const timer = setTimeout(() => setIsMounting(false), 50);
    return () => clearTimeout(timer);
  }, []);

  // --- 2. GSAP Scroll Animacija (Opacity mažėjimas skrolinant) ---
  useLayoutEffect(() => {
    if (!containerRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(headingRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "center top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- 3. Pelės judėjimo sekimas ---
  const handleMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (isFinished || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // --- 4. Animacijos logika (Flashlight effect) ---
  useEffect(() => {
    // Jei komponentas užsikrovė ir jau yra "Finished", neleidžiame ciklo
    if (isFinished) return;

    // Inicializuojame tarpus kaip "revealed"
    text.split("").forEach((char, index) => {
      if (char === " ") revealedIndices.current.add(index);
    });

    let frameId: number;
    const radius = 130;
    const r2 = radius * radius;
    const totalChars = text.length;
    let charRects: { x: number; y: number }[] = [];
    
    // Suskaičiuojame raidžių pozicijas
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

    calculateRects();
    window.addEventListener("resize", calculateRects);

    const loop = () => {
      // Jei viskas atidengta -> baigiame
      if (revealedIndices.current.size >= totalChars) {
        finishAnimation();
        return;
      }

      // Rutulio judėjimo "ease" logika
      const dx = mousePos.current.x - ballPos.current.x;
      const dy = mousePos.current.y - ballPos.current.y;
      ballPos.current.x += dx * 0.1;
      ballPos.current.y += dy * 0.1;

      const ball = document.getElementById("tracker-ball");
      if (ball) {
        ball.style.transform = `translate(${ballPos.current.x - 150}px, ${ballPos.current.y - 150}px)`;
      }

      // Tikriname susidūrimus su raidėmis
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
      
      // Nustatome į Light mode (pagal jūsų pradinį reikalavimą)
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      
      // Išsaugome, kad animacija matyta, ir pažymime body
      localStorage.setItem("hero_animation_seen", "true");
      document.body.classList.add("hero-animation-finished");

      // Pranešame kitiems komponentams (pvz., ThemeToggle)
      window.dispatchEvent(new Event("storage"));
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", calculateRects);
    };
  }, [isFinished]); // Priklausomybė isFinished užtikrina, kad efektas nepasileis, jei jau true

  // --- 5. Renderinimas ---
  
  // Nustatome transition trukmę (0 užsikraunant, 1000 vėliau)
  const transitionClass = isMounting ? "duration-0" : "duration-1000";

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMove}
      className={`
        fp-sec-hero-home flex justify-center items-center h-screen relative overflow-hidden 
        transition-colors ease-in-out dark:bg-[#1A1A1A] 
        ${transitionClass}
        ${isFinished ? "cursor-auto" : "cursor-none"}
      `}
    >
      {/* Tracker Ball (Šviesos efektas) */}
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

      <div className="container mx-auto relative pointer-events-none">
        <div className="inner max-w-[800px] mx-auto text-center select-none">
          {/* Antraštė */}
          <div 
            ref={headingRef} 
            className="fp-extra-font text-6xl font-semibold leading-17 text[#383232] will-change-opacity z-2 relative"
          >
            {text.split("").map((char, i) => (
              <span
                key={i}
                ref={(el) => { charsRef.current[i] = el; }}
                className={`
                  char inline-block whitespace-pre transition-colors duration-300 
                  ${
                    isFinished 
                      // Jei baigta: juoda (light) arba balta (dark)
                      ? "text-black dark:text-white" 
                      // Jei animuojama: tamsiai pilka (kad susilietų su juodu fonu)
                      : "text-[#333]"
                  }
                `}
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