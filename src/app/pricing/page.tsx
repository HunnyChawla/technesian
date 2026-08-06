import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqPageSchema,
  productSchema,
} from "@/lib/schema";
import { SITE, og, ogImage } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeading } from "@/components/layout/Section";
import { FeatureMatrix } from "@/components/pricing/FeatureMatrix";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { CtaBand } from "@/components/sections/CtaBand";

const ogTitle = "Cura pricing — plans for clinics, hospitals and eye hospitals";
const ogDescription =
  "Three plans covering OPD to analytics. Monthly or yearly, no lock-in, cloud hosting billed at actual cost.";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Cura hospital management pricing — Basic, Standard and Premium plans covering OPD, IPD, day care, eye hospital, lab, billing and analytics. Transparent monthly and yearly rates, cloud hosting billed separately.",
  alternates: { canonical: "/pricing" },
  // og() re-declares type/siteName/locale: a page-level openGraph object
  // REPLACES the root one, it does not extend it.
  openGraph: og({
    title: ogTitle,
    description: ogDescription,
    url: `${SITE.url}/pricing`,
  }),
  // Same reason — without this, the card inherits the homepage's title.
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [ogImage.url],
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          productSchema(),
          faqPageSchema(),
          breadcrumbSchema([{ name: "Pricing", path: "/pricing" }]),
        ]}
      />
      {/* Hero + plans */}
      <section className="mesh relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-20">
        <div aria-hidden className="grid-lines absolute inset-0" />
        <div className="shell relative z-10">
          <div className="mb-14 flex flex-col items-center gap-5 text-center">
            <Badge variant="soft">
              <ShieldCheck />
              No lock-in &middot; Your data stays yours
            </Badge>
            <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-balance text-ink md:text-6xl md:leading-[1.05]">
              Pricing that scales with{" "}
              <span className="text-gradient">your hospital</span>
            </h1>
            <p className="max-w-2xl text-lg text-pretty text-muted-foreground md:text-xl">
              Start with a clean OPD, add wards and lab when you need them, and
              switch on the specialty modules the day you outgrow the rest. One
              licence per hospital &mdash; not per user, not per patient.
            </p>
          </div>

          <PricingPlans />
        </div>
      </section>

      {/* Full comparison */}
      <Section id="compare" className="mesh-soft" spacing="lg">
        <SectionHeading
          eyebrow="Compare plans"
          title="Every feature, plan by plan"
          description="Every module, laid out side by side, so you can see exactly where each plan stops."
          className="mb-14"
        />
        <FeatureMatrix />
      </Section>

      {/* FAQ */}
      <Section id="faq" spacing="lg">
        <SectionHeading
          eyebrow="Questions"
          title="Before you ask us"
          description="The things hospitals want settled before they sign."
          className="mb-14"
        />
        <PricingFaq />
      </Section>

      <CtaBand
        eyebrow="Next step"
        title="See it running on your hospital's data"
        description="Book a 30-minute demo and we will walk your team through the exact plan that fits — no slide deck, just the product."
      />
    </>
  );
}
