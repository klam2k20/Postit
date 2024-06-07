"use server"

import { signIn as authSignIn } from '@/auth';

import { signInSchema } from "@/lib/types";
import { DEFAULT_SIGNIN_ROUTE } from '@/routes';
import { AuthError } from 'next-auth';

export const signIn = async (values: unknown) => {
  /**
   * Revalidate sign up form inputs
   */
  const validatedFields = signInSchema.safeParse(values);
  if (!validatedFields.success) return { error: "All fields are required. Please fill out all fields." }

  const { email, password } = validatedFields.data;

  try {
    await authSignIn('credentials', { email, password, redirectTo: DEFAULT_SIGNIN_ROUTE })
    return { success: 'Sign in successful!' }
  } catch (e) {
    if (e instanceof AuthError) {
      if (e.type == "CallbackRouteError")
        return { error: "Invalid email or password. Please try again." }
      else return { error: 'Something went wrong on our end. Please try again later.' }
    }

    /**
     * When redirecting after a successful sign in, an error is thrown
     */
    throw e;
  }
}