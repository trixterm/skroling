import { buildMetadata } from "@/config/site.config";
export const metadata = buildMetadata({ title: "Contact", description: "Discuss your next website with Mantas — freelance creative developer for design studios.", alternates: { canonical: "/contact" } });
export default function ContactLayout({ children }: { children: React.ReactNode }) { return children; }
