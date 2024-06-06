"use server"

import { signInSchema } from "@/lib/types";

export const signIn = async (values: unknown) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields" }
  else return { success: 'Email sent!' }
}