"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import PageTransition from "@/components/animations/PageTransition";
import { AnimationProvider } from "@/context/AnimationContext";
import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import FooterSection from "@/components/sections/FooterSection";
import SmoothScroll from "@/components/SmoothScroll";

const CursorOpen = dynamic(() => import("@/components/CursorOpen"), {
  ssr: false,
});

const CursorTopNav = dynamic(() => import("@/components/CursorTopNav"), {
  ssr: false,
});

export interface ClientLayoutWrapperProps {
  children: ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname();

  const hideFooter = pathname === "/contact";

  return (
    // PageTransition at the ROOT level - outside any transform containers
    <PageTransition transitionDuration={500}>
      <SmoothScroll>
        <AnimationProvider>
          <div id="flash-overlay" aria-hidden="true" />

          <Header />
          <MobileHeader />

          <main id="main-content">{children}</main>

          {!hideFooter && <FooterSection />}
        </AnimationProvider>

        <CursorOpen />
        <CursorTopNav />
      </SmoothScroll>
    </PageTransition>
  );
}