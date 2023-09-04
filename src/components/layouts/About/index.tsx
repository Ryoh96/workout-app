import { signIn } from 'next-auth/react'
import type { ReactNode } from 'react'

import Button from '@/components/atoms/Button'
import { Hero } from '@/components/templates/about/Hero'
import { APP_TITLE } from '@/constants/env'

import Footer from '../Footer'

const title = APP_TITLE

export const AboutLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" bg-dark min-h-screen flex flex-col justify-between">
      <div>
        <header className="bg-gradient-to-r from-orange-600 to-rose-600 text-white text-2xl h-16 grid items-center ">
          <div className="flex justify-between items-center px-4 max-w-[1125px] mx-auto w-full">
            <p aria-label="ロゴ">{title}</p>
            <Button className="!bg-yellow-400 !text-black font-bold hover:!bg-yellow-200 hover:!text-slate-800 "
             onClick={() => signIn()}
            >
              無料で始める
            </Button>
          </div>
        </header>
        <Hero />
        <main className="py-4 px-1 h-full  w-full">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
