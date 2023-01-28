import '@/styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { StoreProvider } from '@/store'

// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react'
import { useCookie } from 'next-cookie'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App<ReactWith>({
  initialValue,
  Component,
  pageProps,
}: any) {
  // Use the layout defined at the page level, if available

  return (
    <StoreProvider initialValue={initialValue}>
      <NextUIProvider>
        {/*  @ts-ignore*/}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </StoreProvider>
  )
}

App.getInitialProps = async ({ ctx }: { ctx: any }) => {
  // 从 cookie 中获取用户
  const { TomasUser } = ctx.req.cookies
  return {
    initialValue: {
      user: { userInfo: TomasUser },
    },
  }
}
