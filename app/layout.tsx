import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/PageTransition";

import { AnimationProvider } from "@/context/AnimationContext";
import CursorOpen from "@/components/CursorOpen";
import CursorTopNav from "@/components/CursorTopNav";
import Header from "@/components/Header";
import FooterSection from "@/components/sections/FooterSection";
import CopyrightSection from "@/components/sections/CopyrightSection";
import SmoothScroll from "@/components/SmoothScroll";
// import PageTransition from "@/components/PageTransition";

import type { ReactNode } from "react";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-montserrat",
});

export const metadata: Metadata = {
    title: "Skroling - where performance meets perfection.",
    description: "",
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en" className={montserrat.variable}>
            <body>
                <SmoothScroll>
                    <PageTransition preset="fade" duration={0.5}>
                        <AnimationProvider>
                            <div id="flash-overlay"></div>

                            <Header />

                            {children}

                            <CopyrightSection />
                            <FooterSection />
                        </AnimationProvider>
                    </PageTransition>
                    <CursorOpen />
                    <CursorTopNav />
                </SmoothScroll>
            </body>
        </html>
    );
}