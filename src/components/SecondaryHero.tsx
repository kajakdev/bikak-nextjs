import Image from "next/image";

type SecondaryHeroProps = {
  title: string;
  label?: string;
  backgroundImage: string;
  backgroundImageAlt?: string;

  badgeImage?: string;
  badgeAlt?: string;
  badgeWidth?: number;
  badgeHeight?: number;
};

export function SecondaryHero({
  title,
  label,
  backgroundImage,
  backgroundImageAlt = "",
  badgeImage,
  badgeAlt = "",
  badgeWidth = 200,
  badgeHeight = 100,
}: SecondaryHeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <Image
        src={backgroundImage}
        alt={backgroundImageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Blue overlay */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-foreground/90
          via-foreground/80
          to-foreground/70
        "
      />

      {/* Content */}
      <div className="container-site relative z-10">
        <div className="grid grid-cols-12 py-20 lg:py-24">
          <div className="col-span-12 md:col-span-9 lg:col-start-3 lg:col-span-7">

            {/* Optional badge */}
            {badgeImage && (
              <Image
                src={badgeImage}
                alt={badgeAlt}
                width={badgeWidth}
                height={badgeHeight}
                className="mb-8 h-auto w-auto max-w-[200px] object-contain"
              />
            )}

            <h1 className="heading-page text-white">
              {title}
            </h1>

            {label && (
              <p className="mt-4 max-w-3xl whitespace-pre-line text-lg leading-relaxed text-white lg:text-xl">
                {label}
              </p>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}