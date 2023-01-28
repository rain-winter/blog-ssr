import '@/styles/globals.css'
import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import Layout from '@/components/layout'

// 1. import `NextUIProvider` component
import {NextUIProvider} from '@nextui-org/react'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App<ReactWith>({Component, pageProps}: any) {
    // Use the layout defined at the page level, if available


    return (
        <NextUIProvider>
            {/*  @ts-ignore*/}
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NextUIProvider>
    )
}
