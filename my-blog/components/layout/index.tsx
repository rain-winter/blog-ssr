import type { NextPage } from 'next'
import type { ReactElement } from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'

const Layout: NextPage = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

// 这样导出才会默认指向 /
export default Layout
