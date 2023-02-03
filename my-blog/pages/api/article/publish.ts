import { ironOption } from '@/config'
import { ISession } from '@/utils'
import { EXCEPTION_ARTICLE } from '@/utils/code'
import Prisma from '@/utils/prisma'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(publish, ironOption)

async function publish(request: NextApiRequest, response: NextApiResponse) {
  const prisma = new Prisma()
  const session: ISession = request.session

  const { title, content, tagIds = [] } = request.body
  // console.log(tagIds) // [1,2]
  let connectArr: { id: number }[] = []
  tagIds.map((item: number) => connectArr.push({ id: item }))

  tagIds.map(async (item: number) => {
    await prisma.tag.updateMany({
      where: {
        id: item,
      },
      data: {
        article_count: {
          increment: 1,
        },
      },
    })
  })
  /**
   * TODO 创建文章 标签
   */
  const res = await prisma.article.create({
    data: {
      title,
      content,
      userId: session.user.id,
      tags: {
        connect: connectArr,
      },
    },
    include: {
      tags: {
        include: {
          users: true,
        },
      },
    },
  })

  console.log(res)
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
