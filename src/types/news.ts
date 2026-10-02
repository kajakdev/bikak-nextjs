export type NewsItem = {
  id: string | number;
  title: string;
  slug: string;
  imageSrc: string;
  imageAlt?: string;
  excerpt?: string;
  content?: string;
  date?: string;
  href: string;
};