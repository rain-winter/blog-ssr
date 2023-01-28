import { format } from 'date-fns'
import md5 from 'md5'
import http from '@/utils/http'
import { encode } from 'js-base64'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOption } from '@/config'
import { ISession } from '@/utils'
import Prisma from '@/utils/prisma'
import { User } from '@prisma/client'

const prisma = new Prisma()

export default withIronSessionApiRoute(login, ironOption)

async function login(req: NextApiRequest, response: NextApiResponse) {
  const session: ISession = req.session
  const { phone, verify, identity_type = 'phone' } = req.body
  console.log(phone, verify)
  const users = await prisma.user.findMany()
  console.log(users)
  // 比对内存中的验证码和表单传过来的
  if (String(session.verifyCode) == String(verify)) {
    const userauth = await prisma.userAuth.findFirst({
      where: {
        identity_type,
        identifier: phone,
      },
      include: {
        User: true,
      },
    })
    console.log(userauth)

    if (userauth) {
      // 存在了 保存到session
      const user = userauth.User
      session.user = user
      await session.save()
      
      response.status(200).json({
        code: 200,
        msg: '登录成功',
        data: userauth,
      })
    } else {
      // 新用户，注册
      const user = await prisma.user.create({
        data: {
          nickname: `用户_${Math.floor(Math.random() * 1000)}`,
          avatar: '/images/1.png',
          userAuths: {
            create: [
              {
                identifier: phone,
                identity_type,
                credential: session.verifyCode,
              },
            ],
          },
        },
      })
      session.user = user
      await session.save()

      response.status(200).json({
        code: 200,
        msg: '登录成功',
        data: userauth,
      })
    }
  } else {
    response.status(200).json({
      code: -1,
      msg: '验证码错误',
    })
  }
}
