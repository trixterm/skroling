"use client";

import { useEffect, useRef } from "react";

export default function FluidBall() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // saugiklis

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // dar vienas saugiklis

    let x = 200, y = 200;
    let dx = 2, dy = 2;
    let frameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fillStyle = "#222";
      ctx.fill();

      x += dx;
      y += dy;

      if (x > 460 || x < 40) dx *= -1;
      if (y > 460 || y < 40) dy *= -1;

      frameId = requestAnimationFrame(draw);
    };

    draw();

    // cleanup, kad nepaliktume animacijos kaboti
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ width: "100%", height: "100%" }}
    />
  );
}