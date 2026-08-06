"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookDemoModal } from "@/components/BookDemoModal";
import { QueueBoard } from "@/components/sections/QueueBoard";
import { features } from "@/data/features";

const stats = [
  { value: String(features.length), label: "modules, one login" },
  { value: "8", label: "staff roles supported" },
  { value: "ABDM", label: "ready records" },
];

export function Hero() {
  return (
    <section className="mesh relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
      <div aria-hidden className="grid-lines absolute inset-0" />

      <div className="shell relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          {/* Copy */}
          {/*
            The hero deliberately uses CSS animations, not framer-motion.
            motion.* renders `opacity:0` into the static HTML, and an element
            at opacity 0 is not painted — which meant the h1 (the LCP element)
            could not register until the JS bundle hydrated. These classes
            animate at first paint instead. See globals.css.
          */}
          <div className="flex flex-col items-start gap-6 text-center lg:text-left">
            <div className="rise mx-auto lg:mx-0">
              <Badge variant="soft">
                <Sparkles />
                Built in India, for Indian hospitals
              </Badge>
            </div>

            {/* rise-lcp is transform-only: a translated element is painted, so
                LCP is not delayed by the entrance animation. */}
            <h1 className="rise-lcp rise-delay-1 text-4xl font-extrabold tracking-tight text-balance text-ink sm:text-5xl md:text-6xl md:leading-[1.05]">
              Run the whole hospital on{" "}
              <span className="text-gradient">one system</span>
            </h1>

            <p className="rise rise-delay-2 max-w-xl text-lg text-pretty text-muted-foreground md:text-xl">
              Cura connects OPD, IPD, day care, the lab, the operating theatre
              and the billing counter &mdash; so a patient walks in once and
              every department already knows who they are.
            </p>

            <div className="rise rise-delay-3 mx-auto flex flex-col items-center gap-3 sm:flex-row lg:mx-0">
              <BookDemoModal>
                <Button className="h-14 rounded-full bg-primary px-8 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-strong">
                  Book a free demo
                  <ArrowRight className="ml-1 size-5" />
                </Button>
              </BookDemoModal>
              <Link href="/pricing">
                <Button
                  variant="outline"
                  className="h-14 rounded-full border-primary/25 bg-card px-8 text-base font-semibold text-primary-strong hover:bg-primary/8"
                >
                  See pricing
                </Button>
              </Link>
            </div>

            <dl className="rise rise-delay-4 mx-auto mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:mx-0 lg:justify-start">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <dt className="font-heading text-2xl font-extrabold text-ink">
                    {stat.value}
                  </dt>
                  <dd className="text-sm text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Product visual — not the LCP element, so framer-motion is fine. */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative"
          >
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary/18 to-accent/18 blur-2xl"
            />
            <QueueBoard className="relative" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
