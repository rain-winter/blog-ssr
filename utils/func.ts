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

// TODO 使用iconfont字体库图标
import { createFromIconfontCN } from '@ant-design/icons'
export const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3221129_a8h99sq1xki.js',
})
