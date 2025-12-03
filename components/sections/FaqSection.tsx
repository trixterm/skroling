import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs?: FaqItem[];
}

const defaultFaqs: FaqItem[] = [
  {
    question: "I'm interested in collaboration. Where do I start?",
    answer: "Starting a collaboration is easy! Simply reach out through our contact form or email us directly. We'll schedule an initial consultation to discuss your project goals, timeline, and requirements. From there, we'll provide you with a detailed proposal outlining the scope, deliverables, and investment."
  },
  {
    question: "What exactly do you do?",
    answer: "We specialize in creating custom web experiences through design and development. Our services include brand identity design, UI/UX design, responsive website development, web application development, and ongoing maintenance and support. We work with modern technologies to deliver high-performance, scalable solutions."
  },
  {
    question: "What is the process?",
    answer: "Our process typically follows these phases: Discovery & Strategy (understanding your goals and requirements), Design (creating wireframes and visual designs), Development (building your solution), Testing (ensuring quality and performance), and Launch (deployment and handoff). Throughout each phase, we maintain clear communication and incorporate your feedback."
  },
  {
    question: "Do you design and build websites?",
    answer: "Yes, absolutely! We offer full-service design and development. This means we handle everything from initial concept and visual design through to full development and deployment. We ensure a seamless integration between design and functionality, creating websites that are both beautiful and performant."
  },
  {
    question: "Can we edit the website when it's done?",
    answer: "Yes, we build websites with content management systems (CMS) that allow you to easily update content, images, and other elements without technical knowledge. We also provide training and documentation to ensure you're comfortable managing your site. For more complex updates, we offer ongoing support packages."
  },
  {
    question: "How long will it take to complete the project?",
    answer: "Project timelines vary based on scope and complexity. A typical website project takes 6-12 weeks from kickoff to launch. This includes time for design, development, revisions, and testing. More complex applications may take 3-6 months. We'll provide a detailed timeline during the proposal phase and keep you updated throughout the project."
  },
  {
    question: "What is the price?",
    answer: "Pricing depends on the scope, complexity, and specific requirements of your project. Our website projects typically range from $5,000 to $50,000+. We offer transparent, fixed-price quotes based on clearly defined deliverables. During our initial consultation, we'll discuss your budget and create a solution that delivers maximum value."
  },
  {
    question: "What is included in a round of revision?",
    answer: "A revision round includes feedback on the presented work within the agreed scope. You can request changes to design elements, content adjustments, layout modifications, and refinements to better align with your vision. We typically include 2-3 revision rounds per project phase. Major scope changes or new features may require additional rounds or adjustments to the project plan."
  },
  {
    question: "What do you require before starting a project?",
    answer: "Before starting, we need: a signed contract outlining the project scope and terms, an initial deposit (typically 50%), access to relevant brand materials and assets, content or a content outline, and any technical requirements or integrations. We'll also need clear points of contact for decision-making to ensure smooth project flow."
  }
];

const FaqSection: React.FC<FaqSectionProps> = ({ faqs = defaultFaqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleFaq(index);
    }
  };

  return (
    <section className="fp-sec-faq w-full py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Heading */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="text-5xl md:text-6xl lg:text-7xl font-regular leading-16">
              <span className="block text-black">FAQs:</span>
              <span className="block text-gray-400 mt-2">Common design <br /> questions</span>
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left hover:opacity-70 transition-opacity duration-200 focus:outline-none focus:opacity-70"
                >
                  <span className="text-base md:text-lg font-normal text-black leading-relaxed pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 text-2xl md:text-3xl font-light text-black transition-transform duration-300 ease-in-out ${
                      openIndex === index ? 'rotate-45' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? 'max-h-96 opacity-100 mb-6'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed pr-12">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;