import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import React from 'react'

type Props = {
  icon: ReactNode
  menuItems: {
    icon?: ReactNode
    name: string
    link?: `/${string}`
    handleClick?: () => void
  }[]
}

const DropDownWithButton = ({ icon, menuItems }: Props) => {
  return (
    <Menu as="div" className="relative mt-1 ml-auto text-right">
      <Menu.Button>{icon}</Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-90"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-90"
      >
        <Menu.Items className="absolute right-0   mt-2 w-56 bg-white text-black divide-y flex flex-col origin-top-right rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
          {menuItems.map((item, index) => (
            <Menu.Item key={index}>
              {({ active, close }) => (
                <>
                  {item.link ? (
                    <Link
                      href={`${item.link}`}
                      className={`${
                        active && ' hover:bg-sky-100 text-white'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer `}
                    >
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      <span>{item.name}</span>
                    </Link>
                  ) : (
                    <p
                      className={`${
                        active && 'bg-sky-500 text-white'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer hover:bg-sky-100`}
                      onClick={() => {
                        item.handleClick?.()
                        close()
                      }}
                    >
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      <span>{item.name}</span>
                    </p>
                  )}
                </>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropDownWithButton
