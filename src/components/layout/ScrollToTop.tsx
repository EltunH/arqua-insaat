"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gold text-background shadow-lg shadow-black/40 transition-all duration-300 hover:bg-gold-light md:bottom-8 md:right-8 md:h-14 md:w-14",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M9 14V3M4 8l5-5 5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
