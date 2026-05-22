"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { useActiveSection } from "@/lib/hooks/useActiveSection";

type Props = {
  href: string;
  children: React.ReactNode;
};

export function NavLink({ href, children }: Props) {
  const pathname = usePathname();
  const activeSection = useActiveSection(pathname);

  const isAnchor = href.includes("#");
  const sectionId = isAnchor ? href.split("#")[1] : null;

  let isActive = false;
  if (isAnchor) {
    isActive = activeSection === sectionId;
  } else if (href === "/") {
    isActive = pathname === "/" && activeSection === null;
  } else {
    isActive = pathname.startsWith(href);
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      if (typeof window !== "undefined") {
        if (window.location.hash) {
          window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search,
          );
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "relative text-xs uppercase tracking-[0.2em] transition-colors hover:text-gold",
        isActive ? "text-gold" : "text-foreground",
      )}
    >
      {children}
      {isActive && (
        <span
          aria-hidden
          className="absolute -bottom-2 left-0 right-0 h-px bg-gold"
        />
      )}
    </Link>
  );
}
