import { ArrowRight } from "lucide-react";

import { BookDemoModal } from "@/components/BookDemoModal";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/layout/Section";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  description: string;
  buttonLabel?: string;
};

/** The closing conversion band, shared by the homepage and /pricing. */
export function CtaBand({
  eyebrow,
  title,
  description,
  buttonLabel = "Book a free demo",
}: CtaBandProps) {
  return (
    <Section
      className="overflow-hidden bg-primary-deep"
      backdrop={
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60rem_36rem_at_18%_-10%,rgba(56,189,248,0.4),transparent_60%),radial-gradient(48rem_30rem_at_88%_110%,rgba(20,184,166,0.35),transparent_60%)]"
        />
      }
    >
      <div className="flex flex-col items-center gap-8">
        <SectionHeading
          tone="inverted"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <BookDemoModal>
            <Button className="h-14 rounded-full bg-white px-9 text-base font-semibold text-primary-deep shadow-xl transition-transform hover:-translate-y-0.5 hover:bg-white">
              {buttonLabel}
              <ArrowRight className="ml-1 size-5" />
            </Button>
          </BookDemoModal>
          <a
            href="tel:+919896853727"
            className="rounded-full px-6 py-3 text-base font-medium text-white/85 transition-colors hover:text-white"
          >
            or call +91 98968 53727
          </a>
        </div>
      </div>
    </Section>
  );
}
