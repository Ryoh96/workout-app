import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import type { ReactNode } from 'react'

import Spinner from '../atoms/Spinner'
import Footer from './Footer'
import Header from './Header'
import Section from './Section'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const { data: session, status } = useSession()
  return (
    <div className=" bg-dark min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        {status === 'loading' ? (
          <div className="fixed h-screen w-screen mt-20 grid justify-center">
            <div className=''>
            <p className='text-white text-center mb-10'>ログイン中...</p>
            <Spinner />
            </div>
          </div>
        ) : (
          <main className="py-4 px-1 h-full max-w-[1125px] mx-auto w-full">
            {status === 'authenticated' || status === 'unauthenticated' ? (
              <>{children}</>
            ) : (
              <Section>
                <button
                  onClick={() => signIn()}
                  className="underline text-blue-700 underline-offset-2 cursor-pointer"
                >
                  ログインしてください
                </button>
              </Section>
            )}
          </main>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
