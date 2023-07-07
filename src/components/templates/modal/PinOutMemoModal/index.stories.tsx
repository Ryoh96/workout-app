import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import { handlePinOutMemo } from '@/graphql/schema/mutations/memo/pinOutMemo/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'

import PinOutMemoModal from '.'

type Props = ComponentProps<typeof PinOutMemoModal>

const id = note.note?.id as string
const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click</Button>
      <PinOutMemoModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        onPinOutCompleted={() => console.log('complete')}
        id="hoge"
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
  parameters: {
    msw: {
      handlers: [handlePinOutMemo()],
    },
    ...SPStory,
  },
  decorators: [
    (story) => (
      <RecoilRoot>
        <ApolloProvider client={client}>{story()}</ApolloProvider>
      </RecoilRoot>
    ),
  ],
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [handlePinOutMemo({ status: 200 })],
    },
  },
}
export const Error: Story = {
  parameters: {
    msw: {
      handlers: [handlePinOutMemo({ status: 500 })],
    },
  },
}
