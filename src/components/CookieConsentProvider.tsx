
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";

type CookiePreferences = {
  facebook: boolean;
  googleMaps: boolean;
};

type CookieConsentContextValue = {
  preferences: CookiePreferences;
  hasConsentChoice: boolean;
  openSettings: () => void;
  savePreferences: (preferences: CookiePreferences) => void;
};

const STORAGE_KEY = "szigeti-bikak-cookie-consent-v1";

const defaultPreferences: CookiePreferences = {
  facebook: false,
  googleMaps: false,
};

const CookieConsentContext =
  createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error(
      "A useCookieConsent csak CookieConsentProvider alatt használható."
    );
  }

  return context;
}

export function CookieConsentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);

  const [hasConsentChoice, setHasConsentChoice] =
    useState(false);

  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [draftPreferences, setDraftPreferences] =
    useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored) as {
          facebook?: unknown;
          googleMaps?: unknown;
        };

        const nextPreferences: CookiePreferences = {
          facebook: parsed.facebook === true,
          googleMaps: parsed.googleMaps === true,
        };

        setPreferences(nextPreferences);
        setDraftPreferences(nextPreferences);
        setHasConsentChoice(true);
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }

    setIsReady(true);
  }, []);

  const savePreferences = useCallback(
    (nextPreferences: CookiePreferences) => {
      setPreferences(nextPreferences);
      setDraftPreferences(nextPreferences);
      setHasConsentChoice(true);
      setIsOpen(false);
      setShowDetails(false);

      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(nextPreferences)
        );
      } catch {
        // A választás a jelenlegi munkamenetben így is érvényes.
      }
    },
    []
  );

  const openSettings = useCallback(() => {
    setDraftPreferences(preferences);
    setShowDetails(true);
    setIsOpen(true);
  }, [preferences]);

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        hasConsentChoice,
        openSettings,
        savePreferences,
      }}
    >
      {children}

      {isReady && isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/60 p-4 sm:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-title"
            className="w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/15 bg-[#18086b] p-6 text-white shadow-2xl sm:p-8"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red">
                  Adatvédelem
                </p>

                <h2
                  id="cookie-title"
                  className="text-2xl font-extrabold uppercase sm:text-3xl"
                >
                  Cookie beállítások
                </h2>
              </div>

              {hasConsentChoice && (
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Bezárás"
                  className="text-2xl text-white/70 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>

            <p className="text-sm leading-relaxed text-white/85 sm:text-base">
              A weboldal működéséhez szükséges technológiák
              mellett Facebook- és Google Maps-tartalmakat
              is megjelenítünk. Ezek a külső szolgáltatások
              adatokat kezelhetnek, illetve sütiket
              használhatnak. Te döntöd el, melyeket
              engedélyezed.
            </p>

            <p className="mt-3 text-sm text-white/75">
              Részletek az{" "}
              <Link
                href="/adatkezelesi-tajekoztato"
                className="font-bold underline underline-offset-4"
              >
                adatkezelési tájékoztatóban
              </Link>
              .
            </p>

            {showDetails && (
              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold">
                        Szükséges működés
                      </p>
                      <p className="mt-1 text-sm text-white/70">
                        A weboldal alapvető működéséhez és
                        a választásod megjegyzéséhez.
                      </p>
                    </div>

                    <span className="shrink-0 text-sm font-bold text-white/70">
                      Mindig aktív
                    </span>
                  </div>
                </div>

                <ConsentToggle
                  title="Facebook"
                  description="Facebook-oldalunk beágyazott tartalmának megjelenítése."
                  checked={draftPreferences.facebook}
                  onChange={(checked) =>
                    setDraftPreferences((current) => ({
                      ...current,
                      facebook: checked,
                    }))
                  }
                />

                <ConsentToggle
                  title="Google Maps"
                  description="Interaktív térképek betöltése a Google szolgáltatásából."
                  checked={draftPreferences.googleMaps}
                  onChange={(checked) =>
                    setDraftPreferences((current) => ({
                      ...current,
                      googleMaps: checked,
                    }))
                  }
                />
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() =>
                  savePreferences({
                    facebook: true,
                    googleMaps: true,
                  })
                }
                className="rounded-xl bg-red px-5 py-3 font-bold text-white transition hover:opacity-90"
              >
                Összes elfogadása
              </button>

              <button
                type="button"
                onClick={() =>
                  savePreferences(defaultPreferences)
                }
                className="rounded-xl border border-white/40 px-5 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Elutasítás
              </button>

              {showDetails ? (
                <button
                  type="button"
                  onClick={() =>
                    savePreferences(draftPreferences)
                  }
                  className="rounded-xl bg-white px-5 py-3 font-bold text-[#18086b] transition hover:bg-white/90"
                >
                  Beállítások mentése
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowDetails(true)}
                  className="rounded-xl bg-white px-5 py-3 font-bold text-[#18086b] transition hover:bg-white/90"
                >
                  Beállítások
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </CookieConsentContext.Provider>
  );
}

function ConsentToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/20 bg-white/10 p-4">
      <div>
        <p className="font-bold">{title}</p>
        <p className="mt-1 text-sm text-white/70">
          {description}
        </p>
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="size-6 shrink-0 accent-red"
      />
    </label>
  );
}
