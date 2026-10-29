import type { NewsItem } from "@/types/news";

import type {
  FlexibleContentBlock,
  SectionCardBlock,
  TextBlock,
  CoachesGridBlock,
  CoachItem,
  FeatureGridBlock,
  FeatureGridItem,
} from "@/types/flexible-content";

const WORDPRESS_URL = process.env.WORDPRESS_URL;

// --------------------------------------------------
// SEGÉDFÜGGVÉNYEK
// --------------------------------------------------

function stripHtml(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/?(?:p|div|li)>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#8211;|&#x2013;/gi, "–")
    .replace(/&#8212;|&#x2014;/gi, "—")
    .replace(/\s+/g, " ")
    .trim();
}

function getWordPressUrl(): string {
  if (!WORDPRESS_URL) {
    throw new Error(
      "Hiányzik a WORDPRESS_URL környezeti változó."
    );
  }

  return WORDPRESS_URL.replace(/\/$/, "");
}

// --------------------------------------------------
// HÍREK
// --------------------------------------------------

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
  const image =
    post._embedded?.["wp:featuredmedia"]?.[0];

  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    date: post.date.slice(0, 10),
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    imageSrc:
      image?.source_url ?? "/news/placeholder.jpg",
    imageAlt: image?.alt_text ?? "",
    href: `/hirek/${post.slug}`,
  };
}

