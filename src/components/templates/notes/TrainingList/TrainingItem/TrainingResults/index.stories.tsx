import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'

import { DeleteRoundModal } from '@/components/templates/modal/DeleteModal/DeleteRoundModal'
import EditRoundModal from '@/components/templates/modal/EditRoundModal'
import type { Training } from '@/graphql/generated/operations-type'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client } from '@/pages/_app'
import { SPStory, TABStory } from '@/tests/storybook'

import TrainingResult from '.'

const training = note.note?.trainings?.[0] as Training

const TestComponent = (props: { id: string | null }) => {
  return (
    <ApolloProvider client={client}>
      <TrainingResult training={training} id={props.id} />
      <DeleteRoundModal onDeleteCompleted={() => {}} />
      <EditRoundModal onCompleted={() => {}} />
    </ApolloProvider>
  )
}

export default {
  component: TestComponent,
  ...SPStory,
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {}

export const IsEditing: Story = {
  args: {
    id: training.id,
  },
}

export const Tablet: Story = {
  ...TABStory,
}
