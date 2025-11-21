"use client";

import { useEffect, useRef } from "react";

export default function FluidBall() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let x = 200, y = 200;
    let dx = 2, dy = 2;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fillStyle = "#222";
      ctx.fill();

      x += dx;
      y += dy;

      if (x > 460 || x < 40) dx *= -1;
      if (y > 460 || y < 40) dy *= -1;

      requestAnimationFrame(draw);
    }

    draw();
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
