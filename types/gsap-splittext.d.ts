declare module 'gsap/SplitText' {
  type SplitTextTarget = Element | Element[] | string;

  interface SplitTextInstance {
    chars: HTMLElement[];
    words: HTMLElement[];
    lines: HTMLElement[];
    revert(): void;
  }

  class SplitText implements SplitTextInstance {
    constructor(target: SplitTextTarget, vars?: Record<string, unknown>);
    chars: HTMLElement[];
    words: HTMLElement[];
    lines: HTMLElement[];
    revert(): void;
  }

  export { SplitText };
  export default SplitText;
}
