import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { softwareApplicationSchema } from "@/lib/schema";
import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { CtaBand } from "@/components/sections/CtaBand";
import { EyeHospital } from "@/components/sections/EyeHospital";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Hero } from "@/components/sections/Hero";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { QueueSpotlight } from "@/components/sections/QueueSpotlight";
import { TrustBar } from "@/components/sections/TrustBar";

// Set here rather than in the layout: metadata merges shallowly, so a
// canonical in the root layout would leak "/" onto every page.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema()} />
      <Hero />
      <TrustBar />
      <FeatureGrid />
      <QueueSpotlight />
      <EyeHospital />
      <Benefits />
      <About />
      <PricingTeaser />
      <CtaBand
        eyebrow="Get started"
        title="Ready to upgrade your hospital?"
        description="Book a 30-minute demo and see Cura running on a hospital that looks like yours — OPD, wards, lab, billing and all."
      />
    </>
  );
}
