import type { ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'
import Section from './Section'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-dark">
      <Header />
      <main className="px-4">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
