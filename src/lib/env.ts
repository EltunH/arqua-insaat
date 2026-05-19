import "server-only";
import { z } from "zod";

const schema = z.object({
  STRAPI_URL: z.string().url(),
  STRAPI_API_TOKEN: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  REVALIDATE_SECRET: z.string().optional(),
});

const parsed = schema.safeParse({
  STRAPI_URL: process.env.STRAPI_URL,
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
});

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors,
  );
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
