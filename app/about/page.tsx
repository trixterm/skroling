// import React from "react";
// TEST 3: All components - MyExpertiseSection is the suspect (uses GridDigit with ScrollTrigger pin)
import StorylineSection from "@/components/sections/StorylineSection";
import MyExpertiseSection from "@/components/sections/MyExpertiseSection";
import ExperienceSection from "@/components/sections/ExperienceSection";

import { buildMetadata, siteConfig } from '@/config/site.config';

export const metadata = buildMetadata({
    title: "About",
    description: 'Creative development and WordPress integration by Mantas.',
    alternates: { canonical: '/about' },
});

export default function AboutPage() {
    return (
        <>
            <StorylineSection />
            <MyExpertiseSection />
            <ExperienceSection />
        </>
    );
}