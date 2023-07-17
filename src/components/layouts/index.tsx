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
  console.log(status)
  return (
    <div className=" bg-dark min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <main className="py-4 px-1 h-full max-w-[1125px] mx-auto w-full">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
