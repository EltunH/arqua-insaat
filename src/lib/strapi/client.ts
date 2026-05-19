import "server-only";
import axios, { type AxiosInstance, AxiosError } from "axios";
import qs from "qs";
import { unstable_cache } from "next/cache";
import { env } from "@/lib/env";
import type {
  StrapiCollectionResponse,
  StrapiSingleResponse,
  StrapiErrorResponse,
} from "./types";

/**
 * Single axios instance for Strapi REST API.
 * - baseURL ends with /api so callers pass endpoint paths like "/projects"
 * - qs serializer (Strapi expects nested filter/populate syntax)
 * - Bearer token only sent if STRAPI_API_TOKEN env is set (Public role works without it)
 * - 10s timeout
 */
export const strapi: AxiosInstance = axios.create({
  baseURL: `${env.STRAPI_URL}/api`,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
    ...(env.STRAPI_API_TOKEN
      ? { Authorization: `Bearer ${env.STRAPI_API_TOKEN}` }
      : {}),
  },
  paramsSerializer: (params) => qs.stringify(params, { encodeValuesOnly: true }),
});

/**
 * Normalize axios errors into a single error message with status + URL.
 */
function explainAxiosError(err: unknown, urlHint: string): string {
  if (err instanceof AxiosError) {
    const status = err.response?.status ?? "?";
    const data = err.response?.data as StrapiErrorResponse | undefined;
    const detail = data?.error?.message ?? err.message;
    return `Strapi ${status} — ${urlHint} — ${detail}`;
  }
  return `Strapi request failed — ${urlHint} — ${String(err)}`;
}

type FetchOptions = {
  locale?: string;
  query?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number;
};

const DEFAULT_REVALIDATE = 3600;

/**
 * Server-only fetch helper for Strapi collections.
 *
 * Axios doesn't integrate with Next.js's fetch cache, so we wrap with
 * `unstable_cache` to get ISR + tag-based revalidation. Tags from `opts.tags`
 * are passed through so `revalidateTag()` in route handlers can invalidate.
 */
export function strapiCollection<T>(
  endpoint: string,
  opts: FetchOptions = {},
) {
  const { locale, query = {}, tags = [], revalidate = DEFAULT_REVALIDATE } =
    opts;
  const params = { ...query, ...(locale ? { locale } : {}) };
  const cacheKey = [endpoint, JSON.stringify(params)];

  const fetcher = unstable_cache(
    async (): Promise<StrapiCollectionResponse<T>> => {
      try {
        const res = await strapi.get<StrapiCollectionResponse<T>>(endpoint, {
          params,
        });
        return res.data;
      } catch (err) {
        throw new Error(explainAxiosError(err, endpoint));
      }
    },
    cacheKey,
    { revalidate, tags: ["strapi", ...tags] },
  );

  return fetcher();
}

/**
 * Server-only fetch helper for Strapi single types or single entries.
 */
export function strapiSingle<T>(endpoint: string, opts: FetchOptions = {}) {
  const { locale, query = {}, tags = [], revalidate = DEFAULT_REVALIDATE } =
    opts;
  const params = { ...query, ...(locale ? { locale } : {}) };
  const cacheKey = [endpoint, JSON.stringify(params)];

  const fetcher = unstable_cache(
    async (): Promise<StrapiSingleResponse<T>> => {
      try {
        const res = await strapi.get<StrapiSingleResponse<T>>(endpoint, {
          params,
        });
        return res.data;
      } catch (err) {
        throw new Error(explainAxiosError(err, endpoint));
      }
    },
    cacheKey,
    { revalidate, tags: ["strapi", ...tags] },
  );

  return fetcher();
}
