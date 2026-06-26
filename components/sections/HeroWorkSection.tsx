"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroFloatingLetters from "@/components/animations/HeroFloatingLettersAnimation";

const GRID_CELLS_MOBILE = Array.from({ length: 28 });
const GRID_CELLS_DESKTOP = Array.from({ length: 72 });

const PATH_W = "M162.233 471.25L-3.17334e-06 10.301H74.6788L166.74 297.428L274.252 0.000475814H275.539L383.695 297.428L475.756 10.301H550.435L388.201 471.25H386.914L274.895 170.603L163.521 471.25H162.233Z";
const PATH_O = "M203.174 415.583C86.5799 415.583 5.23315e-07 322.653 5.23315e-07 207.791C5.23315e-07 92.9281 86.5799 -0.000963791 203.174 -0.000963791C319.768 -0.000963791 406.348 92.9281 406.348 207.791C406.348 322.653 319.768 415.583 203.174 415.583ZM203.174 354.399C282.828 354.399 343.434 289.753 343.434 207.791C343.434 125.828 282.828 60.605 203.174 60.605C123.521 60.605 62.3375 125.828 62.3375 207.791C62.3375 289.753 123.521 354.399 203.174 354.399Z";
const PATH_R = "M3.38014e-05 401.719V0.000582987H156.096C231.275 0.000582987 286.368 49.3545 286.368 126.255C286.368 188.234 250.787 231.275 198.564 245.049L246.196 344.904H292.68V401.719H203.155L136.584 252.509H62.5533V401.719H3.38014e-05ZM148.062 196.269C193.973 196.269 223.814 171.018 223.814 126.255C223.814 82.0659 194.546 56.815 148.062 56.815H62.5533V196.269H148.062Z";
const PATH_K = "M3.38014e-05 401.719V0.000582987H62.5533V185.939L236.44 0.000582987H319.653L129.124 199.712L325.392 401.719H241.605L62.5533 214.059V401.719H3.38014e-05Z";

const GridLayer = memo(() => (
  <>
    <div className="pointer-events-none absolute inset-0 grid grid-cols-4 grid-rows-7 lg:hidden">
      {GRID_CELLS_MOBILE.map((_, i) => <div key={i} className="border border-gray-200" />)}
    </div>
    <div className="pointer-events-none absolute inset-0 hidden lg:grid lg:grid-cols-12 lg:grid-rows-6">
      {GRID_CELLS_DESKTOP.map((_, i) => <div key={i} className="border border-gray-200" />)}
    </div>
  </>
));
GridLayer.displayName = "GridLayer";

const PhotoBox = memo(({ href, alt, className, priority = false }) => (
  <div className={`relative photo-box flex items-center justify-center bg-[#d8d8d8] text-[0.65rem] font-medium uppercase tracking-wide text-gray-700 ${className}`}>
    <Link className="link-photo-box block w-full h-full bg-[#d8d8d8]" href={href}>
      <Image
        className="photo-box object-cover"
        src="/images/img-box-1.jpg"
        alt={alt}
        fill
        sizes="(max-width: 1024px) 50vw, 16vw"
        priority={priority}
      />
    </Link>
  </div>
));
PhotoBox.displayName = "PhotoBox";

