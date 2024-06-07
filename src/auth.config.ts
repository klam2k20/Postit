import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "./lib/prisma"
import { signInSchema } from "./lib/types"

export default {
  providers: [
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

        return user;
      }
    })
  ]
} satisfies NextAuthConfig
