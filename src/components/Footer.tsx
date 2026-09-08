import Image from "next/image";
import Link from "next/link";

const partners = [
  {
    src: "/images/partners/jozsa-photo.png",
    alt: "Józsa Photo",
  },
  {
    src: "/images/partners/clickandlike.png",
    alt: "Click and Like",
  },
  {
    src: "/images/partners/pesterzsebet.png",
    alt: "Pesterzsébet",
  },
  {
    src: "/images/partners/honda-center.png",
    alt: "Honda Center",
  },
  {
    src: "/images/partners/ppb.png",
    alt: "Pacific Premier Bank",
  },
  {
    src: "/images/partners/choc.png",
    alt: "CHOC",
  },
];

export function Footer() {
  return (
    <footer className="text-white">
      {/* Partner logos */}
      <div className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12 lg:py-14">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner) => (
              <div
                key={partner.src}
                className="flex min-h-[120px] items-center justify-center rounded-[24px] bg-white p-6"
              >
                <div className="relative h-16 w-full">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="bg-foreground">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-8 lg:grid-cols-3 lg:items-center lg:px-12">
          {/* Left */}
          <div className="text-sm leading-relaxed">
            <p>© 2026 Szigeti Bikák. Minden jog fenntartva.</p>

            <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:gap-2">
              <Link
                href="/impresszum"
                className="transition-opacity hover:opacity-70"
              >
                Impresszum
              </Link>

              <span className="hidden sm:inline">-</span>

              <Link
                href="/adatvedelmi-nyilatkozat"
                className="transition-opacity hover:opacity-70"
              >
                Adatvédelmi nyilatkozat
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-6 lg:justify-center">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="transition-opacity hover:opacity-70"
            >
              <FacebookIcon />
            </Link>

            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="transition-opacity hover:opacity-70"
            >
              <YouTubeIcon />
            </Link>

            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition-opacity hover:opacity-70"
            >
              <InstagramIcon />
            </Link>
          </div>

          {/* Right */}
          <div className="text-sm lg:text-right">
            Design with ❤️ Designabc
          </div>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-7"
      fill="currentColor"
    >
      <path d="M13.8 22v-9h3l.45-3.5H13.8V7.25c0-1.02.28-1.71 1.73-1.71H17.4V2.4c-.32-.04-1.43-.14-2.72-.14-2.7 0-4.55 1.65-4.55 4.68V9.5H7.08V13h3.05v9h3.67Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-8"
      fill="currentColor"
    >
      <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 22 12a30 30 0 0 0-.4-4.8ZM9.8 15.4V8.6l5.9 3.4-5.9 3.4Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}