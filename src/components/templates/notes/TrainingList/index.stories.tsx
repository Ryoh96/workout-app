import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import { RecoilRoot } from 'recoil'

import Toast from '@/components/atoms/Toast'
import { handleAddExercisesByPart } from '@/graphql/schema/mutations/exercise/addExerciseByPart/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { allPartsName } from '@/graphql/schema/queries/part/getAllPartsName/fixture'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'

import TrainingList from '.'

const partsOptions = allPartsName.parts
const noteData = note

export default {
  component: TrainingList,
  args: {
    onCompleted: () => console.log('completed'),
    noteData,
  },
  decorators: [
    (story) => (
      <RecoilRoot>
        <ApolloProvider client={client}>{story()}</ApolloProvider>
      </RecoilRoot>
    ),
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
