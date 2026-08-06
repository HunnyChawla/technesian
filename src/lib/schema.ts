/*
 * schema.org / JSON-LD graph builders.
 *
 * Nodes are given stable `@id` values so they can reference each other
 * instead of repeating themselves — Google treats a consistent `@id` across
 * pages as one entity, which is the whole point of publishing this.
 *
 * Everything factual comes from src/lib/site.ts or src/data/*, so the markup
 * can never disagree with what the page renders. That disagreement is what
 * gets sites penalised.
 */

import { features } from "@/data/features";
import { cloudCostNote, plans, pricingFaqs } from "@/data/pricing";
import { SITE, abs, description, ogImage, title } from "@/lib/site";

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

const postalAddress = {
  "@type": "PostalAddress",
  ...SITE.address,
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.company,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: abs("/icon1.png"),
      width: 512,
      height: 512,
    },
    image: abs(ogImage.url),
    email: SITE.email,
    telephone: SITE.phone,
    address: postalAddress,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      email: SITE.email,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    // Omitted entirely when empty — `sameAs: []` asserts nothing.
    ...(SITE.sameAs.length > 0 ? { sameAs: SITE.sameAs } : {}),
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE.url}/#software`,
    name: SITE.productName,
    alternateName: title,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Hospital Management System",
    operatingSystem: "Web",
    url: SITE.url,
    image: abs(ogImage.url),
    description,
    // Associates every module name with the product entity.
    featureList: features.map((f) => f.title),
    publisher: { "@id": ORG_ID },
    audience: {
      "@type": "Audience",
      audienceType: "Hospitals, eye hospitals and clinics in India",
      geographicArea: { "@type": "Country", name: "India" },
    },
    areaServed: { "@type": "Country", name: "India" },
    offers: aggregateOffer(),
  };
}

/**
 * The pricing page has a monthly/yearly toggle, so a single flat `price`
 * would contradict whichever state is on screen. Each plan therefore carries
 * both cycles as separate UnitPriceSpecifications.
 *
 * Prices are exclusive of GST and of cloud hosting, exactly as the page says.
 */
function aggregateOffer() {
  const monthly = plans.map((p) => p.monthly);
  const yearly = plans.map((p) => p.yearly);

  return {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    lowPrice: Math.min(...monthly),
    highPrice: Math.max(...yearly),
    offerCount: plans.length,
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: `${SITE.productName} ${plan.name}`,
      description: plan.bestFor,
      url: `${SITE.url}/pricing`,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: { "@id": ORG_ID },
      priceSpecification: [
        {
          "@type": "UnitPriceSpecification",
          price: plan.monthly,
          priceCurrency: "INR",
          valueAddedTaxIncluded: false,
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: 1,
            unitCode: "MON",
          },
        },
        {
          "@type": "UnitPriceSpecification",
          price: plan.yearly,
          priceCurrency: "INR",
          valueAddedTaxIncluded: false,
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: 1,
            unitCode: "ANN",
          },
        },
      ],
    })),
  };
}

export function productSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE.url}/pricing#product`,
    name: `${SITE.productName} — Hospital Management System`,
    description: `${description} ${cloudCostNote.headline}.`,
    brand: { "@type": "Brand", name: SITE.company },
    image: abs(ogImage.url),
    offers: aggregateOffer(),
  };
}

/**
 * Only legitimate because PricingFaq renders every panel with
 * `hidden="until-found"` — Google requires the marked-up answer to be
 * present on the page. If that prop is ever removed, remove this too.
 */
export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/pricing#faq`,
    mainEntity: pricingFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.path === "/" ? SITE.url : `${SITE.url}${item.path}`,
      })
    ),
  };
}
