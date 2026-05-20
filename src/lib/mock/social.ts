/**
 * Mock social / WhatsApp links — static placeholders until the Strapi
 * `ContactInfo` single type lands (it already models `whatsapp`,
 * `instagramUrl`, etc. in `src/types/strapi-content.ts`). Same convention as
 * `serviceCategoriesMock`: structural data here, swap to Strapi later.
 *
 * Note: `ContactInfo` does not yet have `tiktok` / `youtube` fields — add
 * them to the Strapi schema when modelling it.
 */

export type SocialPlatform = "instagram" | "tiktok" | "whatsapp" | "youtube";

export type SocialLink = {
  platform: SocialPlatform;
  href: string;
  label: string;
};

// Placeholder WhatsApp number (international format, digits only) → replace
// with the real one (Strapi `ContactInfo.whatsapp`). Drives the header
// "Get in touch" CTAs and the WhatsApp social icon.
export const WHATSAPP_NUMBER = "994501234567";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const socialLinksMock: SocialLink[] = [
  { platform: "instagram", href: "https://www.instagram.com/", label: "Instagram" },
  { platform: "tiktok", href: "https://www.tiktok.com/", label: "TikTok" },
  { platform: "whatsapp", href: WHATSAPP_URL, label: "WhatsApp" },
  { platform: "youtube", href: "https://www.youtube.com/", label: "YouTube" },
];
