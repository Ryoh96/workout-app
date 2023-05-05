import IconMenu from '@/components/organisms/IconMenu'
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
          <p>{title}</p>
          <IconMenu {...userIconMenuProps} />
        </div>
      </header>
    </>
  )
}

export default Header
