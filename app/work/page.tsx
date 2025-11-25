// import React from "react";

import { buildMetadata, siteConfig } from '@/config/site.config';

export const metadata = buildMetadata({
    title: `Work | ${siteConfig.siteName}`,
    description: 'Skroling',
});

export default function WorkPage() {
    return <h1>Work</h1>;
}