import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import { handleRenameExercise } from '@/graphql/schema/mutations/exercise/renameExercise/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'

import RenameExerciseModal from '.'

type Props = ComponentProps<typeof RenameExerciseModal>

const id = note.note?.id as string
const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click</Button>
      <RenameExerciseModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCompleted={() => console.log('completed')}
        id={id}
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
      handlers: [handleRenameExercise()],
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
      handlers: [handleRenameExercise({ status: 200 })],
    },
  },
}
export const Error: Story = {
  parameters: {
    msw: {
      handlers: [handleRenameExercise({ status: 500 })],
    },
  },
}
