import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import { BodyClassProvider } from "./BodyClassProvider";

export const roth = localFont({
  src: [
    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-Hairline.woff2", weight: "100", style: "normal" },
    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-HairlineItalic.woff2", weight: "100", style: "italic" },

    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-ExtraLightItalic.woff2", weight: "200", style: "italic" },

    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-LightItalic.woff2", weight: "300", style: "italic" },

    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-RegularItalic.woff2", weight: "400", style: "italic" },

    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-Normal.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-NormalItalic.woff2", weight: "400", style: "italic" },

    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-MediumItalic.woff2", weight: "500", style: "italic" },

    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-SemiBoldItalic.woff2", weight: "600", style: "italic" },

    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-ExBold.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/Trial-Rothek/Trial-Rothek-ExBoldItalic.woff2", weight: "800", style: "italic" },
  ],
  variable: "--font-roth",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const siteTitle = "Skroling - where performance meets perfection.";
const siteDescription = "Skroling — where performance meets perfection.";

const metadataBase =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim().length > 0
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteTitle,
    template: "%s | Skroling",
  },
  description: siteDescription,
  applicationName: "Skroling",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    siteName: "Skroling",
    title: siteTitle,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${roth.variable}`}
      suppressHydrationWarning
    >
      <body className={montserrat.className}>
        <BodyClassProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </BodyClassProvider>
      </body>
    </html>
  );
}