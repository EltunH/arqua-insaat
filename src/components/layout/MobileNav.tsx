"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { useActiveSection } from "@/lib/hooks/useActiveSection";

type NavItem = { key: string; href: string; label: string };

type Props = {
  items: readonly NavItem[];
  ctaHref: string;
  ctaLabel: string;
};

export function MobileNav({ items, ctaHref, ctaLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const activeSection = useActiveSection(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dialog = (
    <div
      style={{ backgroundColor: "#030f02" }}
      className={cn(
        "fixed inset-0 z-60 transition-opacity duration-300 ease-out lg:hidden",
        open ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-(--container-px) py-5">
          <span className="flex flex-col items-start leading-none">
            <span className="font-heading text-xl tracking-wider">ARQUA</span>
            <span className="mt-1 text-[0.6rem] uppercase tracking-[0.3em] text-muted">
              Design &amp; Build
            </span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center text-foreground transition-colors hover:text-gold"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M5 5l12 12M17 5l-12 12"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-7 px-6">
          {items.map((item) => {
            const isAnchor = item.href.includes("#");
            const sectionId = isAnchor ? item.href.split("#")[1] : null;
            let isActive = false;
            if (isAnchor) {
              isActive = activeSection === sectionId;
            } else if (item.href === "/") {
              isActive = pathname === "/" && activeSection === null;
            } else {
              isActive = pathname.startsWith(item.href);
            }
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "font-heading text-3xl uppercase tracking-[0.12em] transition-colors hover:text-gold",
                  isActive ? "text-gold" : "text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border px-(--container-px) py-6">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center bg-gold px-7 py-4 text-sm font-medium uppercase tracking-[0.15em] text-background transition-colors hover:bg-gold-light"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex h-10 w-10 cursor-pointer items-center justify-center text-foreground transition-colors hover:text-gold lg:hidden"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M3 7h18M3 17h18"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {mounted && createPortal(dialog, document.body)}
    </>
  );
}
