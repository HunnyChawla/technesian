import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/layout/Section";
import { SITE } from "@/lib/site";
import { LinkedInIcon } from "@/components/SocialIcons";

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
          <div className="relative flex flex-col items-center justify-center rounded-3xl border border-border bg-background p-8 shadow-[var(--shadow-lift)] sm:p-10">
            <Image
              src="/technesian-logo.png"
              alt="Technesian"
              width={340}
              height={240}
              className="h-auto w-full max-w-[260px] object-contain"
            />
            <div className="mt-5 flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-medium text-muted-foreground">
              <span className="font-semibold text-ink">Creator of</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5 font-bold text-primary-strong">
                <Image
                  src="/cura-mark.png"
                  alt="Cura"
                  width={14}
                  height={14}
                  className="size-3.5 object-contain"
                />
                Cura HMS
              </span>
            </div>
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

      {/* Leadership / Founders */}
      <div className="mt-16 border-t border-border/80 pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="soft" className="mb-3">
            Leadership
          </Badge>
          <h3 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Meet the Founders
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Built by engineers and healthcare operators who spend time in
            hospital corridors to eliminate day-to-day friction.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          {SITE.founders.map((founder) => {
            const getPhotoPath = () => {
              if (
                founder.image &&
                fs.existsSync(path.join(process.cwd(), "public", founder.image))
              ) {
                return founder.image;
              }
              const extensions = [".png", ".jpg", ".jpeg", ".webp"];
              for (const ext of extensions) {
                const candidate = `/founders/${founder.slug}${ext}`;
                if (fs.existsSync(path.join(process.cwd(), "public", candidate))) {
                  return candidate;
                }
              }
              return null;
            };

            const photoPath = getPhotoPath();

            return (
              <div
                key={founder.name}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-background/60 p-6 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-lift)]"
              >
                <div>
                  <div className="flex items-center gap-4">
                    {photoPath ? (
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl border border-primary/20 shadow-xs transition-transform group-hover:scale-105">
                        <Image
                          src={photoPath}
                          alt={founder.name}
                          width={56}
                          height={56}
                          className="size-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 font-heading text-lg font-bold text-primary-strong shadow-xs transition-transform group-hover:scale-105">
                        {founder.initials}
                      </div>
                    )}
                    <div>
                      <h4 className="font-heading text-lg font-bold text-ink">
                        {founder.name}
                      </h4>
                      <p className="text-xs font-semibold tracking-wide text-primary-strong uppercase">
                        {founder.role}
                      </p>
                    </div>
                  </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {founder.role.includes("CEO")
                    ? "Guides product strategy, clinical partnerships, and customer success — making hospital operations transparent and efficient."
                    : "Spearheads software architecture, ABDM compliance, and real-time infrastructure — engineered for 24/7 hospital uptime."}
                </p>
              </div>

              <div className="mt-6 border-t border-border/60 pt-4">
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-primary-strong transition-colors hover:text-primary"
                  aria-label={`${founder.name} on LinkedIn`}
                >
                  <LinkedInIcon className="size-4 shrink-0" />
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </Section>
  );
}
