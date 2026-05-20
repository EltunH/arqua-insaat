import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { FAQ } from "@/components/sections/FAQ";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <About />
      <WhyUs />
      <FAQ />
    </main>
  );
}
