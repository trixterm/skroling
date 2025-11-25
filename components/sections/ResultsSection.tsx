"use client";

import CountUpAnimation from "@/components/animations/CountUpAnimation";

export default function ResultsSection() {
  return (
    <section className="fp-sec-results relative z-2">
      <div className="container mx-auto">
        <div className="fp-section-heading pb-20">Real results</div>

        <div className="fp-results-list">
          <div className="inner mx-20 grid grid-cols-3 gap-x-3 gap-y-12">
            
            {/* 1 ITEM */}
            <div className="item">
              <CountUpAnimation 
                value={5} 
                prefix="x" 
                subtitle="Speed Upgrades"
                className="text-[80px] font-medium leading-24" 
              />
            </div>

            {/* 2 ITEM */}
            <div className="item">
              <CountUpAnimation 
                value={23} 
                subtitle="Happy Clients"
                className="text-[80px] font-medium leading-24" 
              />
            </div>

            {/* 3 ITEM */}
            <div className="item col-2">
              <CountUpAnimation 
                value={5} 
                prefix="x" 
                subtitle="Speed Upgrades"
                className="text-[80px] font-medium leading-24" 
              />
            </div>

            {/* 4 ITEM */}
            <div className="item col-3">
              <CountUpAnimation 
                value={23} 
                subtitle="Launched Projects"
                className="text-[80px] font-medium leading-24" 
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}