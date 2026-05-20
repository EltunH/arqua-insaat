"use client";

import { useEffect, useState } from "react";

const TRACKED_SECTIONS = ["services", "about", "why-us", "faq"];

export function useActiveSection(pathname: string): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = TRACKED_SECTIONS.map((id) => ({
      id,
      el: document.getElementById(id),
    })).filter(
      (s): s is { id: string; el: HTMLElement } => s.el !== null,
    );

    if (elements.length === 0) {
      setActive(null);
      return;
    }

    let raf = 0;

    const update = () => {
      const triggerY = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const { id, el } of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom > triggerY) {
          current = id;
          break;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);

    const initialHash = window.location.hash.replace("#", "");
    if (initialHash && TRACKED_SECTIONS.includes(initialHash)) {
      setActive(initialHash);
    } else {
      update();
    }

    const t1 = window.setTimeout(update, 200);
    const t2 = window.setTimeout(update, 800);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return active;
}
