'use client';

import React, { useState, useEffect, useMemo } from 'react';

// --- KONFIGŪRACIJA ---
const GRID_SIZE = 12;

// Skaičių šablonai (2 langelių storio linijos - "Digital" stilius)
const PATTERNS: Record<number, string[]> = {
  1: [
    "............",
    ".....XX.....",
    ".....XX.....",
    ".....XX.....",
    ".....XX.....",
    ".....XX.....",
    ".....XX.....",
    ".....XX.....",
    ".....XX.....",
    ".....XX.....",
    ".....XX.....",
    "............",
  ],
  2: [
    "............", // Pavyzdys iš nuotraukos
    "..XXXXXX....", // Viršutinė linija
    "..XXXXXX....",
    "......XX....", // Nusileidimas dešinėje
    "......XX....",
    "..XXXXXX....", // Vidurinė linija
    "..XXXXXX....",
    "..XX........", // Nusileidimas kairėje
    "..XX........",
    "..XXXXXX....", // Apatinė linija
    "..XXXXXX....",
    "............",
  ],
  3: [
    "............",
    "..XXXXXX....",
    "..XXXXXX....",
    "......XX....",
    "......XX....",
    "..XXXXXX....",
    "..XXXXXX....",
    "......XX....",
    "......XX....",
    "..XXXXXX....",
    "..XXXXXX....",
    "............",
  ],
  4: [
    "............",
    "..XX..XX....",
    "..XX..XX....",
    "..XX..XX....",
    "..XX..XX....",
    "..XXXXXX....",
    "..XXXXXX....",
    "......XX....",
    "......XX....",
    "......XX....",
    "......XX....",
    "............",
  ],
  5: [
    "............",
    "..XXXXXX....",
    "..XXXXXX....",
    "..XX........",
    "..XX........",
    "..XXXXXX....",
    "..XXXXXX....",
    "......XX....",
    "......XX....",
    "..XXXXXX....",
    "..XXXXXX....",
    "............",
  ],
};

const parsePattern = (pattern: string[]): Set<number> => {
  const activeIndices = new Set<number>();
  pattern.forEach((rowStr, rowIndex) => {
    rowStr.split('').forEach((char, colIndex) => {
      if (char !== '.') {
        activeIndices.add(rowIndex * GRID_SIZE + colIndex);
      }
    });
  });
  return activeIndices;
};

export default function GridDigit() {
  const [currentNumber, setCurrentNumber] = useState(1);

  // Keičiame skaičių kas 2 sekundes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNumber((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const activeIndices = useMemo(() => {
    return parsePattern(PATTERNS[currentNumber]);
  }, [currentNumber]);

  const cells = Array.from({ length: GRID_SIZE * GRID_SIZE });

  // Apvalinimo spindulys
  const R = '16px'; 

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-[#e5e5e5]">
      
      {/* Pagrindinis tinklelio rėmas */}
      <div 
        className="grid bg-[#d4d4d4] border-2 border-white/50 p-[1px] shadow-2xl"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gap: '1px',
          width: 'fit-content',
        }}
      >
        {cells.map((_, index) => {
          const isActive = activeIndices.has(index);

          // Skaičiuojame kaimynus
          const row = Math.floor(index / GRID_SIZE);
          const col = index % GRID_SIZE;
          
          const hasTop = activeIndices.has((row - 1) * GRID_SIZE + col);
          const hasBottom = activeIndices.has((row + 1) * GRID_SIZE + col);
          const hasLeft = col > 0 && activeIndices.has(row * GRID_SIZE + (col - 1));
          const hasRight = col < GRID_SIZE - 1 && activeIndices.has(row * GRID_SIZE + (col + 1));

          // --- MORPHING LOGIKA (Inline Styles) ---
          // Mes sukuriame stiliaus objektą. Tai priverčia naršyklę interpoliuoti
          // reikšmes (pvz., nuo 0px iki 16px), todėl matomas fizinis formos keitimas.
          
          const borderRadiusStyle: React.CSSProperties = isActive ? {
            // Jei nėra kaimyno -> R, jei yra -> 0px
            borderTopLeftRadius: (!hasTop && !hasLeft) ? R : '0px',
            borderTopRightRadius: (!hasTop && !hasRight) ? R : '0px',
            borderBottomLeftRadius: (!hasBottom && !hasLeft) ? R : '0px',
            borderBottomRightRadius: (!hasBottom && !hasRight) ? R : '0px',
          } : {
            // Kai langelis neaktyvus, grąžiname jį į mažą apvalinimą
            borderRadius: '4px' 
          };

          return (
            <div
              key={index}
              // Čia paduodame apskaičiuotą stilių
              style={borderRadiusStyle}
              className={`
                w-8 h-8 sm:w-10 sm:h-10
                /* Transition-all užtikrina, kad 'borderRadius' pokyčiai būtų animuoti */
                transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${isActive ? 'bg-[#1a1a1a] scale-100' : 'bg-[#cccccc]/50 scale-90'}
              `}
            />
          );
        })}
      </div>
    </div>
  );
}