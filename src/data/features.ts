import {
  Activity,
  BedDouble,
  BarChart3,
  CalendarCheck,
  ClipboardList,
  Eye,
  FileBarChart,
  FlaskConical,
  FolderArchive,
  IdCard,
  Monitor,
  ReceiptIndianRupee,
  Scissors,
  Smartphone,
  Stethoscope,
  TestTube2,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type Tier = "basic" | "standard" | "premium";

export type FeatureCategory =
  | "Patient Flow"
  | "Clinical"
  | "Diagnostics"
  | "Business";

export interface Feature {
  id: string;
  /** Name as shown in the feature grid and the pricing matrix. */
  title: string;
  /** One-line summary for the pricing matrix and plan cards. */
  short: string;
  /** Fuller description for the homepage feature card. */
  long: string;
  icon: LucideIcon;
  category: FeatureCategory;
  /** Lowest plan that includes this feature. Edit here to change gating. */
  tier: Tier;
}

/** Plan order, lowest to highest. Used for tier comparisons. */
export const TIER_ORDER: Tier[] = ["basic", "standard", "premium"];

export function tierIncludes(plan: Tier, featureTier: Tier): boolean {
  return TIER_ORDER.indexOf(plan) >= TIER_ORDER.indexOf(featureTier);
}

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  "Patient Flow",
  "Clinical",
  "Diagnostics",
  "Business",
];

/**
 * The 16 headline features. This array drives BOTH the homepage feature grid
 * and the pricing comparison matrix — change a `tier` here and both update.
 */
