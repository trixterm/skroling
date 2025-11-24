"use client";

import { useEffect, useRef } from "react";

export default function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // jei dėl kažkokios priežasties ref dar nepritvirtintas

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // jei nepavyko gauti 2D context

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let ball = { x: mouse.x, y: mouse.y, radius: 40 };
    let animationId: number;

    // Sekti pelę (DOM MouseEvent, ne React)
    const move = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    // Canvase dydis = visam ekranui
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Interpolacija (sklandus skystas judėjimas)
      ball.x += (mouse.x - ball.x) * 0.15;
      ball.y += (mouse.y - ball.y) * 0.15;

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#5ac7ff";
      ctx.shadowColor = "#5ac7ff";
      ctx.shadowBlur = 25;
      ctx.fill();
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  );
}