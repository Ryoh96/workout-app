import { ChevronDownIcon } from '@heroicons/react/24/solid'

import UserIcon from '../UserIcon'

type Props = {
  isLogin: boolean
  src?: string
}

const UserIconMenu = (props: Props) => {
  return (
    <div className="flex items-center" aria-label="メニュー">
      <UserIcon {...props} />
      <ChevronDownIcon className="w-5 h-5" />
    </div>
  )
}

export default UserIconMenu