export const features: Feature[] = [
  // ---------------------------------------------------------------- Patient Flow
  {
    id: "opd",
    title: "OPD & Appointments",
    short: "Registration, UHID, visits and appointment booking",
    long: "Register patients once with an auto-generated UHID, then book and track every OPD visit. Doctor-wise appointment slots, quick-entry presets and a full visit history on one screen.",
    icon: CalendarCheck,
    category: "Patient Flow",
    tier: "basic",
  },
  {
    id: "queue",
    title: "Live Patient Queue on TV",
    short: "Real-time token display for waiting areas",
    long: "A live token board that updates the moment reception or a doctor moves the queue. Cast it to any TV in the waiting area with a simple QR-based screen login — no PC required per screen.",
    icon: Monitor,
    category: "Patient Flow",
    tier: "standard",
  },
  {
    id: "doctor-panel",
    title: "Doctor Panel",
    short: "A consultation-first workspace for doctors",
    long: "Doctors see their own queue, open a patient, review history and vitals, and write prescriptions and clinical notes without hunting through menus.",
    icon: Stethoscope,
    category: "Patient Flow",
    tier: "basic",
  },
  {
    id: "staff-panel",
    title: "Staff Panel",
    short: "Role-based screens for reception and nursing",
    long: "Every role — reception, nursing, lab, counsellor — gets a workspace showing only the screens they need, so training is short and mistakes are rare.",
    icon: UsersRound,
    category: "Patient Flow",
    tier: "basic",
  },
  {
    id: "ipd",
    title: "IPD — Wards, Beds & Admissions",
    short: "Admissions, bed allocation and occupancy charges",
    long: "Manage wards and beds with live occupancy, admit and discharge patients, and let bed and service charges accrue automatically against the admission.",
    icon: BedDouble,
    category: "Patient Flow",
    tier: "premium",
  },
  {
    id: "day-care",
    title: "Day Care",
    short: "Same-day procedure workflow, assessment to discharge",
    long: "A guided day-care pathway: visit, clinical assessment, preparation, OT record, recovery and discharge summary — each stage recorded, nothing skipped.",
    icon: Activity,
    category: "Patient Flow",
    tier: "standard",
  },

  // -------------------------------------------------------------------- Clinical
  {
    id: "mrd",
    title: "MRD Document Management",
    short: "Central, versioned medical records per patient",
    long: "Upload, version and retrieve medical records against the patient file. Consent forms, scanned reports and referral letters stay in one place instead of a filing cabinet.",
    icon: FolderArchive,
    category: "Clinical",
    tier: "premium",
  },
  {
    id: "eye-hospital",
    title: "Eye Hospital Support",
    short: "Refraction, IOP, AR data and spectacle prescriptions",
    long: "Purpose-built ophthalmology: refraction and vision charting, IOP, auto-refractometer readings, current specs, ophthalmic history and spectacle prescriptions — plus a dedicated optometrist panel and an eye-hospital queue that routes patients across doctor groups.",
    icon: Eye,
    category: "Clinical",
    tier: "standard",
  },
  {
    id: "surgery-planning",
    title: "Surgery Planning",
    short: "Schedule procedures, OT consumables and surgery billing",
    long: "Plan surgeries against a surgery master, track status through every stage, record OT consumables, and bill the procedure without re-entering a thing.",
    icon: Scissors,
    category: "Clinical",
    tier: "standard",
  },

  {
    id: "abdm",
    title: "ABDM / ABHA Integration",
    short: "Create and link ABHA numbers to patient records",
    long: "Create and link ABHA numbers straight from registration, so patient records tie into India's national digital health ecosystem instead of sitting in a silo.",
    icon: IdCard,
    category: "Clinical",
    tier: "premium",
  },

  // ----------------------------------------------------------------- Diagnostics
  {
    id: "lab-booking",
    title: "Lab Booking",
    short: "Order tests from the consultation with live pricing",
    long: "Book tests straight from a consultation against your own test catalogue and price list. Charges flow to the patient bill automatically.",
    icon: FlaskConical,
    category: "Diagnostics",
    tier: "standard",
  },
  {
    id: "lab-reports",
    title: "Lab Report Generation",
    short: "Technician result entry and printable lab reports",
    long: "Lab technicians enter results against the booked test, and a formatted, hospital-branded report is ready to print or hand over — attached to the patient record for good.",
    icon: TestTube2,
    category: "Diagnostics",
    tier: "premium",
  },

  // -------------------------------------------------------------------- Business
  {
    id: "billing",
    title: "Automatic Billing",
    short: "Charges accrue automatically, with part payments",
    long: "Consultations, services, beds, lab tests and procedures post to the bill as they happen. Handle part payments and refunds, and print on your own invoice template.",
    icon: ReceiptIndianRupee,
    category: "Business",
    tier: "basic",
  },
  {
    id: "reports",
    title: "Reports Generation",
    short: "Operational reports with print and PDF export",
    long: "Day-end collection, visit, admission and service reports — filter what you need and export to PDF or print on your own letterhead layout.",
    icon: FileBarChart,
    category: "Business",
    tier: "standard",
  },
  {
    id: "mobile",
    title: "Mobile Responsive",
    short: "Works on phone and tablet browsers, no install",
    long: "Every screen adapts to phone and tablet, so doctors can check a queue or a report on the move. It runs in the browser — nothing to install or update.",
    icon: Smartphone,
    category: "Business",
    tier: "basic",
  },
  {
    id: "staff-management",
    title: "Staff Management",
    short: "User accounts with screen-level permissions",
    long: "Create staff accounts, assign roles, and control access screen by screen — with per-user overrides when someone needs an exception.",
    icon: ClipboardList,
    category: "Business",
    tier: "premium",
  },
  {
    id: "analytics",
    title: "Analytics",
    short: "Patient flow, occupancy, revenue and doctor utilisation",
    long: "Management dashboards covering patient flow, bed occupancy, doctor utilisation, revenue, appointment summaries and diagnostic usage — so decisions rest on numbers, not hunches.",
    icon: BarChart3,
    category: "Business",
    tier: "premium",
  },
];

export function featuresForTier(tier: Tier): Feature[] {
  return features.filter((feature) => tierIncludes(tier, feature.tier));
}

export function featuresByCategory(category: FeatureCategory): Feature[] {
  return features.filter((feature) => feature.category === category);
}
