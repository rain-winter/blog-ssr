import { format } from 'date-fns'
import md5 from 'md5'
import http from '@/utils/http'
import { encode } from 'js-base64'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOption } from '@/config'
import { ISession } from '@/utils'

export default withIronSessionApiRoute(login, ironOption)

async function login(req: NextApiRequest, response: NextApiResponse) {
  const { phone, verify } = req.body
  console.log(phone, verify)

  response.status(200).json({
    phone,
    verify,
  })
}
