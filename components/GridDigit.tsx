// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';

// // --- KONFIGŪRACIJA ---
// const GRID_SIZE = 12;

// const PATTERNS: Record<number, string[]> = {
//   1: [
//     ".....XX.....",
//     ".....XX.....",
//     ".....XX.....",
//     ".....XX.....",
//     ".....XX.....",
//     ".....XX.....",
//     ".....XX.....",
//     ".....XX.....",
//     ".....XX.....",
//     ".....XX.....",
//     ".....XX.....",
//     ".....XX.....",
//   ],
//   2: [
//     "...XXXXX....", // Viršutinė linija
//     "...XXXXX....",
//     "........XX..", // Nusileidimas dešinėje
//     "........XX..",
//     "........XX..",
//     "....XXXX....", // Vidurinė linija
//     "....XXXX....", // Vidurinė linija
//     "..XX........", // Nusileidimas kairėje
//     "..XX........",
//     "..XX........",
//     "....XXXXX...", // Apatinė linija
//     "....XXXXX...",
//   ],
//   3: [
//     "...XXXXX....",
//     "...XXXXX....",
//     "........XX..",
//     "........XX..",
//     "........XX..",
//     "...XXXXX....",
//     "...XXXXX....",
//     "........XX..",
//     "........XX..",
//     "........XX..",
//     "...XXXXX....",
//     "...XXXXX....",
//   ],
//   4: [
//     "...XX..XX....",
//     "...XX..XX....",
//     "...XX..XX....",
//     "...XX..XX....",
//     "...XXXXXX....",
//     "...XXXXXX....",
//     ".......XX....",
//     ".......XX....",
//     ".......XX....",
//     ".......XX....",
//     ".......XX....",
//     ".......XX....",
//   ],
//   5: [
//     "....XXXXX...",
//     "....XXXXX...",
//     "..XX........",
//     "..XX........",
//     "..XX........",
//     "....XXXXX...",
//     "....XXXXX...",
//     ".........XX.",
//     ".........XX.",
//     ".........XX.",
//     "....XXXXX...",
//     "....XXXXX...",
//   ],
// };

// const parsePattern = (pattern: string[]): Set<number> => {
//   const activeIndices = new Set<number>();
//   pattern.forEach((rowStr, rowIndex) => {
//     rowStr.split('').forEach((char, colIndex) => {
//       if (char !== '.') {
//         activeIndices.add(rowIndex * GRID_SIZE + colIndex);
//       }
//     });
//   });
//   return activeIndices;
// };

