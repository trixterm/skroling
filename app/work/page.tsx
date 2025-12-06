// import React from "react";
import Image from 'next/image';

import { buildMetadata, siteConfig } from '@/config/site.config';
import WorkCardsSection from "@/components/sections/WorkCardsSection";
import HeroWorkSection from "@/components/sections/HeroWorkSection";

export const metadata = buildMetadata({
    title: `Work | ${siteConfig.siteName}`,
    description: 'Skroling',
});

export default function WorkPage() {
    return (
        <>
            <HeroWorkSection />
            <WorkCardsSection />
        </>
    );
}