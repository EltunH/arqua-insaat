import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/mock/social";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { NavLink } from "./NavLink";
import { MobileNav } from "./MobileNav";

type NavItem = { key: string; href: string; disabled?: boolean };

// `disabled` renders the item as an inert span (same look, no navigation)
// while /projects and /contact are hidden from the demo. Remove the flags
// to restore the links.
const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects", disabled: true },
  { key: "services", href: "/#services" },
  { key: "about", href: "/#about" },
  { key: "whyUs", href: "/#why-us" },
  { key: "faq", href: "/#faq" },
  { key: "contact", href: "/contact", disabled: true },
];

export async function Header() {
  const t = await getTranslations("Nav");

  const mobileItems = NAV_ITEMS.map((item) => ({
    key: item.key,
    href: item.href,
    label: t(item.key),
    disabled: item.disabled ?? false,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <Container>
        <div className="flex items-center justify-between gap-4 py-4 md:gap-8 md:py-5">
          <Link href="/" className="flex flex-col items-start leading-none">
            <span className="font-heading text-lg tracking-wider md:text-xl">
              ARQUA
            </span>
            <span className="mt-1 text-[0.55rem] uppercase tracking-[0.3em] text-muted md:text-[0.6rem]">
              Design &amp; Build
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.key} href={item.href} disabled={item.disabled}>
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <Button
              href={WHATSAPP_URL}
              variant="outline"
              external
              className="hidden px-5 py-2.5 text-xs sm:inline-flex"
            >
              {t("cta")}
            </Button>
            <LocaleSwitcher />
            <MobileNav
              items={mobileItems}
              ctaHref={WHATSAPP_URL}
              ctaLabel={t("cta")}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
