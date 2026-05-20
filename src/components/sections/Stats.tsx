import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { statsMock } from "@/lib/mock/homepage";

const icons = [BuildingIcon, ProjectsIcon, GlobeIcon, DiamondIcon] as const;

export async function Stats() {
  const t = await getTranslations("Stats");

  return (
    <section
      id="stats"
      aria-label="Key figures"
      className="border-y border-white/5 bg-background"
    >
      <Container>
        <ul className="grid grid-cols-2 gap-x-2.5 md:grid-cols-4 md:gap-x-0">
          {statsMock.map((stat, i) => {
            const Icon = icons[i];
            return (
              <li
                key={stat.label}
                className="flex items-center justify-start gap-3 px-0 py-10 sm:gap-4 sm:px-4 md:justify-center md:gap-5 md:px-6 md:py-16 md:[&:not(:last-child)]:border-r md:[&:not(:last-child)]:border-white/8"
              >
                <Icon />
                <div className="flex flex-col">
                  <span className="font-heading text-4xl leading-none text-gold md:text-5xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 text-[0.7rem] uppercase tracking-[0.22em] text-foreground/85 md:text-xs">
                    {t(stat.label as "yearsOfExperience" | "completedProjects" | "countries" | "bespokeApproach")}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className="text-gold shrink-0 [&>svg]:h-12 [&>svg]:w-12 md:[&>svg]:h-14 md:[&>svg]:w-14 lg:[&>svg]:h-16 lg:[&>svg]:w-16"
    >
      {children}
    </span>
  );
}

function BuildingIcon() {
  return (
    <IconWrap>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 34V10l12-4 12 4v24M14 16h4M14 22h4M14 28h4M22 16h4M22 22h4M22 28h4M6 34h28"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrap>
  );
}

function ProjectsIcon() {
  return (
    <IconWrap>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 34V14l8-6 8 6v20M22 34V20l8-4v18M6 34h28M10 20h4M10 26h4M26 24h2M26 30h2"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrap>
  );
}

function GlobeIcon() {
  return (
    <IconWrap>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
        <path d="M3.6 9h16.8" />
        <path d="M3.6 15h16.8" />
        <path d="M11.5 3a17 17 0 0 0 0 18" />
        <path d="M12.5 3a17 17 0 0 1 0 18" />
      </svg>
    </IconWrap>
  );
}

function DiamondIcon() {
  return (
    <IconWrap>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 16l6-8h16l6 8-14 18L6 16Z M12 8l4 8M28 8l-4 8M6 16h28M16 16l4 18M24 16l-4 18"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrap>
  );
}
