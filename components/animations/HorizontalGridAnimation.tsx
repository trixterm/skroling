"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Konfigūracija lengvesniam palaikymui
const CONFIG = {
  ROW_COUNT: 12,
  OFFSCREEN_MULTIPLIER: 1.2, // Kiek toli už ekrano nuvažiuoja linijos
  ANIMATION_TRIGGER: ".fp-sec-services",
  // Čia nurodome CSS kintamojo pavadinimą
  CSS_VAR_NAME: "--grid-border-color", 
  COLORS: {
    ACTIVE: "#000000",
    INACTIVE: "transparent", // Arba pradinė spalva, pvz. #dddddd
  },
};

export default function GridAnimationHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Apsauga nuo SSR ir ScrollTrigger registracija
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = document.querySelector(CONFIG.ANIMATION_TRIGGER);
    
    // Jei nėra trigerio, nėra prasmės tęsti
    if (!triggerElement || !containerRef.current) {
      console.warn("GridAnimation: Trigger element not found in DOM");
      return;
    }

    // 2. Sukuriame GSAP kontekstą
    const ctx = gsap.context(() => {
      // Surenkame vidines linijas (saugiai per ref)
      const rows = gsap.utils.toArray<HTMLElement>(".fp-row", containerRef.current);
      
      // Atskiriame viršutines (0-5) ir apatines (6-11) linijas
      const topRows = rows.slice(0, 6);
      const bottomRows = rows.slice(6, 12);

      // Pagrindinė laiko juosta (Timeline)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "top bottom", // Prasideda, kai sekcijos viršus pasiekia ekrano apačią
          end: "bottom 50%",   // Baigiasi, kai sekcijos apačia pasiekia ekrano vidurį
          scrub: 1,            // Sklandus susiejimas su scroll
          anticipatePin: 1,
        },
      });

      // --- PHASE 1: Išsiskleidimas + Border atsiradimas ---
      
      // 1-6 eilutės kyla į viršų
      tl.to(topRows, {
        y: () => -window.innerHeight * CONFIG.OFFSCREEN_MULTIPLIER,
        ease: "none",
        duration: 1,
      }, 0);

      // 7-12 eilutės leidžiasi žemyn
      tl.to(bottomRows, {
        y: () => window.innerHeight * CONFIG.OFFSCREEN_MULTIPLIER,
        ease: "none",
        duration: 1,
      }, 0);

      // Animuojame CSS kintamąjį ant <html> elemento (document.documentElement)
      // Tai automatiškai pakeis spalvą visur, kur šis kintamasis naudojamas
      tl.to(document.documentElement, {
        [CONFIG.CSS_VAR_NAME]: CONFIG.COLORS.ACTIVE,
        ease: "none",
        duration: 1,
      }, 0);

      // --- PHASE 2: Sugrįžimas + Border išnykimas ---

      // Linijos grįžta į 0
      tl.to(rows, {
        y: 0,
        ease: "none",
        duration: 1,
      }, 1);

      // CSS kintamasis grįžta į pradinę reikšmę
      tl.to(document.documentElement, {
        [CONFIG.CSS_VAR_NAME]: CONFIG.COLORS.INACTIVE,
        ease: "none",
        duration: 1,
      }, 1);

    }, containerRef);

    // Išvalymas (Cleanup)
    return () => ctx.revert();
  }, []);

  // Generuojame HTML struktūrą
  return (
    <div className="fp-grid-background-2" ref={containerRef}>
      {Array.from({ length: CONFIG.ROW_COUNT }).map((_, index) => (
        <div
          key={index}
          className="fp-row"
          style={{ 
            // Dinamiškai apskaičiuojame poziciją, kad nereikėtų rašyti CSS :nth-child
            top: `calc(100% / ${CONFIG.ROW_COUNT} * ${index + 1})` 
          }}
        />
      ))}
    </div>
  );
}