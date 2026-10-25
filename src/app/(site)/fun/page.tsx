import type { Metadata } from "next";

import { SecondaryHero } from "@/components/SecondaryHero";
import { FlexibleContentRenderer } from "@/components/FlexibleContentRenderer";
import { getPageContent } from "@/lib/wordpress";

const PAGE_ID = 162;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent(PAGE_ID);

  return {
    title: page.title,
  };
}

export default async function FunPage() {
  const page = await getPageContent(PAGE_ID);

  return (
    <>
      {page.secondaryHero && (
        <SecondaryHero
          title={page.title}
          label={page.heroText}
          backgroundImage={page.secondaryHero.backgroundImage}
          backgroundImageAlt={page.secondaryHero.backgroundImageAlt}
          badgeImage={page.secondaryHero.badgeImage}
          badgeAlt={page.secondaryHero.badgeAlt}
          badgeWidth={page.secondaryHero.badgeWidth}
          badgeHeight={page.secondaryHero.badgeHeight}
        />
      )}

      <FlexibleContentRenderer blocks={page.blocks} />
    </>
  );
}