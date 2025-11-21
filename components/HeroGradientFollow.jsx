import { useState } from "react";

export default function HeroGradientFollow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      className="fp-sec-hero-home relative overflow-hidden"
      onMouseMove={handleMove}
    >
      {/* Gradient "kamuolys" */}
      <div
        className="pointer-events-none gradient-ball"
        style={{
          left: pos.x - 150,
          top: pos.y - 150,
        }}
      />

      <div className="content">
        <h1>Tekstas</h1>
      </div>
    </section>
  );
}