/**
 * Route-level loading fallback (used by `loading.tsx` files). Server
 * component, no params/translations so it renders instantly as the Suspense
 * fallback on navigation. Brand-consistent: thin gold spinner + wordmark.
 */
export function PageLoading() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center gap-7">
      <div
        aria-hidden
        className="h-9 w-9 animate-spin rounded-full border-2 border-gold/15 border-t-gold"
      />
      <span className="font-heading text-sm uppercase tracking-[0.45em] text-gold/80">
        ARQUA
      </span>
      <span className="sr-only">Loading</span>
    </div>
  );
}
