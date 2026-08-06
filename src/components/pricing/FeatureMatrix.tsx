import { Check, Minus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  FEATURE_CATEGORIES,
  features,
  tierIncludes,
  type Feature,
} from "@/data/features";
import { planLimits, plans } from "@/data/pricing";
import { cn } from "@/lib/utils";

function Included({ label }: { label: string }) {
  return (
    <span
      className="inline-flex size-6 items-center justify-center rounded-full bg-accent/12 text-accent-strong"
      role="img"
      aria-label={`Included in ${label}`}
    >
      <Check className="size-3.5" strokeWidth={3} />
    </span>
  );
}

function Excluded({ label }: { label: string }) {
  return (
    <span
      className="inline-flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground/50"
      role="img"
      aria-label={`Not included in ${label}`}
    >
      <Minus className="size-3.5" />
    </span>
  );
}

/**
 * Desktop renders a real table; on phones a 4-column table is unreadable, so
 * the same data is re-rendered as one card per plan.
 */
export function FeatureMatrix() {
  return (
    <div>
      {/* Desktop / tablet table */}
      <div className="hidden overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-muted/60">
              <th
                scope="col"
                className="w-[40%] px-6 py-5 font-heading text-sm font-semibold tracking-wide text-muted-foreground uppercase"
              >
                What you get
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={cn(
                    "px-4 py-5 text-center font-heading text-base font-bold text-ink",
                    plan.popular && "bg-primary/6"
                  )}
                >
                  {plan.name}
                  {plan.popular ? (
                    <Badge
                      variant="soft"
                      size="sm"
                      className="mt-1.5 block w-fit mx-auto"
                    >
                      Most popular
                    </Badge>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>

          {FEATURE_CATEGORIES.map((category) => {
            const rows = features.filter(
              (feature) => feature.category === category
            );
            if (rows.length === 0) return null;

            return (
              <tbody key={category}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={plans.length + 1}
                    className="border-y border-border bg-background px-6 py-3 text-left font-heading text-xs font-bold tracking-[0.14em] text-primary-strong uppercase"
                  >
                    {category}
                  </th>
                </tr>
                {rows.map((feature) => (
                  <tr
                    key={feature.id}
                    className="border-b border-border/60 last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 text-left font-normal align-top"
                    >
                      <span className="block font-medium text-ink">
                        {feature.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        {feature.short}
                      </span>
                    </th>
                    {plans.map((plan) => (
                      <td
                        key={plan.id}
                        className={cn(
                          "px-4 py-4 text-center align-top",
                          plan.popular && "bg-primary/6"
                        )}
                      >
                        {tierIncludes(plan.id, feature.tier) ? (
                          <Included label={plan.name} />
                        ) : (
                          <Excluded label={plan.name} />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            );
          })}

          <tbody>
            <tr>
              <th
                scope="colgroup"
                colSpan={plans.length + 1}
                className="border-y border-border bg-background px-6 py-3 text-left font-heading text-xs font-bold tracking-[0.14em] text-primary-strong uppercase"
              >
                Limits &amp; support
              </th>
            </tr>
            {planLimits.map((limit) => (
              <tr
                key={limit.label}
                className="border-b border-border/60 last:border-b-0"
              >
                <th
                  scope="row"
                  className="px-6 py-4 text-left font-medium text-ink"
                >
                  {limit.label}
                </th>
                {plans.map((plan) => (
                  <td
                    key={plan.id}
                    className={cn(
                      "px-4 py-4 text-center text-sm text-ink-soft",
                      plan.popular && "bg-primary/6"
                    )}
                  >
                    {limit.values[plan.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: one card per plan */}
      <div className="flex flex-col gap-5 md:hidden">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "rounded-2xl border bg-card p-5 shadow-[var(--shadow-soft)]",
              plan.popular ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
            )}
          >
            <div className="mb-4 flex items-center gap-3">
              <h3 className="font-heading text-xl font-bold text-ink">
                {plan.name}
              </h3>
              {plan.popular ? (
                <Badge variant="soft" size="sm">
                  Most popular
                </Badge>
              ) : null}
            </div>

            <ul className="space-y-2.5">
              {features.map((feature: Feature) => {
                const included = tierIncludes(plan.id, feature.tier);
                return (
                  <li
                    key={feature.id}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    {included ? (
                      <Included label={plan.name} />
                    ) : (
                      <Excluded label={plan.name} />
                    )}
                    <span
                      className={cn(
                        included
                          ? "text-ink-soft"
                          : "text-muted-foreground/60 line-through"
                      )}
                    >
                      {feature.title}
                    </span>
                  </li>
                );
              })}
            </ul>

            <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              {planLimits.map((limit) => (
                <div key={limit.label} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{limit.label}</dt>
                  <dd className="text-right font-medium text-ink">
                    {limit.values[plan.id]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
