import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from "next-auth"
import "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { getUserByEmail } from "./lib/prisma"
import { signInSchema } from "./lib/types"


export default {
  pages: {
    signIn: '/sign-in',
    error: '/auth-error'
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    Credentials({
      /**
       * Validate the given email/password
       */
      async authorize(credentials) {
        const validatedFields = signInSchema.safeParse(credentials);

        if (!validatedFields.success) throw new Error('User not found')

        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);

        if (!user || !user.password) throw new Error('User not found')

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) throw new Error('Invalid credentials')

        if (!user.emailVerified) throw new Error('Please verify your email before logging in. Check your inbox for a verification link.')
        return user;
      }
    })
  ],
} satisfies NextAuthConfig
