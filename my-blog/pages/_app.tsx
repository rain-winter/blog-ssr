import Layout from '@/components/layout';
import { StoreProvider } from '@/store';
import '@/styles/globals.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react';

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
  const renderLayout = () => {
    // * === 能出来
    // 判断组件的layout 有就渲染header footer
    // console.log(typeof Component.layout)
    // if (Component.layout === null) {
    //   return <Component {...pageProps} />
    // } else {
    return (
      // ts-ignore
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
    // }
  }

  return (
    <StoreProvider initialValue={initialValue}>
      <NextUIProvider>{renderLayout()}</NextUIProvider>
    </StoreProvider>
  )
}

App.getInitialProps = async ({ ctx }: { ctx: any }) => {
  // 从 cookie 中获取用户
  const { TomasUser } = ctx.req?.cookies || '{}'
  console.log(TomasUser)
  return {
    initialValue: {
      user: {
        userInfo: TomasUser,
      },
    },
  }
}
