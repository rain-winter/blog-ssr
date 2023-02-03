import { ironOption } from '@/config'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { ISession } from '@/utils'
import { EXCEPTION_USER } from '@/utils/code'
import { setCookie } from '@/utils/func'
import Prisma from '@/utils/prisma'
import { Cookie } from 'next-cookie'
const prisma = new Prisma()

export default withIronSessionApiRoute(update, ironOption)

async function update(request: NextApiRequest, response: NextApiResponse) {
  const session: ISession = request.session
  const cookie = Cookie.fromApiRoute(request, response)

  const { id: userId } = session.user
  const { nickname = '', job = '', introduce = '' } = request.body

  const user = await prisma.user.findFirst({
    where: {
      id: +userId,
    },
  })
  if (user) {
    let res = await prisma.user.update({
      where: {
        id: +userId,
      },
      data: {
        nickname,
        job,
        introduce,
      },
    })
    // TODO 设置session cookie store才会变
    session.user = res
    await session.save()
    setCookie(cookie, res)
    console.log(session.user)

    response.status(200).json({
      code: 200,
      data: res,
      msg: '更新成功',
    })
  } else {
    response.status(200).json({
      ...EXCEPTION_USER.NOT_FOUND,
    })
  }
}
