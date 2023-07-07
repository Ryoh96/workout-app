import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from 'next-auth/react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { RecoilRoot } from 'recoil'

import Layout from '@/components/layouts'

const NEXT_PUBLIC_END_POINT = process.env.NEXT_PUBLIC_END_POINT
if (!NEXT_PUBLIC_END_POINT) {
  throw new Error('NEXT_PUBLIC_END_POINT is not defined')
}

export const client = new ApolloClient({
  uri: NEXT_PUBLIC_END_POINT,
  cache: new InMemoryCache(),
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider session={pageProps.session}>
        <ApolloProvider client={client}>
          <SkeletonTheme baseColor="#2020202" highlightColor="#444">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SkeletonTheme>
        </ApolloProvider>
      </SessionProvider>
    </RecoilRoot>
  )
}
