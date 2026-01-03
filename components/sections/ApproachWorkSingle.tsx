"use client";

import Image from "next/image";

interface ApproachWorkSingleProps {
    description?: string;
    imageSrc1?: string;
    imageSrc2?: string;
    imageSrc3?: string;
    imageAlt?: string;
}

const ApproachWorkSingle = ({
    description = "Craft digital experiences that resonate. We design and develop interactive websites where motion, emotion, and strategy work together to guide users toward your goals. Using advanced animation frameworks and best-in-class technologies, we create interfaces that feel intuitive, purposeful, and unmistakably premium.",
    imageSrc1 = "/images/website-01.jpg",
    imageSrc2 = "/images/website-02.jpg",
    imageSrc3 = "/images/website-03.jpg",
    imageAlt = "Website project preview",
}: ApproachWorkSingleProps) => {
    return (
        <section className="fp-sec-approach-work-single pt-12 pb-10 md:pt-6 md:pb-20">
            <div className="md:max-w-[900px] lg:max-w-[1230px] mx-auto px-[15px]">
                <div className="flex flex-col md:flex-row md:gap-12 xl:gap-16 items-end">
                    {/* First Column - Text Content and Small Image */}
                    <div className="w-full md:w-1/2 flex flex-col">
                        {/* Text Content */}
                        <div className="md:max-w-[560px]">
                            <p className="text-[20px] leading-[33px]">
                                {description}
                            </p>
                        </div>

                        {/* Small Image Placeholder - 80% width of column */}
                        <div className="md:w-[60%] h-[400px] aspect-4/3 relative mt-10 lg:mt-20">
                            <div className="relative md:w-[380px] h-[390px] overflow-hidden">
                                <Image
                                    src={imageSrc1}
                                    alt={imageAlt}
                                    fill
                                    className="object-cover w-full h-full rounded-[16px]"
                                    sizes="(max-width: 1024px) 80vw, 40vw"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Second Column - Large Image */}
                    <div className="w-full md:w-1/2">
                        <div className="relative md:w-[400px] lg:w-[580px] h-[580px] overflow-hidden">
                            <Image
                                src={imageSrc2}
                                alt={imageAlt}
                                fill
                                className="object-cover rounded-[16px] w-full h-full"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="fp-sec-fp-featured-approach mt-5 md:mt-8">
                <div className="container">
                    <div className="relative h-[300px] md:h-[650px] overflow-hidden">
                        <Image
                            src={imageSrc3}
                            alt={imageAlt}
                            fill
                            className="object-cover rounded-[16px] w-full h-full"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApproachWorkSingle;