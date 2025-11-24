"use client";

import { useEffect, useState, useRef } from "react";

export default function Logo() {
  const [isHidden, setIsHidden] = useState(false);
  const logoRef = useRef(null);

  // Surašykite klases elementų, ant kurių užlipus logotipas TURI DINGTI.
  // Pagal jūsų HTML, geriausia taikyti į visą sąrašo konteinerį.
  const targetSelectors = [
    ".fp-services-list", // Visas paslaugų blokas
    ".fp-section-heading",
    ".fp-heading"
  ];

  useEffect(() => {
    let rafId;

    const checkIntersection = () => {
      if (!logoRef.current) return;

      // 1. Gauname logotipo koordinates ir dydį
      const logoRect = logoRef.current.getBoundingClientRect();

      // 2. Ieškome visų elementų, kurie atitinka mūsų selektorius
      // querySelectorAll grąžina NodeList, paverčiame į masyvą su Array.from arba spread
      const targets = document.querySelectorAll(targetSelectors.join(", "));
      
      let overlaps = false;

      // 3. Einame per kiekvieną "taikinį" ir tikriname matematinę sankirtą
      for (const target of targets) {
        const targetRect = target.getBoundingClientRect();

        // Ši formulė tikrina, ar du stačiakampiai persidengia
        const isOverlapping = !(
          logoRect.right < targetRect.left || 
          logoRect.left > targetRect.right || 
          logoRect.bottom < targetRect.top || 
          logoRect.top > targetRect.bottom
        );

        if (isOverlapping) {
          overlaps = true;
          break; // Jei radome bent vieną sankirtą, toliau neieškome
        }
      }

      setIsHidden(overlaps);
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkIntersection);
    };

    window.addEventListener("scroll", onScroll);
    // Patikriname iškart užkrovus
    checkIntersection();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <a
      ref={logoRef}
      href="/"
      className={`
        fp-logo text-2xl font-bold z-50 px-2 py-1
        transition-opacity duration-300 ease-in-out
        ${isHidden ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      Skroling
    </a>
  );
}