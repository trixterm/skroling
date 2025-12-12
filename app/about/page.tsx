// import React from "react";
import StorylineSection from "@/components/sections/StorylineSection";
import MyExpertiseSection from "@/components/sections/MyExpertiseSection";
import GridDigit from "@/components/GridDigit";

import { buildMetadata, siteConfig } from '@/config/site.config';

export const metadata = buildMetadata({
    title: `About | ${siteConfig.siteName}`,
    description: 'Skroling',
});

export default function AboutPage() {
    return (
        <>
            <StorylineSection />
            <MyExpertiseSection />
            
        </>
    );
}