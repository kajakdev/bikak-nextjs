"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { sendTryoutForm } from "@/actions/tryout-form";

type FormErrors = {
  name?: string;
  birthDate?: string;
  ageGroup?: string;
  hockeyYears?: string;
  club?: string;
  eliteProspect?: string;
  email?: string;
  phone?: string;
};

export function TryoutFormSection() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formMessage, setFormMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrors({});
    setFormMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(
      formData.get("name") ?? ""
    ).trim();

    const birthDate = String(
      formData.get("birthDate") ?? ""
    ).trim();

    const ageGroup = String(
      formData.get("ageGroup") ?? ""
    ).trim();

    const hockeyYears = String(
      formData.get("hockeyYears") ?? ""
    ).trim();

    const club = String(
      formData.get("club") ?? ""
    ).trim();

    const eliteProspect = String(
      formData.get("eliteProspect") ?? ""
    ).trim();

    const email = String(
      formData.get("email") ?? ""
    ).trim();

    const phone = String(
      formData.get("phone") ?? ""
    ).trim();

    const nextErrors: FormErrors = {};

    // Név
    if (!name) {
      nextErrors.name = "Kérjük, add meg a neved.";
    }

    // Születési dátum
    if (!birthDate) {
      nextErrors.birthDate =
        "Kérjük, add meg a születési dátumot.";
    } else {
      const parsedBirthDate =
        new Date(`${birthDate}T00:00:00`);

      if (
        Number.isNaN(
          parsedBirthDate.getTime()
        )
      ) {
        nextErrors.birthDate =
          "Érvénytelen születési dátum.";
      } else {
        const today = new Date();

        today.setHours(23, 59, 59, 999);

        if (parsedBirthDate > today) {
          nextErrors.birthDate =
            "A születési dátum nem lehet jövőbeli.";
        }
      }
    }

    // Korosztály
    if (!ageGroup) {
      nextErrors.ageGroup =
        "Kérjük, add meg a korosztályt.";
    }

    // Hány éve jégkorongozik
    if (!hockeyYears) {
      nextErrors.hockeyYears =
        "Kérjük, add meg, hány éve jégkorongozol.";
    } else {
      const years = Number(hockeyYears);

      if (
        Number.isNaN(years) ||
        years < 0 ||
        years > 30
      ) {
        nextErrors.hockeyYears =
          "Az érték 0 és 30 között lehet.";
      }
    }

    // Klub
    if (!club) {
      nextErrors.club =
        "Kérjük, add meg, honnan érkezel.";
    }

    // EliteProspects
    if (eliteProspect) {
      try {
        const url =
          new URL(eliteProspect);

        if (
          url.protocol !== "https:" &&
          url.protocol !== "http:"
        ) {
          nextErrors.eliteProspect =
            "Érvénytelen EliteProspects link.";
        }
      } catch {
        nextErrors.eliteProspect =
          "Kérjük, teljes URL-t adj meg, például https://...";
      }
    }

    // Email
    if (!email) {
      nextErrors.email =
        "Kérjük, add meg az email címed.";
    } else {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        nextErrors.email =
          "Érvénytelen email cím.";
      }
    }

    // Telefon
    if (!phone) {
      nextErrors.phone =
        "Kérjük, add meg a telefonszámod.";
    }

    // Ha van frontend hiba, nem hívjuk meg a szervert
    if (
      Object.keys(nextErrors).length > 0
    ) {
      setErrors(nextErrors);

      return;
    }

    setIsPending(true);

    const result =
      await sendTryoutForm(formData);

    setIsPending(false);

    if (!result.success) {
      setFormMessage(result.message);
      return;
    }

    form.reset();

    setFormMessage(
      "Köszönjük a jelentkezést! Hamarosan felvesszük veled a kapcsolatot."
    );
  }

  return (
    <section className="w-full py-8">
      <div className="container-site">
        <div className="section-block rounded-[24px] px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
          <h2 className="heading-section">
            Csatlakozz hozzánk
          </h2>

          <p className="mt-4 max-w-6xl text-base leading-relaxed text-white/90 lg:text-lg">
            Ismerd meg a filozófiánkat, nézd meg,
            hogyan dolgozunk és nézzük meg együtt,
            hogyan tudunk segíteni abban, hogy te
            fejlődj és szintet lépj.
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 text-black"
          >
            {/* Honeypot */}
            <div
              className="hidden"
              aria-hidden="true"
            >
              <label htmlFor="website">
                Website
              </label>

              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <input
              type="hidden"
              name="startedAt"
              value={Date.now()}
            />

            <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
              <FormField
                id="name"
                name="name"
                label="Név"
                type="text"
                error={errors.name}
              />

              <FormField
                id="birthDate"
                name="birthDate"
                label="Születési dátum"
                type="date"
                max={getToday()}
                error={errors.birthDate}
              />

              <FormField
                id="ageGroup"
                name="ageGroup"
                label="Korosztály"
                type="text"
                error={errors.ageGroup}
              />

              <FormField
                id="hockeyYears"
                name="hockeyYears"
                label="Hány éve jégkorongozol?"
                type="number"
                min="0"
                max="30"
                error={errors.hockeyYears}
              />

              <FormField
                id="club"
                name="club"
                label="Honnan érkezel? (Klub, város)"
                type="text"
                error={errors.club}
              />

              <FormField
                id="eliteProspect"
                name="eliteProspect"
                label="EliteProspects (nem kötelező)"
                type="url"
                placeholder="https://..."
                error={errors.eliteProspect}
              />

              <FormField
                id="email"
                name="email"
                label="Email cím"
                type="email"
                error={errors.email}
              />

              <FormField
                id="phone"
                name="phone"
                label="Telefonszám"
                type="tel"
                error={errors.phone}
              />
            </div>

            {formMessage && (
              <p className="mt-6 text-base font-medium text-white bg-green-500/10 px-4 py-3 rounded-lg border border-green-500">
                {formMessage}
              </p>
            )}

            <div className="mt-10">
              <Button
                label={
                  isPending
                    ? "Küldés..."
                    : "Jelentkezem"
                }
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

type FormFieldProps = {
  id: string;
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "number"
    | "date"
    | "url";
  min?: string;
  max?: string;
  placeholder?: string;
  error?: string;
};

function FormField({
  id,
  name,
  label,
  type,
  min,
  max,
  placeholder,
  error,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-base text-white/90 lg:text-lg"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        min={min}
        max={max}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${id}-error`
            : undefined
        }
        className={`
          h-[72px]
          w-full
          rounded-[8px]
          border-2
          bg-white
          px-5
          text-lg
          text-secondary
          outline-none
          transition

          ${
            error
              ? "border-red"
              : "border-transparent focus:border-red"
          }
        `}
      />

      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-sm font-medium text-red"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function getToday() {
  const today = new Date();

  const year =
    today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}