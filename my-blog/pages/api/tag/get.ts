import { ironOption } from '@/config'
import { ISession } from '@/utils'
import Prisma from '@/utils/prisma'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
const prisma = new Prisma()

export default withIronSessionApiRoute(get, ironOption)

async function get(request: NextApiRequest, response: NextApiResponse) {
  const session: ISession = request.session
  const userId = session.user.id

  /**
   * 获取 用户关注的标签
   * tag 和 user 表是多对多
   */
  const followTags = await prisma.tag.findMany({
    where: {
      users: {
        some: {
          id: +userId, // user表的id == 当前用户的id
        },
      },
    },
    include: {
      users: true,
    },
  })

  /**
   * 获取所有标签
   */
  const allTags = await prisma.tag.findMany({
    include: {
      users: true,
    },
  })

  response.status(200).json({
    code: 200,
    data: {
      allTags,
      followTags,
    },
  })
}
