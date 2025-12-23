"use client";

import React, { useEffect, useMemo, useRef } from "react";
import styles from "./GridDigit.module.css";

type Corners = { tl: boolean; tr: boolean; br: boolean; bl: boolean };
type CellTarget = ({ x: number; y: number } & Corners) | null;

export type DigitContent = {
  heading: string;
  description: string;
};

type DigitDefinition = DigitContent & {
  pattern: string[];
};

type GsapModule = typeof import("gsap");
type ScrollTriggerModule = typeof import("gsap/ScrollTrigger");
type GsapContext = ReturnType<GsapModule["gsap"]["context"]>;

const COLS = 12;
const ROWS = 12;

export const DIGITS: Record<number, DigitDefinition> = {
  1: {
    heading: "React & Next.js Front-End Engineering",
    description:
      "Developing fast, scalable, and maintainable front-end architectures with React and Next.js, optimized for performance and long-term growth.",
    pattern: [
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
  },
  2: {
    heading: "Design Systems & UI Architecture",
    description:
      "Building resilient component systems, Storybook-driven libraries, and cohesive design languages that keep large products consistent.",
    pattern: [
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
  },
  3: {
    heading: "TypeScript & API Contracts",
    description:
      "Creating strongly-typed client integrations, shared schemas, and developer tooling that surface bugs early and speed feature delivery.",
    pattern: [
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
  },
  4: {
    heading: "Performance & Accessibility",
    description:
      "Profiling rendering paths, eliminating regressions, and baking WCAG-compliant patterns into the foundation of every interface.",
    pattern: [
      "..##....##..",
      "..##....##..",
      "..##....##..",
    "..##....##..",
    "..##....##..",
    "....######..",
    "....######..",
    "........##..",
    "........##..",
    "........##..",
      "........##..",
      "........##..",
    ],
  },
  5: {
    heading: "Team Leadership & Delivery",
    description:
      "Leading multi-disciplinary squads, establishing delivery rituals, and mentoring engineers through complex front-end initiatives.",
    pattern: [
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
  },
};

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
//   4: [
//     "##..##......",
//     "##..##......",
//     "......##....",
//     "......##....",
//     "............",
//     "..####....##",
//     "..####....##",
//     "##......##..",
//     "##......##..",
//     "......##....",
//     ".##...##....",
//     ".##...##....",
//   ],
};

const DIGIT_CORNER_OVERRIDES: Record<number, Record<string, Partial<Corners>>> = {
  1: {
    "6,0": { bl: false, tl: false, tr: true, br: false },
    "2,3": { bl: false, tl: true, tr: false, br: false },
    "2,4": { bl: true, tl: false, tr: false, br: false },
    "2,10": { bl: false, tl: true, tr: false, br: false },
    "2,11": { bl: false, tl: false, tr: false, br: false },
    "6,5": { bl: false, tl: false, tr: true, br: false },
    "9,10": { bl: false, tl: false, tr: true, br: false },
    "9,11": { bl: false, tl: false, tr: false, br: true },
  },
  2: {
    "7,0": { bl: false, tl: false, tr: true, br: false },
    "9,4": { bl: false, tl: false, tr: false, br: true },
    "4,5": { bl: false, tl: true, tr: false, br: false },
    "2,7": { bl: false, tl: true, tr: false, br: false },
    "2,9": { bl: false, tl: false, tr: false, br: false },
    "8,11": { bl: false, tl: false, tr: false, br: true },
  },
  3: {
    "7,0": { bl: false, tl: false, tr: true, br: false },
    "9,4": { bl: false, tl: false, tr: false, br: true },
    "4,5": { bl: false, tl: true, tr: false, br: false },
    "9,9": { bl: false, tl: false, tr: false, br: true },
    "8,11": { bl: false, tl: false, tr: false, br: true },
    "7,11": { bl: false, tl: false, tr: false, br: true },
  },
  4: {
    "3,4": { bl: false, tl: false, tr: false, br: true },
    "4,5": { bl: false, tl: true, tr: false, br: false },
    "8,0": { bl: false, tl: false, tr: false, br: false },
    "8,4": { bl: false, tl: false, tr: false, br: false },
    "9,11": { bl: false, tl: false, tr: false, br: true },
  },
};

function getStagePattern(stageKey: string): string[] {
  if (stageKey.startsWith("t")) {
    const idx = Number(stageKey.slice(1));
    return TRANSITIONS[idx];
  }
  return DIGITS[Number(stageKey)].pattern;
}

function patternToTargets(pattern: string[], digit?: number) {
  const overridesForDigit =
    digit != null ? DIGIT_CORNER_OVERRIDES[digit] ?? {} : {};

  const out: ({ x: number; y: number } & Corners)[] = [];

  for (let y = 0; y < pattern.length; y++) {
    for (let x = 0; x < pattern[y].length; x++) {
      if (pattern[y][x] !== "#") continue;

      let tl = false;
      let tr = false;
      let br = false;
      let bl = false;

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
  from?: number;
  to?: number;
  cell?: number;
  stepPx?: number;
  triggerSelector?: string;
  digitHold?: number;
  transitionHold?: number;
  moveDur?: number;
  cornerRadiusFactor?: number;
  interval?: number;
  onDigitChange?: (digit: number | null, content: DigitContent | null) => void;
}) {
  const from = props.from ?? 1;
  const to = props.to ?? 5;
  const cell = props.cell ?? 25;
  const stepPx = props.stepPx ?? 100;
  const triggerSelector = props.triggerSelector ?? ".fp-sec-my-expertise";
  const digitHold = props.digitHold ?? 1.2;
  const transitionHold = props.transitionHold ?? 0.12;
  const moveDur = props.moveDur ?? 0.2;
  const cornerRadiusFactor = props.cornerRadiusFactor ?? 0.45;
  const digitChangeRef = useRef<typeof props.onDigitChange>();
  const activeStageRef = useRef<string | null>(null);

  useEffect(() => {
    digitChangeRef.current = props.onDigitChange;
  }, [props.onDigitChange]);

  const notifyStage = (stageKey: string) => {
    const cb = digitChangeRef.current;
    if (!cb) return;
    if (stageKey.startsWith("t")) {
      cb(null, null);
      return;
    }
    const digit = Number(stageKey);
    const digitDef = DIGITS[digit];
    if (!digitDef) return;
    cb(digit, {
      heading: digitDef.heading,
      description: digitDef.description,
    });
  };

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

  const layouts = useMemo(
    () => stageKeys.map((k) => padTo(stageTargets.get(k)!, maxBlocks)),
    [stageKeys, stageTargets, maxBlocks]
  );

  const stageMoments = useMemo(() => {
    const out: { key: string; time: number }[] = [];
    if (!stageKeys.length) return out;

    const holdFor = (k: string) => (k.startsWith("t") ? transitionHold : digitHold);
    let currentTime = 0;

    out.push({ key: stageKeys[0], time: 0 });
    currentTime += holdFor(stageKeys[0]);

    for (let i = 1; i < stageKeys.length; i++) {
      const key = stageKeys[i];
      currentTime += moveDur;
      out.push({ key, time: currentTime });
      currentTime += holdFor(key);
    }

    return out;
  }, [stageKeys, digitHold, transitionHold, moveDur]);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const blockRefSetters = useMemo(
    () =>
      Array.from({ length: maxBlocks }, (_, i) => (el: HTMLDivElement | null) => {
        blockRefs.current[i] = el;
      }),
    [maxBlocks]
  );

  useEffect(() => {
    let ctx: GsapContext | undefined;
    let gsapInstance: GsapModule["gsap"] | undefined;
    let scrollTriggerInstance: ScrollTriggerModule["ScrollTrigger"] | undefined;

    const init = async () => {
      const mod: GsapModule = await import("gsap");
      const st: ScrollTriggerModule = await import("gsap/ScrollTrigger");

      gsapInstance = (mod.gsap ?? mod.default) as GsapModule["gsap"];
      scrollTriggerInstance = st.ScrollTrigger;

      if (!gsapInstance || !scrollTriggerInstance) return;

      gsapInstance.registerPlugin(scrollTriggerInstance);

      const triggerEl = document.querySelector(
        triggerSelector
      ) as HTMLElement | null;
      if (!triggerEl) return;

      const els = blockRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!els.length) return;
      if (!stageKeys.length) return;

      const syncActiveStage = (time: number) => {
        if (!stageMoments.length) return;
        let key = stageMoments[0].key;
        for (const moment of stageMoments) {
          if (time >= moment.time) key = moment.key;
          else break;
        }
        if (activeStageRef.current === key) return;
        activeStageRef.current = key;
        notifyStage(key);
      };

      syncActiveStage(0);

      const parkX = 2 * cell;
      const parkY = 6 * cell;
      const r = Math.round(cell * cornerRadiusFactor);

      const holdFor = (k: string) => (k.startsWith("t") ? transitionHold : digitHold);

      const tweenVarsForLayout = (layoutIndex: number) => ({
        x: (i: number) => {
          const c = layouts[layoutIndex][i];
          return c ? c.x * cell : parkX;
        },
        y: (i: number) => {
          const c = layouts[layoutIndex][i];
          return c ? c.y * cell : parkY;
        },
        autoAlpha: (i: number) => (layouts[layoutIndex][i] ? 1 : 0),
        scale: (i: number) => (layouts[layoutIndex][i] ? 1 : 0),
        borderTopLeftRadius: (i: number) => (layouts[layoutIndex][i]?.tl ? r : 0),
        borderTopRightRadius: (i: number) => (layouts[layoutIndex][i]?.tr ? r : 0),
        borderBottomRightRadius: (i: number) => (layouts[layoutIndex][i]?.br ? r : 0),
        borderBottomLeftRadius: (i: number) => (layouts[layoutIndex][i]?.bl ? r : 0),
      });

      ctx = gsapInstance.context(() => {
        gsapInstance!.set(els, {
          ...tweenVarsForLayout(0),
          force3D: true,
        });

        const tl = gsapInstance!.timeline({ defaults: { ease: "none" } });

        tl.to({}, { duration: holdFor(stageKeys[0]) });

        for (let s = 1; s < layouts.length; s++) {
          const stageKey = stageKeys[s];
          tl.to(els, { ...tweenVarsForLayout(s), duration: moveDur }, undefined);
          tl.to({}, { duration: holdFor(stageKey) });
        }

        scrollTriggerInstance!.create({
          trigger: triggerEl,
          start: "top 20%",
          end: `+=${Math.ceil(stepPx * tl.duration())}`,
          pin: true,
          scrub: true,
          animation: tl,
          invalidateOnRefresh: true,
          onUpdate: () => syncActiveStage(tl.time()),
        });

        scrollTriggerInstance!.refresh();
      }, stageRef);
    };

    init();

    return () => {
      if (ctx) ctx.revert();
      const triggers = scrollTriggerInstance?.getAll?.();
      triggers?.forEach((t) => t.kill());
    };
  }, [
    cell,
    cornerRadiusFactor,
    digitHold,
    transitionHold,
    moveDur,
    layouts,
    stageKeys,
    stepPx,
    triggerSelector,
    stageMoments,
  ]);

  const width = COLS * cell;
  const height = ROWS * cell;
  const stageStyle = useMemo(
    () =>
      ({
        width,
        height,
        "--cell": `${cell}px`,
      }) as React.CSSProperties & { "--cell": string },
    [width, height, cell]
  );

  return (
    <div
      ref={stageRef}
      className={styles.stage}
      style={stageStyle}
      aria-label={`Scroll-driven digits ${from} to ${to} with transitions and manual corners`}
    >
      <div className={styles.blocks}>
        {Array.from({ length: maxBlocks }, (_, i) => (
          <div key={i} ref={blockRefSetters[i]} className={styles.block} />
        ))}
      </div>
    </div>
  );
}
