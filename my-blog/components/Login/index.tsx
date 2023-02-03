import { oauthOptions } from '@/config'
import { useStore } from '@/store'
import api from '@/utils/api'
import http from '@/utils/http'
import {
  Button, Checkbox, Input, Link,
  Modal, Row, Text
} from '@nextui-org/react'
import { message } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CountDown from '../CountDown'


interface Props {
  isShow: boolean
  handleClose: () => void
}

const Login = ({ isShow, handleClose }: Props) => {
  const store = useStore()
  const router = useRouter()

  const form = {
    phone: '',
    verify: '',
  }
  const [isShowVerfifyCode, setIsShowVerfifyCode] = useState(false)
  /**
   * Auth2.0
   */
  const handleOAuthGithub = () => {
    const githubClientID = oauthOptions.githubClientID
    const redirectUri = `https://localhost:3000/api/oauth/redirect`
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${githubClientID}`
    )
  }
  /**
   * 登录
   */
  const handleLogin = () => {
    http.post(api.login, { ...form, identity_type: 'phone' }).then((res) => {
      store.user.setUserInfo(res.data.User)
      setIsShowVerfifyCode(false)
      location.reload()
      // router.replace('/')
    })
  }
  /**
   * 获取验证码
   */
  const handleVerifyCode = () => {
    if (form.phone == '') {
      message.info('nihao')
      alert('手机号为空')
      return
    }
    http
      .post(api.sendVerifyCode, {
        to: form?.phone,
        templateId: 1,
      })
      .then((res) => {
        setIsShowVerfifyCode(true)
      })
  }
  /**
   * 倒计时结束 置为false
   */
  const countDownEnd = () => setIsShowVerfifyCode(false)
  const phoneChange = (e: React.FocusEvent<HTMLInputElement>) => {}
  return isShow ? (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={isShow}
      onClose={handleClose}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Welcome to
          <Text b size={18}>
            &nbsp;rain blog
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body css={{ paddingTop: '26px' }}>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          labelPlaceholder="phone"
          type="text"
          onBlur={(e) => (form.phone = e.target.value)}
        />
        <Row align="center" justify="space-between">
          <Input
            css={{ marginTop: '20px' }}
            clearable
            contentRightStyling={false}
            contentClickable={true}
            onContentClick={handleVerifyCode}
            bordered
            fullWidth
            type="text"
            color="primary"
            labelPlaceholder="verify"
            onBlur={(e) => (form.verify = e.target.value)}
            contentRight={
              isShowVerfifyCode ? (
                <CountDown time={10} onEnd={countDownEnd} />
              ) : (
                <Text css={{ width: '40px' }} color="primary" size="$xs">
                  验证码
                </Text>
              )
            }
          />
        </Row>
        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          <Text size={14}>Forgot password?</Text>
        </Row>
        <Row>
          <Text color="primary" onClick={handleOAuthGithub}>
            使用GitHub登录
          </Text>
        </Row>
        <Row>
          <Text size="$xs">注册登录即表示同意</Text>
          <Link href="#">
            <Text color="primary" size="$xs">
              隐私政策
            </Text>
          </Link>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={handleClose}>
          Close
        </Button>
        <Button auto onPress={handleLogin}>
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null
}
export default observer(Login)
