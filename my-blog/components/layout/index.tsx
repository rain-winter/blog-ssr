import styled from '@emotion/styled'
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
    <Container
      css={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}
const Main = styled.div({
  flex: 1,
})

// 这样导出才会默认指向 /
export default Layout
