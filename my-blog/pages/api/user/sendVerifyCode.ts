import { format } from 'date-fns';
import md5 from 'md5'
import http from '@/utils/http'
import { encode } from 'js-base64'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from "iron-session/next";


/**
 * api路由 http://localhost:3000/api/user/sendVerifyCode
 * @param req
 * @param res
 */
export default async function sendVerifyCode(
  req: NextApiRequest,
  response: NextApiResponse
) {
  const { to, templateId } = req.body
  const AccountId = '2c94811c85c276590185f23ba4d902df'
  const appId = '2c94811c85c276590185f23ba5b702e6'
  const AuthToken = 'c172df8ed6474fcb80629d5d5e0d4911'
  const NowDate =format(new Date(), 'yyyyMMddHHmmss')
  // 生成SignParameter
  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`).toUpperCase()
  console.log(SigParameter)
  // 生成Authorization
  const Authorization = encode(`${AccountId}:${NowDate}`)
  // 拼接url
  let url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`
  // 验证码
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000
  // 过期时间 5分钟
  const expireMinute = '5'
  // 发送请求，获取短信验证码
  const res = await http.post(
    url,
    {
      to,
      appId,
      templateId,
      datas: [verifyCode, expireMinute],
    },
    { headers: { Authorization } }
  )
  console.log(res)

  response.status(200).json({
    code: 0,
    data: 1243,
  })
}
