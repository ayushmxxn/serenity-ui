"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCoreAudio } from "../lib/use-core-audio";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "commercial-use",
    question: "Is Serenity UI free for commercial projects?",
    answer:
      "Yes. 100% free and open-source under the MIT License for personal, client, and commercial projects.",
  },
  {
    id: "how-to-install",
    question: "How do I install components?",
    answer:
      "Copy and paste component source code directly into your project, or use shadcn CLI commands to add them instantly.",
  },
  {
    id: "framework-support",
    question: "Which frameworks are supported?",
    answer:
      "React 18 & 19, Next.js (App & Pages Router), Vite, Astro, Remix, and any React setup with Tailwind CSS.",
  },
  {
    id: "customization",
    question: "Can I customize the styling?",
    answer:
      "Yes. All components use standard Tailwind CSS classes and CSS design tokens, making color, size, and motion customization effortless.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { play } = useCoreAudio();

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => {
      const isClosing = prev === id;
      play(isClosing ? "collapse" : "expand");
      return isClosing ? null : id;
    });
  };

  return (
    <section
      id="faq"
      className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-28"
    >
      {/* Editorial Responsive Container */}
      <div className="mx-auto max-w-xl sm:max-w-2xl lg:max-w-[1180px]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-14 xl:gap-20">
          {/* LEFT: Heading & Description */}
          <div className="w-full lg:w-[380px] xl:w-[410px] shrink-0">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading text-[var(--text-primary)] leading-[1.15]">
              Questions, answered.
            </h2>
            <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-sm">
              Setup, components, licensing, and everything in between.
            </p>
          </div>

          {/* RIGHT: High-Readability Editorial FAQ Accordion (~680–720px) */}
          <div className="w-full lg:max-w-[680px] xl:max-w-[720px] flex-1">
            {/* Hairline Accordion */}
            <div className="divide-y divide-[var(--card-border)] border-y border-[var(--card-border)]">
              {FAQS.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div key={faq.id} className="transition-colors duration-200">
                    <button
                      type="button"
                      onClick={() => toggleFAQ(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`serenity-faq-personal-${faq.id}`}
                      id={`serenity-faq-btn-personal-${faq.id}`}
                      className="flex w-full items-center justify-between gap-4 py-4.5 sm:py-5.5 text-left cursor-pointer select-none focus-visible:outline-none group/faq"
                    >
                      <span className="text-[15px] sm:text-base md:text-[1.075rem] font-bold font-heading transition-opacity duration-200 leading-snug text-[var(--text-primary)] group-hover/faq:opacity-75">
                        {faq.question}
                      </span>

                      <div
                        aria-hidden="true"
                        className={`flex h-5 w-5 shrink-0 items-center justify-center text-[var(--text-muted)] transition-transform duration-200 ${
                          isOpen
                            ? "rotate-180 text-[var(--text-primary)]"
                            : "group-hover/faq:text-[var(--text-primary)]"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key={`faq-content-${faq.id}`}
                          id={`serenity-faq-personal-${faq.id}`}
                          role="region"
                          aria-labelledby={`serenity-faq-btn-personal-${faq.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                              height: {
                                duration: 0.24,
                                ease: [0.16, 1, 0.3, 1],
                              },
                              opacity: { duration: 0.18, delay: 0.02 },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: {
                                duration: 0.18,
                                ease: [0.16, 1, 0.3, 1],
                              },
                              opacity: { duration: 0.12 },
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <p className="pb-4.5 sm:pb-5.5 text-[13px] sm:text-sm leading-relaxed text-[var(--text-muted)] font-sans max-w-xl">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
