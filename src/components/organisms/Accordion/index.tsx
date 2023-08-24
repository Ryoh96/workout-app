import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import Tag from '@/components/atoms/Tag'

type Props = {
  title: String
  titleIcon?: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  tags?: string[]
} & React.ComponentPropsWithRef<'button'>

const Accordion = forwardRef<HTMLButtonElement, Props>(function Accordion(
  { title, children, tags, titleIcon, defaultOpen = true },
  ref
) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button
            ref={ref}
            className={`bg-orange-100  w-full  py-3 flex items-center justify-between px-4 rounded-md shadow-md hover:bg-slate-300 ${
              open && 'shadow-none'
            }`}
          >
            <div className="flex items-center gap-4 justify-center">
              <div className="flex gap-2 items-center justify-center">
                <span className="text-gray-900">{titleIcon}</span>
                <span className="font-bold text-black">{title}</span>
              </div>
              {tags && (
                <div className="flex gap-1">
                  {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </div>
              )}
            </div>
            <ChevronDownIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } w-5 h-5 transition duration-100 ease-out`}
            />
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
