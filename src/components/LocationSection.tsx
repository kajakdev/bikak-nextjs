type LocationSectionProps = {
  title: string;
  address: string;
  email: string;
  phone: string;
  venueName: string;
  venueLink?: string;
  directionsText: string;
  mapEmbedUrl: string;
};

export function LocationSection({
  title,
  address,
  email,
  phone,
  venueName,
  venueLink,
  directionsText,
  mapEmbedUrl,
}: LocationSectionProps) {
  return (
    <section className="w-full py-8">
      <div className="container-site">
        <div className="section-block overflow-hidden rounded-[24px] text-white">
          <div className="grid lg:grid-cols-[1fr_2fr]">
            
            {/* LEFT CONTENT */}
            <div className="px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
              <h2 className="heading-section">
                {title}
              </h2>

              <div className="mt-4 space-y-2 text-base leading-relaxed text-white/90 lg:text-lg">
                <p>
                  <strong className="text-white">Cím:</strong>{" "}
                  {address}
                </p>

                <p>
                  <strong className="text-white">Email:</strong>{" "}
                  <a
                    href={`mailto:${email}`}
                    className="transition-opacity hover:opacity-70"
                  >
                    {email}
                  </a>
                </p>

                <p>
                  <strong className="text-white">Telefon:</strong>{" "}
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="transition-opacity hover:opacity-70"
                  >
                    {phone}
                  </a>
                </p>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-extrabold uppercase lg:text-2xl">
                  Edzéseink helyszíne:
                </h3>

                <p className="mt-3 text-base font-bold lg:text-lg">
                  {venueName}
                </p>

                {venueLink && (
                  <a
                    href={venueLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-base text-white/90 underline underline-offset-4 transition-opacity hover:opacity-70 lg:text-lg"
                  >
                    Waze link (Kattints ide)
                  </a>
                )}
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-extrabold uppercase lg:text-2xl">
                  Megközelítés
                </h3>

                <p className="mt-3 text-base leading-relaxed text-white/90 lg:text-lg">
                  {directionsText}
                </p>
              </div>
            </div>

            {/* GOOGLE MAP */}
            <div className="relative min-h-[420px] lg:min-h-[640px]">
              <iframe
                src={mapEmbedUrl}
                title={`${title} térkép`}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}