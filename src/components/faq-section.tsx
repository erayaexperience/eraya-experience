"use client";

import { FiPlus } from "react-icons/fi";
import { faqs } from "@/constants/faq";
import { SectionHeading } from "./ui/section-heading";

export default function FaqSection() {
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
          className="mb-12 md:mb-16"
        />

        <div className="mx-auto max-w-3xl border-t border-secondary/10">
          {faqs.map((faq) => (
            <details key={faq.question} name="faq" className="faq-item group border-b border-secondary/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left outline-none [&::-webkit-details-marker]:hidden sm:py-7">
                <h3 className="text-lg font-semibold tracking-tight text-secondary transition-colors duration-300 group-hover:text-primary group-open:text-primary sm:text-xl">
                  {faq.question}
                </h3>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary/10 text-primary transition-[rotate,background-color,border-color] duration-500 ease-out-expo group-open:rotate-45 group-open:border-primary group-open:bg-primary group-open:text-secondary">
                  <FiPlus className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 text-base font-light leading-relaxed text-foreground/70 sm:text-lg">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
