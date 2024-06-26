const DEFAULT_SIGNIN_ROUTE = '/';

const API_AUTH_PREFIX = '/api/auth';

const PUBLIC_ROUTES: string[] = []

const AUTH_ROUTES: string[] = [
  '/sign-in', '/sign-up', '/auth-error', '/new-verification', '/forgot-password', '/reset-password'
]

export { DEFAULT_SIGNIN_ROUTE, API_AUTH_PREFIX, PUBLIC_ROUTES, AUTH_ROUTES }