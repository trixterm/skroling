import React from "react";

type Service = {
  id: string;
  title: string;       // su "<br />"
  description: string; // su "<br />"
};

const services: Service[] = [
  {
    id: "01",
    title: "Animated Interface <br />Development",
    description:
      "Building expressive, motion-rich <br />interfaces using GSAP and Framer <br />Motion, bringing clarity, emotion, <br />and precision to every interaction.",
  },
  {
    id: "02",
    title: "React &amp; Next.js <br />Front-End Engineering",
    description:
      "Developing fast, scalable, and <br />maintainable front-end architectures with <br />React and Next.js, optimized for <br />performance and long-term growth.",
  },
  {
    id: "03",
    title: "Custom WordPress <br />Development",
    description:
      "Creating tailored WordPress builds with <br />modern code standards, clean structure, <br />and advanced integrations to support <br />complex content needs.",
  },
  {
    id: "04",
    title: "High-Performance <br />Web Architecture",
    description:
      "Implementing modern technical foundations <br />—optimized loading, clean code organization, <br />and stable infrastructure—to ensure <br />consistent, reliable performance.",
  },
  {
    id: "05",
    title: "Interactive Feature <br />Implementation",
    description:
      "Engineering advanced interactive elements <br />that enhance usability and drive <br />engagement, from subtle transitions to <br />complex user-triggered behavior.",
  },
  {
    id: "06",
    title: "Website Rebuilds <br />&amp; Modernization",
    description:
      "Rebuilding outdated or inefficient <br />websites into clean, modern, and <br />optimized systems using current best <br />practices and modern frameworks.",
  },
  {
    id: "07",
    title: "API Integration <br />&amp; Custom Functionality",
    description:
      "Connecting external services, building <br />custom logic, and extending platforms with <br />robust, secure, and well-documented <br />functionality.",
  },
  {
    id: "08",
    title: "Technical Consulting <br />&amp; Solution Planning",
    description:
      "Providing expert direction on workflows, <br />architecture, and technical decision-making <br />to ensure every project is built on a stable, <br />scalable foundation.",
  },
  {
    id: "09",
    title: "Ongoing Maintenance <br />&amp; Performance Oversight",
    description:
      "Ensuring continuous security, updates, <br />and performance optimization so the <br />website remains stable, fast, and secure <br />over time.",
  },
];

// minimalus entity decode (kad &amp; virstų į &)
const decodeBasicEntities = (s: string) =>
  s
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");

const renderWithDesktopBr = (text: string) => {
  const parts = text.split(/<br\s*\/?>/gi);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {decodeBasicEntities(part)}
      {i !== parts.length - 1 && <br className="hidden md:block" />}
    </React.Fragment>
  ));
};

export default function ServicesGrid() {
  return (
    <div className="container">
      <div className="fp-grid-services grid grid-cols-1 md:grid-cols-3">
        {services.map((service) => (
          <article key={service.id} className="flex h-full flex-col">
            <div className="flex flex-1 flex-col pt-[43px] pl-[30px] pb-10">
              <div className="text-[26px] fp-extra-font font-medium tracking-wide dark:text-white">
                {service.id}
              </div>

              <div className="mt-20 md:mt-36 space-y-4">
                <h3 className="text-[28px] fp-extra-font font-medium leading-9 dark:text-white">
                  {renderWithDesktopBr(service.title)}
                </h3>

                <p className="text-[16px] font-medium leading-[22px] dark:text-white">
                  {renderWithDesktopBr(service.description)}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}