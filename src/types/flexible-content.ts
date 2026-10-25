export type SectionCardImage = {
  src: string;
  alt: string;
};

export type SectionCardBlock = {
  type: "section_card";
  id: string;
  title: string;
  lead?: string;
  description: string;
  images: SectionCardImage[];
  imagePosition: "left" | "right";
  layout: "half" | "third";
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
  badgeImage?: string;
  badgeAlt?: string;
  badgeWidth?: number;
  badgeHeight?: number;
};

export type TextBlock = {
  type: "text_block";
  id: string;
  text: string;
};

export type CoachItem = {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
};

export type CoachesGridBlock = {
  type: "coaches_grid";
  id: string;
  coaches: CoachItem[];
};

export type FeatureGridItem = {
  value?: string;
  iconSrc?: string;
  iconAlt?: string;
  lines: string[];
};

export type FeatureGridBlock = {
  type: "feature_grid";
  id: string;
  items: FeatureGridItem[];
};

export type FlexibleContentBlock =
  | SectionCardBlock
  | TextBlock
  | CoachesGridBlock
  | FeatureGridBlock;