import type { ImageLoaderProps } from "next/image";

export default function imageLoader({
  src,
}: ImageLoaderProps): string {
  // A WordPress képeket közvetlenül a CMS-ről töltjük.
  if (
    src.startsWith(
      "https://cms.szigetibikak.com/wp-content/uploads/"
    )
  ) {
    return src;
  }

  // Más képek esetén az eredeti URL-t használjuk.
  return src;
}
