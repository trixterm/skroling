"use client";

import React, { useEffect, useMemo, useRef } from "react";
import styles from "./GridDigit.module.css";

type Corners = { tl: boolean; tr: boolean; br: boolean; bl: boolean };
type CellTarget = ({ x: number; y: number } & Corners) | null;

const COLS = 12;
const ROWS = 12;

// Skaičių pattern'ai (12x12)
const DIGITS: Record<number, string[]> = {
  1: [
    ".....##.....",
    ".....##.....",
    ".....##.....",
    "..###.......",
    "..###.......",
    ".....##.....",
    ".....##.....",
    ".....##.....",
    ".....##.....",
    ".....##.....",
    "..########..",
    "..########..",
  ],
  2: [
    "...#####....",
    "...#####....",
    "........##..",
    "........##..",
    "........##..",
    "....####....",
    "....####....",
    "..##........",
    "..##........",
    "..##........",
    "....#####...",
    "....#####...",
  ],
  3: [
    "..######....",
    "..######....",
    "........##..",
    "........##..",
    "........##..",
    "....####....",
    "....####....",
    "........##..",
    "........##..",
    "........##..",
    "..######....",
    "..######....",
  ],
  4: [
    "..##....##..",
    "..##....##..",
    "..##....##..",
    "..##....##..",
    "..##....##..",
    "....####....",
    "....####....",
    "........##..",
    "........##..",
    "........##..",
    "........##..",
    "........##..",
  ],
  5: [
    "....#####...",
    "....#####...",
    "..##........",
    "..##........",
    "..##........",
    "....#####...",
    "....#####...",
    "........##..",
    "........##..",
    "........##..",
    "...#####....",
    "...#####....",
  ],
};

// Transition pattern'ai (t1 = tarp 1 ir 2, t2 = tarp 2 ir 3, t3 = tarp 3 ir 4, t4 = tarp 4 ir 5)
const TRANSITIONS: Record<number, string[]> = {
  1: [
    "..##.##.....",
    "..##.##.....",
    ".....##.....",
    "........##..",
    "........##..",
    ".....###....",
    ".....###....",
    "...##.......",
    "...##.##....",
    "......##....",
    "##..##..##..",
    "##..##..##..",
  ],
  2: [
    ".##......##.",
    ".##..##..##.",
    ".....##.##..",
    "........##..",
    "............",
    "..######....",
    "..######....",
    "............",
    "....##....##",
    "....##....##",
    "..##..##....",
    "..##..##....",
  ],
  3: [
    "..##......##",
    "..##......##",
    "..##........",
    "..##..####..",
    "......####..",
    "....##..##..",
    "....##..##..",
    "##..##....##",
    "##..##....##",
    "............",
    "........##..",
    "........##..",
  ],
  4: [
    "##..##......",
    "##..##......",
    "......##....",
    "......##....",
    "............",
    "..####....##",
    "..####....##",
    "##......##..",
    "##......##..",
    "......##....",
    ".##...##....",
    ".##...##....",
  ],
};

/**
 * Rankiniai kampų override'ai konkretiems cells, konkretiems skaičiams.
 * Key: "x,y" (x=0..11, y=0..11)
 * Value: kuriuos kampus apvalinti (tl/tr/br/bl).
 *
 * Pavyzdžiai čia tik demo – susidėk savo realius coords.
 */
const DIGIT_CORNER_OVERRIDES: Record<number, Record<string, Partial<Corners>>> = {
  1: {
    "5,0": { bl: false, tl: true, tr: false, br: false },
    "6,0": { bl: false, tl: false, tr: true, br: false },
    "2,10": { bl: false, tl: true, tr: false, br: false },
    "2,11": { bl: true, tl: false, tr: false, br: false },
    "9,10": { bl: false, tl: false, tr: true, br: false },
    "9,11": { bl: false, tl: false, tr: false, br: true },
  },
  2: {
    "7,0": { bl: false, tl: false, tr: true, br: false },
    "9,4": { bl: false, tl: false, tr: false, br: true },
    "4,5": { bl: false, tl: true, tr: false, br: false },
    "2,7": { bl: false, tl: true, tr: false, br: false },
    "2,9": { bl: true, tl: false, tr: false, br: false },
    "4,11": { bl: true, tl: false, tr: false, br: false },
  },
  3: {
    "7,0": { bl: false, tl: false, tr: true, br: false },
    "9,2": { bl: false, tl: false, tr: true, br: false },
    "4,5": { bl: false, tl: true, tr: false, br: false },
    "4,6": { bl: true, tl: false, tr: false, br: false },
    "9,7": { bl: false, tl: false, tr: true, br: false },
    "2,10": { bl: false, tl: true, tr: false, br: false },
    "2,11": { bl: true, tl: false, tr: false, br: false },
    "7,11": { bl: false, tl: false, tr: false, br: true },
  },
  4: {},
  5: {},
};

