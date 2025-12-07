import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local"
import "./globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import {BodyClassProvider} from "./BodyClassProvider";

export const roth = localFont({
  src: [
    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-ExtraLight.woff2', weight: '200', style: 'normal' },
    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-ExtraLightItalic.woff2', weight: '200', style: 'italic' },

    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-Light.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-LightItalic.woff2', weight: '300', style: 'italic' },

    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-MediumItalic.woff2', weight: '500', style: 'italic' },

    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-SemiBoldItalic.woff2', weight: '600', style: 'italic' },

    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-RegularItalic.woff2', weight: '400', style: 'italic' },

    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-ExBold.woff2', weight: '800', style: 'normal' },
    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-ExBoldItalic.woff2', weight: '800', style: 'italic' },

    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-Normal.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-NormalItalic.woff2', weight: '400', style: 'italic' },

    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-Hairline.woff2', weight: '100', style: 'normal' },
    { path: '../public/fonts/Trial-Rothek/Trial-Rothek-HairlineItalic.woff2', weight: '100', style: 'italic' },
  ],
  variable: '--font-roth', // optional CSS variable
});


const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-montserrat",
});

export const metadata: Metadata = {
    title: "Skroling - where performance meets perfection.",
    description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={montserrat.variable}>
            <body>
                <BodyClassProvider>
                    <ClientLayoutWrapper>
                        {children}
                    </ClientLayoutWrapper>
                </BodyClassProvider>
      
            </body>
        </html>
    );
}