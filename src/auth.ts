import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import db from "./lib/db";
import { getUserById, updateUserUsername } from "./lib/prisma";
import { nanoid } from "nanoid";

declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      username?: string | null,
    } & DefaultSession["user"]
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string,
    username?: string | null
  }
}

const prisma = db;

/**
 * Auth is designed to run in any environment that supports standard web APIs,
 * including traditional server environments and modern edge environments like Vercel's 
 * Edge Functions. Some ORMs such as Prisma is not compatible with Edge runtimes. 
 * 
 * To handle edge compatibility issues, you can split Auth's config files into multiple
 * parts:
 *  - auth.ts: will include the Prisma adapter and can be used on traditional server 
 *    environments such as server components and server actions
 *  - auth.config.ts: will not include the Prisma adapter and can be used for
 *    anything that runs on the edge such as middleware
 * 
 * Since Auth will be used in both traditional and edge environments we need to use
 * a session strategy that works on both. By default the database session strategy 
 * - stores sessions in a database - is used when using an adapter. However, since 
 * the Prisma adapter is not edge compatible we have to use the JWT strategy,
 * which uses JWT for sessions
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token }) {
      const userId = token.sub;
      if (!userId) return token;

      const user = await getUserById(userId);
      if (!user) return token;

      if (!user.username) await updateUserUsername(user.id, nanoid())

      token.id = user.id;
      token.name = user.name;
      token.username = user.username;
      token.email = user.email;
      token.picture = user.image

      return token;
    },

    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.email = token.email || "";
        session.user.image = token.picture;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
