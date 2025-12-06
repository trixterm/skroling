import Image from "next/image";

const HeroWorkSection = () => {
  const totalGridCells = 12 * 6;

  return (
    <section className="hero-work-section w-full h-screen">
      <div className="relative h-full w-full">
        {/* Grid lines overlay for desktop */}
        <div className="pointer-events-none absolute inset-0 hidden lg:grid lg:grid-cols-12 lg:grid-rows-6">
          {Array.from({ length: totalGridCells }, (_, index) => (
            <div key={index} className="border border-gray-200" />
          ))}
        </div>

        {/* Main content grid */}
        <div className="relative z-10 grid h-full w-full grid-cols-1 gap-4 p-4 lg:grid-cols-12 lg:grid-rows-6 lg:gap-0 lg:p-0">
          {/* WORK letters wrapper */}
          <div className="work-letters-wrapper contents">
            {/* W letter area: col 4–5, row 3–4 (grid lines) */}
            <div className="work-letter-w flex h-24 w-full items-center justify-center text-xs font-medium uppercase tracking-wide text-gray-700 lg:h-full lg:col-start-4 lg:row-start-3">
              <svg className="relative -top-[33px] left-[33px]" width="551" height="472" viewBox="0 0 551 472" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M162.233 471.25L-3.17334e-06 10.301H74.6788L166.74 297.428L274.252 0.000475814H275.539L383.695 297.428L475.756 10.301H550.435L388.201 471.25H386.914L274.895 170.603L163.521 471.25H162.233Z" fill="black"/></svg>
            </div>

            {/* O letter area: col 6–7, row 3–4 (grid lines) */}
            <div className="work-letter-o flex flex-col h-24 w-full items-center justify-center text-xs font-medium uppercase tracking-wide text-gray-700 lg:h-full lg:col-start-6 lg:row-start-3">
              <svg className="scale-190 transform-gpu relative -top-[40px]" width="407" height="416" viewBox="0 0 407 416" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M203.174 415.583C86.5799 415.583 5.23315e-07 322.653 5.23315e-07 207.791C5.23315e-07 92.9281 86.5799 -0.000963791 203.174 -0.000963791C319.768 -0.000963791 406.348 92.9281 406.348 207.791C406.348 322.653 319.768 415.583 203.174 415.583ZM203.174 354.399C282.828 354.399 343.434 289.753 343.434 207.791C343.434 125.828 282.828 60.605 203.174 60.605C123.521 60.605 62.3375 125.828 62.3375 207.791C62.3375 289.753 123.521 354.399 203.174 354.399Z" fill="black"/></svg>
              <svg className="scale-190 transform-gpu relative top-[40px]" width="407" height="416" viewBox="0 0 407 416" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M203.174 415.583C86.5799 415.583 5.23315e-07 322.653 5.23315e-07 207.791C5.23315e-07 92.9281 86.5799 -0.000963791 203.174 -0.000963791C319.768 -0.000963791 406.348 92.9281 406.348 207.791C406.348 322.653 319.768 415.583 203.174 415.583ZM203.174 354.399C282.828 354.399 343.434 289.753 343.434 207.791C343.434 125.828 282.828 60.605 203.174 60.605C123.521 60.605 62.3375 125.828 62.3375 207.791C62.3375 289.753 123.521 354.399 203.174 354.399Z" fill="black"/></svg>
            </div>

            {/* R letter area: col 8–9, row 3–4 (grid lines) */}
            <div className="work-letter-r flex h-24 w-full items-center justify-center text-xs font-medium uppercase tracking-wide text-gray-700 lg:h-full lg:col-start-8 lg:row-start-3">
              <svg className="w-[78px] h-[105px] relative -top-[40px] -left-[60px]" width="293" height="402" viewBox="0 0 293 402" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.38014e-05 401.719V0.000582987H156.096C231.275 0.000582987 286.368 49.3545 286.368 126.255C286.368 188.234 250.787 231.275 198.564 245.049L246.196 344.904H292.68V401.719H203.155L136.584 252.509H62.5533V401.719H3.38014e-05ZM148.062 196.269C193.973 196.269 223.814 171.018 223.814 126.255C223.814 82.0659 194.546 56.815 148.062 56.815H62.5533V196.269H148.062Z" fill="black"/></svg>
            </div>

            {/* K letter area: col 9–10, row 3–4 (grid lines) */}
            <div className="work-letter-k flex h-24 w-full items-center justify-center text-xs font-medium uppercase tracking-wide text-gray-700 lg:h-full lg:col-start-9 lg:row-start-3">
              <svg className="w-[87px] h-[104px] relative top-[62px] -left-[40px]" width="326" height="402" viewBox="0 0 326 402" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.38014e-05 401.719V0.000582987H62.5533V185.939L236.44 0.000582987H319.653L129.124 199.712L325.392 401.719H241.605L62.5533 214.059V401.719H3.38014e-05Z" fill="black"/></svg>
            </div>
          </div>

          <div className="fp-grey-box-1 bg-[#f5f5f5] relative"></div>
          <div className="fp-grey-box-2 bg-[#f5f5f5] relative"></div>
          <div className="fp-grey-box-3 bg-[#f5f5f5] relative"></div>
          <div className="fp-grey-box-4 bg-[#f5f5f5] relative"></div>
          <div className="fp-grey-box-5 bg-[#f5f5f5] relative"></div>
          <div className="fp-grey-box-6 bg-[#f5f5f5] relative"></div>
          <div className="fp-grey-box-7 bg-[#f5f5f5] relative"></div>

          {/* Top-left photo placeholder: col 2–3, row 2–3 (grid lines) */}
          <div className="top-left-photo flex h-32 w-full items-center justify-center bg-gray-300 text-[0.65rem] font-medium uppercase tracking-wide text-gray-700 lg:h-full lg:col-start-2 lg:row-start-2">
            <Image src="/images/img-box-1.jpg" alt="Top left photo" width={150} height={150} />
          </div>

          {/* Top-right photo placeholder: col 10–11, row 2–3 (grid lines) */}
          <div className="top-right-photo flex h-32 w-full items-center justify-center bg-gray-300 text-[0.65rem] font-medium uppercase tracking-wide text-gray-700 lg:h-full lg:col-start-10 lg:row-start-2">
            <Image src="/images/img-box-1.jpg" alt="Top left photo" width={150} height={150} />
          </div>

          {/* Bottom-center photo placeholder: col 7–8, row 5–6 (grid lines) */}
          <div className="bottom-center-photo flex h-32 w-full items-center justify-center bg-gray-300 text-[0.65rem] font-medium uppercase tracking-wide text-gray-700 lg:h-full lg:col-start-7 lg:row-start-5">
            <Image src="/images/img-box-1.jpg" alt="Top left photo" width={150} height={150} />
          </div>

          {/* Bottom-left photo placeholder: col 4–5, row 6–7 (grid lines) */}
          <div className="bottom-left-photo flex h-32 w-full items-center justify-center bg-gray-300 text-[0.65rem] font-medium uppercase tracking-wide text-gray-700 lg:h-full lg:col-start-4 lg:row-start-6">
            <Image src="/images/img-box-1.jpg" alt="Top left photo" width={150} height={150} />
          </div>

          {/* Bottom-right photo placeholder: col 11–12, row 5–6 (grid lines) */}
          <div className="bottom-right-photo flex h-32 w-full items-center justify-center bg-gray-300 text-[0.65rem] font-medium uppercase tracking-wide text-gray-700 lg:h-full lg:col-start-11 lg:row-start-5">
            <Image src="/images/img-box-1.jpg" alt="Top left photo" width={150} height={150} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroWorkSection;
