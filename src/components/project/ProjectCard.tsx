import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Props = {
  slug: string;
  index: number;
  title: string;
  location: string;
  year: number;
  image: string;
  featured?: boolean;
  featuredLabel: string;
  viewProjectLabel: string;
};

/**
 * Editorial project card for the /projects listing. Caption sits *below* the
 * image (gallery / monograph style) to distinguish it from the Services grid,
 * which overlays its captions. Index number and gold accents echo the WhyUs
 * and About sections.
 */
export function ProjectCard({
  slug,
  index,
  title,
  location,
  year,
  image,
  featured,
  featuredLabel,
  viewProjectLabel,
}: Props) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div className="relative aspect-4/5 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-black/45 transition-colors duration-500 group-hover:bg-black/30" />
        <span className="absolute top-5 left-5 font-heading text-sm tracking-[0.2em] text-gold/90">
          {String(index).padStart(2, "0")}
        </span>
        {featured ? (
          <span className="absolute top-5 right-5 border border-gold/50 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-gold">
            {featuredLabel}
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg uppercase tracking-[0.1em] text-foreground transition-colors duration-300 group-hover:text-gold md:text-xl">
            {title}
          </h3>
          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.25em] text-muted">
            {location} · {year}
          </p>
        </div>
        <span
          aria-hidden
          className="mt-1 hidden shrink-0 items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex"
        >
          {viewProjectLabel}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
