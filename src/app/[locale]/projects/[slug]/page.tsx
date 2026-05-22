import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { projectsMock } from "@/lib/mock/projects";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export function generateStaticParams() {
  // Same slug across all locales (see wiki same-slug-across-locales); the
  // [locale] segment is supplied by the parent layout's generateStaticParams.
  return projectsMock.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!projectsMock.some((project) => project.slug === slug)) return {};
  const t = await getTranslations({ locale, namespace: "Projects" });
  return {
    title: `${t(`items.${slug}.title`)} — ARQUA Design & Build`,
    description: t(`items.${slug}.summary`),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = projectsMock.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projectsMock.indexOf(project);
  const next = projectsMock[(index + 1) % projectsMock.length];

  const t = await getTranslations("Projects");
  const title = t(`items.${slug}.title`);
  const location = t(`items.${slug}.location`);
  const summary = t(`items.${slug}.summary`);
  const paragraphs = t(`items.${slug}.body`).split("\n\n");

  return (
    <article>
      {/* Cover */}
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden md:h-[80vh]">
        <Image
          src={project.coverImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/30" />
        <Container className="absolute inset-x-0 bottom-0 pb-10 md:pb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {location}
          </p>
          <Heading as="h1" size="xl" className="mt-4 max-w-4xl">
            {title}
          </Heading>
        </Container>
      </div>

      {/* Meta + narrative */}
      <Section className="bg-background">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <aside className="md:col-span-4">
              <dl className="flex flex-col gap-7 border-t border-border pt-8">
                <Meta label={t("meta.location")} value={location} />
                <Meta label={t("meta.year")} value={String(project.year)} />
                <Meta label={t("meta.area")} value={project.area} />
              </dl>
            </aside>
            <div className="md:col-span-8">
              <p className="font-heading text-xl leading-relaxed text-foreground md:text-2xl">
                {summary}
              </p>
              <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-muted md:text-lg">
                {paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Gallery */}
      <Section className="bg-background" padding="sm">
        <Container>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {t("galleryHeading")}
          </p>
          <div className="mt-8">
            <ProjectGallery images={project.gallery} title={title} />
          </div>
        </Container>
      </Section>

      {/* CTA + project navigation */}
      <Section className="border-t border-border bg-background">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <Heading as="h2" size="lg" className="max-w-2xl">
              {t("ctaHeading")}
            </Heading>
            <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {t("ctaBody")}
            </p>
            <Button href={`/${locale}/contact`} variant="primary" className="mt-2">
              {t("ctaButton")}
            </Button>
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-border pt-8 text-xs uppercase tracking-[0.25em]">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-gold"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              {t("backToProjects")}
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="group inline-flex items-center gap-2 text-foreground transition-colors hover:text-gold"
            >
              {t("nextProject")}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Container>
      </Section>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.65rem] uppercase tracking-[0.25em] text-subtle">
        {label}
      </dt>
      <dd className="mt-2 text-base text-foreground md:text-lg">{value}</dd>
    </div>
  );
}
