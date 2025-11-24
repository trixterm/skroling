"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, Easing } from "framer-motion";
import styled from "styled-components";
import { transitionPresets } from "../transition-presets";

const TransitionContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

interface PageTransitionProps {
  children: ReactNode;
  preset?: keyof typeof transitionPresets;
  duration?: number;
  easing?: Easing | Easing[];
}

export function PageTransition({
  children,
  preset = "fade",
  duration = 0.45,
  easing = [0.22, 1, 0.36, 1], // ← valid cubic bezier
}: PageTransitionProps) {
  const pathname = usePathname();
  const [mountedKey, setMountedKey] = useState(pathname);

  useEffect(() => {
    setMountedKey(pathname);
  }, [pathname]);

  const presetVariants = transitionPresets[preset];

  return (
    <TransitionContainer aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mountedKey}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={presetVariants}
          transition={{
            duration,
            ease: easing as Easing | Easing[], // <- arba cast, jei nori
          }}
          style={{ position: "absolute", width: "100%" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </TransitionContainer>
  );
}