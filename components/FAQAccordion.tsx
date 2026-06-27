"use client";

import React from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <div className="space-y-3.5">
      {faqs.map((faq, idx) => (
        <details
          key={idx}
          role="region"
          aria-label={faq.question}
          className="group border border-border bg-card rounded-2xl overflow-hidden transition-all duration-200"
        >
          <summary className="flex items-center justify-between gap-3 px-5 py-4 list-none cursor-pointer hover:bg-secondary/40 font-semibold text-xs sm:text-sm text-foreground select-none outline-none focus:bg-secondary/60">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="h-4 w-4 text-indigo-500/80 group-open:text-indigo-500 flex-shrink-0" />
              <span>{faq.question}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-250 group-open:rotate-180 flex-shrink-0" />
          </summary>
          <div className="px-5 pb-4 pt-1 border-t border-border/50 text-xs sm:text-sm text-muted-foreground leading-relaxed bg-secondary/5 font-medium">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
