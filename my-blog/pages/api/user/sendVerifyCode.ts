import { ironOption, verifyOption } from '@/config'
import { ISession } from '@/utils'
import { format } from 'date-fns'
import { withIronSessionApiRoute } from 'iron-session/next'
import { encode } from 'js-base64'
import md5 from 'md5'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * ironSeesion 在内存中保存变量
 * 通过这个方式包裹起来 req就存在了session const session =res.sesion
 */
export default withIronSessionApiRoute(sendVerifyCode, ironOption)

/**
 * api路由 发送验证码 http://localhost:3000/api/user/sendVerifyCode
 * @param req
 * @param res
 */
async function sendVerifyCode(req: NextApiRequest, response: NextApiResponse) {
  const session: ISession = req.session
  const { AccountId, appId, AuthToken } = verifyOption
  const { to, templateId } = req.body
  const NowDate = format(new Date(), 'yyyyMMddHHmmss')
  // 生成SignParameter
  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`).toUpperCase()
  // 生成Authorization
  const Authorization = encode(`${AccountId}:${NowDate}`)
  // 拼接url
  let url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`
  // 验证码
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000
  // 短信验证码过期时间 5分钟
  const expireMinute = '5'

  // 发送请求，获取短信验证码
  // const res: any = await http.post(
  //   url,
  //   {
  //     to,
  //     appId,
  //     templateId,
  //     datas: [verifyCode, expireMinute],
  //   },
  //   { headers: { Authorization } }
  // )
  // console.log(verifyCode)
  // const { statusCode, statusMsg, templateSMS } = res
  // if (statusCode === '000000') {
  //   session.verifyCode = verifyCode
  //   await req.session.save()
  // }

  session.verifyCode = verifyCode
  console.log(verifyCode)
  await req.session.save()

  response.status(200).json({
    code: 200,
    data: verifyCode,
  })
}
