"use client";

import { useEffect, useRef } from "react";

export default function FluidCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let ball = { x: mouse.x, y: mouse.y, radius: 40 };

    // Sekti pelę
    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    // Sklandus judėjimas (skystumo įspūdis)
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Interpolacija (sklandus skystas judėjimas)
      ball.x += (mouse.x - ball.x) * 0.15;
      ball.y += (mouse.y - ball.y) * 0.15;

      // Piešiame skystą kamuoliuką
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#5ac7ff";
      ctx.shadowColor = "#5ac7ff";
      ctx.shadowBlur = 25;
      ctx.fill();
      ctx.shadowBlur = 0;

      requestAnimationFrame(animate);
    }

    animate();

    // Canvase dydis = visam ekranui
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
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