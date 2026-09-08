"use client";

import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { sendJoinUsForm } from "@/actions/join-us";

type FormErrors = {
  childName?: string;
  age?: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
};

export function JoinUsSection() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formMessage, setFormMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const startedAt = useRef(Date.now());

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isPending) {
      return;
    }

    setErrors({});
    setFormMessage("");
    setIsSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const childName = String(
      formData.get("childName") ?? ""
    ).trim();

    const age = String(
      formData.get("age") ?? ""
    ).trim();

    const parentName = String(
      formData.get("parentName") ?? ""
    ).trim();

    const parentEmail = String(
      formData.get("parentEmail") ?? ""
    ).trim();

    const parentPhone = String(
      formData.get("parentPhone") ?? ""
    ).trim();

    const nextErrors: FormErrors = {};

    // Gyermek neve
    if (!childName) {
      nextErrors.childName =
        "Kérjük, add meg a gyermek nevét.";
    }

    // Életkor
    if (!age) {
      nextErrors.age =
        "Kérjük, add meg a gyermek életkorát.";
    } else {
      const numericAge = Number(age);

      if (
        Number.isNaN(numericAge) ||
        numericAge < 3 ||
        numericAge > 18
      ) {
        nextErrors.age =
          "Az életkornak 3 és 18 év között kell lennie.";
      }
    }

    // Szülő neve
    if (!parentName) {
      nextErrors.parentName =
        "Kérjük, add meg a szülő nevét.";
    }

    // Email
    if (!parentEmail) {
      nextErrors.parentEmail =
        "Kérjük, add meg a szülő email címét.";
    } else {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(parentEmail)) {
        nextErrors.parentEmail =
          "Érvénytelen email cím.";
      }
    }

    // Telefonszám
    if (!parentPhone) {
      nextErrors.parentPhone =
        "Kérjük, add meg a szülő telefonszámát.";
    }

    // Ha van frontend hiba, nem hívjuk meg a szervert
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    // Aktuális botvédelmi idő hozzáadása
    formData.set(
      "startedAt",
      String(startedAt.current)
    );

    setIsPending(true);

    const result =
      await sendJoinUsForm(formData);

    setIsPending(false);

    if (!result.success) {
      setIsSuccess(false);
      setFormMessage(result.message);
      return;
    }

    form.reset();

    // Következő beküldéshez új kezdési idő
    startedAt.current = Date.now();

    setIsSuccess(true);
    setFormMessage(
      "Köszönjük a jelentkezést! Hamarosan felvesszük veletek a kapcsolatot."
    );
  }

  return (
    <section className="w-full py-16 lg:py-20">
      <div className="container-site">
        <div className="rounded-[24px] bg-foreground px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
          <h2 className="heading-section text-white">
            Csatlakozz hozzánk
          </h2>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8"
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

            <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
              <JoinFormField
                id="childName"
                name="childName"
                label="Név"
                type="text"
                error={errors.childName}
              />

              <JoinFormField
                id="age"
                name="age"
                label="Kor"
                type="number"
                min="3"
                max="18"
                error={errors.age}
              />

              <JoinFormField
                id="parentName"
                name="parentName"
                label="Szülő neve"
                type="text"
                error={errors.parentName}
              />

              <JoinFormField
                id="parentEmail"
                name="parentEmail"
                label="Szülő email címe"
                type="email"
                error={errors.parentEmail}
              />

              <JoinFormField
                id="parentPhone"
                name="parentPhone"
                label="Szülő telefonszáma"
                type="tel"
                error={errors.parentPhone}
              />
            </div>

            {formMessage && (
              <p
                className={`
                  mt-6 text-base font-medium
                  ${
                    isSuccess
                      ? "text-white bg-green-500/10 border-green-500"
                      : "text-red bg-red-500/10 border-red-500"
                  }
                `}
              >
                {formMessage}
              </p>
            )}

            <div className="mt-10">
              <Button
                label={
                  isPending
                    ? "Küldés..."
                    : "Csatlakozunk"
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

type JoinFormFieldProps = {
  id: string;
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "number";
  min?: string;
  max?: string;
  error?: string;
};

function JoinFormField({
  id,
  name,
  label,
  type,
  min,
  max,
  error,
}: JoinFormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-base text-white"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        min={min}
        max={max}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${id}-error`
            : undefined
        }
        className={`
          h-16
          w-full
          rounded-lg
          border-2
          bg-white
          px-5
          text-lg
          text-secondary
          outline-none
          transition
          focus:ring-2
          focus:ring-red/20
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