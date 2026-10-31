import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const ROUTES = ["/", "/services", "/about", "/contact", "/privacy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({ url: new URL(route, site.url).toString() }));
}
