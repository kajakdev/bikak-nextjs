import Image from "next/image";

type ProcessItem = {
  iconSrc: string;
  iconAlt?: string;
  description: string;
};

type MonthlyProcessSectionProps = {
  eyebrow?: string;
  title: string;
  items: ProcessItem[];
};

export function MonthlyProcessSection({
  eyebrow,
  title,
  items,
}: MonthlyProcessSectionProps) {
  return (
    <section className="w-full py-8">
      <div className="container-site">
        <div className="section-block rounded-[24px] px-6 py-14 text-white sm:px-10 lg:px-12 lg:py-16">
          
          {/* HEADER */}
          <div className="text-center">
            {eyebrow && (
              <p className="eyebrow text-red">
                {eyebrow}
              </p>
            )}

            <h2 className="heading-section mt-2">
              {title}
            </h2>
          </div>

          {/* ITEMS */}
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
            {items.map((item, index) => (
              <div
                key={`${item.description}-${index}`}
                className="flex flex-col items-center text-center"
              >
                {/* NUMBER */}
                <div
                  className="
                    flex size-[80px] items-center justify-center
                    rounded-full border-[3px] border-white
                    text-2xl font-bold
                  "
                >
                  {index + 1}
                </div>

                {/* ICON */}
                <div className="relative mt-10 size-[125px]">
                  <Image
                    src={item.iconSrc}
                    alt={item.iconAlt ?? ""}
                    fill
                    className="object-contain"
                    sizes="125px"
                  />
                </div>

                {/* DESCRIPTION */}
                <p className="mt-10 max-w-[270px] text-base leading-relaxed text-white/90 lg:text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}