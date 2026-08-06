import {
  Clock,
  IndianRupee,
  LifeBuoy,
  ShieldCheck,
  TrendingUp,
  Workflow,
} from "lucide-react";

import { Section, SectionHeading } from "@/components/layout/Section";

const benefits = [
  {
    icon: Clock,
    title: "Shorter queues, calmer counters",
    body: "Registration, token and billing are three clicks apart, not three registers apart. Reception stops being the bottleneck.",
  },
  {
    icon: IndianRupee,
    title: "Revenue that stops leaking",
    body: "Charges post as they happen — a consultation, a bed night, a lab test, a procedure. Nothing gets discharged unbilled.",
  },
  {
    icon: Workflow,
    title: "One patient record, every department",
    body: "OPD, ward, lab and OT write to the same file. No re-registering the same patient at every counter.",
  },
  {
    icon: ShieldCheck,
    title: "Each role sees only its own screens",
    body: "Screen-level permissions per role, with per-user exceptions. Training is short and mistakes are rare.",
  },
  {
    icon: TrendingUp,
    title: "Decisions backed by numbers",
    body: "Occupancy, doctor utilisation, revenue and diagnostic usage — measured daily rather than guessed at monthly.",
  },
  {
    icon: LifeBuoy,
    title: "Onboarding that does not stall",
    body: "We import your masters, set up your invoice and report layouts, train your staff, and stay on the phone after go-live.",
  },
];

export function Benefits() {
  return (
    <Section id="benefits" spacing="lg">
      <SectionHeading
        eyebrow="Why hospitals switch"
        title="What actually changes on the floor"
        description="Software is only worth it if the day runs differently. Here is what a hospital notices in the first month."
        className="mb-14"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="glass flex flex-col rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
          >
            <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-accent/12 text-accent-strong">
              <Icon className="size-6" />
            </span>
            <h3 className="font-heading text-lg font-bold text-ink">{title}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
              {body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
