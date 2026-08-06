import { Monitor, QrCode, Tv, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/layout/Section";
import { QueueBoard } from "@/components/sections/QueueBoard";

const steps = [
  {
    icon: Users,
    title: "Reception issues a token",
    body: "The patient is registered or looked up by UHID, and joins the right doctor's queue in one action.",
  },
  {
    icon: QrCode,
    title: "The TV logs in by QR",
    body: "Scan once from any smart TV or cheap stick — no dedicated PC, no keyboard, no password taped to the wall.",
  },
  {
    icon: Tv,
    title: "The board updates itself",
    body: "Every time a doctor calls the next patient, the waiting-area screen changes instantly. Nobody has to shout a name.",
  },
];

export function QueueSpotlight() {
  return (
    <Section id="queue" spacing="lg" className="mesh-soft overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <div
            aria-hidden
            className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-primary/12 to-accent/12 blur-2xl"
          />
          <QueueBoard className="relative" />
        </div>

        <div className="order-1 lg:order-2">
          <Badge variant="soft" className="mb-5">
            <Monitor />
            Live queue
          </Badge>
          <h2 className="text-3xl font-bold text-balance text-ink md:text-[2.75rem] md:leading-[1.1]">
            A waiting room that{" "}
            <span className="text-gradient">manages itself</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            The single loudest problem in an OPD is not software. It is thirty
            people asking reception whose turn it is. Cura puts the answer on
            the wall.
          </p>

          <ol className="mt-8 space-y-6">
            {steps.map(({ icon: Icon, title, body }, index) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary-strong">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading font-bold text-ink">
                    <span className="mr-2 text-muted-foreground tabular-nums">
                      {index + 1}.
                    </span>
                    {title}
                  </h3>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
