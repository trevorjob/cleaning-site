import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetaInput = {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly absoluteTitle?: boolean;
};

export function pageMetadata({ title, description, path, absoluteTitle = false }: PageMetaInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: site.name, locale: "en_GB", type: "website" },
  };
}
