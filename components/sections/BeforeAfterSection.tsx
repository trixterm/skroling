"use client";

import VideosExpandAnimation from "@/components/animations/VideosExpandAnimation";

export default function BeforeAfterSection() {
    return (
        <>
            <VideosExpandAnimation />

            <section className="fp-sec-before-after z-2 relative">
                <div className="container">

                    <div className="fp-grid-before-after">
                        <div className="item item-before md:grid md:grid-cols-2 md:items-center md:gap-x-20 max-md:mb-12">
                            <div className="fp-content max-w-[450px] ml-auto mr-10 max-md:ml-5 max-md:mb-6 opacity-0">
                                <div className="fp-heading fp-extra-font text-[34px] font-medium mb-4">Before the Redesign</div>
                                <div className="fp-text text-[16px] font-medium leading-[25px]">The previous website lacked personality and clarity. It attracted visitors who negotiated prices endlessly, undervalued the work, and questioned the company’s professionalism. Slow loading times and a confusing structure made it difficult for potential clients to find information or trust the brand.</div>
                            </div>
                            <div className="fp-video-box fp-video-box-1 overflow-hidden">
                                <video
                                    src="/videos/3571264-hd_1920_1080_30fps.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="object-cover h-[300px]"
                                ></video>
                            </div>
                        </div>
                    </div>

                    <div className="fp-grid-before-after">
                        <div className="item item-before md:grid md:grid-cols-2 md:items-center md:gap-x-20 max-md:flex max-md:flex-col-reverse">
                            <div className="fp-video-box fp-video-box-2 overflow-hidden mt-1">
                                <video
                                    src="/videos/3571264-hd_1920_1080_30fps.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="object-cover h-[300px] md:ml-auto"
                                ></video>
                            </div>
                            <div className="fp-content max-w-[460px] ml-5 md:ml-10 max-md:mb-6 opacity-0">
                                <div className="fp-heading fp-extra-font text-[34px] font-medium mb-4">After the Redesign</div>
                                <div className="fp-text text-[16px] font-medium leading-[25px]">The new goal-driven website delivers a premium, modern experience supported by smooth microinteractions and thoughtful design. The refreshed brand feels cleaner, more confident, and more professional — helping the company build trust, stand out in its niche, and attract clients who value quality.</div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}
