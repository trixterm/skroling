import React from "react";

type Service = {
  id: string;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    id: "01",
    title: "Animated Interface<br />Development",
    description:
      "Building expressive, motion-rich interfaces using GSAP and Framer Motion, bringing clarity, emotion, and precision to every interaction.",
  },
  {
    id: "02",
    title: "React &amp; Next.js<br />Front-End Engineering",
    description:
      "Developing fast, scalable, and maintainable front-end architectures with React and Next.js, optimized for performance and long-term growth.",
  },
  {
    id: "03",
    title: "Custom WordPress<br />Development",
    description:
      "Creating tailored WordPress builds with modern code standards, clean structure, and advanced integrations to support complex content needs.",
  },
  {
    id: "04",
    title: "High-Performance<br />Web Architecture",
    description:
      "Implementing modern technical foundations—optimized loading, clean code organization, and stable infrastructure—to ensure consistent, reliable performance.",
  },
  {
    id: "05",
    title: "Interactive Feature<br />Implementation",
    description:
      "Engineering advanced interactive elements that enhance usability and drive engagement, from subtle transitions to complex user-triggered behavior.",
  },
  {
    id: "06",
    title: "Website Rebuilds<br />&amp; Modernization",
    description:
      "Rebuilding outdated or inefficient websites into clean, modern, and optimized systems using current best practices and modern frameworks.",
  },
  {
    id: "07",
    title: "API Integration<br />&amp; Custom Functionality",
    description:
      "Connecting external services, building custom logic, and extending platforms with robust, secure, and well-documented functionality.",
  },
  {
    id: "08",
    title: "Technical Consulting<br />&amp; Solution Planning",
    description:
      "Providing expert direction on workflows, architecture, and technical decision-making to ensure every project is built on a stable, scalable foundation.",
  },
  {
    id: "09",
    title: "Ongoing Maintenance<br />&amp; Performance Oversight",
    description:
      "Ensuring continuous security, updates, and performance optimization so the website remains stable, fast, and secure over time.",
  },
];

export default function ServicesGrid() {
  return (
    <div className="fp-grid-services grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <article key={service.id} className="flex h-full flex-col">
          <div className="flex flex-1 flex-col p-10">
            <div className="text-[26px] font-medium tracking-wide dark:text-white">
              {service.id}
            </div>

            <div className="mt-16 space-y-4">
              <h3
                className="text-[26px] font-medium leading-snug dark:text-white"
                // allows using <br /> inside the title string
                dangerouslySetInnerHTML={{ __html: service.title }}
              />
              <p className="max-w-[360px] text-[16px] font-medium leading-[22px] dark:text-white">
                {service.description}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
