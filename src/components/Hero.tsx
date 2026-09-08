type HeroProps = {
  title: string;
  label: string;
};

export function Hero({ title, label }: HeroProps) {
  return (
    <div className="section-hero">
      <div className="mx-auto grid w-full grid-cols-12 px-6 py-24 lg:px-12">
        <div className="col-span-8 lg:col-start-4 lg:col-span-6">
          <h1 className="heading-page text-white">
            {title}
          </h1>

          <p className="mt-4 text-lg text-white">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}