// import React from "react";
// import Image from 'next/image';

import { buildMetadata, siteConfig } from '@/config/site.config';
import PhotoBoxScrollFade from "@/components/animations/PhotoBoxScrollFade";
import HeroWorkSection from "@/components/sections/HeroWorkSection";
import WorkCardsSection from "@/components/sections/WorkCardsSection";

export const metadata = buildMetadata({
    title: "Work",
    description: 'Creative development and WordPress integration by Mantas.',
    alternates: { canonical: '/work' },
});

export default function WorkPage() {
    return (
        <>
            <PhotoBoxScrollFade />
            
            <div className="fp-work-page-inner">
                <HeroWorkSection />
                <WorkCardsSection />
            </div>
        </>
    );
}