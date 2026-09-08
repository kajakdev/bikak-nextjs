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

type TryoutFormResult = {
  success: boolean;
  message: string;
};

export async function sendTryoutForm(
  formData: FormData
): Promise<TryoutFormResult> {
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
        "A beküldés nem sikerült. Kérjük, próbáld újra.",
    };
  }

  // Honeypot
  if (website) {
    return {
      success: false,
      message:
        "A beküldés nem sikerült.",
    };
  }

  // Kötelező mezők
  if (
    !name ||
    !birthDate ||
    !ageGroup ||
    !hockeyYears ||
    !club ||
    !email ||
    !phone
  ) {
    return {
      success: false,
      message:
        "Kérjük, töltsd ki az összes kötelező mezőt.",
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

  // Jégkorongos tapasztalat
  const years =
    Number(hockeyYears);

  if (
    Number.isNaN(years) ||
    years < 0 ||
    years > 30
  ) {
    return {
      success: false,
      message:
        "Érvénytelen jégkorongos tapasztalat.",
    };
  }

  // Születési dátum
  const parsedBirthDate =
    new Date(`${birthDate}T00:00:00`);

  if (
    Number.isNaN(
      parsedBirthDate.getTime()
    )
  ) {
    return {
      success: false,
      message:
        "Érvénytelen születési dátum.",
    };
  }

  const today = new Date();

  today.setHours(
    23,
    59,
    59,
    999
  );

  if (
    parsedBirthDate >
    today
  ) {
    return {
      success: false,
      message:
        "A születési dátum nem lehet jövőbeli.",
    };
  }

  // EliteProspects URL
  if (eliteProspect) {
    try {
      const url =
        new URL(eliteProspect);

      if (
        url.protocol !== "https:" &&
        url.protocol !== "http:"
      ) {
        return {
          success: false,
          message:
            "Érvénytelen EliteProspects link.",
        };
      }
    } catch {
      return {
        success: false,
        message:
          "Érvénytelen EliteProspects link.",
      };
    }
  }

  // 1. Mentés adatbázisba
  let submissionId: string;

  try {
    submissionId =
      await saveFormSubmission({
        formType: "tryout",
        name,
        email,
        phone,
        payload: {
          birthDate,
          ageGroup,
          hockeyYears: years,
          club,
          eliteProspect:
            eliteProspect || null,
        },
      });
  } catch (error) {
    console.error(
      "Tryout database error:",
      error
    );

    return {
      success: false,
      message:
        "A jelentkezést jelenleg nem sikerült rögzíteni. Kérjük, próbáld újra később.",
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
          `Új játékos jelentkezés - ${name}`,
        text: `
Új játékos jelentkezés érkezett.

Név:
${name}

Születési dátum:
${birthDate}

Korosztály:
${ageGroup}

Hány éve jégkorongozik:
${hockeyYears}

Honnan érkezik:
${club}

EliteProspects:
${eliteProspect || "Nincs megadva"}

Email:
${email}

Telefonszám:
${phone}
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
          "Köszönjük a jelentkezést! Rögzítettük, de az email értesítés jelenleg nem sikerült.",
      };
    }

    await markSubmissionEmailSent(
      submissionId
    );

    return {
      success: true,
      message:
        "Köszönjük a jelentkezést!",
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
        "Köszönjük a jelentkezést! Rögzítettük, de az email értesítés jelenleg nem sikerült.",
    };
  }
}