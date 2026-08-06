import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

/*
 * No trailing slashes: `next build` emits `out/pricing.html` and GitHub Pages
 * resolves `/pricing`. The sitemap URL, the canonical tag and the internal
 * <Link href> must all be the same string, or Google sees duplicates.
 *
 * Add each new route here as it ships.
 */
/*
 * `lastModified` is a literal date per route, bumped by hand when the page's
 * content actually changes. Deriving it from `new Date()` would stamp every
 * URL with the build time, so `lastmod` would change on every deploy and tell
 * crawlers nothing — and it also makes the route dynamic, which a static
 * export rejects.
 */
const routes: Array<{
  path: string;
  lastModified: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", lastModified: "2026-08-06", changeFrequency: "weekly", priority: 1 },
  {
    path: "/pricing",
    lastModified: "2026-08-06",
    changeFrequency: "monthly",
    priority: 0.9,
  },
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, lastModified, changeFrequency, priority }) => ({
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
