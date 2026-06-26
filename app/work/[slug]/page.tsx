import { notFound } from "next/navigation";
import { works } from "@/data/works";
import { buildMetadata, siteConfig } from "@/config/site.config";
import HeroWorkSingle from "@/components/sections/HeroWorkSingle";
import GridBackground from "@/components/GridBackground";
import ApproachWorkSingle from "@/components/sections/ApproachWorkSingle";
import MindSection from "@/components/sections/MindSection";
import CtaNextProject from "@/components/sections/CtaNextProject";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const work = works.find((w) => w.slug === slug);

    if (!work) return {};

    return buildMetadata({
        title: `${work.title} | Work | ${siteConfig.siteName}`,
        description: work.description,
    });
}

export default async function WorkSinglePage({ params }: Props) {
    const { slug } = await params;
    const work = works.find((w) => w.slug === slug);

    if (!work) {
        notFound();
    }

    return (
        <article className="fp-work-single">
            <GridBackground />
           <HeroWorkSingle heroImage={work.heroImage} title={work.title} />
           <ApproachWorkSingle />
           <MindSection />
           <CtaNextProject />
        </article>
    );
}