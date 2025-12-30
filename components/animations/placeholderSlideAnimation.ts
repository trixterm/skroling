import type { LottieAnimationData } from "./PageTransition";

/**
 * Horizontal slide transition animation.
 *
 * Timeline (60 frames @ 60fps = 1 second):
 *   Frame 0:  Rectangle positioned at X = -960 (fully off-screen left)
 *   Frame 30: Rectangle positioned at X = 960 (centered, covers viewport)
 *   Frame 60: Rectangle positioned at X = 2880 (fully off-screen right)
 *
 * The PageTransition component plays:
 *   - First half (0→30) as "slide-in"
 *   - Second half (30→60) as "slide-out"
 */
export const placeholderSlideAnimation: LottieAnimationData = {
  v: "5.7.14",
  fr: 60,
  ip: 0,
  op: 60,
  w: 1920,
  h: 1080,
  nm: "SlideTransition",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "SlidePanel",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: {
          a: 1,
          k: [
            {
              i: { x: 0.4, y: 1 },
              o: { x: 0.6, y: 0 },
              t: 0,
              s: [-960, 540, 0],
            },
            {
              i: { x: 0.4, y: 1 },
              o: { x: 0.6, y: 0 },
              t: 30,
              s: [960, 540, 0],
            },
            {
              t: 60,
              s: [2880, 540, 0],
            },
          ],
          ix: 2,
          l: 2,
        },
        a: { a: 0, k: [960, 540, 0], ix: 1, l: 2 },
        s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              d: 1,
              s: { a: 0, k: [1920, 1080], ix: 2 },
              p: { a: 0, k: [0, 0], ix: 3 },
              r: { a: 0, k: 0, ix: 4 },
              nm: "RectPath",
              mn: "ADBE Vector Shape - Rect",
              hd: false,
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.961, 0.961, 0.961, 1], ix: 4 },
              o: { a: 0, k: 100, ix: 5 },
              r: 1,
              bm: 0,
              nm: "Fill",
              mn: "ADBE Vector Graphic - Fill",
              hd: false,
            },
            {
              ty: "tr",
              p: { a: 0, k: [960, 540], ix: 2 },
              a: { a: 0, k: [0, 0], ix: 1 },
              s: { a: 0, k: [100, 100], ix: 3 },
              r: { a: 0, k: 0, ix: 6 },
              o: { a: 0, k: 100, ix: 7 },
              sk: { a: 0, k: 0, ix: 4 },
              sa: { a: 0, k: 0, ix: 5 },
              nm: "Transform",
            },
          ],
          nm: "RectGroup",
          np: 3,
          cix: 2,
          bm: 0,
          ix: 1,
          mn: "ADBE Vector Group",
          hd: false,
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

export default placeholderSlideAnimation;