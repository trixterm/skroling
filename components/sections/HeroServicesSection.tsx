import VideoExpand from "@/components/animations/VideoExpand";

export default function HeroServicesSection() {
  return (
    <VideoExpand>
      <section className="fp-sec-hero-services relative pt-44 pb-5">
        <div className="inner text-center relative z-10 max-w-[92vw] mx-auto">

          <div className="fp-heading-wrap relative text-[#1A1A1A]">
            <div className="fp-heading relative fp-extra-font text-[300px] leading-[290px] font-medium uppercase z-3">
              Evoking
            </div>
            <div className="fp-development-wrap text-[50px] fp-extra-font font-semibold uppercase text-right">
              Development arrow Solutions
            </div>
          </div>

        <video
            className="fp-video-block-1 relative -top-72 mx-auto w-[320px] aspect-video rounded-[10px] z-2"
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
}