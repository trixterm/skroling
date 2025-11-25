// import React from "react";

import { buildMetadata, siteConfig } from '@/config/site.config';

export const metadata = buildMetadata({
    title: `Services | ${siteConfig.siteName}`,
    description: 'Skroling',
});

export default function ServicesPage() {
    return <h1>services</h1>;
}