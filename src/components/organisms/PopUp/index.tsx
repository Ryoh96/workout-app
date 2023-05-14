import { Popover, Transition } from '@headlessui/react'
import type { ReactNode } from 'react'
import { Fragment } from 'react'

type Props = {
  title: string
  children: ReactNode
  variant?: 'default' | 'small'
}

const PopUp = ({ title, children, variant = 'default' }: Props) => {
  return (
    <div className={`${variant === 'small' && 'text-sm'}`}>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-sky-50 px-3  font-medium text-sky-900 hover:text-opacity-100  outline-none gap-1 ${
                  variant === 'small' && 'bg-transparent'
                }`}
            >
              <span>{title}</span>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-sky-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 px-2 py-1 shadow w-56  right-0">
                {children}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
export default PopUp
