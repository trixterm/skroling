import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type ExperienceItem = {
    title: string;
    description: string;
};

const EXPERIENCE_ITEMS: ExperienceItem[] = [
    {
        title: "Digital Magazines",
        description:
            "More than a decade of experience developing content-driven digital products, working with large volumes of information and complex structures. This background brings clients well-organized, easy-to-navigate experiences where content flows naturally, engagement lasts longer, and information is understood quickly without effort.",
    },
    {
        title: "Multimedia",
        description:
            "This period shaped a holistic approach to digital work—thinking beyond individual pages and focusing on the brand as a complete system, from initial idea to a fully functional website. For clients, this results in clear messaging, a consistent visual identity, and digital solutions that are not just visually polished, but purposeful and aligned with their goals.",
    },
    {
        title: "Film & Editing \nFundamentals",
        description:
            "A strong foundation in visual storytelling, rhythm, and motion introduced a cinematic way of thinking that translates directly to the web. This allows clients to communicate emotion, build trust, and convey ideas clearly through movement and visual hierarchy, reducing the need for excessive text.",
    },
    {
        title: "Web Development",
        description:
            "Building complete web solutions independently—from concept through development to launch—made it possible to align UX logic, motion, and technical execution without compromise. Clients benefit from flexible collaboration, faster decisions, and websites that work exactly as intended, without unnecessary technical complexity.",
    },
    {
        title: "Web Experiences \nThat Drive Action",
        description:
            "Today, brand logic, UX structure, motion thinking, and performance come together to create websites built for clarity and impact. Clients receive experiences where key information is understood instantly, motion serves a clear purpose, and performance supports fast, confident user action.",
    },
    {
        title: "Short-Form Video \n& Social Advertising",
        description:
            "Creating short, attention-driven video content refined the ability to communicate clearly within seconds. For clients, this means strong first impressions, direct messaging, and visuals designed to prompt immediate action in fast-moving digital environments.",
    },
];

const GRID_COLUMNS = 2;

const gridBackgroundStyle: CSSProperties = {
    backgroundColor: "#f4f4f2",
    backgroundImage: `
        linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)
    `,
    backgroundSize: "70px 70px",
};

export default function ExperienceSection() {
    return (
        <section className="fp-sec-experience relative isolate overflow-hidden py-20 sm:py-24 lg:py-32 text-[#0f0f0f]">
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 opacity-90"
                style={gridBackgroundStyle}
            />

            <div className="container">
                <header className="mb-12 md:mb-60 flex justify-end">
                    <div className="fp-heading fp-extra-font text-[48px] sm:text-[62px] md:text-[110px] lg:text-[170px] leading-[0.9] font-medium">
                        Experience
                    </div>
                </header>

                <div className="fp-grid-experience-wrap">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-24">
                        {EXPERIENCE_ITEMS.map((item, index) => {
                            const isLeftColumn = index % GRID_COLUMNS === 0;
                            const isRightColumn = !isLeftColumn;

                            return (
                                <div
                                    key={item.title}
                                    className={cn(
                                        "space-y-4",
                                        isRightColumn && "md:-translate-y-8 lg:-translate-y-28"
                                    )}
                                >
                                    <div className="mb-2 md:mb-4 text-[24px] sm:text-[28px] font-medium whitespace-pre-line md:whitespace-normal">
                                        {item.title}
                                    </div>
                                    <div className="text-[16px] sm:text-[16px] font-medium leading-[22px] md:max-w-[585px]">
                                        {item.description}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