const Letters = memo(() => (
  <div className="work-letters-wrapper contents">
    <div className="work-letter-w flex h-24 w-full items-center justify-center text-xs font-medium uppercase tracking-wide text-gray-700 lg:h-full col-start-1 row-start-2 lg:col-start-4 lg:row-start-3">
      <svg className="fp-letter relative top-10 left-[50px] md:-top-[33px] md:left-[33px] max-md:w-[147px] max-md:h-[123px]" width="551" height="472" viewBox="0 0 551 472" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={PATH_W} fill="black" />
      </svg>
    </div>
    <div className="work-letter-o flex flex-col h-24 w-full items-center justify-center text-xs font-medium uppercase tracking-wide text-gray-700 col-start-3 row-start-3 lg:h-full lg:col-start-6 lg:row-start-3">
      <svg className="fp-letter fp-letter-o-1 lg:scale-190 transform-gpu relative top-10 md:-top-10 max-md:left-[50px]" width="407" height="416" viewBox="0 0 407 416" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={PATH_O} fill="black" />
      </svg>
      <svg className="fp-letter fp-letter-o-2 scale-190 transform-gpu relative top-10 max-md:hidden" width="407" height="416" viewBox="0 0 407 416" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={PATH_O} fill="black" />
      </svg>
    </div>
    <div className="work-letter-r flex h-24 w-full items-center justify-center text-xs font-medium uppercase tracking-wide text-gray-700 col-start-1 row-start-4 lg:h-full lg:col-start-8 lg:row-start-3">
      <svg className="fp-letter w-[78px] h-[105px] relative top-10 left-[53px] md:-top-10 md:-left-[60px]" width="293" height="402" viewBox="0 0 293 402" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={PATH_R} fill="black" />
      </svg>
    </div>
    <div className="work-letter-k flex h-24 w-full items-center justify-center text-xs font-medium uppercase tracking-wide text-gray-700 col-start-3 row-start-5 lg:h-full lg:col-start-9 lg:row-start-3">
      <svg className="fp-letter w-[87px] h-[104px] relative top-[50px] left-[60px] md:top-[62px] md:-left-10" width="326" height="402" viewBox="0 0 326 402" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={PATH_K} fill="black" />
      </svg>
    </div>
  </div>
));
Letters.displayName = "Letters";

const GreyBoxes = memo(() => (
  <>
    <div className="fp-grey-box-1 bg-[#f5f5f5] relative" />
    <div className="fp-grey-box-2 bg-[#f5f5f5] relative" />
    <div className="fp-grey-box-3 bg-[#f5f5f5] relative" />
    <div className="fp-grey-box-4 bg-[#f5f5f5] relative" />
    <div className="fp-grey-box-5 bg-[#f5f5f5] relative max-md:hidden" />
    <div className="fp-grey-box-6 bg-[#f5f5f5] relative max-md:hidden" />
    <div className="fp-grey-box-7 bg-[#f5f5f5] relative max-md:hidden" />
  </>
));
GreyBoxes.displayName = "GreyBoxes";

const HeroWorkSection = () => {
  return (
    <>
      <section className="hero-work-section fixed top-0 w-full h-screen">
        <div className="relative h-full w-full">
          <GridLayer />
          <div className="relative z-10 grid h-full w-full grid-cols-4 grid-rows-7 md:p-4 lg:grid-cols-12 lg:grid-rows-6 lg:gap-0 lg:p-0">
            <Letters />
            <GreyBoxes />
            <PhotoBox
              href="/work/lukdeira"
              alt="Top left photo"
              className="top-left-photo lg:h-full col-start-3 row-start-2 lg:col-start-2 lg:row-start-2"
              priority
            />
            <PhotoBox
              href="/work/website-2"
              alt="Top right photo"
              className="top-right-photo col-start-1 row-start-6 lg:h-full lg:col-start-10 lg:row-start-2"
            />
            <PhotoBox
              href="/work/website-3"
              alt="Bottom center photo"
              className="bottom-center-photo col-start-3 row-start-2 lg:h-full lg:col-start-7 lg:row-start-5"
            />
            <PhotoBox
              href="/work/website-4"
              alt="Bottom left photo"
              className="bottom-left-photo h-28 w-full lg:h-full col-start-1 row-start-6 lg:col-start-4 max-md:hidden"
            />
            <PhotoBox
              href="/work/website-5"
              alt="Bottom right photo"
              className="bottom-right-photo h-28 w-full lg:h-full col-start-3 row-start-7 lg:col-start-11 lg:row-start-5 max-md:hidden"
            />
          </div>
        </div>
      </section>
      <HeroFloatingLetters maxTranslate={20} ease={0.20} fpsCap={60} />
    </>
  );
};

export default memo(HeroWorkSection);