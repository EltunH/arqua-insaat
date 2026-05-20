import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Dev only: skip the Image Optimization cache (.next/cache/images),
    // which is keyed by URL and serves a stale optimized blob when you
    // replace a /public file under the same name. With this off in dev,
    // swapping an image just needs a browser reload — no deleting .next.
    // Production keeps full optimization.
    unoptimized: process.env.NODE_ENV !== "production",
  },
};

export default withNextIntl(nextConfig);