function getStagePattern(stageKey: string): string[] {
  if (stageKey.startsWith("t")) {
    const idx = Number(stageKey.slice(1));
    return TRANSITIONS[idx];
  }
  return DIGITS[Number(stageKey)];
}

function patternToTargets(pattern: string[], digit?: number) {
  const overridesForDigit =
    digit != null ? DIGIT_CORNER_OVERRIDES[digit] ?? {} : {};

  const out: ({ x: number; y: number } & Corners)[] = [];

  for (let y = 0; y < pattern.length; y++) {
    for (let x = 0; x < pattern[y].length; x++) {
      if (pattern[y][x] !== "#") continue;

      // DEFAULT: jokių kampų (rankinis režimas)
      let tl = false;
      let tr = false;
      let br = false;
      let bl = false;

      // pritaikom tik jei yra override konkrečiam cell'ui
      const key = `${x},${y}`;
      const o = overridesForDigit[key];
      if (o) {
        if (typeof o.tl === "boolean") tl = o.tl;
        if (typeof o.tr === "boolean") tr = o.tr;
        if (typeof o.br === "boolean") br = o.br;
        if (typeof o.bl === "boolean") bl = o.bl;
      }

      out.push({ x, y, tl, tr, br, bl });
    }
  }

  out.sort((a, b) => a.y - b.y || a.x - b.x);
  return out;
}

function padTo(
  targets: ReturnType<typeof patternToTargets>,
  n: number
): CellTarget[] {
  const out: CellTarget[] = targets.slice(0, n);
  while (out.length < n) out.push(null);
  return out;
}

