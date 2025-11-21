"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from 'next/image'

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import CustomCursor from "@/components/CustomCursor";

export default function SwiperSlider({ onInitControls }) {
    return (
        <div className="relative cursor-none"> {/* Hides default cursor */}
            {/* <CustomCursor /> */}

        <Swiper
            modules={[Navigation, Autoplay]}
            // autoplay={{ delay: 4000 }}
            loop={true}
            speed={900}
            spaceBetween={10}
            slidesPerView={3}
            onSwiper={(swiper) => {
                if (onInitControls) {
                    onInitControls({
                        next: () => swiper.slideNext(),
                        prev: () => swiper.slidePrev(),
                    });
                }
            }}
            className="fp-swiper-work"
        >

        <SwiperSlide className="relative">
            <div className="slide-inner">
                <a className="w-100 h-100 absolute z-3" href="#"></a>
                <div className="h-[460px] bg-neutral-300 rounded-[20px] relative flex p-7">
                    <div className="fp-mask"><Image className="rounded-[20px]" src="/images/website-1.jpg" fill={true} objectFit={'cover'} alt="" /></div>
                    <div className="fp-meta mt-auto z-2">
                        <div className="fp-title text-[22px[ font-semibold">Website 1</div>
                    </div>
                </div>
            </div>
        </SwiperSlide>

        <SwiperSlide className="relative">
            <div className="slide-inner">
                <a className="w-100 h-100 absolute z-3" href="#"></a>
                <div className="h-[460px] bg-neutral-300 rounded-[20px] relative flex p-7">
                    <div className="fp-mask"><Image className="rounded-[20px]" src="/images/website-2.jpg" fill={true} objectFit={'cover'} alt="" /></div>
                    <div className="fp-meta mt-auto z-2">
                        <div className="fp-title text-[22px[ font-semibold">Website 1</div>
                    </div>
                </div>
            </div>
        </SwiperSlide>

        <SwiperSlide className="relative">
            <div className="slide-inner">
                <a className="w-100 h-100 absolute z-3" href="#"></a>
                <div className="h-[460px] bg-neutral-300 rounded-[20px] relative flex p-7">
                    <div className="fp-mask"><Image className="rounded-[20px]" src="/images/website-1.jpg" fill={true} objectFit={'cover'} alt="" /></div>
                    <div className="fp-meta mt-auto z-2">
                        <div className="fp-title text-[22px[ font-semibold">Website 1</div>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        
        <SwiperSlide className="relative">
            <div className="slide-inner">
                <a className="w-100 h-100 absolute z-3" href="#"></a>
                <div className="h-[460px] bg-neutral-300 rounded-[20px] relative flex p-7">
                    <div className="fp-mask"><Image className="rounded-[20px]" src="/images/website-2.jpg" fill={true} objectFit={'cover'} alt="" /></div>
                    <div className="fp-meta mt-auto z-2">
                        <div className="fp-title text-[22px[ font-semibold">Website 1</div>
                    </div>
                </div>
            </div>
        </SwiperSlide>

        </Swiper>
    </div>
  );
}