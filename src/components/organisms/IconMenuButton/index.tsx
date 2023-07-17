import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, Transition } from '@headlessui/react'
import {
  ArrowLeftCircleIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  BookOpenIcon,
  Square3Stack3DIcon,
  UserIcon,
} from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import type { ReactNode } from 'react'
import React from 'react'

import UserIconMenu from '@/components/molecules/UserIconMenu'

type Props = {
  isLogin: boolean
  src?: string
}

const IconMenuButton = (props: Props) => {
  const router = useRouter()
  const menuItems = [
    {
      name: 'ノート',
      onClick: () => router.push(`/notes/${format(new Date(), 'yyyy-MM-dd')}`),
      icon: <BookOpenIcon />,
    },
    {
      name: '登録種目一覧',
      onClick: () => router.push('/exercises'),
      icon: <FontAwesomeIcon icon={faDumbbell} className="w-6 h-6" />,
    },

    {
      name: 'マイページ',
      link: '/',
      icon: <UserIcon />,
    },
    {
      name: 'ログアウト',
      icon: <ArrowLeftOnRectangleIcon />,
      onClick: () => signOut(),
    },
  ]

  return (
    <Menu as="div" className="relative mt-1">
      <Menu.Button>
        <UserIconMenu {...props} />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-90"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-90"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 bg-white text-black divide-y flex flex-col origin-top-right rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999]">
          {menuItems.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <div
                  className={`${
                    active && 'bg-indigo-100 '
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer`}
                  onClick={() => item.onClick?.()}
                >
                  {
                    <div className="flex items-center gap-2 w-full h-full">
                      <div className="h-6 w-6 text-indigo-700">{item.icon}</div>
                      <span>{item.name}</span>
                    </div>
                  }
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default IconMenuButton
