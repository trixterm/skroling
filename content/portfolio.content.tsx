import React from "react";

// ========================================
// TYPES
// ========================================

export type DigitContent = {
  heading: React.ReactNode;
  description: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
};

export type ProcessCard = {
  number: string;
  duration: string;
  title: string;
  description: string;
};

export type ExperienceItem = {
  title: string;
  description: string;
};

// ========================================
// EXPERTISE SECTION (Grid Digits)
// ========================================

export const EXPERTISE_CONTENT: Record<number, DigitContent> = {
  1: {
    heading: (
      <>
        React & Next.js
        <br />
        Front-End Engineering
      </>
    ),
    description:
      "Developing fast, scalable, and maintainable front-end architectures with React and Next.js, optimized for performance and long-term growth.",
  },
  2: {
    heading: "Design Systems & UI Architecture",
    description:
      "Building resilient component systems, Storybook-driven libraries, and cohesive design languages that keep large products consistent.",
  },
  3: {
    heading: "TypeScript & API Contracts",
    description:
      "Creating strongly-typed client integrations, shared schemas, and developer tooling that surface bugs early and speed feature delivery.",
  },
  4: {
    heading: "Performance & Accessibility",
    description:
      "Profiling rendering paths, eliminating regressions, and baking WCAG-compliant patterns into the foundation of every interface.",
  },
  5: {
    heading: "Team Leadership & Delivery",
    description:
      "Leading multi-disciplinary squads, establishing delivery rituals, and mentoring engineers through complex front-end initiatives.",
  },
};

// ========================================
// SERVICES SECTION
// ========================================

export const SERVICES_CONTENT: ServiceItem[] = [
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

// ========================================
// PROCESS SECTION
// ========================================

export const PROCESS_CONTENT: ProcessCard[] = [
  {
    number: "01",
    duration: "1-2 weeks",
    title: "Discovery",
    description: "The new website has completely transformed...",
  },
  {
    number: "02",
    duration: "2-3 weeks",
    title: "Research",
    description: "We analyzed user behavior extensively...",
  },
  {
    number: "03",
    duration: "3-4 weeks",
    title: "Wireframe",
    description: "We created a full structural blueprint...",
  },
  {
    number: "04",
    duration: "4-5 weeks",
    title: "Build",
    description: "The development process was executed...",
  },
  {
    number: "05",
    duration: "1-2 weeks",
    title: "Animation",
    description: "Micro-interactions were designed...",
  },
  {
    number: "06",
    duration: "2-3 weeks",
    title: "Testing",
    description: "Every feature underwent rigorous QA...",
  },
];

// ========================================
// EXPERIENCE SECTION
// ========================================

export const EXPERIENCE_CONTENT: ExperienceItem[] = [
  {
    title: "Digital Magazines",
    description:
      "More than a decade of experience developing content-driven digital products, working with large volumes of information and complex structures. This background brings clients well-organized, easy-to-navigate experiences where content flows naturally, engagement lasts longer, and information is understood quickly without effort.",
  },
  {
    title: "Multimedia",
    description:
      "This period shaped a holistic approach to digital work—thinking beyond individual pages and focusing on the brand as a complete system, from initial idea to a fully functional website. For clients, this results in clear messaging, a consistent visual identity, and digital solutions that are not just visually polished, but purposeful and aligned with their goals.",
  },
  {
    title: "Film & Editing \nFundamentals",
    description:
      "A strong foundation in visual storytelling, rhythm, and motion introduced a cinematic way of thinking that translates directly to the web. This allows clients to communicate emotion, build trust, and convey ideas clearly through movement and visual hierarchy, reducing the need for excessive text.",
  },
  {
    title: "Web Development",
    description:
      "Building complete web solutions independently—from concept through development to launch—made it possible to align UX logic, motion, and technical execution without compromise. Clients benefit from flexible collaboration, faster decisions, and websites that work exactly as intended, without unnecessary technical complexity.",
  },
  {
    title: "Web Experiences \nThat Drive Action",
    description:
      "Today, brand logic, UX structure, motion thinking, and performance come together to create websites built for clarity and impact. Clients receive experiences where key information is understood instantly, motion serves a clear purpose, and performance supports fast, confident user action.",
  },
  {
    title: "Short-Form Video \n& Social Advertising",
    description:
      "Creating short, attention-driven video content refined the ability to communicate clearly within seconds. For clients, this means strong first impressions, direct messaging, and visuals designed to prompt immediate action in fast-moving digital environments.",
  },
];
