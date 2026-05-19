/**
 * Mock homepage data — used while Strapi content types are not yet created.
 *
 * Shape mirrors `src/types/strapi-content.ts#Homepage` so swapping to real
 * Strapi data later is a one-liner change.
 *
 * Text fields are kept minimal here — locale-aware strings come from
 * `messages/{locale}.json` (next-intl) at render time. Mock supplies only
 * the data Strapi will own: images, structured arrays, CTAs.
 */

import type {
  Homepage,
  StatItem,
  ProcessStep,
} from "@/types/strapi-content";

export const heroMock: Pick<Homepage, "heroImage" | "heroCta"> = {
  // No image yet — Hero will render a dark gradient placeholder.
  // Replace with real Strapi media object once uploaded.
  heroImage: null,
  heroCta: {
    label: "exploreProjects",
    href: "/projects",
    variant: "primary",
  },
};

export const statsMock: StatItem[] = [
  { value: "10+", label: "yearsOfExperience" },
  { value: "250+", label: "completedProjects" },
  { value: "5", label: "countries" },
  { value: "100%", label: "bespokeApproach" },
];

export const processStepsMock: ProcessStep[] = [
  { number: "01", title: "concept", description: "conceptDesc" },
  { number: "02", title: "design", description: "designDesc" },
  { number: "03", title: "development", description: "developmentDesc" },
  { number: "04", title: "construction", description: "constructionDesc" },
  { number: "05", title: "delivery", description: "deliveryDesc" },
];

export const serviceCategoriesMock = [
  { key: "residential", subtitleKey: "residentialSubtitle", href: "/services/residential" },
  { key: "commercial", subtitleKey: "commercialSubtitle", href: "/services/commercial" },
  { key: "hospitality", subtitleKey: "hospitalitySubtitle", href: "/services/hospitality" },
  { key: "interior", subtitleKey: "interiorSubtitle", href: "/services/interior-design" },
  { key: "turnkey", subtitleKey: "turnkeySubtitle", href: "/services/turnkey" },
] as const;
