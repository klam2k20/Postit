import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { API_AUTH_PREFIX, AUTH_ROUTES, DEFAULT_SIGNIN_ROUTE, PUBLIC_ROUTES } from "./routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req;
  const isSignedIn = !!req.auth;
  const isAPIAuthPrefix = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if (isAPIAuthPrefix) return;
  if (isAuthRoute) {
    if (isSignedIn) return Response.redirect(new URL(DEFAULT_SIGNIN_ROUTE, nextUrl));
    return;
  }
  if (!isPublicRoute && !isSignedIn) return Response.redirect(new URL('/sign-in', nextUrl));

  return;
})

/**
 * auth is run on any path that matches matcher
 */
export const config = { matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'], }