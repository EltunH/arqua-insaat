/**
 * Strapi v5 endpoint paths (no leading /api — added by strapiFetch).
 * Add new endpoints here as content types are created in Strapi.
 */
export const ENDPOINTS = {
  // Collection types (to be added when schemas exist):
  // projects: "/projects",
  // services: "/services",
  // testimonials: "/testimonials",
  // categories: "/project-categories",

  // Single types:
  // homepage: "/homepage",
  // aboutPage: "/about-page",
  // contactInfo: "/contact-info",
  // siteSettings: "/site-setting",
} as const;

export type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];
