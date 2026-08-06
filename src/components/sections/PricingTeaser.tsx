import Link from "next/link";
import { ArrowRight, Check, Cloud } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/layout/Section";
import { cloudCostNote, formatINR, plans } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function PricingTeaser() {
  return (
    <Section id="pricing" spacing="lg" className="bg-card">
      <SectionHeading
        eyebrow="Pricing"
        title="Three plans. No per-user surprises."
        description="One licence per hospital. Start where you are today and switch on the rest when you need it."
        className="mb-14"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "flex flex-col rounded-2xl border p-6",
              plan.popular
                ? "border-primary/40 bg-primary/5 ring-1 ring-primary/20"
                : "border-border bg-background"
            )}
          >
            <div className="mb-3 flex items-center gap-2">
              <h3 className="font-heading text-xl font-bold text-ink">
                {plan.name}
              </h3>
              {plan.popular ? (
                <Badge variant="soft" size="sm">
                  Most popular
                </Badge>
              ) : null}
            </div>

            <p className="flex items-end gap-1">
              <span className="font-heading text-3xl font-extrabold text-ink tabular-nums">
                {formatINR(plan.monthly)}
              </span>
              <span className="pb-0.5 text-sm text-muted-foreground">
                /month
              </span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {cloudCostNote.inline}
              {" · excl. GST"}
            </p>

            <ul className="mt-5 flex-1 space-y-2.5 text-sm">
              {plan.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-accent-strong"
                    strokeWidth={3}
                  />
                  <span className="text-ink-soft">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Cloud className="size-4 shrink-0 text-primary" />
          Cloud hosting is billed separately, at actual cost with no markup.
        </p>
        <Link href="/pricing">
          <Button className="h-14 rounded-full bg-primary px-8 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-strong">
            Compare all plans and features
            <ArrowRight className="ml-1 size-5" />
          </Button>
        </Link>
      </div>
    </Section>
  );
}
