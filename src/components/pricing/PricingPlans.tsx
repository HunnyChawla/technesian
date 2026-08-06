"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Cloud, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { Switch } from "@/components/ui/switch";
import {
  cloudCostNote,
  formatINR,
  planLimits,
  plans,
  yearlyOffer,
  type BillingCycle,
} from "@/data/pricing";
import { cn } from "@/lib/utils";

export function PricingPlans() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const yearly = cycle === "yearly";

  return (
    <div>
      {/* Billing cycle toggle */}
      <div className="mb-12 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4 rounded-full border border-border bg-card px-5 py-3 shadow-[var(--shadow-soft)]">
          <span
            className={cn(
              "text-sm font-semibold transition-colors",
              yearly ? "text-muted-foreground" : "text-foreground"
            )}
          >
            Monthly
          </span>
          <Switch
            checked={yearly}
            onCheckedChange={(checked) =>
              setCycle(checked ? "yearly" : "monthly")
            }
            aria-label="Bill yearly"
          />
          <span
            className={cn(
              "text-sm font-semibold transition-colors",
              yearly ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Yearly
          </span>
          <Badge variant="accent" size="sm" className="hidden sm:inline-flex">
            <Sparkles />
            {yearlyOffer.badge}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground sm:hidden">
          {yearlyOffer.line}
        </p>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-5">
        {plans.map((plan, index) => {
          const price = yearly ? plan.yearly : plan.monthly;
          const perMonth = yearly ? Math.round(plan.yearly / 12) : plan.monthly;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={cn(
                "relative flex h-full flex-col rounded-3xl border bg-card p-7 transition-shadow",
                plan.popular
                  ? "border-primary/40 shadow-[var(--shadow-pop)] ring-1 ring-primary/25 lg:-mt-4 lg:pt-11 lg:pb-11"
                  : "border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]"
              )}
            >
              {plan.popular ? (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-md shadow-primary/30">
                  Most popular
                </Badge>
              ) : null}

              <div className="mb-6">
                <h3 className="font-heading text-2xl font-bold text-ink">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.tagline}
                </p>
              </div>

              <div className="mb-1 flex items-end gap-1.5">
                <span className="font-heading text-[2.75rem] leading-none font-extrabold tracking-tight text-ink tabular-nums">
                  {formatINR(price)}
                </span>
                <span className="pb-1 text-sm font-medium text-muted-foreground">
                  /{yearly ? "year" : "month"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {yearly
                  ? `${formatINR(perMonth)} a month, and 1 month free`
                  : "Billed monthly, cancel anytime"}
              </p>
              {/* Cloud-cost disclosure, placement 1 of 3 */}
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-primary-strong">
                <Cloud className="size-3.5 shrink-0" />
                {cloudCostNote.inline}
                {" · excl. GST"}
              </p>

              <p className="mt-5 rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                {plan.bestFor}
              </p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent-strong">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-ink-soft">{highlight}</span>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
                {planLimits.slice(0, 4).map((limit) => (
                  <div key={limit.label} className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{limit.label}</dt>
                    <dd className="text-right font-medium text-ink">
                      {limit.values[plan.id]}
                    </dd>
                  </div>
                ))}
              </dl>

              <BookDemoModal>
                <Button
                  className={cn(
                    "mt-7 h-12 w-full rounded-full text-base font-medium transition-all hover:-translate-y-0.5",
                    plan.popular
                      ? "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-strong"
                      : "border border-primary/25 bg-primary/8 text-primary-strong hover:bg-primary/15"
                  )}
                >
                  Book a demo
                </Button>
              </BookDemoModal>
            </motion.div>
          );
        })}
      </div>

      {/* Cloud-cost disclosure, placement 2 of 3 */}
      <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-primary/20 bg-primary/6 p-7 sm:flex-row sm:items-start sm:gap-6">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary-strong">
          <Cloud className="size-6" />
        </span>
        <div>
          <h3 className="font-heading text-lg font-bold text-ink">
            {cloudCostNote.headline}
          </h3>
          <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
            {cloudCostNote.body}
          </p>
        </div>
      </div>
    </div>
  );
}
