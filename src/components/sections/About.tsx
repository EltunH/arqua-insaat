import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export async function About() {
  const t = await getTranslations("About");
  const locale = await getLocale();

  return (
    <Section id="about" className="bg-background">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="group relative order-2 overflow-hidden md:order-1 md:col-span-6">
            <div className="relative aspect-4/5 md:aspect-auto md:h-[80vh] overflow-hidden">
              <Image
                src="/images/abour_arqo.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/45 transition-colors duration-500 group-hover:bg-black/30" />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -top-6 -left-6 hidden h-24 w-24 border-t border-l border-gold/40 md:block"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -bottom-6 hidden h-24 w-24 border-r border-b border-gold/40 md:block"
            />
          </div>

          <div className="order-1 md:order-2 md:col-span-6">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              {t("eyebrow")}
            </p>
            <Heading
              as="h2"
              size="xl"
              className="mt-5 whitespace-pre-line"
            >
              {t("title")}
            </Heading>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {t("body")}
            </p>
            <div className="mt-8">
              <Button href={`/${locale}/about`} variant="outline">
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
