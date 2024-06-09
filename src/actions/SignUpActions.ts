"use server"

import db from "@/lib/db";
import { createVerificationToken, getUserByEmail } from "@/lib/prisma";
import { signUpSchema } from "@/lib/types";
import bcrypt from 'bcryptjs';

export const signUp = async (values: unknown) => {
  /**
   * Revalidate sign up form inputs
   */
  const validatedFields = signUpSchema.safeParse(values);
  if (!validatedFields.success)
    return { error: "All fields are required. Please fill out all fields." }

  const { name, email, password } = validatedFields.data;

  try {
    /**
     * Check that an existing account doesn't exist with this email
     */
    const existingUser = await getUserByEmail(email);

    if (existingUser)
      return { error: 'This email address is already registered. Please use a different email or log in.' }

    /**
     * Create a new account
     */
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    const token = await createVerificationToken(email);

    return { success: 'Registration successful! Please check your email to verify your account.' }
  } catch (e) {
    console.error('Register Error:', e);
    return { error: 'Something went wrong on our end. Please try again later.' }
  }
}