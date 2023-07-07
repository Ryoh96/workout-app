import type { Meta, StoryObj } from '@storybook/react'
import { RecoilRoot } from 'recoil'

import type { Part, Training } from '@/graphql/generated/operations-type'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { SPStory, TABStory } from '@/tests/storybook'

import RoundDoing from '.'

const training = note.note?.trainings?.[0] as Training

export default {
  component: RoundDoing,
  args: {
    training,
    previousLoading: false,
  },
  ...SPStory,
} as Meta<typeof RoundDoing>

type Story = StoryObj<typeof RoundDoing>

export const Default: Story = {}

export const Tablet: Story = {
  ...TABStory,
}
