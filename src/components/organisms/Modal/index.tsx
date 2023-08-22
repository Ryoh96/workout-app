import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import type { ReactNode } from 'react'
import React, { Fragment, useEffect, useId, useState } from 'react'

import Button from '@/components/atoms/Button'

type Props = {
  title: string
  content: ReactNode
  handlers?: {
    name: string
    handleClick?: () => void
  }[]
  isOpen?: boolean
  closeModal: () => void
  onOpen?: () => void
  titleIcon?: ReactNode
}

const Modal = ({
  title,
  content,
  handlers,
  closeModal,
  isOpen = false,
  onOpen,
  titleIcon,
}: Props) => {
  useEffect(() => {
    if (isOpen === false) return
    onOpen?.()
  }, [isOpen, onOpen])

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[9999]"
          onClose={closeModal!}
          data-testid="modal"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-60"
              data-testid="around-modal"
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {titleIcon && (
                        <div className="w-6 h-6 text-indigo-800">
                          {titleIcon}
                        </div>
                      )}
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                    </div>
                    <button onClick={closeModal}>
                      <XMarkIcon className="w-7 h-7" />
                      <span className="sr-only">close</span>
                    </button>
                  </div>
                  <div className="mt-6">
                    <div className="text-sm flex justify-center [&>*]:w-full">
                      {content}
                    </div>
                  </div>

                  <div className="flex gap-4 items-center justify-center  mt-6 w-full">
                    {handlers?.map((handler, index) => (
                      <Button
                        key={index}
                        onClick={() => {
                          handler.handleClick?.()
                          closeModal()
                        }}
                      >
                        {handler.name}
                      </Button>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
