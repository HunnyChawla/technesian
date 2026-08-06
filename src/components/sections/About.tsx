import Image from "next/image";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/layout/Section";

const points = [
  "Built with practising hospital staff, not from a requirements document",
  "Multi-tenant and multi-branch from the ground up",
  "Encrypted licensing, tenant-isolated data, audited access",
  "Continuous updates and support from the team that wrote it",
];

export function About() {
  return (
    <Section id="about" spacing="lg" className="overflow-hidden bg-card">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <div
            aria-hidden
            className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-primary/12 to-accent/12 blur-2xl"
          />
          <div className="relative flex aspect-4/3 items-center justify-center rounded-3xl border border-border bg-background p-10 shadow-[var(--shadow-lift)]">
            <Image
              src="/login-logo.png"
              alt="Cura by Technesian"
              width={340}
              height={240}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div>
          <Badge variant="soft" className="mb-5">
            About us
          </Badge>
          <h2 className="text-3xl font-bold text-balance text-ink md:text-[2.75rem] md:leading-[1.1]">
            Built by Technesian
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            We build software that holds up under real load. Cura came out of
            sitting in hospital corridors watching where the day actually breaks
            &mdash; the queue, the handover, the unbilled procedure &mdash; and
            fixing those first. It does not just digitise records; it changes
            how the hospital runs.
          </p>

          <ul className="mt-8 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-strong">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span className="font-medium text-ink-soft">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
