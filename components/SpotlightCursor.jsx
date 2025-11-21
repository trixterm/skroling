'use client';
import { useEffect } from 'react';

export default function SpotlightCursor() {
  useEffect(() => {
    const spotlight = document.createElement('div');
    spotlight.className = 'spotlight-cursor';
    document.body.appendChild(spotlight);

    let mouseX = 0,
      mouseY = 0;
    let currentX = 0,
      currentY = 0;
    const speed = 0.1;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    function animate() {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;
      spotlight.style.transform = `translate(${currentX - 100}px, ${currentY - 100}px)`;
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      spotlight.remove();
    };
  }, []);

  return null;
}
