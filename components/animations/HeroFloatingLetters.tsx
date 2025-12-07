"use client";

import { useEffect, useRef } from "react";

type FloatingLettersEffectOptions = {
  letterSelector?: string;
  maxTranslate?: number;
  ease?: number;
  fpsCap?: number; // 0 = uncapped
};

type FloatingLettersEffectState = {
  el: HTMLElement;
  x: number;
  y: number;
  intensity: number;
};

class FloatingLettersEffect {
  private container: HTMLElement;
  private options: Required<FloatingLettersEffectOptions>;
  private letters: HTMLElement[];
  private letterStates: FloatingLettersEffectState[];
  private rect: DOMRect;
  private reduceMotion: boolean;
  private pointer = {
    x: 0,
    y: 0,
  };
  private lastFrameTime = 0;
  private running = false;

  constructor(container: HTMLElement, options: FloatingLettersEffectOptions = {}) {
    this.container = container;
    this.options = {
      letterSelector: options.letterSelector ?? ".work-letters-wrapper .fp-letter",
      maxTranslate: options.maxTranslate ?? 14,
      ease: options.ease ?? 0.16,
      fpsCap: options.fpsCap ?? 0,
    };

    this.letters = Array.from(
      this.container.querySelectorAll<HTMLElement>(this.options.letterSelector)
    );

    if (!this.letters.length) {
      this.reduceMotion = true;
      this.rect = this.container.getBoundingClientRect();
      this.letterStates = [];
      return;
    }

    this.reduceMotion =
      typeof window !== "undefined" &&
      "matchMedia" in window &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.rect = this.container.getBoundingClientRect();

    this.letterStates = this.letters.map((el) => ({
      el,
      x: 0,
      y: 0,
      // šiek tiek random, kad nebūtų visiškai vienodi offset’ai
      intensity: 0.4 + Math.random() * 0.8,
    }));

    if (!this.reduceMotion) {
      this.init();
    }
  }

  private onPointerMove = (e: PointerEvent) => {
    const r = this.rect;
    const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const ny = (e.clientY - r.top) / r.height - 0.5;

    this.pointer.x = Math.max(-0.5, Math.min(0.5, nx));
    this.pointer.y = Math.max(-0.5, Math.min(0.5, ny));
  };

  private onPointerLeave = () => {
    // Kai išeini iš sekcijos – grąžinam į centrą (0,0)
    this.pointer.x = 0;
    this.pointer.y = 0;
  };

  private onResize = () => {
    this.rect = this.container.getBoundingClientRect();
  };

  private loop = (timestamp: number) => {
    if (!this.running) return;

    if (this.options.fpsCap && this.lastFrameTime) {
      const minDelta = 1000 / this.options.fpsCap;
      if (timestamp - this.lastFrameTime < minDelta) {
        requestAnimationFrame(this.loop);
        return;
      }
    }

    this.lastFrameTime = timestamp;
    const { maxTranslate, ease } = this.options;

    for (const state of this.letterStates) {
      const { el, intensity } = state;
      const base = maxTranslate * intensity;

      const pointerOffsetX = this.pointer.x * base * 2;
      const pointerOffsetY = this.pointer.y * base * 2;

      const targetX = pointerOffsetX;
      const targetY = pointerOffsetY;

      // smooth ease
      state.x += (targetX - state.x) * ease;
      state.y += (targetY - state.y) * ease;

      el.style.setProperty("--fx", `${state.x.toFixed(3)}px`);
      el.style.setProperty("--fy", `${state.y.toFixed(3)}px`);
    }

    requestAnimationFrame(this.loop);
  };

  private init() {
    this.running = true;

    this.container.addEventListener("pointermove", this.onPointerMove);
    this.container.addEventListener("pointerenter", this.onPointerMove);
    this.container.addEventListener("pointerleave", this.onPointerLeave);
    window.addEventListener("resize", this.onResize);

    this.container.setAttribute("data-floating-letters-ready", "true");

    requestAnimationFrame(this.loop);
  }

  public destroy() {
    this.running = false;
    this.container.removeEventListener("pointermove", this.onPointerMove);
    this.container.removeEventListener("pointerenter", this.onPointerMove);
    this.container.removeEventListener("pointerleave", this.onPointerLeave);
    window.removeEventListener("resize", this.onResize);
    this.container.removeAttribute("data-floating-letters-ready");

    this.letterStates.forEach((state) => {
      state.el.style.removeProperty("--fx");
      state.el.style.removeProperty("--fy");
    });
  }
}

export type HeroFloatingLettersProps = FloatingLettersEffectOptions & {
  containerSelector?: string;
};

const HeroFloatingLetters: React.FC<HeroFloatingLettersProps> = ({
  containerSelector = ".hero-work-section",
  letterSelector,
  maxTranslate,
  ease,
  fpsCap,
}) => {
  const effectRef = useRef<FloatingLettersEffect | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!container) return;

    const effect = new FloatingLettersEffect(container, {
      letterSelector,
      maxTranslate,
      ease,
      fpsCap,
    });

    effectRef.current = effect;

    return () => {
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, [containerSelector, letterSelector, maxTranslate, ease, fpsCap]);

  return null;
};

export default HeroFloatingLetters;
