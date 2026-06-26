"use client";

import { memo, useRef } from "react";
import dynamic from "next/dynamic";

interface CountUpAnimationProps {
  readonly value: number;
  readonly subtitle: string;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly className?: string;
}

function CountUpAnimation({
  value,
  subtitle,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  // Lazy-load GSAP only when component mounts
  useClientGSAP(() => {
    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { useGSAP } = await import("@gsap/react");

      gsap.registerPlugin(ScrollTrigger, useGSAP);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.fromTo(
        numberRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        }
      );

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        },
        "-=1.0"
      );

      tl.fromTo(
        borderRef.current,
        { width: "0%" },
        {
          width: "100%",
          duration: 2,
          ease: "power3.inOut",
        },
        "-=1.2"
      );
    })();
  });

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* NUMBER */}
      <div ref={numberRef} className={`fp-number inline-flex items-baseline ${className}`}>
        <span className="flex items-baseline">
          {prefix && <span>{prefix}</span>}
          <span>{value}</span>
          {suffix && <span>{suffix}</span>}
        </span>
      </div>

      {/* SUBTITLE */}
      <div ref={subtitleRef} className="fp-number-subtitle text-[12px] font-medium uppercase pb-3">
        {subtitle}
      </div>

      {/* LINE */}
      <div ref={borderRef} className="bg-current h-[1px] w-0"></div>
    </div>
  );
}

export default memo(CountUpAnimation);

// Custom hook: safely runs GSAP only on client
function useClientGSAP(callback: () => void) {
  if (typeof window !== "undefined") {
    callback();
  }
}