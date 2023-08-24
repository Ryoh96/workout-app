import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { useState } from 'react'

import Button from '@/components/atoms/Button'

import Modal from '.'

type Props = {
  title: string
  content: ReactNode
  handlers: {
    name: string
    handleClick: () => void
  }[]
}

const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  const openModal = () => setIsOpen(true)
  return (
    <>
      <Button onClick={openModal}>Click</Button>
      <Modal {...props} isOpen={isOpen} closeModal={closeModal} />
    </>
  )
}

export default {
  component: TestComponent,
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {
  args: {
    title: 'タイトル',
    content: 'コンテンツコンテンツコンテンツコンテンツ',
    handlers: [
      {
        name: 'OK',
        handleClick: () => {},
      },
    ],
  },
}

export const LongContents: Story = {
  args: {
    title: 'タイトル',
    content:
      'コンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツコンテンツ',
    handlers: [
      {
        name: 'OK',
        handleClick: () => {},
      },
    ],
  },
}
