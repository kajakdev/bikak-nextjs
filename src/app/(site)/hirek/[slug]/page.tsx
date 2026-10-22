import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNewsBySlug } from "@/lib/wordpress";

type NewsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    return {
      title: "Hír nem található",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images:
        article.imageSrc &&
        !article.imageSrc.startsWith("/news/placeholder")
          ? [{ url: article.imageSrc }]
          : [],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: NewsPageProps) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="w-full">
      <div className="container-site py-16 lg:py-24">
        {/* Teljes híroldal egységes szélességgel */}
        <div className="mx-auto w-full max-w-4xl">

          {/* Vissza a hírekhez */}
          <Link
            href="/hirek"
            className="
              group hidden shrink-0 items-center gap-3
              text-md font-extrabold uppercase text-white
              transition-colors hover:text-red
              sm:flex
            "
          >
            <Image
                className="h-[20px] w-[20px] mr-1 hover:mr-2 transition-all duration-300 rotate-180"
                src="/arrow.svg"
                alt="Arrow"
                width={20}
                height={20}
            />
            <span>Összes hír</span>
          </Link>

          {/* Fejléc */}
          <header className="mt-10">
            {/* Dátum */}
            {article.date && (
              <time
                dateTime={article.date}
                className="eyebrow text-red"
              >
                {formatDate(article.date)}
              </time>
            )}

            {/* Cím */}
            <h1 className="heading-page mt-3 text-white">
              {article.title}
            </h1>

            {/* Kivonat */}
            {article.excerpt && (
              <p className="mt-6 text-xl font-medium leading-relaxed text-white/80 lg:text-2xl">
                {article.excerpt}
              </p>
            )}
          </header>

          {/* WordPress kiemelt kép */}
          {article.imageSrc && (
            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[24px] lg:mt-12">
              <Image
                src={article.imageSrc}
                alt={article.imageAlt || article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          )}

          {/* WordPress cikk tartalma */}
          {article.content && (
            <div
              className="
                news-content mt-12
                text-lg leading-relaxed text-white/90
                lg:mt-16 lg:text-xl
              "
              dangerouslySetInnerHTML={{
                __html: article.content,
              }}
            />
          )}

          {/* Vissza a hírekhez */}
          <div className="mt-16 border-t border-white/20 pt-8">
            <Link
              href="/hirek"
              className="
                group hidden shrink-0 items-center gap-3
                text-md font-extrabold uppercase text-white
                transition-colors hover:text-red
                sm:flex
              "
            >
              <Image
                  className="h-[20px] w-[20px] mr-1 hover:mr-2 transition-all duration-300 rotate-180"
                  src="/arrow.svg"
                  alt="Arrow"
                  width={20}
                  height={20}
              />
              <span>Vissza a hírekhez</span>
            </Link>
          </div>

        </div>
      </div>
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