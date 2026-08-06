import type { MetadataRoute } from "next";

import { SITE, description } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cura by Technesian — Hospital Management System",
    short_name: SITE.productName,
    description,
    start_url: "/",
    display: "standalone",
    // Matches --background and --primary in globals.css.
    background_color: "#f6f9fc",
    theme_color: "#0ea5e9",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/icon1.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}

export const dynamic = "force-static";
