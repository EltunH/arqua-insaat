"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils/cn";

const QUESTIONS = [
  { qKey: "q1", aKey: "a1" },
  { qKey: "q2", aKey: "a2" },
  { qKey: "q3", aKey: "a3" },
  { qKey: "q4", aKey: "a4" },
  { qKey: "q5", aKey: "a5" },
  { qKey: "q6", aKey: "a6" },
] as const;

export function FAQ() {
  const t = useTranslations("FAQ");
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  const left = QUESTIONS.slice(0, 3);
  const right = QUESTIONS.slice(3, 6);

  return (
    <Section id="faq" className="bg-background">
      <Container>
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {t("eyebrow")}
          </p>
          <Heading as="h2" size="xl" className="mt-4">
            {t("heading")}
          </Heading>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2">
          <ul className="flex flex-col">
            {left.map((q, i) => (
              <FAQItem
                key={q.qKey}
                index={i}
                question={t(q.qKey as Parameters<typeof t>[0])}
                answer={t(q.aKey as Parameters<typeof t>[0])}
                isOpen={openId === q.qKey}
                onToggle={() => toggle(q.qKey)}
              />
            ))}
          </ul>
          <ul className="flex flex-col">
            {right.map((q, i) => (
              <FAQItem
                key={q.qKey}
                index={i + 3}
                question={t(q.qKey as Parameters<typeof t>[0])}
                answer={t(q.aKey as Parameters<typeof t>[0])}
                isOpen={openId === q.qKey}
                onToggle={() => toggle(q.qKey)}
              />
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

function FAQItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="border-b border-white/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
      >
        <span className="flex items-baseline gap-4">
          <span className="font-heading text-sm text-gold/70 md:text-base">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "font-heading text-base transition-colors md:text-lg",
              isOpen ? "text-gold" : "text-foreground group-hover:text-gold",
            )}
          >
            {question}
          </span>
        </span>
        <span
          aria-hidden
          className={cn(
            "shrink-0 text-gold transition-transform duration-300",
            isOpen ? "rotate-45" : "rotate-0",
          )}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2v12M2 8h12"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="pl-9 pr-2 pb-5 text-sm leading-relaxed text-muted md:text-base">
            {answer}
          </p>
        </div>
      </div>
    </li>
  );
}
