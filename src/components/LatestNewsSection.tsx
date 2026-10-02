import Image from "next/image";
import Link from "next/link";

export type NewsItem = {
  id: string | number;
  title: string;
  imageSrc: string;
  imageAlt?: string;
  href: string;
};

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
        <h2 className="heading-section text-white">
          {title}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsCard({
  item,
}: {
  item: NewsItem;
}) {
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
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt ?? item.title}
            fill
            className="
              object-cover transition-transform
              duration-500 ease-out
              group-hover:scale-[1.04]
            "
            sizes="
              (max-width: 768px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
          />
        </div>

        {/* Cím */}
        <div className="flex min-h-[150px] flex-1 items-center px-7 py-7 lg:px-8">
          <h3
            className="
              text-2xl font-extrabold uppercase
              leading-[1.15] text-white
              lg:text-3xl
            "
          >
            {item.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}