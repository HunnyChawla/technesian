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
      <Accordion defaultValue={[pricingFaqs[0].question]}>
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
