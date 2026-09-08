"use server";

import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

type JoinUsFormResult = {
  success: boolean;
  message: string;
};

export async function sendJoinUsForm(
  formData: FormData
): Promise<JoinUsFormResult> {
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
    !childName ||
    !age ||
    !parentName ||
    !parentEmail ||
    !parentPhone
  ) {
    return {
      success: false,
      message:
        "Kérjük, töltsd ki az összes kötelező mezőt.",
    };
  }

  // Életkor
  const numericAge =
    Number(age);

  if (
    Number.isNaN(numericAge) ||
    numericAge < 3 ||
    numericAge > 18
  ) {
    return {
      success: false,
      message:
        "Az életkornak 3 és 18 év között kell lennie.",
    };
  }

  // Email
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !emailRegex.test(parentEmail)
  ) {
    return {
      success: false,
      message:
        "Érvénytelen email cím.",
    };
  }

  // Resend
  const { error } =
    await resend.emails.send({
      from:
        "Szigeti Bikák weboldal <onboarding@resend.dev>",

      to:
        process.env.CONTACT_EMAIL!,

      replyTo: parentEmail,

      subject:
        `Új jelentkezés - ${childName}`,

      text: `
Új jelentkezés érkezett a Szigeti Bikák weboldaláról.

Gyermek neve:
${childName}

Kor:
${age}

Szülő neve:
${parentName}

Szülő email címe:
${parentEmail}

Szülő telefonszáma:
${parentPhone}
      `.trim(),
    });

  if (error) {
    console.error(
      "Resend error:",
      error
    );

    return {
      success: false,
      message:
        "A jelentkezést nem sikerült elküldeni. Kérjük, próbáld újra később.",
    };
  }

  return {
    success: true,
    message:
      "Köszönjük a jelentkezést!",
  };
}