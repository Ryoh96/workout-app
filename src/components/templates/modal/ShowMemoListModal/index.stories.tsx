import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import { handleDeleteMemo } from '@/graphql/schema/mutations/memo/deleteMemo/msw'
import { handlePinOutMemo } from '@/graphql/schema/mutations/memo/pinOutMemo/msw'
import { handleGetPinnedMemos } from '@/graphql/schema/queries/memo/getPinnedMemosByExercises/msw'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'

import ShowMemoListModal from '.'

type Props = ComponentProps<typeof ShowMemoListModal>

const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click</Button>
      <ShowMemoListModal
        isOpenExerciseMemoModal={isOpen}
        setIsOpenExerciseMemoModal={setIsOpen}
        onPinOutMemoCompleted={() => console.log('completed')}
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
  decorators: [
    (story) => <ApolloProvider client={client}>{story()}</ApolloProvider>,
  ],
  parameters: {
    msw: {
      handlers: [
        handleDeleteMemo(),
        handleGetPinnedMemos(),
        handlePinOutMemo(),
      ],
    },
    ...SPStory,
  },
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        handleDeleteMemo(),
        handleGetPinnedMemos({ status: 200, loadingInfinite: true }),
        handlePinOutMemo(),
      ],
    },
    ...SPStory,
  },
}

export const LoadingError: Story = {
  parameters: {
    msw: {
      handlers: [
        handleDeleteMemo(),
        handleGetPinnedMemos({ status: 500 }),
        handlePinOutMemo(),
      ],
    },
    ...SPStory,
  },
}

export const DeletePending: Story = {
  parameters: {
    msw: {
      handlers: [
        handleDeleteMemo({ status: 200, loadingInfinite: true }),
        handleGetPinnedMemos(),
        handlePinOutMemo(),
      ],
    },
    ...SPStory,
  },
}

export const PinOutPending: Story = {
  parameters: {
    msw: {
      handlers: [
        handleDeleteMemo(),
        handleGetPinnedMemos(),
        handlePinOutMemo({ status: 200, loadingInfinite: true }),
      ],
    },
    ...SPStory,
  },
}

export const DeleteError: Story = {
  parameters: {
    msw: {
      handlers: [
        handleDeleteMemo({ status: 500 }),
        handleGetPinnedMemos(),
        handlePinOutMemo(),
      ],
    },
    ...SPStory,
  },
}

export const PinOutError: Story = {
  parameters: {
    msw: {
      handlers: [
        handleDeleteMemo(),
        handleGetPinnedMemos(),
        handlePinOutMemo({ status: 500 }),
      ],
    },
    ...SPStory,
  },
}
