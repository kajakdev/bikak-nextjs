import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { news } from "@/data/news";

type NewsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return news.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = news.find(
    (item) => item.slug === slug
  );

  if (!article) {
    return {
      title: "Hír nem található",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: NewsPageProps) {
  const { slug } = await params;

  const article = news.find(
    (item) => item.slug === slug
  );

  if (!article) {
    notFound();
  }

  return (
    <article className="w-full">
      <div className="container-site py-16 lg:py-24">
        {/* Vissza */}
        <Link
          href="/hirek"
          className="
            inline-flex items-center gap-3
            text-sm font-extrabold uppercase
            text-red transition-opacity
            hover:opacity-70
          "
        >
          <span aria-hidden="true">
            ←
          </span>

          Összes hír
        </Link>

        {/* Fejléc */}
        <header className="mt-8 max-w-5xl">
          {article.date && (
            <time
              dateTime={article.date}
              className="eyebrow text-red"
            >
              {formatDate(article.date)}
            </time>
          )}

          <h1 className="heading-page mt-3 text-white">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-6 max-w-3xl text-xl font-medium leading-relaxed text-white/80 lg:text-2xl">
              {article.excerpt}
            </p>
          )}
        </header>

        {/* Kiemelt kép */}
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[24px] lg:mt-14">
          <Image
            src={article.imageSrc}
            alt={
              article.imageAlt ??
              article.title
            }
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1600px) 100vw, 1600px"
          />
        </div>

        {/* Tartalom */}
        {article.content && (
          <div
            className="
              mx-auto mt-12 max-w-4xl
              whitespace-pre-line
              text-lg leading-relaxed text-white/90
              lg:mt-16 lg:text-xl
            "
          >
            {article.content}
          </div>
        )}
      </div>
    </article>
  );
}

function formatDate(
  date: string
) {
  return new Intl.DateTimeFormat(
    "hu-HU",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  ).format(
    new Date(`${date}T00:00:00`)
  );
}