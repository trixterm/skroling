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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
    <section className="fp-sec-faq w-full pt-15 pb-20 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Heading */}
          <div className="lg:sticky lg:top-24 lg:self-start lg:mt-3">
            <div className="font-medium">
              <div className="block text-[48px] md:text-[56px] leading-none mb-1">FAQs:</div>
              <div className="block text-[30px] md:text-[46px] text-[#ABACAC] leading-tight">Common questions <br />that you ask</div>
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="w-full">
            <div className="flex flex-col">
              {faqs.map((faq, index) => (
                <div key={index} className="accordion border-t border-gray-200">
                  {/* Question */}
                  <div
                    className={`question cursor-pointer py-4 flex items-start justify-between gap-4 transition-all duration-400 ${
                      openIndex === index ? 'open' : ''
                    }`}
                    onClick={() => toggleFaq(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={openIndex === index}
                  >
                    <div className="text-[18px] leading-[22px] font-medium flex-1">
                      {faq.question}
                    </div>
                    <div className="icon-wrapper shrink-0 w-[17px] h-[17px] flex items-center justify-center mr-2">
                      <svg
                        className="transition-all duration-300"
                        width="17"
                        height="17"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 20H40"
                          stroke="black"
                          strokeWidth="2.2"
                          strokeLinecap="butt"
                          strokeLinejoin="miter"
                        />
                        <path
                          d="M20 0V40"
                          stroke="black"
                          strokeWidth="2.2"
                          strokeLinecap="butt"
                          strokeLinejoin="miter"
                          className="transition-all duration-300 origin-center"
                          style={{
                            opacity: openIndex === index ? 0 : 1,
                            transform: openIndex === index ? 'scale(0)' : 'scale(1)'
                          }}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Answer */}
                  <div
                    className={`answer overflow-hidden transition-all duration-500 ease-in-out ${
                      openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="answer-wrapper pb-6">
                      <p className="text-base leading-[22px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;