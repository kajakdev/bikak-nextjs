import type { NewsItem } from "@/types/news";

const WORDPRESS_URL = process.env.WORDPRESS_URL;

type WordPressNews = {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
      alt_text: string;
    }[];
  };
};

function mapNews(post: WordPressNews): NewsItem {
  const image = post._embedded?.["wp:featuredmedia"]?.[0];

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered.replace(/<[^>]*>/g, ""),
    date: post.date.slice(0, 10),
    excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
    content: post.content.rendered,
    imageSrc: image?.source_url ?? "/news/placeholder.jpg",
    imageAlt: image?.alt_text ?? "",
    href: `/hirek/${post.slug}`,
  };
}

async function fetchNews(
  query: string
): Promise<WordPressNews[]> {
  if (!WORDPRESS_URL) {
    throw new Error("Hiányzik a WORDPRESS_URL környezeti változó.");
  }

  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wp/v2/news?${query}`,
    {
      next: {
        revalidate: 300,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `WordPress API hiba: ${response.status}`
    );
  }

  return response.json();
}

export async function getLatestNews(
  limit = 3
): Promise<NewsItem[]> {
  const posts = await fetchNews(
    new URLSearchParams({
      per_page: String(limit),
      orderby: "date",
      order: "desc",
      _embed: "1",
    }).toString()
  );

  return posts.map(mapNews);
}

export async function getAllNews(): Promise<NewsItem[]> {
  const posts = await fetchNews(
    new URLSearchParams({
      per_page: "100",
      orderby: "date",
      order: "desc",
      _embed: "1",
    }).toString()
  );

  return posts.map(mapNews);
}

export async function getNewsBySlug(
  slug: string
): Promise<NewsItem | null> {
  const posts = await fetchNews(
    new URLSearchParams({
      slug,
      _embed: "1",
    }).toString()
  );

  return posts[0] ? mapNews(posts[0]) : null;
}