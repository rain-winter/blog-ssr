import { Container } from '@nextui-org/react'
import type { NextPage } from 'next'
import Footer from '../Footer'
import Navbar from '../Navbar'

/**
 * Layout布局
 * @param param0 children 子组件
 * @returns
 */
const Layout: NextPage = ({ children }: any) => {
  return (
    <Container>
      <Navbar />
      <main
        style={{
          height: 'calc(100vh - 116px)',
        }}
      >
        {children}
      </main>
      <Footer />
    </Container>
  )
}

// 这样导出才会默认指向 /
export default Layout
