"use client";

import Image from "next/image";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/Button";

type CoachSlide = {
  src: string;
  alt: string;
  size?: "large" | "small";
};

type CoachesSectionProps = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  images: CoachSlide[];
};

export function CoachesSection({
  title,
  description,
  ctaLabel,
  ctaHref,
  images,
}: CoachesSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
    dragFree: false,
  });

  const goPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const goNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <section className="w-full">
      <div className="container-site">
        <div className="relative w-full overflow-hidden rounded-[24px]">
          
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              z-0
              bg-[url('/section-bg-gradient.jpg')]
              bg-[length:100%_auto]
              bg-left-top
              bg-no-repeat
            "
          />

          <div className="relative z-10 grid w-full grid-cols-12 px-6 py-24 lg:px-12">
            {/* Title */}
            <div className="col-span-12 lg:col-span-3">
              <h2 className="heading-page text-white">
                {title}
              </h2>
            </div>

            {/* Description + arrows */}
            <div
              className="
                col-span-12
                mt-6
                flex
                flex-col
                gap-8
                lg:col-span-9
                lg:mt-0
                lg:flex-row
                lg:items-start
                lg:justify-between
                lg:gap-12
              "
            >
              <p className="max-w-4xl text-lg text-white">
                {description}
              </p>

              <div className="flex shrink-0 gap-4">
                <SliderButton
                  direction="left"
                  onClick={goPrev}
                  label="Előző képek"
                />

                <SliderButton
                  direction="right"
                  onClick={goNext}
                  label="Következő képek"
                />
              </div>
            </div>

            {/* Carousel */}
            <div className="col-span-12 mt-10 lg:col-span-9 lg:col-start-4">
              <div
                ref={emblaRef}
                className="overflow-hidden"
              >
                <div className="-ml-4 flex touch-pan-y">
                  {images.map((image, index) => {
                    const isLarge = image.size === "large";

                    return (
                      <div
                        key={`${image.src}-${index}`}
                        className={`
                          min-w-0
                          shrink-0
                          grow-0
                          pl-4

                          ${
                            isLarge
                              ? `
                                basis-[88%]
                                sm:basis-[70%]
                                md:basis-[60%]
                                lg:basis-[55%]
                                xl:basis-[48%]
                              `
                              : `
                                basis-[70%]
                                sm:basis-[48%]
                                md:basis-[38%]
                                lg:basis-[30%]
                                xl:basis-[26%]
                              `
                          }
                        `}
                      >
                        <div className="relative h-[220px] overflow-hidden rounded-lg sm:h-[260px] md:h-[300px] lg:h-[320px] xl:h-[340px]">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes={
                              isLarge
                                ? "(max-width: 640px) 88vw, (max-width: 1024px) 60vw, 48vw"
                                : "(max-width: 640px) 70vw, (max-width: 1024px) 38vw, 26vw"
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-10 flex justify-start lg:justify-end">
                <Button
                  label={ctaLabel}
                  href={ctaHref}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type SliderButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
  label: string;
};

function SliderButton({
  direction,
  onClick,
  label,
}: SliderButtonProps) {
  const iconSrc =
    direction === "left"
      ? "/arrow-prev.svg"
      : "/arrow-next.svg";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="
        flex
        size-12
        items-center
        justify-center
        transition
        hover:scale-105
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
      "
    >
      <Image
        src={iconSrc}
        alt=""
        width={48}
        height={48}
        className="h-full w-full object-contain"
      />
    </button>
  );
}