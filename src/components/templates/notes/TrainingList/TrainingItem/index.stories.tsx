import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { previousTrainings } from '@/graphql/schema/queries/training/getPreviousTrainings/fixture'
import { client } from '@/pages/_app'
import useIsEditingStore from '@/store/note/isEditing'
import useEditedTrainingIdStore from '@/store/training/editedTrainingId'
import useLastTrainingIdStore from '@/store/training/lastTrainingId'
import { SPStory } from '@/tests/storybook'

import TrainingItem from '.'

type Props = ComponentProps<typeof TrainingItem> & {
  trainingId: string | null
  lastTrainingId: string | null
  isEditing: boolean
}

const trainings = note.note?.trainings
const training = trainings?.[0]
const previousData = previousTrainings

const Component = (props: Props) => {
  const setEditedTrainingId = useEditedTrainingIdStore(
    (state) => state.setEditedTrainingId
  )
  const setLastTrainingId = useLastTrainingIdStore(
    (state) => state.setLastTrainingId
  )
  const setIsEditing = useIsEditingStore((state) => state.setIsEditing)

  setEditedTrainingId(props.trainingId)
  setLastTrainingId(props.lastTrainingId)
  setIsEditing(props.isEditing)

  return <TrainingItem {...props} />
}

export default {
  component: Component,
  ...SPStory,
  args: {
    training,
    previousLoading: false,
    previousTotalLoad: 1000,
    index: 1,
    previousData,
    addRoundMutationLoading: false,
    trainingId: training?.id,
    lastTrainingId: trainings?.at(-1)?.id,
    isEditing: true,
  },
  decorators: [
    (story) => <ApolloProvider client={client}>{story()}</ApolloProvider>,
  ],
} as Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {}
