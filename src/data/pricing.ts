import type { Tier } from "./features";

/*
 * ============================================================================
 *  PLACEHOLDER PRICING — REPLACE BEFORE LAUNCH
 * ----------------------------------------------------------------------------
 *  Every rupee figure and every limit below is a placeholder. Edit this file
 *  (and nothing else) to change what the pricing page shows.
 *
 *  `monthly` and `yearly` are independent figures — the yearly rate is not
 *  derived from the monthly one. The yearly incentive shown on the page comes
 *  from `yearlyOffer` below, not from the difference between the two.
 *
 *  All prices are quoted EXCLUSIVE of GST and of cloud hosting.
 * ============================================================================
 */

export type BillingCycle = "monthly" | "yearly";

export interface Plan {
  id: Tier;
  name: string;
  tagline: string;
  /** Rupees per month, billed monthly. */
  monthly: number;
  /** Rupees per year, billed annually. */
  yearly: number;
  popular: boolean;
  /** Who this plan is for, shown under the price. */
  bestFor: string;
  /** Short highlights shown on the plan card, above the feature list. */
  highlights: string[];
}

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Run a clean OPD from day one",
    monthly: 4999,
    yearly: 30999,
    popular: false,
    bestFor: "Single-doctor clinics running OPD and billing",
    highlights: [
      "OPD, appointments and UHID registration",
      "Doctor and staff panels with role-based access",
      "Automatic billing on any device",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "Specialty care, queue to theatre",
    monthly: 5999,
    yearly: 40999,
    popular: true,
    bestFor: "Eye hospitals, day-care and surgical centres with an in-house lab",
    highlights: [
      "Everything in Basic",
      "Full eye-hospital and optometry suite",
      "Day care, surgery planning and lab booking",
      "Live token queue on TV, plus report generation",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "The whole hospital, measured",
    monthly: 6999,
    yearly: 49999,
    popular: false,
    bestFor: "Full hospitals with wards, records and management reporting",
    highlights: [
      "Everything in Standard",
      "IPD wards, beds and admissions",
      "MRD records, lab reports and ABDM / ABHA",
      "Staff management and management analytics",
    ],
  },
];

/**
 * Non-feature limits shown as extra rows at the bottom of the comparison
 * matrix. `values` is keyed by plan id.
 */
export interface PlanLimit {
  label: string;
  values: Record<Tier, string>;
}

export const planLimits: PlanLimit[] = [
  {
    label: "Staff accounts",
    values: { basic: "Up to 10", standard: "Up to 40", premium: "Unlimited" },
  },
  {
    label: "Doctors",
    values: { basic: "Up to 3", standard: "Up to 15", premium: "Unlimited" },
  },
  {
    label: "Beds (IPD)",
    values: {
      basic: "Not included",
      standard: "Not included",
      premium: "Unlimited",
    },
  },
  {
    label: "TV queue screens",
    values: { basic: "Not included", standard: "4", premium: "Unlimited" },
  },
  {
    label: "Branches",
    values: { basic: "1", standard: "1", premium: "Multi-branch" },
  },
  {
    label: "Onboarding & staff training",
    values: {
      basic: "Remote",
      standard: "Remote + on-site day",
      premium: "Full on-site rollout",
    },
  },
  {
    label: "Data migration from your current system",
    values: { basic: "Self-service", standard: "Assisted", premium: "Managed" },
  },
  {
    label: "Support",
    values: {
      basic: "Email, next business day",
      standard: "Email & phone, same day",
      premium: "Priority phone, 4-hour response",
    },
  },
];

/** Shown under every price and again as a callout below the plan cards. */
export const cloudCostNote = {
  inline: "+ cloud hosting, billed separately",
  headline: "Cloud hosting is billed separately, at actual cost",
  body: "Plan prices cover the Cura licence, updates and support. The cloud infrastructure your hospital runs on — server, database, storage and daily backups — is billed separately at actual usage, with no markup from us. Typical hospitals spend a few thousand rupees a month; we size it with you before you sign and you can host on your own cloud account if you prefer. All prices are exclusive of GST.",
};

export interface FaqItem {
  question: string;
  answer: string;
}

export const pricingFaqs: FaqItem[] = [
  {
    question: "What exactly is included in the plan price?",
    answer:
      "The Cura software licence for your hospital, all the modules listed in your plan, product updates and support. It does not include cloud hosting or GST — both are billed separately.",
  },
  {
    question: "How much does the cloud hosting cost?",
    answer:
      "It depends on your patient volume and how much document storage you need, so it is billed at actual usage rather than bundled into a fixed number. We size it with you during onboarding and pass the provider's cost through with no markup. If you would rather run it on your own cloud account or an in-house server, you can — the licence price stays the same.",
  },
  {
    question: "Is there a discount for paying yearly?",
    answer:
      "Yes, twice over. The annual rate is already well below twelve monthly payments, and on top of that every yearly booking gets one extra month free.",
  },
  {
    question: "Are the prices inclusive of GST?",
    answer:
      "No. All prices shown are exclusive of GST, which is added on the invoice at the applicable rate.",
  },
  {
    question: "How long does setup take?",
    answer:
      "A typical OPD-only hospital is live in a few days. A full hospital with IPD, lab and existing data to migrate usually takes two to three weeks, including master-data setup, staff accounts, role permissions and your invoice and report layouts.",
  },
  {
    question: "Can you migrate data from our existing system?",
    answer:
      "Yes. Patient records, doctors, services and price lists can be imported from a spreadsheet or a database export. Basic plans get a self-service import template; Standard and Premium include assisted and managed migration respectively.",
  },
  {
    question: "Do you train our staff?",
    answer:
      "Yes, and it is part of every plan. Because each role only sees the screens it needs, reception and nursing staff are usually comfortable within a session or two. Standard adds an on-site training day and Premium a full on-site rollout.",
  },
  {
    question: "Can we change plans later?",
    answer:
      "Yes. You can move up a plan at any time and the new modules switch on for your hospital straight away — your data carries over untouched. Moving down takes effect at the end of the current billing period.",
  },
  {
    question: "Do you support ABHA / ABDM?",
    answer:
      "Yes. ABDM integration for ABHA creation and linking is part of the Premium plan, so patient records can be tied to the national health ID where you need it.",
  },
  {
    question: "What happens to our data if we stop?",
    answer:
      "It is yours. You can export your patient records, billing history and documents at any time, and we will hand over a full export if you decide to leave. There is no lock-in period beyond your current billing term.",
  },
];

/**
 * The incentive for booking annually. Shown as a badge beside the billing
 * toggle and as a line on each plan card when Yearly is selected.
 */
export const yearlyOffer = {
  badge: "1 month free",
  line: "Book yearly and get 1 extra month free",
};

/** Formats rupees as e.g. "₹4,999" — no decimals, Indian digit grouping. */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
