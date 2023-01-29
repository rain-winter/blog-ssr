import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Key, useEffect } from 'react'

type SelectionType = 'all' | Set<Key>

import {
  Navbar as NextNavBar,
  Button,
  Text,
  Avatar,
  Dropdown,
  User,
  useInput,
} from '@nextui-org/react'
// import Link from 'next/link'
import { navs } from './config'
import styles from './index.module.scss'
import Login from '../Login'
import { useState } from 'react'
import { useStore } from '@/store'
import http from '@/utils/http'
import api from '@/utils/api'
import { observer } from 'mobx-react-lite'

const Navbar: NextPage = () => {
  const store = useStore()
  let { userInfo } = store.user
  // let id, avatar, nickname
  const { pathname, push } = useRouter()
  const [isShowLogin, setIsShowLogin] = useState(false)
  const {id, avatar, nickname} =JSON.parse(userInfo)
  // useEffect(() => {
  //   userInfo = 
  //   id= userInfo.id
  //   console.log(userInfo.id)
  // }, [])
  const handleLogin = () => {
    setIsShowLogin(true)
  }

  const handleClose = () => {
    setIsShowLogin(false)
  }

  const logOut = async () => {
    let res = await http.post(api.logout)
    store.user.setUserInfo('{}')
    console.log(res)
  }

  // 去主页
  const homePage = () => {
    push(`/user/${id}`)
  }
  const goEditorPage = () => {
    if(id){
      push('editor/new')
    }else{
      alert('请登录')
    }
  }

  const handleDropDownAction = (key: Key) => {
    if (key == 'logout') logOut()
    if (key == 'homepage') homePage()
  }

  return (
    <div className={styles.navbar}>
      <NextNavBar>
        <NextNavBar.Content variant="underline">
          <Text b color="inherit">
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
          <Button color="gradient" auto onClick={goEditorPage}>
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
