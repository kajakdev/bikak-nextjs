import { SectionCard } from "@/components/SectionCard";
import { CoachesGridSection } from "@/components/CoachesGridSection";
import { FeatureGridSection } from "@/components/FeatureGridSection";

import type {
  FlexibleContentBlock,
  SectionCardBlock,
  TextBlock,
  CoachesGridBlock,
  FeatureGridBlock,
} from "@/types/flexible-content";

type FlexibleContentRendererProps = {
  blocks: FlexibleContentBlock[];
};

function SectionCardRenderer({
  block,
}: {
  block: SectionCardBlock;
}) {
  return (
    <SectionCard
      title={block.title}
      lead={block.lead}
      description={
        <div
          className="space-y-4"
          dangerouslySetInnerHTML={{
            __html: block.description,
          }}
        />
      }
      images={block.images}
      imagePosition={block.imagePosition}
      layout={block.layout}
      eyebrow={block.eyebrow}
      ctaLabel={block.ctaLabel}
      ctaHref={block.ctaHref}
      badgeImage={block.badgeImage}
      badgeAlt={block.badgeAlt}
      badgeWidth={block.badgeWidth}
      badgeHeight={block.badgeHeight}
    />
  );
}

function TextBlockRenderer({
  block,
}: {
  block: TextBlock;
}) {
  if (!block.text) {
    return null;
  }

  return (
    <section className="w-full pt-16 lg:pt-20">
      <div className="container-site">
        <div className="mx-auto max-w-4xl">
          <div
            className="
              space-y-6
              text-lg
              leading-relaxed
              text-white/90
              lg:text-xl
              [&_strong]:font-bold
              [&_strong]:text-white
              [&_ul]:list-disc
              [&_ul]:pl-7
              [&_ol]:list-decimal
              [&_ol]:pl-7
            "
            dangerouslySetInnerHTML={{
              __html: block.text,
            }}
          />
        </div>
      </div>
    </section>
  );
}

function CoachesGridRenderer({
  block,
}: {
  block: CoachesGridBlock;
}) {
  return (
    <CoachesGridSection
      coaches={block.coaches}
    />
  );
}

function FeatureGridRenderer({
  block,
}: {
  block: FeatureGridBlock;
}) {
  if (block.items.length === 0) {
    return null;
  }

  return (
    <FeatureGridSection
      items={block.items}
    />
  );
}

export function FlexibleContentRenderer({
  blocks,
}: FlexibleContentRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case "section_card":
            return (
              <SectionCardRenderer
                key={block.id}
                block={block}
              />
            );

          case "text_block":
            return (
              <TextBlockRenderer
                key={block.id}
                block={block}
              />
            );

          case "coaches_grid":
            return (
              <CoachesGridRenderer
                key={block.id}
                block={block}
              />
            );

          case "feature_grid":
            return (
              <FeatureGridRenderer
                key={block.id}
                block={block}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}