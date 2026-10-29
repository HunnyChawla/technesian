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
  calendlyUrl: "https://calendly.com/technesian/30min",
  /** Brand as shown to people. */
  name: "Technesian",
  productName: "Cura",
  company: "Technesian",
  legalName: "Technesian Software Solutions LLP",
  email: "contact@technesian.com",
  /** E.164, for tel: links and schema. */
  phone: "+919896853727",
  /** Human-readable, for display. */
  phoneDisplay: "+91 98968 53727",
  /** WhatsApp direct chat details */
  whatsapp: {
    primary: {
      phone: "+919896853727",
      display: "+91 98968 53727",
      url: "https://wa.me/919896853727",
    },
    secondary: {
      phone: "+917404448154",
      display: "+91 74044 48154",
      url: "https://wa.me/917404448154",
    },
  },
  /** Official company social media handles */
  social: {
    linkedin: "https://www.linkedin.com/company/technesian",
    instagram: "https://www.instagram.com/technesianofficial/",
    facebook: "https://www.facebook.com/people/Technesian/61595587583066/",
    youtube: "https://www.youtube.com/@Technesianofficial",
    x: "https://x.com/_technesian",
    google: "https://share.google/xair0hIM84kmOxb28",
  },
  /** Executive leadership / founders */
  founders: [
    {
      name: "Sapna Bhatia",
      role: "Co-Founder & CEO",
      linkedin: "https://www.linkedin.com/in/bhatiasapna/",
      initials: "SB",
      slug: "sapna-bhatia",
      image: "/founders/sapna-bhatia.png",
    },
    {
      name: "Anu Chawla",
      role: "Co-Founder & CTO",
      linkedin: "https://www.linkedin.com/in/chawla-anu/",
      initials: "AC",
      slug: "anu-chawla",
      image: "/founders/anu-chawla.png",
    },
  ],
  locale: "en_IN",
  /** Must stay identical to the Google Business Profile listing. */
  address: {
    streetAddress: "32, Behind Nagpal, New Friends Colony",
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
  sameAs: [
    "https://www.linkedin.com/company/technesian",
    "https://www.instagram.com/technesianofficial/",
    "https://www.facebook.com/people/Technesian/61595587583066/",
    "https://www.youtube.com/@Technesianofficial",
    "https://x.com/_technesian",
    "https://share.google/xair0hIM84kmOxb28",
  ],
} as const;

export const title = "Technesian - Cura Hospital Management System";

/**
 * Kept under ~155 characters: Google truncates past roughly that, and a
 * description that ends mid-sentence in the SERP reads as neglected.
 */
export const description =
  "A complete hospital management system for OPD, IPD, day care, eye hospitals, lab and billing — with a live patient queue on TV and ABDM-ready records.";

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
  alt: "Technesian — hospital management system for Indian hospitals",
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
