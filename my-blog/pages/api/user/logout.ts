import { ironOption } from '@/config'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { ISession } from '@/utils'
import { Cookie } from 'next-cookie'

export default withIronSessionApiRoute(logout, ironOption)

async function logout(request: NextApiRequest, response: NextApiResponse) {
  const session: ISession = request.session
  const cookie = Cookie.fromApiRoute(request, response)

  //   清空session
  await session.destroy()
  // TODO next-cookie 清除cookie
  cookie.remove('TomasUser')

  response.status(200).json({
    code: 200,
    data: {},
    msg: '退出成功',
  })
}
