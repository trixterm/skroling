"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import DrawSVGPlugin from "@/libs/gsap/DrawSVGPlugin";

export default function DrawSvgClient() {
  const svgRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(DrawSVGPlugin);

    gsap.fromTo(
      svgRef.current,
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 2, ease: "power2.inOut" }
    );
  }, []);

  return (
    <svg width="200" height="200" viewBox="0 0 100 100">
      <path
        ref={svgRef}
        d="M10 10 L90 10 L90 90 L10 90 Z"
        stroke="black"
        fill="none"
        strokeWidth="2"
      />
    </svg>
  );
}