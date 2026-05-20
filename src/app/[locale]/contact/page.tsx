import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";

type Props = {
  params: Promise<{ locale: Locale }>;
};

const PHONE = "+994 12 345 67 89";
const EMAIL = "info@arqua.az";

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <Section id="contact" className="bg-background">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {t("eyebrow")}
          </p>
          <Heading as="h1" size="xl" className="mt-4">
            {t("heading")}
          </Heading>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            {t("body")}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
          <aside className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              {t("infoHeading")}
            </p>
            <ul className="mt-8 flex flex-col gap-7">
              <InfoBlock label={t("info.phoneLabel")} value={PHONE} href={`tel:${PHONE.replace(/\s/g, "")}`} />
              <InfoBlock label={t("info.emailLabel")} value={EMAIL} href={`mailto:${EMAIL}`} />
              <InfoBlock label={t("info.addressLabel")} value={t("info.addressValue")} />
              <InfoBlock label={t("info.hoursLabel")} value={t("info.hoursValue")} />
            </ul>
            <SocialLinks className="mt-12" />
          </aside>

          <div className="md:col-span-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              {t("formHeading")}
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function InfoBlock({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <li>
      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-subtle">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="mt-2 inline-block text-base text-foreground transition-colors hover:text-gold md:text-lg"
        >
          {value}
        </a>
      ) : (
        <p className="mt-2 text-base text-foreground md:text-lg">{value}</p>
      )}
    </li>
  );
}
