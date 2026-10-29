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
      "Implementing reusable interface components from a designer’s visual system.",
  },
  3: {
    heading: "Custom Functionality",
    description:
      "Building custom functionality, including searchable and filterable content directories.",
  },
  4: {
    heading: "Performance & Accessibility",
    description:
      "Reviewing loading performance, readability and interaction details during implementation.",
  },
  5: {
    heading: "Design Collaboration",
    description:
      "Working with designers to coordinate development, animation and content integration.",
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
    duration: "Scope-dependent",
    title: "Discovery",
    description: "Review the design, content and functionality together.",
  },
  {
    number: "02",
    duration: "Scope-dependent",
    title: "Research",
    description: "Identify technical requirements and motion opportunities.",
  },
  {
    number: "03",
    duration: "Scope-dependent",
    title: "Structure",
    description: "Agree the implementation structure and interactions.",
  },
  {
    number: "04",
    duration: "Scope-dependent",
    title: "Build",
    description: "Build the website and connect the content management system.",
  },
  {
    number: "05",
    duration: "Scope-dependent",
    title: "Animation",
    description: "Coordinate animation timing and scroll-driven transitions.",
  },
  {
    number: "06",
    duration: "Scope-dependent",
    title: "Testing",
    description: "Review layouts, interactions and forms before handoff.",
  },
];

// ========================================
// EXPERIENCE SECTION
// ========================================

export const EXPERIENCE_CONTENT: ExperienceItem[] = [
  {
    title: "Web Development",
    description: "I’m Mantas, a freelance creative developer with 15 years in development. I work with design studios to turn their designs into websites, with a focus on implementation, interaction and WordPress integration.",
  },
  {
    title: "Design Collaboration",
    description: "For Kaite and Lukdeira, I worked independently with Kaite, who created the designs. My role covered programming, WordPress integration and animation.",
  },
  {
    title: "Scroll Animation",
    description: "For Kaite, I coordinated moving background images with service information inside an overlaid card. For Lukdeira, I built a continuous transition from services to company facts.",
  },
  {
    title: "WordPress Integration",
    description: "I integrated the Kaite and Lukdeira websites with WordPress, connecting the designed interfaces and their interactions to the content management system.",
  },
  {
    title: "Publishing Websites",
    description: "While working at Flip180 Media, I implemented the Natural Awakenings website from Agnes’s design. My work included the magazine directory, search and filtering.",
  },
  {
    title: "Your Next Project",
    description: "Have a design ready to build? Share the design, functionality and intended timeline at hello@skroling.dev so we can discuss the development work.",
  },
];
