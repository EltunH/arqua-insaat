import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { heroMock } from "@/lib/mock/homepage";

export async function Hero() {
  const t = await getTranslations("Hero");
  const locale = await getLocale();

  const cta = heroMock.heroCta;
  const ctaHref = cta.href.startsWith("/")
    ? `/${locale}${cta.href}`
    : cta.href;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        {heroMock.heroImage ? (
          <Image
            src={heroMock.heroImage.url}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface/40 via-background to-elevated/25" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
      </div>

      <Container className="relative z-10 py-32 md:py-40">
        <div className="max-w-3xl space-y-7">
          <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.3em]">
            {t("tagline")}
          </p>
          <Heading as="h1" size="display" className="max-w-4xl">
            {t("title")}
          </Heading>
          <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {t("subtitle")}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button href={ctaHref} variant="primary">
              {t("exploreProjects")}
            </Button>
          </div>
        </div>
      </Container>

      <div
        aria-hidden
        className="absolute right-8 bottom-10 z-10 hidden items-center gap-3 lg:flex"
      >
        <SliderArrow direction="prev" />
        <SliderArrow direction="next" />
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-subtle">
          {t("scrollDown")}
        </span>
        <span
          aria-hidden
          className="block h-12 w-px bg-gradient-to-b from-gold/70 to-transparent"
        />
      </div>
    </section>
  );
}

function SliderArrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong/40 text-foreground/60">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={direction === "prev" ? "rotate-180" : ""}
      >
        <path
          d="M3 7h8M7 3l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
