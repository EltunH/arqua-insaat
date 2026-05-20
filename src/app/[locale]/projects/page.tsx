import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/project/ProjectCard";
import { projectsMock } from "@/lib/mock/projects";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projects" });
  return {
    title: `${t("heading")} — ARQUA Design & Build`,
    description: t("intro"),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Projects");

  return (
    <Section className="bg-background">
      <Container>
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {t("eyebrow")}
          </p>
          <Heading as="h1" size="xl" className="mt-4">
            {t("heading")}
          </Heading>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            {t("intro")}
          </p>
        </header>

        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 lg:gap-x-12 lg:gap-y-20">
          {projectsMock.map((project, i) => (
            <li key={project.slug} className="lg:[&:nth-child(even)]:mt-24">
              <ProjectCard
                slug={project.slug}
                index={i + 1}
                title={t(`items.${project.slug}.title`)}
                location={t(`items.${project.slug}.location`)}
                year={project.year}
                image={project.coverImage}
                featured={project.featured}
                featuredLabel={t("featured")}
                viewProjectLabel={t("viewProject")}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
