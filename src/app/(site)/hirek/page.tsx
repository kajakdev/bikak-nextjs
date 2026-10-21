import type { Metadata } from "next";

import { NewsArchiveSection } from "@/components/NewsArchiveSection";
import { getAllNews } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Hírek",
  description:
    "A Szigeti Bikák legfrissebb hírei, eredményei és eseményei.",
};

export default async function NewsPage() {
  const news = await getAllNews();

  return <NewsArchiveSection news={news} />;
}