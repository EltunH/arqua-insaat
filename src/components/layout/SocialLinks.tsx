import { getTranslations } from "next-intl/server";
import type { IconType } from "react-icons";
import { FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { socialLinksMock, type SocialPlatform } from "@/lib/mock/social";

const ICONS: Record<SocialPlatform, IconType> = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
};

/**
 * "Follow us" block — gold label + gold rule + a row of social icons.
 * Used in the Footer and on the Contact page. Server component; links come
 * from `socialLinksMock` (→ Strapi `ContactInfo` later). Icons are monochrome
 * and go gold on hover to match the site's restraint.
 */
export async function SocialLinks({ className }: { className?: string }) {
  const t = await getTranslations("Common");

  return (
    <div className={className}>
      <p className="text-gold text-xs uppercase tracking-[0.25em]">
        {t("followUs")}
      </p>
      <span aria-hidden className="mt-3 block h-px w-16 bg-gold" />
      <ul className="mt-5 flex items-center gap-5">
        {socialLinksMock.map((social) => {
          const Icon = ICONS[social.platform];
          return (
            <li key={social.platform}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex text-foreground/75 transition-colors hover:text-gold"
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
