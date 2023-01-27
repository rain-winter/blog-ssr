import {
  Navbar,
  Link,
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
} from '@nextui-org/react'
import { useState } from 'react'
import CountDown from '../CountDown'
import styles from './index.module.scss'
interface Props {
  isShow: boolean
  handleClose: () => void
}

const Login = ({ isShow, handleClose }: Props) => {
  const [isShowVerfifyCode, setIsShowVerfifyCode] = useState(false)
  // Auth
  const handleOAuthGithub = () => {}
  const handleLogin = () => {}
  const handleVerifyCode = () => {
    setIsShowVerfifyCode(true)
  }
  const countDownEnd = () => {
    setIsShowVerfifyCode(false)
  }
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
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
        />
        <Row align="center" justify="space-between">
          <Input
            clearable
            contentRightStyling={false}
            contentClickable={true}
            onContentClick={handleVerifyCode}
            bordered
            fullWidth
            color="primary"
            placeholder="Password"
            contentRight={
              isShowVerfifyCode ? (
                <CountDown time={10} onEnd={countDownEnd} />
              ) : (
                <Text css={{width:'40px'}} color="primary" size="$xs">
                  验证码
                </Text>
              )
            }
          />
          {/* <Text
            onClick={handleVerifyCode}
            className={styles.text}
            "
          ></Text> */}
        </Row>
        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          <Text size={14}>Forgot password?</Text>
        </Row>
        <Row>
          <Text color="primary">使用GitHub登录</Text>
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
        <Button auto flat color="error">
          Close
        </Button>
        <Button auto onPress={handleLogin}>
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null
}
export default Login
