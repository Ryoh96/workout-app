import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'

import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { previousTrainings } from '@/graphql/schema/queries/training/getPreviousTrainings/fixture'
import { currentDateState } from '@/recoil/currentDate/states'
import { isEditingState } from '@/recoil/Note/isEditing'
import { editedTrainingIdState } from '@/recoil/Training/editedTrainingId'
import { lastTrainingIdState } from '@/recoil/Training/lastTrainingId'
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
  const setEditedTrainingId = useSetRecoilState(editedTrainingIdState)
  const setLastTrainingId = useSetRecoilState(lastTrainingIdState)
  const setIsEditing = useSetRecoilState(isEditingState)

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
  decorators: [(story) => <RecoilRoot>{story()}</RecoilRoot>],
} as Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {}
