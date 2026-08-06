"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pricingFaqs } from "@/data/pricing";

export function PricingFaq() {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card px-6 py-2 shadow-[var(--shadow-soft)] md:px-8">
      {/*
        `hiddenUntilFound` renders every panel with hidden="until-found"
        instead of unmounting it. Without it Base UI drops collapsed panels
        from the server-rendered HTML, so 9 of these 10 answers were invisible
        to crawlers. It also lets find-in-page open the right panel.
        The FAQPage JSON-LD on this route depends on this staying set.
      */}
      <Accordion defaultValue={[pricingFaqs[0].question]} hiddenUntilFound>
        {pricingFaqs.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
