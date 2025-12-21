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
                        <div className="flex justify-space-between gap-3 md:gap-6 max-md:flex-wrap">
                            <article className="flex h-[210px] md:h-[410px] w-full flex-col justify-between rounded-[15px] md:rounded-[20px] bg-[#EAEAEA] p-6">
                                <div className="text-[65px] font-medium leading-none">23</div>
                                <div className="border-t border-[#ABACAC] pt-3 text-[14px] font-medium uppercase tracking-[0.03em]">
                                    Happy clients
                                </div>
                            </article>
                            <article className="flex self-end h-[210px] w-full flex-col justify-between rounded-[15px] md:rounded-[20px] bg-[#EAEAEA] p-6">
                                <div className="text-[65px] font-medium leading-none">&infin;</div>
                                <div className="border-t border-[#ABACAC] pt-3 text-[14px] font-medium uppercase tracking-[0.03em]">
                                    Created micro-interactions
                                </div>
                            </article>
                            <article className="flex h-[210px] md:h-[410px] w-full flex-col justify-between rounded-[15px] md:rounded-[20px] bg-[#EAEAEA] p-6">
                                <div className="text-[65px] font-medium leading-none">5x</div>
                                <div className="border-t border-[#ABACAC] pt-3 text-[14px] font-medium uppercase tracking-[0.03em]">
                                    Speed update
                                </div>
                            </article>
                            <article className="flex h-[210px] w-full flex-col justify-between rounded-[15px] md:rounded-[20px] bg-[#EAEAEA] p-6">
                                <div className="text-[65px] font-medium leading-none">15</div>
                                <div className="border-t border-[#ABACAC] pt-3 text-[14px] font-medium uppercase tracking-[0.03em]">
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