// export default function GridDigit() {
//   const [currentNumber, setCurrentNumber] = useState(1);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentNumber((prev) => (prev >= 5 ? 1 : prev + 1));
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   const activeIndices = useMemo(() => {
//     return parsePattern(PATTERNS[currentNumber]);
//   }, [currentNumber]);

//   const cells = Array.from({ length: GRID_SIZE * GRID_SIZE });

//   const R = '16px'; 

//   return (
//     <div className="flex flex-col min-h-[600px]">
      
//       <div 
//         className="grid bg-[#d4d4d4] border-2 border-white/50 p-[1px]"
//         style={{
//           gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
//           gap: '1px',
//           width: 'fit-content',
//         }}
//       >
//         {cells.map((_, index) => {
//           const isActive = activeIndices.has(index);

//           const row = Math.floor(index / GRID_SIZE);
//           const col = index % GRID_SIZE;
          
//           const hasTop = activeIndices.has((row - 1) * GRID_SIZE + col);
//           const hasBottom = activeIndices.has((row + 1) * GRID_SIZE + col);
//           const hasLeft = col > 0 && activeIndices.has(row * GRID_SIZE + (col - 1));
//           const hasRight = col < GRID_SIZE - 1 && activeIndices.has(row * GRID_SIZE + (col + 1));

//           return (
//             <div
//               key={index}
//               className={`
//                 w-8 h-8 sm:w-10 sm:h-10
//                 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
//                 ${isActive ? 'bg-[#1a1a1a] scale-100' : 'bg-[#cccccc]/50 scale-90'}
//               `}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./GridDigit.module.css";

type Coord = { x: number; y: number } | null;

const COLS = 5;
const ROWS = 7;

// 5x7 “pixel” šriftas (1–5)
const DIGITS: Record<number, string[]> = {
  1: [
    "..#..",
    ".##..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    ".###.",
  ],
  2: [
    ".###.",
    "#...#",
    "....#",
    "...#.",
    "..#..",
    ".#...",
    "#####",
  ],
  3: [
    "####.",
    "....#",
    "...#.",
    "..##.",
    "....#",
    "#...#",
    ".###.",
  ],
  4: [
    "...#.",
    "..##.",
    ".#.#.",
    "#..#.",
    "#####",
    "...#.",
    "...#.",
  ],
  5: [
    "#####",
    "#....",
    "####.",
    "....#",
    "....#",
    "#...#",
    ".###.",
  ],
};

function patternToCoords(pattern: string[]): Coord[] {
  const coords: { x: number; y: number }[] = [];
  for (let y = 0; y < pattern.length; y++) {
    for (let x = 0; x < pattern[y].length; x++) {
      if (pattern[y][x] === "#") coords.push({ x, y });
    }
  }
  // stabilus rūšiavimas → mažiau “chaoso”
  coords.sort((a, b) => (a.y - b.y) || (a.x - b.x));
  return coords;
}

function padTo(coords: { x: number; y: number }[], n: number): Coord[] {
  const out: Coord[] = coords.slice(0, n);
  while (out.length < n) out.push(null);
  return out;
}

function px(n: number) {
  return `${n}px`;
}

export default function ReassemblingDigits(props: {
  from?: number;     // default 1
  to?: number;       // default 5
  cell?: number;     // default 18
  holdMs?: number;   // default 900 (kiek “stovi” skaičius)
  durationMs?: number; // default 1200 (morfavimo trukmė)
}) {
  const from = props.from ?? 1;
  const to = props.to ?? 5;
  const cell = props.cell ?? 18;
  const holdMs = props.holdMs ?? 900;
  const durationMs = props.durationMs ?? 1200;

  const sequence = useMemo(() => {
    const arr: number[] = [];
    for (let d = from; d <= to; d++) arr.push(d);
    return arr;
  }, [from, to]);

  const digitCoords = useMemo(() => {
    const map = new Map<number, { x: number; y: number }[]>();
    for (const d of sequence) map.set(d, patternToCoords(DIGITS[d]));
    return map;
  }, [sequence]);

  const maxBlocks = useMemo(() => {
    let m = 0;
    for (const d of sequence) m = Math.max(m, digitCoords.get(d)!.length);
    return m;
  }, [sequence, digitCoords]);

  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  // laikom ankstesnį “padded” išdėstymą, kad galėtume animuoti FROM → TO
  const prevLayoutRef = useRef<Coord[]>(padTo(digitCoords.get(sequence[0])!, maxBlocks));

  // timeris: hold + animacija
  useEffect(() => {
    const tick = () => {
      setIndex((i) => (i + 1) % sequence.length);
      setAnimKey((k) => k + 1);
    };
    const t = setInterval(tick, holdMs + durationMs);
    return () => clearInterval(t);
  }, [holdMs, durationMs, sequence.length]);

  const currentDigit = sequence[index];
  const nextDigit = sequence[(index + 1) % sequence.length];

  const fromLayout = prevLayoutRef.current;
  const toLayout = padTo(digitCoords.get(nextDigit)!, maxBlocks);

  // kai tik “animKey” pasikeičia, fiksuojam naują FROM (dabartinis skaičius)
  useEffect(() => {
    const now = padTo(digitCoords.get(currentDigit)!, maxBlocks);
    prevLayoutRef.current = now;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animKey]);

  const SEGMENTS = 5;

  // segmentų “išsiardymo” vektoriai (grid-step’ais)
  const scatterVectors = useMemo(() => {
    // kiekvienam perėjimui duodam skirtingą, bet tvarkingą “išbarstymą”
    const base = [
      { x: -2, y: -1 },
      { x:  2, y: -1 },
      { x: -2, y:  1 },
      { x:  2, y:  1 },
      { x:  0, y:  2 },
    ];
    // “pasukam” pagal animKey, kad neatrodytų identiškai
    const rot = animKey % base.length;
    return Array.from({ length: SEGMENTS }, (_, s) => base[(s + rot) % base.length]);
  }, [animKey]);

  const width = COLS * cell;
  const height = ROWS * cell;

  return (
    <div
      className={styles.stage}
      style={
        {
          width: px(width),
          height: px(height),
          ["--cell" as any]: px(cell),
          ["--dur" as any]: `${durationMs}ms`,
        } as React.CSSProperties
      }
      aria-label={`Animated digits ${from} to ${to}`}
    >
      <div className={styles.blocks}>
        {Array.from({ length: maxBlocks }, (_, i) => {
          const a = fromLayout[i];
          const b = toLayout[i];

          const fromX = a ? a.x * cell : 2 * cell; // “parkingas”
          const fromY = a ? a.y * cell : 6 * cell;
          const toX = b ? b.x * cell : 2 * cell;
          const toY = b ? b.y * cell : 6 * cell;

          const fromVisible = !!a;
          const toVisible = !!b;

          const seg = i % SEGMENTS;
          const v = scatterVectors[seg];

          // šiek tiek “jitter” → panašiau į video “segmentų” judėjimą
          const jitterX = ((i * 17) % 3 - 1) * 0.25;
          const jitterY = ((i * 29) % 3 - 1) * 0.25;

          const scatterX = (v.x + jitterX) * cell;
          const scatterY = (v.y + jitterY) * cell;

          return (
            <div
              key={`${animKey}-${i}`}
              className={styles.block}
              style={
                {
                  ["--fromX" as any]: px(fromX),
                  ["--fromY" as any]: px(fromY),
                  ["--toX" as any]: px(toX),
                  ["--toY" as any]: px(toY),
                  ["--sx" as any]: px(scatterX),
                  ["--sy" as any]: px(scatterY),
                  ["--fromO" as any]: fromVisible ? 1 : 0,
                  ["--toO" as any]: toVisible ? 1 : 0,
                  ["--fromS" as any]: fromVisible ? 1 : 0,
                  ["--toS" as any]: toVisible ? 1 : 0,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>
    </div>
  );
}
