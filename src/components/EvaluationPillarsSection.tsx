import Image from "next/image";

type Pillar = {
  title: string;
  description: string;
  listTitle: string;
  items: string[];
  footer?: string;
};

type EvaluationPillarsSectionProps = {
  title: string;
  left: Pillar;
  right: Pillar;
};

export function EvaluationPillarsSection({
  title,
  left,
  right,
}: EvaluationPillarsSectionProps) {
  return (
    <section className="w-full py-8">
      <div className="container-site">
        <div className="section-block rounded-[24px] px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
          <h2 className="heading-section">
            {title}
          </h2>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-12">
            <PillarColumn pillar={left} />
            <PillarColumn pillar={right} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarColumn({
  pillar,
}: {
  pillar: Pillar;
}) {
  return (
    <div>
      <h3 className="text-2xl font-extrabold uppercase leading-tight">
        {pillar.title}
      </h3>

      <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/90 lg:text-lg">
        {pillar.description}
      </p>

      <p className="mt-8 text-lg font-bold lg:text-xl">
        {pillar.listTitle}
      </p>

      <div className="mt-6 space-y-4">
        {pillar.items.map((item, index) => (
          <CheckItem
            key={`${item}-${index}`}
            label={item}
          />
        ))}
      </div>

      {pillar.footer && (
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/90 lg:text-lg">
          {pillar.footer}
        </p>
      )}
    </div>
  );
}

function CheckItem({ label }: { label: string }) {
  return (
    <div
      className="
        flex
        h-[46px]
        items-center
        justify-between
        overflow-hidden
        rounded-full
        bg-gradient-to-r
        from-red
        via-[#a0005a]
        to-[#12007a]
        pl-5
      "
    >
      <span className="pr-4 text-sm font-extrabold uppercase leading-tight text-white lg:text-base">
        {label}
      </span>

      <Image
        src="/check.svg"
        alt=""
        width={46}
        height={46}
        className="size-[46px] shrink-0"
      />
    </div>
  );
}