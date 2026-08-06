/*
 * Single source of truth for the facts that describe this business.
 *
 * The canonical URL, the sitemap, the JSON-LD entity, the footer and the
 * Google Business Profile listing must all agree byte for byte — Google
 * matches the site to the listing by comparing them. Change a fact here and
 * everywhere downstream follows.
 */

export const SITE = {
  url: "https://technesian.com",
  /** Brand as shown to people. */
  name: "Cura by Technesian",
  productName: "Cura",
  company: "Technesian",
  legalName: "Technesian Software Solutions",
  email: "contact@technesian.com",
  /** E.164, for tel: links and schema. */
  phone: "+919896853727",
  /** Human-readable, for display. */
  phoneDisplay: "+91 98968 53727",
  locale: "en_IN",
  /** Must stay identical to the Google Business Profile listing. */
  address: {
    streetAddress: "39, Prakash Nagar, Tehsil Camp, Near Fatehpuri Chowk",
    addressLocality: "Panipat",
    addressRegion: "Haryana",
    postalCode: "132103",
    addressCountry: "IN",
  },
  /**
   * Public profile URLs that prove this entity is the same one elsewhere.
   * Add the Google Maps profile URL and any social profiles as they exist —
   * an empty array is deliberately omitted from the schema rather than
   * emitted, since `sameAs: []` tells Google nothing.
   */
  sameAs: [] as string[],
} as const;

export const title = "Cura by Technesian - Hospital Management System";

export const description =
  "Cura is a complete hospital management system for OPD, IPD, day care, eye hospitals, lab, billing and analytics - with a live patient queue on TV, doctor and staff panels, and ABDM-ready records.";

/** Absolute URL for a site-relative path. Schema.org requires absolute URLs. */
export const abs = (path: string) => new URL(path, SITE.url).toString();

/**
 * Social share card. A committed .png rather than a generated
 * `opengraph-image.tsx` route: that convention emits an extensionless file,
 * and GitHub Pages would serve it as application/octet-stream, which social
 * crawlers reject. Regenerate via scripts/og-image-source.tsx.
 */
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Cura by Technesian — hospital management system for Indian hospitals",
};

/**
 * Next merges `metadata` shallowly, so a page-level `openGraph` object
 * REPLACES the root one rather than extending it. Every page that sets
 * openGraph must therefore re-declare the shared keys — this helper is how.
 */
export const og = (o: { title: string; description: string; url: string }) => ({
  type: "website" as const,
  siteName: SITE.name,
  locale: SITE.locale,
  images: [ogImage],
  ...o,
});
