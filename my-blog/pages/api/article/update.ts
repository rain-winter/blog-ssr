import { ironOption } from '@/config'
import { ISession } from '@/utils'
import { EXCEPTION_ARTICLE } from '@/utils/code'
import Prisma from '@/utils/prisma'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(update, ironOption)

async function update(request: NextApiRequest, response: NextApiResponse) {
  const prisma = new Prisma()
  const session: ISession = request.session
  const { articleId = 0, title, content } = request.body
  const res = await prisma.article.update({
    where: {
      id: +articleId,
    },
    data: {
      title,
      content,
    },
  })

  console.log(res)
  if (res) {
    response.status(200).json({
      code: 200,
      data: res,
      msg: '更新成功',
    })
  } else {
    response.status(200).json({ ...EXCEPTION_ARTICLE })
  }
}
