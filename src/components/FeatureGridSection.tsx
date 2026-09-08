import Image from "next/image";

type CounterItem = {
  value?: string | number;
  iconSrc?: string;
  iconAlt?: string;
  lines: string[];
};

type CounterGridSectionProps = {
  items: CounterItem[];
};

export function FeatureGridSection({
  items,
}: CounterGridSectionProps) {
  return (
    <section className="w-full py-12 lg:py-16">
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <CounterCard
              key={index}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CounterCard({
  item,
}: {
  item: CounterItem;
}) {
  return (
    <div className="flex min-h-[155px] items-center gap-8 rounded-[20px] bg-[#18086b] px-8 py-7 lg:px-9">

      {/* NUMBER OR ICON */}
      <div className="shrink-0">
        {item.iconSrc ? (
          <div className="relative size-[64px]">
            <Image
              src={item.iconSrc}
              alt={item.iconAlt ?? ""}
              fill
              className="object-contain"
              sizes="64px"
            />
          </div>
        ) : (
          <div className="text-[86px] font-extrabold leading-none text-red lg:text-[100px]">
            {item.value}
          </div>
        )}
      </div>

      {/* TEXT */}
      <div className="text-lg leading-relaxed text-white lg:text-xl">
        {item.lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}