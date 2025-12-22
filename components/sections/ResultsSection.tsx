"use client";

import ExpandResultsAnimation from "@/components/animations/ExpandResultsAnimation";

export default function ResultsSection() {
    return (
        <section className="fp-sec-results relative z-2 pt-12 pb-12 md:pb-32">
            <ExpandResultsAnimation />
            <div className="container mx-auto">
                {/* <div className="fp-section-heading pb-20">Real results</div> */}
                <div className="fp-results-list">
                    <div className="inner">
                        <div
                            className="
                                flex justify-space-between gap-3 md:gap-6 max-md:flex-wrap

                                sm:max-lg:grid
                                sm:max-lg:grid-cols-3
                                sm:max-lg:grid-rows-[161px_161px]
                                sm:max-lg:gap-x-1
                                sm:max-lg:gap-y-2

                                sm:max-lg:[&>article]:h-auto
                                sm:max-lg:[&>article:nth-child(2)]:self-auto

                                sm:max-lg:[&>article:nth-child(1)]:col-start-1
                                sm:max-lg:[&>article:nth-child(1)]:row-span-2

                                sm:max-lg:[&>article:nth-child(4)]:col-start-2
                                sm:max-lg:[&>article:nth-child(4)]:row-start-1

                                sm:max-lg:[&>article:nth-child(2)]:col-start-2
                                sm:max-lg:[&>article:nth-child(2)]:row-start-2

                                sm:max-lg:[&>article:nth-child(3)]:col-start-3
                                sm:max-lg:[&>article:nth-child(3)]:row-span-2
                            "
                            >

                            <article className="flex h-[210px] lg:h-[410px] w-full flex-col justify-between rounded-[15px] md:rounded-[20px] bg-[#EAEAEA] p-6 sm:pt-4 lg:pt-6">
                                <div className="text-[65px] font-medium leading-none">23</div>
                                <div className="border-t border-[#ABACAC] pt-3 text-[14px] font-medium leading-[1.25] uppercase tracking-[0.02sem]">
                                    Happy clients
                                </div>
                            </article>
                            <article className="flex self-end h-[210px] w-full flex-col justify-between rounded-[15px] md:rounded-[20px] bg-[#EAEAEA] p-6">
                                <div className="text-[65px] font-medium leading-none">&infin;</div>
                                <div className="border-t border-[#ABACAC] pt-3 text-[14px] font-medium leading-[1.25] uppercase tracking-[0.03em]">
                                    Created micro-interactions
                                </div>
                            </article>
                            <article className="flex h-[210px] lg:h-[410px] w-full flex-col justify-between rounded-[15px] md:rounded-[20px] bg-[#EAEAEA] p-6 sm:pt-4 lg:pt-6">
                                <div className="text-[65px] font-medium leading-none">5x</div>
                                <div className="border-t border-[#ABACAC] pt-3 text-[14px] font-medium leading-[1.25] uppercase tracking-[0.03em]">
                                    Speed update
                                </div>
                            </article>
                            <article className="flex h-[210px] w-full flex-col justify-between rounded-[15px] md:rounded-[20px] bg-[#EAEAEA] p-6 sm:pt-4 lg:pt-6">
                                <div className="text-[65px] font-medium leading-none">15</div>
                                <div className="border-t border-[#ABACAC] pt-3 text-[14px] font-medium leading-[1.25] uppercase tracking-[0.03em]">
                                    Years in development
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}