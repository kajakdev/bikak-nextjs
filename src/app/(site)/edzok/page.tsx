import type { Metadata } from "next";

import { Hero } from "@/components/Hero";
import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";

import { getPageContent } from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent(130);

  return {
    title: page.title,
  };
}

export default async function CoachesPage() {
  const page = await getPageContent(130);

  return (
    <>
      <Hero
        title={page.title}
        label={page.heroText}
      />

      <FlexibleContentRenderer
        blocks={page.blocks}
      />
    </>
  );
}