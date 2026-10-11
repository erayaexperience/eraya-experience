"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { faqs } from "@/constants/faq";
import { SectionHeading } from "./ui/section-heading";
import { cn } from "@/lib/utils";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative overflow-hidden bg-background py-section">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-240 w-240 -translate-1/2 bg-[radial-gradient(closest-side,rgb(var(--primary)/0.1),transparent)]" />

      <div className="container-modern relative">
        <SectionHeading
          subtitle="FAQ"
          title={
            <>
              Questions, <span className="font-serif italic text-primary">Answered</span>
            </>
          }
          description="What brands usually ask before we start working together."
          layout="center"
        />

        <div className="mx-auto max-w-3xl border-t border-secondary/10">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.question} className="border-b border-secondary/10">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "text-lg font-semibold tracking-tight text-secondary transition-colors duration-300 group-hover:text-primary sm:text-xl",
                        isOpen && "text-primary"
                      )}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary/10 text-primary transition-[rotate,background-color,border-color,color] duration-500 ease-in-out",
                        isOpen && "rotate-45 border-primary bg-primary text-secondary"
                      )}
                    >
                      <FiPlus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${index}`}
                  role="region"
                  aria-labelledby={`faq-q-${index}`}
                  inert={!isOpen}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-500 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-base font-light leading-relaxed text-foreground/70 sm:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
