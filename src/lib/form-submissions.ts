import "server-only";

import { supabaseAdmin } from "@/lib/supabase";

export type FormType =
  | "contact"
  | "join-us"
  | "tryout";

type SaveSubmissionParams = {
  formType: FormType;
  name?: string;
  email?: string;
  phone?: string;
  payload: Record<string, unknown>;
};

export async function saveFormSubmission({
  formType,
  name,
  email,
  phone,
  payload,
}: SaveSubmissionParams) {
  const { data, error } = await supabaseAdmin
    .from("form_submissions")
    .insert({
      form_type: formType,
      name: name || null,
      email: email || null,
      phone: phone || null,
      payload,
    })
    .select("id")
    .single();

  if (error) {
    console.error(
      "Supabase submission save error:",
      error
    );

    throw new Error(
      "A beküldést nem sikerült adatbázisba menteni."
    );
  }

  return data.id as string;
}

export async function markSubmissionEmailSent(
  id: string
) {
  const { error } = await supabaseAdmin
    .from("form_submissions")
    .update({
      email_sent: true,
      email_error: null,
    })
    .eq("id", id);

  if (error) {
    console.error(
      "Supabase email status update error:",
      error
    );
  }
}

export async function markSubmissionEmailFailed(
  id: string,
  emailError: unknown
) {
  let errorMessage: string;

  if (emailError instanceof Error) {
    errorMessage = emailError.message;
  } else if (typeof emailError === "string") {
    errorMessage = emailError;
  } else {
    try {
      errorMessage = JSON.stringify(emailError);
    } catch {
      errorMessage = "Unknown email error";
    }
  }

  const { error } = await supabaseAdmin
    .from("form_submissions")
    .update({
      email_sent: false,
      email_error: errorMessage.slice(0, 5000),
    })
    .eq("id", id);

  if (error) {
    console.error(
      "Supabase email failure update error:",
      error
    );
  }
}