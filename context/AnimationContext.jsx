"use client";

import { createContext, useContext, useState } from "react";

const AnimationContext = createContext(null);

export function AnimationProvider({ children }) {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <AnimationContext.Provider value={{ introFinished, setIntroFinished }}>
      {children}
    </AnimationContext.Provider>
  );
}

export const useAnimation = () => useContext(AnimationContext);