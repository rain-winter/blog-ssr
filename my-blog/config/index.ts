export const ironOption = {
  cookieName: process.env.SESSION_COOKIE_NAME,
  password:  process.env.SESSION_COOKIE_PASSWORD,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
