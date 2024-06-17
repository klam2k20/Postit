"use server"

import { sendForgotPasswordEmail } from "@/lib/email";
import { createForgotPasswordToken, getUserByEmail } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/types";

export const forgotPassword = async (values: unknown) => {
  try {
    const validatedFields = forgotPasswordSchema.safeParse(values);


    if (!validatedFields.success) return { error: "Email is required." }
    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email);

    if (!existingUser) return { error: 'Email not found. Please check and try again, or sign up for a new account.' }

    const newToken = await createForgotPasswordToken(email);

    await sendForgotPasswordEmail(email, newToken.token)
    return { success: 'Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.' }
  }
  catch (e) {
    console.error('Forgot Password Error: ', e)
    return { error: 'Something went wrong on our end. Please try again later.' }
  }

}