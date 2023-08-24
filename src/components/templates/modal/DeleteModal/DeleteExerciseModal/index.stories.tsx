import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import { handleDeleteExercise } from '@/graphql/schema/mutations/exercise/deleteExercise/msw'
import { client } from '@/pages/_app'
import useDeleteExerciseModalStore from '@/store/modal/deleteExerciseModal'
import { SPStory } from '@/tests/storybook'

import DeleteExerciseModal from '.'

type Props = ComponentProps<typeof DeleteExerciseModal> & { isOpen: boolean }

const TestComponent = (props: Props) => {
  const setIsOpen = useDeleteExerciseModalStore((state) => state.setIsOpen)
  const openModal = () => setIsOpen(true)

  return (
    <>
      <Button onClick={openModal}>Click</Button>
      <DeleteExerciseModal
        onCompleted={() => console.log('completed')}
        deleteId="hoge"
        deleteName="fuga"
      />
      <Toast />
    </>
  )
}

export default {
  component: TestComponent,
  args: {
    isOpen: false,
  },
  parameters: {
    msw: {
      handlers: [handleDeleteExercise()],
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
      handlers: [handleDeleteExercise({ status: 200 })],
    },
  },
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [handleDeleteExercise({ status: 500 })],
    },
  },
}
