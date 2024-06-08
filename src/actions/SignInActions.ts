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
    //TODO: Send success msg after email is verified
    return { success: 'Sign in successful!' }
  } catch (e) {
    if (e instanceof AuthError) {

      if (e.type == "CallbackRouteError" || e.type == "CredentialsSignin")
        return { error: "Invalid email or password. Please try again." }
      else if (e.type == "AccessDenied")
        return {
          error: "Please verify your email before logging in. Check your inbox for a verification link."
        }
      else return { error: 'Something went wrong on our end. Please try again later.' }
    }

    /**
     * Invoking the redirect() function throws a NEXT_REDIRECT error:
     * https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
     */
    throw e;
  }
}