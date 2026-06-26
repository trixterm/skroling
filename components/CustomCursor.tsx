"use client";

import { useEffect, useState } from "react";

type Pos = {
  x: number;
  y: number;
};

export default function CustomCursor() {
  const [pos, setPos] = useState<Pos>({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="fixed z-[9999] pointer-events-none"
      style={{
        left: pos.x,
        top: pos.y,
      }}
    >
      <div className="w-20 h-20 rounded-full text-black flex items-center justify-center text-sm font-medium">
        Open
      </div>
    </div>
  );
}