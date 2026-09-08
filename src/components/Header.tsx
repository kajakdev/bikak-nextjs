"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Rólunk", href: "/rolunk" },
  { label: "Csapatok", href: "/csapatok" },
  { label: "Edzők", href: "/edzok" },
  { label: "Fun", href: "/fun" },
  { label: "Reakt", href: "/reakt" },
  { label: "Korisuli", href: "/korisuli" },
  { label: "Kapcsolat", href: "/kapcsolat" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="relative z-50 mt-7">
      {/* FELSŐ NAVBAR */}
      <div className="relative border-y-2 border-white bg-foreground">
        <div className="mx-auto flex items-center px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="absolute left-8 top-1/2 z-10 -translate-y-1/2 shrink-0"
            aria-label="Szigeti Bikák főoldal"
          >
            <Image
              src="/logo.png"
              alt="Szigeti Bikák"
              width={100}
              height={100}
              priority
              className="h-auto"
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Fő navigáció"
            className="ml-[150px] hidden items-center gap-10 xl:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative whitespace-nowrap
                  text-lg font-extrabold uppercase text-white
                  transition-opacity hover:opacity-70
                  after:absolute after:-bottom-2 after:left-0
                  after:h-[3px] after:bg-red
                  after:transition-all after:duration-200
                  ${
                    isActive(item.href)
                      ? "after:w-full"
                      : "after:w-0 hover:after:w-full"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop socials */}
          <div className="ml-auto hidden items-center gap-1 xl:flex">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex size-11 items-center justify-center rounded-xl text-white transition-opacity hover:opacity-70"
            >
              <InstagramIcon />
            </Link>

            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex size-11 items-center justify-center rounded-lg text-white transition-opacity hover:opacity-70"
            >
              <FacebookIcon />
            </Link>
          </div>

          {/* Mobile/tablet menu button */}
          <button
            type="button"
            aria-label={isOpen ? "Menü bezárása" : "Menü megnyitása"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="ml-auto flex size-12 items-center justify-center text-white xl:hidden"
          >
            <span className="relative block h-5 w-7">
              <span
                className={`absolute left-0 top-0 h-0.5 w-7 bg-current transition ${
                  isOpen ? "translate-y-[9px] rotate-45" : ""
                }`}
              />

              <span
                className={`absolute left-0 top-[9px] h-0.5 w-7 bg-current transition ${
                  isOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`absolute left-0 top-[18px] h-0.5 w-7 bg-current transition ${
                  isOpen ? "-translate-y-[9px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`overflow-hidden bg-secondary transition-[max-height,opacity] duration-300 xl:hidden ${
          isOpen
            ? "max-h-[700px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-6 pb-8">
          <nav
            aria-label="Mobil navigáció"
            className="flex flex-col border-t border-white/20"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  border-b border-white/20 py-4
                  text-xl font-extrabold uppercase
                  transition-colors
                  ${
                    isActive(item.href)
                      ? "text-red"
                      : "text-white hover:text-red"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex size-11 items-center justify-center rounded-xl border-2 border-white text-white"
            >
              <InstagramIcon />
            </Link>

            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex size-11 items-center justify-center rounded-lg border-2 border-white text-white"
            >
              <FacebookIcon />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-6"
      fill="currentColor"
    >
      <path d="M13.8 22v-9h3l.45-3.5H13.8V7.25c0-1.02.28-1.71 1.73-1.71H17.4V2.4c-.32-.04-1.43-.14-2.72-.14-2.7 0-4.55 1.65-4.55 4.68V9.5H7.08V13h3.05v9h3.67Z" />
    </svg>
  );
}