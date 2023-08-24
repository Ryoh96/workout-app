import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import { client } from '@/pages/_app'

import SelectCalenderModal from '.'

type Props = ComponentProps<typeof SelectCalenderModal>

const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setCurrentDate] = useState(new Date())
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click</Button>
      <SelectCalenderModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setCurrentDate={setCurrentDate}
      />
      <Toast />
    </>
  )
}

export default {
  component: TestComponent,
  args: {
    isOpenPinOutMemoModal: false,
  },
  decorators: [
    (story) => <ApolloProvider client={client}>{story()}</ApolloProvider>,
  ],
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {}
