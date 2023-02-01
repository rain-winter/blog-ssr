import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Key } from 'react'

import { useStore } from '@/store'
import api from '@/utils/api'
import http from '@/utils/http'
import {
  Button,
  Dropdown,
  Navbar as NextNavBar,
  Text,
  User
} from '@nextui-org/react'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import Login from '../Login'
import { navs } from './config'

const Navbar: NextPage = () => {
  const store = useStore()
  let { userInfo } = store.user

  const { pathname, push } = useRouter()
  const [isShowLogin, setIsShowLogin] = useState(false)
  const { id, avatar, nickname } = JSON.parse(userInfo || '{}')

  const handleLogin = () => {
    setIsShowLogin(true)
  }

  const handleClose = () => {
    setIsShowLogin(false)
  }

  const logOut = async () => {
    let res = await http.post(api.logout)
    store.user.setUserInfo('{}')
  }

  // 去主页
  const homePage = () => {
    push(`/user/${id}`)
  }
  const goEditorPage = () => {
    if (id) {
      push('/editor/new')
    } else {
      alert('请登录')
    }
  }

  const handleDropDownAction = (key: Key) => {
    if (key == 'logout') logOut()
    if (key == 'homepage') homePage()
  }

  return (
    <div>
      <NextNavBar variant="sticky" disableShadow>
        <NextNavBar.Content>
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
          <Button flat color="primary" auto onClick={goEditorPage}>
            写文章
          </Button>
          {id ? (
            <Dropdown placement="bottom-left">
              <Dropdown.Trigger>
                <User src={avatar} name={nickname} />
              </Dropdown.Trigger>
              <Dropdown.Menu
                color="primary"
                aria-label="User Actions"
                onAction={handleDropDownAction}
              >
                <Dropdown.Item key="profile" css={{ height: '$18' }}>
                  <Text b color="inherit" css={{ d: 'flex' }}>
                    {nickname}
                  </Text>
                  <Text b color="inherit" css={{ d: 'flex' }}>
                    zoey@example.com
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="homepage" withDivider>
                  My Home Page
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
export default observer(Navbar)
