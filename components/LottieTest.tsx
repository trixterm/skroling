"use client";

/**
 * Test our custom animation data with lottie-react
 * to determine if the JSON structure is the problem.
 */

import { useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

// Our slide animation - position-based
const slideAnimation = {
  v: "5.7.14",
  fr: 60,
  ip: 0,
  op: 60,
  w: 800,
  h: 400,
  nm: "SlideTest",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Rect",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            {
              i: { x: 0.4, y: 1 },
              o: { x: 0.6, y: 0 },
              t: 0,
              s: [100, 200, 0],
            },
            {
              i: { x: 0.4, y: 1 },
              o: { x: 0.6, y: 0 },
              t: 30,
              s: [400, 200, 0],
            },
            {
              t: 60,
              s: [700, 200, 0],
            },
          ],
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              d: 1,
              s: { a: 0, k: [100, 100] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 0 },
              nm: "Rect",
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.2, 0.5, 1, 1] },
              o: { a: 0, k: 100 },
              r: 1,
              bm: 0,
              nm: "Fill",
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
              nm: "Transform",
            },
          ],
          nm: "Group",
          np: 3,
          cix: 2,
          bm: 0,
          ix: 1,
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
  markers: [],
};

// Scale animation (the one that should have worked in LottieMinimalTest)
const scaleAnimation = {
  v: "5.7.14",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Scale",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            {
              t: 0,
              s: [100, 100, 100],
              i: { x: [0.4], y: [1] },
              o: { x: [0.6], y: [0] },
            },
            {
              t: 30,
              s: [150, 150, 100],
              i: { x: [0.4], y: [1] },
              o: { x: [0.6], y: [0] },
            },
            {
              t: 60,
              s: [100, 100, 100],
            },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              d: 1,
              s: { a: 0, k: [80, 80] },
              p: { a: 0, k: [0, 0] },
              nm: "Ellipse",
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 0.3, 0.3, 1] },
              o: { a: 0, k: 100 },
              r: 1,
              bm: 0,
              nm: "Fill",
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
              nm: "Transform",
            },
          ],
          nm: "Group",
          np: 3,
          cix: 2,
          bm: 0,
          ix: 1,
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
  markers: [],
};

// Simple opacity animation
const opacityAnimation = {
  v: "5.7.14",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Opacity",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Rect",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [100] },
            { t: 30, s: [30] },
            { t: 60, s: [100] },
          ],
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              d: 1,
              s: { a: 0, k: [80, 80] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 0 },
              nm: "Rect",
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.3, 0.8, 0.3, 1] },
              o: { a: 0, k: 100 },
              r: 1,
              bm: 0,
              nm: "Fill",
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
              nm: "Transform",
            },
          ],
          nm: "Group",
          np: 3,
          cix: 2,
          bm: 0,
          ix: 1,
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
  markers: [],
};

export default function AnimationDataTest() {
  const ref1 = useRef<LottieRefCurrentProps>(null);
  const ref2 = useRef<LottieRefCurrentProps>(null);
  const ref3 = useRef<LottieRefCurrentProps>(null);
  const [status, setStatus] = useState<string[]>([]);

  const log = (msg: string) => {
    console.log(msg);
    setStatus((prev) => [...prev.slice(-5), msg]);
  };

  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <h2>Animation Data Test</h2>
      <p>Testing if our JSON animation data works with lottie-react:</p>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 20 }}>
        {/* Test 1: Position animation */}
        <div>
          <h3>1. Position (slide)</h3>
          <div
            style={{
              width: 300,
              height: 150,
              border: "2px solid #333",
              background: "#111",
            }}
          >
            <Lottie
              lottieRef={ref1}
              animationData={slideAnimation}
              autoplay={true}
              loop={true}
              onDOMLoaded={() => log("Slide: DOMLoaded")}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <p style={{ fontSize: 12 }}>Blue square should move left→right</p>
        </div>

        {/* Test 2: Scale animation */}
        <div>
          <h3>2. Scale (pulse)</h3>
          <div
            style={{
              width: 150,
              height: 150,
              border: "2px solid #333",
              background: "#111",
            }}
          >
            <Lottie
              lottieRef={ref2}
              animationData={scaleAnimation}
              autoplay={true}
              loop={true}
              onDOMLoaded={() => log("Scale: DOMLoaded")}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <p style={{ fontSize: 12 }}>Red circle should pulse</p>
        </div>

        {/* Test 3: Opacity animation */}
        <div>
          <h3>3. Opacity (fade)</h3>
          <div
            style={{
              width: 150,
              height: 150,
              border: "2px solid #333",
              background: "#111",
            }}
          >
            <Lottie
              lottieRef={ref3}
              animationData={opacityAnimation}
              autoplay={true}
              loop={true}
              onDOMLoaded={() => log("Opacity: DOMLoaded")}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <p style={{ fontSize: 12 }}>Green square should fade in/out</p>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Log:</h3>
        <div
          style={{
            background: "#222",
            color: "#0f0",
            padding: 10,
            fontSize: 12,
            minHeight: 60,
          }}
        >
          {status.map((s, i) => (
            <div key={i}>{s}</div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 20, padding: 15, background: "#f5f5f5" }}>
        <h3>Results:</h3>
        <p>Tell me which animations work:</p>
        <ul>
          <li>Position (slide) - blue square moving?</li>
          <li>Scale (pulse) - red circle pulsing?</li>
          <li>Opacity (fade) - green square fading?</li>
        </ul>
      </div>
    </div>
  );
}