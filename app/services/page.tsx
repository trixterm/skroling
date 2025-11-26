// import React from "react";

import { buildMetadata, siteConfig } from '@/config/site.config';
import ProcessCardsSlider from '@/components/sections/ProcessCardsSlider';


export const metadata = buildMetadata({
    title: `Services | ${siteConfig.siteName}`,
    description: 'Skroling',
});

export default function ServicesPage() {
    return (
        <ProcessCardsSlider />
    )
}