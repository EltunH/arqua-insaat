import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LocaleSwitcher } from "./LocaleSwitcher";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "process", href: "/process" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
] as const;

export async function Header() {
  const t = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <Container>
        <div className="flex items-center justify-between gap-8 py-5">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-heading text-xl tracking-wider">ARQUA</span>
            <span className="text-muted text-[0.6rem] uppercase tracking-[0.3em]">
              Design &amp; Build
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-foreground text-xs uppercase tracking-[0.2em] hover:text-gold transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Button
              href="/contact"
              variant="outline"
              className="hidden sm:inline-flex px-5 py-2.5 text-xs"
            >
              {t("cta")}
            </Button>
            <LocaleSwitcher />
          </div>
        </div>
      </Container>
    </header>
  );
}
