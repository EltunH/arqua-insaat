import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["az", "en", "ru", "tr"],
  defaultLocale: "az",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
