export const ironOption = {
  cookieName: process.env.SESSION_COOKIE_NAME as string,
  password: process.env.SESSION_COOKIE_PASSWORD as string,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    maxAge: 24 * 60 * 60 * 1000, // 一天
    secure: process.env.NODE_ENV === 'production',
  },
}

export const verifyOption = {
  AccountId: process.env.NEXT_PUBLIC_AccountId,
  appId: process.env.NEXT_PUBLIC_AppId,
  AuthToken: process.env.NEXT_PUBLIC_AuthToken,
}

export const oauthOptions = {
  githubClientID: process.env.NEXT_PUBLIC_GithubClientID,
  githubSecrect: process.env.NEXT_PUBLIC_GithubSecrect,
}
