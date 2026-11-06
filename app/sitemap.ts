import type { MetadataRoute } from "next";

import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

/** The home page, the project index and every published case study. */
export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = projects.flatMap((p) => (p.caseStudy?.ready ? [p.caseStudy.href] : []));
  return ["/", "/work", ...caseStudies].map((path) => ({
    url: new URL(path, site.url).toString(),
  }));
}
