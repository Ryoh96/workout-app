import Link from 'next/link'

import IconMenuButton from '@/components/organisms/IconMenuButton'
import { APP_TITLE } from '@/constants/env'

const title = APP_TITLE

const userIconMenuProps = {
  isLogin: false,
}

const Header = () => {
  return (
    <>
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-2xl h-12 grid items-center">
        <div className="flex justify-between items-center px-4">
          <Link href="/">
            <p>{title}</p>
          </Link>
          <IconMenuButton {...userIconMenuProps} />
        </div>
      </header>
    </>
  )
}

export default Header
