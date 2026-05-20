import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils/cn";

const REASONS = ["r1", "r2", "r3", "r4"] as const;

export async function WhyUs() {
  const t = await getTranslations("WhyUs");

  return (
    <Section id="why-us" className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-0 h-40 w-px bg-linear-to-b from-transparent via-gold/30 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-20 left-0 h-px w-32 bg-linear-to-r from-gold/40 to-transparent"
      />

      <Container>
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {t("eyebrow")}
          </p>
          <Heading as="h2" size="xl" className="mt-4">
            {t("heading")}
          </Heading>
        </div>

        <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-12 md:mt-20 md:gap-x-20">
          {REASONS.map((r, i) => {
            const isRightCol = i % 2 === 1;
            return (
              <li
                key={r}
                className={cn(
                  "group relative border-t border-white/10 pt-10 pb-12 transition-[border-color] duration-500 hover:border-gold/60",
                  isRightCol && "sm:mt-20",
                )}
              >
                <span
                  aria-hidden
                  className="block font-heading text-7xl leading-[0.85] text-transparent transition-all duration-700 ease-out group-hover:text-gold md:text-[7rem]"
                  style={{ WebkitTextStroke: "1px var(--gold)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 font-heading text-2xl tracking-tight text-foreground md:text-3xl">
                  {t(
                    `${r}Title` as
                      | "r1Title"
                      | "r2Title"
                      | "r3Title"
                      | "r4Title",
                  )}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
                  {t(
                    `${r}Body` as "r1Body" | "r2Body" | "r3Body" | "r4Body",
                  )}
                </p>
                <span
                  aria-hidden
                  className="absolute top-10 right-0 h-px w-0 bg-gold transition-all duration-700 ease-out group-hover:w-16"
                />
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
