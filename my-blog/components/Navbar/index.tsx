import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  Navbar as NextNavBar,
  Button,
  Text,
  Avatar,
  Dropdown,
  User,
} from '@nextui-org/react'
// import Link from 'next/link'
import { navs } from './config'
import styles from './index.module.scss'
import Login from '../Login'
import { useState } from 'react'
import { useStore } from '@/store'

const Navbar: NextPage = () => {
  const store = useStore()
  const userInfo = store.user.userInfo
  const { id, avatar, nickname } = JSON.parse(userInfo)

  const { pathname, push } = useRouter()
  const [isShowLogin, setIsShowLogin] = useState(false)
  const handleLogin = () => {
    setIsShowLogin(true)
  }

  const handleClose = () => {
    setIsShowLogin(false)
  }

  return (
    <div className={styles.navbar}>
      <NextNavBar>
        <NextNavBar.Content variant="underline">
          <Text b color="inherit" hideIn="xs">
            RAIN
          </Text>

          {navs?.map((item) => (
            <NextNavBar.Link
              hideIn={'xs'}
              key={item.label}
              href={item.value}
              isActive={item.value === pathname ? true : false}
            >
              {item.label}
            </NextNavBar.Link>
          ))}
        </NextNavBar.Content>
        <NextNavBar.Content>
          <Button color="gradient" auto>
            写文章
          </Button>
          {id ? (
            <Dropdown placement="bottom-left">
              <Dropdown.Trigger>
                <User
                  bordered
                  as="button"
                  size="lg"
                  color="primary"
                  name={nickname}
                  description="@tonyreichert"
                  src={avatar}
                />
              </Dropdown.Trigger>
              <Dropdown.Menu color="primary" aria-label="User Actions">
                <Dropdown.Item key="profile" css={{ height: '$18' }}>
                  <Text b color="inherit" css={{ d: 'flex' }}>
                    {nickname}
                  </Text>
                  <Text b color="inherit" css={{ d: 'flex' }}>
                    zoey@example.com
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="settings" withDivider>
                  My Settings
                </Dropdown.Item>
                <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
                <Dropdown.Item key="analytics" withDivider>
                  Analytics
                </Dropdown.Item>
                <Dropdown.Item key="logout" color="error" withDivider>
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button bordered color="primary" auto onPress={handleLogin}>
              登录
            </Button>
          )}
        </NextNavBar.Content>
      </NextNavBar>

      <Login isShow={isShowLogin} handleClose={handleClose} />
    </div>
  )
}

// 这样导出才会默认指向 /
export default Navbar
