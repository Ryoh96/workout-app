import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import React from 'react'

import UserIconMenu from '@/components/molecules/UserIconMenu'

type Props = {
  isLogin: boolean
  src?: string
}

const menuItems = [
  {
    name: '登録種目一覧',
    link: '/exercises',
  },
  {
    name: 'Settings2',
    link: '/',
  },
  {
    name: 'Settings3',
    link: '/',
  },
]

const IconMenuButton = (props: Props) => {
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
        <Menu.Items className="absolute right-0 mt-2 w-56 bg-white text-black divide-y flex flex-col origin-top-right rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menuItems.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <Link
                  href={`${item.link}`}
                  className={`${
                    active && 'bg-orange-500 text-white'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm ring-1 ring-black ring-opacity-5 focus:outline-none`}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default IconMenuButton
