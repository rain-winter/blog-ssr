/**
 * 设置cookie
 * @param cookies next-cookie
 * @param params user
 */

export const setCookie = (cookies: any, params: unknown) => {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const path = '/'
  cookies.set('TomasUser', JSON.stringify(params), { expires, path })
}

