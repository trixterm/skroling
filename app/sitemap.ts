import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { works } from "@/data/works";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services", "/work", "/about", "/contact", ...works.map(work => `/work/${work.slug}`)];
  return paths.map(path => ({ url: new URL(path, siteConfig.links.website).href }));
}
