import { ironOption } from '@/config'
import { ISession } from '@/utils'
import Prisma from '@/utils/prisma'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
const prisma = new Prisma()

export default withIronSessionApiRoute(follow, ironOption)

async function follow(request: NextApiRequest, response: NextApiResponse) {
  const session: ISession = request.session
  const { id: userId } = session.user

  const { tagid, type } = request.body
  let res
  // 多对多更新 关注
  if (type === 'follow') {
    res = await prisma.tag.update({
      where: {
        id: tagid,
      },
      data: {
        users: {
          // tags对应的user 当前tagid连接到当前userid
          connect: [{ id: +userId }],
        },
        follow_count: {
          increment: 1,
        },
      },
    })
  } else if (type === 'unfollow') {
    res = await prisma.tag.update({
      where: {
        id: +tagid,
      },
      data: {
        users: {
          disconnect: [{ id: +userId }],
        },
        follow_count: {
          decrement: 1,
        },
      },
    })
  }

  response.status(200).json({
    code: 200,
    data: res,
  })
}
