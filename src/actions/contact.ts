"use server";

import { Resend } from "resend";

import {
  markSubmissionEmailFailed,
  markSubmissionEmailSent,
  saveFormSubmission,
} from "@/lib/form-submissions";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

type ContactFormResult = {
  success: boolean;
  message: string;
};

export async function sendContactForm(
  formData: FormData
): Promise<ContactFormResult> {
  const name = String(
    formData.get("name") ?? ""
  ).trim();

  const phone = String(
    formData.get("phone") ?? ""
  ).trim();

  const email = String(
    formData.get("email") ?? ""
  ).trim();

  const message = String(
    formData.get("message") ?? ""
  ).trim();

  const website = String(
    formData.get("website") ?? ""
  ).trim();

  const startedAt = Number(
    formData.get("startedAt")
  );

  const elapsed =
    Date.now() - startedAt;

  // Bot protection
  if (
    !startedAt ||
    elapsed < 3000
  ) {
    return {
      success: false,
      message:
        "Az üzenetet nem sikerült elküldeni. Kérjük, próbáld újra.",
    };
  }

  // Honeypot
  if (website) {
    return {
      success: false,
      message:
        "Az üzenetet nem sikerült elküldeni.",
    };
  }

  // Kötelező mezők
  if (
    !name ||
    !email ||
    !message
  ) {
    return {
      success: false,
      message:
        "Kérjük, töltsd ki a kötelező mezőket.",
    };
  }

  // Email
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !emailRegex.test(email)
  ) {
    return {
      success: false,
      message:
        "Érvénytelen email cím.",
    };
  }

  // Üzenethossz
  if (
    message.length > 3000
  ) {
    return {
      success: false,
      message:
        "Az üzenet legfeljebb 3000 karakter lehet.",
    };
  }

  // Link spam
  const urls =
    message.match(/https?:\/\/\S+/gi) ?? [];

  if (
    urls.length > 2
  ) {
    return {
      success: false,
      message:
        "Az üzenet legfeljebb 2 linket tartalmazhat.",
    };
  }

  // 1. Mentés adatbázisba
  let submissionId: string;

  try {
    submissionId =
      await saveFormSubmission({
        formType: "contact",
        name,
        email,
        phone,
        payload: {
          message,
        },
      });
  } catch (error) {
    console.error(
      "Contact form database error:",
      error
    );

    return {
      success: false,
      message:
        "Az üzenetet jelenleg nem sikerült rögzíteni. Kérjük, próbáld újra később.",
    };
  }

  // 2. Email küldés
  try {
    const { error } =
      await resend.emails.send({
        from:
          "Szigeti Bikák weboldal <onboarding@resend.dev>",
        to:
          process.env.CONTACT_EMAIL!,
        replyTo: email,
        subject:
          `Új üzenet - ${name}`,
        text: `
Új üzenet érkezett a Szigeti Bikák weboldaláról.

Név:
${name}

Telefon:
${phone || "Nincs megadva"}

Email:
${email}

Üzenet:
${message}
        `.trim(),
      });

    if (error) {
      console.error(
        "Resend error:",
        error
      );

      await markSubmissionEmailFailed(
        submissionId,
        error
      );

      return {
        success: true,
        message:
          "Köszönjük az üzenetet! Rögzítettük, de az email értesítés jelenleg nem sikerült.",
      };
    }

    await markSubmissionEmailSent(
      submissionId
    );

    return {
      success: true,
      message:
        "Köszönjük az üzenetet!",
    };
  } catch (error) {
    console.error(
      "Resend exception:",
      error
    );

    await markSubmissionEmailFailed(
      submissionId,
      error
    );

    return {
      success: true,
      message:
        "Köszönjük az üzenetet! Rögzítettük, de az email értesítés jelenleg nem sikerült.",
    };
  }
}