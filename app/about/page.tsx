// import React from "react";
import StorylineSection from "@/components/sections/StorylineSection";
import GridDigit from "@/components/GridDigit";

import { buildMetadata, siteConfig } from '@/config/site.config';

export const metadata = buildMetadata({
    title: `About | ${siteConfig.siteName}`,
    description: 'Skroling',
});

export default function AboutPage() {
    return (
        <>
            <GridDigit interval={1000} />
            <StorylineSection />
            
        </>
    );
}