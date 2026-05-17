"use client";

import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";

const LOCALE_LABELS: Record<Locale, string> = {
  az: "AZ",
  en: "EN",
  ru: "RU",
  tr: "TR",
};

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(next: Locale) {
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-foreground hover:text-gold transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {LOCALE_LABELS[locale]}
        <span
          className={cn(
            "text-[0.6rem] transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 min-w-[80px] bg-surface border border-border rounded-md py-2 shadow-xl"
        >
          {routing.locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                onClick={() => switchLocale(l)}
                className={cn(
                  "w-full text-left px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-elevated",
                  l === locale ? "text-gold" : "text-foreground",
                )}
              >
                {LOCALE_LABELS[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
