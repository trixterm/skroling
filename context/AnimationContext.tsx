"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type AnimationContextType = {
  introFinished: boolean;
  setIntroFinished: (value: boolean) => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <AnimationContext.Provider value={{ introFinished, setIntroFinished }}>
      {children}
    </AnimationContext.Provider>
  );
}

export const useAnimation = (): AnimationContextType => {
  const ctx = useContext(AnimationContext);
  if (!ctx) {
    throw new Error("useAnimation must be used within AnimationProvider");
  }
  return ctx;
};