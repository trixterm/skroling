"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { PageTransition } from "@/components/animations/PageTransition";
import { AnimationProvider } from "@/context/AnimationContext";
import CursorOpen from "@/components/CursorOpen";
import CursorTopNav from "@/components/CursorTopNav";
import Header from "@/components/Header";
import FooterSection from "@/components/sections/FooterSection";
import SmoothScroll from "@/components/SmoothScroll";

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const hideFooter = pathname === "/contact";

    return (
        <SmoothScroll>
            <PageTransition preset="fade" duration={0.5}>
                <AnimationProvider>
                    <div id="flash-overlay"></div>

                    <Header />

                    {children}

                    {!hideFooter && <FooterSection />}
                </AnimationProvider>
            </PageTransition>

            <CursorOpen />
            <CursorTopNav />
        </SmoothScroll>
    );
}