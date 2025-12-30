import CopyrightSection from "@/components/sections/CopyrightSection";

export default function FooterSection2() {
  return (
    <footer className="site-footer relative z-2 bg-[#1A1A1A] text-white rounded-t-[44px] md:rounded-t-[48px] pt-8 pb-8">
      <CopyrightSection variant="contact" />
    </footer>
  );
}
