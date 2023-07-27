import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'

import Toast from '@/components/atoms/Toast'
import { handleAddExercisesByPart } from '@/graphql/schema/mutations/exercise/addExerciseByPart/msw'
import { handleCreateTraining } from '@/graphql/schema/mutations/training/createTraining/mws'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { allPartsName } from '@/graphql/schema/queries/part/getAllPartsName/fixture'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'

import CreateTraining from '.'

const partsOptions = allPartsName.parts
const noteData = note

export default {
  component: CreateTraining,
  args: {
    onCompleted: () => console.log('completed'),
    partsOptions,
    existingTrainings: new Set(
      noteData.note?.trainings?.map((training) => training.exercise?.id)
    ),
  },
  decorators: [
    (story) => (
      <>
        <ApolloProvider client={client}>{story()}</ApolloProvider>
        <Toast />
      </>
    ),
  ],
  parameters: {
    msw: {
      handlers: [handleAddExercisesByPart(), handleCreateTraining()],
    },
  },
} as Meta<typeof CreateTraining>

type Story = StoryObj<typeof CreateTraining>

export const Default: Story = {
  ...SPStory,
}
