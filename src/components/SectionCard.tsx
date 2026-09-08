"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import { Button } from "@/components/Button";

type SectionCardImage = {
  src: string;
  alt?: string;
};

type SectionCardProps = {
  title: string;
  lead?: string;
  description: ReactNode;

  // Sima képhez
  imageSrc?: string;
  imageAlt?: string;

  // Carouselhez
  images?: SectionCardImage[];

  imagePosition?: "left" | "right";
  layout?: "half" | "third";

  eyebrow?: string;

  ctaLabel?: string;
  ctaHref?: string;

  // Jobb felső badge / logo
  badgeImage?: string;
  badgeAlt?: string;
  badgeWidth?: number;
  badgeHeight?: number;
};

export function SectionCard({
  title,
  lead,
  description,

  imageSrc,
  imageAlt,

  images,

  imagePosition = "right",
  layout = "half",

  eyebrow,

  ctaLabel,
  ctaHref,

  badgeImage,
  badgeAlt = "",
  badgeWidth = 300,
  badgeHeight = 150,
}: SectionCardProps) {
  const sliderImages =
    images && images.length > 0
      ? images
      : imageSrc
        ? [
            {
              src: imageSrc,
              alt: imageAlt ?? title,
            },
          ]
        : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: sliderImages.length > 1,
  });

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setSelectedIndex(
      emblaApi.selectedScrollSnap()
    );
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const imageOrder =
    imagePosition === "left"
      ? "order-1 lg:order-1"
      : "order-1 lg:order-2";

  const contentOrder =
    imagePosition === "left"
      ? "order-2 lg:order-2"
      : "order-2 lg:order-1";

  const gridColumns =
    layout === "third"
      ? imagePosition === "right"
        ? "lg:grid-cols-[2fr_1fr]"
        : "lg:grid-cols-[1fr_2fr]"
      : "lg:grid-cols-2";

  const contentPadding =
    layout === "third"
      ? "px-6 py-10 sm:px-10 lg:px-10 lg:py-14 xl:px-12"
      : "px-6 py-10 sm:px-10 lg:px-14 lg:py-16 xl:px-20";

  const imageHeight =
    layout === "third"
      ? "min-h-[320px] sm:min-h-[420px] lg:min-h-[410px]"
      : "min-h-[320px] sm:min-h-[420px] lg:min-h-[600px]";

  const imageSizes =
    layout === "third"
      ? "(max-width: 1024px) 100vw, 33vw"
      : "(max-width: 1024px) 100vw, 50vw";

  return (
    <section className="w-full">
      <div className="container-site">
        <div className="section-block relative mt-8 overflow-hidden rounded-[24px] text-white">
          {/* BADGE - mindig a teljes SectionCard jobb felső sarkában */}
          {badgeImage && (
            <div
              className="
                pointer-events-none
                absolute
                right-5
                top-5
                z-30
                flex
                max-h-[150px]
                items-start
                justify-end
                sm:right-8
                sm:top-8
              "
            >
              <Image
                src={badgeImage}
                alt={badgeAlt}
                width={badgeWidth}
                height={badgeHeight}
                className="
                  h-auto
                  max-h-[150px]
                  w-auto
                  max-w-[240px]
                  object-contain
                  sm:max-w-[280px]
                  lg:max-w-[320px]
                "
              />
            </div>
          )}

          <div className={`grid ${gridColumns}`}>
            {/* CONTENT */}
            <div
              className={`
                ${contentOrder}
                flex
                flex-col
                justify-center
                ${contentPadding}
                ${
                  badgeImage && imagePosition === "left"
                    ? "lg:pr-56"
                    : ""
                }
              `}
            >
              {eyebrow && (
                <p className="eyebrow text-red">
                  {eyebrow}
                </p>
              )}

              <h2
                className={`
                  heading-section
                  ${eyebrow ? "mt-2" : ""}
                `}
              >
                {title}
              </h2>

              {lead && (
                <p className="mt-6 max-w-xl text-xl font-medium leading-relaxed lg:text-2xl">
                  {lead}
                </p>
              )}

              <div
                className="
                  mt-8
                  max-w-xl
                  space-y-7
                  text-base
                  leading-relaxed
                  text-white/90
                  lg:text-lg

                  [&_strong]:font-bold
                  [&_strong]:text-white

                  [&_ul]:list-disc
                  [&_ul]:space-y-1
                  [&_ul]:pl-7

                  [&_ol]:list-decimal
                  [&_ol]:space-y-1
                  [&_ol]:pl-7
                "
              >
                {description}
              </div>

              {ctaLabel && ctaHref && (
                <div className="mt-8">
                  <Button
                    label={ctaLabel}
                    href={ctaHref}
                  />
                </div>
              )}
            </div>

            {/* IMAGE / CAROUSEL */}
            <div
              className={`
                ${imageOrder}
                relative
                overflow-hidden
                ${imageHeight}
              `}
            >
              <div
                ref={emblaRef}
                className="absolute inset-0 overflow-hidden"
              >
                <div className="flex h-full">
                  {sliderImages.map((image, index) => (
                    <div
                      key={`${image.src}-${index}`}
                      className="
                        relative
                        h-full
                        min-w-0
                        flex-[0_0_100%]
                      "
                    >
                      <Image
                        src={image.src}
                        alt={
                          image.alt ??
                          imageAlt ??
                          title
                        }
                        fill
                        priority={index === 0}
                        className="object-cover"
                        sizes={imageSizes}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* DOTS */}
              {sliderImages.length > 1 && (
                <div
                  className="
                    absolute
                    bottom-5
                    left-1/2
                    z-20
                    flex
                    -translate-x-1/2
                    items-center
                    gap-3
                  "
                >
                  {sliderImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => scrollTo(index)}
                      aria-label={`${index + 1}. kép`}
                      aria-current={
                        selectedIndex === index
                          ? "true"
                          : undefined
                      }
                      className={`
                        size-3
                        rounded-full
                        transition
                        ${
                          selectedIndex === index
                            ? "bg-red"
                            : "bg-foreground"
                        }
                      `}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}