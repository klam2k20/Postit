"use server"

import { signIn as authSignIn } from '@/auth';
import { sendVerificationEmail } from '@/lib/email';
import { createVerificationToken, getUserByEmail } from '@/lib/prisma';

import { signInSchema } from "@/lib/types";
import { DEFAULT_SIGNIN_ROUTE } from '@/routes';
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
    if (!user.emailVerified) {
      const token = await createVerificationToken(email);
      await sendVerificationEmail(email, token.token)
      return { success: 'A new verification link has been sent to your email. Please check your email to verify your account.' }
    }
    await authSignIn('credentials', { email, password, redirectTo: DEFAULT_SIGNIN_ROUTE })
    return { success: 'Sign in successful!' }
  } catch (e) {
    /**
     * Using redirectTo in signIn throws a NEXT_REDIRECT error:
     * https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
     */
    throw e;
  }
}