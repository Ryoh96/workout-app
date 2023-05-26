import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

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
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  )
}
