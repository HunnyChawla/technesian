import { Check, Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/layout/Section";

const capabilities = [
  "Refraction and vision charting, with current-specs history",
  "IOP readings and full ophthalmic history on the patient timeline",
  "Auto-refractometer values captured straight into the visit",
  "Spectacle and eye-drop prescriptions from reusable templates",
  "A dedicated optometrist panel, separate from the doctor's",
  "An eye-hospital queue that routes patients across doctor groups",
];

export function EyeHospital() {
  return (
    <Section id="eye-hospital" spacing="lg" className="overflow-hidden bg-card">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Badge variant="accent" className="mb-5">
            <Eye />
            Specialty suite
          </Badge>
          <h2 className="text-3xl font-bold text-balance text-ink md:text-[2.75rem] md:leading-[1.1]">
            Most systems bolt on eye care.{" "}
            <span className="text-gradient">Cura was built for it.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            If you run an eye hospital, a generic HMS will have you keeping
            refraction on paper. Cura records the ophthalmic workflow properly
            &mdash; from the optometrist&apos;s chair to the surgeon&apos;s
            plan &mdash; on the same patient file as everything else.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {capabilities.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-strong">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className="text-[0.95rem] leading-relaxed text-ink-soft">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stylised optometry record */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-tr from-accent/15 to-primary/15 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-background shadow-[var(--shadow-lift)]">
            <div className="border-b border-border bg-muted/60 px-6 py-4">
              <p className="font-heading text-sm font-bold text-ink">
                Refraction &mdash; UHID 20441
              </p>
              <p className="text-xs text-muted-foreground">
                Recorded by optometrist &middot; auto-refractometer linked
              </p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="px-6 py-3 text-left font-medium">Eye</th>
                  <th className="px-3 py-3 text-right font-medium">Sph</th>
                  <th className="px-3 py-3 text-right font-medium">Cyl</th>
                  <th className="px-3 py-3 text-right font-medium">Axis</th>
                  <th className="px-6 py-3 text-right font-medium">VA</th>
                </tr>
              </thead>
              <tbody className="font-medium text-ink tabular-nums">
                <tr className="border-b border-border/60">
                  <td className="px-6 py-3.5 text-left text-muted-foreground">
                    Right (OD)
                  </td>
                  <td className="px-3 py-3.5 text-right">-1.75</td>
                  <td className="px-3 py-3.5 text-right">-0.50</td>
                  <td className="px-3 py-3.5 text-right">90&deg;</td>
                  <td className="px-6 py-3.5 text-right">6/6</td>
                </tr>
                <tr>
                  <td className="px-6 py-3.5 text-left text-muted-foreground">
                    Left (OS)
                  </td>
                  <td className="px-3 py-3.5 text-right">-2.00</td>
                  <td className="px-3 py-3.5 text-right">-0.75</td>
                  <td className="px-3 py-3.5 text-right">85&deg;</td>
                  <td className="px-6 py-3.5 text-right">6/9</td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-border bg-muted/40 px-6 py-4 text-sm">
              <span className="text-muted-foreground">
                IOP&nbsp;
                <strong className="font-semibold text-ink tabular-nums">
                  14 / 15 mmHg
                </strong>
              </span>
              <span className="text-muted-foreground">
                Next&nbsp;
                <strong className="font-semibold text-ink">
                  Cataract counselling
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
