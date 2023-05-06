import type { ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className=" bg-dark min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <main className="p-4 h-full">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
