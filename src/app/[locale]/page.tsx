import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("Hero");
  const tCommon = await getTranslations("Common");

  return (
    <main>
      <Section padding="lg">
        <Container>
          <div className="space-y-6 max-w-2xl">
            <p className="text-gold text-sm uppercase tracking-[0.25em]">
              {tHero("tagline")}
            </p>
            <Heading as="h1" size="display">
              {tHero("title")}
            </Heading>
            <p className="text-muted text-lg leading-relaxed">
              {tHero("subtitle")}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button href={`/${locale}/projects`} variant="primary">
                {tHero("cta")}
              </Button>
              <Button href={`/${locale}/contact`} variant="outline">
                {tCommon("readMore")}
              </Button>
            </div>
            <p className="text-subtle text-xs uppercase tracking-[0.25em] pt-2">
              Current locale: {locale}
            </p>
          </div>
        </Container>
      </Section>

      <Section padding="default" className="border-t border-border">
        <Container>
          <Heading size="md" className="mb-8">
            UI Primitives
          </Heading>
          <div className="space-y-6">
            <div>
              <p className="text-muted text-xs uppercase tracking-wider mb-3">
                Button variants
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            <div>
              <p className="text-muted text-xs uppercase tracking-wider mb-3">
                Heading sizes
              </p>
              <div className="space-y-3">
                <Heading size="display">Display heading</Heading>
                <Heading size="xl">Extra large heading</Heading>
                <Heading size="lg">Large heading</Heading>
                <Heading size="md">Medium heading</Heading>
                <Heading size="sm">Small heading</Heading>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="default" className="border-t border-border">
        <Container>
          <Heading size="md" className="mb-8">
            Palette
          </Heading>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Swatch name="Background" value="#030f02" className="bg-background border border-border" />
            <Swatch name="Surface" value="#0a3406" className="bg-surface" />
            <Swatch name="Elevated" value="#0f4209" className="bg-elevated" />
            <Swatch name="Foreground" value="#ffffff" className="bg-foreground text-background" />
            <Swatch name="Muted" value="#8c8c8c" className="bg-muted text-background" />
            <Swatch name="Subtle" value="#5a5a5a" className="bg-subtle" />
            <Swatch name="Gold" value="#af9270" className="bg-gold text-background" />
            <Swatch name="Gold light" value="#c4a987" className="bg-gold-light text-background" />
            <Swatch name="Gold dark" value="#8d7457" className="bg-gold-dark" />
          </div>
        </Container>
      </Section>
    </main>
  );
}

function Swatch({
  name,
  value,
  className,
}: {
  name: string;
  value: string;
  className: string;
}) {
  return (
    <div
      className={`${className} rounded-md p-4 h-24 flex flex-col justify-between border border-border/30`}
    >
      <span className="text-xs uppercase tracking-wider">{name}</span>
      <span className="text-xs font-mono opacity-80">{value}</span>
    </div>
  );
}
