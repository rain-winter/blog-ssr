import { ironOption } from '@/config'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(follow, ironOption)

async function follow(request: NextApiRequest, response: NextApiResponse) {

  response.status(200).json({
    code: 200,
    data: {},
    msg: '退出成功',
  })
}
