"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

type Props = {
  images: string[];
  title: string;
};

/**
 * Project detail gallery as a Swiper (one large image per slide). Client
 * component; mirrors the [[hero-slider]] arrow style for consistency. Adds an
 * editorial "01 / 03" counter. Drag/swipe works out of the box.
 */
export function ProjectGallery({ images, title }: Props) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [active, setActive] = useState(0);
  const multiple = images.length > 1;

  return (
    <div>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative aspect-4/3 w-full overflow-hidden">
              <Image
                src={src}
                alt={`${title} — ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {multiple ? (
        <div className="mt-6 flex items-center justify-between">
          <span className="font-heading text-sm tracking-[0.2em] text-gold/90">
            {String(active + 1).padStart(2, "0")}
            <span className="text-foreground/40">
              {" "}
              / {String(images.length).padStart(2, "0")}
            </span>
          </span>
          <div className="flex items-center gap-3">
            <GalleryArrow
              direction="prev"
              onClick={() => swiperRef.current?.slidePrev()}
            />
            <GalleryArrow
              direction="next"
              onClick={() => swiperRef.current?.slideNext()}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function GalleryArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border-strong/40 text-foreground/60 transition-colors hover:border-gold hover:text-gold"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={direction === "prev" ? "rotate-180" : ""}
        aria-hidden
      >
        <path
          d="M3 7h8M7 3l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
