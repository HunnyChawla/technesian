import * as React from "react";

import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  /** Vertical rhythm. `lg` is the default band, `sm` for compact strips. */
  spacing?: "sm" | "default" | "lg";
  /** Optional class applied to the inner `.shell` wrapper. */
  innerClassName?: string;
  /**
   * Decorative, full-bleed background rendered behind the shell. Anything
   * passed as `children` is constrained to the shell width, so washes and
   * patterns belong here instead.
   */
  backdrop?: React.ReactNode;
};

const spacingClass = {
  sm: "py-12 md:py-16",
  default: "py-16 md:py-24",
  lg: "py-20 md:py-32",
} as const;

/**
 * Full-bleed band with a centred content shell. Replaces the
 * `<section className="py-24"><div className="container mx-auto px-4">`
 * boilerplate that was repeated in every block of the old page.
 */
export function Section({
  className,
  innerClassName,
  spacing = "default",
  backdrop,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative", spacingClass[spacing], className)}
      {...props}
    >
      {backdrop}
      <div className={cn("shell relative z-10", innerClassName)}>{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  /** Renders light-on-dark, for use inside the primary CTA bands. */
  tone?: "default" | "inverted";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "default",
  className,
}: SectionHeadingProps) {
  const inverted = tone === "inverted";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "text-xs font-semibold tracking-[0.18em] uppercase",
            inverted ? "text-white/70" : "text-primary-strong"
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-bold md:text-[2.75rem] md:leading-[1.1]",
          inverted ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-lg leading-relaxed text-pretty",
            inverted ? "text-white/85" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
