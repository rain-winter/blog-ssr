import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Navbar as NextNavBar, Button, Text } from '@nextui-org/react'
// import Link from 'next/link'
import { navs } from './config'
import styles from './index.module.scss'
import Login from '../Login'
import { useState } from 'react'

const Navbar: NextPage = () => {
  const { pathname, push } = useRouter()
  const [isShowLogin, setIsShowLogin] = useState(false);
  const handleLogin = () => {
    setIsShowLogin(true);
  };

  const handleClose = () => {
    setIsShowLogin(false);
  };
  console.log(pathname)
  console.log(navs)

  return (
    <div className={styles.navbar}>
      <NextNavBar >
        <NextNavBar.Content  variant='underline'>
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
          <Button bordered color="primary" auto onPress={handleLogin}>
            登录
          </Button>
        </NextNavBar.Content>
      </NextNavBar>

      <Login isShow={isShowLogin} handleClose={handleClose} />
    </div>
  )
}

// 这样导出才会默认指向 /
export default Navbar
