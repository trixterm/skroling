// import React from "react";

import { buildMetadata, siteConfig } from '@/config/site.config';
import WorkCardsSection from "@/components/sections/WorkCardsSection";

export const metadata = buildMetadata({
    title: `Work | ${siteConfig.siteName}`,
    description: 'Skroling',
});

export default function WorkPage() {
    return (
        <WorkCardsSection />
    );
}