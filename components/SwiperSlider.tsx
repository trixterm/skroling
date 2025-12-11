"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

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
    <div className={isHoverVideo ? "slide-inner group" : "slide-inner"}>
      <a className="absolute inset-0 z-30" href={href}></a>

      {isHoverVideo ? (
        <div className="relative h-[460px] bg-neutral-300 rounded-[20px] overflow-hidden">
            <div className="fp-mask absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-900">
                <Image className="object-cover" src={image} alt={title} fill />
            </div>

            {video && (
                <div className="fp-video-mask absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-900">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src={video} type="video/mp4" />
                </video>
                </div>
            )}
        </div>
      ) : (
        <div className="relative h-[460px] bg-neutral-300 rounded-[20px] overflow-hidden flex p-7">
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

const slides: WorkSlideProps[] = [
  {
    title: "Website 1",
    image: "/images/website-1.jpg",
    video: "/videos/3571264-hd_1920_1080_30fps.mp4",
    type: "hoverVideo",
  },
  {
    title: "Website 2",
    image: "/images/website-2.jpg",
    video: "/videos/3571264-hd_1920_1080_30fps.mp4",
    type: "hoverVideo",
  },
  {
    title: "Website 3",
    image: "/images/website-1.jpg",
    video: "/videos/3571264-hd_1920_1080_30fps.mp4",
    type: "hoverVideo",
  },
  {
    title: "Website 4",
    image: "/images/website-2.jpg",
    type: "static",
  },
];

export default function SwiperSlider({ onInitControls }: SwiperSliderProps) {
  return (
    <div className="relative cursor-none">
      <Swiper
        modules={[Navigation]}
        loop={true}
        speed={700}
        spaceBetween={10}
        slidesPerView={3}
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
