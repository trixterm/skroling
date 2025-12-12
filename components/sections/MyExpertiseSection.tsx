"use client";

import GridDigit from "@/components/GridDigit";

export default function MyExpertiseSection() {
    return (
        <>
            <section className="fp-sec-my-expertise">
                <div className="container">
                    <div className="inner">
                        <div className="fp-heading fp-extra-font text-[34px] font-medium mb-10">My Expertise</div>
                        <div className="fp-grid-numbers">
                            <GridDigit interval={1000} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
