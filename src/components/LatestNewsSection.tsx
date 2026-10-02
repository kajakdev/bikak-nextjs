import Link from "next/link";
import Image from "next/image";

import { NewsCard } from "@/components/NewsCard";
import type { NewsItem } from "@/types/news";

type LatestNewsSectionProps = {
  title?: string;
  news: NewsItem[];
};

export function LatestNewsSection({
  title = "Legfrissebb híreink",
  news,
}: LatestNewsSectionProps) {
  if (news.length === 0) {
    return null;
  }

  return (
    <section className="w-full pt-16 lg:pt-20">
      <div className="container-site">
        {/* Fejléc */}
        <div className="flex items-end justify-between gap-6">
          <h2 className="heading-section text-white">
            {title}
          </h2>

          {/* Desktop / tablet összes hír link */}
          <Link
            href="/hirek"
            className="
              group hidden shrink-0 items-center gap-3
              text-lg font-extrabold uppercase text-white
              transition-colors hover:text-red
              sm:flex
            "
          >
            <span>Összes hír</span>

            <Image
                className="h-[30px] w-[30px] ml-1 hover:ml-2 transition-all duration-300"
                src="/arrow.svg"
                alt="Arrow"
                width={30}
                height={30}
            />
          </Link>
        </div>

        {/* Hírek */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
            />
          ))}
        </div>

        {/* Mobil összes hír link */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/hirek"
            className="
              group inline-flex items-center gap-3
              text-lg font-extrabold uppercase text-white
              transition-colors hover:text-red
            "
          >
            <span>Összes hír</span>

            <Image
                className="h-[30px] w-[30px] ml-1 hover:ml-2 transition-all duration-300"
                src="/arrow.svg"
                alt="Arrow"
                width={30}
                height={30}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}