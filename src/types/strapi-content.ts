/**
 * Strapi v5 content type shapes — mirror of (future) Strapi schemas.
 *
 * Used by:
 *   - Mock data in `src/lib/mock/*` (current)
 *   - Real Strapi API responses (later, once content types exist)
 *
 * Keep these in sync with Strapi schema.json files in `aqua-cms/src/api/*`.
 */

import type { StrapiMedia } from "@/lib/strapi/types";

/* ---------- Shared ---------- */

export type Seo = {
  metaTitle: string;
  metaDescription: string;
  keywords?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: StrapiMedia | null;
  canonicalUrl?: string | null;
  noIndex?: boolean;
};

export type ButtonLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
};

/* ---------- Project ---------- */

export type Project = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  shortDescription: string;
  location: string | null;
  completionYear: number | null;
  area: string | null;
  clientName?: string | null;
  featured: boolean;
  sortOrder: number;
  coverImage: StrapiMedia;
  gallery?: StrapiMedia[];
  publishedAt: string;
  updatedAt: string;
  locale: string;
};

/* ---------- Service ---------- */

export type Service = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  shortDescription: string;
  icon?: StrapiMedia | null;
  coverImage?: StrapiMedia | null;
  sortOrder: number;
  featured: boolean;
  locale: string;
};

/* ---------- Testimonial ---------- */

export type Testimonial = {
  id: number;
  documentId: string;
  clientName: string;
  clientPosition?: string | null;
  companyName?: string | null;
  quote: string;
  image?: StrapiMedia | null;
  rating?: number | null;
  sortOrder: number;
  isActive: boolean;
  locale: string;
};

/* ---------- Homepage (single type) ---------- */

export type StatItem = {
  value: string;
  label: string;
  icon?: StrapiMedia | null;
};

export type WhyUsItem = {
  title: string;
  description: string;
  icon?: StrapiMedia | null;
  sortOrder: number;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type Homepage = {
  id: number;
  documentId: string;

  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: StrapiMedia | null;
  heroCta: ButtonLink;

  stats: StatItem[];

  aboutTitle: string;
  aboutTagline: string;
  aboutDescription: string;
  aboutImage?: StrapiMedia | null;
  aboutCta: ButtonLink;

  servicesTitle?: string;
  servicesSubtitle?: string;

  processTitle: string;
  processSteps: ProcessStep[];

  projectsTitle?: string;
  projectsSubtitle?: string;

  whyUsTitle?: string;
  whyUsItems?: WhyUsItem[];

  testimonialsTitle?: string;

  contactTitle?: string;
  contactText?: string;

  seo?: Seo | null;
  locale: string;
};

/* ---------- ContactInfo (single type) ---------- */

export type ContactInfo = {
  id: number;
  documentId: string;
  phone: string;
  whatsapp?: string | null;
  email: string;
  address: string;
  googleMapUrl?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
  workingHours: string;
  locale: string;
};
