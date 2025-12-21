import { memo } from "react";
import VideoExpand from "@/components/animations/VideoExpandAnimation";

const HEADING_LETTERS = [
  {
    key: "e",
    className: "w-auto h-full z-2",
    xmlns: "http://www.w3.org/2000/svg",
    width: 138.67,
    height: 216.685,
    viewBox: "0 0 19.81 30.955",
    children: (
      <path
        d="M0,.464V31.419H19.81V26.908H4.82V17.843H18.439V13.6H4.82V4.975H19.81V.464Z"
        transform="translate(0 -0.464)"
        fill="#1a1818"
      />
    ),
  },
  {
    key: "v",
    className: "fp-v-letter w-auto h-full relative z-2",
    xmlns: "http://www.w3.org/2000/svg",
    width: 205.87,
    height: 216.72,
    viewBox: "0 0 29.41 30.96",
    children: (
      <path
        d="M53.313.461l-9.37,22.27L34.563.461h-5.35l12.71,30.96h3.95L58.623.461Z"
        transform="translate(-29.213 -0.461)"
        fill="#1a1818"
      />
    ),
  },
  {
    key: "o",
    className: "w-auto h-full z-2",
    xmlns: "http://www.w3.org/2000/svg",
    width: 217.917,
    height: 222.866,
    viewBox: "0 0 31.131 31.838",
    children: (
      <path
        d="M62.99,15.941c0-8.8,6.633-15.919,15.566-15.919S94.121,7.141,94.121,15.941,87.49,31.86,78.556,31.86,62.99,24.741,62.99,15.941m26.311,0c0-6.279-4.642-11.276-10.745-11.276s-10.79,5-10.79,11.276,4.687,11.232,10.79,11.232S89.3,22.22,89.3,15.941"
        transform="translate(-62.99 -0.022)"
        fill="#1a1818"
      />
    ),
  },
  {
    key: "k",
    className: "fp-k-letter w-auto h-full relative",
    xmlns: "http://www.w3.org/2000/svg",
    width: 175.511,
    height: 216.678,
    viewBox: "0 0 25.073 30.954",
    children: (
      <path
        d="M101.182.442H106V14.769L119.4.442h6.412L111.131,15.831,126.255,31.4H119.8L106,16.936V31.4h-4.82Z"
        transform="translate(-101.182 -0.442)"
        fill="#1a1818"
      />
    ),
  },
  {
    key: "i",
    className: "w-auto h-full z-2",
    xmlns: "http://www.w3.org/2000/svg",
    width: 33.733,
    height: 216.678,
    viewBox: "0 0 4.819 30.954",
    children: <rect width="4.819" height="30.954" fill="#1a1818" />,
  },
  {
    key: "n",
    className: "fp-n-letter w-auto h-full z-2 relative",
    xmlns: "http://www.w3.org/2000/svg",
    width: 174.93,
    height: 216.72,
    viewBox: "0 0 24.99 30.96",
    children: (
      <path
        d="M170.215.461v21.61l-16.2-21.05h-4.15v30.4h4.65V9.811l16.29,21.56h4.05V.461Z"
        transform="translate(-149.865 -0.461)"
        fill="#1a1818"
      />
    ),
  },
  {
    key: "g",
    className: "w-auto h-full z-2",
    xmlns: "http://www.w3.org/2000/svg",
    width: 216.678,
    height: 222.866,
    viewBox: "0 0 30.954 31.838",
    children: (
      <path
        d="M186.585,15.919C186.585,7.119,193.219,0,202.15,0a15.113,15.113,0,0,1,14.682,10.524h-5.086a10.229,10.229,0,0,0-9.507-5.969c-6.368,0-10.878,5.085-10.878,11.364s4.555,11.365,10.789,11.365a9.577,9.577,0,0,0,9.419-6.766h-8.578V16.361h14.548c-1.149,10.878-8.357,15.477-15.389,15.477-8.931,0-15.565-7.119-15.565-15.919"
        transform="translate(-186.585)"
        fill="#1a1818"
      />
    ),
  },
] as const;

const HeroServicesSection = memo(function HeroServicesSection() {
  return (
    <VideoExpand>
      <section className="fp-sec-hero-services relative pt-24 pb-8 lg:pt-44 md:pb-5">
        <div className="inner text-center relative z-10 max-w-[calc(100vw-30px)] sm:max-w-[calc(100vw-80px)] md:max-w-[90vw] mx-auto">
          <div className="fp-heading-wrap relative text-[#1A1A1A]">
            <div className="fp-heading relative">
              <div className="fp-heading-letters-wrap flex justify-center gap-x-1 md:gap-x-4">
                {HEADING_LETTERS.map(({ key, children, ...svgProps }) => (
                  <svg key={key} {...svgProps}>
                    {children}
                  </svg>
                ))}
              </div>
            </div>

            <div className="fp-development-wrap flex items-center justify-end gap-x-5 text-[18px] lg:text-[50px] fp-extra-font font-semibold uppercase text-right pt-1 lg:pt-6">
              Development{" "}
              <svg
                className="top-1 relative"
                width="262"
                height="8"
                viewBox="0 0 262 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M261.354 4.03556C261.549 3.8403 261.549 3.52372 261.354 3.32845L258.172 0.146473C257.976 -0.0487892 257.66 -0.0487892 257.464 0.146473C257.269 0.341735 257.269 0.658318 257.464 0.85358L260.293 3.68201L257.464 6.51043C257.269 6.7057 257.269 7.02228 257.464 7.21754C257.66 7.4128 257.976 7.4128 258.172 7.21754L261.354 4.03556ZM0 3.68201V4.18201H261V3.68201V3.18201H0V3.68201Z"
                  fill="black"
                />
              </svg>{" "}
              Solutions
            </div>
          </div>

          <video
            className="fp-video-block-1 relative -top-21 md:-top-75 mx-auto w-20 md:w-[320px] aspect-video rounded-[4px] md:rounded-[10px] z-3"
            width={320}
            height={180}
            src="/videos/3571264-hd_1920_1080_30fps.mp4"
            loop
            muted
            autoPlay
          />
        </div>
      </section>
    </VideoExpand>
  );
});

export default HeroServicesSection;