"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

type Props = {
  images: string[];
  /** Server-rendered text overlay (tagline, heading, CTA). */
  children: React.ReactNode;
};

/**
 * Background image slider for the Hero. Client component so Swiper can run;
 * the localized text overlay is passed in as `children` from the server
 * `Hero` so translations stay server-side. Arrows drive the Swiper instance.
 *
 * Layering matches the original Hero: background at `-z-10`, text at its
 * natural level, arrows last (`z-10`) so they stay clickable.
 */
export function HeroSlider({ images, children }: Props) {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <>
      <div className="absolute inset-0">
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={1}
          loop
          speed={900}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          className="h-full w-full"
        >
          {images.map((src, i) => (
            <SwiperSlide key={src}>
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Overlays sit above the slides (Swiper sets z-index:1) but stay
            pointer-transparent so touch-drag still reaches the slider. */}
        <div className="pointer-events-none absolute inset-0 z-2 bg-black/45" />
        <div className="pointer-events-none absolute inset-0 z-2 bg-linear-to-r from-black/55 via-black/20 to-transparent" />
      </div>

      {children}

      <div className="absolute right-5 bottom-6 z-20 flex items-center gap-3 lg:right-8 lg:bottom-10">
        <SliderArrow
          direction="prev"
          onClick={() => swiperRef.current?.slidePrev()}
        />
        <SliderArrow
          direction="next"
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>
    </>
  );
}

function SliderArrow({
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
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
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
