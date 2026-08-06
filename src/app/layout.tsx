import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const title = "Cura by Technesian - Hospital Management System";
const description =
  "Cura is a complete hospital management system for OPD, IPD, day care, eye hospitals, lab, billing and analytics - with a live patient queue on TV, doctor and staff panels, and ABDM-ready records.";

export const metadata: Metadata = {
  metadataBase: new URL("https://technesian.com"),
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
  openGraph: {
    type: "website",
    siteName: "Cura by Technesian",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} font-sans h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col overflow-x-hidden"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
