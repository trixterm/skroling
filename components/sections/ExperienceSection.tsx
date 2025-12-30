import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { EXPERIENCE_CONTENT } from "@/content/portfolio.content";

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
                        {EXPERIENCE_CONTENT.map((item, index) => {
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
