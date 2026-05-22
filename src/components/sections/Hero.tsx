import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { HeroSlider } from "./HeroSlider";
import { heroMock } from "@/lib/mock/homepage";

const HERO_SLIDES = [
  "/images/slide_up/slide1.jpg",
  "/images/slide_up/slide2.jpg",
  "/images/slide_up/slide3.jpg",
];

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
      className="relative flex min-h-[80svh] items-center overflow-hidden md:min-h-[100svh]"
    >
      <HeroSlider images={HERO_SLIDES}>
        <Container className="pointer-events-none relative z-10 py-20 md:py-32">
          <div className="max-w-5xl space-y-8">
            <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.3em]">
              {t("tagline")}
            </p>
            <Heading as="h1" size="display">
              {t("title")}
            </Heading>
            <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                href={ctaHref}
                variant="primary"
                className="pointer-events-auto bg-transparent border border-gold-light gap-4 px-6 py-3.5 sm:gap-6 sm:px-9 sm:py-4"
              >
                <span className="text-[#d2d2d2]">{t("exploreProjects")}</span>
                <svg
                  aria-hidden
                  width="18"
                  height="18"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 text-white"
                >
                  <path
                    d="M4 11h14M12 5l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </Container>
      </HeroSlider>
    </section>
  );
}
