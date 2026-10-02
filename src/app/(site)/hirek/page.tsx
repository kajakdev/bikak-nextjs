import type { Metadata } from "next";

import { NewsArchiveSection } from "@/components/NewsArchiveSection";
import { news } from "@/data/news";

export const metadata: Metadata = {
  title: "Hírek",
  description:
    "A Szigeti Bikák legfrissebb hírei, eredményei és eseményei.",
};

export default function NewsPage() {
  return (
    <NewsArchiveSection
      news={news}
    />
  );
}