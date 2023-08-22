import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import type { Exercise } from '@/graphql/generated/operations-type'
import { handleChangeExercisePart } from '@/graphql/schema/mutations/exercise/changeExercisePart/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { handleGetAllPartName } from '@/graphql/schema/queries/part/getAllPartsName/msw'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'

import ChangeExercisePartModal from '.'

type Props = {}

const exercise = note.note?.trainings?.[0].exercise as Exercise

const TestComponent = (props: Props) => {
  const openModal = () => setIsOpen(true)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={openModal}>Click</Button>
      <ChangeExercisePartModal
        {...props}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCompleted={() => console.log('completed')}
        exerciseId={exercise.id}
        selected={exercise.id}
      />
      <Toast />
    </>
  )
}

export default {
  component: TestComponent,
  args: {},
  parameters: {
    msw: {
      handlers: [handleChangeExercisePart(), handleGetAllPartName()],
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
        handleGetAllPartName(),
        handleChangeExercisePart({ status: 200, loadingInfinite: true }),
      ],
    },
  },
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [handleChangeExercisePart({ status: 500 })],
    },
  },
}
