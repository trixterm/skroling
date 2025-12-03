"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

// --- Constants ---
const TARGET_SELECTORS = [".fp-services-list", ".fp-section-heading", ".fp-heading"];
const OBSERVER_OPTIONS = {
  root: null,
  threshold: 0,
  rootMargin: "0px",
};

// --- Custom Hook for Theme Detection ---
function useDarkTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 1. Initial check (runs only on client)
    const html = document.documentElement;
    const checkTheme = () => setIsDark(html.classList.contains("dark"));
    
    checkTheme();

    // 2. Observer for dynamic changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          checkTheme();
        }
      }
    });

    observer.observe(html, { attributes: true });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return isDark;
}

export default function Logo() {
  // 1. Integrate Theme Logic
  const isDark = useDarkTheme();

  // 2. Define Assets based on theme
  // Using useMemo prevents recalculation on every render, though strictly optional for simple strings
  const assets = useMemo(() => ({
    mainLogo: isDark 
      ? "/images/logo-skroling-light-2.svg" 
      : "/images/logo-skroling-3.svg",
    letterLogo: isDark 
      ? "/images/logo-skroling-letter-light.svg" 
      : "/images/logo-skroling-letter.svg"
  }), [isDark]);

  // --- Existing Logic ---
  const [isHidden, setIsHidden] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const anyOverlap = entries.some((entry) => entry.isIntersecting);
    setIsHidden(anyOverlap);
  }, []);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        handleIntersection,
        OBSERVER_OPTIONS
      );
    }

    const observer = observerRef.current;
    const targets = document.querySelectorAll(TARGET_SELECTORS.join(", "));

    if (targets.length === 0) return;

    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.unobserve(target));
    };
  }, [handleIntersection]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return (
    <a
      ref={logoRef}
      href="/"
      className={`fp-logo text-2xl font-bold z-50 transition-opacity duration-300 ease-in-out ${
        isHidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Skroling Home"
    >
      <div className="fp-img-wrap relative overflow-hidden">
        {/* Main Logo */}
        <Image
          key={assets.mainLogo} // Key ensures React remounts/animates correctly if needed
          src={assets.mainLogo}
          width={120}
          height={32}
          alt="Logo Skroling"
          priority
          quality={90}
        />
        <div className="fp-logo-letters absolute w-[17px] h-[17px] top-[7px] left-[50px] overflow-hidden">
          <div className="fp-logo-letters-anim w-[17px] h-[41px]">
            {/* Repeated Letters 
              Ideally, map these from an array to reduce code duplication
            */}
            {[...Array(5)].map((_, index) => (
              <Image
                key={`${assets.letterLogo}-${index}`}
                className={index < 4 ? "mb-[1px]" : ""}
                src={assets.letterLogo}
                width={17}
                height={17}
                alt=""
                loading="eager"
                quality={90}
              />
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}