import styles from "./TestimonialsSection.module.css";

type Testimonial = {
    text: string;
    author: string;
};

const testimonials: Testimonial[] = [
    {
        text: "11 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu rhoncus lectus, at ornare massa. Praesent porttitor vitae leo vel congue.",
        author: "Thom 11",
    },
    {
        text: "22 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu rhoncus lectus, at ornare massa. Praesent porttitor vitae leo vel congue.",
        author: "Thom 22",
    },
    {
        text: "33 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu rhoncus lectus, at ornare massa. Praesent porttitor vitae leo vel congue.",
        author: "Thom 33",
    },
];

export default function TestimonialsSection() {
    return (
        <section className="fp-sec-testimonials py-8 pb-20 relative z-2">
            <div className="container mx-auto">
                <div className="inner flex items-end gap-12 relative">
                    <h2 className="fp-heading text-[52px] font-semibold leading-[1.15]">
                        What clients <br />
                        say about me
                    </h2>

                    <div
                        className={`${styles["fp-testimonials-list"]} flex gap-6 items-end`}
                    >
                        {testimonials.map((item, index) => (
                            <div
                                key={index}
                                className={`${styles.item} w-[12px] h-[12px] rounded-[6px] bg-[#3C3C3C] relative`}
                            >
                                <figure
                                    className={`${styles["fp-meta"]} fp-meta text-white z-2 p-6 opacity-0 invisible`}
                                >
                                    <blockquote className="text-[12px] leading-5">
                                        {item.text}
                                    </blockquote>
                                    <figcaption className="text-[12px] mt-3">
                                        - {item.author}
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