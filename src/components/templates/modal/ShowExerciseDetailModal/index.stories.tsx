import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import { handleGetMaxToalLoad } from '@/graphql/schema/queries/scalar/getMaxTotalLoad/msw'
import { handleGetMaxWeight } from '@/graphql/schema/queries/scalar/getMaxWeight/msw'
import { handleGetTrainingStat } from '@/graphql/schema/queries/training/getTrainingStat/msw'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'

import ShowExerciseDetailModal from '../ShowExerciseDetailModal'

type Props = ComponentProps<typeof ShowExerciseDetailModal>

const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click</Button>
      <ShowExerciseDetailModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id="hoge"
        name="hoge"
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
      handlers: [
        handleGetMaxWeight(),
        handleGetMaxToalLoad(),
        handleGetTrainingStat(),
      ],
    },
    ...SPStory,
  },
  decorators: [
    (story) => <ApolloProvider client={client}>{story()}</ApolloProvider>,
  ],
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        handleGetMaxWeight({ status: 200, loadingInfinite: true }),
        handleGetMaxToalLoad({ status: 200, loadingInfinite: true }),
        handleGetTrainingStat({ status: 200, loadingInfinite: true }),
      ],
    },
  },
}
export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        handleGetMaxWeight({ status: 500 }),
        handleGetMaxToalLoad({ status: 500 }),
        handleGetTrainingStat({ status: 500 }),
      ],
    },
  },
}
