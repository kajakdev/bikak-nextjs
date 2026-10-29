"use client";

import { useCookieConsent } from "@/components/CookieConsentProvider";

export function CookieSettingsButton() {
  const { openSettings } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className="text-sm text-white/70 underline underline-offset-4 transition hover:text-white"
    >
      Cookie beállítások
    </button>
  );
}