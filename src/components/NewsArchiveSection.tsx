import { NewsCard } from "@/components/NewsCard";
import type { NewsItem } from "@/types/news";

type NewsArchiveSectionProps = {
  news: NewsItem[];
};

export function NewsArchiveSection({
  news,
}: NewsArchiveSectionProps) {
  if (news.length === 0) {
    return null;
  }

  const featuredNews = news.slice(0, 2);
  const remainingNews = news.slice(2);

  return (
    <section className="w-full py-16 lg:py-20">
      <div className="container-site">
        {/* Két legfrissebb hír */}
        {featuredNews.length > 0 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {featuredNews.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                featured
              />
            ))}
          </div>
        )}

        {/* További hírek */}
        {remainingNews.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {remainingNews.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}