"use client";

import Image from "next/image";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

type HeroSlide = {
  imageSrc: string;
  imageAlt: string;
  badge: string;
};

type HomeHeroSliderProps = {
  slides: HeroSlide[];
};

export function HomeHeroSlider({
  slides,
}: HomeHeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden border-t-[6px] border-red">
      {/* CAROUSEL */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={`${slide.imageSrc}-${index}`}
              className="relative min-w-0 flex-[0_0_100%]"
            >
              <div className="relative h-[520px] sm:h-[600px] lg:h-[680px] xl:h-[760px]">
                <Image
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />

                {/* finom overlay, hogy a badge/nav jobban olvasható legyen */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-black/5"
                />

                {/* BADGE */}
                <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
                  <div
                    className="
                      rounded-b-[10px]
                      bg-red
                      px-8
                      py-3
                      text-center
                      text-base
                      font-extrabold
                      uppercase
                      text-white
                      sm:px-12
                      lg:text-lg
                    "
                  >
                    {slide.badge}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PREV */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Előző slide"
        className="
          absolute
          left-6
          top-1/2
          z-30
          size-14
          -translate-y-1/2
          transition-transform
          hover:scale-105
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-red
          lg:left-14
          lg:size-16
        "
      >
        <Image
          src="/arrow-prev.svg"
          alt=""
          fill
          className="object-contain"
        />
      </button>

      {/* NEXT */}
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Következő slide"
        className="
          absolute
          right-6
          top-1/2
          z-30
          size-14
          -translate-y-1/2
          transition-transform
          hover:scale-105
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-red
          lg:right-14
          lg:size-16
        "
      >
        <Image
          src="/arrow-next.svg"
          alt=""
          fill
          className="object-contain"
        />
      </button>
    </section>
  );
}