import { ironOption, oauthOptions } from '@/config'
import { ISession } from '@/utils'
import { setCookie } from '@/utils/func'
import http from '@/utils/http'
import Prisma from '@/utils/prisma'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { Cookie } from 'next-cookie'

export default withIronSessionApiRoute(redirect, ironOption)

async function redirect(request: NextApiRequest, response: NextApiResponse) {
  const prisma = new Prisma()
  const session: ISession = request.session
  const cookie = Cookie.fromApiRoute(request, response)

  // http://localhost:3000/api/oauth/redirect?code=xxxxx
  // github返回的url中含有code

  const { code } = request?.query || {}
  console.log('--------code------')
  console.log(code)
  console.log('--------------')
  const githubClientID = oauthOptions.githubClientID
  const githubSecrect = oauthOptions.githubSecrect
  const url = `https://github.com/login/oauth/access_token`

  // 1
  let res = await http.post(
    url,
    {
      client_id: githubClientID,
      client_secret: githubSecrect,
      code,
    },
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )
  console.log('111111res-----11111111111')
  console.log(res)
  console.log('1111111res--1111111111')

  const { access_token } = res as any
  // 2
  const githubUserInfo = await http.get('https://api.github.com/user', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,

    },
  })
  console.log(githubUserInfo)
  //   查询是否有用户
  const userAuth = await prisma.userAuth.findFirst({
    where: {
      identity_type: 'github',
      identifier: githubClientID,
    },
    include: {
      User: true,
    },
  })
  console.log('userauth')
  console.log(userAuth)
  console.log('userauth')
  if (userAuth) {
    // 之前登录过的用户，直接从user获取数据，并且更新credential
    userAuth.credential = access_token
    // 更新一下session
    const user = userAuth.User
    console.log('--------------------')
    console.log(userAuth.User)
    console.log('--------------------')

    session.user = user
    await session.save()
    setCookie(cookie, user)

    response.writeHead(302, {
      Location: '/',
    })
  } else {
    // 这里是没有登录的。需要注册
    const { login = '', avatar_url = '' } = githubUserInfo as any
    const user = await prisma.user.create({
      data: {
        nickname: login,
        avatar: avatar_url,
        // 同时创建 userauth表
        userAuths: {
          create: [
            // {
            //   identifier: githubClientID,
            //   identity_type: 'github',
            //   credential: access_token,
            // },
          ],
        },
      },
    })
    console.log('------------')
    console.log(user)
    console.log('------------')
  }
  // response.writeHead(302, {
  //   Location: '/'
  // });
  response.status(200).json({
    code: 200,
    data: { access_token },
    msg: '登录成功',
  })
}
