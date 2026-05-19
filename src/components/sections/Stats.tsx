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
        <ul className="grid grid-cols-2 md:grid-cols-4">
          {statsMock.map((stat, i) => {
            const Icon = icons[i];
            return (
              <li
                key={stat.label}
                className="flex items-center justify-center gap-5 px-6 py-12 md:py-16 md:not-last:border-r md:not-last:border-white/8"
              >
                <Icon />
                <div className="flex flex-col">
                  <span className="font-heading text-4xl leading-none text-gold md:text-5xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 text-[0.7rem] uppercase tracking-[0.22em] text-foreground/85 md:text-xs">
                    {t(stat.label as Parameters<typeof t>[0])}
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
      className="text-gold shrink-0 [&>svg]:h-9 [&>svg]:w-9 md:[&>svg]:h-10 md:[&>svg]:w-10"
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
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="1.1" />
        <path
          d="M20 7c4 4 6 8 6 13s-2 9-6 13M20 7c-4 4-6 8-6 13s2 9 6 13M7 20h26"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
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
