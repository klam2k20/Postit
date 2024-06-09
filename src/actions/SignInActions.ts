"use server"

import { signIn as authSignIn } from '@/auth';
import { getUserByEmail } from '@/lib/prisma';

import { signInSchema } from "@/lib/types";
import bcrypt from 'bcryptjs';

export const signIn = async (values: unknown) => {
  /**
   * Revalidate sign up form inputs
   */
  const validatedFields = signInSchema.safeParse(values);
  if (!validatedFields.success) return { error: "All fields are required. Please fill out all fields." }

  const { email, password } = validatedFields.data;

  try {
    /**
     * Validate credentials before calling signIn from Auth to 
     * prevent error
     */

    const user = await getUserByEmail(email);

    if (!user || !user.password) return { error: "Invalid email or password. Please try again." }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) return { error: "Invalid email or password. Please try again." }

    /**
     * Verify the email is verified
     */
    if (!user.emailVerified) return { error: 'Please verify your email before logging in. Check your inbox for a verification link.' }

    await authSignIn('credentials', { email, password, redirect: false })
    return { success: 'Sign in successful!' }
  } catch (e) {
    console.error('Sign In Error:', e);
    return { error: 'Something went wrong on our end. Please try again later.' }
  }
}