async function fetchNews(
  query: string
): Promise<WordPressNews[]> {
  const response = await fetch(
    `${getWordPressUrl()}/wp-json/wp/v2/news?${query}`,
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

// --------------------------------------------------
// WORDPRESS KÉPEK
// --------------------------------------------------

type WordPressImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: Record<string, string | number>;
};

type WordPressImageField =
  | WordPressImage
  | number
  | false
  | null;

function getImage(
  value: WordPressImageField | undefined
): WordPressImage | null {
  if (
    value &&
    typeof value === "object" &&
    typeof value.url === "string" &&
    value.url.length > 0
  ) {
    return value;
  }

  return null;
}

function getImageSources(
  image: WordPressImage
): { src: string; width: number }[] {
  const sizes = image.sizes ?? {};

  return Object.entries(sizes)
    .flatMap(([key, value]) => {
      if (
        key === "thumbnail" ||
        key.endsWith("-width") ||
        key.endsWith("-height") ||
        typeof value !== "string"
      ) {
        return [];
      }

      const width = sizes[`${key}-width`];

      if (
        typeof width !== "number" ||
        width <= 0
      ) {
        return [];
      }

      return [
        {
          src: value,
          width,
        },
      ];
    })
    .sort((a, b) => a.width - b.width);
}

// --------------------------------------------------
// ACF FLEXIBLE CONTENT – WORDPRESS TÍPUSOK
// --------------------------------------------------

type WordPressSectionCard = {
  acf_fc_layout: "section_card";

  title?: string;
  lead?: string;
  description?: string;

  kepek?: {
    kep: WordPressImageField;
  }[];

  badge_image?: WordPressImageField;
  badge_alt?: string;

  image_position?: string;
  layout?: string;

  eyebrow?: string;

  cta_label?: string;

  cta_link?:
    | string
    | {
        url: string;
        title?: string;
        target?: string;
      }
    | null;
};

type WordPressTextBlock = {
  acf_fc_layout: "text_block";
  text?: string;
};

type WordPressCoachesGrid = {
  acf_fc_layout: "coaches_grid";

  coaches?: {
    profile_image: WordPressImageField;
    name?: string;
    role?: string;
  }[];
};

type WordPressFeatureGrid = {
  acf_fc_layout: "feature_grid";

  items?: {
    display_type?: "number" | "icon";
    value?: string | number;
    icon?: WordPressImageField;
    icon_alt?: string;
    line_1?: string;
    line_2?: string;
  }[];
};

type WordPressFlexibleBlock =
  | WordPressSectionCard
  | WordPressTextBlock
  | WordPressCoachesGrid
  | WordPressFeatureGrid
  | {
      acf_fc_layout: string;
      [key: string]: unknown;
    };

// --------------------------------------------------
// ACF FLEXIBLE CONTENT – ADATÁTALAKÍTÁS
// --------------------------------------------------

function getCtaHref(
  value: WordPressSectionCard["cta_link"]
): string | undefined {
  if (typeof value === "string") {
    return value || undefined;
  }

  if (
    value &&
    typeof value === "object" &&
    typeof value.url === "string"
  ) {
    return value.url || undefined;
  }

  return undefined;
}

function mapSectionCard(
  block: WordPressSectionCard,
  index: number
): SectionCardBlock {
  const images = (block.kepek ?? []).flatMap(
    (item) => {
      const image = getImage(item.kep);

      if (!image) {
        return [];
      }

      return [
        {
          src: image.url,
          alt:
            image.alt ||
            block.title ||
            "Szigeti Bikák",
          width: image.width,
          height: image.height,
          sources: getImageSources(image),
        },
      ];
    }
  );

  const badge = getImage(block.badge_image);

  return {
    type: "section_card",
    id: `section-card-${index}`,

    title: block.title || "",
    lead: block.lead || undefined,
    description: block.description || "",

    images,

    imagePosition:
      block.image_position === "left"
        ? "left"
        : "right",

    layout:
      block.layout === "third"
        ? "third"
        : "half",

    eyebrow: block.eyebrow || undefined,

    ctaLabel: block.cta_label || undefined,
    ctaHref: getCtaHref(block.cta_link),

    badgeImage: badge?.url,
    badgeAlt:
      block.badge_alt || badge?.alt || "",

    badgeWidth: badge?.width || 300,
    badgeHeight: badge?.height || 150,
  };
}

function mapTextBlock(
  block: WordPressTextBlock,
  index: number
): TextBlock {
  return {
    type: "text_block",
    id: `text-block-${index}`,
    text: block.text || "",
  };
}

function mapCoachesGrid(
  block: WordPressCoachesGrid,
  index: number
): CoachesGridBlock {
  const coaches: CoachItem[] = (
    block.coaches ?? []
  ).flatMap((item) => {
    const image = getImage(item.profile_image);

    if (!image) {
      return [];
    }

    return [
      {
        name: item.name || "",
        role: item.role || "",
        imageSrc: image.url,
        imageAlt:
          image.alt ||
          item.name ||
          "Szigeti Bikák edző",
      },
    ];
  });

  return {
    type: "coaches_grid",
    id: `coaches-grid-${index}`,
    coaches,
  };
}

function mapFeatureGrid(
  block: WordPressFeatureGrid,
  index: number
): FeatureGridBlock {
  const items: FeatureGridItem[] = (
    block.items ?? []
  ).map((item) => {
    const image =
      item.display_type === "icon"
        ? getImage(item.icon)
        : null;

    const lines = [
      item.line_1,
      item.line_2,
    ].filter(
      (line): line is string =>
        typeof line === "string" &&
        line.trim().length > 0
    );

    return {
      value:
        item.display_type === "icon"
          ? undefined
          : String(item.value ?? ""),

      iconSrc: image?.url,

      iconAlt:
        item.icon_alt ||
        image?.alt ||
        "",

      lines,
    };
  });

  return {
    type: "feature_grid",
    id: `feature-grid-${index}`,
    items,
  };
}

function mapFlexibleBlocks(
  blocks: WordPressFlexibleBlock[]
): FlexibleContentBlock[] {
  return blocks.flatMap<FlexibleContentBlock>(
    (block, index) => {
      switch (block.acf_fc_layout) {
        case "section_card":
          return [
            mapSectionCard(
              block as WordPressSectionCard,
              index
            ),
          ];

        case "text_block":
          return [
            mapTextBlock(
              block as WordPressTextBlock,
              index
            ),
          ];

        case "coaches_grid":
          return [
            mapCoachesGrid(
              block as WordPressCoachesGrid,
              index
            ),
          ];

        case "feature_grid":
          return [
            mapFeatureGrid(
              block as WordPressFeatureGrid,
              index
            ),
          ];

        default:
          return [];
      }
    }
  );
}

// --------------------------------------------------
// WORDPRESS OLDALAK
// --------------------------------------------------

type WordPressPage = {
  title: {
    rendered: string;
  };

  content: {
    rendered: string;
  };

  acf?: {
    oldal_blokkok?: WordPressFlexibleBlock[];

    // SECONDARY HERO
    secondary_hero_bg?: WordPressImageField;
    secondary_hero_badge?: WordPressImageField;

    // FŐOLDAL
    hero_slides?: {
      text: string;
      image: WordPressImageField;
    }[];

    vizionk_blokk?: {
      szoveg: string;
      kep: WordPressImageField;
    };

    edzoink_blokk?: {
      szoveg: string;

      slider_kepek?: {
        kep: WordPressImageField;
        szelesseg: boolean;
      }[];
    };
  };
};

async function fetchWordPressPage(
  pageId: number
): Promise<WordPressPage> {
  const response = await fetch(
    `${getWordPressUrl()}/wp-json/wp/v2/pages/${pageId}?acf_format=standard`,
    {
      next: {
        revalidate: 300,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `WordPress oldal API hiba (${pageId}): ${response.status}`
    );
  }

  return response.json();
}

// --------------------------------------------------
// ÁLTALÁNOS OLDALTARTALOM
// --------------------------------------------------

export type SecondaryHeroContent = {
  backgroundImage: string;
  backgroundImageAlt: string;
  badgeImage?: string;
  badgeAlt?: string;
  badgeWidth?: number;
  badgeHeight?: number;
};

export type WordPressPageContent = {
  title: string;
  heroText: string;
  secondaryHero: SecondaryHeroContent | null;
  blocks: FlexibleContentBlock[];
};

export async function getPageContent(
  pageId: number
): Promise<WordPressPageContent> {
  const page = await fetchWordPressPage(pageId);

  const background = getImage(
    page.acf?.secondary_hero_bg
  );

  const badge = getImage(
    page.acf?.secondary_hero_badge
  );

  const secondaryHero: SecondaryHeroContent | null =
    background
      ? {
          backgroundImage: background.url,
          backgroundImageAlt: background.alt || "",
          badgeImage: badge?.url,
          badgeAlt: badge?.alt || "",
          badgeWidth: badge?.width || 200,
          badgeHeight: badge?.height || 100,
        }
      : null;

  return {
    title: stripHtml(page.title.rendered),
    heroText: stripHtml(page.content.rendered),
    secondaryHero,
    blocks: mapFlexibleBlocks(
      page.acf?.oldal_blokkok ?? []
    ),
  };
}

export async function getPageFlexibleContent(
  pageId: number
): Promise<FlexibleContentBlock[]> {
  const page = await fetchWordPressPage(pageId);

  return mapFlexibleBlocks(
    page.acf?.oldal_blokkok ?? []
  );
}

// --------------------------------------------------
// FŐOLDAL
// WordPress oldal ID: 32
// --------------------------------------------------

export type HomeHeroSlide = {
  imageSrc: string;
  imageAlt: string;
  badge: string;
};

export type HomeCoachImage = {
  src: string;
  alt: string;
  size: "large" | "small";
};

export type HomePageContent = {
  heroSlides: HomeHeroSlide[];

  vision: {
    text: string;
    imageSrc: string;
    imageAlt: string;
  };

  coaches: {
    text: string;
    images: HomeCoachImage[];
  };

  blocks: FlexibleContentBlock[];
};

export async function getHomePageContent(): Promise<HomePageContent> {
  const page = await fetchWordPressPage(32);

  const acf = page.acf;

  // HERO SLIDER
  const heroSlides: HomeHeroSlide[] = (
    acf?.hero_slides ?? []
  ).flatMap((slide) => {
    const image = getImage(slide.image);

    if (!image) {
      return [];
    }

    return [
      {
        imageSrc: image.url,
        imageAlt:
          image.alt || slide.text || "Szigeti Bikák",
        badge: slide.text || "",
      },
    ];
  });

  // VÍZIÓNK
  const visionImage = getImage(
    acf?.vizionk_blokk?.kep
  );

  const vision = {
    text: stripHtml(
      acf?.vizionk_blokk?.szoveg ?? ""
    ),

    imageSrc:
      visionImage?.url ?? "/images/vision.jpg",

    imageAlt:
      visionImage?.alt || "Szigeti Bikák",
  };

  // EDZŐINK
  const coachImages: HomeCoachImage[] = (
    acf?.edzoink_blokk?.slider_kepek ?? []
  ).flatMap((item) => {
    const image = getImage(item.kep);

    if (!image) {
      return [];
    }

    return [
      {
        src: image.url,
        alt:
          image.alt || "Edzőink munka közben",
        size:
          item.szelesseg ? "large" : "small",
      },
    ];
  });

  const coaches = {
    text: stripHtml(
      acf?.edzoink_blokk?.szoveg ?? ""
    ),
    images: coachImages,
  };

  // FLEXIBLE CONTENT
  const blocks = mapFlexibleBlocks(
    acf?.oldal_blokkok ?? []
  );

  return {
    heroSlides,
    vision,
    coaches,
    blocks,
  };
}

export async function getHomeHeroSlides(): Promise<
  HomeHeroSlide[]
> {
  const content = await getHomePageContent();

  return content.heroSlides;
}