"use server"

import db from "@/lib/db"
import { getUserByEmail } from "@/lib/prisma"

export const verifyToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: {
        token
      }
    })

    if (!verificationToken) return { error: 'Invalid verification token. Please check your verification email and try again.' }

    if (verificationToken.expires < new Date()) return { error: 'Verification token has expired. Please request a new verification email.' }

    const existingUser = await getUserByEmail(verificationToken.email);

    if (!existingUser) return { error: 'The email associated with this token does not match any account. Please sign up or use a different verification link.' }

    await db.user.update({
      where: {
        id: existingUser.id
      },
      data: {
        emailVerified: new Date(),
        email: verificationToken.email
      }
    })

    await db.verificationToken.delete({
      where: {
        id: verificationToken.id
      }
    })

    return { success: 'Email verified' }
  } catch (e) {
    console.error('Verification Error:', e);
    return { error: 'Something went wrong on our end. Please try again later.' }
  }
}