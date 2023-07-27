import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'

import { handleAddExercisesByPart } from '@/graphql/schema/mutations/exercise/addExerciseByPart/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'

import TrainingList from '.'

const noteData = note

export default {
  component: TrainingList,
  args: {
    onCompleted: () => console.log('completed'),
    noteData,
  },
  decorators: [
    (story) => <ApolloProvider client={client}>{story()}</ApolloProvider>,
  ],
  parameters: {
    msw: {
      handlers: [handleAddExercisesByPart()],
    },
  },
} as Meta<typeof TrainingList>

type Story = StoryObj<typeof TrainingList>

export const Default: Story = {
  ...SPStory,
}
