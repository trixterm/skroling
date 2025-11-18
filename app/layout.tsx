import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";

import { AnimationProvider } from "@/context/AnimationContext";
import NavbarWrapper from "@/components/NavbarWrapper";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-montserrat",
});

export const metadata: Metadata = {
    title: "Skroling - where performance meets perfection.",
    description: "",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={montserrat.variable}>
        <body>
            <SmoothScroll>
            {/* <PageTransition> */}
                <AnimationProvider>
                    <div id="flash-overlay"></div>

                    <NavbarWrapper />
                    {children}
                </AnimationProvider>
            {/* </PageTransition> */}
            </SmoothScroll>
            </body>
        </html>
    );
}