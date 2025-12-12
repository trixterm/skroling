'use client';

import React, { useState, useEffect, useMemo } from 'react';

// --- KONFIGŪRACIJA ---
const GRID_SIZE = 12;

const PATTERNS: Record<number, string[]> = {
  1: [
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
    ".....XX.....",
    ".....XX.....",
  ],
  2: [
    "...XXXXX....", // Viršutinė linija
    "...XXXXX....",
    "........XX..", // Nusileidimas dešinėje
    "........XX..",
    "........XX..",
    "....XXXX....", // Vidurinė linija
    "....XXXX....", // Vidurinė linija
    "..XX........", // Nusileidimas kairėje
    "..XX........",
    "..XX........",
    "....XXXXX...", // Apatinė linija
    "....XXXXX...",
  ],
  3: [
    "...XXXXX....",
    "...XXXXX....",
    "........XX..",
    "........XX..",
    "........XX..",
    "...XXXXX....",
    "...XXXXX....",
    "........XX..",
    "........XX..",
    "........XX..",
    "...XXXXX....",
    "...XXXXX....",
  ],
  4: [
    "...XX..XX....",
    "...XX..XX....",
    "...XX..XX....",
    "...XX..XX....",
    "...XXXXXX....",
    "...XXXXXX....",
    ".......XX....",
    ".......XX....",
    ".......XX....",
    ".......XX....",
    ".......XX....",
    ".......XX....",
  ],
  5: [
    "....XXXXX...",
    "....XXXXX...",
    "..XX........",
    "..XX........",
    "..XX........",
    "....XXXXX...",
    "....XXXXX...",
    ".........XX.",
    ".........XX.",
    ".........XX.",
    "....XXXXX...",
    "....XXXXX...",
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

  const R = '16px'; 

  return (
    <div className="flex flex-col min-h-[600px]">
      
      <div 
        className="grid bg-[#d4d4d4] border-2 border-white/50 p-[1px]"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gap: '1px',
          width: 'fit-content',
        }}
      >
        {cells.map((_, index) => {
          const isActive = activeIndices.has(index);

          const row = Math.floor(index / GRID_SIZE);
          const col = index % GRID_SIZE;
          
          const hasTop = activeIndices.has((row - 1) * GRID_SIZE + col);
          const hasBottom = activeIndices.has((row + 1) * GRID_SIZE + col);
          const hasLeft = col > 0 && activeIndices.has(row * GRID_SIZE + (col - 1));
          const hasRight = col < GRID_SIZE - 1 && activeIndices.has(row * GRID_SIZE + (col + 1));

          return (
            <div
              key={index}
              className={`
                w-8 h-8 sm:w-10 sm:h-10
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