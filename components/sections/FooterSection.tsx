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
    <footer className="site-footer relative z-2 bg-[#1A1A1A] text-white rounded-t-[44px] md:rounded-t-[48px] pt-12.5 pb-9 md:pb-22 max-md:flex max-md:flex-col-reverse">
      <CopyrightSection />

      <div className="fp-footer-contact">
        <div className="container mx-auto">
          <div className="md:grid md:grid-cols-2 md:gap-x-6">
            {/* LEFT COLUMN */}
            <div className="fp-col flex flex-col pb-3.5 md:pb-0">
              <LogoFooter />

              {/* Book Call Card */}
              <div className="fp-book-call flex gap-x-6 items-center rounded-2xl md:rounded-[20px] bg-[#2F2F34] py-6 px-5 md:p-4 mt-auto">
                <div className="fp-mask w-[90px] h-[92px] md:w-[154px] md:h-40 rounded-[10px] relative overflow-hidden">
                  <Image
                    src="/images/example-1.jpg"
                    alt="Mantas photo"
                    fill
                    sizes="(max-width: 768px) 90px, 92px"
                    className="object-cover"
                  />
                </div>

                <div className="fp-content flex flex-col flex-1 h-full md:py-2">
                  <div className="fp-text text-[17px] md:text-[21px] font-medium leading-[28px] md:max-w-[335px] max-md:hidden">
                    Jump on a quick call to discuss your project goals.
                  </div>

                  <div className="fp-row-cta flex mt-auto md:items-end max-md:flex-col">
                    <div className="fp-name-wrap">
                      <div className="fp-name text-[16px] md:text-[19px] font-semibold leading-none mb-0.5 md:mb-1">
                        Mantas
                      </div>
                      <div className="fp-position text-[13px] italic text-[#A8A6A6]">
                        Skroling owner lead of dev
                      </div>
                    </div>

                    <div className="cta-btn-wrap md:ml-auto max-md:mt-2.5">
                      <a className="fp-btn fp-btn-filled-1" href="#">
                        Book a call
                      </a>
                    </div>
                  </div>
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
