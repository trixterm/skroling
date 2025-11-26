"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// TypeScript interfaces
interface CardData {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface StackedCardsProps {
  cards: CardData[];
  className?: string;
}

const StackedCards: React.FC<StackedCardsProps> = ({
  cards,
  className = '',
}) => {
  const cardsContainerRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Ensure we're in browser environment
    if (typeof window === 'undefined' || !cardsContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate each card
      contentRefs.current.forEach((content, index) => {
        if (!content) return;

        const card = cardRefs.current[index];
        if (!card) return;

        // Calculate scale based on reverse index
        const numCards = cards.length;
        const reverseIndex = numCards - index;
        const targetScale = 1.1 - (0.1 * reverseIndex);

        // Create scroll-triggered animation
        gsap.to(content, {
          scale: targetScale,
          transformOrigin: '50% 0%',
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, cardsContainerRef);

    return () => ctx.revert();
  }, [cards]);

  return (
    <section className={`fp-sec-work-cards pb-[20vh] mt-[300px] relative ${className}`}>
      <main className="w-[80vw] mx-auto">
        <ul
          ref={cardsContainerRef}
          className="list-none p-0 m-0 grid grid-cols-1 gap-[4vw] mb-[4vw]"
          style={{
            gridTemplateRows: `repeat(${cards.length}, 40vw)`,
            paddingBottom: `calc(${cards.length} * 1em)`,
          }}
        >
          {cards.map((card, index) => (
            <li
              key={card.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="sticky"
              style={{
                top: '0px',
                paddingTop: `calc(${index + 1} * 1em)`,
              }}
            >
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className="shadow-[0_0.2em_1em_rgba(0,0,0,0.1),0_1em_2em_rgba(0,0,0,0.1)] bg-[#fffaf2] text-[#131212] rounded-[2rem] overflow-hidden grid grid-cols-2 gap-0 items-stretch p-6 h-full"
                style={{
                  gridTemplateAreas: '"text img"',
                }}
              >
                <div
                  className="w-[95%] max-w-[800px] place-self-center text-left grid gap-4 items-start"
                  style={{ gridArea: 'text' }}
                >
                  <h2 className="font-serif font-bold text-4xl m-0">
                    {card.title}
                  </h2>
                  <p className="font-light leading-relaxed text-lg">
                    {card.description}
                  </p>
                </div>
                <figure
                  className="m-0 overflow-hidden"
                  style={{ gridArea: 'img' }}
                >
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover rounded-md"
                  />
                </figure>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
};

// Demo component with sample data
const StackedCardsDemo: React.FC = () => {
  const sampleCards: CardData[] = [
    {
      id: 'card-1',
      title: 'Card One',
      description:
        'This is the content of card one. Lorem ipsum dolor sit amet consectetur adipisicing elit. Experience the smooth stacking animation.',
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop',
      imageAlt: 'Card one',
    },
    {
      id: 'card-2',
      title: 'Card Two',
      description:
        'This is the content of card two. Lorem ipsum dolor sit amet consectetur adipisicing elit. Watch as cards stack seamlessly.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
      imageAlt: 'Card two',
    },
    {
      id: 'card-3',
      title: 'Card Three',
      description:
        'This is the content of card three. Lorem ipsum dolor sit amet consectetur adipisicing elit. Smooth scroll-driven animations.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      imageAlt: 'Card three',
    },
    {
      id: 'card-4',
      title: 'Card Four',
      description:
        'This is the content of card four. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perfect for modern web experiences.',
      image: 'https://images.usplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
      imageAlt: 'Card four',
    },
  ];

  return <StackedCards cards={sampleCards} />;
};

export default StackedCardsDemo;