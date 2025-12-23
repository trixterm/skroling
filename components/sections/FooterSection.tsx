import Image from "next/image";
import dynamic from "next/dynamic";
import CopyrightSection from "@/components/sections/CopyrightSection";
import LogoFooter from "@/components/LogoFooter";

const ContactFormLazyWrapper = dynamic(
  () => import("@/components/ContactFormLazyWrapper"),
  {
    ssr: false,
    loading: () => (
      <div className="text-[#A8A6A6] text-sm">Loading form…</div>
    ),
  }
);

export default function FooterSection() {
  return (
    <footer className="site-footer relative z-2 bg-[#1A1A1A] text-white rounded-t-[44px] md:rounded-t-[48px] pt-12.5 pb-9 md:pb-16 max-md:flex max-md:flex-col-reverse">
      <CopyrightSection />

      <div className="fp-footer-contact">
        <div className="container mx-auto">
          <div className="sm:grid sm:grid-cols-2 md:grid-cols-[9fr_11fr] lg:grid-cols-2 sm:gap-x-4 md:gap-x-6">
            {/* LEFT COLUMN */}
            <div className="fp-col flex flex-col sm:pt-8 md:pt-0 pb-3.5 lg:pb-0">
              <LogoFooter />

              {/* Book Call Card */}
              <div className="fp-book-call flex flex-col md:flex-col lg:flex-row gap-x-6 items-center rounded-2xl md:rounded-[20px] bg-[#2F2F34] py-6 px-5 md:p-6 lg:p-4 md:mt-auto md:items-start lg:items-center md:h-80 lg:h-auto md:py-8 lg:py-6">
                {/* Text - visible on md-lg at top, hidden on mobile and lg+ */}
                <div className="fp-text hidden md:block lg:hidden text-[22px] font-medium leading-7 md:max-w-[300px] mb-8">
                  Jump on a quick call to discuss your project goals.
                </div>

                {/* Image + Name row wrapper for md-lg */}
                <div className="flex md:flex-row lg:contents gap-x-6 items-center w-full md:items-end lg:items-center md:gap-x-4 lg:gap-x-6">
                  <div className="fp-mask w-[90px] h-[92px] md:w-[70px] md:h-[72px] lg:w-[154px] lg:h-40 rounded-[10px] relative overflow-hidden shrink-0">
                    <Image
                      src="/images/example-1.jpg"
                      alt="Mantas photo"
                      fill
                      sizes="(max-width: 768px) 90px, (max-width: 1024px) 70px, 154px"
                      className="object-cover"
                    />
                  </div>

                  <div className="fp-content flex flex-col flex-1 h-full md:py-0 lg:py-2 md:h-auto lg:h-full">
                    {/* Text - hidden on md-lg, visible on lg+ */}
                    <div className="fp-text text-[17px] md:text-[21px] font-medium leading-7 md:max-w-[335px] max-md:hidden md:hidden lg:block relative">
                      Jump on a quick call to discuss your project goals.
                    </div>

                    <div className="fp-row-cta flex md:flex-col lg:flex-row md:items-start lg:mt-auto lg:items-end max-md:flex-col">
                      <div className="fp-name-wrap">
                        <div className="fp-name text-[16px] md:text-[19px] font-semibold leading-none mb-0.5 md:mb-1">
                          Mantas
                        </div>
                        <div className="fp-position text-[13px] italic text-[#A8A6A6]">
                          Skroling owner, head of dev
                        </div>
                      </div>

                      {/* CTA button - inline on mobile and lg+, hidden on md-lg */}
                      <div className="cta-btn-wrap md:ml-auto max-md:mt-2.5 md:hidden lg:block">
                        <a className="fp-btn fp-btn-filled-1" href="#">
                          Book a call
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA button - full width at bottom for md-lg only */}
                <div className="cta-btn-wrap hidden md:block lg:hidden w-full mt-4 md:w-auto md:ml-auto lg:w-full md:mt-auto">
                  <a className="fp-btn fp-btn-filled-1 w-full text-center block" href="#">
                    Book a call
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="fp-col">
              <div className="fp-form-wrap bg-[#2F2F34] px-5.5 pt-10.5 pb-7 md:px-14 md:pt-12 rounded-2xl md:rounded-[20px]">
                <div className="fp-title text-[19px] font-semibold mb-4 md:mb-6">
                  Leave a message
                </div>

                <ContactFormLazyWrapper />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}