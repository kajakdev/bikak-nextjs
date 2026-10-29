
"use client";

import { useCookieConsent } from "@/components/CookieConsentProvider";

type ConsentEmbedProps = {
  service: "facebook" | "googleMaps";
  src: string;
  title: string;
  height?: number;
};

export function ConsentEmbed({
  service,
  src,
  title,
  height = 500,
}: ConsentEmbedProps) {
  const {
    preferences,
    hasConsentChoice,
    openSettings,
  } = useCookieConsent();

  const isAllowed =
    hasConsentChoice && preferences[service];

  if (isAllowed) {
    return (
      <iframe
        title={title}
        src={src}
        width="100%"
        height={height}
        loading="lazy"
        className="block w-full border-0"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    );
  }

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-[#18086b] px-6 py-10 text-center text-white"
      style={{ minHeight: height }}
    >
      <p className="text-xl font-extrabold">
        {service === "facebook"
          ? "Facebook-tartalom"
          : "Google Maps térkép"}
      </p>

      <p className="max-w-sm text-sm leading-relaxed text-white/80">
        A külső tartalom megjelenítéséhez engedélyezned
        kell a szolgáltatást a cookie beállításokban.
      </p>

      <button
        type="button"
        onClick={openSettings}
        className="rounded-xl bg-red px-6 py-3 font-bold text-white transition hover:opacity-90"
      >
        Cookie beállítások
      </button>
    </div>
  );
}
