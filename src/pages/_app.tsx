import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { RecoilRoot } from 'recoil'

import Spinner from '@/components/atoms/Spinner'
import Layout from '@/components/layouts'

export const client = new ApolloClient({
  uri: '/api/graphql',
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
