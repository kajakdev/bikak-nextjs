import type { CSSProperties } from "react";

export type WordPressImageData = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  sources?: {
    src: string;
    width: number;
  }[];
};

type Props = {
  image: WordPressImageData;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  fill?: boolean;
};

export function WordPressImage({
  image,
  alt,
  sizes = "100vw",
  priority = false,
  className,
  style,
  fill = false,
}: Props) {
  const candidates = [
    ...(image.sources ?? []),
    ...(image.width
      ? [{ src: image.src, width: image.width }]
      : []),
  ].filter((item) => item.width > 0 && item.src);

  const unique = Array.from(
    new Map(
      candidates.map((item) => [item.width, item])
    ).values()
  ).sort((a, b) => a.width - b.width);

  const srcSet = unique.length
    ? unique
        .map((item) => `${item.src} ${item.width}w`)
        .join(", ")
    : undefined;

  return (
    <img
      src={image.src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt ?? image.alt ?? ""}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      width={fill ? undefined : image.width}
      height={fill ? undefined : image.height}
      className={className}
      style={
        fill
          ? {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              ...style,
            }
          : style
      }
    />
  );
}