import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'

import IconMenuButton from '@/components/organisms/IconMenuButton'
import { APP_TITLE } from '@/constants/env'

const title = APP_TITLE

const userIconMenuProps = {
  isLogin: false,
}

const Header = () => {
  const { data: session, status } = useSession()
  return (
    <>
      <header className="bg-gradient-to-r from-orange-600 to-rose-600 text-white text-2xl h-12 grid items-center ">
        <div className="flex justify-between items-center px-4 max-w-[1125px] mx-auto w-full">
          <Link href="/">
            <p aria-label="ロゴ">{title}</p>
          </Link>
          {status === 'authenticated' ? (
            <IconMenuButton {...userIconMenuProps} />
          ) : status === 'loading' ? (
            <span className='text-base'>ログイン中</span>
          ) : (
            <button
              className="flex items-center text-sm gap-2"
              onClick={() => signIn()}
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
              <span>ログイン</span>
            </button>
          )}
        </div>
      </header>
    </>
  )
}

export default Header
