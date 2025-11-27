"use client";

import { useEffect, useRef, useState, useMemo } from "react";

export default function Logo() {
  const [isHidden, setIsHidden] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const targetSelectors = useMemo(
    () => [".fp-services-list", ".fp-section-heading", ".fp-heading"],
    []
  );

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // If ANY target intersects the logo → hide it
        const anyOverlap = entries.some((entry) => entry.isIntersecting);
        setIsHidden(anyOverlap);
      },
      {
        root: null,
        threshold: 0, // Trigger on any overlap
      }
    );

    const targets = document.querySelectorAll(targetSelectors.join(", "));
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, [targetSelectors]);

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