export default function ReassemblingDigits(props: {
  from?: number; // default 1
  to?: number; // default 5
  cell?: number; // default 18
  stepPx?: number; // px per 1 timeline second (scroll distance scaling)
  triggerSelector?: string; // default ".fp-sec-my-expertise"

  digitHold?: number; // kiek ilgai “stovi” skaičius (timeline sekundėmis)
  transitionHold?: number; // kiek ilgai “stovi” transition stage
  moveDur?: number; // judėjimo trukmė (morph) į kitą stage

  cornerRadiusFactor?: number; // radius = cell * factor
}) {
  const from = props.from ?? 1;
  const to = props.to ?? 5;
  const cell = props.cell ?? 25;
  const stepPx = props.stepPx ?? 100;
  const triggerSelector = props.triggerSelector ?? ".fp-sec-my-expertise";

  // laikymo / greičio kontrolė
  const digitHold = props.digitHold ?? 1.2;
  const transitionHold = props.transitionHold ?? 0.12;
  const moveDur = props.moveDur ?? 0.2;

  const cornerRadiusFactor = props.cornerRadiusFactor ?? 0.45;

  // Seka: "1, t1, 2, t2, 3, t3, 4, t4, 5"
  const stageKeys = useMemo(() => {
    const keys: string[] = [];
    for (let d = from; d <= to; d++) {
      keys.push(String(d));
      if (d < to && TRANSITIONS[d]) keys.push(`t${d}`);
    }
    return keys;
  }, [from, to]);

  const stageTargets = useMemo(() => {
    const map = new Map<string, ReturnType<typeof patternToTargets>>();
    for (const k of stageKeys) {
      const pattern = getStagePattern(k);
      const digit = k.startsWith("t") ? undefined : Number(k);
      map.set(k, patternToTargets(pattern, digit));
    }
    return map;
  }, [stageKeys]);

  const maxBlocks = useMemo(() => {
    let m = 0;
    for (const k of stageKeys) m = Math.max(m, stageTargets.get(k)!.length);
    return m;
  }, [stageKeys, stageTargets]);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  blockRefs.current = Array.from(
    { length: maxBlocks },
    (_, i) => blockRefs.current[i] ?? null
  );

  useEffect(() => {
    let ctx: any;
    let gsap: any;
    let ScrollTrigger: any;

    const init = async () => {
      const mod = await import("gsap");
      const st = await import("gsap/ScrollTrigger");
      gsap = mod.gsap || mod.default || mod;
      ScrollTrigger = st.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      const triggerEl = document.querySelector(triggerSelector) as HTMLElement | null;
      if (!triggerEl) return;

      const els = blockRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!els.length) return;

      const layouts: CellTarget[][] = stageKeys.map((k) =>
        padTo(stageTargets.get(k)!, maxBlocks)
      );

      // “parkingas” off-state blokams
      const parkX = 2 * cell;
      const parkY = 6 * cell;

      const isDigitStage = (k: string) => !k.startsWith("t");
      const r = Math.round(cell * cornerRadiusFactor);

      ctx = gsap.context(() => {
        // initial (pirmas stage)
        els.forEach((el, i) => {
          const c = layouts[0][i];
          gsap.set(el, {
            x: c ? c.x * cell : parkX,
            y: c ? c.y * cell : parkY,
            autoAlpha: c ? 1 : 0,
            scale: c ? 1 : 0,

            borderTopLeftRadius: c?.tl ? r : 0,
            borderTopRightRadius: c?.tr ? r : 0,
            borderBottomRightRadius: c?.br ? r : 0,
            borderBottomLeftRadius: c?.bl ? r : 0,

            force3D: true,
          });
        });

        // Timeline: greitas morph + hold
        const tl = gsap.timeline({ defaults: { ease: "none" } });

        // hold ant pirmo stage
        tl.to({}, { duration: isDigitStage(stageKeys[0]) ? digitHold : transitionHold });

        for (let s = 1; s < layouts.length; s++) {
          const target = layouts[s];
          const key = stageKeys[s];

          // 1) greitas perėjimas (visi blokai vienu metu)
          const step = gsap.timeline();
          els.forEach((el, i) => {
            const c = target[i];
            step.to(
              el,
              {
                x: c ? c.x * cell : parkX,
                y: c ? c.y * cell : parkY,
                autoAlpha: c ? 1 : 0,
                scale: c ? 1 : 0,

                borderTopLeftRadius: c?.tl ? r : 0,
                borderTopRightRadius: c?.tr ? r : 0,
                borderBottomRightRadius: c?.br ? r : 0,
                borderBottomLeftRadius: c?.bl ? r : 0,

                duration: moveDur,
              },
              0
            );
          });
          tl.add(step);

          // 2) hold ant stage (skaičius ilgiau, transition trumpiau)
          tl.to({}, { duration: isDigitStage(key) ? digitHold : transitionHold });
        }

        ScrollTrigger.create({
          trigger: triggerEl,
          start: "top 20%",
          end: `+=${Math.ceil(stepPx * tl.duration())}`,
          pin: true,
          scrub: true,
          animation: tl,
          invalidateOnRefresh: true,
        });

        ScrollTrigger.refresh();
      }, stageRef);
    };

    init();

    return () => {
      if (ctx) ctx.revert();
      try {
        const st = (globalThis as any).ScrollTrigger;
        if (st?.getAll) st.getAll().forEach((t: any) => t.kill());
      } catch {}
    };
  }, [
    cell,
    cornerRadiusFactor,
    digitHold,
    transitionHold,
    moveDur,
    maxBlocks,
    stageKeys,
    stageTargets,
    stepPx,
    triggerSelector,
  ]);

  const width = COLS * cell;
  const height = ROWS * cell;

  return (
    <div
      ref={stageRef}
      className={styles.stage}
      style={
        {
          width,
          height,
          ["--cell" as any]: `${cell}px`,
        } as React.CSSProperties
      }
      aria-label={`Scroll-driven digits ${from} to ${to} with transitions and manual corners`}
    >
      <div className={styles.blocks}>
        {Array.from({ length: maxBlocks }, (_, i) => (
          <div
            key={i}
            ref={(el) => {
              blockRefs.current[i] = el;
            }}
            className={styles.block}
          />
        ))}
      </div>
    </div>
  );
}
