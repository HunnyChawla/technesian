"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Section, SectionHeading } from "@/components/layout/Section";
import {
  FEATURE_CATEGORIES,
  features,
  type Feature,
  type Tier,
} from "@/data/features";
import { cn } from "@/lib/utils";

const tierLabel: Record<Tier, string> = {
  basic: "Basic",
  standard: "Standard",
  premium: "Premium",
};

const tierVariant: Record<Tier, "muted" | "soft" | "accent"> = {
  basic: "muted",
  standard: "soft",
  premium: "accent",
};

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 3) * 0.06 }}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-strong transition-colors group-hover:bg-primary group-hover:text-white">
          <Icon className="size-6" />
        </span>
        <Badge variant={tierVariant[feature.tier]} size="sm">
          {tierLabel[feature.tier]}
        </Badge>
      </div>
      <h3 className="font-heading text-lg font-bold text-ink">
        {feature.title}
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
        {feature.long}
      </p>
    </motion.article>
  );
}

export function FeatureGrid() {
  return (
    <Section id="features" spacing="lg" className="mesh-soft">
      <SectionHeading
        eyebrow="Everything included"
        title="Every module, and they actually talk to each other"
        description="No bolt-ons, no separate logins, no re-typing the same patient into four systems. Each badge shows the lowest plan that includes the module."
        className="mb-14"
      />

      <div className="flex flex-col gap-12">
        {FEATURE_CATEGORIES.map((category) => {
          const items = features.filter(
            (feature) => feature.category === category
          );
          if (items.length === 0) return null;

          return (
            <div key={category}>
              <div className="mb-6 flex items-center gap-4">
                <h3 className="font-heading text-sm font-bold tracking-[0.16em] text-primary-strong uppercase">
                  {category}
                </h3>
                <span className={cn("rule-fade flex-1")} />
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {items.map((feature, index) => (
                  <FeatureCard
                    key={feature.id}
                    feature={feature}
                    index={index}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-14 text-center">
        <Link
          href="/pricing#compare"
          className="inline-flex items-center gap-2 font-semibold text-primary-strong transition-colors hover:text-primary-deep"
        >
          See which plan includes what
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}
