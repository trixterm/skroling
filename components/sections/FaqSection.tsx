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
    "question": "How can we start working together?",
    "answer": "Send your design direction, project scope and intended timeline through the contact form or to hello@skroling.dev. I’ll review the brief and discuss the implementation with you."
  },
  {
    "question": "Do you work with design studios?",
    "answer": "Yes. I work as an independent creative developer, implementing designs and developing the motion, interactions and WordPress integration they need."
  },
  {
    "question": "Who creates the design?",
    "answer": "My focus is development. For Kaite and Lukdeira, I collaborated with Kaite, who created the designs. Natural Awakenings was designed by Agnes and implemented while I worked at Flip180 Media."
  },
  {
    "question": "Can you build a WordPress website?",
    "answer": "Yes. WordPress integration is part of my work, including both the Kaite and Lukdeira websites."
  },
  {
    "question": "How are budget and timing agreed?",
    "answer": "These depend on the design, functionality and scope. Share the brief so we can discuss an appropriate plan before starting."
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