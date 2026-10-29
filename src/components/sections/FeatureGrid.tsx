"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
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
      {/* h4, not h3: the category label above these cards is the h3, so cards
          are its children. Both at h3 flattened 4 categories and 17 modules
          into one meaningless sibling list. */}
      <h4 className="font-heading text-lg font-bold text-ink">
        {feature.title}
      </h4>
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
        className="mb-10"
      />

      {/* Flagship Product Showcase Banner */}
      <div className="mb-12 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/8 via-card to-accent/5 p-6 shadow-sm md:p-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-white p-2.5 shadow-sm">
              <Image
                src="/cura-logo.png"
                alt="Cura Hospital Management System"
                width={140}
                height={70}
                className="h-auto w-full object-contain"
              />
            </div>
            <div>
              <div className="mb-1 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="text-xs font-bold tracking-wider text-primary-strong uppercase">
                  Flagship Product
                </span>
                <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[0.7rem] font-semibold text-accent-strong">
                  17 Integrated Modules
                </span>
              </div>
              <h3 className="font-heading text-xl font-extrabold text-ink sm:text-2xl">
                Cura Hospital Management System
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Engineered by Technesian to run OPD, IPD, day care, lab, and billing seamlessly on one unified screen.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <BookDemoModal>
              <Button className="h-11 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary-strong">
                Book Cura Demo
              </Button>
            </BookDemoModal>
          </div>
        </div>
      </div>

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
