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
        {/* Vissza a hírekhez */}
        <Link
          href="/hirek"
          className="
            inline-flex items-center gap-3
            text-sm font-extrabold uppercase
            text-red transition-opacity hover:opacity-70
          "
        >
          <span aria-hidden="true">←</span>
          Összes hír
        </Link>

        {/* Cikk fejléc */}
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

        {/* WordPress kiemelt kép */}
        {article.imageSrc && (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[24px] lg:mt-14">
            <Image
              src={article.imageSrc}
              alt={article.imageAlt || article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1600px) 100vw, 1600px"
            />
          </div>
        )}

        {/* WordPress cikk tartalma */}
        {article.content && (
          <div
            className="
              news-content mx-auto mt-12 max-w-4xl
              text-lg leading-relaxed text-white/90
              lg:mt-16 lg:text-xl
            "
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          />
        )}

        {/* Vissza */}
        <div className="mx-auto mt-16 max-w-4xl border-t border-white/20 pt-8">
          <Link
            href="/hirek"
            className="
              inline-flex items-center gap-3
              text-lg font-extrabold uppercase
              text-white transition-colors hover:text-red
            "
          >
            <span aria-hidden="true">←</span>
            Vissza a hírekhez
          </Link>
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