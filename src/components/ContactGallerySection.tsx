"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { sendContactForm } from "@/actions/contact";

type ContactGallerySectionProps = {
  galleryImageSrc: string;
  galleryImageAlt: string;
  galleryHref: string;

  mapImageSrc: string;
  mapImageAlt: string;

  address: string;
  addressHref: string;
  email: string;
  phone: string;
};

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
};

export function ContactGallerySection({
  galleryImageSrc,
  galleryImageAlt,
  galleryHref,
  mapImageSrc,
  mapImageAlt,
  address,
  addressHref,
  email,
  phone,
}: ContactGallerySectionProps) {
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

    const name = String(
      formData.get("name") ?? ""
    ).trim();

    const phoneValue = String(
      formData.get("phone") ?? ""
    ).trim();

    const emailValue = String(
      formData.get("email") ?? ""
    ).trim();

    const message = String(
      formData.get("message") ?? ""
    ).trim();

    const nextErrors: FormErrors = {};

    // Név
    if (!name) {
      nextErrors.name =
        "Kérjük, add meg a neved.";
    }

    // Email
    if (!emailValue) {
      nextErrors.email =
        "Kérjük, add meg az email címed.";
    } else {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailValue)) {
        nextErrors.email =
          "Érvénytelen email cím.";
      }
    }

    // Üzenet
    if (!message) {
      nextErrors.message =
        "Kérjük, írj üzenetet.";
    } else if (message.length > 3000) {
      nextErrors.message =
        "Az üzenet legfeljebb 3000 karakter lehet.";
    }

    // Link spam
    const urls =
      message.match(/https?:\/\/\S+/gi) ?? [];

    if (urls.length > 2) {
      nextErrors.message =
        "Az üzenet legfeljebb 2 linket tartalmazhat.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    formData.set(
      "startedAt",
      String(startedAt.current)
    );

    setIsPending(true);

    const result =
      await sendContactForm(formData);

    setIsPending(false);

    if (!result.success) {
      setIsSuccess(false);
      setFormMessage(result.message);
      return;
    }

    form.reset();
    startedAt.current = Date.now();

    setIsSuccess(true);
    setFormMessage(
      "Köszönjük az üzenetet! Hamarosan válaszolunk."
    );
  }

  return (
    <section className="w-full py-16 lg:py-20">
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {/* GALLERY */}
          <article className="overflow-hidden rounded-[24px] bg-white text-secondary">
            <div className="px-8 pt-8">
              <h2 className="heading-section">
                Galéria
              </h2>
            </div>

            <div className="mt-6">
              <div className="relative h-[320px] sm:h-[380px] xl:h-[420px]">
                <Image
                  src={galleryImageSrc}
                  alt={galleryImageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            <div className="px-8">
              <Button
                label="Megnézem"
                href={galleryHref}
              />
            </div>
          </article>

          {/* CONTACT */}
          <article className="overflow-hidden rounded-[24px] bg-white text-secondary">
            <div className="px-8 pt-8">
              <h2 className="heading-section">
                Kapcsolat
              </h2>
            </div>

            <div className="mt-6">
              <div className="relative h-[320px] sm:h-[380px] xl:h-[330px]">
                <Image
                  src={mapImageSrc}
                  alt={mapImageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            <div className="space-y-1 px-8 py-6 text-lg">
              <p className="font-bold">
                Szigeti Bikák SE
              </p>

              <p>
                Cím:{" "}
                <Link
                  href={addressHref}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2"
                >
                  {address}
                </Link>
              </p>

              <p>
                Email:{" "}
                <Link
                  href={`mailto:${email}`}
                  className="underline underline-offset-2"
                >
                  {email}
                </Link>
              </p>

              <p>
                Telefon:{" "}
                <Link
                  href={`tel:${phone.replace(/\s/g, "")}`}
                >
                  {phone}
                </Link>
              </p>
            </div>
          </article>

          {/* FORM */}
          <article className="rounded-[24px] bg-white p-8 pb-2 text-secondary md:col-span-2 xl:col-span-1">
            <h2 className="heading-section">
              Írj nekünk
            </h2>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-6 flex h-full flex-col"
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

              <div className="space-y-4">
                <FormInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Név"
                  error={errors.name}
                />

                <FormInput
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Telefon"
                  error={errors.phone}
                />

                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  error={errors.email}
                />

                <div>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Üzenet"
                    rows={6}
                    maxLength={3000}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message
                        ? "message-error"
                        : undefined
                    }
                    className={`
                      w-full
                      resize-none
                      rounded-lg
                      border-2
                      px-5
                      py-4
                      text-lg
                      outline-none
                      transition
                      focus:ring-2
                      focus:ring-secondary/20
                      ${
                        errors.message
                          ? "border-red"
                          : "border-neutral-300 focus:border-secondary"
                      }
                    `}
                  />

                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-2 text-sm font-medium text-red"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {formMessage && (
                <p
                  className={`
                    mt-5 text-sm font-medium px-4 py-3 rounded-lg border
                    ${
                      isSuccess
                        ? "text-secondary bg-green-500/10 border-green-500"
                        : "text-red bg-red-500/10 border-red-500"
                    }
                  `}
                >
                  {formMessage}
                </p>
              )}

              <div className="mt-6">
                <Button
                  label={
                    isPending
                      ? "Küldés..."
                      : "Elküldöm"
                  }
                  type="submit"
                />
              </div>
            </form>
          </article>

        </div>
      </div>
    </section>
  );
}

type FormInputProps = {
  id: string;
  name: string;
  type:
    | "text"
    | "email"
    | "tel";
  placeholder: string;
  error?: string;
};

function FormInput({
  id,
  name,
  type,
  placeholder,
  error,
}: FormInputProps) {
  return (
    <div>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${id}-error`
            : undefined
        }
        className={`
          w-full
          rounded-lg
          border-2
          px-5
          py-4
          text-lg
          outline-none
          transition
          focus:ring-2
          focus:ring-secondary/20
          ${
            error
              ? "border-red"
              : "border-neutral-300 focus:border-secondary"
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