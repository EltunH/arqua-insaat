import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { serviceCategoriesMock } from "@/lib/mock/homepage";

type ServiceTKey =
  | "residential"
  | "residentialSubtitle"
  | "commercial"
  | "commercialSubtitle"
  | "hospitality"
  | "hospitalitySubtitle"
  | "interior"
  | "interiorSubtitle"
  | "turnkey"
  | "turnkeySubtitle";

export async function Services() {
  const t = await getTranslations("Services");

  return (
    <Section id="services" className="bg-background">
      <Container>
        <div className="mb-12 flex flex-col gap-3 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              {t("eyebrow")}
            </p>
            <Heading as="h2" size="xl" className="mt-4">
              {t("heading")}
            </Heading>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {serviceCategoriesMock.map((service) => (
            <li
              key={service.key}
              className="group relative aspect-3/4 overflow-hidden"
            >
              <Image
                src={service.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/45 transition-colors duration-500 group-hover:bg-black/30" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="font-heading text-lg uppercase tracking-[0.12em] text-foreground md:text-xl">
                  {t(service.key as ServiceTKey)}
                </h3>
                <p className="mt-1.5 text-[0.7rem] leading-snug text-foreground/75 md:text-xs">
                  {t(service.subtitleKey as ServiceTKey)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
