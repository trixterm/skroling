"use client";

import GridDigit from "@/components/GridDigit";

export default function MyExpertiseSection() {
    return (
        <>
            <section className="fp-sec-my-expertise">
                <div className="fp-grid-background-3"></div>
                <div className="container">
                    <div className="inner relative z-2">
                        <div className="fp-heading fp-extra-font text-[34px] font-medium mb-12">Knowledge</div>
                        <div className="fp-grid-steps-1 md:flex md:gap-x-16 md:items-center max-w-[920px] mx-auto">
                            <div className="fp-col">
                                <GridDigit interval={100000} />
                            </div>
                            <div className="fp-col max-w-[490px]">
                                <div className="fp-heading fp-extra-font text-[28px] leading-10 font-medium mb-6">React & Next.js<br />Front-End Engineering</div>
                                <div className="fp-text text-[16px] font-medium">Developing fast, scalable, and maintainable front-end architectures with React and Next.js, optimized for performance and long-term growth.<br />Developing fast, scalable, and maintainable front-end architectures with React and Next.js, optimized for performance and long-term growth.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
