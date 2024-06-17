"use server"

import db from "@/lib/db";
import { getUserByEmail } from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/types";
import bcrypt from 'bcryptjs';

export const resetPassword = async (values: unknown, token: string) => {
  const validatedFields = resetPasswordSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'Error' }

  const { password, confirmPassword } = validatedFields.data;

  try {

    const forgotPasswordToken = await db.forgotPasswordToken.findUnique({
      where:
        { token: token }
    })

    if (!forgotPasswordToken) return { error: 'Invalid token. Please check your verification email and try again.' }
    if (forgotPasswordToken.expires < new Date()) return { error: 'Token has expired. Please request a new verification email.' }

    const existingUser = await getUserByEmail(forgotPasswordToken.email);
    if (!existingUser) return { error: 'The email associated with this token does not match any account. Please sign up or use a different verification link.' }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword }
    })

    await db.forgotPasswordToken.delete({
      where: { id: forgotPasswordToken.id }
    })

    return { success: 'New password set successfully.' }
  } catch (e) {
    console.error('Reset Password Error: ', e);
    return { error: 'Something went wrong on our end. Please try again later.' }
  }
}