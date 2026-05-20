import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants";

export function buildMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    metadataBase: new URL(SITE_CONFIG.url),
    openGraph: {
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
    },
    alternates: {
      canonical: "/",
    },
    ...overrides,
  };
}
