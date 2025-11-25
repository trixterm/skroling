"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface CountUpAnimationProps {
  value: number;
  subtitle: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function CountUpAnimation({
  value,
  subtitle,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    // 1. Atsiranda Skaičius (Opacity + šiek tiek pakyla)
    tl.fromTo(
      ".fp-number",
      { opacity: 0, y: 20 }, 
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      }
    );

    // 2. Atsiranda Subtitras
    tl.fromTo(
      ".fp-number-subtitle",
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      },
      "-=1.0" // Prasideda šiek tiek anksčiau, kol skaičius dar animuojasi
    );

    // 3. Nusibraižo linija
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

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col">
      
      {/* SKAIČIUS (Statinis, tik su Opacity animacija) */}
      <div className={`fp-number inline-flex items-baseline ${className}`}>
        <span className="flex items-baseline">
          {prefix && <span>{prefix}</span>}
          <span>{value}</span>
          {suffix && <span>{suffix}</span>}
        </span>
      </div>

      {/* SUBTITRAS */}
      <div className="fp-number-subtitle text-[12px] font-medium uppercase pb-3">
        {subtitle}
      </div>

      {/* LINIJA */}
      <div 
        ref={borderRef}
        className="bg-current h-[1px]"
        style={{ width: 0 }} 
      ></div>
      
    </div>
  );
}