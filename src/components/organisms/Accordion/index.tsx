import { Disclosure, Transition } from '@headlessui/react'
import type { ReactNode } from 'react'
import { forwardRef, useRef, useState } from 'react'

type Props = {
  title: String
  children: ReactNode
  defaultOpen?: boolean
} & React.ComponentPropsWithRef<'button'>

const Accordion = forwardRef<HTMLButtonElement, Props>(function Accordion(
  { title, children, defaultOpen = true },
  ref
) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button
            ref={ref}
            className={`bg-orange-300 w-full text-orange-700 py-2 flex items-center justify-between px-4 rounded-t-md hover:bg-orange-300 hover:text-orange-700 shadow-md ${
              open && 'shadow-none'
            }`}
          >
            <span>{title}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`${
                open ? 'rotate-180 transform' : ''
              } w-5 h-5 transition duration-100 ease-out`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </Disclosure.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform -translate-y-6 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-6 opacity-0"
          >
            <Disclosure.Panel className="py-2 px-4 shadow-lg w-full rounded-b-lg">
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
})

export default Accordion
