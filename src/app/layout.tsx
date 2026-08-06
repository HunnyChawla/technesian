import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, webSiteSchema } from "@/lib/schema";
import { SITE, description, og, ogImage, title } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: "%s | Cura by Technesian",
  },
  description,
  keywords: [
    "hospital management system",
    "HMS software India",
    "eye hospital software",
    "OPD IPD software",
    "patient queue token display",
    "lab management software",
    "hospital billing software",
    "ABDM ABHA integration",
  ],
  // Note: metadata merges shallowly, so a page that sets `openGraph` replaces
  // this whole object rather than extending it. Pages use the og() helper.
  openGraph: og({ title, description, url: SITE.url }),
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Permits a large thumbnail and a full-length snippet in results.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// themeColor is not a `metadata` field in Next 16 — it lives here.
export const viewport: Viewport = {
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${jakarta.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
      </body>
    </html>
  );
}
