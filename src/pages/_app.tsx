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
  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setPageLoading(true)
    const handleComplete = () => setPageLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return (
    <RecoilRoot>
      <SessionProvider session={pageProps.session}>
        <ApolloProvider client={client}>
          <SkeletonTheme baseColor="#2020202" highlightColor="#444">
            <Layout>
              {pageLoading && (
                <div className="text-white font-bold  fixed h-screen w-screen bg-black bg-opacity-30 top-0 left-0 flex items-center justify-center z-[99999]">
                  <div>
                    <Spinner />
                  </div>
                </div>
              )}
              <Component {...pageProps} />
            </Layout>
          </SkeletonTheme>
        </ApolloProvider>
      </SessionProvider>
    </RecoilRoot>
  )
}
