import { Container } from '@nextui-org/react'
import type { NextPage } from 'next'
import Footer from '../Footer'
import Navbar from '../Navbar'

const Layout: NextPage = ({ children }: any) => {
  return (
    <Container fluid>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Container>
  )
}

// 这样导出才会默认指向 /
export default Layout
