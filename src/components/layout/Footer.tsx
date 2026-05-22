import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "./SocialLinks";

const FOOTER_NAV = [
  { key: "projects", href: "/projects" },
  { key: "services", href: "/#services" },
  { key: "about", href: "/#about" },
  { key: "whyUs", href: "/#why-us" },
  { key: "faq", href: "/#faq" },
  { key: "contact", href: "/contact" },
] as const;

export async function Footer() {
  const t = await getTranslations("Nav");
  const tFooter = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
          <div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-heading text-2xl tracking-wider">
                ARQUA
              </span>
              <span className="mt-1.5 text-muted text-[0.6rem] uppercase tracking-[0.3em]">
                Design &amp; Build
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed mt-4 max-w-xs">
              {tFooter("description")}
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <div className="mb-2">
              <p className="text-gold text-xs uppercase tracking-[0.25em]">
                {tFooter("navigation")}
              </p>
              <span aria-hidden className="mt-3 block h-px w-16 bg-gold" />
            </div>
            {FOOTER_NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-foreground text-sm hover:text-gold transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <div className="mb-2">
              <p className="text-gold text-xs uppercase tracking-[0.25em]">
                {tFooter("contact")}
              </p>
              <span aria-hidden className="mt-3 block h-px w-16 bg-gold" />
            </div>
            <a
              href="mailto:info@arqua.az"
              className="text-foreground text-sm hover:text-gold transition-colors"
            >
              info@arqua.az
            </a>
            <a
              href="tel:+994123456789"
              className="text-foreground text-sm hover:text-gold transition-colors"
            >
              +994 12 345 67 89
            </a>
            <SocialLinks className="mt-5" />
          </div>
        </div>

        <div className="border-t border-border py-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-subtle text-xs uppercase tracking-[0.2em]">
            © {year} ARQUA Design &amp; Build
          </p>
          <p className="text-subtle text-xs uppercase tracking-[0.2em]">
            {tFooter("rights")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
