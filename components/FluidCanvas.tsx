"use client";
import { useEffect } from "react";

export default function FluidCanvas() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/scripts/fluid.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <canvas
      id="fluid-canvas"
      style={{ width: "100%", height: "100%", display: "block" }}
    ></canvas>
  );
}