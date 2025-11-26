"use client";

import React, { useRef, useState, useEffect } from 'react';
import SliderNav from "@/components/SliderNav";

const ProcessCardsSlider = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cards = [
    {
      number: '01',
      duration: '1-2 weeks',
      title: 'Discovery',
      description: 'The new website has completely transformed our online presence. It loads fast, looks great on all devices, and has already helped increase customer inquiries. The entire experience was hassle-free and incredibly professional.'
    },
    {
      number: '02',
      duration: '2-3 weeks',
      title: 'Research',
      description: 'The new website has completely transformed our online presence. It loads fast, looks great on all devices, and has already helped increase customer inquiries. The entire experience was hassle-free and incredibly professional.'
    },
    {
      number: '03',
      duration: '3-4 weeks',
      title: 'Wireframe',
      description: 'The new website has completely transformed our online presence. It loads fast, looks great on all devices, and has already helped increase customer inquiries. The entire experience was hassle-free and incredibly professional.'
    },
    {
      number: '04',
      duration: '4-5 weeks',
      title: 'Build',
      description: 'The new website has completely transformed our online presence. It loads fast, looks great on all devices, and has already helped increase customer inquiries. The entire experience was hassle-free and incredibly professional.'
    },
    {
      number: '05',
      duration: '1-2 weeks',
      title: 'Animation',
      description: 'The new website has completely transformed our online presence. It loads fast, looks great on all devices, and has already helped increase customer inquiries. The entire experience was hassle-free and incredibly professional.'
    },
    {
      number: '06',
      duration: '2-3 weeks',
      title: 'Testing',
      description: 'The new website has completely transformed our online presence. It loads fast, looks great on all devices, and has already helped increase customer inquiries. The entire experience was hassle-free and incredibly professional.'
    }
  ];

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 315; // card width (300px) + gap (15px)
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(checkScrollability, 300);
    }
  };

  return (
    <section className="fp-sec-process-cards-slider py-44">
      <div className="container">
        <header className="fp-header flex items-center mb-6">
          <div className="fp-title text-[16px] font-semibold">Your product going to live process</div>
          <div className="ml-auto">
            <SliderNav 
              onPrev={() => scroll('left')} 
              onNext={() => scroll('right')}
            />
          </div>
        </header>
      </div>
      <div className="ml-auto w-[1360px]">
        <div className="relative">
          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollability}
            className="flex gap-[15px] overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cards.map((card, index) => (
              <article
                key={index}
                className="relative flex-shrink-0 w-[300px] h-[380px] bg-[#1a1a1a] rounded-2xl p-6 pr-4 flex flex-col justify-between hover:bg-[#222222] transition-colors duration-300"
                role="article"
                aria-label={`${card.title} process card`}
              >
                {/* Top Section */}
                <div>
                  <div className="duration-wrap flex mb-6">
                    {/* Duration Badge */}
                    <div className="flex self-start border border-[#FFF] px-6 py-1.5 rounded-[20px]">
                      <span className="text-[10px] font-medium text-[#F0F0F0] leading-[12px]">
                        {card.duration}
                      </span>
                    </div>

                    {/* Number */}
                    <div className="inline-block -mt-[14px] ml-auto text-[94px] font-medium text-[#F0F0F0] leading-none">
                      {card.number}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] text-[#F0F0F0] leading-[18px] mb-6">
                    {(() => {
                      const sentences = card.description.match(/[^.!?]+[.!?]+/g) || [];
                      if (sentences.length === 0) return card.description;
                      
                      const lastSentence = sentences[sentences.length - 1];
                      const restText = card.description.slice(0, -lastSentence.length);
                      
                      return (
                        <>
                          {restText}
                          <span className="text-[#C4C4C4]">{lastSentence}</span>
                        </>
                      );
                    })()}
                  </p>
                </div>

                {/* Bottom Section - Title */}
                <div>
                  <h3 className="text-[40px] font-medium text-[#F0F0F0] leading-none">
                    {card.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Scroll Indicator Dots (Optional) */}
        <div className="flex justify-center gap-2 mt-8">
          {cards.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-[#F0F0F0]/20 hover:bg-[#F0F0F0]/40 transition-colors duration-300 cursor-pointer"
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ProcessCardsSlider;