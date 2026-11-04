"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

import { works } from "@/data/works";
import "swiper/css";
import "swiper/css/navigation";

type SwiperControls = {
  next: () => void;
  prev: () => void;
};

interface SwiperSliderProps {
  onInitControls?: (controls: SwiperControls) => void;
}

type SlideType = "hoverVideo" | "static";

interface WorkSlideProps {
    title: string;
    image: string;
    video?: string;
    type: SlideType;
    href?: string;
}

function WorkSlide({ title, image, video, type, href = "#" }: WorkSlideProps) {
  const isHoverVideo = type === "hoverVideo";

  return (
    <div className="slide-inner group relative">
      <div className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 absolute bottom-4 left-4 right-4 z-20 bg-black/80 text-white rounded-xl p-3">{title}<span className="block text-xs mt-1">View project ↗</span></div>
      <a className="absolute inset-0 z-30" href={href} aria-label={`View ${title}`}></a>

      {isHoverVideo ? (
        <div className="relative h-[380px] lg:h-[460px] bg-neutral-900 rounded-[20px] overflow-hidden">
            <div className="fp-mask absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-900">
                <Image className="object-contain" src={image} alt={title} fill />
            </div>

            {video && (
                <div className="fp-video-mask absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-900">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                >
                    <source src={video} type="video/mp4" />
                </video>
                </div>
            )}
        </div>
      ) : (
        <div className="relative aspect-[0.91] bg-neutral-900 rounded-[20px] overflow-hidden">
            <div className="fp-mask absolute inset-0">
                <Image
                className="rounded-[20px] object-cover"
                src={image}
                alt={title}
                fill
                />
            </div>
        </div>
      )}
    </div>
  );
}

const slides: WorkSlideProps[] = works.map(work => ({title: work.title, image: work.cardImage, type: "static", href: `/work/${work.slug}`}));

export default function SwiperSlider({ onInitControls }: SwiperSliderProps) {
  return (
    <div className="relative cursor-none">
      <Swiper
        modules={[Navigation]}
        loop={false}
        speed={700}
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },  // sm+
          1024: { slidesPerView: 3 }, // lg+
        }}
        onSwiper={(swiper: SwiperType) => {
          if (onInitControls) {
            onInitControls({
              next: () => swiper.slideNext(),
              prev: () => swiper.slidePrev(),
            });
          }
        }}
        className="fp-swiper-work"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <WorkSlide {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
