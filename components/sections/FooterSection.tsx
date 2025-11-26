import React from 'react';
import Image from 'next/image';
import CopyrightSection from "@/components/sections/CopyrightSection";
import ContactForm from "@/components/ContactForm";

const FooterSection = () => {
    return (
       <footer className="site-footer relative z-2 bg-[#1A1A1A] text-white rounded-t-[24px] md:rounded-t-[48px] pt-9 pb-22">

            <CopyrightSection />
        
            <div className="container mx-auto">
                <div className="md:grid md:grid-cols-2 md:gap-x-6">
                    <div className="fp-col flex flex-col pb-6 md:pb-0">
                        <div className="fp-heading text-[70px] md:text-[120px] font-semibold text-[#A8A6A6] mb-16">Skroling</div>
                        <div className="fp-book-call flex gap-x-6 items-center rounded-[14px] bg-[#2F2F34] p-4 mt-auto">
                            <div className="fp-mask w-[120px] h-[130px] md:w-[154px] md:h-[162px] rounded-[10px] relative"><Image className="object-cover rounded-[10px]" src="/images/monty.png" fill={true} alt=""/></div>
                            <div className="fp-content flex flex-col flex-1 h-full py-2">
                                <div className="fp-text text-[17px] md:text-[21px] font-medium leading-[28px] md:max-w-[335px]">Jump on a quick call to discuss your project goals.</div>
                                <div className="fp-row-cta flex mt-auto items-end">
                                    <div className="fp-name-wrap">
                                        <div className="fp-name text-[19px] font-medium">Mantas</div>
                                        <div className="fp-position text-[12px] italic text-[#A8A6A6]">Skroling owner lead of dev</div>
                                    </div>
                                    <div className="cta-btn-wrap ml-auto"><a className="fp-btn fp-btn-filled-1" href="#">Book a call</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fp-col">
                        <div className="fp-form-wrap bg-[#2F2F34] px-7 md:px-14 pt-12 pb-7 rounded-[14px]">
                            <div className="fp-title text-[19px] font-medium mb-6">Leave a message</div>
                            <div className="fp-form fp-form-contact">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default FooterSection