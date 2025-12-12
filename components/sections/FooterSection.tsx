import Image from "next/image";
import dynamic from "next/dynamic";
import CopyrightSection from "@/components/sections/CopyrightSection";
import LogoFooter from "@/components/LogoFooter";

// Kontaktų forma kraunama tik klientui (ir tik kai wrapperis ją parodys)
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
    <footer className="site-footer relative z-2 bg-[#1A1A1A] text-white rounded-t-[40px] md:rounded-t-[48px] pt-9 pb-22 max-md:flex max-md:flex-col-reverse">
      <CopyrightSection />

      <div className="fp-footer-contact">
        <div className="container mx-auto">
          <div className="md:grid md:grid-cols-2 md:gap-x-6">
            {/* LEFT COLUMN */}
            <div className="fp-col flex flex-col pb-3.5 md:pb-0">
              <LogoFooter />

              {/* Book Call Card */}
              <div className="fp-book-call flex gap-x-6 items-center rounded-[14px] bg-[#2F2F34] p-4 mt-auto">
                <div className="fp-mask w-[100px] h-[120px] md:w-[154px] md:h-[162px] rounded-[10px] relative overflow-hidden">
                  <Image
                    src="/images/monty.png"
                    alt="Mantas photo"
                    fill
                    sizes="(max-width: 768px) 100px, 154px"
                    className="object-cover"
                  />
                </div>

                <div className="fp-content flex flex-col flex-1 h-full md:py-2">
                  <div className="fp-text text-[17px] md:text-[21px] font-medium leading-[28px] md:max-w-[335px] max-md:hidden">
                    Jump on a quick call to discuss your project goals.
                  </div>

                  <div className="fp-row-cta flex mt-auto md:items-end max-md:flex-col">
                    <div className="fp-name-wrap">
                      <div className="fp-name text-[19px] font-medium">
                        Mantas
                      </div>
                      <div className="fp-position text-[12px] italic text-[#A8A6A6]">
                        Skroling owner lead of dev
                      </div>
                    </div>

                    <div className="cta-btn-wrap md:ml-auto max-md:mt-3">
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
              <div className="fp-form-wrap bg-[#2F2F34] px-4 md:px-14 pt-12 pb-7 rounded-[14px]">
                <div className="fp-title text-[19px] font-medium mb-6">
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
