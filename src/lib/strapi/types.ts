/**
 * Strapi v5 response shapes.
 *
 * Note: Strapi v5 flattened the response — collection items no longer
 * wrap fields in `attributes`. Fields live directly on the entry.
 *   v4: { data: [{ id, attributes: { title } }] }
 *   v5: { data: [{ id, documentId, title }] }
 */

export type StrapiMediaFormat = {
  name: string;
  url: string;
  width: number;
  height: number;
  size: number;
  mime: string;
};

export type StrapiMedia = {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
  mime: string;
  size: number;
};

export type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type StrapiMeta = {
  pagination?: StrapiPagination;
};

export type StrapiCollectionResponse<T> = {
  data: T[];
  meta: StrapiMeta;
};

export type StrapiSingleResponse<T> = {
  data: T;
  meta: StrapiMeta;
};

export type StrapiErrorResponse = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details?: unknown;
  };
};
