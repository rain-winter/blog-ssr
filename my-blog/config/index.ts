export const ironOption = {
  cookieName: process.env.SESSION_COOKIE_NAME as string,
  password: process.env.SESSION_COOKIE_PASSWORD as string,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    maxAge: 24 * 60 * 60,
    secure: process.env.NODE_ENV === 'production',
  },
}

export const verifyOption = {
  AccountId: process.env.AccountId,
  appId: process.env.appId,
  AuthToken: process.env.AuthToken,
}
