/**
 * Mock projects data — used while the Strapi `Project` collection does not
 * yet exist.
 *
 * Following the same convention as `serviceCategoriesMock` in
 * `./homepage.ts`: this mock holds only the *structural*, non-localized data
 * Strapi will own (slug, images, year, area, featured flag). The localized
 * strings (title, location, summary, body) live in `messages/{locale}.json`
 * under the `Projects.items.<slug>` namespace and are resolved at render time.
 *
 * Swap path to live Strapi (see wiki strapi-integration-plan):
 *   const { data } = await strapiCollection<Project>(ENDPOINTS.projects, {
 *     locale, tags: ["projects"],
 *   });
 * — the localized fields then come from Strapi instead of next-intl, and the
 * components read `project.title` etc. directly.
 */

export type ProjectMock = {
  slug: string;
  coverImage: string;
  gallery: string[];
  year: number;
  area: string;
  featured: boolean;
};

// Encoded space in the interior image filename, matching serviceCategoriesMock.
const INTERIOR = "/images/interyer%20design.jpg";
const LIVING = "/images/modern-living-room-style_53876-144814.avif";

export const projectsMock: ProjectMock[] = [
  {
    slug: "caspian-shore-residence",
    coverImage: "/images/residental.jpg",
    gallery: [LIVING, INTERIOR, "/images/abour_arqo.jpg"],
    year: 2024,
    area: "620 m²",
    featured: true,
  },
  {
    slug: "port-baku-offices",
    coverImage: "/images/commercial.jpg",
    gallery: [INTERIOR, LIVING, "/images/hospitality.png"],
    year: 2023,
    area: "3,400 m²",
    featured: false,
  },
  {
    slug: "anatolia-boutique-hotel",
    coverImage: "/images/hospitality.png",
    gallery: [INTERIOR, LIVING, "/images/turnkey.jpg"],
    year: 2023,
    area: "2,100 m²",
    featured: true,
  },
  {
    slug: "highland-penthouse",
    coverImage: INTERIOR,
    gallery: [LIVING, "/images/residental.jpg", "/images/commercial.jpg"],
    year: 2024,
    area: "310 m²",
    featured: false,
  },
  {
    slug: "marina-bay-villa",
    coverImage: "/images/turnkey.jpg",
    gallery: ["/images/residental.jpg", LIVING, "/images/hospitality.png"],
    year: 2022,
    area: "780 m²",
    featured: false,
  },
  {
    slug: "old-city-heritage-house",
    coverImage: "/images/abour_arqo.jpg",
    gallery: ["/images/residental.jpg", INTERIOR, LIVING],
    year: 2023,
    area: "540 m²",
    featured: false,
  },
];
