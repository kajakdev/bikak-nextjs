import Image from "next/image";
import Link from "next/link";

import type { NewsItem } from "@/types/news";

type NewsCardProps = {
  item: NewsItem;
  featured?: boolean;
};

export function NewsCard({
  item,
  featured = false,
}: NewsCardProps) {
  return (
    <article className="h-full">
      <Link
        href={item.href}
        className="
          group flex h-full flex-col overflow-hidden
          rounded-[24px] bg-red
        "
      >
        {/* Kép */}
        <div
          className={`
            relative w-full overflow-hidden
            ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}
          `}
        >
          <Image
            src={item.imageSrc}
            alt={item.imageAlt ?? item.title}
            fill
            className="
              object-cover transition-transform
              duration-500 ease-out
              group-hover:scale-[1.04]
            "
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          />
        </div>

        {/* Szöveges rész */}
        <div
          className={`
            flex flex-1 flex-col justify-center px-7 py-7 lg:px-8
            ${
              featured
                ? "min-h-[150px] lg:min-h-[170px]"
                : "min-h-[150px]"
            }
          `}
        >
          {/* Dátum */}
          {item.date && (
            <time
              dateTime={item.date}
              className="
                mb-2 text-sm font-normal
                uppercase tracking-wide text-white/70
              "
            >
              {formatDate(item.date)}
            </time>
          )}

          {/* Cím */}
          <h3
            className={`
              font-extrabold uppercase leading-[1.15] text-white
              ${
                featured
                  ? "text-2xl lg:text-4xl"
                  : "text-2xl lg:text-3xl"
              }
            `}
          >
            {item.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}