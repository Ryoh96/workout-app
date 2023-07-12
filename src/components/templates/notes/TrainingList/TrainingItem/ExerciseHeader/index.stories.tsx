import type { Meta, StoryObj } from '@storybook/react'

import type { Part, Training } from '@/graphql/generated/operations-type'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { SPStory, TABStory } from '@/tests/storybook'

import  Presentational  from '.'

const training = note.note?.trainings?.[0] as Training

export default {
  component: Presentational,
  args: {
    previousTotalLoad: 1000,
    training,
    index: 0,
    name: training.exercise?.name ?? '',
    part: training.exercise?.parts?.[0] as Part,
  },
  ...SPStory,
} as Meta<typeof Presentational>

type Story = StoryObj<typeof Presentational>

export const Default: Story = {}

export const Tablet: Story = {
  ...TABStory,
}
