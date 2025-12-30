import React from "react";
import { SERVICES_CONTENT } from "@/content/portfolio.content";

// minimalus entity decode (kad &amp; virstų į &)
const decodeBasicEntities = (s: string) =>
  s
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");

const renderWithDesktopBr = (text: string) => {
  const parts = text.split(/<br\s*\/?>/gi);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {decodeBasicEntities(part)}
      {i !== parts.length - 1 && <br className="hidden md:block" />}
    </React.Fragment>
  ));
};

export default function ServicesGrid() {
  return (
    <div className="container">
      <div className="fp-grid-services grid grid-cols-1 md:grid-cols-3">
        {SERVICES_CONTENT.map((service) => (
          <article key={service.id} className="flex h-full flex-col">
            <div className="flex flex-1 flex-col pt-[43px] pl-[30px] pb-10">
              <div className="text-[26px] fp-extra-font font-medium tracking-wide dark:text-white">
                {service.id}
              </div>

              <div className="mt-20 md:mt-36 space-y-4">
                <h3 className="text-[28px] fp-extra-font font-medium leading-9 dark:text-white">
                  {renderWithDesktopBr(service.title)}
                </h3>

                <p className="text-[16px] font-medium leading-[22px] dark:text-white">
                  {renderWithDesktopBr(service.description)}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}