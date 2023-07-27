import type { Meta, StoryObj } from '@storybook/react'

import type { Training } from '@/graphql/generated/operations-type'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { SPStory, TABStory } from '@/tests/storybook'

import TrainingResult from '.'

const training = note.note?.trainings?.[0] as Training

export default {
  component: TrainingResult,
  args: {
    training,
  },
  ...SPStory,
} as Meta<typeof TrainingResult>

type Story = StoryObj<typeof TrainingResult>

export const Default: Story = {}

export const IsEditing: Story = {
  args: {
    id: training.id,
  },
}

export const Tablet: Story = {
  ...TABStory,
}
