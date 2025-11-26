import styles from "./TestimonialsSection.module.css";

type Testimonial = {
    project: string;
    text: React.ReactNode;
    author: string;
};

const testimonials: Testimonial[] = [
    {
        project: "Lukdeira",
        text: (
            <>
            The new website has completely transformed our online presence. It loads fast, looks great on all devices, and has already helped increase customer inquiries. <span className="text-[#C4C4C4]">The entire experience was hassle-free and incredibly professional.</span>
            </>
        ),
        author: "Name Surname",
    },
    {
        project: "Lukdeira",
        text: "22 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu rhoncus lectus, at ornare massa. Praesent porttitor vitae leo vel congue.",
        author: "Thom 22",
    },
    {
        project: "Lukdeira",
        text: "33 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu rhoncus lectus, at ornare massa. Praesent porttitor vitae leo vel congue.",
        author: "Thom 33",
    },
];

export default function TestimonialsSection() {
    return (
        <section className="fp-sec-testimonials py-8 pb-26 relative z-2">
            <div className="container mx-auto">
                <div className="inner flex items-end gap-12 relative">
                    <h2 className="fp-heading text-[52px] font-semibold leading-[1.15]">
                        What clients <br />
                        say about me
                    </h2>

                    <div
                        className={`${styles["fp-testimonials-list"]} flex gap-x-5 items-end`}
                    >
                        {testimonials.map((item, index) => (
                            <div
                                key={index}
                                className={`${styles.item} w-[12px] h-[12px] rounded-[16px] bg-[#1A1A1A] relative`}
                            >
                                <figure
                                    className={`${styles["fp-meta"]} h-full fp-meta flex flex-direction flex-col text-white z-2 px-6 py-8 text-center opacity-0 invisible`}
                                >
                                    <div className="project-name-wrapper mb-5">
                                        <div className="project-name inline-flex text-[10px] font-medium border-1 border-white rounded-3xl px-4 py-[3px] text-center">{item.project}</div>
                                    </div>

                                    <blockquote className="text-[16px] font-medium leading-5">
                                        {item.text}
                                    </blockquote>
                                    <figcaption className="text-[11px] font-medium text-[#9B9B9B] mt-auto">
                                        {item.author}
                                    </figcaption>
                                </figure>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}