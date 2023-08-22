import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import { previousTrainings } from '@/graphql/schema/queries/training/getPreviousTrainings/fixture'
import { handleGetPreviousTrainings } from '@/graphql/schema/queries/training/getPreviousTrainings/msw'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'

import ShowTrainingHistoryModal from '.'

type Props = ComponentProps<typeof ShowTrainingHistoryModal>

const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click</Button>
      <ShowTrainingHistoryModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        trainingId={previousTrainings.previousTrainings?.[0]?.id as string}
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
      handlers: [handleGetPreviousTrainings()],
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
        handleGetPreviousTrainings({ status: 200, loadingInfinite: true }),
      ],
    },
  },
}
export const Error: Story = {
  parameters: {
    msw: {
      handlers: [handleGetPreviousTrainings({ status: 500 })],
    },
  },
}
