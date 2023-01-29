import { ironOption } from '@/config'
import { ISession } from '@/utils'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import Prisma from '@/utils/prisma'
import { EXCEPTION_ARTICLE } from '@/utils/code'

export default withIronSessionApiRoute(publish, ironOption)

async function publish(request: NextApiRequest, response: NextApiResponse) {
  const prisma = new Prisma()
  const session: ISession = request.session
  const { title, content } = request.body

  const res = await prisma.article.create({
    data: {
      title,
      content,
      userId: session.user.id,
    },
  })
  if (res) {
    response.status(200).json({
      code: 200,
      data: res,
      msg: '发布成功',
    })
  } else {
    response.status(200).json({ ...EXCEPTION_ARTICLE })
  }
}
