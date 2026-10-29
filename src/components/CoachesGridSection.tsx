
import {
  WordPressImage,
  type WordPressImageData,
} from "@/components/WordPressImage";

type Coach = {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageSources?: WordPressImageData["sources"];
};

type CoachesGridSectionProps = {
  intro?: string;
  coaches: Coach[];
};

export function CoachesGridSection({
  intro,
  coaches,
}: CoachesGridSectionProps) {
  return (
    <section
      className={
        intro
          ? "w-full py-16 lg:py-20"
          : "w-full pb-16 pt-12 lg:pb-20 lg:pt-16"
      }
    >
      <div className="container-site">
        {intro && (
          <div className="mx-auto max-w-4xl">
            <div className="whitespace-pre-line text-lg leading-relaxed text-white/90 lg:text-xl">
              {intro}
            </div>
          </div>
        )}

        <div
          className={
            intro
              ? "mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
              : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {coaches.map((coach, index) => (
            <CoachCard
              key={`${coach.name}-${index}`}
              coach={coach}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type CoachCardProps = {
  coach: Coach;
};

function CoachCard({ coach }: CoachCardProps) {
  return (
    <article className="overflow-hidden rounded-[20px] bg-foreground text-white">
      <div className="relative aspect-[1/1] w-full overflow-hidden">
        <WordPressImage
          image={{
            src: coach.imageSrc,
            alt: coach.imageAlt ?? coach.name,
            width: coach.imageWidth,
            height: coach.imageHeight,
            sources: coach.imageSources,
          }}
          alt={coach.imageAlt ?? coach.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="px-5 py-4 text-secondary">
        <h3 className="text-2xl font-extrabold uppercase leading-none lg:text-3xl">
          {coach.name}
        </h3>

        <p className="mt-2 text-sm font-medium uppercase leading-snug lg:text-base">
          {coach.role}
        </p>
      </div>
    </article>
  );
}
