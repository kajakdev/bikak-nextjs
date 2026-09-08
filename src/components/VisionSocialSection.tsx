import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";

type VisionSocialSectionProps = {
  visionTitle: string;
  visionText: string;
  visionImageSrc: string;
  visionImageAlt: string;
  visionHref: string;
  visionBtnLabel: string;
  facebookHref: string;
  instagramHref: string;
};

export function VisionSocialSection({
  visionTitle,
  visionText,
  visionImageSrc,
  visionImageAlt,
  visionHref,
  visionBtnLabel,
  facebookHref,
  instagramHref,
}: VisionSocialSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background py-16">
      <div className="container-site">
        
        {/* Background graphic */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/section-bg.png')] bg-contain bg-top bg-no-repeat opacity-40"
        />

        <div className="relative w-full">
          <div className="grid w-full gap-10 lg:grid-cols-[2fr_1fr] lg:gap-6">
            
            {/* LEFT */}
            <div>
              <h2 className="heading-page mb-8 text-white">
                Víziónk
              </h2>

              <article className="overflow-hidden rounded-[24px] bg-white">
                <div className="relative aspect-[16/8] w-full">
                  <Image
                    src={visionImageSrc}
                    alt={visionImageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>

                <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-9">
                  <p className="text-lg leading-relaxed">
                    {visionText}
                  </p>

                  <div className="mt-7">
                    <Button
                      label={visionBtnLabel}
                      href={visionHref}
                    />
                  </div>
                </div>
              </article>
            </div>

            {/* RIGHT */}
            <aside>
              <h2 className="heading-page mb-8 text-white">
                Kövess minket!
              </h2>

              <div className="overflow-hidden rounded-[24px] bg-white p-4">
                {/* Facebook embed */}
                <div className="w-full bg-neutral-100">
                  <iframe
                    title="Szigeti Bikák Facebook"
                    src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                      facebookHref
                    )}&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                    width="100%"
                    height="500"
                    className="block w-full"
                    style={{ border: "none", overflow: "hidden" }}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
              </div>

              <Link
                href={instagramHref}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center justify-between rounded-[24px] bg-foreground px-6 py-6 transition text-white hover:opacity-90"
              >
                <div className="flex items-center gap-4">
                  <InstagramIcon />

                  <div>
                    <p className="text-3xl uppercase font-bold text-white">
                      Szigeti Bikák
                    </p>

                    <p className="text-sm font-bold uppercase text-white">
                      az Instagramon
                    </p>
                  </div>
                </div>

                <Image
                    className="h-[40px] w-[40px] ml-2 hover:ml-3 transition-all duration-300"
                    src="/arrow.svg"
                    alt="Arrow"
                    width={40}
                    height={40}
                />
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-14 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}